import { minQuestions } from './solver';
import { isSoupSolved, newSoupState, rate, type Rating, type SoupState } from './soup';
import type { Choice, Line, Night } from './types';

/**
 * 一晚的流程：intro（開場）→ soup（湯面＋調查＋推理板）→ reveal（湯底）
 * → after（依序播放對話和選擇）→ 下一晚的 intro。最後一晚之後是 end。
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

export function currentNight(run: RunState, nights: readonly Night[]): Night | null {
  return run.phase === 'end' ? null : (nights[run.night] ?? null);
}

export function soupState(run: RunState, night: Night): SoupState {
  return run.soups[night.soup.id] ?? newSoupState(night.soup);
}

export function setSoupState(run: RunState, night: Night, state: SoupState): RunState {
  return { ...run, soups: { ...run.soups, [night.soup.id]: state } };
}

export function finishIntro(run: RunState, nights: readonly Night[]): RunState {
  const night = currentNight(run, nights);
  if (!night || run.phase !== 'intro') return run;
  return { ...setSoupState(run, night, soupState(run, night)), phase: 'soup' };
}

/** 推理板全部填對才能喝完；同時記下評價。 */
export function finishSoup(run: RunState, nights: readonly Night[]): RunState {
  const night = currentNight(run, nights);
  if (!night || run.phase !== 'soup') return run;
  const state = soupState(run, night);
  if (!isSoupSolved(night.soup, state)) return run;
  const best = minQuestions(night.soup)?.count ?? 0;
  return { ...run, phase: 'reveal', ratings: { ...run.ratings, [night.soup.id]: rate(state.asked.length, best) } };
}

export function finishReveal(run: RunState, nights: readonly Night[]): RunState {
  if (run.phase !== 'reveal') return run;
  return settleAfter({ ...run, phase: 'after', step: 0, picked: null }, nights);
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
  return step;
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
  return settleAfter({ ...run, step: run.step + 1, picked: null }, nights);
}

/** step 超出這一晚的範圍時，收下大湯線索，進入下一晚。 */
function settleAfter(run: RunState, nights: readonly Night[]): RunState {
  const night = nights[run.night];
  if (run.step < night.after.length) return run;
  const bigClues = [...run.bigClues, ...(night.bigClues ?? []).filter((c) => !run.bigClues.includes(c))];
  const nextIndex = run.night + 1;
  if (nextIndex >= nights.length) return { ...run, bigClues, phase: 'end', step: 0, picked: null };
  return { ...run, bigClues, night: nextIndex, phase: 'intro', step: 0, picked: null };
}

export function isRunState(x: unknown): x is RunState {
  if (!x || typeof x !== 'object') return false;
  const r = x as Partial<RunState>;
  return r.version === 1 && typeof r.night === 'number' && typeof r.phase === 'string' && typeof r.soups === 'object' && Array.isArray(r.flags);
}
