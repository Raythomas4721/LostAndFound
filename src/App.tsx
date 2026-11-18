import { useEffect, useState } from 'react';
import { NIGHTS } from './content/nights';
import { advance, choose, currentNight, currentStep, finishIntro, finishReveal, finishSoup, newRun, setSoupState, soupState, type RunState } from './engine/run';
import { minQuestions } from './engine/solver';
import { clearRun, loadRun, saveRun } from './save';
import { Dialogue } from './ui/Dialogue';
import { Notebook } from './ui/Notebook';
import { SoupView } from './ui/SoupView';

export function App() {
  const [saved] = useState(loadRun);
  const [run, setRun] = useState<RunState | null>(null);
  const [notebook, setNotebook] = useState(false);

  useEffect(() => {
    if (run) saveRun(run);
  }, [run]);

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
          <DemoEnd run={run} onRestart={restart} />
        ) : run.phase === 'intro' ? (
          <Dialogue key={`intro-${night.n}`} heading={night.title} lines={night.intro} doneLabel="開始值班" onDone={() => setRun(finishIntro(run, NIGHTS))} />
        ) : run.phase === 'soup' ? (
          <SoupView
            key={night.soup.id}
            soup={night.soup}
            state={soupState(run, night)}
            onChange={(s) => setRun((r) => (r ? setSoupState(r, night, s) : r))}
            onFinish={() => setRun(finishSoup(run, NIGHTS))}
          />
        ) : run.phase === 'reveal' ? (
          <Dialogue
            key={`reveal-${night.n}`}
            heading={`湯底・${night.soup.title}`}
            lines={night.soup.reveal}
            onDone={() => setRun(finishReveal(run, NIGHTS))}
            footer={<RatingLine run={run} soupId={night.soup.id} best={minQuestions(night.soup)?.count ?? 0} />}
          />
        ) : (
          <AfterStep run={run} setRun={setRun} />
        )}
      </main>

      {notebook && <Notebook run={run} nights={NIGHTS} onClose={() => setNotebook(false)} />}
    </div>
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

function RatingLine({ run, soupId, best }: { run: RunState; soupId: string; best: number }) {
  const asked = run.soups[soupId]?.asked.length ?? 0;
  return (
    <p className="rating-line">
      問了 {asked} 題（最少 {best} 題）・<b>{run.ratings[soupId]}</b>
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
      <p className="muted small">試玩版：第一晚到第三晚</p>
    </main>
  );
}

function DemoEnd({ run, onRestart }: { run: RunState; onRestart: () => void }) {
  const choices = NIGHTS.flatMap((n) => n.after.flatMap((s) => (s.kind === 'choice' ? [s.choice] : [])));
  return (
    <section className="panel demo-end">
      <h2>試玩版到這裡</h2>
      <p>第四晚，舊倉要清倉了。秋姨明天還會再來。</p>
      <h3>這三碗湯</h3>
      <ul>
        {NIGHTS.map((n) => (
          <li key={n.soup.id}>
            {n.title}・{n.soup.title}：<b>{run.ratings[n.soup.id] ?? '—'}</b>（問了 {run.soups[n.soup.id]?.asked.length ?? 0} 題，喝了 {run.soups[n.soup.id]?.tea ?? 0} 杯茶）
          </li>
        ))}
      </ul>
      <h3>你做的決定</h3>
      <ul>
        {choices.map((c) => {
          const o = c.options.find((x) => x.id === run.choices[c.id]);
          return (
            <li key={c.id}>
              {c.prompt} <b>{o?.text ?? '—'}</b>
            </li>
          );
        })}
      </ul>
      <button type="button" className="primary" onClick={onRestart}>
        從第一晚重新開始
      </button>
    </section>
  );
}
