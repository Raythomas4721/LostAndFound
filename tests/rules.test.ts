import { describe, expect, it } from 'vitest';
import { bigSoup as innBig } from '../src/content/inn/bigSoup';
import { inn } from '../src/content/inn';
import { radio } from '../src/content/radio';
import { night1 as radioNight1 } from '../src/content/radio/night1';
import { school } from '../src/content/school';
import { night1 as schoolNight1 } from '../src/content/school/night1';
import { askWith, battery, callBack, callLeft, canConfront, confront, hungUp, inspectWith } from '../src/engine/rules';
import { ask, availableQuestions, newSoupState } from '../src/engine/soup';

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
