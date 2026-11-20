import { describe, expect, it } from 'vitest';
import { bigSoup } from '../src/content/lostandfound/bigSoup';
import { ENDINGS, EPILOGUES } from '../src/content/lostandfound/endings';
import { NIGHTS } from '../src/content/lostandfound/nights';
import { night1 } from '../src/content/lostandfound/nights/night1';
import { matches } from '../src/engine/conditions';
import { teaHint } from '../src/engine/hints';
import { advance, choose, currentStep, finishIntro, finishReveal, finishSoup, freeFor, isRunState, newRun, pickEnding, pickEpilogues, setSoupStateFor, soupStateFor, type RunState } from '../src/engine/run';
import { minQuestions } from '../src/engine/solver';
import { applyCorrections, ask, availableQuestions, checkSentence, inspect, newSoupState, place, type SoupState } from '../src/engine/soup';
import type { Soup } from '../src/engine/types';

/** 照最短路徑把一碗湯喝完。 */
function solve(soup: Soup, start: SoupState): SoupState {
  let s = start;
  for (const e of soup.evidence) for (const h of e.hotspots) s = inspect(soup, s, h.id);
  for (const id of minQuestions(soup, [...s.unlocked, ...(freeFor(soup, NIGHTS) ?? [])])?.path ?? []) s = ask(soup, s, id);
  for (const sentence of soup.board) {
    for (const b of sentence.blanks) s = place(soup, s, b.id, b.answer);
    s = checkSentence(soup, s, sentence.id).state;
  }
  return s;
}

/** 照 picks（選擇 id → 選項 id）走完整輪；沒指定的選第一個。 */
function playThrough(picks: Record<string, string> = {}): RunState {
  let run: RunState = newRun();
  for (let guard = 0; guard < 500 && run.phase !== 'end'; guard++) {
    const night = NIGHTS[run.night];
    if (run.phase === 'intro') run = finishIntro(run, NIGHTS);
    else if (run.phase === 'soup' && night.soup) run = finishSoup(setSoupStateFor(run, night.soup, solve(night.soup, soupStateFor(run, night.soup))), NIGHTS);
    else if (run.phase === 'reveal') run = finishReveal(run, NIGHTS);
    else {
      const step = currentStep(run, NIGHTS);
      run = step?.kind === 'choice' ? choose(run, NIGHTS, picks[step.choice.id] ?? step.choice.options[0].id) : advance(run, NIGHTS);
    }
  }
  return run;
}

describe('整輪流程', () => {
  it('每個選擇都選第一個選項，可以走完七晚，而且是真結局', () => {
    const run = playThrough();
    expect(run.phase).toBe('end');
    expect(Object.keys(run.ratings)).toHaveLength(NIGHTS.filter((n) => n.soup).length);
    expect(pickEnding(ENDINGS, run.flags)?.id).toBe('last-train');
  });

  it('三種結局都走得到', () => {
    expect(pickEnding(ENDINGS, playThrough({ 'c-box': 'shuheng' }).flags)?.id).toBe('carried');
    expect(pickEnding(ENDINGS, playThrough({ 'c-box': 'me' }).flags)?.id).toBe('late-letter');
    // 鑰匙收著、也沒站在溫伯那邊：就算請溫伯交，也不是真結局
    const cold = playThrough({ 'c-key': 'keep', 'c-bell': 'shelf', 'c-ticket': 'throw', 'c-fang': 'myself', 'c-box': 'wen' });
    expect(pickEnding(ENDINGS, cold.flags)?.id).toBe('late-letter');
  });

  it('第四晚沒告訴書恆，第六晚還有第二次機會', () => {
    const run = playThrough({ 'c-tell': 'wait', 'c-tell-again': 'tell' });
    expect(run.flags).toContain('toldShuheng');
    expect(run.choices['c-tell-again']).toBe('tell');
    // 第四晚就說了，第六晚的那個選擇會被跳過
    expect(playThrough().choices['c-tell-again']).toBeUndefined();
  });

  it('沒有湯的晚上，開場之後直接進入 after', () => {
    const sixth = NIGHTS.findIndex((n) => !n.soup);
    const run = finishIntro({ ...newRun(), night: sixth }, NIGHTS);
    expect(run.phase).toBe('after');
  });

  it('推理板沒填完不能喝完', () => {
    const run = finishIntro(newRun(), NIGHTS);
    expect(finishSoup(run, NIGHTS).phase).toBe('soup');
  });

  it('選項的旗標會記下來，回應播完才前進', () => {
    let run: RunState = { ...newRun(), phase: 'after', step: 0 };
    run = choose(run, NIGHTS, 'promise');
    expect(run.flags).toContain('promisedPan');
    expect(currentStep(run, NIGHTS)?.kind).toBe('reply');
    run = advance(run, NIGHTS);
    expect(run.step).toBe(1);
    expect(currentStep(run, NIGHTS)?.kind).toBe('lines');
  });

  it('還沒選就不能前進', () => {
    const run: RunState = { ...newRun(), phase: 'after', step: 0 };
    expect(advance(run, NIGHTS)).toBe(run);
  });

  it('存檔格式檢查', () => {
    expect(isRunState(newRun())).toBe(true);
    expect(isRunState({ version: 2 })).toBe(false);
    expect(isRunState(null)).toBe(false);
  });
});

describe('大湯：說謊與更正', () => {
  it('第一晚結束時大湯打開，之後每晚多一些線索詞', () => {
    const run = playThrough();
    const big = soupStateFor(run, bigSoup);
    for (const id of ['key', 'zhuoyuan', 'heqiutang', 'confession', 'afraid']) expect(big.unlocked).toContain(id);
  });

  it('坦白之前看到的是謊話；坦白之後換成更正版，問過的會自動重新回答', () => {
    let s = newSoupState(bigSoup);
    s = ask(bigSoup, s, 'b-still');
    const before = availableQuestions(bigSoup, s).map((q) => q.id);
    expect(before).toContain('b-still');
    expect(before).not.toContain('b-still-t');

    s = { ...s, unlocked: [...s.unlocked, 'confession'] };
    const after = availableQuestions(bigSoup, s).map((q) => q.id);
    expect(after).toContain('b-still-t');
    expect(after).not.toContain('b-still');

    const fixed = applyCorrections(bigSoup, s);
    expect(fixed.corrected).toEqual(['b-still-t']);
    expect(fixed.state.auto).toEqual(['b-still-t']);
  });
});

describe('條件與尾聲', () => {
  it('條件的各種組合', () => {
    expect(matches({ all: ['a'], none: ['b'] }, ['a'])).toBe(true);
    expect(matches({ all: ['a'], none: ['b'] }, ['a', 'b'])).toBe(false);
    expect(matches({ atLeast: { n: 2, of: ['a', 'b', 'c'] } }, ['a', 'c'])).toBe(true);
    expect(matches({ or: [{ all: ['x'] }, { all: ['y'] }] }, ['y'])).toBe(true);
    expect(matches(undefined, [])).toBe(true);
  });

  it('每個角色只有一條尾聲', () => {
    const eps = pickEpilogues(EPILOGUES, ['promisedPan', 'bellToWen', 'ticketKept']);
    const who = eps.map((e) => e.who);
    expect(new Set(who).size).toBe(who.length);
    expect(eps.find((e) => e.who === '老潘')?.id).toBe('pan-promise');
    expect(new Set(EPILOGUES.map((e) => e.who)).size).toBe(eps.length);
  });
});

describe('溫伯的茶', () => {
  const soup = night1.soup!;

  it('月台還沒細看時，先叫你細看', () => {
    expect(teaHint(soup, newSoupState(soup)).kind).toBe('inspect');
  });

  it('細看完之後，指向一題問得到的題目', () => {
    let s = newSoupState(soup);
    for (const h of soup.evidence[0].hotspots) s = inspect(soup, s, h.id);
    const h = teaHint(soup, s);
    expect(h.kind).toBe('question');
    if (h.kind === 'question') expect(s.unlocked).toContain(h.topic);
  });

  it('線索詞都齊了，就告訴你一個空格', () => {
    let s = newSoupState(soup);
    for (const h of soup.evidence[0].hotspots) s = inspect(soup, s, h.id);
    for (const id of minQuestions(soup)!.path) s = ask(soup, s, id);
    expect(teaHint(soup, s)).toEqual({ kind: 'blank', sentenceId: 's1', blankId: 'b1', keywordId: 'qiuyue' });
  });

  it('大湯缺的線索詞要等之後的晚上，茶會說還不到時候', () => {
    expect(teaHint(bigSoup, newSoupState(bigSoup)).kind).toBe('later');
  });
});
