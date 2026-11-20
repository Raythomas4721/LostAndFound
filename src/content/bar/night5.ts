import type { Night } from '../../engine/types';
import { bigSoup } from './bigSoup';

const 阿森 = '阿森';
const 小凡 = '小凡';

/** 禮拜五：四個人擠在雙人座，把大湯拼完。最後一個選擇決定這張帳單怎麼結。 */
export const night5: Night = {
  n: 5,
  title: '禮拜五',
  ambience: 'bar',
  intro: [
    { text: '禮拜五。你一進門，阿森就把冰箱裡的白盒子拿出來，擦了擦，又放回去。' },
    { who: 阿森, text: '今天，四個人都會來。這次是一起來的。' },
    { who: 阿森, text: '你問誰都可以。他們今天說的話，你要自己拼起來。' },
    { who: 阿森, text: '我還是只說我看到的。' },
  ],
  soup: bigSoup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '十二點，四個人站起來要結帳。' },
        { who: 小凡, text: '各付各的。' },
        { text: '你在收銀台前面，手上是四張空白的帳單。阿森在你旁邊擦杯子，什麼都沒說。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-final',
        prompt: '這張帳單，要怎麼結？',
        options: [
          {
            id: 'fourth',
            text: '「先等一下。」把禮拜三那四杯酒，照樣再調一次，端上雙人座。',
            flag: 'fourth',
            reply: [{ text: '阿森看了你一眼，把冰塊夾遞給你。' }, { who: 阿森, text: '記得，誰喝什麼。' }],
          },
          {
            id: 'split',
            text: '照他說的，四張帳單，各付各的。',
            flag: 'split',
            reply: [{ text: '你把四張帳單分開放好。每一張，都只寫一杯酒。' }],
          },
        ],
      },
    },
  ],
};
