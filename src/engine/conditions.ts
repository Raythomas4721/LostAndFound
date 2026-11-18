import type { Condition } from './types';

export function matches(cond: Condition | undefined, flags: readonly string[]): boolean {
  if (!cond) return true;
  const has = (f: string) => flags.includes(f);
  if (cond.all && !cond.all.every(has)) return false;
  if (cond.any && !cond.any.some(has)) return false;
  if (cond.none && cond.none.some(has)) return false;
  if (cond.atLeast && cond.atLeast.of.filter(has).length < cond.atLeast.n) return false;
  if (cond.or && !cond.or.some((c) => matches(c, flags))) return false;
  return true;
}

/** 條件裡提到的所有旗標，給驗證器檢查拼字用。 */
export function flagsIn(cond: Condition | undefined): string[] {
  if (!cond) return [];
  return [...(cond.all ?? []), ...(cond.any ?? []), ...(cond.none ?? []), ...(cond.atLeast?.of ?? []), ...(cond.or ?? []).flatMap(flagsIn)];
}
