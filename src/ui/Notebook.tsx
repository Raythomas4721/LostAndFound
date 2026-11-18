import { useState } from 'react';
import type { RunState } from '../engine/run';
import type { Night } from '../engine/types';

interface Props {
  run: RunState;
  nights: readonly Night[];
  onClose: () => void;
}

/** 筆記本：問過的題目（依晚分），以及大湯的線索。 */
export function Notebook({ run, nights, onClose }: Props) {
  const [tab, setTab] = useState<'soups' | 'big'>('soups');
  const played = nights.filter((n) => run.soups[n.soup.id]);

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
            問過的事
          </button>
          <button type="button" className={tab === 'big' ? 'active' : ''} onClick={() => setTab('big')}>
            大湯：綠色鐵盒
          </button>
        </div>
        {tab === 'soups' ? (
          played.length === 0 ? (
            <p className="muted">還沒有問過任何事。</p>
          ) : (
            [...played].reverse().map((n) => {
              const s = run.soups[n.soup.id];
              return (
                <div key={n.soup.id} className="nb-soup">
                  <h3>
                    {n.title}・{n.soup.title}
                    {run.ratings[n.soup.id] && <span className="rating">{run.ratings[n.soup.id]}</span>}
                  </h3>
                  {s.asked.length === 0 ? (
                    <p className="muted">還沒問。</p>
                  ) : (
                    <ul>
                      {s.asked.map((id) => {
                        const q = n.soup.questions.find((x) => x.id === id);
                        if (!q) return null;
                        return (
                          <li key={id}>
                            {q.text} <b>{q.reply}</b>
                            {q.say && <span className="muted">「{q.say}」</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })
          )
        ) : run.bigClues.length === 0 ? (
          <p className="muted">第一晚結束時，這一頁才會打開。</p>
        ) : (
          <ul className="big-clues">
            {run.bigClues.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
