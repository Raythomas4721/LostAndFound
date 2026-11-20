import { STORIES, UPCOMING } from '../content/stories';
import type { Story } from '../engine/types';
import { loadRun, loadSeenEndings } from '../save';

/** 湯館首頁：一排湯本。開張的可以點，還在熬的先擺著。 */
export function Shelf({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <main className="shelf">
      <header className="shelf-head">
        <p className="eyebrow">海龜湯・是非題推理</p>
        <h1>深夜湯館</h1>
        <p className="lede">
          每一本，都是一碗說不通的湯。
          <br />
          你只能問「是」或「不是」的問題，把湯底拼出來。
        </p>
      </header>

      <ul className="shelf-list">
        {STORIES.map((s) => (
          <li key={s.id}>
            <StoryCard story={s} onOpen={() => onOpen(s.id)} />
          </li>
        ))}
        {UPCOMING.map((u) => (
          <li key={u.id}>
            <article className="story-card upcoming" data-theme={u.theme} aria-disabled="true">
              <div className="card-top">
                <span className="genre">{u.genre}</span>
                <span className="soon">即將開張</span>
              </div>
              <h2>{u.title}</h2>
              <p className="card-sub">{u.subtitle}</p>
              <p className="card-blurb">{u.blurb.join('')}</p>
            </article>
          </li>
        ))}
      </ul>

      <footer className="shelf-foot muted small">
        <p>各本的進度分開存在這台裝置上。用手機玩的話，可以從瀏覽器選單「加入主畫面」。</p>
      </footer>
    </main>
  );
}

function StoryCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const run = loadRun(story);
  const seen = loadSeenEndings(story);
  const found = story.endings.filter((e) => seen.includes(e.id)).length;
  const progress = !run ? '還沒開始' : run.phase === 'end' ? '走完了一輪' : `進行到${story.nights[run.night]?.title ?? ''}`;

  return (
    <button type="button" className="story-card" data-theme={story.theme} onClick={onOpen}>
      <div className="card-top">
        <span className="genre">{story.genre}</span>
        <span className="card-length">{story.length}</span>
      </div>
      <h2>{story.title}</h2>
      <p className="card-sub">{story.subtitle}</p>
      <p className="card-blurb">{story.blurb.join('')}</p>
      <div className="card-foot">
        <span>{progress}</span>
        <span>
          結局 {found} / {story.endings.length}
        </span>
      </div>
    </button>
  );
}
