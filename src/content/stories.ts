import type { Story, UpcomingStory } from '../engine/types';
import { lostAndFound } from './lostandfound';

/** 湯館書架上開張的湯本。新的一本做好之後加在這裡。 */
export const STORIES: readonly Story[] = [lostAndFound];

/** 還在熬的湯本：首頁先擺一張「即將開張」的卡。 */
export const UPCOMING: readonly UpcomingStory[] = [
  {
    id: 'radio',
    title: '凌晨三點的電台',
    subtitle: '怪奇・五個夜裡',
    genre: '怪奇',
    blurb: ['你主持一個沒什麼人聽的深夜叩應節目。', '每天夜裡，都有人打進來，說一件說不通的事。', '還有一通電話，總是在三點零三分響起，而且沒有聲音。'],
    theme: 'radio',
  },
  {
    id: 'inn',
    title: '斷橋民宿',
    subtitle: '驚悚・四個夜裡',
    genre: '驚悚',
    blurb: ['颱風夜，下山的橋斷了。', '山上的民宿裡有五個房客，每天早上少一個。', '老闆娘什麼都知道，但她不會全說實話。'],
    theme: 'inn',
  },
];

export function storyById(id: string | null | undefined): Story | null {
  return STORIES.find((s) => s.id === id) ?? null;
}
