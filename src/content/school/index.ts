import type { Night, Story } from '../../engine/types';
import { ENDINGS, EPILOGUES } from './endings';
import { night1 } from './night1';
import { night2 } from './night2';
import { night3 } from './night3';
import { night4 } from './night4';
import { night5 } from './night5';

export const NIGHTS: readonly Night[] = [night1, night2, night3, night4, night5];

export const school: Story = {
  id: 'school',
  title: '最後一屆',
  subtitle: '鷺嶺國小的最後一週',
  genre: '恐怖',
  blurb: ['山上的國小這學期就要廢校了。你是代課老師，最後一週輪你值夜。', '沒人的教室裡，黑板每天多一行字。半夜兩點，廣播在點名。', '校史室的畢業照裡，比名冊多了一個孩子。'],
  length: '五個夜裡，約四十分鐘',
  theme: 'school',
  saveKey: 'shenye.school.save.v1',
  voice: {
    host: '廖伯',
    hostPronoun: '他',
    brand: '鷺嶺國小',
    begin: '開始值夜',
    resume: '回到學校',
    evidence: '找到的東西',
    hint: { icon: '🔦', label: '拿手電筒去找廖伯', used: '找了', unit: '次廖伯' },
    hintLines: {
      inspect: '東西都仔細看過了嗎？角落也照一照。',
      later: '……這件事，等最後一夜再說。',
      done: '都對了。該去鎖門了。',
    },
    bigWait: '大湯要到第五夜才喝得完。線索詞會一夜一夜多起來；現在可以先問、先填。他說的，不一定都是真的。',
    bigWaitSolved: '每一句都對了。剩下的，等最後一夜。',
    summaryHeading: '最後一週的湯',
    endingNote: '換一種做法，最後一次點名會不一樣。',
    unit: '夜',
  },
  rules: {
    // 夜裡的學校是暗的。手電筒的電，每一碗只夠照兩個地方；去找廖伯，他會塞給你一顆電池。
    flashlight: { battery: 2, empty: '手電筒沒電了。去找廖伯拿電池。', refill: '廖伯塞了一顆電池給你。' },
  },
  nights: NIGHTS,
  endings: ENDINGS,
  epilogues: EPILOGUES,
};
