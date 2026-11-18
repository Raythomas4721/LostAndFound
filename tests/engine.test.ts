import { describe, expect, it } from 'vitest';
import { NIGHTS } from '../src/content/nights';
import { night1 } from '../src/content/nights/night1';
import { ask, availableQuestions, checkSentence, inspect, isSoupSolved, newSoupState, place, rate } from '../src/engine/soup';
import { hintQuestion, minQuestions } from '../src/engine/solver';
import { validateNights, validateSoup } from '../src/engine/validate';
import type { Soup } from '../src/engine/types';

const soup = night1.soup;

describe('內容', () => {
  it('所有晚上都通過驗證，沒有錯誤', () => {
    const { issues } = validateNights(NIGHTS);
    expect(issues.filter((x) => x.level === 'error')).toEqual([]);
  });

  it('第一碗湯最少要問 5 題', () => {
    expect(minQuestions(soup)?.count).toBe(5);
  });
});

describe('問問題', () => {
  it('要先有「秋月」才問得到「去月台是在等人嗎」', () => {
    let s = newSoupState(soup);
    s = inspect(soup, s, 'hs-tag');
    expect(availableQuestions(soup, s).map((q) => q.id)).not.toContain('q-wait');
    s = ask(soup, s, 'q-wife');
    expect(s.unlocked).toContain('qiuyue');
    expect(availableQuestions(soup, s).map((q) => q.id)).toContain('q-wait');
  });

  it('還沒出現的題目問了也沒用', () => {
    const s = newSoupState(soup);
    expect(ask(soup, s, 'q-whom')).toBe(s);
  });

  it('同一題問兩次不會重複記錄', () => {
    let s = newSoupState(soup);
    s = ask(soup, s, 'q-wife');
    expect(ask(soup, s, 'q-wife')).toBe(s);
  });
});

describe('推理板', () => {
  it('類別不對或還沒解鎖的線索詞填不進去', () => {
    const s = newSoupState(soup);
    expect(place(soup, s, 'b1', 'phone')).toBe(s); // 事情不能填人物
    expect(place(soup, s, 'b1', 'qiuyue')).toBe(s); // 還沒解鎖
  });

  it('沒填滿不檢查；填錯不鎖定；填對才鎖定', () => {
    let s = newSoupState(soup);
    s = inspect(soup, s, 'hs-tag');
    s = ask(soup, s, 'q-wife');
    s = ask(soup, s, 'q-sick');

    s = place(soup, s, 'b2', 'memory');
    expect(checkSentence(soup, s, 's2').result).toBe('incomplete');

    s = place(soup, s, 'b3', 'home');
    expect(checkSentence(soup, s, 's2').result).toBe('wrong');

    s = place(soup, s, 'b3', 'platform');
    const r = checkSentence(soup, s, 's2');
    expect(r.result).toBe('correct');
    expect(r.state.solved).toContain('s2');
  });

  it('照最短路徑問完，推理板填得完', () => {
    let s = newSoupState(soup);
    for (const e of soup.evidence) for (const h of e.hotspots) s = inspect(soup, s, h.id);
    for (const id of minQuestions(soup)!.path) s = ask(soup, s, id);
    for (const sentence of soup.board) {
      for (const b of sentence.blanks) s = place(soup, s, b.id, b.answer);
      s = checkSentence(soup, s, sentence.id).state;
    }
    expect(isSoupSolved(soup, s)).toBe(true);
    expect(s.asked.length).toBe(5);
  });
});

describe('提示與評價', () => {
  it('第一杯茶指向最短路徑上的下一題', () => {
    const s = newSoupState(soup);
    const first = hintQuestion(soup, s.unlocked);
    expect(['q-wife', 'q-carved']).toContain(first);
  });

  it('答案都拿到之後就不再提示題目', () => {
    let s = newSoupState(soup);
    for (const id of minQuestions(soup)!.path) s = ask(soup, inspect(soup, s, 'hs-tag'), id);
    expect(hintQuestion(soup, s.unlocked)).toBeNull();
  });

  it('評價依問的題數換算', () => {
    expect(rate(5, 5)).toBe('一口見底');
    expect(rate(10, 5)).toBe('慢慢品完');
    expect(rate(20, 5)).toBe('續了好幾碗');
  });
});

describe('驗證器抓得到壞資料', () => {
  const broken = (patch: (s: Soup) => Soup) => validateSoup(patch(structuredClone(soup)), 1).issues.filter((x) => x.level === 'error');

  it('答案問不到', () => {
    const errs = broken((s) => ({ ...s, questions: s.questions.filter((q) => q.id !== 'q-relief') }));
    expect(errs.some((x) => x.message.includes('問不到'))).toBe(true);
  });

  it('「不重要」卻解鎖東西', () => {
    const errs = broken((s) => ({
      ...s,
      questions: s.questions.map((q) => (q.id === 'q-rib' ? { ...q, unlocks: ['memory'] } : q)),
    }));
    expect(errs.some((x) => x.message.includes('不重要'))).toBe(true);
  });

  it('誘餌不夠', () => {
    const errs = broken((s) => ({ ...s, keywords: s.keywords.filter((k) => k.id !== 'home' && k.id !== 'taxi') }));
    expect(errs.some((x) => x.message.includes('「地點」類'))).toBe(true);
  });

  it('小湯不能說謊', () => {
    const errs = broken((s) => ({
      ...s,
      questions: s.questions.map((q) => (q.id === 'q-lie' ? { ...q, hesitant: true } : q)),
    }));
    expect(errs.some((x) => x.message.includes('hesitant'))).toBe(true);
  });
});
