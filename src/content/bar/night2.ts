import type { Night, Soup } from '../../engine/types';

const 阿森 = '阿森';
const 小凡 = '小凡';
const 你 = '你';

/**
 * 禮拜二：對街的窗。短髮的小姐是小凡的女朋友以晴；對街二樓是安安的烘焙教室，燈亮時窗裡的男人就是小凡。
 * 隔天打電話來問「她有沒有一直看著對面」的，也是小凡——他從對面的窗，看見了坐在雙人座的她。
 */
const soup: Soup = {
  id: 'window',
  title: '對街的窗',
  kind: 'small',
  witnessNames: { fan: '電話裡的男人', qing: '短髮的小姐' },
  surface: [
    { text: '禮拜二，十點前。一位短髮的小姐指定要窗邊的雙人座，只點了一杯熱水。' },
    { text: '她兩個小時沒有說話，一直看著窗外。對街二樓的燈，十點亮，十二點熄。' },
    { text: '燈一熄，她就結帳走了。熱水一口都沒喝。' },
    { text: '隔天中午，店裡的電話響了。是你接的。一個男人的聲音：' },
    { who: '電話裡的男人', text: '昨天晚上，窗邊那位小姐……她是一個人嗎？她有沒有，一直看著對面？' },
  ],
  start: ['shorthair', 'caller', 'asen', 'hotwater', 'cucumber', 'window', 'upstairs', 'light', 'phonecall'],
  keywords: [
    { id: 'shorthair', label: '短髮的小姐', category: '人物' },
    { id: 'caller', label: '電話裡的男人', category: '人物' },
    { id: 'asen', label: '阿森', category: '人物' },
    { id: 'qing', label: '以晴', category: '人物' },
    { id: 'fan', label: '小凡', category: '人物' },
    { id: 'anan', label: '安安', category: '人物' },

    { id: 'hotwater', label: '熱水', category: '物品' },
    { id: 'cucumber', label: '小黃瓜琴通寧', category: '物品' },
    { id: 'shoes', label: '沒濕過的球鞋', category: '物品' },

    { id: 'window', label: '雙人座', category: '地點' },
    { id: 'upstairs', label: '對街二樓', category: '地點' },
    { id: 'studio', label: '烘焙教室', category: '地點' },
    { id: 'gym', label: '籃球場', category: '地點' },

    { id: 'light', label: '十點亮、十二點熄', category: '事情' },
    { id: 'phonecall', label: '隔天的電話', category: '事情' },
  ],
  evidence: [],
  questions: [
    // 短髮的小姐
    { id: 'q-name', topic: 'shorthair', text: '短髮的小姐是熟客嗎？', reply: '是', say: '以晴。禮拜五都跟男朋友，還有阿哲安安，四個人坐大桌。', unlocks: ['qing'] },
    { id: 'q-bf', topic: 'qing', text: '以晴的男朋友，是喝小黃瓜琴通寧的那一位嗎？', reply: '是', say: '小凡。他們在一起六年了。', unlocks: ['fan'] },
    { id: 'q-watch', topic: 'qing', text: '以晴昨晚一直在看對街的窗嗎？', who: 'qing', reply: '不是', lie: true, say: '我只是在想事情。' },
    { id: 'q-watch-h', topic: 'qing', text: '以晴昨晚一直在看對街的窗嗎？', reply: '是', say: '兩個小時，眼睛沒離開過。' },
    { id: 'q-shoes', topic: 'fan', text: '以晴知道小凡禮拜二晚上在哪裡嗎？', who: 'qing', reply: '是也不是', say: '他說他去打球。可是他的球鞋，三個月沒有濕過。', unlocks: ['shoes', 'gym'] },

    // 對街二樓
    { id: 'u-what', topic: 'upstairs', text: '對街二樓是住家嗎？', reply: '不是', say: '是一間小教室。招牌很小，晚上看不到。', unlocks: ['studio'] },
    { id: 'u-whose', topic: 'studio', text: '那間教室，短髮的小姐認識主人嗎？', who: 'qing', reply: '不是', lie: true },
    { id: 'u-whose-h', topic: 'studio', text: '那間教室，短髮的小姐認識主人嗎？', reply: '是', say: '安安的烘焙教室。安安是她的朋友。', unlocks: ['anan'] },
    { id: 'u-class', topic: 'studio', text: '烘焙教室晚上還有開課嗎？', reply: '不是', say: '安安說，晚上的課半年前就停了。' },

    // 燈
    { id: 'l-two', topic: 'light', text: '燈亮的時候，教室裡有兩個人嗎？', reply: '是', say: '窗簾沒拉。一男一女的影子。' },
    { id: 'l-fan', topic: 'light', text: '窗裡那個男人，是小凡嗎？', reply: '是', requires: ['fan'], say: '他走到窗邊的時候，袖子捲到手肘。他禮拜五也是這樣。' },
    { id: 'l-fan-c', topic: 'light', text: '窗裡那個男人，是小凡嗎？', who: 'fan', reply: '不是', lie: true, requires: ['fan'], say: '我昨晚在打球。' },

    // 電話
    { id: 'p-who', topic: 'phonecall', text: '打電話來的男人，認識短髮的小姐嗎？', who: 'fan', reply: '不是', lie: true, say: '只是……路過看到。' },
    { id: 'p-who-h', topic: 'phonecall', text: '打電話來的男人，認識短髮的小姐嗎？', reply: '是', say: '聲音我認得。每個禮拜五都會聽到。' },
    { id: 'p-saw', topic: 'caller', text: '打電話的人，昨晚看到了坐在窗邊的她嗎？', reply: '是', say: '雙人座的燈，是整條巷子最亮的。從對面看，什麼都看得到。' },
    { id: 'p-saw-c', topic: 'caller', text: '打電話的人，昨晚看到了坐在窗邊的她嗎？', who: 'fan', reply: '不是', lie: true },
    { id: 'p-gym', topic: 'caller', text: '小凡禮拜二晚上都去打球嗎？', who: 'fan', reply: '是', lie: true, say: '每個禮拜都去。' },
    { id: 'p-gym-h', topic: 'caller', text: '小凡禮拜二晚上都去打球嗎？', who: 'qing', reply: '不是', say: '我去過球場。他不在。' },

    // 其他
    { id: 'h-hot', topic: 'hotwater', text: '她點熱水，是怕喝了酒會看不清楚嗎？', reply: '是', say: '她連熱水都沒喝。' },
    { id: 'h-hot-q', topic: 'hotwater', text: '她點熱水，是怕喝了酒會看不清楚嗎？', who: 'qing', reply: '不是', lie: true, say: '我只是胃不好。' },
    { id: 'h-burn', topic: 'hotwater', text: '她沒喝熱水，是因為太燙嗎？', reply: '不重要' },
    { id: 'win-see', topic: 'window', text: '從對街二樓，看得到雙人座嗎？', reply: '是', say: '看得很清楚。' },
    { id: 'c-gin', topic: 'cucumber', text: '禮拜一那杯小黃瓜琴通寧，跟今晚有關嗎？', reply: '是也不是', say: '我只說我看到的。禮拜一，安安在等一個人。' },
  ],
  board: [
    {
      id: 's1',
      text: '短髮的小姐是{b1}。她盯著的對街二樓，是{b2}。',
      blanks: [
        { id: 'b1', category: '人物', answer: 'qing' },
        { id: 'b2', category: '地點', answer: 'studio' },
      ],
    },
    {
      id: 's2',
      text: '燈亮的時候，窗裡的男人是她的男朋友{b3}。他跟她說，禮拜二晚上在{b4}。',
      blanks: [
        { id: 'b3', category: '人物', answer: 'fan' },
        { id: 'b4', category: '地點', answer: 'gym' },
      ],
    },
    {
      id: 's3',
      text: '隔天打電話來的，也是{b5}。他從對面的窗，看見了坐在{b6}的她。',
      blanks: [
        { id: 'b5', category: '人物', answer: 'fan' },
        { id: 'b6', category: '地點', answer: 'window' },
      ],
    },
  ],
  reveal: [
    { who: 阿森, text: '她叫以晴。男朋友是小凡——禮拜一那杯小黃瓜琴通寧，就是他在喝的。' },
    { who: 阿森, text: '對街二樓，是安安的烘焙教室。晚上的課，半年前就停了。' },
    { who: 阿森, text: '小凡跟以晴說，禮拜二晚上去打球。他的球鞋，三個月沒濕過。' },
    { who: 阿森, text: '十點燈亮，窗裡兩個影子。十二點燈熄。以晴就坐在這裡，看了兩個小時。' },
    { who: 阿森, text: '隔天打電話來的，是小凡。雙人座的燈，是整條巷子最亮的。他從對面的窗，看見她了。' },
    { text: '他問的不是「她是不是一個人」。他問的是：「她看到了多少。」' },
    { who: 阿森, text: '我只說我看到的。剩下的，你自己想。' },
  ],
};

export const night2: Night = {
  n: 2,
  title: '禮拜二',
  ambience: 'bar',
  intro: [
    { text: '禮拜二。巷子裡在下毛毛雨，客人很少。' },
    { text: '阿森在擦雙人座的桌子。擦了兩遍。' },
    { who: 阿森, text: '有人打電話來訂了這個位子。十點以前要留給她。' },
    { who: 你, text: '一個人訂雙人座？' },
    { who: 阿森, text: '這個位子，最近常常是一個人坐。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [{ text: '你想起來，那通電話還沒掛。電話那頭的人一直沒出聲，在等你回答。' }],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-call',
        prompt: '「她有沒有，一直看著對面？」',
        options: [
          {
            id: 'told',
            text: '「有。看了兩個小時。」',
            flag: 'toldFan',
            reply: [
              { who: 小凡, text: '……兩個小時。' },
              { text: '很久，電話那頭只有呼吸的聲音。' },
              { who: 小凡, text: '謝謝。我打來過的事，不要跟她說。' },
            ],
          },
          {
            id: 'cover',
            text: '「我沒注意。」',
            flag: 'coverQing',
            reply: [{ who: 小凡, text: '……好。' }, { text: '掛電話之前，你聽到他鬆了一口氣。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { who: 阿森, text: '明天晚上的雙人座，也有人訂了。' },
        { who: 阿森, text: '訂位的名字寫「以晴」。兩個人。' },
        { who: 你, text: '另一個是誰？' },
        { who: 阿森, text: '明天你就看到了。' },
      ],
    },
  ],
  bigClues: [
    '禮拜二：以晴坐雙人座，看著對街二樓——安安的烘焙教室。窗裡的男人是小凡。',
    '小凡說禮拜二晚上去打球。他的球鞋三個月沒濕過。',
    '隔天小凡打電話來，想知道以晴「看到了多少」。',
  ],
  bigUnlocks: ['studio'],
};
