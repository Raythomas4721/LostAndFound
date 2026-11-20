import type { Night, Soup } from '../../engine/types';

const 老鍾 = '老鍾';
const 你 = '你';

/**
 * 第四夜：颱風夜那捲錄音帶，空白了三分鐘。
 * 這一碗老鍾不能說謊（小湯），湯底就是他的坦白；之後大湯裡的謊話會被更正。
 */
const soup: Soup = {
  id: 'tape',
  title: '空白的三分鐘',
  kind: 'small',
  surface: [
    { text: '節目開始前，老鍾要你把檔案室清一清。禮拜天以後，這些都要搬走。' },
    { text: '架子上是三十年來每一夜的錄音帶。一夜一捲，一捲都沒少。' },
    { text: '你找到颱風那一年的那一捲。標籤上的字很工整：「十月七日　颱風夜　全程播出」。' },
    { text: '你把它放進機器。風雨聲、音樂、主持人的聲音——一直到三點整。' },
    { text: '然後，帶子空白了三分鐘。' },
    { text: '三點零六分，聲音回來了。一個喘著氣的年輕男人說：「各位聽眾，我們還在。」' },
    { text: '你拿著帶子走進控制室。老鍾看到標籤，把手按在對講鈕上，很久沒有說話。' },
    { who: 老鍾, text: '……問吧。這一碗，我不說謊。' },
  ],
  start: ['tape', 'youngvoice', 'blank', 'power', 'booth', 'archive', 'three', 'threemin'],
  keywords: [
    { id: 'youngvoice', label: '喘氣的年輕人', category: '人物' },
    { id: 'youngzhong', label: '年輕的老鍾', category: '人物' },
    { id: 'keeper', label: '守燈人', category: '人物' },
    { id: 'listener', label: '一般聽眾', category: '人物' },

    { id: 'tape', label: '錄音帶', category: '物品' },
    { id: 'antenna', label: '天線', category: '物品' },
    { id: 'hotline', label: '燈塔專線', category: '物品' },
    { id: 'longsong', label: '一首很長的歌', category: '物品' },

    { id: 'booth', label: '播音室', category: '地點' },
    { id: 'roof', label: '屋頂', category: '地點' },
    { id: 'archive', label: '檔案室', category: '地點' },

    { id: 'blank', label: '空白', category: '事情' },
    { id: 'power', label: '停電', category: '事情' },
    { id: 'flip', label: '換面', category: '事情' },
    { id: 'left', label: '離開播音室', category: '事情' },
    { id: 'rang', label: '電話響了', category: '事情' },

    { id: 'three', label: '三點整', category: '時間' },
    { id: 'threemin', label: '三分鐘', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-tape',
      art: 'cassette',
      name: '十月七日的錄音帶',
      description: '一捲很舊的卡式錄音帶。盒子邊緣被手指磨得發白，好像常常被拿出來。',
      hotspots: [
        { id: 'hs-label', at: [82, 44], name: '標籤', label: '「全程播出」四個字，被人用筆描過好幾次，描到紙都凹下去了。', unlocks: [] },
        { id: 'hs-side', at: [22, 60], name: 'A 面與 B 面', label: 'A 面錄到三點整就轉完了。B 面一開頭，就是三點零六分。中間有人來不及把帶子翻面。', unlocks: ['flip'] },
        { id: 'hs-case', at: [94, 80], name: '帶盒裡', label: '盒子裡夾著一張值班表，只剩下半張。「十月七日」那一格，只寫了一個名字。', unlocks: [] },
      ],
    },
  ],
  questions: [
    // 檔案室
    { id: 'q-ar-hidden', topic: 'archive', text: '這捲帶子是被藏起來的嗎？', reply: '不是', say: '一直放在它該在的位置。我常常拿出來聽。' },
    // 錄音帶
    { id: 'q-t-broken', topic: 'tape', text: '帶子壞掉了嗎？', reply: '不是' },
    { id: 'q-t-erased', topic: 'tape', text: '那三分鐘是被洗掉的嗎？', reply: '不是', say: '從來就沒有錄到。' },
    // 停電
    { id: 'q-power', topic: 'power', text: '那三分鐘停電了嗎？', reply: '不是', say: '電台沒有停，訊號也沒有斷。' },
    // 空白
    { id: 'q-b-nobody', topic: 'blank', text: '那三分鐘，播音室裡沒有人嗎？', reply: '是', say: '一個人都沒有。', unlocks: ['left'] },
    { id: 'q-b-onair', topic: 'blank', text: '那三分鐘，電台還在播嗎？', reply: '是', say: '播的是一首很長的歌。出去之前放的。', unlocks: ['longsong'] },
    // 很長的歌
    { id: 'q-ls-who', topic: 'longsong', text: '放那首歌的人，就是喘氣的年輕人嗎？', reply: '是', unlocks: ['youngzhong'] },
    // 喘氣的年輕人
    { id: 'q-v-you', topic: 'youngvoice', text: '喘氣的年輕人，是老鍾你嗎？', reply: '是', unlocks: ['youngzhong'] },
    { id: 'q-v-stranger', topic: 'youngvoice', text: '喘氣的年輕人是外人嗎？', reply: '不是' },
    // 年輕的老鍾
    { id: 'q-y-alone', topic: 'youngzhong', text: '那天晚上，電台只有他一個人嗎？', reply: '是', say: '那時候，導播和主持都是我。' },
    { id: 'q-y-sleep', topic: 'youngzhong', text: '他睡著了嗎？', reply: '不是' },
    // 離開播音室
    { id: 'q-l-why', topic: 'left', text: '他離開播音室，是為了電台嗎？', reply: '是', say: '颱風把屋頂上的天線吹歪了，訊號一直斷。', unlocks: ['antenna', 'roof'] },
    { id: 'q-l-roof', topic: 'left', text: '他去了屋頂嗎？', reply: '是', unlocks: ['roof'] },
    { id: 'q-l-flee', topic: 'left', text: '他是害怕，所以逃走了嗎？', reply: '不是' },
    // 屋頂
    { id: 'q-r-fix', topic: 'roof', text: '他在屋頂上修東西嗎？', reply: '是', unlocks: ['antenna'] },
    // 天線
    { id: 'q-an-fixed', topic: 'antenna', text: '天線修好了嗎？', reply: '是', say: '所以三點零六分，他才能跑回來說「我們還在」。' },
    // 換面
    { id: 'q-f-who', topic: 'flip', text: '帶子沒翻面，是因為沒有人在嗎？', reply: '是', unlocks: ['left'] },
    // 三分鐘、三點
    { id: 'q-th-call', topic: 'threemin', text: '那三分鐘裡，有電話打進來嗎？', reply: '是', unlocks: ['rang'] },
    { id: 'q-three', topic: 'three', text: '三點整這個時間很重要嗎？', reply: '不重要', say: '重要的是三點零三分。' },
    // 電話響了
    { id: 'q-r-hotline', topic: 'rang', text: '響的是燈塔專線嗎？', reply: '是', unlocks: ['hotline'] },
    { id: 'q-r-listener', topic: 'rang', text: '響的是一般聽眾的電話嗎？', reply: '不是', unlocks: ['listener'] },
    // 聽眾
    { id: 'q-li-many', topic: 'listener', text: '那天晚上有很多聽眾嗎？', reply: '不重要' },
    // 燈塔專線
    { id: 'q-h-who', topic: 'hotline', text: '打專線來的是守燈人嗎？', reply: '是', say: '他要我們在廣播裡叫外面的船回港。燈塔的燈壞了。', unlocks: ['keeper'] },
    { id: 'q-h-number', topic: 'hotline', text: '燈塔專線有電話號碼嗎？', reply: '不是', say: '專線就是一條線。從燈塔，直接拉到這張桌子。' },
    // 守燈人
    { id: 'q-k-climb', topic: 'keeper', text: '守燈人是因為沒人接，才自己爬上燈塔的嗎？', reply: '是' },
    { id: 'q-k-back', topic: 'keeper', text: '守燈人後來有回來嗎？', reply: '不是' },
  ],
  board: [
    { id: 's1', text: '那天晚上，電台裡只有{b1}一個人。', blanks: [{ id: 'b1', category: '人物', answer: 'youngzhong' }] },
    { id: 's2', text: '颱風吹歪了{b2}，他放了一首很長的歌，跑上{b3}去修。', blanks: [{ id: 'b2', category: '物品', answer: 'antenna' }, { id: 'b3', category: '地點', answer: 'roof' }] },
    { id: 's3', text: '帶子三點整就轉完了，沒有人{b4}，所以空白了三分鐘。', blanks: [{ id: 'b4', category: '事情', answer: 'flip' }] },
    {
      id: 's4',
      text: '那三分鐘裡，{b5}響了。打來的是{b6}。',
      blanks: [
        { id: 'b5', category: '物品', answer: 'hotline' },
        { id: 'b6', category: '人物', answer: 'keeper' },
      ],
    },
  ],
  reveal: [
    { who: 老鍾, text: '那年我二十四歲。那天晚上，電台只有我一個人。' },
    { who: 老鍾, text: '兩點多，颱風把天線吹歪了，訊號一直斷。我放了一首最長的歌，跑上屋頂。' },
    { who: 老鍾, text: '帶子三點整就轉完了。沒有人換面。' },
    { who: 老鍾, text: '三點零三分，燈塔專線響了。是莊進海。他要我們在廣播裡叫外面的船回港，燈塔的燈壞了。' },
    { who: 老鍾, text: '沒有人接。' },
    { who: 老鍾, text: '他自己拿著手電筒爬上燈塔，一下一下照著海。那天晚上的船都回來了。他沒有。' },
    { text: '老鍾把手從對講鈕上拿開，又放回去。' },
    { who: 老鍾, text: '我修好了天線。我們還在。可是那一通，我沒有接到。' },
  ],
};

export const night4: Night = {
  n: 4,
  title: '第四夜',
  ambience: 'static',
  intro: [
    { text: '第四夜。風停了，霧也散了。從播音室的窗子，看得到北角那座燈塔黑黑的影子。' },
    { text: '晚上，你到電台的時候，老鍾已經在了。桌上放著一捲沒有標籤的空白帶。' },
    { who: 老鍾, text: '最後兩夜了。檔案室，幫我清一清吧。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { who: 老鍾, text: '這個禮拜，你問我的事，有幾件我沒說實話。' },
        { who: 老鍾, text: '汐見之聲的執照，十二年前就被收回了。從那天起，我們播出去的每一個字，都是不該存在的。' },
        { who: 老鍾, text: '我把發射機藏在山上，功率調到剛好照得到北角。' },
        { who: 你, text: '為了誰？' },
        { who: 老鍾, text: '為了三點零三分。' },
        { who: 老鍾, text: '莊太太後來中風了，說不出話。可是她每天晚上還是走去燈塔，爬上去照一次海，然後拿起那支專線。' },
        { who: 老鍾, text: '夜鷺知道。夜鷺每次都會說一句話。莊太太聽了，就會掛。' },
        { who: 你, text: '哪一句？' },
        { who: 老鍾, text: '筆記的那一頁，是我撕的。我本來想等最後一夜，自己說。' },
        { text: '他把那捲颱風夜的帶子放回盒子，蓋上。' },
        { who: 老鍾, text: '上個禮拜被查到了。禮拜天，他們要來拆發射機。明天，是最後一次三點零三分。' },
      ],
    },
    {
      kind: 'lines',
      when: { all: ['doorOpened'] },
      lines: [
        { text: '你想起中午阿傑傳來的照片：燈塔門上的鐵鍊拆掉了，阿傑站在門口，比了一個讚。' },
        { text: '燈塔的門，開了。' },
      ],
    },
    {
      kind: 'lines',
      when: { none: ['doorOpened'] },
      lines: [
        { who: 老鍾, text: '燈塔的門……今天下午，我去鄉公所講過了。明天會開。' },
        { text: '他說這句話的時候，看起來很累。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-final',
        prompt: '最後一夜的三點零三分，你想怎麼做？',
        options: [
          {
            id: 'zhong',
            text: '「老鍾，這一通，你自己接。」',
            flag: 'zhongAnswers',
            reply: [
              { who: 老鍾, text: '……三十年了。我的手會抖。' },
              { who: 你, text: '我在旁邊。' },
            ],
          },
          {
            id: 'me',
            text: '「我來接。你在旁邊就好。」',
            flag: 'iAnswer',
            reply: [{ who: 老鍾, text: '好。' }, { text: '他好像鬆了一口氣，又好像有點失落。' }],
          },
          {
            id: 'go',
            text: '「我去燈塔。電台交給你。」',
            flag: 'goLighthouse',
            reply: [
              { who: 老鍾, text: '北角的路很黑。' },
              { text: '他從抽屜裡拿出一支很舊的鐵殼手電筒，放在你手上。' },
              { who: 老鍾, text: '這是那天晚上……之後，他們在燈塔下面撿到的。我留了三十年。' },
            ],
          },
        ],
      },
    },
  ],
  bigClues: [
    '颱風夜那捲帶子空白了三分鐘：三點零三分燈塔專線響了，播音室裡沒有人。值班的是年輕的老鍾。',
    '燈塔專線沒有號碼，是從燈塔直接拉到電台桌上的一條線。',
    '老鍾坦白：電台的執照十二年前就被收回了。他把發射機藏在山上，功率調到剛好照得到北角。',
    '莊太太中風以後說不出話。夜鷺每次都會對她說一句話，她聽了就會掛。',
    '老鍾說：這個禮拜，有幾件事他沒說實話。',
  ],
  bigUnlocks: ['confession', 'hotline', 'missed', 'license', 'transmitter', 'twelve', 'stroke'],
};
