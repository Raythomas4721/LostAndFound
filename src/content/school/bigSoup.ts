import type { Soup } from '../../engine/types';

const 廖伯 = '廖伯';

/**
 * 第二十四個的大湯。第一夜結束時打開。
 * 廖伯在第四夜坦白（解鎖 confession）之前，標了 hesitant 的題目都是謊話；
 * 坦白之後，同一個線索詞底下的更正版會取代它們。
 */
export const bigSoup: Soup = {
  id: 'big-24',
  title: '第二十四個',
  kind: 'big',
  surface: [
    { text: '校史室牆上，四十年前第三十八屆的畢業照。名冊上寫著二十三個學生，照片裡有二十四個。' },
    { text: '多出來的那個孩子，站在最後一排最邊邊，臉被一團白光遮住了。' },
    { who: 廖伯, text: '那屆是二十三個。' },
  ],
  start: ['liao', 'extra', 'you', 'photo', 'roster', 'historyroom', 'lastrow', 'whitelight', 'closing', 'ghost', 'forty', 'friday'],
  keywords: [
    { id: 'liao', label: '廖伯', category: '人物' },
    { id: 'extra', label: '多出來的孩子', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'lin', label: '林老師', category: '人物' },
    { id: 'ashu', label: '阿樹', category: '人物' },
    { id: 'kui', label: '小葵', category: '人物' },

    { id: 'photo', label: '畢業照', category: '物品' },
    { id: 'roster', label: '名冊', category: '物品' },
    { id: 'board', label: '黑板上的第二十四行', category: '物品' },
    { id: 'tape', label: '點名錄音帶', category: '物品' },
    { id: 'milk', label: '林老師的牛奶', category: '物品' },
    { id: 'logbook', label: '值夜日誌', category: '物品' },
    { id: 'key', label: '防空洞的鑰匙', category: '物品' },

    { id: 'historyroom', label: '校史室', category: '地點' },
    { id: 'lastrow', label: '最後一排', category: '地點' },
    { id: 'shelter', label: '防空洞', category: '地點' },
    { id: 'camp', label: '山上的工寮', category: '地點' },

    { id: 'whitelight', label: '臉被光遮住', category: '事情' },
    { id: 'closing', label: '廢校', category: '事情' },
    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'noregistry', label: '沒有戶口', category: '事情' },
    { id: 'locked', label: '鎖上了', category: '事情' },
    { id: 'present', label: '那一聲「有」', category: '事情' },
    { id: 'confession', label: '廖伯的坦白', category: '事情' },

    { id: 'forty', label: '四十年前', category: '時間' },
    { id: 'friday', label: '這個禮拜五', category: '時間' },
    { id: 'twoam', label: '每天兩點', category: '時間' },
    { id: 'sixyears', label: '六年', category: '時間' },
    { id: 'typhoonnight', label: '畢業那天晚上', category: '時間' },
  ],
  evidence: [],
  questions: [
    // 多出來的孩子（謊）
    { id: 'x-know', topic: 'extra', text: '廖伯，你認識多出來的那個孩子嗎？', reply: '不是', hesitant: true, say: '……不認識。' },
    { id: 'x-know-t', topic: 'extra', text: '廖伯，你認識多出來的那個孩子嗎？', reply: '是', corrects: 'x-know', requires: ['confession'], say: '我每天晚上都在等他回答。' },
    { id: 'x-ghost', topic: 'extra', text: '多出來的孩子是鬼嗎？', reply: '不是' },
    { id: 'x-class', topic: 'extra', text: '多出來的孩子，是那一屆的學生嗎？', reply: '是也不是', say: '他在那間教室，坐了六年。', unlocks: ['sixyears'] },
    { id: 'x-board', topic: 'extra', text: '他跟黑板上第二十四行，是同一個孩子嗎？', reply: '是', requires: ['board'], say: '阿樹。', unlocks: ['ashu'] },

    // 名冊（謊）
    { id: 'r-right', topic: 'roster', text: '名冊是對的嗎？那一屆就是二十三個？', reply: '是', hesitant: true, say: '……二十三個。' },
    { id: 'r-right-t', topic: 'roster', text: '名冊是對的嗎？那一屆就是二十三個？', reply: '不是', corrects: 'r-right', requires: ['confession'], say: '是二十四個。' },

    // 臉被光遮住（謊）
    { id: 'w-broken', topic: 'whitelight', text: '臉被光遮住，只是照片壞了嗎？', reply: '是', hesitant: true, say: '……舊照片，常常這樣。' },
    { id: 'w-broken-t', topic: 'whitelight', text: '臉被光遮住，只是照片壞了嗎？', reply: '不是', corrects: 'w-broken', requires: ['confession'], say: '是林老師拿手電筒照的。校長不准他入鏡，她就用光把他的臉藏起來，讓他留在照片裡。' },

    // 鬧鬼
    { id: 'g-real', topic: 'ghost', text: '學校真的有鬼嗎？', reply: '不重要' },

    // 阿樹
    { id: 'a-registry', topic: 'ashu', text: '阿樹沒有戶口嗎？', reply: '是', say: '工寮的孩子。', unlocks: ['noregistry'] },
    { id: 'a-alive', topic: 'ashu', text: '阿樹還活著嗎？', reply: '不是' },
    { id: 'a-family', topic: 'ashu', text: '阿樹是廖伯的家人嗎？', reply: '不是' },
    { id: 'a-night', topic: 'ashu', text: '阿樹畢業那天晚上，睡在防空洞嗎？', reply: '是', requires: ['shelter'] },
    { id: 'nr-school', topic: 'noregistry', text: '沒有戶口，學校就不能收他嗎？', reply: '是' },

    // 林老師
    { id: 'l-class', topic: 'lin', text: '是林老師讓阿樹來上課的嗎？', reply: '是', say: '最後一排。六年。', unlocks: ['sixyears'] },
    { id: 'l-alive', topic: 'lin', text: '林老師還活著嗎？', reply: '不是', say: '去年走的。' },
    { id: 'm-lin', topic: 'milk', text: '林老師的牛奶，是留給阿樹的嗎？', reply: '是', requires: ['ashu'] },

    // 最後一排
    { id: 'lr-hide', topic: 'lastrow', text: '他站在最後一排最邊邊，是故意的嗎？', reply: '是', say: '最不容易被看見的地方。' },

    // 畢業照、校史室
    { id: 'p-day', topic: 'photo', text: '照片是在畢業典禮那天拍的嗎？', reply: '是' },
    { id: 'hr-always', topic: 'historyroom', text: '照片一直都掛在校史室嗎？', reply: '是', say: '我每天擦。' },

    // 錄音帶（謊）
    { id: 't-habit', topic: 'tape', text: '廖伯每天放那捲帶子，只是習慣嗎？', reply: '是', hesitant: true, say: '……老人家睡不著。' },
    { id: 't-habit-t', topic: 'tape', text: '廖伯每天放那捲帶子，只是習慣嗎？', reply: '不是', corrects: 't-habit', requires: ['confession'], say: '我在等那一聲。' },
    { id: 't-after', topic: 'tape', text: '錄音帶裡，二十三號後面還有東西嗎？', reply: '是', say: '林老師小聲唸了一個名字。後面有一聲……', unlocks: ['present'] },
    { id: 'pr-ashu', topic: 'present', text: '那一聲「有」，是阿樹的嗎？', reply: '是', requires: ['ashu'] },

    // 防空洞（謊）
    { id: 's-sealed', topic: 'shelter', text: '防空洞一直都是封起來的嗎？', reply: '是', hesitant: true, say: '……一直都是。' },
    { id: 's-sealed-t', topic: 'shelter', text: '防空洞一直都是封起來的嗎？', reply: '不是', corrects: 's-sealed', requires: ['confession'], say: '是那年冬天，我封的。' },
    { id: 's-who', topic: 'shelter', text: '那天晚上，防空洞的門是廖伯鎖的嗎？', reply: '是', unlocks: ['locked'] },
    { id: 'k-who', topic: 'key', text: '鑰匙一直在廖伯身上嗎？', reply: '是', unlocks: ['locked'] },

    // 廖伯（謊）
    { id: 'lb-there', topic: 'liao', text: '四十年前，廖伯就在這間學校了嗎？', reply: '不是', hesitant: true, say: '……我是後來才來的。' },
    { id: 'lb-there-t', topic: 'liao', text: '四十年前，廖伯就在這間學校了嗎？', reply: '是', corrects: 'lb-there', requires: ['confession'], say: '那年我二十八歲。第一年當校工。' },
    { id: 'lb-guilt', topic: 'liao', text: '廖伯覺得是自己的錯嗎？', reply: '是' },

    // 日誌、工寮
    { id: 'lg-roster', topic: 'logbook', text: '日誌上的「全到」，是照名冊點的嗎？', reply: '是' },
    { id: 'c-parents', topic: 'camp', text: '阿樹的爸媽那天晚上在工寮做夜工嗎？', reply: '是' },

    // 時間
    { id: 'tw-why', topic: 'twoam', text: '每天兩點，是廖伯去鎖最後一扇門之前嗎？', reply: '是' },
    { id: 'f-last', topic: 'friday', text: '禮拜五的點名，是這間學校最後一次點名嗎？', reply: '是' },
    { id: 'ty-same', topic: 'typhoonnight', text: '畢業那天晚上，就是照片拍完的那天晚上嗎？', reply: '是' },
    { id: 'cl-why', topic: 'closing', text: '廢校跟阿樹的事有關嗎？', reply: '不是', say: '只是山上沒有孩子了。' },
  ],
  board: [
    {
      id: 'g1',
      text: '多出來的孩子叫{c1}。他{c2}，所以名冊上沒有他。',
      blanks: [
        { id: 'c1', category: '人物', answer: 'ashu' },
        { id: 'c2', category: '事情', answer: 'noregistry' },
      ],
    },
    {
      id: 'g2',
      text: '{c3}讓他坐在教室最後一排，坐了{c4}。',
      blanks: [
        { id: 'c3', category: '人物', answer: 'lin' },
        { id: 'c4', category: '時間', answer: 'sixyears' },
      ],
    },
    {
      id: 'g3',
      text: '畢業那天晚上，他睡在{c5}。廖伯照名冊點名，把門{c6}。',
      blanks: [
        { id: 'c5', category: '地點', answer: 'shelter' },
        { id: 'c6', category: '事情', answer: 'locked' },
      ],
    },
    { id: 'g4', text: '廖伯每天兩點放那捲錄音，是為了聽{c7}。', blanks: [{ id: 'c7', category: '事情', answer: 'present' }] },
  ],
  reveal: [
    { who: 廖伯, text: '阿樹是工寮的孩子，沒有戶口。林老師讓他坐在最後一排，坐了六年。' },
    { who: 廖伯, text: '照相那天，校長不准他入鏡。林老師讓他站在最邊邊，用手電筒照著他的臉。這樣，照片裡就有他了。' },
    { who: 廖伯, text: '典禮點名，林老師點完二十三號，小聲唸了「阿樹」。他在最後一排，說了一聲「有」。錄音帶錄到了。' },
    { who: 廖伯, text: '那天晚上颱風轉向。我照名冊點名，二十三人，全到。十點，我把防空洞的門鎖上。' },
    { who: 廖伯, text: '他在裡面。' },
    { who: 廖伯, text: '四十年來，每天兩點，我放那捲帶子。聽到那一聲「有」，我才敢去鎖門。' },
    { text: '廖伯從口袋裡拿出一把生鏽的鑰匙，放在你面前。' },
    { who: 廖伯, text: '明天，最後一次點名。' },
  ],
};
