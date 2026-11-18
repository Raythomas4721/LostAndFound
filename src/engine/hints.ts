import { boardAnswers, freeKeywords, hintQuestion } from './solver';
import type { SoupState } from './soup';
import type { Soup } from './types';

export type Hint =
  | { kind: 'inspect' }
  | { kind: 'question'; questionId: string; topic: string }
  | { kind: 'blank'; sentenceId: string; blankId: string; keywordId: string }
  | { kind: 'later' }
  | { kind: 'none' };

/**
 * 溫伯的茶。先看還缺不缺線索詞：
 * - 缺的是細看就拿得到的 → 叫你去細看失物
 * - 缺的要靠問 → 指出最短路徑上的下一題
 * 線索詞都齊了 → 直接告訴你一個還沒填對的空格
 */
export function teaHint(soup: Soup, state: SoupState): Hint {
  const unlocked = new Set(state.unlocked);
  const missing = boardAnswers(soup).filter((id) => !unlocked.has(id));
  if (missing.length > 0) {
    const free = new Set(freeKeywords(soup));
    if (missing.some((id) => free.has(id))) return { kind: 'inspect' };
    const qid = hintQuestion(soup, state.unlocked);
    if (qid) {
      const q = soup.questions.find((x) => x.id === qid)!;
      const needs = [q.topic, ...(q.requires ?? [])];
      if (needs.some((id) => !unlocked.has(id))) return { kind: 'inspect' };
      return { kind: 'question', questionId: qid, topic: q.topic };
    }
    // 缺的線索詞要等之後的晚上才拿得到（大湯）
    return { kind: 'later' };
  }
  for (const s of soup.board) {
    if (state.solved.includes(s.id)) continue;
    const blank = s.blanks.find((b) => state.placements[b.id] !== b.answer);
    if (blank) return { kind: 'blank', sentenceId: s.id, blankId: blank.id, keywordId: blank.answer };
  }
  return { kind: 'none' };
}
