import type { Night, Soup } from '../../engine/types';

const 廖伯 = '廖伯';
const 你 = '你';

/**
 * 第四夜：四十年前的值夜日誌。「二十三人，全到」，接著三天空白，第四天「找到」。
 * 小湯不能說謊，所以這一碗的湯底就是廖伯的坦白；之後大湯裡的謊話會被更正。
 */
const soup: Soup = {
  id: 'logbook',
  title: '二十三人，全到',
  kind: 'small',
  surface: [
    { text: '值夜日誌，四十年前的六月。畢業典禮那一天的晚上，只寫了三行：' },
    { text: '「颱風轉向，營火取消，畢業班留在禮堂過夜。點名：二十三人，全到。」' },
    { text: '「二十二點，禮堂下面的防空洞進水，上鎖。」' },
    { text: '接下來三天，是空白的。第四天，只有兩個字：「找到。」' },
    { text: '你拿著日誌去找廖伯。他在禮堂的舞台下面，對著一扇用木板封起來的鐵門坐著。' },
    { who: 廖伯, text: '……問吧。這一碗，我不騙你。' },
  ],
  start: ['liao', 'logbook', 'key', 'hall', 'shelter', 'allpresent', 'locked', 'blank', 'found', 'typhoon', 'tenpm'],
  keywords: [
    { id: 'liao', label: '廖伯', category: '人物' },
    { id: 'missingone', label: '不在的那一個', category: '人物' },
    { id: 'ashu', label: '阿樹', category: '人物' },
    { id: 'lin', label: '林老師', category: '人物' },
    { id: 'parents', label: '阿樹的爸媽', category: '人物' },

    { id: 'logbook', label: '值夜日誌', category: '物品' },
    { id: 'roster', label: '名冊', category: '物品' },
    { id: 'key', label: '防空洞的鑰匙', category: '物品' },

    { id: 'hall', label: '禮堂', category: '地點' },
    { id: 'shelter', label: '防空洞', category: '地點' },
    { id: 'camp', label: '山上的工寮', category: '地點' },

    { id: 'allpresent', label: '全到', category: '事情' },
    { id: 'locked', label: '上鎖', category: '事情' },
    { id: 'blank', label: '空白的三天', category: '事情' },
    { id: 'found', label: '找到', category: '事情' },
    { id: 'typhoon', label: '颱風', category: '事情' },
    { id: 'sleptthere', label: '每晚都睡在那裡', category: '事情' },

    { id: 'tenpm', label: '二十二點', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-logbook',
      art: 'logbook',
      name: '值夜日誌',
      description: '一本藍色封皮的硬殼簿子。那一頁的紙特別皺，像是濕過又乾掉。',
      hotspots: [
        { id: 'hs-count', at: [62, 34], name: '「二十三人」', label: '「二十三」這三個字寫得很用力。旁邊用鉛筆打了一個小小的勾。', unlocks: [] },
        { id: 'hs-stain', at: [72, 58], name: '水漬', label: '空白的那三頁，有一圈一圈的水漬。不是雨水。', unlocks: [] },
        { id: 'hs-found', at: [46, 78], name: '「找到」', label: '「找到」兩個字很小，筆畫是抖的。下面還有一行被劃掉的字，看得出一個「樹」。', unlocks: [] },
      ],
    },
  ],
  questions: [
    // 全到
    { id: 'q-ap-true', topic: 'allpresent', text: '「全到」是真的嗎？', reply: '是也不是', say: '照名冊，是真的。', unlocks: ['roster'] },
    { id: 'q-ap-miss', topic: 'allpresent', text: '那天晚上，其實有人不在禮堂嗎？', reply: '是', unlocks: ['missingone'] },
    // 名冊
    { id: 'q-r-list', topic: 'roster', text: '點名是照著名冊點的嗎？', reply: '是' },
    // 不在的那一個
    { id: 'q-mo-roster', topic: 'missingone', text: '不在的那一個，名冊上有他的名字嗎？', reply: '不是', unlocks: ['roster'] },
    { id: 'q-mo-24', topic: 'missingone', text: '他就是黑板上第二十四行的那個孩子嗎？', reply: '是', say: '阿樹。', unlocks: ['ashu'] },
    // 阿樹
    { id: 'q-a-registry', topic: 'ashu', text: '阿樹不在名冊上，是因為學校不能收他嗎？', reply: '是', say: '工寮的孩子，沒有戶口。林老師讓他坐在最後一排。', unlocks: ['lin'] },
    { id: 'q-a-nights', topic: 'ashu', text: '阿樹常常晚上待在學校嗎？', reply: '是', say: '他每天晚上都睡在防空洞。那裡最乾。', unlocks: ['sleptthere'] },
    { id: 'q-a-parents', topic: 'ashu', text: '阿樹的爸媽那天晚上在山上嗎？', reply: '是', say: '在工寮做夜工。他們以為他在學校，最安全。', unlocks: ['parents', 'camp'] },
    { id: 'q-a-ceremony', topic: 'ashu', text: '阿樹那天有參加畢業典禮嗎？', reply: '是', say: '站在最後一排，最邊邊。' },
    // 防空洞
    { id: 'q-s-open', topic: 'shelter', text: '防空洞那時候平常是開著的嗎？', reply: '是' },
    { id: 'q-s-knew', topic: 'shelter', text: '有人知道阿樹會睡在防空洞嗎？', reply: '是也不是', say: '林老師知道。那天晚上，她不在學校。', requires: ['ashu'], unlocks: ['lin'] },
    // 上鎖
    { id: 'q-l-liao', topic: 'locked', text: '鎖門的是廖伯嗎？', reply: '是' },
    { id: 'q-l-look', topic: 'locked', text: '鎖門之前，有往裡面看嗎？', reply: '不是', say: '水進來了。我只想著把門關起來。' },
    // 空白的三天、找到
    { id: 'q-b-search', topic: 'blank', text: '那三天，有人在找阿樹嗎？', reply: '是也不是', say: '他爸媽下山找了三天。學校沒有人找。點名是全到的。' },
    { id: 'q-f-alive', topic: 'found', text: '找到的時候，阿樹還活著嗎？', reply: '不是' },
    { id: 'q-f-where', topic: 'found', text: '是在防空洞裡找到的嗎？', reply: '是' },
    // 其他
    { id: 'q-t-sudden', topic: 'typhoon', text: '颱風是突然轉向的嗎？', reply: '是' },
    { id: 'q-k-still', topic: 'key', text: '那把鑰匙還在廖伯身上嗎？', reply: '是' },
    { id: 'q-lb-his', topic: 'logbook', text: '日誌是廖伯寫的嗎？', reply: '是' },
    { id: 'q-h-all', topic: 'hall', text: '那天晚上，畢業班全都在禮堂嗎？', reply: '是也不是', say: '名冊上的，都在。' },
    { id: 'q-ten', topic: 'tenpm', text: '二十二點，水已經很高了嗎？', reply: '不重要' },
    { id: 'q-lin-where', topic: 'lin', text: '林老師那天晚上下山了嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '那天晚上點名，是照{b1}點的。', blanks: [{ id: 'b1', category: '物品', answer: 'roster' }] },
    { id: 's2', text: '名冊上沒有{b2}，所以沒有人發現他不在禮堂。', blanks: [{ id: 'b2', category: '人物', answer: 'ashu' }] },
    { id: 's3', text: '他{b3}。他的爸媽在{b4}，以為他在學校最安全。', blanks: [{ id: 'b3', category: '事情', answer: 'sleptthere' }, { id: 'b4', category: '地點', answer: 'camp' }] },
    { id: 's4', text: '防空洞進水，{b5}把門鎖上了，沒有往裡面看。', blanks: [{ id: 'b5', category: '人物', answer: 'liao' }] },
  ],
  reveal: [
    { who: 廖伯, text: '阿樹是山上工寮的孩子，沒有戶口，學校收不了他。林老師讓他坐在教室最後一排，坐了六年。名冊上，從來沒有他。' },
    { who: 廖伯, text: '他爸媽在工寮做夜工。他每天晚上都睡在防空洞，那裡最乾。這件事，只有林老師知道。' },
    { who: 廖伯, text: '畢業那天晚上，颱風轉向，全班留在禮堂過夜。我照名冊點名：二十三人，全到。' },
    { who: 廖伯, text: '十點，防空洞開始進水。我拿著鑰匙過去，把鐵門鎖上了。' },
    { who: 廖伯, text: '我沒有往裡面看。' },
    { who: 廖伯, text: '他爸媽找了三天。學校沒有人找，因為點名是全到的。' },
    { text: '廖伯把手放在那扇封起來的鐵門上。' },
    { who: 廖伯, text: '第四天，我把門打開。' },
  ],
};

export const night4: Night = {
  n: 4,
  title: '第四夜',
  ambience: 'school',
  intro: [
    { text: '第四夜。你把值夜日誌翻到四十年前的六月。' },
    { text: '那幾頁的紙，摸起來比別頁硬，像是濕過又乾掉。' },
    { who: 你, text: '（廖伯今天晚上，一直沒有出現在值夜室。）' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { who: 廖伯, text: '這個禮拜，你問我的事，有幾件我騙了你。' },
        { who: 廖伯, text: '那屆不是二十三個。是二十四個。' },
        { who: 廖伯, text: '照相那天，校長不准阿樹進照片。林老師就讓他站在最後一排最邊邊，用手電筒對著他的臉照。照相的人以為是反光，沒有叫他走開。' },
        { who: 廖伯, text: '那捲點名的帶子，林老師點完二十三號，又小聲唸了一個名字。後面有一聲「有」。' },
        { who: 廖伯, text: '四十年，我每天晚上都要聽到那一聲，才敢去鎖門。' },
        { who: 你, text: '林老師呢？' },
        { who: 廖伯, text: '那年冬天就調走了。去年過世了。' },
        { who: 廖伯, text: '明天是最後一次典禮。點完名，學校就沒有了。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-final',
        prompt: '禮拜五的廢校典禮，最後一次點名，你想：',
        options: [
          {
            id: 'liao',
            text: '「廖伯，最後一個名字，你來唸。」',
            flag: 'liaoReads',
            reply: [{ who: 廖伯, text: '……我唸得出來嗎。' }, { who: 你, text: '你聽了四十年了。' }],
          },
          {
            id: 'add',
            text: '「我把阿樹的名字，寫進今天的名冊。」',
            flag: 'addAshu',
            reply: [{ text: '廖伯看了你很久。' }, { who: 廖伯, text: '……寫在最後一行。' }],
          },
          {
            id: 'roster',
            text: '「照名冊點就好。過去的事，讓它過去。」',
            flag: 'rosterOnly',
            reply: [{ who: 廖伯, text: '也是。' }, { text: '他把日誌收進櫃子，上了鎖。' }],
          },
        ],
      },
    },
  ],
  bigClues: [
    '值夜日誌：畢業那天晚上，「點名：二十三人，全到」。二十二點，防空洞進水，上鎖。三天空白，第四天「找到」。',
    '阿樹是山上工寮的孩子，沒有戶口，每天晚上睡在防空洞。名冊上沒有他。',
    '廖伯坦白：那屆是二十四個。照相時，林老師用手電筒照著阿樹的臉，讓他留在照片裡。',
    '廖伯說：這個禮拜，有幾件事他騙了你。',
  ],
  bigUnlocks: ['confession', 'logbook', 'shelter', 'typhoonnight', 'camp', 'key'],
};
