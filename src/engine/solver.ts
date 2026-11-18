import { isAvailable } from './soup';
import type { Soup } from './types';

/** 不用問就拿得到的線索詞：起始的，加上所有細看得到的（細看免費）。 */
export function freeKeywords(soup: Soup): string[] {
  const set = new Set(soup.start);
  for (const e of soup.evidence) for (const h of e.hotspots) for (const id of h.unlocks) set.add(id);
  return [...set];
}

/** 從 from 出發，把所有能問的題目都問過，最後拿得到的線索詞和問得到的題目。 */
export function reachable(soup: Soup, from: readonly string[] = freeKeywords(soup)): { keywords: Set<string>; questions: Set<string> } {
  const keywords = new Set(from);
  const questions = new Set<string>();
  let changed = true;
  while (changed) {
    changed = false;
    for (const q of soup.questions) {
      if (questions.has(q.id) || !isAvailable(q, [...keywords])) continue;
      questions.add(q.id);
      changed = true;
      for (const id of q.unlocks ?? []) keywords.add(id);
    }
  }
  return { keywords, questions };
}

export function boardAnswers(soup: Soup): string[] {
  return [...new Set(soup.board.flatMap((s) => s.blanks.map((b) => b.answer)))];
}

/**
 * 拿齊推理板所有答案最少要問幾題，以及其中一條最短路徑。
 * 用廣度優先搜尋，狀態是「已解鎖的線索詞集合」；只考慮會解鎖新東西的題目。
 * from 預設是不用問就拿得到的線索詞；給玩家目前的解鎖狀態，就能算出提示。
 * 拿不齊時回傳 null。
 */
export function minQuestions(soup: Soup, from: readonly string[] = freeKeywords(soup)): { count: number; path: string[] } | null {
  const goal = boardAnswers(soup);
  const done = (set: ReadonlySet<string>) => goal.every((id) => set.has(id));
  const startSet = new Set(from);
  if (done(startSet)) return { count: 0, path: [] };

  const key = (set: ReadonlySet<string>) => [...set].sort().join('|');
  const seen = new Set([key(startSet)]);
  let frontier: { set: Set<string>; path: string[] }[] = [{ set: startSet, path: [] }];

  while (frontier.length > 0) {
    const next: typeof frontier = [];
    for (const node of frontier) {
      const unlocked = [...node.set];
      for (const q of soup.questions) {
        if (!isAvailable(q, unlocked)) continue;
        const gained = (q.unlocks ?? []).filter((id) => !node.set.has(id));
        if (gained.length === 0) continue;
        const set = new Set(node.set);
        for (const id of gained) set.add(id);
        const path = [...node.path, q.id];
        if (done(set)) return { count: path.length, path };
        const k = key(set);
        if (seen.has(k)) continue;
        seen.add(k);
        next.push({ set, path });
      }
    }
    frontier = next;
  }
  return null;
}

/**
 * 第一杯茶：從玩家目前已解鎖的線索詞出發，最短路徑上的下一題。
 * 已經不需要再問就回傳 null（這時該提示推理板）。
 */
export function hintQuestion(soup: Soup, unlocked: readonly string[]): string | null {
  const from = new Set([...unlocked, ...freeKeywords(soup)]);
  const result = minQuestions(soup, [...from]);
  return result && result.path.length > 0 ? result.path[0] : null;
}
