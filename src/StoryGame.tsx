import { useEffect, useMemo, useState } from 'react';
import {
  advance,
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
import type { Soup, Story } from './engine/types';
import { clearRun, loadRun, loadSeenEndings, markEndingSeen, saveRun } from './save';
import { Dialogue } from './ui/Dialogue';
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
          {night && <span className="night-tag">{night.title}</span>}
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
            footer={<RatingLine story={story} run={run} soup={night.soup} />}
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
  return <Dialogue key={key} lines={step.lines} onDone={() => setRun(advance(run, story.nights))} />;
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
