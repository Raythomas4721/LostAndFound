import type { Night, Story } from '../../engine/types';
import { ENDINGS, EPILOGUES } from './endings';
import { night1 } from './night1';
import { night2 } from './night2';
import { night3 } from './night3';
import { night4 } from './night4';
import { night5 } from './night5';

export const NIGHTS: readonly Night[] = [night1, night2, night3, night4, night5];

export const radio: Story = {
  id: 'radio',
  title: '凌晨三點的電台',
  subtitle: '汐見之聲的最後五夜',
  genre: '怪奇',
  blurb: ['你主持一個沒什麼人聽的深夜叩應節目。', '每天夜裡，都有人打進來，說一件說不通的事。', '還有一通電話，總是在三點零三分響起，而且沒有聲音。'],
  length: '五個夜裡，約四十分鐘',
  theme: 'radio',
  saveKey: 'shenye.radio.save.v1',
  voice: {
    host: '老鍾',
    hostPronoun: '他',
    brand: '汐見之聲 FM 87.3',
    begin: '開麥',
    resume: '回到播音室',
    evidence: '桌上的東西',
    hint: { icon: '🎧', label: '按對講問老鍾', used: '按了', unit: '次對講' },
    hintLines: {
      inspect: '桌上那些東西，你都仔細看過了嗎？',
      later: '……這件事，還不到說的時候。過幾夜再問。',
      done: '都對了。收尾吧。',
    },
    bigWait: '大湯要到第五夜才喝得完。線索詞會一夜一夜多起來；現在可以先問、先填。',
    bigWaitSolved: '每一句都對了。剩下的，等最後一夜。',
    summaryHeading: '這五夜的湯',
    endingNote: '換一種做法，最後一夜的三點零三分會不一樣。',
    unit: '夜',
    quips: ['不重要。這題我可以幫你點一首歌。', '你這題，連海象報告都不會報。', '不重要。耳機戴好，繼續問。', '這題要是播出去，聽眾會笑你。', '訊號沒問題，問題是方向。'],
  },
  rules: {
    // 聽眾還在線上，你邊聽邊在對講裡問老鍾。電話撐不了太久。
    call: { length: 7, hangup: '嘟——電話斷了。', callback: '回撥' },
  },
  nights: NIGHTS,
  endings: ENDINGS,
  epilogues: EPILOGUES,
};
