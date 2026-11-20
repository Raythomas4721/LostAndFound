import { useState } from 'react';
import type { RunState } from '../engine/run';
import type { SoupState } from '../engine/soup';
import type { Night, Soup, StoryVoice } from '../engine/types';

interface Props {
  run: RunState;
  nights: readonly Night[];
  big: Soup | null;
  voice: StoryVoice;
  onClose: () => void;
}

/** 筆記本：每碗小湯問過的題目，以及大湯的線索和問答。 */
export function Notebook({ run, nights, big, voice, onClose }: Props) {
  const [tab, setTab] = useState<'soups' | 'big'>('soups');
  const played = nights.filter((n) => n.soup && n.soup.kind === 'small' && run.soups[n.soup.id]);
  const bigState = big ? run.soups[big.id] : undefined;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="筆記本" onClick={onClose}>
      <div className="notebook panel" onClick={(e) => e.stopPropagation()}>
        <div className="nb-head">
          <h2>筆記本</h2>
          <button type="button" className="ghost" onClick={onClose}>
            闔上
          </button>
        </div>
        <div className="tabs">
          <button type="button" className={tab === 'soups' ? 'active' : ''} onClick={() => setTab('soups')}>
            每{voice.unit}的湯
          </button>
          <button type="button" className={tab === 'big' ? 'active' : ''} onClick={() => setTab('big')}>
            大湯{big ? `：${big.title}` : ""}
          </button>
        </div>
        {tab === 'soups' ? (
          played.length === 0 ? (
            <p className="muted">還沒有問過任何事。</p>
          ) : (
            [...played].reverse().map((n) => (
              <div key={n.soup!.id} className="nb-soup">
                <h3>
                  {n.title}・{n.soup!.title}
                  {run.ratings[n.soup!.id] && <span className="rating">{run.ratings[n.soup!.id]}</span>}
                </h3>
                <AskedList soup={n.soup!} state={run.soups[n.soup!.id]} voice={voice} />
              </div>
            ))
          )
        ) : run.bigClues.length === 0 ? (
          <p className="muted">第一{voice.unit}結束時，這一頁才會打開。</p>
        ) : (
          <>
            <div className="nb-soup">
              <h3>線索</h3>
              <ul className="big-clues">
                {run.bigClues.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            {big && bigState && (
              <div className="nb-soup">
                <h3>問過{voice.host}的事</h3>
                <AskedList soup={big} state={bigState} voice={voice} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function AskedList({ soup, state, voice }: { soup: Soup; state: SoupState; voice: StoryVoice }) {
  if (state.asked.length === 0) return <p className="muted">還沒問。</p>;
  const correctedIds = new Set(state.asked.flatMap((id) => soup.questions.find((q) => q.id === id)?.corrects ?? []));
  return (
    <ul>
      {state.asked.map((id) => {
        const q = soup.questions.find((x) => x.id === id);
        if (!q) return null;
        const struck = correctedIds.has(q.id);
        return (
          <li key={id} className={struck ? 'struck' : ''}>
            {q.corrects && state.asked.includes(q.corrects) && <span className="nb-fix">更正</span>}
            {q.text} <b>{q.reply}</b>
            {q.hesitant && <span className="muted">（{voice.hostPronoun}停頓了一下）</span>}
            {q.say && <span className="muted">「{q.say}」</span>}
          </li>
        );
      })}
    </ul>
  );
}
