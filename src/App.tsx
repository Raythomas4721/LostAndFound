import { useEffect, useState } from 'react';
import { ENDINGS, pickEpilogues } from './content/endings';
import { NIGHTS } from './content/nights';
import { matches } from './engine/conditions';
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
  setSoupStateFor,
  soupStateFor,
  type RunState,
} from './engine/run';
import { minQuestions } from './engine/solver';
import { askedCount } from './engine/soup';
import type { Soup } from './engine/types';
import { clearRun, loadRun, saveRun } from './save';
import { Dialogue } from './ui/Dialogue';
import { Notebook } from './ui/Notebook';
import { SoupView } from './ui/SoupView';
import { isMuted, play, setAmbience, setMuted } from './ui/sound';

const BIG = bigSoupOf(NIGHTS);

export function App() {
  const [saved] = useState(loadRun);
  const [run, setRun] = useState<RunState | null>(null);
  const [notebook, setNotebook] = useState(false);
  const [mute, setMute] = useState(isMuted);

  useEffect(() => {
    if (run) saveRun(run);
  }, [run]);

  // 環境音跟著晚上走（第三晚下雨）。run 是在使用者點了按鈕之後才有的，瀏覽器允許出聲。
  const ambience = run && run.phase !== 'end' ? (NIGHTS[run.night]?.ambience ?? null) : null;
  useEffect(() => {
    setAmbience(ambience);
  }, [ambience, mute]);

  if (!run) return <Title hasSave={!!saved} onContinue={() => setRun(saved)} onNew={() => setRun(newRun())} />;

  const night = currentNight(run, NIGHTS);
  const restart = () => {
    if (!window.confirm('要從第一晚重新開始嗎？目前的進度會清掉。')) return;
    clearRun();
    setRun(newRun());
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          霧埔站失物招領處
          {night && <span className="night-tag">{night.title}</span>}
        </div>
        <div className="top-actions">
          <button
            type="button"
            className="ghost"
            aria-pressed={!mute}
            title={mute ? '打開聲音' : '關掉聲音'}
            onClick={() => {
              setMuted(!mute);
              setMute(!mute);
            }}
          >
            {mute ? '🔇' : '🔊'}
          </button>
          <button type="button" className="ghost" onClick={() => setNotebook(true)}>
            📓 筆記本
          </button>
          <button type="button" className="ghost" onClick={restart}>
            重新開始
          </button>
        </div>
      </header>

      <main className="stage">
        {run.phase === 'end' || !night ? (
          <EndingView run={run} onRestart={restart} />
        ) : run.phase === 'intro' ? (
          <Dialogue key={`intro-${night.n}`} heading={night.title} lines={night.intro} doneLabel={night.soup ? '開始值班' : '繼續'} onDone={() => setRun(finishIntro(run, NIGHTS))} />
        ) : run.phase === 'soup' && night.soup ? (
          <SoupPhase key={night.n} run={run} soup={night.soup} setRun={setRun} />
        ) : run.phase === 'reveal' && night.soup ? (
          <Dialogue
            key={`reveal-${night.n}`}
            heading={`湯底・${night.soup.title}`}
            lines={night.soup.reveal}
            onDone={() => setRun(finishReveal(run, NIGHTS))}
            footer={<RatingLine run={run} soup={night.soup} />}
          />
        ) : (
          <AfterStep run={run} setRun={setRun} />
        )}
      </main>

      {notebook && <Notebook run={run} nights={NIGHTS} big={BIG} onClose={() => setNotebook(false)} />}
    </div>
  );
}

/** 小湯的晚上，第一晚之後可以切到大湯那一頁。 */
function SoupPhase({ run, soup, setRun }: { run: RunState; soup: Soup; setRun: React.Dispatch<React.SetStateAction<RunState | null>> }) {
  const [tab, setTab] = useState<'tonight' | 'big'>('tonight');
  const bigOpen = BIG && soup.kind === 'small' && run.soups[BIG.id];
  const shown = tab === 'big' && bigOpen ? BIG : soup;
  const update = (s: Soup) => (state: ReturnType<typeof soupStateFor>) => setRun((r) => (r ? setSoupStateFor(r, s, state) : r));

  return (
    <>
      {bigOpen && (
        <div className="soup-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'tonight'} className={tab === 'tonight' ? 'active' : ''} onClick={() => setTab('tonight')}>
            今晚的湯：{soup.title}
          </button>
          <button type="button" role="tab" aria-selected={tab === 'big'} className={tab === 'big' ? 'active' : ''} onClick={() => setTab('big')}>
            大湯：{BIG.title}
          </button>
        </div>
      )}
      <SoupView
        key={shown.id}
        soup={shown}
        state={soupStateFor(run, shown)}
        onChange={update(shown)}
        onFinish={() => setRun(finishSoup(run, NIGHTS))}
        finishable={shown === soup}
        note={shown !== soup ? '大湯要到第七晚才喝得完。線索詞會一晚一晚多起來；現在可以先問、先填。' : undefined}
      />
    </>
  );
}

function AfterStep({ run, setRun }: { run: RunState; setRun: (r: RunState) => void }) {
  const step = currentStep(run, NIGHTS);
  if (!step) return null;
  const key = `${run.night}-${run.step}-${run.picked ?? ''}`;
  if (step.kind === 'choice') {
    return (
      <section className="panel choice" key={key}>
        <h2>{step.choice.prompt}</h2>
        <div className="options">
          {step.choice.options.map((o) => (
            <button type="button" key={o.id} className="option" onClick={() => setRun(choose(run, NIGHTS, o.id))}>
              {o.text}
            </button>
          ))}
        </div>
      </section>
    );
  }
  return <Dialogue key={key} lines={step.lines} onDone={() => setRun(advance(run, NIGHTS))} />;
}

function RatingLine({ run, soup }: { run: RunState; soup: Soup }) {
  const state = soupStateFor(run, soup);
  const best = minQuestions(soup, freeFor(soup, NIGHTS))?.count ?? 0;
  return (
    <p className="rating-line">
      問了 {askedCount(state)} 題（最少 {best} 題）・<b>{run.ratings[soup.id]}</b>
    </p>
  );
}

function Title({ hasSave, onContinue, onNew }: { hasSave: boolean; onContinue: () => void; onNew: () => void }) {
  return (
    <main className="title-screen">
      <p className="eyebrow">霧埔站的最後一週</p>
      <h1>失物招領處</h1>
      <p className="lede">
        霧埔支線這個禮拜天就要停駛了。
        <br />
        每天晚上，都有人拿著一件失物，做了一件說不通的事。
        <br />
        站長只回答「是」或「不是」。
      </p>
      <div className="title-actions">
        {hasSave && (
          <button type="button" className="primary" onClick={onContinue}>
            繼續值班
          </button>
        )}
        <button type="button" className={hasSave ? 'ghost' : 'primary'} onClick={onNew}>
          {hasSave ? '從第一晚重新開始' : '開始值班'}
        </button>
      </div>
      <p className="muted small">七個晚上，約一小時</p>
    </main>
  );
}

function EndingView({ run, onRestart }: { run: RunState; onRestart: () => void }) {
  const ending = pickEnding(ENDINGS, run.flags);
  const [sceneDone, setSceneDone] = useState(false);
  if (!ending) return null;
  const sceneEnding = ENDINGS.find((e) => e.id === ending.id)!;
  if (!sceneDone)
    return (
      <Dialogue
        key={`ending-${ending.id}`}
        lines={sceneEnding.scene}
        doneLabel="……"
        onDone={() => {
          play('bell');
          setSceneDone(true);
        }}
      />
    );

  const epilogues = pickEpilogues(run.flags, matches);
  const soups = NIGHTS.flatMap((n) => (n.soup ? [{ night: n, soup: n.soup }] : []));
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

      <h3>這一週的湯</h3>
      <ul className="soup-summary">
        {soups.map(({ night, soup }) => {
          const s = run.soups[soup.id];
          return (
            <li key={soup.id}>
              {night.title}・{soup.title}：<b>{run.ratings[soup.id] ?? '—'}</b>（問了 {s ? askedCount(s) : 0} 題，喝了 {s?.tea ?? 0} 杯茶）
            </li>
          );
        })}
      </ul>

      <p className="muted small">結局一共有 {ENDINGS.length} 種。換一種做法，秋姨的最後一晚會不一樣。</p>
      <button type="button" className="primary" onClick={onRestart}>
        從第一晚重新開始
      </button>
    </section>
  );
}
