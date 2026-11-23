import type { Night, Story } from '../../engine/types';
import { ENDINGS, EPILOGUES } from './endings';
import { night1 } from './night1';
import { night2 } from './night2';
import { night3 } from './night3';
import { night4 } from './night4';
import { night5 } from './night5';

export const NIGHTS: readonly Night[] = [night1, night2, night3, night4, night5];

export const tower: Story = {
  id: 'tower',
  title: '十二樓沒有人',
  subtitle: '松風大廈的夜班',
  genre: '懸疑',
  blurb: ['你是老社區大樓新來的夜班管理員，面前是十六格監視器。', '倒著走的住戶、寄到不存在樓層的包裹、深夜來調錄影的陌生人。', '1203 空了八年。可是每天凌晨三點，十二樓的燈都會亮。'],
  length: '五個夜裡，約四十分鐘',
  theme: 'tower',
  saveKey: 'shenye.tower.save.v1',
  voice: {
    host: '季伯',
    hostPronoun: '他',
    brand: '松風大廈・警衛室',
    begin: '開始值班',
    resume: '回到警衛室',
    evidence: '監視器與證物',
    hint: { icon: '🍵', label: '問季伯討杯茶', used: '討了', unit: '杯茶' },
    hintLines: {
      inspect: '畫面角落都看過了嗎？時間戳記也看一下。',
      later: '……這件事，等最後一夜再說。',
      done: '都對了。可以交班了。',
    },
    bigWait: '大湯要到第五夜才喝得完。線索詞會一夜一夜多起來；推理板是一條時間軸，現在可以先問、先填。他說的，不一定都是真的。',
    bigWaitSolved: '每一句都對了。剩下的，等最後一夜。',
    summaryHeading: '這一週的夜班',
    endingNote: '換一種做法，十二樓的燈會為不同的人亮。',
    unit: '夜',
    quips: ['不重要。這一格監視器，我們跳過。', '這題，連錄影都不用刪。', '不重要。喝口茶，看別的畫面。', '你盯錯螢幕了。', '這棟樓的秘密很多，這不是其中一個。'],
  },
  rules: {
    // 監視器時間軸：推理板照時間排成一條線
    timeline: { label: '時間軸：那天晚上發生了什麼' },
  },
  nights: NIGHTS,
  endings: ENDINGS,
  epilogues: EPILOGUES,
};
