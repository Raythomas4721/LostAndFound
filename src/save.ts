import { isRunState, type RunState } from './engine/run';
import type { Story } from './engine/types';

// 每本湯本各自一個存檔，互不覆蓋。所有讀寫都包在 try/catch：無痕模式或儲存空間滿了，照玩，只是不存。

export function loadRun(story: Story): RunState | null {
  try {
    const raw = localStorage.getItem(story.saveKey);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    return isRunState(data) ? data : null;
  } catch {
    return null;
  }
}

export function saveRun(story: Story, run: RunState): void {
  try {
    localStorage.setItem(story.saveKey, JSON.stringify(run));
  } catch {
    // 同上
  }
}

export function clearRun(story: Story): void {
  try {
    localStorage.removeItem(story.saveKey);
  } catch {
    // 同上
  }
}

/** 走到過的結局。重新開始也不會清掉，首頁卡片用它顯示收集進度。 */
export function loadSeenEndings(story: Story): string[] {
  try {
    const raw = localStorage.getItem(`${story.saveKey}.endings`);
    const data: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function markEndingSeen(story: Story, endingId: string): string[] {
  const seen = loadSeenEndings(story);
  if (seen.includes(endingId)) return seen;
  const next = [...seen, endingId];
  try {
    localStorage.setItem(`${story.saveKey}.endings`, JSON.stringify(next));
  } catch {
    // 同上
  }
  return next;
}
