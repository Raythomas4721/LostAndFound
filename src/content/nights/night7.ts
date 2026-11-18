import type { Night } from '../../engine/types';
import { bigSoup } from '../bigSoup';

const 溫伯 = '溫伯';
const 書恆 = '卓書恆';

/** 第七晚：把整個禮拜的大湯拼完。結局由 ENDINGS 決定，在結局畫面播放。 */
export const night7: Night = {
  n: 7,
  title: '第七晚',
  intro: [
    { text: '禮拜天。霧埔支線的最後一天。' },
    { text: '候車室的燈全部打開了。來搭最後一班車、來拍照、來看看的人，把長椅都坐滿了。' },
    { text: '櫃台後面的架子空了，只剩一只綠色的鐵盒。' },
    { who: 溫伯, text: '最後一碗湯了。這碗，你自己拼起來吧。' },
    { who: 溫伯, text: '我不會再說謊了。' },
  ],
  soup: bigSoup,
  after: [
    {
      kind: 'lines',
      when: { all: ['toldShuheng'], none: ['boxToShuheng'] },
      lines: [
        { text: '十點半，卓書恆來了。他沒有去拍那些來看末班車的人。' },
        { who: 書恆, text: '我會在月台上。' },
      ],
    },
  ],
  bigClues: [],
};
