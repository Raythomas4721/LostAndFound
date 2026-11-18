import { describe, expect, it } from 'vitest';
import { NIGHTS } from '../src/content/nights';
import { night1 } from '../src/content/nights/night1';
import { teaHint } from '../src/engine/hints';
import { advance, choose, currentStep, finishIntro, finishReveal, finishSoup, isRunState, newRun, setSoupState, soupState, type RunState } from '../src/engine/run';
import { minQuestions } from '../src/engine/solver';
import { ask, checkSentence, inspect, newSoupState, place, type SoupState } from '../src/engine/soup';
import type { Night } from '../src/engine/types';

/** 照最短路徑把一碗湯喝完。 */
function solve(night: Night, start: SoupState): SoupState {
  const soup = night.soup;
  let s = start;
  for (const e of soup.evidence) for (const h of e.hotspots) s = inspect(soup, s, h.id);
  for (const id of minQuestions(soup)!.path) s = ask(soup, s, id);
  for (const sentence of soup.board) {
    for (const b of sentence.blanks) s = place(soup, s, b.id, b.answer);
    s = checkSentence(soup, s, sentence.id).state;
  }
  return s;
}

describe('整輪流程', () => {
  it('每個選擇都選第一個選項，可以從第一晚走到最後', () => {
    let run: RunState = newRun();
    for (let guard = 0; guard < 200 && run.phase !== 'end'; guard++) {
      const night = NIGHTS[run.night];
      if (run.phase === 'intro') run = finishIntro(run, NIGHTS);
      else if (run.phase === 'soup') run = finishSoup(setSoupState(run, night, solve(night, soupState(run, night))), NIGHTS);
      else if (run.phase === 'reveal') run = finishReveal(run, NIGHTS);
      else {
        const step = currentStep(run, NIGHTS);
        run = step?.kind === 'choice' ? choose(run, NIGHTS, step.choice.options[0].id) : advance(run, NIGHTS);
      }
    }
    expect(run.phase).toBe('end');
    expect(Object.keys(run.ratings)).toHaveLength(NIGHTS.length);
    expect(Object.values(run.ratings).every((r) => r === '一口見底')).toBe(true);
    expect(run.bigClues.length).toBeGreaterThan(0);
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

describe('溫伯的茶', () => {
  const soup = night1.soup;

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
    const h = teaHint(soup, s);
    expect(h).toEqual({ kind: 'blank', sentenceId: 's1', blankId: 'b1', keywordId: 'qiuyue' });
  });
});
