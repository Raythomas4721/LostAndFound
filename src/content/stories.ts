import type { Story, UpcomingStory } from '../engine/types';
import { inn } from './inn';
import { lostAndFound } from './lostandfound';
import { radio } from './radio';

/** 湯館書架上開張的湯本。新的一本做好之後加在這裡。 */
export const STORIES: readonly Story[] = [lostAndFound, radio, inn];

/** 還在熬的湯本：首頁先擺一張「即將開張」的卡。 */
export const UPCOMING: readonly UpcomingStory[] = [];

export function storyById(id: string | null | undefined): Story | null {
  return STORIES.find((s) => s.id === id) ?? null;
}
