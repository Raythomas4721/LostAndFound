import type { Night } from '../../engine/types';
import { bigSoup } from './bigSoup';

const 老闆娘 = '老闆娘';

/** 第四夜：把大湯拼完。結局在結局畫面播放。 */
export const night4: Night = {
  n: 4,
  title: '第四夜',
  ambience: 'storm',
  intro: [
    { text: '第四夜。山莊裡只剩下三個人：黎先生、老闆娘，和你。' },
    { text: '晚餐的長桌上，擺了八副碗筷。每一個碗裡都盛好了白飯。' },
    { text: '黎先生看著那些碗，一口都沒有吃。' },
    { who: 老闆娘, text: '最後一夜了。你把這碗湯喝完吧。' },
    { who: 老闆娘, text: '我不會再騙你了。' },
  ],
  soup: bigSoup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '兩點五十分。走廊的燈閃了一下。' },
        { text: '樓上，黎先生的房門打開了。' },
      ],
    },
  ],
};
