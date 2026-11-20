import { useEffect, useState } from 'react';
import { storyById } from './content/stories';
import { StoryGame } from './StoryGame';
import { Shelf } from './ui/Shelf';

/** 網址的 #後面記著打開的是哪一本：重新整理還在同一本，手機的返回鍵會回到湯館。 */
function storyFromHash(): string | null {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  return storyById(id) ? id : null;
}

export function App() {
  const [storyId, setStoryId] = useState<string | null>(storyFromHash);
  const story = storyById(storyId);

  useEffect(() => {
    const onHash = () => setStoryId(storyFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // 配色跟著湯本走；湯館首頁用自己的一套。
  useEffect(() => {
    document.documentElement.dataset.theme = story?.theme ?? 'hub';
    document.title = story ? `${story.title}｜深夜湯館` : '深夜湯館';
  }, [story]);

  const open = (id: string | null) => {
    if (id) window.location.hash = id;
    else history.pushState(null, '', window.location.pathname + window.location.search);
    setStoryId(id);
    window.scrollTo(0, 0);
  };

  if (!story) return <Shelf onOpen={open} />;
  return <StoryGame key={story.id} story={story} onLeave={() => open(null)} />;
}
