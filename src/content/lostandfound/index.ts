import type { Story } from '../../engine/types';
import { ENDINGS, EPILOGUES } from './endings';
import { NIGHTS } from './nights';

export const lostAndFound: Story = {
  id: 'lostandfound',
  title: '失物招領處',
  subtitle: '霧埔站的最後一週',
  genre: '溫馨',
  blurb: ['霧埔支線這個禮拜天就要停駛了。', '每天晚上，都有人拿著一件失物，做了一件說不通的事。', '站長只回答「是」或「不是」。'],
  length: '七個晚上，約一小時',
  theme: 'lostandfound',
  // 這一本在湯館之前就有了，沿用舊的 key，舊存檔才讀得到。
  saveKey: 'lostandfound.save.v1',
  voice: {
    host: '溫伯',
    hostPronoun: '他',
    brand: '霧埔站失物招領處',
    begin: '開始值班',
    resume: '繼續值班',
    evidence: '失物',
    hint: { icon: '🍵', label: '跟溫伯喝杯茶', used: '喝了', unit: '杯茶' },
    hintLines: {
      inspect: '失物你都仔細看過了嗎？每個地方都看看。',
      later: '這件事……還不到時候。過幾個晚上再問我吧。',
      done: '都對了。喝完吧。',
    },
    bigWait: '大湯要到第七晚才喝得完。線索詞會一晚一晚多起來；現在可以先問、先填。',
    bigWaitSolved: '每一句都對了。剩下的，等第七晚再說。',
    summaryHeading: '這一週的湯',
    endingNote: '換一種做法，秋姨的最後一晚會不一樣。',
    unit: '晚',
    quips: ['這題問得好。可惜不重要。', '嗯……這個跟湯底沒關係，跟我的血壓比較有關係。', '不重要。不過你會這樣想，表示你很細心。', '喝口茶，換個方向想想。', '四十年前，也有人這樣問過我。'],
  },
  nights: NIGHTS,
  endings: ENDINGS,
  epilogues: EPILOGUES,
};
