import type { Night, Soup } from '../../engine/types';

const 阿森 = '阿森';
const 以晴 = '以晴';

/**
 * 禮拜四：她點了他的酒。以晴點的威士忌加水是阿哲的酒——禮拜三散場，阿哲送她回家，她在門口吻了他。
 * 她哭不是因為小凡，是因為發現自己喜歡上阿哲了；阿哲進門又轉身出去，是因為他也一樣。
 */
const soup: Soup = {
  id: 'hisdrink',
  title: '她點了他的酒',
  kind: 'small',
  surface: [
    { text: '禮拜四。以晴一個人來，坐吧台，不坐雙人座。' },
    { text: '她點了一杯威士忌加水。她從來不喝威士忌。' },
    { text: '她喝一口，哭一下；再喝一口，又笑了一下。' },
    { text: '十二點，阿哲推門進來。他看到她，站住，然後轉身又出去了。' },
    { who: 阿森, text: '（小聲）下午小凡來過。他訂了明天晚上十點的雙人座。' },
  ],
  start: ['qing', 'zhe', 'fan', 'anan', 'asen', 'whisky', 'box', 'bar', 'window', 'crylaugh', 'turnaway', 'reserve', 'cheated'],
  keywords: [
    { id: 'qing', label: '以晴', category: '人物' },
    { id: 'zhe', label: '阿哲', category: '人物' },
    { id: 'fan', label: '小凡', category: '人物' },
    { id: 'anan', label: '安安', category: '人物' },
    { id: 'asen', label: '阿森', category: '人物' },

    { id: 'whisky', label: '威士忌加水', category: '物品' },
    { id: 'box', label: '白色的盒子', category: '物品' },

    { id: 'bar', label: '吧台', category: '地點' },
    { id: 'window', label: '雙人座', category: '地點' },
    { id: 'door', label: '她家門口', category: '地點' },

    { id: 'crylaugh', label: '一口哭、一口笑', category: '事情' },
    { id: 'turnaway', label: '進門又出去', category: '事情' },
    { id: 'reserve', label: '小凡訂了雙人座', category: '事情' },
    { id: 'cheated', label: '小凡劈腿', category: '事情' },
    { id: 'kiss', label: '吻了他', category: '事情' },
    { id: 'fellfor', label: '喜歡上阿哲', category: '事情' },
    { id: 'same', label: '他也一樣', category: '事情' },
  ],
  evidence: [],
  questions: [
    // 威士忌
    { id: 'w-whose', topic: 'whisky', text: '威士忌加水，是阿哲平常喝的酒嗎？', reply: '是', say: '四年來，他只點這個。' },
    { id: 'w-whose-q', topic: 'whisky', text: '威士忌加水，是阿哲平常喝的酒嗎？', who: 'qing', reply: '不是', lie: true, say: '我只是想喝烈一點的。' },
    { id: 'w-taste', topic: 'whisky', text: '她點這一杯，是想再嚐一次某個味道嗎？', reply: '是', say: '她喝第一口的時候，閉上眼睛。不像在喝酒。' },

    // 以晴
    { id: 'q-fan', topic: 'qing', text: '以晴哭，是因為小凡嗎？', who: 'qing', reply: '是', lie: true, say: '……他跟安安。' },
    { id: 'q-fan-h', topic: 'qing', text: '以晴哭，是因為小凡嗎？', reply: '不是', say: '她說到小凡的時候，沒有哭。' },
    { id: 'q-home', topic: 'qing', text: '禮拜三散場後，以晴是一個人回家的嗎？', who: 'qing', reply: '是', lie: true },
    { id: 'q-home-h', topic: 'qing', text: '禮拜三散場後，以晴是一個人回家的嗎？', reply: '不是', say: '阿哲追出去了。他說順路。他們不順路。', unlocks: ['door'] },
    { id: 'q-door', topic: 'door', text: '在她家門口，發生了什麼事嗎？', who: 'qing', reply: '不是', lie: true },
    { id: 'q-door-z', topic: 'door', text: '在她家門口，發生了什麼事嗎？', who: 'zhe', reply: '是', say: '……她吻了我。我沒有躲。', unlocks: ['kiss'] },
    { id: 'q-fell', topic: 'kiss', text: '以晴喜歡上阿哲了嗎？', who: 'qing', reply: '是', say: '……我是來抓別人的。', unlocks: ['fellfor'] },

    // 阿哲
    { id: 't-angry', topic: 'turnaway', text: '阿哲轉身出去，是在生以晴的氣嗎？', who: 'zhe', reply: '是', lie: true },
    { id: 't-angry-h', topic: 'turnaway', text: '阿哲轉身出去，是在生以晴的氣嗎？', reply: '不是', say: '他在門外站了一根菸的時間。他不抽菸的。' },
    { id: 't-same', topic: 'kiss', text: '阿哲對以晴，也是一樣的心情嗎？', who: 'zhe', reply: '不是', lie: true, say: '我只是送她回家。' },
    { id: 't-same-h', topic: 'kiss', text: '阿哲對以晴，也是一樣的心情嗎？', reply: '是', say: '一個人不在乎，就不會轉身走掉。', unlocks: ['same'] },

    // 其他
    { id: 'c-laugh', topic: 'crylaugh', text: '她笑，是因為覺得這件事好笑嗎？', who: 'qing', reply: '是', say: '我們四個人，好好笑。' },
    { id: 'c-drunk', topic: 'crylaugh', text: '她是喝醉了才哭的嗎？', reply: '不是', say: '一杯而已。' },
    { id: 'r-when', topic: 'reserve', text: '小凡訂的雙人座，是要坐兩個人嗎？', reply: '是也不是', say: '兩個人的位子。他說，坐四個人也沒關係。' },
    { id: 'r-box', topic: 'box', text: '小凡下午有打開冰箱看那個盒子嗎？', reply: '是', say: '看了一眼，又放回去。' },
    { id: 'ch-real', topic: 'cheated', text: '以晴確定小凡跟安安在一起嗎？', who: 'qing', reply: '是也不是', say: '我看到兩個影子。我只看到影子。' },
    { id: 'f-know', topic: 'fan', text: '小凡知道禮拜三晚上的事嗎？', reply: '不重要', say: '我只說我看到的。他看到握手。門口的事，我沒看到。' },
  ],
  board: [
    { id: 's1', text: '那杯威士忌加水，是{d1}的酒。', blanks: [{ id: 'd1', category: '人物', answer: 'zhe' }] },
    {
      id: 's2',
      text: '禮拜三散場，阿哲送她回家。在{d2}，她{d3}。',
      blanks: [
        { id: 'd2', category: '地點', answer: 'door' },
        { id: 'd3', category: '事情', answer: 'kiss' },
      ],
    },
    {
      id: 's3',
      text: '她哭，不是因為{d4}；是因為她發現自己{d5}。',
      blanks: [
        { id: 'd4', category: '事情', answer: 'cheated' },
        { id: 'd5', category: '事情', answer: 'fellfor' },
      ],
    },
    { id: 's4', text: '阿哲進門又轉身出去，是因為{d6}。', blanks: [{ id: 'd6', category: '事情', answer: 'same' }] },
  ],
  reveal: [
    { who: 阿森, text: '禮拜三散場，阿哲追出去，說順路送她。他們不順路。' },
    { who: 阿森, text: '這是阿哲剛剛在門外跟我說的：在她家門口，她吻了他。他沒有躲。' },
    { who: 阿森, text: '那杯威士忌加水，是昨晚她嚐到的味道。' },
    { who: 阿森, text: '她哭，不是因為小凡。是因為她發現，自己喜歡上阿哲了。她明明是來抓別人的。' },
    { who: 阿森, text: '所以她笑。她說，我們四個人，好好笑。' },
    { who: 阿森, text: '阿哲轉身出去，在門外站了一根菸的時間。他不抽菸的。' },
    { text: '冰箱裡的白盒子還在。明天晚上十點，雙人座有人訂了。' },
  ],
};

export const night4: Night = {
  n: 4,
  title: '禮拜四',
  ambience: 'bar',
  intro: [
    { text: '禮拜四。下午三點，你來開門，冰箱的門開著一條縫。' },
    { text: '白色的盒子還在原位，只是轉了一個方向。' },
    { who: 阿森, text: '盒子的主人來看過。' },
    { who: 阿森, text: '他什麼都沒拿……我是說，我沒看到他拿什麼。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '兩點，店裡只剩以晴。她把杯子推過來，要你再倒一點水。' },
        { who: 以晴, text: '你在這裡看了一整個禮拜。你覺得……小凡跟安安，在一起嗎？' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-qing',
        prompt: '以晴在等你回答。',
        options: [
          {
            id: 'tell',
            text: '「不是。冰箱裡有一個盒子，是小凡要給妳的。」',
            flag: 'toldQing',
            reply: [
              { who: 以晴, text: '……什麼盒子？' },
              { text: '你沒有再說。她看著冰箱的門，看了很久。' },
              { who: 以晴, text: '如果是我想的那樣……那我禮拜三，做了什麼。' },
            ],
          },
          {
            id: 'seen',
            text: '「我只說我看到的：他們禮拜三，是一起進來的。」',
            flag: 'onlySeen',
            reply: [{ who: 以晴, text: '……嗯。' }, { text: '她把剩下的威士忌，一口喝完了。' }],
          },
          {
            id: 'heart',
            text: '「妳現在想問的，好像不是他們。」',
            flag: 'herHeart',
            reply: [{ text: '她笑了一下，又哭了一下。' }, { who: 以晴, text: '你跟阿森，越來越像了。' }],
          },
        ],
      },
    },
  ],
  bigClues: [
    '禮拜四：以晴點了阿哲的威士忌加水。禮拜三晚上，阿哲送她回家，她在門口吻了他。',
    '以晴哭，不是因為小凡。是因為她發現自己喜歡上阿哲了。',
    '小凡下午來看過冰箱裡的盒子，訂了禮拜五十點的雙人座。',
  ],
  bigUnlocks: ['kiss', 'whisky'],
};
