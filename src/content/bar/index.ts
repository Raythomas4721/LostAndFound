import type { Night, Story } from '../../engine/types';
import { ENDINGS, EPILOGUES } from './endings';
import { night1 } from './night1';
import { night2 } from './night2';
import { night3 } from './night3';
import { night4 } from './night4';
import { night5 } from './night5';

export const NIGHTS: readonly Night[] = [night1, night2, night3, night4, night5];

export const bar: Story = {
  id: 'bar',
  title: '雙人座',
  subtitle: '半杯酒館的一週',
  genre: '愛情',
  blurb: [
    '你是巷底小酒館「半杯」新來的學徒。窗邊有一張只放得下兩張椅子的雙人座。',
    '一杯沒人喝的酒、一扇對街亮著的窗、一個寄放在冰箱裡的白盒子。',
    '四個熟客，各說各的。老闆阿森只說他看到的——看到的，不一定是真的。',
  ],
  length: '五個晚上，約四十分鐘',
  theme: 'bar',
  saveKey: 'shenye.bar.save.v1',
  voice: {
    host: '阿森',
    hostPronoun: '他',
    brand: '半杯・吧台',
    begin: '開始營業',
    resume: '回到吧台',
    evidence: '桌上的東西',
    hint: { icon: '🧊', label: '跟阿森要杯冰水', used: '要了', unit: '杯冰水' },
    hintLines: {
      inspect: '桌上的東西，都看過了嗎？',
      later: '……這個，禮拜五再說。',
      done: '都對了。可以打烊了。',
    },
    bigWait: '大湯要到禮拜五才喝得完。線索詞會一晚一晚多起來；現在可以先問、先填。四個人說的，不一定都是真話。',
    bigWaitSolved: '每一句都對了。剩下的，等禮拜五。',
    summaryHeading: '這一週的吧台',
    endingNote: '換一種做法，雙人座會坐不一樣的人。',
    unit: '晚',
    quips: ['不重要。這杯我請，換一題。', '我只說我看到的。這個，我沒看到什麼。', '不重要。冰塊都比這題重要。', '你在問我，還是在問你自己？', '這題，等你喝到第二杯再問。'],
  },
  rules: {
    witnesses: {
      people: [
        { id: 'zhe', name: '阿哲' },
        { id: 'anan', name: '安安' },
        { id: 'fan', name: '小凡' },
        { id: 'qing', name: '以晴' },
      ],
      tip: '同一句話，可以問不同的人。說法對不上的地方，至少有一個人沒說真話。阿森只說他看到的。',
      clash: '說法對不上',
      liesHeading: '這碗湯裡，不是真話的回答',
    },
  },
  nights: NIGHTS,
  endings: ENDINGS,
  epilogues: EPILOGUES,
};
