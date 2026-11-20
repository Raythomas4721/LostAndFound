import type { Night, Soup } from '../../engine/types';

const 老闆娘 = '老闆娘';
const 黎先生 = '黎先生';
const 你 = '你';

/** 第一夜：多出來的那副碗筷。是留給過世的女兒的；半夜吃掉它的，是黎先生。 */
const soup: Soup = {
  id: 'bowl',
  title: '第八副碗筷',
  kind: 'small',
  surface: [
    { text: '晚餐的長桌上擺了八副碗筷。五個房客、老闆娘、你——七個人。' },
    { text: '第八個位子在窗邊，盛好了一碗白飯，筷子擺得整整齊齊。沒有人坐，也沒有人問。' },
    { text: '半夜，你下樓喝水。餐廳的燈還亮著。' },
    { text: '窗邊那碗飯，空了。筷子擱在碗上。' },
    { text: '你背後，老闆娘的聲音說：' },
    { who: 老闆娘, text: '看到了？' },
    { who: 老闆娘, text: '想知道，就問。我只說是、不是。這是山上的規矩。' },
  ],
  start: ['boss', 'li', 'zou', 'ge', 'jiang', 'bowl', 'chopsticks', 'window', 'kitchen', 'ate', 'ghost', 'midnight'],
  keywords: [
    { id: 'boss', label: '老闆娘', category: '人物' },
    { id: 'li', label: '黎先生', category: '人物' },
    { id: 'zou', label: '小鄒', category: '人物' },
    { id: 'ge', label: '葛老先生', category: '人物' },
    { id: 'jiang', label: '江家夫妻', category: '人物' },
    { id: 'absent', label: '不會來吃的人', category: '人物' },
    { id: 'child', label: '一個小孩', category: '人物' },
    { id: 'xiaoqing', label: '老闆娘的女兒', category: '人物' },

    { id: 'bowl', label: '那碗白飯', category: '物品' },
    { id: 'chopsticks', label: '筷子', category: '物品' },
    { id: 'kidchop', label: '小鴨子短筷', category: '物品' },
    { id: 'raincoat', label: '小小的黃雨衣', category: '物品' },

    { id: 'window', label: '窗邊的位子', category: '地點' },
    { id: 'kitchen', label: '廚房', category: '地點' },

    { id: 'ate', label: '被吃掉了', category: '事情' },
    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'hungry', label: '吃得很急', category: '事情' },
    { id: 'dead', label: '過世了', category: '事情' },
    { id: 'nosay', label: '什麼都沒說', category: '事情' },

    { id: 'midnight', label: '半夜', category: '時間' },
    { id: 'everymeal', label: '每一餐', category: '時間' },
    { id: 'tenyears', label: '十年', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-bowl',
      art: 'bowl',
      name: '窗邊的位子',
      description: '一個空碗、一雙筷子、一張椅子。只有這個位子，桌墊是粉紅色的。',
      hotspots: [
        { id: 'hs-chop', at: [86, 47], name: '筷子', label: '筷子比大人的短一截，上面畫著一隻黃色的小鴨子，漆都磨掉了。', unlocks: ['kidchop'] },
        { id: 'hs-chair', at: [14, 30], name: '椅背', label: '椅背上掛著一件小小的黃色雨衣，已經褪色了。', unlocks: ['raincoat'] },
        { id: 'hs-rice', at: [46, 64], name: '碗底', label: '碗底還剩幾粒飯，旁邊的醃蘿蔔只咬了一口。吃的人很餓，吃得很急。', unlocks: ['hungry'] },
      ],
    },
  ],
  questions: [
    // 那碗白飯
    { id: 'q-b-ghost', topic: 'bowl', text: '飯是鬼吃掉的嗎？', reply: '不是' },
    { id: 'q-b-for', topic: 'bowl', text: '那碗飯是盛給某個人的嗎？', reply: '是', say: '給一個不會來吃的人。', unlocks: ['absent'] },
    { id: 'q-b-poison', topic: 'bowl', text: '那碗飯有問題嗎？', reply: '不是' },
    // 被吃掉了
    { id: 'q-a-person', topic: 'ate', text: '飯是被人吃掉的嗎？', reply: '是', say: '一個大人。' },
    { id: 'q-a-guest', topic: 'ate', text: '吃飯的是房客嗎？', reply: '是' },
    { id: 'q-a-know', topic: 'ate', text: '吃的人知道那碗飯是給誰的嗎？', reply: '不是' },
    // 鬧鬼
    { id: 'q-ghost', topic: 'ghost', text: '山莊鬧鬼嗎？', reply: '不是' },
    // 房客們
    { id: 'q-li-ate', topic: 'li', text: '是黎先生吃的嗎？', reply: '是', say: '他說晚餐沒吃飽。' },
    { id: 'q-zou-ate', topic: 'zou', text: '是小鄒吃的嗎？', reply: '不是' },
    { id: 'q-ge-ate', topic: 'ge', text: '是葛老先生吃的嗎？', reply: '不是' },
    { id: 'q-jiang-ate', topic: 'jiang', text: '是江家夫妻吃的嗎？', reply: '不是' },
    // 窗邊的位子
    { id: 'q-w-always', topic: 'window', text: '那個位子每天都擺嗎？', reply: '是', say: '每一餐。', unlocks: ['everymeal'] },
    // 不會來吃的人
    { id: 'q-ab-family', topic: 'absent', text: '不會來吃的人，是老闆娘的家人嗎？', reply: '是', say: '她的女兒。', unlocks: ['xiaoqing'] },
    { id: 'q-ab-away', topic: 'absent', text: '那個人只是出遠門了嗎？', reply: '不是', unlocks: ['dead'] },
    // 小鴨子短筷
    { id: 'q-kc-kid', topic: 'kidchop', text: '這雙筷子是小孩用的嗎？', reply: '是', unlocks: ['child'] },
    // 一個小孩
    { id: 'q-c-boss', topic: 'child', text: '那個小孩，是老闆娘的女兒嗎？', reply: '是', unlocks: ['xiaoqing'] },
    { id: 'q-c-alive', topic: 'child', text: '那個小孩還活著嗎？', reply: '不是', unlocks: ['dead'] },
    // 黃雨衣
    { id: 'q-r-hers', topic: 'raincoat', text: '黃雨衣是同一個小孩的嗎？', reply: '是' },
    // 女兒
    { id: 'q-x-long', topic: 'xiaoqing', text: '她女兒是很久以前過世的嗎？', reply: '是', say: '十年了。', unlocks: ['tenyears', 'dead'] },
    { id: 'q-x-sick', topic: 'xiaoqing', text: '她女兒是生病過世的嗎？', reply: '不是', say: '……這個，以後再說。' },
    { id: 'q-x-back', topic: 'xiaoqing', text: '女兒回來吃飯了嗎？', reply: '不是' },
    // 過世了
    { id: 'q-d-long', topic: 'dead', text: '過世很多年了嗎？', reply: '是', unlocks: ['tenyears'] },
    // 老闆娘
    { id: 'q-bo-angry', topic: 'boss', text: '老闆娘生氣了嗎？', reply: '是也不是', say: '她什麼都沒說。', unlocks: ['nosay'] },
    { id: 'q-bo-saw', topic: 'boss', text: '老闆娘看到是誰吃的嗎？', reply: '是', say: '她就站在廚房門口。', unlocks: ['nosay'] },
    // 什麼都沒說
    { id: 'q-n-know', topic: 'nosay', text: '老闆娘不說話，是因為她認識吃飯的人嗎？', reply: '是也不是', say: '她認得他。' },
    // 吃得很急、半夜
    { id: 'q-h-dinner', topic: 'hungry', text: '吃的人晚餐沒吃飽嗎？', reply: '是' },
    { id: 'q-m-time', topic: 'midnight', text: '半夜這個時間很重要嗎？', reply: '不重要' },
    { id: 'q-k-light', topic: 'kitchen', text: '廚房的燈是老闆娘開的嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '第八個位子，是留給{b1}的。', blanks: [{ id: 'b1', category: '人物', answer: 'xiaoqing' }] },
    { id: 's2', text: '她過世{b2}了。老闆娘{b3}都替她盛一碗飯。', blanks: [{ id: 'b2', category: '時間', answer: 'tenyears' }, { id: 'b3', category: '時間', answer: 'everymeal' }] },
    { id: 's3', text: '今晚那碗飯，是{b4}半夜下樓吃掉的。', blanks: [{ id: 'b4', category: '人物', answer: 'li' }] },
    { id: 's4', text: '老闆娘看見了，卻{b5}。', blanks: [{ id: 'b5', category: '事情', answer: 'nosay' }] },
  ],
  reveal: [
    { who: 老闆娘, text: '我女兒叫小晴。十年前，她十二歲。' },
    { who: 老闆娘, text: '我每一餐都替她盛一碗飯，擺在她以前坐的窗邊。十年了，沒有人動過。' },
    { who: 老闆娘, text: '今天半夜，黎先生下樓找東西吃。他看到一碗沒人吃的白飯，就吃了。' },
    { who: 老闆娘, text: '他不知道那是誰的。' },
    { text: '她把空碗收起來，用手指抹掉碗邊的一粒飯。' },
    { who: 老闆娘, text: '他吃得很香。' },
  ],
};

export const night1: Night = {
  n: 1,
  title: '第一夜',
  ambience: 'storm',
  intro: [
    { text: '颱風來的前一天，你搭最後一班公車上山，到雲棲山莊打工換宿。' },
    { text: '山莊在溪的對岸，只有一座水泥橋連到外面。橋下的溪水已經變成黃色的了。' },
    { who: 老闆娘, text: '打工換宿的？來得剛好。這幾天大家都會被困在山上，你幫我顧著房客。' },
    { text: '房客有五位：來拍舊吊橋的攝影師黎先生、一對姓江的夫妻、背著登山包的大學生小鄒，還有一位話很少、總是戴著帽子的葛老先生。' },
    { who: 黎先生, text: '聽說舊吊橋下個月就要拆了。能免費住一個禮拜，拍它最後一眼，運氣真好。' },
    { who: 老闆娘, text: '是啊。運氣真好。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '凌晨兩點，一聲很長的、鋼筋被扯斷的聲音，蓋過了風雨。' },
        { text: '接著，走廊上有腳步聲。很輕，不只一個人。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-steps',
        prompt: '腳步聲經過你的房門口。你：',
        options: [
          {
            id: 'look',
            text: '把門打開一條縫，看看是誰。',
            flag: 'sawLight',
            reply: [
              { text: '走廊盡頭的後門開著。雨裡，兩支手電筒的光，一前一後往後山去了。' },
              { text: '前面那支光停了一下，像是回頭看了你一眼。然後熄了。' },
            ],
          },
          {
            id: 'stay',
            text: '把門鎖上，用棉被蓋住頭。',
            reply: [{ text: '你把門鎖上。腳步聲在你門口停了一下，又走遠了。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '早上，橋不見了。溪水從原本橋墩的地方翻過去，發出很大的聲音。' },
        { text: '早餐的時候，長桌少了一個人。小鄒的房門開著，床鋪得整整齊齊，登山包還靠在牆邊。' },
        { who: 黎先生, text: '小鄒呢？' },
        { who: 老闆娘, text: '一早下山了。' },
        { who: 黎先生, text: '……橋斷了。' },
        { who: 老闆娘, text: '嗯。' },
        { text: '她把小鄒那副碗筷收走。然後在窗邊那個位子，又盛了一碗白飯。' },
        { who: 你, text: '（橋斷了。他是怎麼下山的？）' },
      ],
    },
  ],
  bigClues: [
    '湯面：颱風夜，下山的橋斷了。五個房客，每天早上少一個。',
    '老闆娘說小鄒「一早下山了」。可是橋已經斷了。',
    '小鄒的登山包還在房間裡，床鋪得整整齊齊。',
    '老闆娘的女兒小晴，十年前過世了。窗邊永遠有一碗她的飯。',
  ],
  bigUnlocks: ['xiaoqing', 'bowl', 'tenyears'],
};
