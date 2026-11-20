import type { Night, Soup } from '../../engine/types';

const 老鍾 = '老鍾';
const 林太太 = '林太太';
const 你 = '你';

/** 第二夜：嬰兒監聽器裡的男人。其實是電台太強的訊號，那個男人就是老鍾自己。 */
const soup: Soup = {
  id: 'monitor',
  title: '監聽器裡的男人',
  kind: 'small',
  caller: '林太太',
  surface: [
    { text: '凌晨兩點十五分。一個壓得很低的女人聲音。' },
    { who: 林太太, text: '我不知道該打給誰……每天兩點，我女兒房間的嬰兒監聽器裡，都有一個男人在說話。' },
    { who: 林太太, text: '他不唱歌，也不罵人。他在說天氣。風多大、浪多高。' },
    { who: 林太太, text: '今天晚上，他叫了我女兒的名字。「小滿」。' },
    { text: '她的聲音在發抖。' },
    { who: 林太太, text: '小滿七歲。那台監聽器，三年來從來沒有離開過她的房間。' },
    { text: '電話掛了。玻璃另一邊，老鍾的表情很怪。' },
  ],
  start: ['lin', 'xiaoman', 'man', 'monitor', 'phone', 'room', 'weather', 'name', 'ghost', 'two'],
  keywords: [
    { id: 'lin', label: '林太太', category: '人物' },
    { id: 'xiaoman', label: '小滿', category: '人物' },
    { id: 'man', label: '監聽器裡的男人', category: '人物' },
    { id: 'zhong', label: '老鍾', category: '人物' },
    { id: 'dad', label: '小滿的爸爸', category: '人物' },

    { id: 'monitor', label: '嬰兒監聽器', category: '物品' },
    { id: 'phone', label: '電話', category: '物品' },
    { id: 'signal', label: '電台的訊號', category: '物品' },

    { id: 'room', label: '小滿的房間', category: '地點' },
    { id: 'hill', label: '山上', category: '地點' },
    { id: 'farsea', label: '遠洋', category: '地點' },

    { id: 'weather', label: '說天氣', category: '事情' },
    { id: 'name', label: '叫了名字', category: '事情' },
    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'seareport', label: '海象報告', category: '事情' },
    { id: 'request', label: '打電話來點歌', category: '事情' },

    { id: 'two', label: '兩點', category: '時間' },
    { id: 'lastnight', label: '昨天晚上', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-log',
      art: 'log',
      name: '來電紀錄表',
      description: '每一通來電都要記在這張表上。這個禮拜的表，前面幾格是你的字。',
      hotspots: [
        { id: 'hs-last', at: [28, 40], name: '昨晚那一格', label: '昨晚 01:47 的來電：女孩，七歲。名字那一格是你寫的，字太潦草，看不清楚。', unlocks: ['lastnight'] },
        { id: 'hs-two', at: [93, 62], name: '兩點那一欄', label: '每天 02:00 那一格印著：「海象報告（給海上的船）——鍾」。', unlocks: ['seareport'] },
        { id: 'hs-head', at: [94, 9], name: '表頭', label: '表頭印著：汐見之聲 FM 87.3，發射站：山上。「發射功率」那一格被人用立可白塗掉了。', unlocks: ['hill'] },
      ],
    },
  ],
  questions: [
    // 監聽器裡的男人
    { id: 'q-m-ghost', topic: 'man', text: '那個男人是鬼嗎？', reply: '不是' },
    { id: 'q-m-near', topic: 'man', text: '那個男人在林家附近嗎？', reply: '不是', say: '他在山上。', unlocks: ['hill'] },
    { id: 'q-m-know', topic: 'man', text: '我認識那個男人嗎？', reply: '是', say: '你每天晚上都看得到他。', unlocks: ['zhong'] },
    { id: 'q-m-you', topic: 'man', text: '那個男人是我嗎？', reply: '不是', say: '你的聲音沒那麼老。' },
    { id: 'q-m-hack', topic: 'man', text: '有人駭進了監聽器嗎？', reply: '不是' },
    // 鬧鬼
    { id: 'q-ghost', topic: 'ghost', text: '小滿的房間鬧鬼嗎？', reply: '不是' },
    // 監聽器
    { id: 'q-mo-broken', topic: 'monitor', text: '監聽器壞了嗎？', reply: '是也不是', say: '它沒壞。它只是聽到了不該聽到的東西。' },
    { id: 'q-mo-radio', topic: 'monitor', text: '監聽器收到了廣播嗎？', reply: '是', unlocks: ['signal'] },
    { id: 'q-mo-old', topic: 'monitor', text: '監聽器很舊嗎？', reply: '不重要' },
    // 山上
    { id: 'q-h-station', topic: 'hill', text: '山上有電台嗎？', reply: '是', say: '就是這裡。' },
    // 說天氣
    { id: 'q-w-ship', topic: 'weather', text: '天氣是說給海上的船聽的嗎？', reply: '是', unlocks: ['seareport'] },
    { id: 'q-w-same', topic: 'weather', text: '每天兩點說天氣的，都是同一個人嗎？', reply: '是', say: '三十年，同一個人。', unlocks: ['zhong'] },
    // 老鍾
    { id: 'q-z-you', topic: 'zhong', text: '老鍾，是你嗎？', reply: '是', say: '……是我。' },
    // 小滿
    { id: 'q-x-asleep', topic: 'xiaoman', text: '小滿兩點的時候睡著了嗎？', reply: '不是', say: '她每天兩點都醒著。', unlocks: ['seareport'] },
    { id: 'q-x-dad', topic: 'xiaoman', text: '小滿的爸爸在家嗎？', reply: '不是', say: '他跑遠洋，三個月沒回來了。', unlocks: ['dad', 'farsea'] },
    { id: 'q-x-knows', topic: 'xiaoman', text: '小滿知道監聽器裡有聲音嗎？', reply: '是', say: '她一直都知道。她以為那是她的秘密。' },
    { id: 'q-x-call', topic: 'xiaoman', text: '小滿打過電話到電台嗎？', reply: '是', requires: ['lastnight'], unlocks: ['request'] },
    // 林太太
    { id: 'q-l-know', topic: 'lin', text: '林太太知道監聽器收得到廣播嗎？', reply: '不是' },
    { id: 'q-l-husband', topic: 'lin', text: '林太太的先生跟這件事有關嗎？', reply: '是', unlocks: ['dad'] },
    // 叫了名字
    { id: 'q-n-told', topic: 'name', text: '他會叫小滿的名字，是因為有人告訴他嗎？', reply: '是', say: '一張紙條，從你那邊遞過去的。', unlocks: ['request'] },
    { id: 'q-n-threat', topic: 'name', text: '他是在威脅她們嗎？', reply: '不是' },
    // 海象報告
    { id: 'q-s-dad', topic: 'seareport', text: '小滿聽海象報告，是為了她爸爸嗎？', reply: '是', unlocks: ['dad'] },
    // 訊號
    { id: 'q-sig-strong', topic: 'signal', text: '電台的訊號比一般的強嗎？', reply: '是也不是', say: '比我們「該有的」強。這件事，你先別問。' },
    // 遠洋
    { id: 'q-far-hear', topic: 'farsea', text: '小滿的爸爸在船上聽得到這個節目嗎？', reply: '不是', say: '我們的訊號，到不了那麼遠。' },
    // 電話、時間
    { id: 'q-p-lin', topic: 'phone', text: '林太太是第一次打電話來嗎？', reply: '是' },
    { id: 'q-two', topic: 'two', text: '兩點這個時間很重要嗎？', reply: '是', say: '兩點是海象報告的時間。', unlocks: ['seareport'] },
  ],
  board: [
    { id: 's1', text: '監聽器裡的男人，是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'zhong' }] },
    { id: 's2', text: '林家離山上很近，監聽器收到了{b2}。', blanks: [{ id: 'b2', category: '物品', answer: 'signal' }] },
    {
      id: 's3',
      text: '小滿每天兩點都醒著，偷聽{b3}，因為{b4}在海上。',
      blanks: [
        { id: 'b3', category: '事情', answer: 'seareport' },
        { id: 'b4', category: '人物', answer: 'dad' },
      ],
    },
    { id: 's4', text: '今晚會叫她的名字，是因為她{b5}。', blanks: [{ id: 'b5', category: '事情', answer: 'request' }] },
  ],
  reveal: [
    { who: 老鍾, text: '林家住在山腰，離電台的發射天線只有幾百公尺。' },
    { who: 老鍾, text: '我們的訊號……比一般的強。強到她家的嬰兒監聽器都收得到。' },
    { who: 老鍾, text: '每天兩點，我替海上的船報海象。三十年都是我。所以她聽到的那個男人，是我。' },
    { who: 老鍾, text: '小滿早就發現了。她爸爸跑遠洋，她每天兩點都醒著，聽我說今天的浪有多高。' },
    { who: 老鍾, text: '昨天晚上，她偷偷打電話進來，是你接的。她說：「可以叫我的名字嗎？這樣我就知道你也知道我在聽。」' },
    { who: 老鍾, text: '你把紙條遞給我。我今天就叫了。' },
    { text: '他沉默了一下。' },
    { who: 老鍾, text: '她爸爸的船，收不到我們。' },
  ],
};

export const night2: Night = {
  n: 2,
  title: '第二夜',
  ambience: 'static',
  intro: [
    { text: '第二夜。你比老鍾早到，把夜鷺的筆記從頭翻到尾。' },
    { text: '最後一頁只寫了一行字：「三點零三分，記得說——」' },
    { text: '後面被撕掉了。撕得很整齊，像是用尺比著撕的。' },
    { who: 老鍾, text: '別翻了。開麥吧。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-xiaoman',
        prompt: '明天兩點的海象報告，你想：',
        options: [
          {
            id: 'name',
            text: '請老鍾再叫一次小滿的名字，再加一句：「爸爸那片海，今天也很平靜。」',
            flag: 'calledXiaoman',
            reply: [
              { who: 老鍾, text: '她爸爸那片海，我又看不到。' },
              { who: 你, text: '她看不到就好。' },
              { text: '老鍾看了你很久，然後笑了。這是你第一次看到他笑。' },
            ],
          },
          {
            id: 'plain',
            text: '照平常報就好，別再嚇到林太太。',
            reply: [{ who: 老鍾, text: '也對。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '三點零三分，熱線又響了。還是只有浪的聲音。' },
        { text: '這一次你聽得比較仔細。浪聲後面，有一個很規律的聲音：喀、喀、喀。像是什麼很重的東西，在慢慢地轉。' },
        { text: '三點十一分，電話掛了。' },
      ],
    },
  ],
  bigClues: [
    '電台的訊號比「該有的」強。老鍾說：「這件事，你先別問。」',
    '夜鷺筆記的最後一頁：「三點零三分，記得說——」後面被撕掉了。',
    '三點零三分的電話裡，浪聲後面有喀、喀的聲音，像很重的東西在慢慢地轉。',
  ],
  bigUnlocks: ['signal', 'yelu', 'note', 'clockwork'],
};
