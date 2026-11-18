import { isRunState, type RunState } from './engine/run';

export const SAVE_KEY = 'lostandfound.save.v1';

export function loadRun(): RunState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    return isRunState(data) ? data : null;
  } catch {
    return null;
  }
}

export function saveRun(run: RunState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(run));
  } catch {
    // 無痕模式或儲存空間滿了：這一輪照玩，只是不會存檔。
  }
}

export function clearRun(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // 同上
  }
}
