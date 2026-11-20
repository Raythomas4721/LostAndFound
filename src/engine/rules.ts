import { ask, inspect, type SoupState } from './soup';
import type { Soup, StoryRules } from './types';

/**
 * 湯本的特殊玩法。全部包在基本的 ask / inspect 外面，沒開規則時行為跟原本一樣。
 * 每一條規則都有退路，不會讓玩家卡住。
 */

// ── 限時來電 ──

/** 這碗湯有沒有在計算通話題數。只算小湯裡有 caller 的碗。 */
export function onCall(soup: Soup, rules: StoryRules | undefined): boolean {
  return !!rules?.call && soup.kind === 'small' && !!soup.caller;
}

/** 這一通還能問幾題；沒有限制時回傳 null。 */
export function callLeft(soup: Soup, state: SoupState, rules: StoryRules | undefined): number | null {
  if (!onCall(soup, rules)) return null;
  return Math.max(0, rules!.call!.length - (state.callAsked ?? 0));
}

export function hungUp(soup: Soup, state: SoupState, rules: StoryRules | undefined): boolean {
  return callLeft(soup, state, rules) === 0;
}

/** 回撥：通話題數歸零，回撥次數加一。 */
export function callBack(state: SoupState): SoupState {
  return { ...state, callAsked: 0, calls: (state.calls ?? 0) + 1 };
}

// ── 手電筒 ──

/** 還剩幾格電；沒有手電筒規則時回傳 null。每用一次提示（tea）就補一格。 */
export function battery(soup: Soup, state: SoupState, rules: StoryRules | undefined): number | null {
  if (!rules?.flashlight || soup.evidence.length === 0) return null;
  return Math.max(0, rules.flashlight.battery + state.tea - state.inspected.length);
}

// ── 包好規則的動作 ──

export function askWith(soup: Soup, state: SoupState, questionId: string, rules: StoryRules | undefined): SoupState {
  if (hungUp(soup, state, rules)) return state;
  const next = ask(soup, state, questionId);
  if (next === state || !onCall(soup, rules)) return next;
  return { ...next, callAsked: (next.callAsked ?? 0) + 1 };
}

export function inspectWith(soup: Soup, state: SoupState, hotspotId: string, rules: StoryRules | undefined): SoupState {
  if (battery(soup, state, rules) === 0) return state;
  return inspect(soup, state, hotspotId);
}

// ── 對質 ──

export type ConfrontResult = 'broken' | 'truthful' | 'noproof';

/** 能不能對這一題提出對質：問過、不是更正版、還沒被拆穿、更正版還沒出現。 */
export function canConfront(soup: Soup, state: SoupState, questionId: string, rules: StoryRules | undefined): boolean {
  if (!rules?.confront || (soup.kind !== 'big' && !soup.host)) return false;
  const q = soup.questions.find((x) => x.id === questionId);
  if (!q || q.corrects || !state.asked.includes(q.id)) return false;
  if ((state.confronted ?? []).includes(q.id)) return false;
  return !soup.questions.some((x) => x.corrects === q.id && state.asked.includes(x.id));
}

/**
 * 對質：
 * - 不是謊話 → truthful（什麼都不會變）
 * - 是謊話，但手上沒有 contradictedBy 的線索詞 → noproof
 * - 是謊話，證據也齊了 → broken：更正版立刻出現並自動回答（算對方主動說的，不算題數）
 */
export function confront(soup: Soup, state: SoupState, questionId: string): { state: SoupState; result: ConfrontResult } {
  const q = soup.questions.find((x) => x.id === questionId);
  if (!q?.hesitant) return { state, result: 'truthful' };
  const proof = q.contradictedBy ?? [];
  if (proof.length === 0 || !proof.every((id) => state.unlocked.includes(id))) return { state, result: 'noproof' };
  let next: SoupState = { ...state, confronted: [...(state.confronted ?? []), q.id] };
  const fix = soup.questions.find((x) => x.corrects === q.id);
  if (fix && !next.asked.includes(fix.id)) {
    const unlocked = [...next.unlocked];
    for (const id of fix.unlocks ?? []) if (!unlocked.includes(id)) unlocked.push(id);
    next = { ...next, asked: [...next.asked, fix.id], auto: [...(next.auto ?? []), fix.id], unlocked };
  }
  return { state: next, result: 'broken' };
}
