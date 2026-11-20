import type { Night, Soup } from '../../engine/types';

const 季伯 = '季伯';
const 魏先生 = '魏先生';
const 你 = '你';

/** 第三夜：深夜的調查員。名片是假的；他是 1203 前房客的前夫，拍信箱是要確認她還在不在這棟樓。 */
const soup: Soup = {
  id: 'investigator',
  title: '深夜的調查員',
  kind: 'small',
  surface: [
    { text: '晚上十一點，一個穿西裝的男人走進大廳，遞上一張名片：「宏信保險　理賠調查　魏」。' },
    { who: 魏先生, text: '我在處理一件理賠案，跟 1203 有關。麻煩讓我看一下十二樓走廊的錄影。' },
    { who: 你, text: '要主委同意才行。' },
    { who: 魏先生, text: '那我明天再來。' },
    { text: '他走了以後，大廳那一格拍到：他在信箱牆前面站了很久，用手機一格一格拍下信箱上的名字。' },
    { text: '最後他停在「1203」那一格前面。那一格是空的，沒有名字。他用手指，輕輕敲了兩下。' },
    { who: 季伯, text: '他不是第一次來了。' },
  ],
  start: ['wei', 'you', 'card', 'mailbox', 'footage', 'lobby', 'unit1203', 'insurance', 'photograph', 'eleven'],
  keywords: [
    { id: 'wei', label: '姓魏的男人', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'tenant', label: '1203 以前的房客', category: '人物' },
    { id: 'exwife', label: '他的前妻', category: '人物' },
    { id: 'ru', label: '「如」', category: '人物' },

    { id: 'card', label: '名片', category: '物品' },
    { id: 'mailbox', label: '信箱', category: '物品' },
    { id: 'footage', label: '十二樓的錄影', category: '物品' },

    { id: 'lobby', label: '大廳', category: '地點' },
    { id: 'unit1203', label: '1203', category: '地點' },

    { id: 'insurance', label: '理賠調查', category: '事情' },
    { id: 'photograph', label: '拍信箱', category: '事情' },
    { id: 'fake', label: '假的', category: '事情' },
    { id: 'ringmark', label: '戒指的痕跡', category: '事情' },
    { id: 'stillhere', label: '她還在不在', category: '事情' },

    { id: 'eleven', label: '十一點', category: '時間' },
    { id: 'eightyears', label: '八年前', category: '時間' },
    { id: 'lastmonth', label: '上個月', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-card',
      art: 'fakecard',
      name: '調查員的名片',
      description: '白色的名片，紙很厚，字是燙金的。看起來很貴。',
      hotspots: [
        { id: 'hs-phone', at: [95, 64], name: '公司電話', label: '你照著名片上的電話打過去：「您撥的號碼是空號。」', unlocks: ['fake'] },
        { id: 'hs-back', at: [10, 72], name: '名片背面', label: '背面用原子筆寫了一個字，又用力劃掉：「如」。', unlocks: ['ru'] },
        { id: 'hs-hand', at: [88, 20], name: '遞名片的手', label: '你想起他遞名片的左手：無名指上有一圈很淡的白痕。戒指拿掉沒多久。', unlocks: ['ringmark'] },
      ],
    },
  ],
  questions: [
    // 名片、假的
    { id: 'q-c-real', topic: 'card', text: '名片上的公司是真的嗎？', reply: '不是', unlocks: ['fake'] },
    { id: 'q-f-name', topic: 'fake', text: '他姓魏是真的嗎？', reply: '是', say: '只有姓是真的。' },
    // 理賠調查
    { id: 'q-i-real', topic: 'insurance', text: '真的有一件理賠案嗎？', reply: '不是' },
    // 1203
    { id: 'q-u-empty', topic: 'unit1203', text: '1203 現在有登記住戶嗎？', reply: '不是' },
    { id: 'q-u-before', topic: 'unit1203', text: '他要找的是 1203 以前的房客嗎？', reply: '是', unlocks: ['tenant'] },
    // 以前的房客
    { id: 'q-t-woman', topic: 'tenant', text: '以前的房客是女的嗎？', reply: '是' },
    { id: 'q-t-left', topic: 'tenant', text: '她是很多年前搬走的嗎？', reply: '是也不是', say: '八年前，登記遷出了。', unlocks: ['eightyears'] },
    { id: 'q-t-know', topic: 'tenant', text: '魏先生認識她嗎？', reply: '是', say: '很熟。', unlocks: ['exwife'] },
    // 如、戒指
    { id: 'q-ru-her', topic: 'ru', text: '「如」是 1203 以前那個房客的名字嗎？', reply: '是', unlocks: ['tenant'] },
    { id: 'q-rm-married', topic: 'ringmark', text: '他以前結過婚嗎？', reply: '是', unlocks: ['exwife'] },
    // 前妻
    { id: 'q-ex-1203', topic: 'exwife', text: '他的前妻，就是 1203 以前的房客嗎？', reply: '是' },
    { id: 'q-ex-want', topic: 'exwife', text: '她想被他找到嗎？', reply: '不是' },
    // 拍信箱
    { id: 'q-p-why', topic: 'photograph', text: '他拍信箱，是想確認她還在不在這棟樓嗎？', reply: '是', unlocks: ['stillhere'] },
    { id: 'q-p-names', topic: 'photograph', text: '信箱上有她的名字嗎？', reply: '不是' },
    // 錄影
    { id: 'q-ft-why', topic: 'footage', text: '他要十二樓的錄影，跟那個房客有關嗎？', reply: '是' },
    { id: 'q-ft-have', topic: 'footage', text: '十二樓的錄影，警衛室裡有存嗎？', reply: '是也不是', say: '……這個，等你自己發現。' },
    // 魏先生
    { id: 'q-w-police', topic: 'wei', text: '魏先生是警察嗎？', reply: '不是' },
    { id: 'q-w-before', topic: 'wei', text: '他以前就來過嗎？', reply: '是', say: '上個月，換了一套說法。', unlocks: ['lastmonth'] },
    { id: 'q-w-danger', topic: 'wei', text: '魏先生很危險嗎？', reply: '不重要', say: '重要的是，她怕他。' },
    // 其他
    { id: 'q-lobby', topic: 'lobby', text: '他在大廳待了很久嗎？', reply: '不重要' },
    { id: 'q-eleven', topic: 'eleven', text: '十一點這個時間很重要嗎？', reply: '是', say: '那時候主委已經睡了。' },
    { id: 'q-mailbox', topic: 'mailbox', text: '1203 的信箱有人在用嗎？', reply: '不是', say: '一直是空的。' },
    { id: 'q-month', topic: 'lastmonth', text: '上個月來的時候，也是說要調錄影嗎？', reply: '是', say: '那時候還是季伯值班。' },
  ],
  board: [
    { id: 's1', time: '23:00', text: '他的名片是{b1}。', blanks: [{ id: 'b1', category: '事情', answer: 'fake' }] },
    { id: 's2', time: '23:05', text: '他要找的，是{b2}。', blanks: [{ id: 'b2', category: '人物', answer: 'tenant' }] },
    { id: 's3', time: '23:05', text: '她是{b3}，{b4}就登記搬走了。', blanks: [{ id: 'b3', category: '人物', answer: 'exwife' }, { id: 'b4', category: '時間', answer: 'eightyears' }] },
    { id: 's4', time: '23:10', text: '他拍信箱，是想確認{b5}。', blanks: [{ id: 'b5', category: '事情', answer: 'stillhere' }] },
  ],
  reveal: [
    { who: 季伯, text: '名片上的公司是空號。他只有姓是真的。' },
    { who: 季伯, text: '他要找的，是 1203 以前的房客。她叫簡如。八年前，登記遷出了。' },
    { who: 季伯, text: '她是他的前妻。她不想被他找到。' },
    { who: 季伯, text: '上個月，他說自己是她的表哥。這個月，換成保險公司。' },
    { who: 季伯, text: '他拍信箱，是想確認她還在不在這棟樓。' },
    { text: '季伯看著第十六格。十二樓的走廊，燈是暗的。' },
    { who: 季伯, text: '他明天，還會再來。' },
  ],
};

export const night3: Night = {
  n: 3,
  title: '第三夜',
  ambience: 'hum',
  intro: [
    { text: '第三夜。你比平常早到，季伯已經坐在警衛室裡了。' },
    { text: '他面前放著一杯茶，一直沒喝。眼睛看著大門口。' },
    { who: 你, text: '在等人嗎？' },
    { who: 季伯, text: '在等一個不該來的人。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-wei',
        prompt: '隔天晚上，魏先生又來了。他把一個信封推過櫃台：「不用主委，你讓我在螢幕上看一眼就好。」',
        options: [
          {
            id: 'refuse',
            text: '把信封推回去：「沒有主委同意，不行。」',
            flag: 'refusedWei',
            reply: [{ who: 魏先生, text: '……你跟上一個管理員，一模一樣。' }, { text: '他把信封收回去，走了。' }],
          },
          {
            id: 'peek',
            text: '收下信封，讓他看一眼十二樓那一格。',
            flag: 'showedWei',
            reply: [
              { text: '畫面上，十二樓的走廊是暗的，什麼都沒有。' },
              { text: '魏先生盯著那一格，看了很久。然後他笑了一下。' },
              { who: 魏先生, text: '燈的開關，是新的。' },
            ],
          },
        ],
      },
    },
    {
      // 反過來問你：魏先生隔著對講機盤問。他已經知道的事說謊會被識破；他不知道的事，一個字都別給。
      kind: 'reverse',
      reverse: {
        id: 'r-intercom',
        asker: 魏先生,
        heading: '凌晨三點的對講機',
        intro: [
          { text: '凌晨兩點五十分。大門的對講機響了。' },
          { text: '螢幕上是一頂壓得很低的帽子。是魏先生。' },
          { who: 魏先生, text: '我不進去。問你幾件事，你只要說是、不是。' },
          { who: 季伯, text: '（低聲）他知道的，比你想的多。他知道的事你騙他，他會起疑；他不知道的事，一個字都別給。' },
        ],
        questions: [
          {
            text: '每天凌晨三點，十二樓的走廊燈會亮，對不對？',
            options: ['是', '不是', '不重要'],
            on: {
              是: { reply: [{ who: 魏先生, text: '我在對面的騎樓看了三個晚上。謝謝你沒騙我。' }] },
              不是: { flag: 'weiSuspects', reply: [{ who: 魏先生, text: '……我在對面的騎樓，看了三個晚上。' }] },
              不重要: { reply: [{ who: 魏先生, text: '對你不重要。' }] },
            },
          },
          {
            text: '電梯紀錄裡，有人到過十二樓嗎？',
            options: ['是', '不是', '不重要'],
            on: {
              是: { flag: 'weiSuspects', reply: [{ who: 魏先生, text: '紀錄我看過了。你在說謊。' }] },
              不是: { reply: [{ who: 魏先生, text: '那燈是誰開的？……算了。' }] },
              不重要: { reply: [{ who: 魏先生, text: '你很會當管理員。' }] },
            },
          },
          {
            text: '1203，現在有人住嗎？',
            options: ['是', '不是', '不重要'],
            on: {
              是: { flag: 'slipped', reply: [{ text: '對講機那頭安靜了很久。' }, { who: 魏先生, text: '……謝謝。' }] },
              不是: { reply: [{ who: 魏先生, text: '你們管理員，說的話都一樣。' }] },
              不重要: { reply: [{ who: 魏先生, text: '這是你們大樓的規矩嗎？' }] },
            },
          },
          {
            text: '不搭電梯要上十二樓，就只能走逃生梯，對不對？',
            options: ['是', '不是', '不重要'],
            on: {
              是: { flag: 'slipped', reply: [{ who: 魏先生, text: '逃生梯。……好。' }] },
              不是: { flag: 'weiSuspects', reply: [{ who: 魏先生, text: '每一棟樓都有逃生梯。你騙我做什麼？' }] },
              不重要: { reply: [{ who: 魏先生, text: '……你跟上一個管理員，越來越像了。' }] },
            },
          },
        ],
        outro: [
          { text: '對講機的螢幕暗了。' },
          { text: '季伯一直看著第十六格。十二樓的走廊，燈是暗的。' },
          { who: 季伯, text: '他明天還會再來。' },
        ],
      },
    },
  ],
  bigClues: [
    '自稱保險調查員的魏先生，名片是假的。他是 1203 以前的房客簡如的前夫。',
    '簡如八年前登記搬走了。她不想被他找到。',
    '魏先生要的，是十二樓走廊的錄影。',
  ],
  bigUnlocks: ['wei', 'footage'],
};
