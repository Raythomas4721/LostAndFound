import type { Night } from '../../engine/types';
import { bigSoup } from './bigSoup';

const 季伯 = '季伯';

/** 第五夜：魏先生來拿錄影的前一夜，把大湯拼完。結局在結局畫面播放。 */
export const night5: Night = {
  n: 5,
  title: '第五夜',
  ambience: 'hum',
  intro: [
    { text: '第五夜。禮拜四。' },
    { text: '十六格監視器，十五格都很安靜。第十六格，十二樓的走廊，燈是暗的。' },
    { text: '季伯把他的茶杯洗乾淨，放在你的杯子旁邊。' },
    { who: 季伯, text: '最後一碗了。你自己拼起來吧。' },
    { who: 季伯, text: '我不會再騙你了。' },
  ],
  soup: bigSoup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '凌晨三點。第十六格，十二樓的燈亮了。' },
        { text: '1203 的門打開一條縫。這一次，門縫裡的人，抬頭看了監視器一眼。' },
        { text: '然後，她輕輕地點了點頭。' },
      ],
    },
  ],
};
