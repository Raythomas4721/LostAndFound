import type { Question, Soup } from './types';

/** 玩家在一碗湯裡的進度。全部是純資料，可以直接存檔。 */
export interface SoupState {
  unlocked: string[];
  asked: string[];
  inspected: string[];
  /** 空格 id → 線索詞 id */
  placements: Record<string, string>;
  /** 已經填對、鎖定的句子 id */
  solved: string[];
  tea: number;
  /** 溫伯坦白後自動重新回答的題目 */
  auto?: string[];
  /** 限時來電：這一通已經問了幾題、回撥過幾次 */
  callAsked?: number;
  calls?: number;
  /** 對質：被當場拆穿的謊話 id */
  confronted?: string[];
  /** 插播：湯面已經翻轉 */
  twisted?: boolean;
}

export function newSoupState(soup: Soup): SoupState {
  return { unlocked: [...soup.start], asked: [], inspected: [], placements: {}, solved: [], tea: 0 };
}

function addAll(list: string[], more: readonly string[] | undefined): string[] {
  if (!more || more.length === 0) return list;
  const out = [...list];
  for (const id of more) if (!out.includes(id)) out.push(id);
  return out;
}

export function isAvailable(q: Question, unlocked: readonly string[]): boolean {
  return unlocked.includes(q.topic) && (q.requires ?? []).every((id) => unlocked.includes(id));
}

/** 跟 isAvailable 一樣，但被對質拆穿的謊話，它的更正版不用等坦白就出現。 */
export function isOpen(q: Question, state: SoupState): boolean {
  if (isAvailable(q, state.unlocked)) return true;
  return !!q.corrects && (state.confronted ?? []).includes(q.corrects) && state.unlocked.includes(q.topic);
}

/** 目前看得到的題目（含已經問過的）。被更正過的題目會換成更正後的版本。 */
export function availableQuestions(soup: Soup, state: SoupState): Question[] {
  const open = soup.questions.filter((q) => isOpen(q, state));
  const corrected = new Set(open.flatMap((q) => (q.corrects ? [q.corrects] : [])));
  return open.filter((q) => !corrected.has(q.id));
}

/**
 * 溫伯坦白之後：說謊的題目如果問過了，更正版自動重新回答一次（算是溫伯主動說的，不算玩家問的題數）。
 * 回傳新的狀態，以及這次被更正的題目 id。
 */
export function applyCorrections(soup: Soup, state: SoupState): { state: SoupState; corrected: string[] } {
  let next = state;
  const corrected: string[] = [];
  for (const q of soup.questions) {
    if (!q.corrects || next.asked.includes(q.id) || !next.asked.includes(q.corrects) || !isAvailable(q, next.unlocked)) continue;
    next = { ...next, asked: [...next.asked, q.id], auto: [...(next.auto ?? []), q.id], unlocked: addAll(next.unlocked, q.unlocks) };
    corrected.push(q.id);
  }
  return { state: next, corrected };
}

/** 玩家自己問的題數（不含自動更正）。 */
export function askedCount(state: SoupState): number {
  const auto = new Set(state.auto ?? []);
  return state.asked.filter((id) => !auto.has(id)).length;
}

export function inspect(soup: Soup, state: SoupState, hotspotId: string): SoupState {
  if (state.inspected.includes(hotspotId)) return state;
  const spot = soup.evidence.flatMap((e) => e.hotspots).find((h) => h.id === hotspotId);
  if (!spot) return state;
  return { ...state, inspected: [...state.inspected, hotspotId], unlocked: addAll(state.unlocked, spot.unlocks) };
}

export function ask(soup: Soup, state: SoupState, questionId: string): SoupState {
  if (state.asked.includes(questionId)) return state;
  const q = soup.questions.find((x) => x.id === questionId);
  if (!q || !isOpen(q, state)) return state;
  return { ...state, asked: [...state.asked, questionId], unlocked: addAll(state.unlocked, q.unlocks) };
}

/** 把線索詞填進空格；keywordId 為 null 表示清空。類別不對或還沒解鎖就不動。 */
export function place(soup: Soup, state: SoupState, blankId: string, keywordId: string | null): SoupState {
  const sentence = soup.board.find((s) => s.blanks.some((b) => b.id === blankId));
  if (!sentence || state.solved.includes(sentence.id)) return state;
  const placements = { ...state.placements };
  if (keywordId === null) {
    delete placements[blankId];
    return { ...state, placements };
  }
  const blank = sentence.blanks.find((b) => b.id === blankId)!;
  const kw = soup.keywords.find((k) => k.id === keywordId);
  if (!kw || kw.category !== blank.category || !state.unlocked.includes(keywordId)) return state;
  placements[blankId] = keywordId;
  return { ...state, placements };
}

export type SentenceResult = 'correct' | 'wrong' | 'incomplete';

/** 推理板上目前看得到的句子：插播的句子要等湯面翻轉之後才出現。 */
export function visibleBoard(soup: Soup, state: SoupState) {
  return soup.board.filter((s) => !s.twist || state.twisted);
}

/** 插播：插播以外的句子全部填對時，湯面翻轉。新的一通電話，通話題數重算。 */
function maybeTwist(soup: Soup, state: SoupState): SoupState {
  if (!soup.twist || state.twisted) return state;
  if (!soup.board.filter((s) => !s.twist).every((s) => state.solved.includes(s.id))) return state;
  return { ...state, twisted: true, unlocked: addAll(state.unlocked, soup.twist.unlocks), ...(state.callAsked !== undefined ? { callAsked: 0 } : {}) };
}

/** 句子的空格全部填好才檢查；填對就鎖定（可能觸發插播）。填錯不說錯在哪一格。 */
export function checkSentence(soup: Soup, state: SoupState, sentenceId: string): { state: SoupState; result: SentenceResult } {
  const sentence = soup.board.find((s) => s.id === sentenceId);
  if (!sentence) return { state, result: 'incomplete' };
  if (state.solved.includes(sentenceId)) return { state, result: 'correct' };
  if (sentence.blanks.some((b) => !state.placements[b.id])) return { state, result: 'incomplete' };
  const ok = sentence.blanks.every((b) => state.placements[b.id] === b.answer);
  if (!ok) return { state, result: 'wrong' };
  return { state: maybeTwist(soup, { ...state, solved: [...state.solved, sentenceId] }), result: 'correct' };
}

export function isSoupSolved(soup: Soup, state: SoupState): boolean {
  return soup.board.every((s) => state.solved.includes(s.id));
}

export type Rating = '一口見底' | '慢慢品完' | '續了好幾碗';

export function rate(asked: number, minimum: number): Rating {
  if (asked <= minimum + 2) return '一口見底';
  if (asked <= minimum + 6) return '慢慢品完';
  return '續了好幾碗';
}
