import type { Night, Soup } from '../../engine/types';

const 溫伯 = '溫伯';
const 葉姊 = '葉姊';
const 以安 = '陳以安';
const 書恆 = '卓書恆';
const 秋姨 = '秋姨';
const 你 = '你';

const soup: Soup = {
  id: 'claimed',
  title: '已領取',
  kind: 'small',
  surface: [
    { text: '停駛前要清倉。你和溫伯把舊倉的東西一箱一箱搬出來，對著登記簿一筆一筆勾。' },
    { text: '有一筆是十幾年前的：「童帽一頂。拾獲：支線車廂。狀態：已領取。」經手人簽名是「葉美華」。' },
    { text: '可是那頂童帽，就在箱子裡。紅色的毛線帽，小得放不進大人的手掌。' },
    { text: '收車後的葉姊剛好經過。你把帽子拿給她看。' },
    { text: '她接過帽子，看了很久，然後把它放回箱子裡。' },
    { who: 葉姊, text: '放這裡就好。它已經被領走了。' },
    { text: '她跟溫伯點個頭，就走了。' },
    { who: 溫伯, text: '想知道？問吧。' },
  ],
  start: ['ye', 'you', 'qin', 'hat', 'ledger', 'storeroom', 'xikou', 'office', 'clearing', 'claimed', 'tonight'],
  keywords: [
    { id: 'ye', label: '葉姊', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'qin', label: '阿琴', category: '人物' },
    { id: 'child', label: '走失的孩子', category: '人物' },
    { id: 'yian', label: '陳以安', category: '人物' },

    { id: 'hat', label: '紅色童帽', category: '物品' },
    { id: 'ledger', label: '舊登記簿', category: '物品' },
    { id: 'an', label: '繡著「安」字的帽沿', category: '物品' },

    { id: 'storeroom', label: '舊倉', category: '地點' },
    { id: 'xikou', label: '溪口', category: '地點' },
    { id: 'office', label: '招領處', category: '地點' },
    { id: 'carriage', label: '支線車廂', category: '地點' },

    { id: 'clearing', label: '清倉', category: '事情' },
    { id: 'claimed', label: '已領取', category: '事情' },
    { id: 'tookhome', label: '送他回家', category: '事情' },
    { id: 'forgot', label: '不記得了', category: '事情' },

    { id: 'tonight', label: '今晚', category: '時間' },
    { id: 'fifteen', label: '十五年前', category: '時間' },
    { id: 'morning', label: '每天早上', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-hat',
      art: 'hat',
      name: '紅色童帽',
      description: '一頂紅色毛線帽，頂上有一顆起毛的小球。',
      hotspots: [
        { id: 'hs-an', at: [71, 78], name: '帽沿內側', label: '帽沿內側用白線繡了一個「安」字。', unlocks: ['an'] },
        { id: 'hs-ball', at: [50, 20], name: '毛球', label: '毛球被縫回去過，針腳很粗，不像是做帽子的人縫的。', unlocks: [] },
      ],
    },
    {
      id: 'ev-ledger',
      art: 'ledger',
      name: '登記簿的那一頁',
      description: '「童帽一頂。狀態：已領取。經手人：葉美華。」',
      hotspots: [
        { id: 'hs-where', at: [46, 49], name: '拾獲地點', label: '拾獲地點：支線車廂，末節。', unlocks: ['carriage'] },
        { id: 'hs-date', at: [21, 46], name: '日期', label: '日期被水漬蓋掉了，只看得出是秋天。', unlocks: [] },
      ],
    },
  ],
  questions: [
    // 童帽
    { id: 'q-yehat', topic: 'hat', text: '帽子是葉姊的嗎？', reply: '不是' },
    { id: 'q-yekid', topic: 'hat', text: '帽子是葉姊小孩的嗎？', reply: '不是', say: '她沒有小孩。' },
    { id: 'q-owneralive', topic: 'hat', text: '帽子的主人還活著嗎？', reply: '是' },
    { id: 'q-ownerkid', topic: 'hat', text: '帽子的主人是小孩嗎？', reply: '是也不是', say: '當年是。', unlocks: ['child'] },
    // 繡字、登記簿
    { id: 'q-an', topic: 'an', text: '「安」是名字裡的字嗎？', reply: '是', say: '名字的最後一個字。' },
    { id: 'q-ledgerwrong', topic: 'ledger', text: '登記簿寫錯了嗎？', reply: '是也不是', say: '她寫的是她認為對的事。' },
    // 已領取
    { id: 'q-mistake', topic: 'claimed', text: '「已領取」是葉姊寫錯了嗎？', reply: '不是' },
    { id: 'q-something', topic: 'claimed', text: '那時候有人領走了什麼嗎？', reply: '是', say: '只是被領走的不是帽子。', unlocks: ['child'] },
    // 走失的孩子
    { id: 'q-ontrain', topic: 'child', text: '孩子是在火車上走丟的嗎？', reply: '是', say: '末節車廂，哭到睡著了。' },
    { id: 'q-yetook', topic: 'child', text: '是葉姊送他回家的嗎？', reply: '是', say: '她下了班，抱著他走了半個鎮。', unlocks: ['tookhome'] },
    { id: 'q-longago', topic: 'child', text: '那是很久以前的事嗎？', reply: '是', say: '十五年前。', unlocks: ['fifteen'] },
    { id: 'q-nearby', topic: 'child', text: '那個孩子現在還住在附近嗎？', reply: '是', say: '每天都搭這條線。', unlocks: ['morning'] },
    { id: 'q-seen', topic: 'child', text: '我今晚見過那個孩子嗎？', reply: '是', requires: ['morning'], say: '剛才來拿月票的那個。', unlocks: ['yian'] },
    // 陳以安
    { id: 'q-yianknows', topic: 'yian', text: '以安知道這件事嗎？', reply: '不是', say: '他那時候才三歲。', unlocks: ['forgot'] },
    { id: 'q-yewants', topic: 'yian', text: '葉姊想讓以安知道嗎？', reply: '是也不是', say: '她覺得，記得的人有一個就夠了。' },
    // 葉姊
    { id: 'q-yelie', topic: 'ye', text: '葉姊在說謊嗎？', reply: '不是' },
    { id: 'q-yevisit', topic: 'ye', text: '葉姊常常來看這頂帽子嗎？', reply: '是', say: '每年清倉，她都來確認它還在。' },
    // 其他
    { id: 'q-qin', topic: 'qin', text: '阿琴跟這件事有關嗎？', reply: '不是' },
    { id: 'q-you', topic: 'you', text: '這件事跟我有關嗎？', reply: '不是' },
    { id: 'q-xikou', topic: 'xikou', text: '孩子的家在溪口嗎？', reply: '不是', say: '就在霧埔，車站後面。' },
    { id: 'q-clearing', topic: 'clearing', text: '清倉跟這件事有關嗎？', reply: '是也不是', say: '停駛以後，舊倉的東西都要送去總局。' },
    { id: 'q-carriage', topic: 'carriage', text: '那是葉姊開的車嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '登記簿上被領走的，其實是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'child' }] },
    {
      id: 's2',
      text: '{b2}，葉姊在{b3}找到他，親手送他回家。',
      blanks: [
        { id: 'b2', category: '時間', answer: 'fifteen' },
        { id: 'b3', category: '地點', answer: 'carriage' },
      ],
    },
    { id: 's3', text: '那個孩子，就是{b4}。', blanks: [{ id: 'b4', category: '人物', answer: 'yian' }] },
    { id: 's4', text: '他{b5}，所以葉姊從來沒提過。', blanks: [{ id: 'b5', category: '事情', answer: 'forgot' }] },
  ],
  reveal: [
    { who: 溫伯, text: '十五年前的秋天，末節車廂裡有個三歲的孩子，哭到睡著了，身邊沒有大人。' },
    { who: 溫伯, text: '美華下了班，抱著他走了半個鎮，才找到他家。他媽媽在車站另一頭找瘋了。' },
    { who: 溫伯, text: '帽子掉在車上，第二天才撿到。她登記的時候寫「已領取」，因為她覺得，該領的已經領回去了。' },
    { who: 溫伯, text: '那孩子姓陳，叫以安。現在每天早上搭她的車去上學，每天晚上搭她的車回來。' },
    { who: 溫伯, text: '他不記得了。她每天都記得。' },
  ],
};

export const night4: Night = {
  n: 4,
  title: '第四晚',
  intro: [
    { text: '一個穿高中制服的男生衝進來，書包還沒拉好。' },
    { who: 以安, text: '請問有沒有撿到月票？我叫陳以安，三年二班……' },
    { text: '葉姊剛好拿著車廂裡撿到的東西進來，把一張月票放在他手上。' },
    { who: 葉姊, text: '又是你。這個月第三次了。' },
    { who: 以安, text: '謝謝葉姊！' },
    { text: '他跑出去趕車。葉姊看著他的背影，搖搖頭，嘴角卻是彎的。' },
    { who: 溫伯, text: '今晚要清倉。舊倉幾十年的東西，都要對著登記簿點一遍。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-hat',
        prompt: '童帽要怎麼處理？停駛以後，舊倉的東西都會送去總局。',
        options: [
          {
            id: 'to-ye',
            text: '追上葉姊，把帽子交給她保管。',
            flag: 'hatToYe',
            reply: [
              { text: '你在月台盡頭追上葉姊。她看著帽子，沒有馬上接。' },
              { who: 你, text: '總局的倉庫，沒有人會每年去看它。' },
              { text: '她把帽子收進制服口袋，拍了兩下。' },
            ],
          },
          {
            id: 'archive',
            text: '照規矩，跟其他東西一起裝箱。',
            reply: [{ text: '你把帽子放回箱子最上面，在清單上寫好「童帽一頂」。箱子封上之前，你又看了它一眼。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '清到最裡面一排的時候，登記簿上有一筆字跡特別工整：' },
        { text: '「綠色鐵盒一只。寄放人：卓。領取人：何秋堂。存放：乙-7。狀態：」' },
        { text: '狀態那一格是空的。' },
        { text: '你回頭找溫伯。他站在舊倉門口，背對著你。' },
        { who: 溫伯, text: '……今天先清到這裡吧。' },
        { text: '十點多，那個借過五把傘的男人又來了。這次他沒帶相機。' },
        { who: 書恆, text: '我叫卓書恆。上次的照片，我父親看了。他看了很久。' },
        { who: 書恆, text: '他要我再來問一件事：招領處裡，有沒有一只綠色的鐵盒？' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-tell',
        prompt: '你要怎麼回答書恆？',
        options: [
          {
            id: 'tell',
            text: '「每天晚上十一點，有一位老太太會來問同一只鐵盒。」',
            flag: 'toldShuheng',
            reply: [
              { text: '書恆愣住了。' },
              { who: 書恆, text: '我父親說過一個名字。秋棠。他說的時候，以為我沒在聽。' },
              { who: 書恆, text: '……禮拜天，我搭末班車回溪口。在那之前，我會再來。' },
            ],
          },
          {
            id: 'wait',
            text: '「我查查看，有消息再告訴你。」',
            reply: [
              { who: 書恆, text: '好。我禮拜天搭末班車回溪口。' },
              { text: '他留下一個電話號碼，寫在探病證的背面。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '23:00。秋姨推門進來。' },
        { who: 秋姨, text: '今天有嗎？' },
        { text: '你想起登記簿上那個名字。' },
        { who: 你, text: '秋姨，您的名字……是哪一個「棠」？' },
        { who: 秋姨, text: '海棠的棠。我父親說，我是秋天開的花。' },
        { text: '她看著你，好像在等你說下一句話。你說不出來。' },
        { who: 你, text: '……還沒到。' },
      ],
    },
  ],
  bigClues: [
    '登記簿：「綠色鐵盒一只。寄放人：卓。領取人：何秋堂。存放：乙-7。」狀態那一格是空的。',
    '秋姨的「棠」是海棠的棠。登記簿上寫的是「堂」。',
    '卓書恆的父親卓遠，要他來問招領處有沒有一只綠色鐵盒。',
  ],
  bigUnlocks: ['ledger', 'heqiutang', 'shuheng'],
};
