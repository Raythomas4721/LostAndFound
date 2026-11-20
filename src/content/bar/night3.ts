import type { Night, Soup } from '../../engine/types';

const 阿森 = '阿森';
const 小凡 = '小凡';
const 你 = '你';

/**
 * 禮拜三：四杯酒。以晴和阿哲點了另外兩個人的酒、傳訊息叫他們來攤牌；
 * 小凡和安安推門時，剛好看到阿哲握著以晴的手。吧台的兩個人以為雙人座的兩個人在一起，
 * 雙人座的兩個人也以為吧台的兩個人在一起。所以四個人，誰都沒說話。
 */
const soup: Soup = {
  id: 'fourglasses',
  title: '四杯酒',
  kind: 'small',
  surface: [
    { text: '禮拜三，九點。雙人座第一次坐了兩個人：以晴，和阿哲。' },
    { text: '他們點了四杯酒：自己的兩杯，一杯小黃瓜琴通寧，一杯梅酒蘇打。另外那兩杯，推到桌子的另一邊。' },
    { text: '十一點，門開了。小凡和安安走進來。小凡手上提著一個白色的盒子。' },
    { text: '他們看到雙人座，停了一下，然後坐到吧台。四個人，誰都沒有說話。' },
    { text: '十二點，小凡把盒子交給阿森：「放冰箱。禮拜五我來拿。」四個人各自走了。' },
    { text: '推過去的那兩杯酒，沒有人碰。' },
  ],
  start: ['qing', 'zhe', 'fan', 'anan', 'asen', 'fourglass', 'box', 'window', 'bar', 'silence', 'eleven'],
  keywords: [
    { id: 'qing', label: '以晴', category: '人物' },
    { id: 'zhe', label: '阿哲', category: '人物' },
    { id: 'fan', label: '小凡', category: '人物' },
    { id: 'anan', label: '安安', category: '人物' },
    { id: 'asen', label: '阿森', category: '人物' },

    { id: 'fourglass', label: '四杯酒', category: '物品' },
    { id: 'box', label: '白色的盒子', category: '物品' },
    { id: 'cucumber', label: '小黃瓜琴通寧', category: '物品' },
    { id: 'umeshu', label: '梅酒蘇打', category: '物品' },
    { id: 'message', label: '同一則訊息', category: '物品' },

    { id: 'window', label: '雙人座', category: '地點' },
    { id: 'bar', label: '吧台', category: '地點' },

    { id: 'silence', label: '誰都沒說話', category: '事情' },
    { id: 'showdown', label: '當面攤牌', category: '事情' },
    { id: 'holdhand', label: '握著她的手', category: '事情' },
    { id: 'theyrecouple', label: '雙人座的兩個人在一起', category: '事情' },
    { id: 'barcouple', label: '吧台的兩個人在一起', category: '事情' },

    { id: 'eleven', label: '十一點', category: '時間' },
  ],
  evidence: [],
  questions: [
    // 四杯酒
    { id: 'f-for', topic: 'fourglass', text: '推過去的兩杯，是點給還沒來的人的嗎？', reply: '是', say: '小黃瓜琴通寧和梅酒蘇打。誰喝什麼，你應該猜得到。', unlocks: ['cucumber', 'umeshu'] },
    { id: 'f-who', topic: 'fourglass', text: '四杯酒是阿哲點的嗎？', reply: '是', say: '他記得每一個人喝什麼。' },
    { id: 'f-who-z', topic: 'fourglass', text: '四杯酒是阿哲點的嗎？', who: 'zhe', reply: '不是', lie: true, say: '是她點的。' },
    { id: 'f-who-q', topic: 'fourglass', text: '四杯酒是阿哲點的嗎？', who: 'qing', reply: '不是', lie: true, say: '是我點的。' },
    { id: 'f-umeshu', topic: 'umeshu', text: '梅酒蘇打是安安平常喝的嗎？', who: 'zhe', reply: '是', say: '她只喝這個。四年了。' },
    { id: 'f-gin', topic: 'cucumber', text: '小黃瓜琴通寧是小凡平常喝的嗎？', who: 'qing', reply: '是', say: '六年了。' },

    // 誰叫誰來
    { id: 'i-call', topic: 'eleven', text: '小凡和安安會來，是雙人座的人叫他們來的嗎？', who: 'qing', reply: '不是', lie: true, say: '剛好遇到而已。' },
    { id: 'i-call-f', topic: 'eleven', text: '小凡和安安會來，是雙人座的人叫他們來的嗎？', who: 'fan', reply: '是', say: '十點，我收到以晴的訊息。', unlocks: ['message'] },
    { id: 'i-call-a', topic: 'eleven', text: '小凡和安安會來，是雙人座的人叫他們來的嗎？', who: 'anan', reply: '是', say: '阿哲也傳了一模一樣的：「來半杯，我們在雙人座。」', unlocks: ['message'] },
    { id: 'i-busy', topic: 'eleven', text: '十點收到訊息，十一點才到，是因為當時在忙嗎？', who: 'anan', reply: '是', requires: ['message'], say: '在忙。在忙什麼，我不能說。' },
    { id: 'i-why', topic: 'message', text: '雙人座的兩個人傳訊息，是要當面攤牌嗎？', who: 'qing', reply: '是', say: '我們都看到了。對街的燈，我看了兩個小時。', unlocks: ['showdown'] },
    { id: 'i-why-z', topic: 'message', text: '雙人座的兩個人傳訊息，是要當面攤牌嗎？', who: 'zhe', reply: '不是', lie: true, say: '只是約喝一杯。' },

    // 推門的那一下
    { id: 'h-touch', topic: 'window', text: '小凡和安安推門的時候，雙人座的兩個人有碰到對方嗎？', reply: '是', say: '以晴剛哭完。阿哲握著她的手。只有那一下。', unlocks: ['holdhand'] },
    { id: 'h-touch-z', topic: 'window', text: '小凡和安安推門的時候，雙人座的兩個人有碰到對方嗎？', who: 'zhe', reply: '不是', lie: true },
    { id: 'h-touch-q', topic: 'window', text: '小凡和安安推門的時候，雙人座的兩個人有碰到對方嗎？', who: 'qing', reply: '不是', lie: true },

    // 吧台的兩個人
    { id: 'b-together', topic: 'bar', text: '小凡和安安是一起進來的嗎？', reply: '是', say: '一起。從對街那棟的樓梯走下來的。' },
    { id: 'b-together-f', topic: 'bar', text: '小凡和安安是一起進來的嗎？', who: 'fan', reply: '不是', lie: true, say: '在門口遇到的。' },
    { id: 'b-together-a', topic: 'bar', text: '小凡和安安是一起進來的嗎？', who: 'anan', reply: '不是', lie: true },
    { id: 'b-think-a', topic: 'holdhand', text: '吧台的兩個人，以為雙人座的兩個人在一起嗎？', who: 'anan', reply: '是', say: '他握著她的手。你也看到了吧。', unlocks: ['theyrecouple'] },
    { id: 'b-think-f', topic: 'holdhand', text: '吧台的兩個人，以為雙人座的兩個人在一起嗎？', who: 'fan', reply: '不是', lie: true, say: '我什麼都沒想。' },

    // 沉默
    { id: 's-think', topic: 'showdown', text: '雙人座的兩個人，以為吧台的兩個人在一起嗎？', who: 'zhe', reply: '是', say: '禮拜一那杯小黃瓜琴通寧，我一直忘不掉。', unlocks: ['barcouple'] },
    { id: 's-think-q', topic: 'showdown', text: '雙人座的兩個人，以為吧台的兩個人在一起嗎？', who: 'qing', reply: '是', unlocks: ['barcouple'] },
    { id: 's-asen', topic: 'silence', text: '阿森知道誰在說謊嗎？', reply: '不重要', say: '我只說我看到的。' },
    { id: 's-why', topic: 'silence', text: '四個人都不說話，是因為每個人都在等別人先開口嗎？', reply: '是', say: '先開口的人，就是輸的人。他們是這樣想的。' },

    // 盒子
    { id: 'x-what', topic: 'box', text: '盒子裡是吃的東西嗎？', reply: '是也不是', say: '很輕，有檸檬的味道。我沒打開。' },
    { id: 'x-qing', topic: 'box', text: '盒子是要給以晴的嗎？', who: 'fan', reply: '不是', lie: true, say: '只是放一下。' },
    { id: 'x-qing-a', topic: 'box', text: '盒子是要給以晴的嗎？', who: 'anan', reply: '是', say: '我只能說到這裡。' },

    // 人
    { id: 'z-old', topic: 'zhe', text: '阿哲和以晴以前就認識嗎？', who: 'zhe', reply: '是', say: '高中同班。比小凡認識她還早。' },
    { id: 'a-mirror', topic: 'anan', text: '安安知道阿哲禮拜一坐在吧台嗎？', who: 'anan', reply: '是', say: '鏡子。我看到了。' },
    { id: 'n-shoes', topic: 'fan', text: '小凡今晚是從球場過來的嗎？', who: 'fan', reply: '是', lie: true },
    { id: 'n-shoes-h', topic: 'fan', text: '小凡今晚是從球場過來的嗎？', reply: '不是', say: '他袖口有麵粉。' },
    { id: 'q-cry', topic: 'qing', text: '以晴今晚哭過嗎？', who: 'qing', reply: '不是', lie: true },
    { id: 'q-cry-h', topic: 'qing', text: '以晴今晚哭過嗎？', reply: '是', say: '十點半。訊息傳出去以後。' },
  ],
  board: [
    {
      id: 's1',
      text: '推過去的小黃瓜琴通寧是給{c1}的，梅酒蘇打是給{c2}的。',
      blanks: [
        { id: 'c1', category: '人物', answer: 'fan' },
        { id: 'c2', category: '人物', answer: 'anan' },
      ],
    },
    {
      id: 's2',
      text: '十點，雙人座的兩個人傳了{c3}，叫他們來。他們要{c4}。',
      blanks: [
        { id: 'c3', category: '物品', answer: 'message' },
        { id: 'c4', category: '事情', answer: 'showdown' },
      ],
    },
    { id: 's3', text: '十一點門一開，吧台的兩個人只看到：阿哲正{c5}。', blanks: [{ id: 'c5', category: '事情', answer: 'holdhand' }] },
    { id: 's4', text: '所以吧台的兩個人，以為{c6}。', blanks: [{ id: 'c6', category: '事情', answer: 'theyrecouple' }] },
    { id: 's5', text: '而雙人座的兩個人，一直以為{c7}。四個人，誰都沒說話。', blanks: [{ id: 'c7', category: '事情', answer: 'barcouple' }] },
  ],
  reveal: [
    { who: 阿森, text: '四杯酒是阿哲點的。他記得每一個人喝什麼。' },
    { who: 阿森, text: '十點，以晴和阿哲傳了同一則訊息：「來半杯，我們在雙人座。」他們要當面攤牌。' },
    { who: 阿森, text: '十一點，那兩個人從對街的樓梯一起走下來。推門的時候，以晴剛哭完，阿哲握著她的手。' },
    { who: 阿森, text: '只有那一下。可是門口的人，只看到那一下。' },
    { who: 阿森, text: '坐雙人座的兩個人，以為吧台的兩個人在一起。坐吧台的兩個人，以為雙人座的兩個人在一起。' },
    { who: 阿森, text: '每個人都以為，被背叛的是自己。所以四個人，誰都沒說話。' },
    { text: '你把那兩杯沒人碰的酒倒掉。冰箱裡，白色的盒子安安靜靜的，有一點檸檬的味道。' },
  ],
};

export const night3: Night = {
  n: 3,
  title: '禮拜三',
  ambience: 'bar',
  intro: [
    { text: '禮拜三。阿森在雙人座的桌上，多放了一張椅子，又把它搬走了。' },
    { who: 阿森, text: '兩個人的位子，就給兩個人坐。' },
    { text: '今晚，四個熟客都會來。只是不是一起來的。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '打烊前，小凡一個人折回來。' },
        { text: '他站在冰箱前面，沒有要拿盒子，只是站著。' },
        { who: 小凡, text: '禮拜五以前，這個盒子的事，誰都不要說。拜託。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-box',
        prompt: '小凡在等你點頭。',
        options: [
          {
            id: 'keep',
            text: '「好。」',
            flag: 'keptBox',
            reply: [{ who: 小凡, text: '謝謝。' }, { text: '他走的時候，在門口站了很久，看著雙人座。' }],
          },
          {
            id: 'warn',
            text: '「以晴禮拜二在這裡，看了對街兩個小時。她以為……」',
            flag: 'warnedFan',
            reply: [
              { who: 小凡, text: '……她以為我跟安安？' },
              { text: '他靠在吧台上，笑了出來。笑到一半，停住了。' },
              { who: 小凡, text: '那她剛剛握著阿哲的手，又是以為什麼？' },
            ],
          },
          {
            id: 'peek',
            text: '點頭。等他走了，打開盒子看一眼。',
            flag: 'peeked',
            reply: [
              { text: '盒子裡是一個檸檬塔。邊烤焦了一點，看得出是新手做的。' },
              { text: '檸檬塔的正中間，壓著一個深藍色的小絨布盒。' },
              { text: '你把蓋子蓋回去，像什麼都沒看過。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { who: 你, text: '他們四個人，到底誰跟誰？' },
        { who: 阿森, text: '我在這裡二十年了。來喝酒的人，看別人都看得很清楚。看自己，看不清楚。' },
      ],
    },
  ],
  bigClues: [
    '禮拜三：以晴和阿哲坐雙人座，點了四杯酒，傳訊息叫小凡和安安來攤牌。',
    '小凡和安安從對街一起過來，看見阿哲握著以晴的手。四個人都以為被背叛的是自己。',
    '小凡把一個白色的盒子寄放在冰箱，說禮拜五來拿。盒子有檸檬的味道。',
  ],
  bigUnlocks: ['misread', 'holdhand'],
};
