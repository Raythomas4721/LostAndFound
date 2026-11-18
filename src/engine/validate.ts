import { flagsIn, matches } from './conditions';
import { freeFor, pickEnding } from './run';
import { boardAnswers, freeKeywords, minQuestions, reachable } from './solver';
import type { Ending, Epilogue, Night, Soup } from './types';

export interface Issue {
  level: 'error' | 'warn';
  where: string;
  message: string;
}

export interface SoupReport {
  soupId: string;
  title: string;
  minQuestions: number | null;
  path: string[];
  issues: Issue[];
}

/** 最少題數的範圍：第一碗湯是教學，題數要少。 */
export function questionRange(night: number): [number, number] {
  return night === 1 ? [4, 8] : [1, 12];
}

export function validateSoup(soup: Soup, nightNumber: number, free: readonly string[] = freeKeywords(soup)): SoupReport {
  const issues: Issue[] = [];
  const err = (message: string) => issues.push({ level: 'error', where: soup.id, message });
  const warn = (message: string) => issues.push({ level: 'warn', where: soup.id, message });

  // ── id 不重複 ──
  const ids = [
    ...soup.keywords.map((k) => k.id),
    ...soup.questions.map((q) => q.id),
    ...soup.evidence.map((e) => e.id),
    ...soup.evidence.flatMap((e) => e.hotspots.map((h) => h.id)),
    ...soup.board.map((s) => s.id),
    ...soup.board.flatMap((s) => s.blanks.map((b) => b.id)),
  ];
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) err(`id 重複：${[...new Set(dup)].join('、')}`);

  // ── 參照都存在 ──
  const kwIds = new Set(soup.keywords.map((k) => k.id));
  const checkRef = (id: string, from: string) => {
    if (!kwIds.has(id)) err(`${from} 指到不存在的線索詞「${id}」`);
  };
  soup.start.forEach((id) => checkRef(id, '起始線索詞'));
  for (const q of soup.questions) {
    checkRef(q.topic, `題目 ${q.id} 的 topic`);
    (q.unlocks ?? []).forEach((id) => checkRef(id, `題目 ${q.id} 的 unlocks`));
    (q.requires ?? []).forEach((id) => checkRef(id, `題目 ${q.id} 的 requires`));
    if (q.reply === '不重要' && (q.unlocks ?? []).length > 0) err(`題目 ${q.id} 回答「不重要」卻解鎖了線索詞`);
    if (q.hesitant) {
      if (soup.kind !== 'big') err(`題目 ${q.id} 標了 hesitant，但說謊只能用在大湯`);
      if ((q.unlocks ?? []).length > 0) err(`題目 ${q.id} 是謊話，不能解鎖線索詞`);
      if (!soup.questions.some((x) => x.corrects === q.id)) err(`題目 ${q.id} 是謊話，卻沒有更正版（corrects）`);
    }
    if (q.corrects) {
      const target = soup.questions.find((x) => x.id === q.corrects);
      if (!target) err(`題目 ${q.id} 更正的「${q.corrects}」不存在`);
      else if (!target.hesitant) err(`題目 ${q.id} 更正的「${q.corrects}」沒有標 hesitant`);
      else if (target.topic !== q.topic) err(`題目 ${q.id} 跟它更正的題目要掛在同一個線索詞底下`);
    }
  }
  for (const e of soup.evidence) for (const h of e.hotspots) h.unlocks.forEach((id) => checkRef(id, `熱點 ${h.id}`));

  // ── 推理板 ──
  const byId = new Map(soup.keywords.map((k) => [k.id, k]));
  for (const s of soup.board) {
    if (s.blanks.length === 0) err(`句子 ${s.id} 沒有空格`);
    const placeholders = [...s.text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
    for (const b of s.blanks) {
      if (!placeholders.includes(b.id)) err(`句子 ${s.id} 的文字裡沒有空格 {${b.id}}`);
      const kw = byId.get(b.answer);
      if (!kw) err(`空格 ${b.id} 的答案「${b.answer}」不存在`);
      else if (kw.category !== b.category) err(`空格 ${b.id} 要填「${b.category}」，答案「${kw.label}」卻是「${kw.category}」`);
    }
    for (const p of placeholders) if (!s.blanks.some((b) => b.id === p)) err(`句子 ${s.id} 的 {${p}} 沒有對應的空格`);
  }

  // ── 拿得到 ──
  const { keywords: reach, questions: reachQ } = reachable(soup, free);
  for (const id of boardAnswers(soup)) if (!reach.has(id)) err(`推理板的答案「${byId.get(id)?.label ?? id}」問不到`);
  for (const k of soup.keywords) if (!reach.has(k.id)) warn(`線索詞「${k.label}」永遠拿不到`);
  for (const q of soup.questions) if (!reachQ.has(q.id)) warn(`題目 ${q.id}「${q.text}」永遠不會出現`);

  // ── 誘餌：每個空格的類別至少有 3 個拿得到的線索詞 ──
  const usedCategories = new Set(soup.board.flatMap((s) => s.blanks.map((b) => b.category)));
  for (const cat of usedCategories) {
    const n = soup.keywords.filter((k) => k.category === cat && reach.has(k.id)).length;
    if (n < 3) err(`「${cat}」類只有 ${n} 個拿得到的線索詞，推理板會太好猜（至少 3 個）`);
  }

  // ── 最少題數 ──
  const best = minQuestions(soup, free);
  if (best) {
    const [lo, hi] = questionRange(nightNumber);
    if (best.count === 0) err('不問任何問題就拿得齊所有答案');
    else if (best.count < lo || best.count > hi) err(`最少要問 ${best.count} 題，不在 ${lo}–${hi} 題的範圍內`);
  }

  return { soupId: soup.id, title: soup.title, minQuestions: best?.count ?? null, path: best?.path ?? [], issues };
}

/**
 * 把所有選擇的組合都走一遍（會跳過條件不成立的選擇），回傳每種走法最後的旗標。
 * 選擇不多（十個以內、每個 2–3 種），直接列舉。
 */
export function enumerateFlagSets(nights: readonly Night[]): string[][] {
  const results: string[][] = [];
  const walk = (ni: number, si: number, flags: string[]) => {
    if (ni >= nights.length) {
      results.push(flags);
      return;
    }
    const night = nights[ni];
    if (si >= night.after.length) return walk(ni + 1, 0, flags);
    const step = night.after[si];
    if (step.kind !== 'choice' || !matches(step.when, flags)) return walk(ni, si + 1, flags);
    for (const o of step.choice.options) walk(ni, si + 1, o.flag && !flags.includes(o.flag) ? [...flags, o.flag] : flags);
  };
  walk(0, 0, []);
  return results;
}

export function validateNights(
  nights: readonly Night[],
  endings: readonly Ending[] = [],
  epilogues: readonly Epilogue[] = [],
): { reports: SoupReport[]; issues: Issue[]; endingCounts: Record<string, number> } {
  const issues: Issue[] = [];
  const err = (where: string, message: string) => issues.push({ level: 'error', where, message });

  const allFlags = new Set(nights.flatMap((n) => n.after.flatMap((s) => (s.kind === 'choice' ? s.choice.options.flatMap((o) => (o.flag ? [o.flag] : [])) : []))));
  const checkFlags = (where: string, list: string[]) => {
    for (const f of list) if (!allFlags.has(f)) err(where, `條件裡的旗標「${f}」沒有任何選項會立起來`);
  };

  nights.forEach((night, i) => {
    const where = `第${i + 1}晚`;
    if (night.n !== i + 1) err(where, `晚數編號是 ${night.n}，應該是 ${i + 1}`);
    for (const step of night.after) {
      checkFlags(where, flagsIn(step.when));
      if (step.kind !== 'choice') continue;
      const optIds = step.choice.options.map((o) => o.id);
      if (optIds.length < 2) err(step.choice.id, '選擇至少要有兩個選項');
      if (new Set(optIds).size !== optIds.length) err(step.choice.id, '選項 id 重複');
    }
  });
  const choiceIds = nights.flatMap((n) => n.after.flatMap((s) => (s.kind === 'choice' ? [s.choice.id] : [])));
  const dupChoices = choiceIds.filter((id, i) => choiceIds.indexOf(id) !== i);
  if (dupChoices.length) err('選擇', `選擇 id 重複：${dupChoices.join('、')}`);
  const soupIds = nights.flatMap((n) => (n.soup ? [n.soup.id] : []));
  if (new Set(soupIds).size !== soupIds.length) err('湯', '湯的 id 重複');

  // ── 大湯 ──
  const bigNights = nights.filter((n) => n.soup?.kind === 'big');
  if (bigNights.length > 1) err('大湯', '只能有一碗大湯');
  const big = bigNights[0]?.soup;
  if (big) {
    if (bigNights[0] !== nights[nights.length - 1]) err('大湯', '大湯要放在最後一晚');
    const kw = new Set(big.keywords.map((k) => k.id));
    nights.forEach((n, i) => (n.bigUnlocks ?? []).forEach((id) => kw.has(id) || err(`第${i + 1}晚`, `bigUnlocks 的「${id}」不是大湯的線索詞`)));
  } else if (nights.some((n) => n.bigUnlocks?.length)) err('大湯', '有 bigUnlocks，卻沒有大湯');

  const reports = nights.flatMap((night) => (night.soup ? [validateSoup(night.soup, night.n, freeFor(night.soup, nights) ?? freeKeywords(night.soup))] : []));
  for (const r of reports) issues.push(...r.issues);

  // ── 結局：每種選法都要有結局，每個結局都要走得到 ──
  const endingCounts: Record<string, number> = {};
  if (endings.length) {
    for (const e of endings) {
      checkFlags(`結局 ${e.id}`, flagsIn(e.when));
      endingCounts[e.id] = 0;
    }
    for (const ep of epilogues) checkFlags(`尾聲 ${ep.id}`, flagsIn(ep.when));
    for (const flags of enumerateFlagSets(nights)) {
      const e = pickEnding(endings, flags);
      if (!e) {
        err('結局', `這組選擇沒有對應的結局：${flags.join('、') || '（沒有旗標）'}`);
        break;
      }
      endingCounts[e.id]++;
    }
    for (const e of endings) if (endingCounts[e.id] === 0) err('結局', `結局「${e.title}」走不到`);
  }

  return { reports, issues, endingCounts };
}
