import { matches } from './conditions';
import { minQuestions } from './solver';
import { applyCorrections, askedCount, isSoupSolved, newSoupState, rate, type Rating, type SoupState } from './soup';
import type { Choice, Ending, Line, Night, Soup } from './types';

/**
 * 一晚的流程：intro（開場）→ soup（湯面＋調查＋推理板）→ reveal（湯底）
 * → after（依序播放對話和選擇）→ 下一晚的 intro。最後一晚之後是 end。
 * 沒有湯的晚上，intro 之後直接進 after。
 */
export type Phase = 'intro' | 'soup' | 'reveal' | 'after' | 'end';

export interface RunState {
  version: 1;
  night: number;
  phase: Phase;
  /** after 階段播到第幾步 */
  step: number;
  /** 在 after 階段剛選的選項；有值時畫面先播它的回應，再前進 */
  picked: string | null;
  soups: Record<string, SoupState>;
  flags: string[];
  /** 選擇 id → 選項 id */
  choices: Record<string, string>;
  bigClues: string[];
  ratings: Record<string, Rating>;
}

export function newRun(): RunState {
  return { version: 1, night: 0, phase: 'intro', step: 0, picked: null, soups: {}, flags: [], choices: {}, bigClues: [], ratings: {} };
}

export function bigSoupOf(nights: readonly Night[]): Soup | null {
  return nights.find((n) => n.soup?.kind === 'big')?.soup ?? null;
}

export function currentNight(run: RunState, nights: readonly Night[]): Night | null {
  return run.phase === 'end' ? null : (nights[run.night] ?? null);
}

export function soupStateFor(run: RunState, soup: Soup): SoupState {
  return run.soups[soup.id] ?? newSoupState(soup);
}

export function setSoupStateFor(run: RunState, soup: Soup, state: SoupState): RunState {
  return { ...run, soups: { ...run.soups, [soup.id]: state } };
}

/** 從 from 開始，第一個條件成立的步驟；都不成立就回傳 after 的長度（代表這一晚結束）。 */
function nextVisible(night: Night, from: number, flags: readonly string[]): number {
  let i = from;
  while (i < night.after.length && !matches(night.after[i].when, flags)) i++;
  return i;
}

export function finishIntro(run: RunState, nights: readonly Night[]): RunState {
  const night = currentNight(run, nights);
  if (!night || run.phase !== 'intro') return run;
  if (!night.soup) return settleAfter({ ...run, phase: 'after', step: nextVisible(night, 0, run.flags), picked: null }, nights);
  return { ...setSoupStateFor(run, night.soup, soupStateFor(run, night.soup)), phase: 'soup' };
}

/** 推理板全部填對才能喝完；同時記下評價。 */
export function finishSoup(run: RunState, nights: readonly Night[]): RunState {
  const night = currentNight(run, nights);
  if (!night?.soup || run.phase !== 'soup') return run;
  const state = soupStateFor(run, night.soup);
  if (!isSoupSolved(night.soup, state)) return run;
  const best = minQuestions(night.soup, freeFor(night.soup, nights))?.count ?? 0;
  return { ...run, phase: 'reveal', ratings: { ...run.ratings, [night.soup.id]: rate(askedCount(state), best) } };
}

/** 求解器的起點：大湯要算上每一晚解鎖給它的線索詞。 */
export function freeFor(soup: Soup, nights: readonly Night[]): string[] | undefined {
  if (soup.kind !== 'big') return undefined;
  const set = new Set(soup.start);
  for (const n of nights) for (const id of n.bigUnlocks ?? []) set.add(id);
  for (const e of soup.evidence) for (const h of e.hotspots) for (const id of h.unlocks) set.add(id);
  return [...set];
}

export function finishReveal(run: RunState, nights: readonly Night[]): RunState {
  const night = currentNight(run, nights);
  if (!night || run.phase !== 'reveal') return run;
  return settleAfter({ ...run, phase: 'after', step: nextVisible(night, 0, run.flags), picked: null }, nights);
}

/** 目前 after 階段要顯示的東西。 */
export function currentStep(run: RunState, nights: readonly Night[]): { kind: 'lines'; lines: Line[] } | { kind: 'choice'; choice: Choice } | { kind: 'reply'; lines: Line[] } | null {
  const night = currentNight(run, nights);
  if (!night || run.phase !== 'after') return null;
  const step = night.after[run.step];
  if (!step) return null;
  if (step.kind === 'choice' && run.picked) {
    const option = step.choice.options.find((o) => o.id === run.picked);
    return { kind: 'reply', lines: option?.reply ?? [] };
  }
  return step.kind === 'lines' ? { kind: 'lines', lines: step.lines } : { kind: 'choice', choice: step.choice };
}

export function choose(run: RunState, nights: readonly Night[], optionId: string): RunState {
  const night = currentNight(run, nights);
  const step = night?.after[run.step];
  if (!night || run.phase !== 'after' || !step || step.kind !== 'choice' || run.picked) return run;
  const option = step.choice.options.find((o) => o.id === optionId);
  if (!option) return run;
  const flags = option.flag && !run.flags.includes(option.flag) ? [...run.flags, option.flag] : run.flags;
  const next = { ...run, flags, choices: { ...run.choices, [step.choice.id]: optionId }, picked: optionId };
  // 沒有回應的選項直接前進
  return option.reply && option.reply.length > 0 ? next : advance(next, nights);
}

/** 對話播完、或選項的回應播完之後呼叫。 */
export function advance(run: RunState, nights: readonly Night[]): RunState {
  const night = currentNight(run, nights);
  if (!night || run.phase !== 'after') return run;
  const step = night.after[run.step];
  if (step?.kind === 'choice' && !run.picked) return run; // 還沒選
  return settleAfter({ ...run, step: nextVisible(night, run.step + 1, run.flags), picked: null }, nights);
}

/** step 超出這一晚的範圍時：收下大湯線索、解鎖大湯線索詞，進入下一晚。 */
function settleAfter(run: RunState, nights: readonly Night[]): RunState {
  const night = nights[run.night];
  if (run.step < night.after.length) return run;
  const bigClues = [...run.bigClues, ...(night.bigClues ?? []).filter((c) => !run.bigClues.includes(c))];
  let next: RunState = { ...run, bigClues };

  const big = bigSoupOf(nights);
  if (big) {
    const before = soupStateFor(next, big);
    const unlocked = [...before.unlocked, ...(night.bigUnlocks ?? []).filter((id) => !before.unlocked.includes(id))];
    next = setSoupStateFor(next, big, applyCorrections(big, { ...before, unlocked }).state);
  }

  const nextIndex = run.night + 1;
  if (nextIndex >= nights.length) return { ...next, phase: 'end', step: 0, picked: null };
  return { ...next, night: nextIndex, phase: 'intro', step: 0, picked: null };
}

export function pickEnding(endings: readonly Ending[], flags: readonly string[]): Ending | null {
  return endings.find((e) => matches(e.when, flags)) ?? null;
}

export function isRunState(x: unknown): x is RunState {
  if (!x || typeof x !== 'object') return false;
  const r = x as Partial<RunState>;
  return r.version === 1 && typeof r.night === 'number' && typeof r.phase === 'string' && typeof r.soups === 'object' && Array.isArray(r.flags);
}
