import type { Night } from '../../engine/types';
import { bigSoup } from './bigSoup';

const 老鍾 = '老鍾';

/** 第五夜：把整個禮拜的大湯拼完。結局在結局畫面播放。 */
export const night5: Night = {
  n: 5,
  title: '第五夜',
  ambience: 'static',
  intro: [
    { text: '最後一夜。檔案室的帶子都裝箱了，只剩機器裡今晚這一捲。' },
    { text: '桌上放著夜鷺的筆記本，翻開在最後一頁。撕痕旁邊，有人用鉛筆補了一個問號。' },
    { who: 老鍾, text: '最後一碗湯了。這一碗，你自己拼起來吧。' },
    { who: 老鍾, text: '我不會再說謊了。' },
  ],
  soup: bigSoup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '三點零一分。你們都沒有說話。' },
        { text: '窗外很遠的地方，北角燈塔黑黑的影子，站在海邊。' },
      ],
    },
  ],
};
