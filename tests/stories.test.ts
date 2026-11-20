import { describe, expect, it } from 'vitest';
import { STORIES, UPCOMING } from '../src/content/stories';
import { validateNights } from '../src/engine/validate';

describe('湯館書架', () => {
  it('每本湯本的 id、存檔 key 都不重複', () => {
    const ids = [...STORIES.map((s) => s.id), ...UPCOMING.map((u) => u.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const keys = STORIES.map((s) => s.saveKey);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('失物招領處沿用舊的存檔 key，舊進度讀得到', () => {
    expect(STORIES.find((s) => s.id === 'lostandfound')?.saveKey).toBe('lostandfound.save.v1');
  });

  for (const story of STORIES) {
    it(`《${story.title}》每碗湯都解得開、每個結局都走得到`, () => {
      const { issues } = validateNights(story.nights, story.endings, story.epilogues, story.rules);
      expect(issues.filter((x) => x.level === 'error')).toEqual([]);
    });

    it(`《${story.title}》的介面文字都填了`, () => {
      const empty = Object.entries(story.voice).filter(([, v]) => typeof v === 'string' && v.trim() === '');
      expect(empty).toEqual([]);
      expect(story.blurb.length).toBeGreaterThan(0);
      for (const e of story.endings) expect(e.scene.length).toBeGreaterThan(0);
    });
  }
});
