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

/** 目前看得到的題目（含已經問過的）。 */
export function availableQuestions(soup: Soup, state: SoupState): Question[] {
  return soup.questions.filter((q) => isAvailable(q, state.unlocked));
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
  if (!q || !isAvailable(q, state.unlocked)) return state;
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

/** 句子的空格全部填好才檢查；填對就鎖定。填錯不說錯在哪一格。 */
export function checkSentence(soup: Soup, state: SoupState, sentenceId: string): { state: SoupState; result: SentenceResult } {
  const sentence = soup.board.find((s) => s.id === sentenceId);
  if (!sentence) return { state, result: 'incomplete' };
  if (state.solved.includes(sentenceId)) return { state, result: 'correct' };
  if (sentence.blanks.some((b) => !state.placements[b.id])) return { state, result: 'incomplete' };
  const ok = sentence.blanks.every((b) => state.placements[b.id] === b.answer);
  if (!ok) return { state, result: 'wrong' };
  return { state: { ...state, solved: [...state.solved, sentenceId] }, result: 'correct' };
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
