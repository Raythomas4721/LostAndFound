import type { Night, Soup } from '../../engine/types';

const 老鍾 = '老鍾';
const 阿傑 = '阿傑';
const 你 = '你';

/** 第三夜：燈塔門口的手電筒。每晚照海的是守燈人的太太；門是阿傑自己報案才被鎖上的。 */
const soup: Soup = {
  id: 'flashlight',
  title: '門口的手電筒',
  kind: 'small',
  surface: [
    { text: '第三夜，三點零三分。熱線沒有響。' },
    { text: '老鍾盯著那顆燈，一直等到三點十分。它沒有亮。' },
    { text: '三點二十分，另一條線響了。是常在北角防波堤夜釣的阿傑。' },
    { who: 阿傑, text: '主持人，北角那座廢燈塔你知道吧？每天三點整，燈塔頂上會亮一下。就一下。' },
    { who: 阿傑, text: '燈塔三十年前就沒人顧了，燈也拆了。我一直以為是有人在上面玩火。' },
    { who: 阿傑, text: '今天三點，燈沒亮。我走過去看——門口的石階上，放著一支手電筒。還是溫的。' },
    { who: 阿傑, text: '門上纏著一條新的鐵鍊。' },
    { text: '電話那頭有很大的風聲。阿傑的聲音突然變小了。' },
    { who: 阿傑, text: '……主持人，鐵鍊是從外面鎖的。' },
  ],
  start: ['ajie', 'flashlight', 'chain', 'lamp', 'lighthouse', 'breakwater', 'flash', 'fire', 'three', 'thirty'],
  keywords: [
    { id: 'ajie', label: '阿傑', category: '人物' },
    { id: 'climber', label: '爬上去的人', category: '人物' },
    { id: 'oldwoman', label: '一個老太太', category: '人物' },
    { id: 'keeper', label: '守燈人', category: '人物' },
    { id: 'township', label: '鄉公所', category: '人物' },

    { id: 'flashlight', label: '手電筒', category: '物品' },
    { id: 'chain', label: '鐵鍊', category: '物品' },
    { id: 'lamp', label: '燈塔的燈', category: '物品' },

    { id: 'lighthouse', label: '北角燈塔', category: '地點' },
    { id: 'breakwater', label: '防波堤', category: '地點' },

    { id: 'flash', label: '亮一下', category: '事情' },
    { id: 'fire', label: '玩火', category: '事情' },
    { id: 'locked', label: '門被鎖上了', category: '事情' },
    { id: 'reported', label: '報案', category: '事情' },

    { id: 'three', label: '三點整', category: '時間' },
    { id: 'thirty', label: '三十年前', category: '時間' },
    { id: 'everyday', label: '每天晚上', category: '時間' },
    { id: 'typhoonnight', label: '颱風那一夜', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-flashlight',
      art: 'flashlight',
      name: '阿傑傳來的照片',
      description: '阿傑用手機拍下燈塔門口：石階上的手電筒，和門上的鐵鍊。',
      hotspots: [
        { id: 'hs-grip', at: [34, 62], name: '手電筒的握把', label: '很舊的鐵殼手電筒。開關磨得發亮，旁邊纏了一圈膠布止滑——有人每天都在用。', unlocks: ['everyday'] },
        { id: 'hs-tag', at: [93, 22], name: '鐵鍊上的牌子', label: '鐵鍊上掛著一張護貝的紙：「北角燈塔　危險勿入　鄉公所」。日期是這個禮拜一。', unlocks: ['township'] },
        { id: 'hs-step', at: [54, 82], name: '石階', label: '手電筒放得很端正，燈頭朝著海。旁邊的石階上，有一雙很小的鞋印。', unlocks: [] },
      ],
    },
  ],
  questions: [
    // 阿傑
    { id: 'q-a-lie', topic: 'ajie', text: '阿傑在說謊嗎？', reply: '不是' },
    { id: 'q-a-danger', topic: 'ajie', text: '阿傑現在有危險嗎？', reply: '不是', say: '他只是嚇到了。' },
    { id: 'q-a-chain', topic: 'ajie', text: '阿傑跟那條鐵鍊有關嗎？', reply: '是', say: '他自己大概還沒想到。', unlocks: ['reported'] },
    // 燈塔
    { id: 'q-l-live', topic: 'lighthouse', text: '燈塔裡面住著人嗎？', reply: '不是' },
    { id: 'q-l-keeper', topic: 'lighthouse', text: '燈塔以前有人顧嗎？', reply: '是', say: '一個守燈人。', unlocks: ['keeper'] },
    // 燈
    { id: 'q-lamp-work', topic: 'lamp', text: '燈塔的燈還能亮嗎？', reply: '不是', say: '三十年前就拆了。' },
    // 亮一下
    { id: 'q-f-ghost', topic: 'flash', text: '那道光是鬼火嗎？', reply: '不是' },
    { id: 'q-f-person', topic: 'flash', text: '那道光是人弄出來的嗎？', reply: '是', say: '有人每天晚上爬上去。', unlocks: ['climber'] },
    { id: 'q-f-ship', topic: 'flash', text: '那道光是照給海上的船看的嗎？', reply: '是也不是', say: '是照給一個以前在海上的人看的。' },
    // 玩火
    { id: 'q-fire', topic: 'fire', text: '真的有人在燈塔上玩火嗎？', reply: '不是' },
    // 手電筒
    { id: 'q-fl-light', topic: 'flashlight', text: '燈塔上的光，就是這支手電筒照的嗎？', reply: '是' },
    { id: 'q-fl-forgot', topic: 'flashlight', text: '手電筒是不小心忘在門口的嗎？', reply: '不是', say: '是放在那裡的。' },
    // 爬上去的人
    { id: 'q-c-old', topic: 'climber', text: '爬上去的是一個老人嗎？', reply: '是', say: '一個老太太。', unlocks: ['oldwoman'] },
    { id: 'q-c-young', topic: 'climber', text: '爬上去的是小孩嗎？', reply: '不是' },
    { id: 'q-c-ajie', topic: 'climber', text: '阿傑認識爬上去的人嗎？', reply: '不是' },
    // 老太太
    { id: 'q-o-for', topic: 'oldwoman', text: '老太太是在替某個人做這件事嗎？', reply: '是', say: '替一個再也爬不上去的人。', unlocks: ['keeper'] },
    { id: 'q-o-lost', topic: 'oldwoman', text: '老太太迷路了嗎？', reply: '不是' },
    { id: 'q-o-in', topic: 'oldwoman', text: '老太太今晚有進到燈塔裡嗎？', reply: '不是', say: '她進不去。', unlocks: ['locked'] },
    // 守燈人
    { id: 'q-k-dead', topic: 'keeper', text: '守燈人過世了嗎？', reply: '是' },
    { id: 'q-k-storm', topic: 'keeper', text: '守燈人是在颱風夜出事的嗎？', reply: '是', say: '那天晚上，燈壞了。他拿著手電筒爬上去，一下一下照著海。', unlocks: ['typhoonnight'] },
    { id: 'q-k-name', topic: 'keeper', text: '守燈人姓莊嗎？', reply: '是' },
    // 鐵鍊
    { id: 'q-ch-new', topic: 'chain', text: '鐵鍊是這個禮拜才鎖上的嗎？', reply: '是', unlocks: ['locked'] },
    { id: 'q-ch-who', topic: 'chain', text: '鐵鍊是老太太自己鎖的嗎？', reply: '不是', requires: ['oldwoman'] },
    // 鄉公所
    { id: 'q-t-why', topic: 'township', text: '鄉公所是因為有人報案，才把門鎖上的嗎？', reply: '是', unlocks: ['reported'] },
    // 報案
    { id: 'q-r-ajie', topic: 'reported', text: '報案的人是阿傑嗎？', reply: '是', say: '上禮拜。他說燈塔上有人在玩火。' },
    // 時間
    { id: 'q-three', topic: 'three', text: '三點整這個時間很重要嗎？', reply: '是', say: '颱風那一夜，他就是三點爬上去的。', requires: ['keeper'], unlocks: ['typhoonnight'] },
  ],
  board: [
    {
      id: 's1',
      text: '燈塔頂上的光，是{b1}拿{b2}照的。',
      blanks: [
        { id: 'b1', category: '人物', answer: 'oldwoman' },
        { id: 'b2', category: '物品', answer: 'flashlight' },
      ],
    },
    {
      id: 's2',
      text: '她每天晚上都替{b3}照一次海，就像他在{b4}做的那樣。',
      blanks: [
        { id: 'b3', category: '人物', answer: 'keeper' },
        { id: 'b4', category: '時間', answer: 'typhoonnight' },
      ],
    },
    { id: 's3', text: '今晚燈沒亮，是因為燈塔的{b5}。', blanks: [{ id: 'b5', category: '事情', answer: 'locked' }] },
    {
      id: 's4',
      text: '來鎖門的是{b6}，因為{b7}上禮拜打電話去報了案。',
      blanks: [
        { id: 'b6', category: '人物', answer: 'township' },
        { id: 'b7', category: '人物', answer: 'ajie' },
      ],
    },
  ],
  reveal: [
    { who: 老鍾, text: '守燈人姓莊。三十年前的颱風夜，燈塔的燈壞了。他拿著手電筒爬到頂上，一下一下照著海，讓外面的船看得到岸。' },
    { who: 老鍾, text: '那天晚上，他沒有下來。' },
    { who: 老鍾, text: '他太太從那年開始，每天晚上都走去燈塔，爬到頂上，用手電筒照一次海。' },
    { who: 老鍾, text: '上禮拜，阿傑打去鄉公所，說燈塔上有人在玩火。鄉公所就把門鎖了。' },
    { who: 老鍾, text: '她今天走到門口，進不去。她把手電筒擺好，對著海，就回家了。' },
    { text: '老鍾說完，看了一眼那顆今晚一直沒亮的熱線燈，沒有再說話。' },
  ],
};

export const night3: Night = {
  n: 3,
  title: '第三夜',
  ambience: 'static',
  intro: [
    { text: '第三夜。海上起了霧，從播音室的窗子看出去，什麼都看不見。' },
    { who: 老鍾, text: '今天兩點，我又叫了一次小滿。' },
    { who: 你, text: '林太太有打來嗎？' },
    { who: 老鍾, text: '沒有。她大概也在聽。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-chain',
        prompt: '阿傑又打來了：「主持人……是我害的嗎？」你說：',
        options: [
          {
            id: 'open',
            text: '「明天一早，我陪你去鄉公所，把門打開。」',
            flag: 'doorOpened',
            reply: [
              { who: 阿傑, text: '……好。是我報的案，我去說。' },
              { text: '玻璃另一邊，老鍾把臉轉開了。你看見他的肩膀在動。' },
            ],
          },
          {
            id: 'leave',
            text: '「你不知道。那是鄉公所的事了。」',
            reply: [
              { who: 阿傑, text: '……喔。' },
              { text: '電話掛了。老鍾看著那顆熱線燈，一直看到四點。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '節目結束後，你問老鍾：' },
        { who: 你, text: '三點零三分的電話，是燈塔打來的嗎？' },
        { text: '老鍾沒有回答。他把大衣的領子立起來，走進霧裡。' },
      ],
    },
  ],
  bigClues: [
    '今晚燈塔的門被鎖住了。三點零三分，熱線第一次沒有響。',
    '北角燈塔的守燈人姓莊，三十年前的颱風夜沒有下來。',
    '他太太每天晚上都會爬上燈塔，用手電筒照一次海。',
  ],
  bigUnlocks: ['keeper', 'flashlight', 'thirty', 'ajie'],
};
