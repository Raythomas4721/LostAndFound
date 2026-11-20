// 用「亂問、亂填、卡住就喝茶」的玩家跑整輪，看每碗湯平均要問幾題、喝幾杯茶，以及結局分布。
// 用法：npm run simulate -- --runs 300
import { STORIES } from '../src/content/stories';
import { teaHint } from '../src/engine/hints';
import { advance, choose, currentStep, finishIntro, finishReveal, finishSoup, freeFor, newRun, pickEnding, setSoupStateFor, soupStateFor, type RunState } from '../src/engine/run';
import { minQuestions } from '../src/engine/solver';
import { askWith, callBack, hungUp, inspectWith } from '../src/engine/rules';
import { askedCount, availableQuestions, checkSentence, isSoupSolved, place, type SoupState } from '../src/engine/soup';
import type { Soup, Story, StoryRules } from '../src/engine/types';

const runsArg = process.argv.indexOf('--runs');
const RUNS = runsArg >= 0 ? Number(process.argv[runsArg + 1]) : 300;
const PATIENCE = 12; // 連續幾個動作沒進展就喝茶

// mulberry32：小而均勻的亂數。原本的線性同餘產生器低位元有規律，連續挑選會互相影響，結局分布會失真。
let seed = 20261118;
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(rand() * xs.length)];

const progress = (s: SoupState) => s.asked.length + s.inspected.length + s.solved.length;

function playSoup(soup: Soup, start: SoupState, rules: StoryRules | undefined): { state: SoupState; tea: number } {
  const ask = (st: SoupState, id: string) => askWith(soup, hungUp(soup, st, rules) ? callBack(st) : st, id, rules);
  const inspect = (st: SoupState, id: string) => inspectWith(soup, st, id, rules);
  let s = start;
  let tea = 0;
  let idle = 0;
  for (let guard = 0; guard < 3000 && !isSoupSolved(soup, s); guard++) {
    const before = progress(s);
    if (idle >= PATIENCE) {
      idle = 0;
      tea++;
      s = { ...s, tea: s.tea + 1 };
      const h = teaHint(soup, s);
      if (h.kind === 'inspect') for (const e of soup.evidence) for (const hs of e.hotspots) s = inspect(s, hs.id);
      else if (h.kind === 'question') s = ask(s, h.questionId);
      else if (h.kind === 'blank') {
        s = place(soup, s, h.blankId, h.keywordId);
        s = checkSentence(soup, s, h.sentenceId).state;
      }
      continue;
    }
    const roll = rand();
    const unasked = availableQuestions(soup, s).filter((q) => !s.asked.includes(q.id));
    const uninspected = soup.evidence.flatMap((e) => e.hotspots).filter((h) => !s.inspected.includes(h.id));
    if (roll < 0.15 && uninspected.length) s = inspect(s, pick(uninspected).id);
    else if (roll < 0.65 && unasked.length) s = ask(s, pick(unasked).id);
    else {
      const open = soup.board.filter((x) => !s.solved.includes(x.id));
      const sentence = pick(open);
      for (const b of sentence.blanks) {
        const options = soup.keywords.filter((k) => k.category === b.category && s.unlocked.includes(k.id));
        if (options.length) s = place(soup, s, b.id, pick(options).id);
      }
      s = checkSentence(soup, s, sentence.id).state;
    }
    idle = progress(s) > before ? 0 : idle + 1;
  }
  return { state: s, tea };
}

/** 跑一本湯本；回傳是否每輪都走到了結局。 */
function simulate(story: Story): boolean {
  const NIGHTS = story.nights;
  const soupNights = NIGHTS.filter((n) => n.soup);
  const stats = new Map(soupNights.map((n) => [n.soup!.id, { asked: [] as number[], tea: [] as number[], unsolved: 0 }]));
  let finished = 0;
  const endingCounts = new Map<string, number>();

  for (let r = 0; r < RUNS; r++) {
    let run: RunState = newRun();
    for (let guard = 0; guard < 1000 && run.phase !== 'end'; guard++) {
      const night = NIGHTS[run.night];
      if (run.phase === 'intro') run = finishIntro(run, NIGHTS);
      else if (run.phase === 'soup' && night.soup) {
        const soup = night.soup;
        const { state, tea } = playSoup(soup, soupStateFor(run, soup), story.rules);
        run = setSoupStateFor(run, soup, state);
        const st = stats.get(soup.id)!;
        st.asked.push(askedCount(state));
        st.tea.push(tea);
        if (!isSoupSolved(soup, state)) {
          st.unsolved++;
          break;
        }
        run = finishSoup(run, NIGHTS);
      } else if (run.phase === 'reveal') run = finishReveal(run, NIGHTS);
      else if (run.phase === 'after') {
        const step = currentStep(run, NIGHTS);
        if (step?.kind === 'choice') run = choose(run, NIGHTS, pick(step.choice.options).id);
        else run = advance(run, NIGHTS);
      }
    }
    if (run.phase === 'end') {
      finished++;
      const e = pickEnding(story.endings, run.flags);
      endingCounts.set(e?.title ?? '（沒有結局）', (endingCounts.get(e?.title ?? '（沒有結局）') ?? 0) + 1);
    }
  }

  const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
  console.log(`\n══ 《${story.title}》跑了 ${RUNS} 輪，走完 ${finished} 輪 ══`);
  for (const night of soupNights) {
    const soup = night.soup!;
    const s = stats.get(soup.id)!;
    const best = minQuestions(soup, freeFor(soup, NIGHTS))?.count ?? 0;
    console.log(
      `${night.title}「${soup.title}」：最少 ${best} 題｜亂問的玩家平均問 ${avg(s.asked).toFixed(1)} 題（共 ${soup.questions.length} 題）、提示 ${avg(s.tea).toFixed(1)} 次｜沒喝完 ${s.unsolved} 輪`,
    );
  }
  console.log('隨機選擇時的結局分布：');
  for (const [title, n] of endingCounts) console.log(`  ${title}：${((n / RUNS) * 100).toFixed(0)}%`);
  return finished === RUNS && !endingCounts.has('（沒有結局）');
}

let ok = true;
for (const story of STORIES) ok = simulate(story) && ok;
if (!ok) process.exit(1);
