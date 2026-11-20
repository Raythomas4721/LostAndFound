import { describe, expect, it } from 'vitest';
import { bigSoup as innBig } from '../src/content/inn/bigSoup';
import { inn } from '../src/content/inn';
import { radio } from '../src/content/radio';
import { night1 as radioNight1 } from '../src/content/radio/night1';
import { school } from '../src/content/school';
import { night1 as schoolNight1 } from '../src/content/school/night1';
import { askWith, battery, callBack, callLeft, canConfront, confront, hungUp, inspectWith } from '../src/engine/rules';
import { ask, availableQuestions, checkSentence, inspect, isSoupSolved, newSoupState, visibleBoard, type SoupState } from '../src/engine/soup';
import { advance, answerReverse, currentStep, newRun, type RunState } from '../src/engine/run';
import { tower } from '../src/content/tower';
import { validateSoup } from '../src/engine/validate';
import { night1 as barNight1 } from '../src/content/bar/night1';

describe('限時來電（電台）', () => {
  const soup = radioNight1.soup!;
  const rules = radio.rules;

  it('問滿一通的題數就掛斷，回撥之後可以繼續', () => {
    let s = newSoupState(soup);
    const length = rules!.call!.length;
    expect(callLeft(soup, s, rules)).toBe(length);
    for (let i = 0; i < length; i++) {
      const q = availableQuestions(soup, s).find((x) => !s.asked.includes(x.id))!;
      s = askWith(soup, s, q.id, rules);
    }
    expect(hungUp(soup, s, rules)).toBe(true);
    const q = availableQuestions(soup, s).find((x) => !s.asked.includes(x.id))!;
    expect(askWith(soup, s, q.id, rules)).toBe(s);
    s = callBack(s);
    expect(s.calls).toBe(1);
    expect(askWith(soup, s, q.id, rules).asked).toContain(q.id);
  });

  it('沒有 caller 的碗（老鍾自己回答的）不限題數', () => {
    const tape = radio.nights[3].soup!;
    expect(callLeft(tape, newSoupState(tape), rules)).toBeNull();
  });

  it('別本湯本不受影響', () => {
    expect(callLeft(soup, newSoupState(soup), inn.rules)).toBeNull();
  });
});

describe('對質（民宿）', () => {
  const rules = inn.rules;
  const askAll = (ids: string[]) => ids.reduce((s, id) => ask(innBig, s, id), { ...newSoupState(innBig), unlocked: [...innBig.start, 'backpath', 'mrsjiang', 'mrjiang', 'raincoat', 'xiaoqing'] });

  it('謊話加上證據：當場拆穿，更正版自動回答，原本那題不能再對質', () => {
    let s = askAll(['d-really']);
    expect(canConfront(innBig, s, 'd-really', rules)).toBe(true);
    const r = confront(innBig, s, 'd-really');
    expect(r.result).toBe('broken');
    s = r.state;
    expect(s.asked).toContain('d-really-t');
    expect(s.auto).toContain('d-really-t');
    expect(canConfront(innBig, s, 'd-really', rules)).toBe(false);
    expect(availableQuestions(innBig, s).some((q) => q.id === 'd-really-t')).toBe(true);
  });

  it('謊話但沒有證據：「你有證據嗎？」，什麼都不變', () => {
    const s = ask(innBig, newSoupState(innBig), 'd-really');
    const r = confront(innBig, s, 'd-really');
    expect(r.result).toBe('noproof');
    expect(r.state).toBe(s);
  });

  it('真話：對質不會有任何效果', () => {
    const s = askAll(['v-self']);
    expect(confront(innBig, s, 'v-self').result).toBe('truthful');
  });

  it('沒開對質的湯本不能對質', () => {
    const s = askAll(['d-really']);
    expect(canConfront(innBig, s, 'd-really', school.rules)).toBe(false);
  });
});

describe('手電筒（最後一屆）', () => {
  const soup = schoolNight1.soup!;
  const rules = school.rules;

  it('電用完就不能再細看，每用一次提示補一格', () => {
    let s = newSoupState(soup);
    const spots = soup.evidence.flatMap((e) => e.hotspots);
    expect(battery(soup, s, rules)).toBe(2);
    s = inspectWith(soup, s, spots[0].id, rules);
    s = inspectWith(soup, s, spots[1].id, rules);
    expect(battery(soup, s, rules)).toBe(0);
    expect(inspectWith(soup, s, spots[2].id, rules)).toBe(s);
    s = { ...s, tea: s.tea + 1 };
    expect(battery(soup, s, rules)).toBe(1);
    expect(inspectWith(soup, s, spots[2].id, rules).inspected).toContain(spots[2].id);
  });
});

describe('證人（雙人座）', () => {
  const soup = barNight1.soup!;

  it('每句謊話，同一句話都有人說真話，而且謊話不解鎖線索詞', () => {
    const lies = soup.questions.filter((q) => q.lie);
    expect(lies.length).toBeGreaterThan(0);
    for (const q of lies) {
      expect(q.unlocks ?? []).toEqual([]);
      expect(soup.questions.some((x) => x.text === q.text && !x.lie && x.reply !== q.reply)).toBe(true);
    }
  });

  it('沒有真話對照的謊話，驗證會報錯', () => {
    const broken = { ...soup, questions: soup.questions.filter((q) => !(q.text === '吧台的男人和安安認識嗎？' && !q.lie)) };
    const report = validateSoup(broken, 1);
    expect(report.issues.some((i) => i.level === 'error' && i.message.includes('拆不穿'))).toBe(true);
  });
});

describe('進程驚喜', () => {
  it('插播：其他句子都填對時湯面翻轉，多出新的句子和線索詞，通話重算', () => {
    const soup = radio.nights[1].soup!;
    let s: SoupState = { ...newSoupState(soup), callAsked: 5 };
    expect(visibleBoard(soup, s).some((x) => x.twist)).toBe(false);
    for (const sentence of soup.board.filter((x) => !x.twist)) {
      for (const b of sentence.blanks) s = { ...s, unlocked: [...s.unlocked, b.answer], placements: { ...s.placements, [b.id]: b.answer } };
      s = checkSentence(soup, s, sentence.id).state;
    }
    expect(s.twisted).toBe(true);
    expect(s.callAsked).toBe(0);
    expect(s.unlocked).toContain('onair');
    expect(isSoupSolved(soup, s)).toBe(false);
    expect(visibleBoard(soup, s).some((x) => x.twist)).toBe(true);
  });

  it('換人回答：小湯裡換上來的人說謊，拿到證據就能當場對質', () => {
    const soup = inn.nights[1].soup!;
    expect(soup.host?.name).toBe('江先生');
    let s = ask(soup, newSoupState(soup), 'q-bh-after');
    expect(canConfront(soup, s, 'q-bh-after', inn.rules)).toBe(true);
    expect(confront(soup, s, 'q-bh-after').result).toBe('noproof');
    s = inspect(soup, s, 'hs-mud');
    const r = confront(soup, s, 'q-bh-after');
    expect(r.result).toBe('broken');
    expect(r.state.unlocked).toContain('backpath');
  });

  it('反過來問你：答案立起旗標；沒答完不能前進', () => {
    const nights = tower.nights;
    const n = nights.findIndex((x) => x.after.some((st) => st.kind === 'reverse'));
    const si = nights[n].after.findIndex((st) => st.kind === 'reverse');
    const run: RunState = { ...newRun(), night: n, phase: 'after', step: si };
    expect(currentStep(run, nights)?.kind).toBe('reverse');
    expect(advance(run, nights)).toBe(run);
    const after = answerReverse(run, nights, ['是', '不是', '是', '不重要']);
    expect(after.flags).toContain('slipped');
    expect(after.night > n || after.step > si).toBe(true);
  });

  it('假結局：只是一個步驟，按下去故事繼續', () => {
    const nights = school.nights;
    const n = nights.findIndex((x) => x.after.some((st) => st.kind === 'fakeEnd'));
    const si = nights[n].after.findIndex((st) => st.kind === 'fakeEnd');
    const run: RunState = { ...newRun(), night: n, phase: 'after', step: si };
    expect(currentStep(run, nights)?.kind).toBe('fakeEnd');
    const next = advance(run, nights);
    expect(next.phase).toBe('intro');
    expect(next.night).toBe(n + 1);
  });
});
