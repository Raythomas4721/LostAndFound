import type { Night, Story } from '../../engine/types';
import { ENDINGS, EPILOGUES } from './endings';
import { night1 } from './night1';
import { night2 } from './night2';
import { night3 } from './night3';
import { night4 } from './night4';

export const NIGHTS: readonly Night[] = [night1, night2, night3, night4];

export const inn: Story = {
  id: 'inn',
  title: '斷橋民宿',
  subtitle: '雲棲山莊的四個夜裡',
  genre: '驚悚',
  blurb: ['颱風夜，下山的橋斷了。', '山上的民宿裡有五個房客，每天早上少一個。', '老闆娘什麼都知道，但她不會全說實話。'],
  length: '四個夜裡，約半小時',
  theme: 'inn',
  saveKey: 'shenye.inn.save.v1',
  voice: {
    host: '老闆娘',
    hostPronoun: '她',
    brand: '雲棲山莊',
    begin: '天黑了',
    resume: '回到山莊',
    evidence: '看到的東西',
    hint: { icon: '🕯️', label: '點一根蠟燭問老闆娘', used: '點了', unit: '根蠟燭' },
    hintLines: {
      inspect: '東西都仔細看過了嗎？角落也看看。',
      later: '這件事……等最後一夜，我再告訴你。',
      done: '都對了。吃飯吧。',
    },
    bigWait: '大湯要到第四夜才喝得完。線索詞會一夜一夜多起來；現在可以先問、先填。小心，她說的不一定是真的。',
    bigWaitSolved: '每一句都對了。剩下的，等最後一夜。',
    summaryHeading: '這四夜的湯',
    endingNote: '換一種做法，最後一個早上會不一樣。',
    unit: '夜',
    quips: ['不重要。湯要涼了。', '這題，我連碗都不用洗。', '你問的方向，跟那座橋一樣，斷了。', '不重要。再問一次，我就收碗了。', '窗外的雨，都比這題重要。'],
  },
  rules: {
    // 老闆娘的謊比溫伯多。你不用等她坦白：拿你知道的事，當場跟她對質。
    confront: {
      label: '對質',
      broken: '她沉默了很久。「……好。這一題，我說實話。」',
      truthful: '「這一題，我沒有騙你。」她看著你，一點都沒有閃躲。',
      noproof: '「你有證據嗎？」她笑了一下，繼續擦杯子。',
      tip: '覺得她在說謊？拿出你知道的事，點「對質」。猜錯也沒關係。',
    },
  },
  nights: NIGHTS,
  endings: ENDINGS,
  epilogues: EPILOGUES,
};
