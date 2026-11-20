import { useEffect, useMemo, useState } from 'react';
import {
  advance,
  answerReverse,
  bigSoupOf,
  choose,
  currentNight,
  currentStep,
  finishIntro,
  finishReveal,
  finishSoup,
  freeFor,
  newRun,
  pickEnding,
  pickEpilogues,
  setSoupStateFor,
  soupStateFor,
  type RunState,
} from './engine/run';
import { minQuestions } from './engine/solver';
import { askedCount } from './engine/soup';
import type { FakeEnd, Line, Reply, Reverse, Soup, Story } from './engine/types';
import { reverseOptions } from './engine/validate';
import { clearRun, loadRun, loadSeenEndings, markEndingSeen, saveRun } from './save';
import { Dialogue, LineView } from './ui/Dialogue';
import { Notebook } from './ui/Notebook';
import { SoupView } from './ui/SoupView';
import { isMuted, play, setAmbience, setMuted } from './ui/sound';

type SetRun = React.Dispatch<React.SetStateAction<RunState | null>>;

/** 一本湯本從開場頁到結局。湯本之間除了聲音開關，什麼都不共用。 */
export function StoryGame({ story, onLeave }: { story: Story; onLeave: () => void }) {
  const [saved] = useState(() => loadRun(story));
  const [run, setRun] = useState<RunState | null>(null);
  const [notebook, setNotebook] = useState(false);
  const [mute, setMute] = useState(isMuted);
  const big = useMemo(() => bigSoupOf(story.nights), [story]);
  const { voice, nights } = story;

  useEffect(() => {
    if (run) saveRun(story, run);
  }, [story, run]);

  // 環境音跟著晚上走。run 是在使用者點了按鈕之後才有的，瀏覽器允許出聲。
  const ambience = run && run.phase !== 'end' ? (nights[run.night]?.ambience ?? null) : null;
  useEffect(() => {
    setAmbience(ambience);
  }, [ambience, mute]);
  useEffect(() => () => setAmbience(null), []);

  if (!run) return <StoryTitle story={story} hasSave={!!saved} onContinue={() => setRun(saved)} onNew={() => setRun(newRun())} onLeave={onLeave} />;

  const night = currentNight(run, nights);
  // 假結局的時候，頂欄跟真的結局一樣，不顯示第幾夜
  const fakeEnding = currentStep(run, nights)?.kind === 'fakeEnd';
  const restart = () => {
    if (!window.confirm(`要從第一${voice.unit}重新開始嗎？目前的進度會清掉。`)) return;
    clearRun(story);
    setRun(newRun());
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <button type="button" className="ghost back" onClick={onLeave} title="回湯館" aria-label="回湯館">
            ‹
          </button>
          <span className="brand-name">{voice.brand}</span>
          {night && !fakeEnding && <span className="night-tag">{night.title}</span>}
        </div>
        <div className="top-actions">
          <button
            type="button"
            className="ghost"
            aria-pressed={!mute}
            title={mute ? '打開聲音' : '關掉聲音'}
            aria-label={mute ? '打開聲音' : '關掉聲音'}
            onClick={() => {
              setMuted(!mute);
              setMute(!mute);
            }}
          >
            {mute ? '🔇' : '🔊'}
          </button>
          <button type="button" className="ghost" onClick={() => setNotebook(true)}>
            📓<span className="label"> 筆記本</span>
          </button>
          <button type="button" className="ghost" onClick={restart} title="重新開始" aria-label="重新開始">
            ↺<span className="label"> 重新開始</span>
          </button>
        </div>
      </header>

      <main className="stage">
        {run.phase === 'end' || !night ? (
          <EndingView story={story} run={run} onRestart={restart} onLeave={onLeave} />
        ) : run.phase === 'intro' ? (
          <Dialogue key={`intro-${night.n}`} heading={night.title} lines={night.intro} doneLabel={night.soup ? voice.begin : '繼續'} onDone={() => setRun(finishIntro(run, nights))} />
        ) : run.phase === 'soup' && night.soup ? (
          <SoupPhase key={night.n} story={story} big={big} run={run} soup={night.soup} setRun={setRun} />
        ) : run.phase === 'reveal' && night.soup ? (
          <Dialogue
            key={`reveal-${night.n}`}
            heading={`湯底・${night.soup.title}`}
            lines={night.soup.reveal}
            onDone={() => setRun(finishReveal(run, nights))}
            footer={
              <>
                <LiesHeard story={story} run={run} soup={night.soup} />
                <RatingLine story={story} run={run} soup={night.soup} />
              </>
            }
          />
        ) : (
          <AfterStep story={story} run={run} setRun={setRun} />
        )}
      </main>

      {notebook && <Notebook run={run} nights={nights} big={big} voice={voice} onClose={() => setNotebook(false)} />}
    </div>
  );
}

/** 小湯的晚上，第一晚之後可以切到大湯那一頁。 */
function SoupPhase({ story, big, run, soup, setRun }: { story: Story; big: Soup | null; run: RunState; soup: Soup; setRun: SetRun }) {
  const [tab, setTab] = useState<'tonight' | 'big'>('tonight');
  const bigOpen = big && soup.kind === 'small' && run.soups[big.id] ? big : null;
  const shown = tab === 'big' && bigOpen ? bigOpen : soup;
  const update = (s: Soup) => (state: ReturnType<typeof soupStateFor>) => setRun((r) => (r ? setSoupStateFor(r, s, state) : r));

  return (
    <>
      {bigOpen && (
        <div className="soup-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'tonight'} className={tab === 'tonight' ? 'active' : ''} onClick={() => setTab('tonight')}>
            今{story.voice.unit}的湯：{soup.title}
          </button>
          <button type="button" role="tab" aria-selected={tab === 'big'} className={tab === 'big' ? 'active' : ''} onClick={() => setTab('big')}>
            大湯：{bigOpen.title}
          </button>
        </div>
      )}
      <SoupView
        key={shown.id}
        soup={shown}
        voice={story.voice}
        rules={story.rules}
        state={soupStateFor(run, shown)}
        onChange={update(shown)}
        onFinish={() => setRun(finishSoup(run, story.nights))}
        finishable={shown === soup}
        note={shown !== soup ? story.voice.bigWait : undefined}
      />
    </>
  );
}

function AfterStep({ story, run, setRun }: { story: Story; run: RunState; setRun: (r: RunState) => void }) {
  const step = currentStep(run, story.nights);
  if (!step) return null;
  const key = `${run.night}-${run.step}-${run.picked ?? ''}`;
  if (step.kind === 'choice') {
    return (
      <section className="panel choice" key={key}>
        <h2>{step.choice.prompt}</h2>
        <div className="options">
          {step.choice.options.map((o) => (
            <button type="button" key={o.id} className="option" onClick={() => setRun(choose(run, story.nights, o.id))}>
              {o.text}
            </button>
          ))}
        </div>
      </section>
    );
  }
  if (step.kind === 'reverse') return <ReverseStep key={key} reverse={step.reverse} voice={story.voice} onDone={(replies) => setRun(answerReverse(run, story.nights, replies))} />;
  if (step.kind === 'fakeEnd') return <FakeEndStep key={key} story={story} fake={step.fakeEnd} onDone={() => setRun(advance(run, story.nights))} />;
  return <Dialogue key={key} lines={step.lines} onDone={() => setRun(advance(run, story.nights))} />;
}

/**
 * 反過來問你：對方問是非題，你按「是／不是／不重要／是也不是」。
 * 測驗題答錯了，主持人會小聲更正；不會卡住。
 */
function ReverseStep({ reverse, voice, onDone }: { reverse: Reverse; voice: Story['voice']; onDone: (replies: Reply[]) => void }) {
  const [started, setStarted] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [shown, setShown] = useState<{ lines: Line[]; ok: boolean | null } | null>(null);
  const [finished, setFinished] = useState(false);
  if (!started) return <Dialogue heading={reverse.heading} lines={reverse.intro} doneLabel="開始" onDone={() => setStarted(true)} />;
  const quiz = reverse.questions.some((q) => q.truth);
  const right = reverse.questions.filter((q, i) => q.truth && replies[i] === q.truth).length;
  const total = reverse.questions.filter((q) => q.truth).length;
  if (finished) {
    const lines = [...reverse.outro, ...(quiz && right === total ? (reverse.perfect ?? []) : [])];
    return (
      <Dialogue
        heading={reverse.heading}
        lines={lines}
        footer={quiz ? <p className="rating-line">你答對了 {right} / {total} 題</p> : undefined}
        onDone={() => onDone(replies)}
      />
    );
  }
  const index = shown ? replies.length - 1 : replies.length;
  const q = reverse.questions[index];
  const answer = (r: Reply) => {
    const ok = q.truth ? r === q.truth : null;
    play(ok === false ? 'wrong' : 'ask');
    const lines = [...(q.on?.[r]?.reply ?? []), ...(ok === false ? (q.wrong ?? [{ who: voice.host, text: `（小聲）是「${q.truth}」。` }]) : [])];
    setReplies([...replies, r]);
    setShown({ lines, ok });
  };
  const next = () => {
    setShown(null);
    if (replies.length >= reverse.questions.length) setFinished(true);
  };
  return (
    <section className="panel reverse">
      <p className="eyebrow">{reverse.heading}</p>
      {reverse.truth && (
        <div className="reverse-truth">
          <span className="tag">湯底（只有你知道）</span>
          {reverse.truth.map((line, i) => (
            <LineView key={i} line={line} />
          ))}
        </div>
      )}
      <p className="reverse-count muted small">
        第 {index + 1} / {reverse.questions.length} 題
      </p>
      <p className="reverse-q">
        <span className="who">{reverse.asker}</span>「{q.text}」
      </p>
      {shown ? (
        <>
          <p className="reverse-picked">
            你：<span className={`reply ${({ 是: 'yes', 不是: 'no', 不重要: 'meh', 是也不是: 'both' } as const)[replies[index]]}`}>{replies[index]}</span>
            {shown.ok === true && <span className="ok"> ✔</span>}
          </p>
          {shown.lines.map((line, i) => (
            <LineView key={i} line={line} />
          ))}
          <button type="button" className="primary" onClick={next}>
            繼續
          </button>
        </>
      ) : (
        <div className="reverse-replies">
          {reverseOptions(q).map((r) => (
            <button type="button" key={r} className="option" onClick={() => answer(r)}>
              {r}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

/** 假結局：一張很像真的結局卡。按下任何一個按鈕，卡片就裂開，故事繼續。 */
function FakeEndStep({ story, fake, onDone }: { story: Story; fake: FakeEnd; onDone: () => void }) {
  const [cracked, setCracked] = useState(false);
  if (cracked) return <Dialogue key="crack" lines={fake.crack} onDone={onDone} />;
  const crack = () => {
    play('wrong');
    setCracked(true);
  };
  return (
    <section className="panel ending fake-end">
      <p className="eyebrow">結局</p>
      <h2>{fake.title}</h2>
      <p className="ending-summary">{fake.summary}</p>
      {fake.epilogue && (
        <>
          <h3>後來</h3>
          <ul className="epilogues">
            {fake.epilogue.map((ep, i) => (
              <li key={i}>
                <span className="who">{ep.who}</span>
                {ep.text}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="ending-collection">
        <span className="muted small">結局 ? / {story.endings.length}</span>
      </div>
      <p className="muted small">{story.voice.endingNote}</p>
      <div className="title-actions">
        <button type="button" className="primary" onClick={crack}>
          從第一{story.voice.unit}重新開始
        </button>
        <button type="button" className="ghost" onClick={crack}>
          回湯館
        </button>
      </div>
    </section>
  );
}

/** 證人規則：湯底揭曉時，把這碗湯裡的謊話攤開來。 */
function LiesHeard({ story, run, soup }: { story: Story; run: RunState; soup: Soup }) {
  const w = story.rules?.witnesses;
  const lies = soup.questions.filter((q) => q.lie);
  if (!w || lies.length === 0) return null;
  const state = soupStateFor(run, soup);
  // 湯底揭曉了，就用真名（「吧台的男人」→ 阿哲）
  const name = (id?: string) => (id ? (w.people.find((p) => p.id === id)?.name ?? id) : story.voice.host);
  const heard = lies.filter((q) => state.asked.includes(q.id));
  return (
    <div className="lies-heard">
      <h3>
        {w.liesHeading}（聽到 {heard.length} / {lies.length} 句）
      </h3>
      <ul>
        {lies.map((q) => {
          const truth = soup.questions.find((x) => x.topic === q.topic && x.text === q.text && !x.lie && x.reply !== q.reply);
          return (
            <li key={q.id} className={state.asked.includes(q.id) ? 'heard' : 'missed'}>
              <b>{name(q.who)}</b>說「{q.text}」——{q.reply}。<span className="truth">其實：{truth?.reply}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RatingLine({ story, run, soup }: { story: Story; run: RunState; soup: Soup }) {
  const state = soupStateFor(run, soup);
  const best = minQuestions(soup, freeFor(soup, story.nights))?.count ?? 0;
  return (
    <p className="rating-line">
      問了 {askedCount(state)} 題（最少 {best} 題）・<b>{run.ratings[soup.id]}</b>
      {story.rules?.call && soup.caller && <>・{state.calls ? `回撥了 ${state.calls} 次` : '一通搞定'}</>}
    </p>
  );
}

function StoryTitle({ story, hasSave, onContinue, onNew, onLeave }: { story: Story; hasSave: boolean; onContinue: () => void; onNew: () => void; onLeave: () => void }) {
  return (
    <main className="title-screen">
      <button type="button" className="ghost title-back" onClick={onLeave}>
        ‹ 回湯館
      </button>
      <p className="eyebrow">{story.subtitle}</p>
      <h1>{story.title}</h1>
      <p className="lede">
        {story.blurb.map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <div className="title-actions">
        {hasSave && (
          <button type="button" className="primary" onClick={onContinue}>
            {story.voice.resume}
          </button>
        )}
        <button type="button" className={hasSave ? 'ghost' : 'primary'} onClick={onNew}>
          {hasSave ? `從第一${story.voice.unit}重新開始` : story.voice.begin}
        </button>
      </div>
      <p className="muted small">{story.length}</p>
    </main>
  );
}

function EndingView({ story, run, onRestart, onLeave }: { story: Story; run: RunState; onRestart: () => void; onLeave: () => void }) {
  const ending = pickEnding(story.endings, run.flags);
  const [sceneDone, setSceneDone] = useState(false);
  const [seen, setSeen] = useState(() => loadSeenEndings(story));
  if (!ending) return null;
  if (!sceneDone)
    return (
      <Dialogue
        key={`ending-${ending.id}`}
        lines={ending.scene}
        doneLabel="……"
        onDone={() => {
          play('bell');
          setSeen(markEndingSeen(story, ending.id));
          setSceneDone(true);
        }}
      />
    );

  const epilogues = pickEpilogues(story.epilogues, run.flags);
  const soups = story.nights.flatMap((n) => (n.soup ? [{ night: n, soup: n.soup }] : []));
  return (
    <section className="panel ending">
      <p className="eyebrow">結局</p>
      <h2>{ending.title}</h2>
      <p className="ending-summary">{ending.summary}</p>

      <h3>後來</h3>
      <ul className="epilogues">
        {epilogues.map((ep) => (
          <li key={ep.id}>
            <span className="who">{ep.who}</span>
            {ep.text}
          </li>
        ))}
      </ul>

      <h3>{story.voice.summaryHeading}</h3>
      <ul className="soup-summary">
        {soups.map(({ night, soup }) => {
          const s = run.soups[soup.id];
          return (
            <li key={soup.id}>
              {night.title}・{soup.title}：<b>{run.ratings[soup.id] ?? '—'}</b>（問了 {s ? askedCount(s) : 0} 題，{story.voice.hint.used} {s?.tea ?? 0} {story.voice.hint.unit}）
            </li>
          );
        })}
      </ul>

      <EndingCollection story={story} seen={seen} />
      <p className="muted small">{story.voice.endingNote}</p>
      <div className="title-actions">
        <button type="button" className="primary" onClick={onRestart}>
          從第一{story.voice.unit}重新開始
        </button>
        <button type="button" className="ghost" onClick={onLeave}>
          回湯館
        </button>
      </div>
    </section>
  );
}

/** 已經看過的結局亮起來，沒看過的只露出「？」。 */
export function EndingCollection({ story, seen }: { story: Story; seen: readonly string[] }) {
  return (
    <div className="ending-collection" aria-label={`結局收集 ${seen.length} / ${story.endings.length}`}>
      <span className="muted small">結局 {story.endings.filter((e) => seen.includes(e.id)).length} / {story.endings.length}</span>
      {story.endings.map((e) => (
        <span key={e.id} className={`ending-chip${seen.includes(e.id) ? ' seen' : ''}`}>
          {seen.includes(e.id) ? e.title : '？'}
        </span>
      ))}
    </div>
  );
}
