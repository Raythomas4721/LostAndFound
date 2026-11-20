import type { Soup } from '../../engine/types';

const 老闆娘 = '老闆娘';

/**
 * 斷橋民宿的大湯。第一夜結束時打開。
 * 老闆娘在第三夜坦白（解鎖 confession）之前，標了 hesitant 的題目都是謊話——她說的謊比溫伯多。
 * 坦白之後，同一個線索詞底下的更正版會取代它們。
 */
export const bigSoup: Soup = {
  id: 'big-inn',
  title: '每天早上少一個',
  kind: 'big',
  surface: [
    { text: '颱風夜，下山的橋斷了。山莊裡有五個房客，每天早上少一個。' },
    { who: 老闆娘, text: '他們下山了。' },
  ],
  start: ['boss', 'li', 'zou', 'you', 'backpack', 'bridge', 'inn', 'vanish', 'downhill', 'morning'],
  keywords: [
    { id: 'boss', label: '老闆娘', category: '人物' },
    { id: 'li', label: '黎先生', category: '人物' },
    { id: 'zou', label: '小鄒', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'mrsjiang', label: '江太太', category: '人物' },
    { id: 'mrjiang', label: '江先生', category: '人物' },
    { id: 'ge', label: '葛老先生', category: '人物' },
    { id: 'xiaoqing', label: '小晴', category: '人物' },

    { id: 'backpack', label: '小鄒的登山包', category: '物品' },
    { id: 'bowl', label: '窗邊那碗飯', category: '物品' },
    { id: 'raincoat', label: '黃雨衣', category: '物品' },
    { id: 'notebook', label: '葛老先生的筆記本', category: '物品' },
    { id: 'plate', label: '車牌', category: '物品' },
    { id: 'oldphoto', label: '黎先生的舊照片', category: '物品' },

    { id: 'bridge', label: '斷掉的橋', category: '地點' },
    { id: 'inn', label: '山莊', category: '地點' },
    { id: 'backpath', label: '後山小路', category: '地點' },
    { id: 'teahouse', label: '舊茶寮', category: '地點' },
    { id: 'oldroad', label: '舊吊橋前的路', category: '地點' },

    { id: 'vanish', label: '一個一個不見', category: '事情' },
    { id: 'downhill', label: '下山了', category: '事情' },
    { id: 'invited', label: '老闆娘請來的', category: '事情' },
    { id: 'hitrun', label: '肇事逃逸', category: '事情' },
    { id: 'scare', label: '讓他害怕', category: '事情' },
    { id: 'revenge', label: '報仇', category: '事情' },
    { id: 'confess', label: '他自己說出來', category: '事情' },
    { id: 'confession', label: '老闆娘的坦白', category: '事情' },

    { id: 'morning', label: '每天早上', category: '時間' },
    { id: 'tenyears', label: '十年前', category: '時間' },
  ],
  evidence: [],
  questions: [
    // 下山了（謊）
    { id: 'd-really', topic: 'downhill', text: '小鄒真的下山了嗎？', reply: '是', hesitant: true, contradictedBy: ['backpath'], say: '……下山了。' },
    { id: 'd-really-t', topic: 'downhill', text: '小鄒真的下山了嗎？', reply: '不是', corrects: 'd-really', requires: ['confession'], say: '他在後山的茶寮。' },
    // 一個一個不見
    { id: 'v-ghost', topic: 'vanish', text: '房客是被鬼帶走的嗎？', reply: '不是' },
    { id: 'v-dead', topic: 'vanish', text: '不見的房客死了嗎？', reply: '不是' },
    { id: 'v-self', topic: 'vanish', text: '房客是自己走的嗎？', reply: '是' },
    { id: 'v-plan', topic: 'vanish', text: '他們是事先說好要不見的嗎？', reply: '是', say: '每一個都說好了。', unlocks: ['invited'] },
    { id: 'v-safe', topic: 'vanish', text: '不見的人都平安嗎？', reply: '不重要', hesitant: true, contradictedBy: ['mrsjiang'], say: '那不重要。' },
    { id: 'v-safe-t', topic: 'vanish', text: '不見的人都平安嗎？', reply: '是', corrects: 'v-safe', requires: ['confession'], say: '都平安。有吃有睡。' },
    // 每天早上
    { id: 'm-night', topic: 'morning', text: '房客都是半夜走的嗎？', reply: '是', say: '天亮前，雨最小的時候。' },
    // 登山包
    { id: 'bp-left', topic: 'backpack', text: '登山包留下來，是故意的嗎？', reply: '是', say: '讓人以為他走不遠。' },
    // 斷掉的橋
    { id: 'b-cut', topic: 'bridge', text: '橋是被人弄斷的嗎？', reply: '不是', say: '是颱風。' },
    { id: 'b-luck', topic: 'bridge', text: '橋斷了，對老闆娘有幫助嗎？', reply: '是', say: '老天幫的忙。' },
    // 後山小路、茶寮
    { id: 'bpath-lead', topic: 'backpath', text: '後山小路通到房客躲的地方嗎？', reply: '是', say: '一間舊茶寮。', unlocks: ['teahouse'] },
    { id: 'th-food', topic: 'teahouse', text: '每天晚上，有人送吃的去茶寮嗎？', reply: '是', say: '我送。' },
    { id: 'th-ge', topic: 'teahouse', text: '葛老先生也在茶寮嗎？', reply: '是', requires: ['ge'] },
    // 小鄒（謊）
    { id: 'z-know', topic: 'zou', text: '老闆娘，你認識小鄒嗎？', reply: '不是', hesitant: true, contradictedBy: ['backpath'], say: '……一個學生。' },
    { id: 'z-know-t', topic: 'zou', text: '老闆娘，你認識小鄒嗎？', reply: '是', corrects: 'z-know', requires: ['confession'], say: '他是小晴的同學。那天晚上，他們一起走路回家。' },
    // 江家（謊）
    { id: 'j-know', topic: 'mrjiang', text: '江先生知道太太去哪裡了嗎？', reply: '不是', hesitant: true, contradictedBy: ['mrjiang'], say: '……他也在找。' },
    { id: 'j-know-t', topic: 'mrjiang', text: '江先生知道太太去哪裡了嗎？', reply: '是', corrects: 'j-know', requires: ['confession'], say: '他們夫妻是一起來幫我的。' },
    { id: 'mj-teacher', topic: 'mrsjiang', text: '江太太認識小晴嗎？', reply: '是', say: '她是小晴的導師。', unlocks: ['invited'] },
    { id: 'r-jiang', topic: 'raincoat', text: '江太太穿小晴的雨衣，是故意讓黎先生看到的嗎？', reply: '是', unlocks: ['scare'] },
    // 小晴（謊）
    { id: 'x-sick', topic: 'xiaoqing', text: '小晴是生病過世的嗎？', reply: '是', hesitant: true, contradictedBy: ['xiaoqing'], say: '……生病。' },
    { id: 'x-sick-t', topic: 'xiaoqing', text: '小晴是生病過世的嗎？', reply: '不是', corrects: 'x-sick', requires: ['confession'], say: '她是被車撞的。' },
    { id: 'x-age', topic: 'xiaoqing', text: '小晴過世的時候還是小孩嗎？', reply: '是', say: '十二歲。' },
    // 黎先生（謊）
    { id: 'l-know', topic: 'li', text: '老闆娘，你知道黎先生是誰嗎？', reply: '不是', hesitant: true, contradictedBy: ['raincoat'], say: '一個客人。' },
    { id: 'l-know-t', topic: 'li', text: '老闆娘，你知道黎先生是誰嗎？', reply: '是', corrects: 'l-know', requires: ['confession'], say: '十年來，每一天都知道。' },
    { id: 'l-target', topic: 'li', text: '這一切都是做給黎先生看的嗎？', reply: '是', unlocks: ['scare'] },
    { id: 'l-free', topic: 'li', text: '黎先生是自己想來的嗎？', reply: '是也不是', say: '他以為他中了免費住宿。' },
    // 老闆娘（謊）
    { id: 'bo-plan', topic: 'boss', text: '這一切是你安排的嗎？', reply: '不是', hesitant: true, contradictedBy: ['mrjiang', 'backpath'], say: '……我只是開民宿的。' },
    { id: 'bo-plan-t', topic: 'boss', text: '這一切是你安排的嗎？', reply: '是', corrects: 'bo-plan', requires: ['confession'], say: '每一步。' },
    { id: 'bo-revenge', topic: 'boss', text: '老闆娘想報仇嗎？', reply: '不是', say: '如果我想，十年前就做了。', unlocks: ['revenge'] },
    { id: 'bo-sorry', topic: 'boss', text: '老闆娘想聽黎先生親口說些什麼嗎？', reply: '是', unlocks: ['confess'] },
    // 你
    { id: 'you-why', topic: 'you', text: '老闆娘需要我，是因為我是外人嗎？', reply: '是', say: '他不會懷疑一個來打工的。' },
    // 讓他害怕
    { id: 's-why', topic: 'scare', text: '讓他害怕，是為了要他做什麼嗎？', reply: '是', say: '要他自己開口。', unlocks: ['confess'] },
    { id: 's-hurt', topic: 'scare', text: '老闆娘想傷害黎先生嗎？', reply: '不是', unlocks: ['revenge'] },
    // 肇事逃逸
    { id: 'h-where', topic: 'hitrun', text: '小晴是在舊吊橋前的路上被撞的嗎？', reply: '是', unlocks: ['oldroad'] },
    { id: 'h-li', topic: 'hitrun', text: '撞小晴的是黎先生嗎？', reply: '是', requires: ['oldphoto'] },
    { id: 'h-storm', topic: 'hitrun', text: '那天晚上也有颱風嗎？', reply: '是' },
    // 舊照片、筆記本、車牌
    { id: 'op-car', topic: 'oldphoto', text: '照片裡的車，就是撞小晴的那台嗎？', reply: '是' },
    { id: 'op-how', topic: 'oldphoto', text: '老闆娘是看到那張照片，才找到黎先生的嗎？', reply: '是', say: '一本攝影集。我寫信給他，說招待他免費住一個禮拜。' },
    { id: 'nb-plate', topic: 'notebook', text: '筆記本上的車牌，就是黎先生的車嗎？', reply: '是' },
    { id: 'pl-only', topic: 'plate', text: '只靠車牌，就能讓黎先生被抓嗎？', reply: '不是', say: '十年了。照片不夠，他得自己說。', unlocks: ['confess'] },
    // 請來的、其他
    { id: 'inv-all', topic: 'invited', text: '除了黎先生，其他房客都是老闆娘請來的嗎？', reply: '是' },
    { id: 'bowl-why', topic: 'bowl', text: '窗邊的飯，也是做給黎先生看的嗎？', reply: '不是', say: '那是給小晴的。十年來每一餐都是。' },
    { id: 'ten-same', topic: 'tenyears', text: '十年前的那一天，也是颱風夜嗎？', reply: '是' },
    { id: 'inn-hers', topic: 'inn', text: '山莊是老闆娘為了這件事才開的嗎？', reply: '不是', say: '是小晴的爸爸蓋的。他走得早。' },
  ],
  board: [
    {
      id: 'g1',
      text: '不見的房客都沒有出事。他們都是{c1}，躲在{c2}。',
      blanks: [
        { id: 'c1', category: '事情', answer: 'invited' },
        { id: 'c2', category: '地點', answer: 'teahouse' },
      ],
    },
    { id: 'g2', text: '只有{c3}，是被免費住宿騙上山的。', blanks: [{ id: 'c3', category: '人物', answer: 'li' }] },
    { id: 'g3', text: '十年前的颱風夜，他在{c4}撞了小晴，沒有停車。', blanks: [{ id: 'c4', category: '地點', answer: 'oldroad' }] },
    {
      id: 'g4',
      text: '老闆娘要的不是{c5}，是{c6}。',
      blanks: [
        { id: 'c5', category: '事情', answer: 'revenge' },
        { id: 'c6', category: '事情', answer: 'confess' },
      ],
    },
  ],
  reveal: [
    { who: 老闆娘, text: '十年前的颱風夜，小晴和同學走舊吊橋前面的路回家。一台黑色的車撞了她，沒有停。' },
    { who: 老闆娘, text: '同學只記得兩個字。葛老先生把那串缺字的車牌，寫了十年。' },
    { who: 老闆娘, text: '今年，我在一本攝影集裡看到十年前的舊吊橋。角落停著一台黑色的車。' },
    { who: 老闆娘, text: '我寫信給攝影師，說山莊招待他免費住一個禮拜，拍舊吊橋拆掉之前的樣子。' },
    { who: 老闆娘, text: '其他的房客，都是我請來的：小晴的同學、她的導師、當年的警察。' },
    { who: 老闆娘, text: '颱風把橋沖斷，是老天幫忙。我讓他們一個一個，在天亮前走上後山。' },
    { who: 老闆娘, text: '我不要他的命。我只要他，自己說一次。' },
    { text: '窗外的雨小了。交誼廳只剩下一盞燈。' },
    { who: 老闆娘, text: '三點了。' },
  ],
};
