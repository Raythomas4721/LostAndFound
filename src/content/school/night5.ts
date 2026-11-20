import type { Night } from '../../engine/types';
import { bigSoup } from './bigSoup';

const 廖伯 = '廖伯';

/** 第五夜：廢校典禮的前一夜，把大湯拼完。結局（禮拜五的典禮）在結局畫面播放。 */
export const night5: Night = {
  n: 5,
  title: '第五夜',
  ambience: 'school',
  intro: [
    { text: '第五夜。明天早上，就是廢校典禮。' },
    { text: '禮堂裡已經排好了椅子：七張給學生，一排給家長，最前面一張給校長。' },
    { text: '廖伯把校史室那張畢業照拿下來，擦乾淨，放在你的桌上。' },
    { who: 廖伯, text: '最後一碗了。你自己拼起來吧。' },
    { who: 廖伯, text: '我不會再騙你了。' },
  ],
  soup: bigSoup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '兩點。廣播響了。' },
        { text: '一號，二號……二十三號。' },
        { text: '沙沙聲。「有。」' },
        { text: '廖伯拿起鑰匙串，走出值夜室。你聽見他一扇一扇鎖上教室的門。每鎖一扇，他都問一聲：「還有沒有人？」' },
      ],
    },
  ],
};
