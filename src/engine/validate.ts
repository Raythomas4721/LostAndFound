import { boardAnswers, freeKeywords, minQuestions, reachable } from './solver';
import type { Night, Soup } from './types';

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

export function validateSoup(soup: Soup, nightNumber: number): SoupReport {
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
    if (q.hesitant && soup.kind !== 'big') err(`題目 ${q.id} 標了 hesitant，但說謊只能用在大湯`);
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
  const { keywords: reach, questions: reachQ } = reachable(soup);
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
  const best = minQuestions(soup);
  const free = new Set(freeKeywords(soup));
  if (best) {
    const [lo, hi] = questionRange(nightNumber);
    if (best.count === 0) err('不問任何問題就拿得齊所有答案');
    else if (best.count < lo || best.count > hi) err(`最少要問 ${best.count} 題，不在 ${lo}–${hi} 題的範圍內`);
  }
  if (boardAnswers(soup).every((id) => free.has(id))) err('推理板的答案全部一開始就拿得到');

  return { soupId: soup.id, title: soup.title, minQuestions: best?.count ?? null, path: best?.path ?? [], issues };
}

export function validateNights(nights: readonly Night[]): { reports: SoupReport[]; issues: Issue[] } {
  const issues: Issue[] = [];
  nights.forEach((night, i) => {
    if (night.n !== i + 1) issues.push({ level: 'error', where: `第${i + 1}晚`, message: `晚數編號是 ${night.n}，應該是 ${i + 1}` });
    if (night.choice) {
      const optIds = night.choice.options.map((o) => o.id);
      if (optIds.length < 2) issues.push({ level: 'error', where: night.choice.id, message: '選擇至少要有兩個選項' });
      if (new Set(optIds).size !== optIds.length) issues.push({ level: 'error', where: night.choice.id, message: '選項 id 重複' });
    }
  });
  const reports = nights.map((night) => validateSoup(night.soup, night.n));
  for (const r of reports) issues.push(...r.issues);
  return { reports, issues };
}
