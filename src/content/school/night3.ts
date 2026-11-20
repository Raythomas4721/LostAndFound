import type { Night, Soup } from '../../engine/types';

const 廖伯 = '廖伯';
const 你 = '你';

/** 第三夜：每天少一口的牛奶。喝的是小葵，剩下的留給弟弟；牛奶是廖伯故意放的，就像四十年前的林老師。 */
const soup: Soup = {
  id: 'milk',
  title: '少一口的牛奶',
  kind: 'small',
  surface: [
    { text: '福利社上個月就收了。冰櫃還插著電，裡面只有一瓶玻璃瓶裝的牛奶。' },
    { text: '每天早上，那瓶牛奶都會少一口。就一口。瓶蓋是蓋好的。' },
    { text: '你問廖伯，他說牛奶是他放的。可是他說，他一口都沒喝過。' },
    { text: '今天你五點半就到學校。福利社的門開著一條縫，冰櫃的燈亮著。' },
    { text: '地上有一排小小的濕腳印，從門口走進來，又走出去。' },
    { text: '冰櫃裡，牛奶又少了一口。' },
    { who: 廖伯, text: '你今天，來得太早了。' },
  ],
  start: ['you', 'liao', 'milk', 'fridge', 'cap', 'shop', 'footprints', 'sip', 'ghost', 'stolen', 'dawn'],
  keywords: [
    { id: 'you', label: '你', category: '人物' },
    { id: 'liao', label: '廖伯', category: '人物' },
    { id: 'kid', label: '一個小孩', category: '人物' },
    { id: 'kui', label: '小葵', category: '人物' },
    { id: 'brother', label: '阿豆', category: '人物' },
    { id: 'lin', label: '林老師', category: '人物' },

    { id: 'milk', label: '那瓶牛奶', category: '物品' },
    { id: 'fridge', label: '冰櫃', category: '物品' },
    { id: 'cap', label: '蓋好的瓶蓋', category: '物品' },

    { id: 'shop', label: '福利社', category: '地點' },
    { id: 'mountain', label: '後山', category: '地點' },

    { id: 'footprints', label: '濕腳印', category: '事情' },
    { id: 'sip', label: '少一口', category: '事情' },
    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'stolen', label: '偷喝', category: '事情' },
    { id: 'earliest', label: '第一個到學校', category: '事情' },

    { id: 'dawn', label: '五點半', category: '時間' },
    { id: 'lunch', label: '中午', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-fridge',
      art: 'milk',
      name: '福利社的冰櫃',
      description: '一台很舊的直立式冰櫃，玻璃門上貼著褪色的「每日一瓶　營養午餐」。',
      hotspots: [
        { id: 'hs-bottle', at: [57, 30], name: '牛奶瓶', label: '瓶口內側沾著一點點亮晶晶的貼紙屑。是小孩子的東西。', unlocks: ['kid'] },
        { id: 'hs-steps', at: [36, 82], name: '腳印', label: '腳印很小，鞋底有泥巴和松針。是從後山的小路走下來的。', unlocks: ['mountain'] },
        { id: 'hs-note', at: [91, 14], name: '冰櫃門上', label: '玻璃門的角落，有人用手指在霧氣上畫了兩個小人，一大一小，手牽手。', unlocks: [] },
      ],
    },
  ],
  questions: [
    // 牛奶、少一口
    { id: 'q-m-ghost', topic: 'milk', text: '牛奶是給鬼喝的嗎？', reply: '不是' },
    { id: 'q-m-for', topic: 'milk', text: '牛奶是要給特定的人的嗎？', reply: '是', say: '一個不好意思開口要的人。' },
    { id: 'q-s-person', topic: 'sip', text: '那一口是被人喝掉的嗎？', reply: '是' },
    { id: 'q-s-rest', topic: 'sip', text: '只喝一口，剩下的是留給別人的嗎？', reply: '是', say: '留給一年級的。', unlocks: ['brother'] },
    // 瓶蓋、冰櫃
    { id: 'q-cap', topic: 'cap', text: '喝的人每次都會把瓶蓋蓋好嗎？', reply: '是', say: '很小心。像是怕被發現。' },
    { id: 'q-fridge', topic: 'fridge', text: '冰櫃壞了嗎？', reply: '不重要' },
    // 腳印、小孩
    { id: 'q-f-kid', topic: 'footprints', text: '腳印是小孩的嗎？', reply: '是', unlocks: ['kid'] },
    { id: 'q-f-wet', topic: 'footprints', text: '腳印是濕的，是因為外面下雨嗎？', reply: '是也不是', say: '是山路上的露水。' },
    { id: 'q-kid-student', topic: 'kid', text: '那個小孩是學校的學生嗎？', reply: '是', say: '全校最大的那一個。', unlocks: ['kui'] },
    { id: 'q-kid-steal', topic: 'kid', text: '那個小孩是偷喝的嗎？', reply: '不是', say: '是拿。放在那裡，就是給她的。' },
    // 偷喝、鬧鬼
    { id: 'q-stolen', topic: 'stolen', text: '牛奶是被偷喝的嗎？', reply: '不是' },
    { id: 'q-ghost', topic: 'ghost', text: '福利社鬧鬼嗎？', reply: '不是' },
    // 小葵
    { id: 'q-k-early', topic: 'kui', text: '小葵每天都很早到學校嗎？', reply: '是', say: '五點半。比我還早。', unlocks: ['earliest'] },
    { id: 'q-k-know', topic: 'kui', text: '小葵知道牛奶是廖伯放的嗎？', reply: '不是', say: '她以為是福利社忘了收的。' },
    { id: 'q-k-poor', topic: 'kui', text: '小葵家裡很窮嗎？', reply: '不重要' },
    // 第一個到學校、後山
    { id: 'q-e-far', topic: 'earliest', text: '她那麼早到，是因為家住得很遠嗎？', reply: '是', say: '後山。走山路，一個鐘頭。' },
    { id: 'q-mt-home', topic: 'mountain', text: '後山有住人嗎？', reply: '是', say: '幾戶。小葵家是最遠的那一戶。' },
    // 阿豆
    { id: 'q-b-sister', topic: 'brother', text: '阿豆是小葵的弟弟嗎？', reply: '是' },
    { id: 'q-b-think', topic: 'brother', text: '阿豆知道牛奶是誰放的嗎？', reply: '不是', say: '他以為是姊姊特地留給他的。' },
    // 廖伯、林老師
    { id: 'q-l-know', topic: 'liao', text: '廖伯知道是誰喝的嗎？', reply: '是' },
    { id: 'q-l-before', topic: 'liao', text: '廖伯這樣做，是因為以前有人也這樣做過嗎？', reply: '是', say: '林老師。四十年前。', unlocks: ['lin'] },
    { id: 'q-lin-who', topic: 'lin', text: '林老師留牛奶給的，是那一屆的學生嗎？', reply: '是也不是', say: '他在那一屆。名冊上沒有他。' },
    // 時間
    { id: 'q-lunch', topic: 'lunch', text: '剩下的牛奶，中午才會被喝掉嗎？', reply: '是' },
    { id: 'q-dawn', topic: 'dawn', text: '五點半這個時間很重要嗎？', reply: '是', say: '那是第一個到學校的人到的時間。', unlocks: ['earliest'] },
    { id: 'q-shop', topic: 'shop', text: '福利社的門是被撬開的嗎？', reply: '不是', say: '廖伯故意沒鎖。', unlocks: ['lunch'] },
  ],
  board: [
    { id: 's1', text: '每天喝那一口的，是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'kui' }] },
    { id: 's2', text: '她家在後山，每天都{b2}。', blanks: [{ id: 'b2', category: '事情', answer: 'earliest' }] },
    { id: 's3', text: '她只喝一口，剩下的留給弟弟{b3}。', blanks: [{ id: 'b3', category: '人物', answer: 'brother' }] },
    { id: 's4', text: '牛奶是{b4}故意放的。四十年前，{b5}也是這樣，每天替一個孩子留一瓶。', blanks: [{ id: 'b4', category: '人物', answer: 'liao' }, { id: 'b5', category: '人物', answer: 'lin' }] },
  ],
  reveal: [
    { who: 廖伯, text: '小葵家在後山，走到學校要一個鐘頭。她每天五點半就到，比我還早。' },
    { who: 廖伯, text: '福利社收了以後，冰櫃裡沒東西了。我就每天晚上放一瓶牛奶進去，門不鎖。' },
    { who: 廖伯, text: '她以為是福利社忘了收的。每天早上喝一口，蓋好，放回去。' },
    { who: 廖伯, text: '中午，她弟弟阿豆會去冰櫃拿。他以為那是姊姊留給他的。' },
    { who: 廖伯, text: '兩個都以為，是對方省下來的。' },
    { text: '廖伯把冰櫃的門關上。' },
    { who: 廖伯, text: '四十年前，林老師每天把自己那瓶牛奶，放在教室最後一排的桌上。那個位子，不在座位表上。' },
  ],
};

export const night3: Night = {
  n: 3,
  title: '第三夜',
  ambience: 'school',
  intro: [
    { text: '第三夜。天黑得很早，霧從山谷裡一層一層爬上來。' },
    { text: '你在走廊上遇到廖伯。他手上提著一個塑膠袋，裡面是一瓶牛奶。' },
    { who: 你, text: '這麼晚了，還要去哪裡？' },
    { who: 廖伯, text: '福利社。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-milk',
        prompt: '明天早上，你想：',
        options: [
          {
            id: 'two',
            text: '在冰櫃裡多放一瓶。一人一瓶。',
            flag: 'extraMilk',
            reply: [{ text: '第二天早上，冰櫃裡兩瓶牛奶都少了一口。' }, { who: 廖伯, text: '……兩個都在省。' }],
          },
          {
            id: 'same',
            text: '什麼都不改，讓他們繼續以為是對方留的。',
            reply: [{ who: 廖伯, text: '也好。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '那天晚上，你在值夜室的櫃子最裡面，找到一疊很舊的本子。封面寫著：「值夜日誌」。' },
        { text: '四十年前的。字跡很年輕，可是你認得那個寫法。' },
      ],
    },
  ],
  bigClues: [
    '四十年前，林老師每天把自己那瓶牛奶，放在教室最後一排的桌上。那個位子不在座位表上。',
    '林老師留牛奶給的那個孩子「在那一屆，名冊上沒有他」。',
  ],
  bigUnlocks: ['milk'],
};
