import type { Soup } from '../../engine/types';

const 阿森 = '阿森';
const 安安 = '安安';
const 小凡 = '小凡';

/**
 * 雙人座的大湯。這一本沒有人坦白、也沒有說謊的主持人：阿森只說他看到的，四個人各說各的。
 * 湯底：小凡和安安從來沒有在一起——對街的燈，是安安在教小凡做求婚用的檸檬塔。
 * 每個人都以為被背叛的是自己；真正在一起的，反而是那兩個去抓別人的人。
 */
export const bigSoup: Soup = {
  id: 'big-twoseat',
  title: '雙人座',
  kind: 'big',
  surface: [
    { text: '禮拜五，十點前。四個人照常坐大桌，點了跟平常一樣的酒，聊了跟平常一樣的天。' },
    { text: '十點，小凡站起來：「我們換到窗邊吧。」' },
    { text: '兩個人的位子，擠了四個人。阿森從冰箱拿出那個白色的盒子，放在桌子正中間。' },
    { text: '小凡打開盒子，看了很久，又把蓋子蓋回去。' },
    { who: 小凡, text: '今天，各付各的。' },
  ],
  start: ['anan', 'zhe', 'fan', 'qing', 'asen', 'box', 'window', 'bar', 'split', 'affair'],
  keywords: [
    { id: 'anan', label: '安安', category: '人物' },
    { id: 'zhe', label: '阿哲', category: '人物' },
    { id: 'fan', label: '小凡', category: '人物' },
    { id: 'qing', label: '以晴', category: '人物' },
    { id: 'asen', label: '阿森', category: '人物' },

    { id: 'box', label: '白色的盒子', category: '物品' },
    { id: 'cucumber', label: '小黃瓜琴通寧', category: '物品' },
    { id: 'whisky', label: '威士忌加水', category: '物品' },
    { id: 'lemontart', label: '檸檬塔', category: '物品' },
    { id: 'ring', label: '戒指', category: '物品' },

    { id: 'window', label: '雙人座', category: '地點' },
    { id: 'bar', label: '吧台', category: '地點' },
    { id: 'studio', label: '烘焙教室', category: '地點' },
    { id: 'qinghome', label: '以晴家樓下', category: '地點' },

    { id: 'split', label: '各付各的', category: '事情' },
    { id: 'affair', label: '小凡和安安在一起', category: '事情' },
    { id: 'misread', label: '每個人都看錯了', category: '事情' },
    { id: 'holdhand', label: '握著她的手', category: '事情' },
    { id: 'kiss', label: '門口那一下', category: '事情' },
    { id: 'propose', label: '求婚', category: '事情' },
    { id: 'knew', label: '早就知道了', category: '事情' },
  ],
  evidence: [],
  questions: [
    // 小凡和安安在一起？——兩個說是，兩個說不是
    { id: 'af-fan', topic: 'affair', text: '小凡和安安在交往嗎？', who: 'fan', reply: '不是' },
    { id: 'af-anan', topic: 'affair', text: '小凡和安安在交往嗎？', who: 'anan', reply: '不是' },
    { id: 'af-qing', topic: 'affair', text: '小凡和安安在交往嗎？', who: 'qing', reply: '是', lie: true, say: '我看到了。兩個影子。' },
    { id: 'af-zhe', topic: 'affair', text: '小凡和安安在交往嗎？', who: 'zhe', reply: '是', lie: true, say: '那杯小黃瓜琴通寧，她是在等他。' },
    { id: 'af-asen', topic: 'affair', text: '小凡和安安在交往嗎？', reply: '不是', say: '對街教室的窗簾，從來沒拉過。要偷偷在一起的人，會拉窗簾。' },

    // 對街的教室
    { id: 'st-teach', topic: 'studio', text: '對街教室的晚上，安安在教小凡做東西嗎？', who: 'anan', reply: '是', say: '他很笨。烤焦了三次。' },
    { id: 'st-teach-f', topic: 'studio', text: '對街教室的晚上，安安在教小凡做東西嗎？', who: 'fan', reply: '不是', lie: true },
    { id: 'st-tart', topic: 'studio', text: '他們在做的，是以晴喜歡吃的東西嗎？', who: 'anan', reply: '是', say: '檸檬塔。她最喜歡的。', unlocks: ['lemontart'] },
    { id: 'st-why', topic: 'studio', text: '安安瞞著阿哲，是因為阿哲藏不住話嗎？', who: 'anan', reply: '是', say: '他什麼都會跟以晴說。他們高中就這樣了。' },
    { id: 'st-gin', topic: 'cucumber', text: '禮拜一那杯小黃瓜琴通寧，安安是在等小凡來上課嗎？', who: 'anan', reply: '是', say: '那天他沒來。以晴提早回家，他走不開。' },

    // 盒子
    { id: 'bx-tart', topic: 'box', text: '盒子裡是檸檬塔嗎？', reply: '是', requires: ['lemontart'], say: '我今天才第一次看到。' },
    { id: 'bx-more', topic: 'box', text: '盒子裡，原本還放了別的東西嗎？', who: 'fan', reply: '不是', lie: true },
    { id: 'bx-more-a', topic: 'box', text: '盒子裡，原本還放了別的東西嗎？', who: 'anan', reply: '是', say: '一個深藍色的小盒子。放在正中間，是我幫他想的。', unlocks: ['ring'] },
    { id: 'bx-now', topic: 'ring', text: '戒指現在還在盒子裡嗎？', who: 'fan', reply: '是', lie: true },
    { id: 'bx-now-h', topic: 'ring', text: '戒指現在還在盒子裡嗎？', reply: '不是', say: '禮拜四下午他來看過。走的時候，口袋鼓鼓的。' },
    { id: 'bx-propose', topic: 'ring', text: '小凡本來要在今天晚上求婚嗎？', who: 'fan', reply: '不是', lie: true },
    { id: 'bx-propose-a', topic: 'ring', text: '小凡本來要在今天晚上求婚嗎？', who: 'anan', reply: '是', say: '十點，雙人座。他排練了好幾次。', unlocks: ['propose'] },

    // 禮拜三之後
    { id: 'mi-all', topic: 'misread', text: '禮拜三，四個人都以為被背叛的是自己嗎？', reply: '是', say: '看錯的人，就不說話。' },
    { id: 'hd-fan', topic: 'holdhand', text: '禮拜三散場後，小凡去了以晴家嗎？', who: 'fan', reply: '不是', lie: true },
    { id: 'hd-fan-q', topic: 'holdhand', text: '禮拜三散場後，小凡去了以晴家嗎？', who: 'qing', reply: '是', say: '那天晚上，樓下停了一台很像他的機車。我那時候，沒有多想。', unlocks: ['qinghome'] },
    { id: 'k-fan', topic: 'qinghome', text: '小凡看到了門口那一下嗎？', who: 'fan', reply: '是', say: '……我本來是去解釋的。', unlocks: ['knew'] },
    { id: 'k-fan-z', topic: 'qinghome', text: '小凡看到了門口那一下嗎？', who: 'zhe', reply: '不是', lie: true, say: '他不可能在那裡。' },
    { id: 'k-first', topic: 'kiss', text: '門口那一下，是以晴先靠過去的嗎？', who: 'qing', reply: '是' },
    { id: 'k-now', topic: 'kiss', text: '阿哲和以晴，現在在一起嗎？', who: 'zhe', reply: '不是', lie: true },
    { id: 'k-now-q', topic: 'kiss', text: '阿哲和以晴，現在在一起嗎？', who: 'qing', reply: '不是', lie: true },
    { id: 'k-now-a', topic: 'kiss', text: '阿哲和以晴，現在在一起嗎？', who: 'anan', reply: '是', say: '禮拜四，他的外套上有她的香水味。我聞得出來。' },

    // 各付各的
    { id: 'sp-why', topic: 'split', text: '「各付各的」，是小凡決定不求婚了嗎？', reply: '是', say: '十點的時候，他手一直放在口袋裡。到最後都沒拿出來。' },
    { id: 'sp-why-f', topic: 'split', text: '「各付各的」，是小凡決定不求婚了嗎？', who: 'fan', reply: '是也不是', say: '我學了一個月的檸檬塔。至少，想讓她吃到。' },
    { id: 'as-lie', topic: 'asen', text: '阿森這個禮拜，說過謊嗎？', reply: '不是', say: '我只說我看到的。看到的，不一定是真的。' },
    { id: 'win-four', topic: 'window', text: '四個人坐雙人座，是小凡安排的嗎？', reply: '是', say: '他禮拜四就訂了。' },
  ],
  board: [
    {
      id: 'g1',
      text: '對街二樓亮燈的晚上，安安在教{e1}做{e2}。',
      blanks: [
        { id: 'e1', category: '人物', answer: 'fan' },
        { id: 'e2', category: '物品', answer: 'lemontart' },
      ],
    },
    { id: 'g2', text: '他瞞著以晴，因為禮拜五晚上，他要用它{e3}。', blanks: [{ id: 'e3', category: '事情', answer: 'propose' }] },
    { id: 'g3', text: '禮拜三，四個人都以為被背叛的是自己：{e4}。', blanks: [{ id: 'e4', category: '事情', answer: 'misread' }] },
    { id: 'g4', text: '那天散場，小凡去了{e5}，看見了門口那一下。', blanks: [{ id: 'e5', category: '地點', answer: 'qinghome' }] },
    { id: 'g5', text: '所以禮拜四下午，他從盒子裡拿走了{e6}。', blanks: [{ id: 'e6', category: '物品', answer: 'ring' }] },
    {
      id: 'g6',
      text: '他說「各付各的」，因為他{e7}：真的在一起的，是以晴和{e8}。',
      blanks: [
        { id: 'e7', category: '事情', answer: 'knew' },
        { id: 'e8', category: '人物', answer: 'zhe' },
      ],
    },
  ],
  reveal: [
    { who: 安安, text: '對街的燈，是我在教小凡烤檸檬塔。以晴最喜歡的。他烤焦了三次。' },
    { who: 安安, text: '我瞞著阿哲，是因為阿哲什麼都會跟以晴說。禮拜一那杯琴通寧，我在等他來上課。' },
    { who: 小凡, text: '檸檬塔的正中間，本來要放一個小盒子。今天，雙人座，十點。' },
    { who: 阿森, text: '禮拜三，四個人都看錯了。看錯的人，就不說話。' },
    { who: 小凡, text: '那天散場，我去她家樓下，想把話說清楚。我看到了門口那一下。' },
    { who: 小凡, text: '禮拜四，我把戒指拿走了。盒子裡，只剩檸檬塔。' },
    { who: 小凡, text: '我學了一個月。至少，想讓她吃到。' },
    { text: '他把盒子推到以晴面前。她沒有打開。' },
    { who: 阿森, text: '我只說我看到的。四個人坐兩個人的位子，坐得很擠。可是今天，誰都沒有先走。' },
  ],
};
