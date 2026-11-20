import type { Night, Soup } from '../../engine/types';

const 季伯 = '季伯';
const 齊老先生 = '齊老先生';

/** 第二夜：寄到「四樓之二」的包裹。大樓二十年前改了樓層編號；來拿的是五樓之二的齊老先生，藥是替一個不能用本名的人收的。 */
const soup: Soup = {
  id: 'parcel',
  title: '四樓之二的包裹',
  kind: 'small',
  surface: [
    { text: '每個禮拜二晚上，都有一個包裹寄到松風大廈。收件地址寫的是：「四樓之二」。' },
    { text: '這棟樓沒有四樓。電梯的按鈕，從三樓直接跳到五樓。' },
    { text: '你把包裹放在櫃台上。' },
    { text: '早上六點，櫃台那一格拍到：一隻手從畫面外伸進來，把包裹拿走了。手很老，手背上都是斑。' },
    { text: '從頭到尾，畫面裡沒有那個人的臉。' },
    { who: 季伯, text: '想知道是誰？問吧。' },
  ],
  start: ['hand', 'you', 'parcel', 'label', 'counter', 'floor4', 'ghost', 'tuesday', 'six'],
  keywords: [
    { id: 'hand', label: '那隻老人的手', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'qi', label: '齊老先生', category: '人物' },
    { id: 'someone', label: '另一個人', category: '人物' },

    { id: 'parcel', label: '包裹', category: '物品' },
    { id: 'label', label: '地址標籤', category: '物品' },
    { id: 'medicine', label: '藥', category: '物品' },

    { id: 'counter', label: '櫃台', category: '地點' },
    { id: 'floor4', label: '四樓', category: '地點' },
    { id: 'floor5', label: '現在的五樓', category: '地點' },
    { id: 'oldaddr', label: '舊門牌', category: '地點' },

    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'renumber', label: '改了樓層編號', category: '事情' },
    { id: 'nameless', label: '不能用自己的名字', category: '事情' },

    { id: 'tuesday', label: '每個禮拜二', category: '時間' },
    { id: 'six', label: '早上六點', category: '時間' },
    { id: 'twentyyears', label: '二十年前', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-parcel',
      art: 'parcel',
      name: '禮拜二的包裹',
      description: '一個手掌大的紙盒，用膠帶纏了好幾圈。很輕，搖起來有東西在裡面沙沙響。',
      hotspots: [
        { id: 'hs-name', at: [12, 24], name: '收件人', label: '收件人只寫了一個字：「齊」。電話那一欄是空的。', unlocks: [] },
        { id: 'hs-sender', at: [93, 14], name: '寄件人', label: '寄件人：溪口仁和藥局。', unlocks: ['medicine'] },
        { id: 'hs-old', at: [64, 77], name: '標籤底下', label: '新標籤底下，還有一張很舊的貼紙，上面的門牌也是「四樓之二」。舊得發黃。', unlocks: ['oldaddr'] },
      ],
    },
  ],
  questions: [
    // 四樓
    { id: 'q-4-none', topic: 'floor4', text: '四樓真的不存在嗎？', reply: '是也不是', say: '樓還在。只是不叫四樓了。', unlocks: ['floor5'] },
    { id: 'q-4-sealed', topic: 'floor4', text: '四樓是封起來的嗎？', reply: '不是' },
    // 舊門牌
    { id: 'q-o-old', topic: 'oldaddr', text: '「四樓之二」是以前的門牌嗎？', reply: '是', say: '二十年前的。', unlocks: ['twentyyears'] },
    { id: 'q-o-change', topic: 'oldaddr', text: '大樓後來改過門牌嗎？', reply: '是', say: '住戶說「四」不吉利，二十年前全部往上跳一號。', unlocks: ['renumber', 'floor5'] },
    // 二十年前
    { id: 'q-20-renum', topic: 'twentyyears', text: '二十年前，大樓改過樓層的編號嗎？', reply: '是', unlocks: ['renumber'] },
    // 現在的五樓
    { id: 'q-5-who', topic: 'floor5', text: '五樓之二住的是一個老人嗎？', reply: '是', say: '齊老先生，八十幾歲了。', unlocks: ['qi'] },
    // 老人的手
    { id: 'q-h-ghost', topic: 'hand', text: '那隻手是鬼的嗎？', reply: '不是' },
    { id: 'q-h-resident', topic: 'hand', text: '那隻手的主人住在這棟樓嗎？', reply: '是' },
    { id: 'q-h-hide', topic: 'hand', text: '他是故意不讓監視器拍到臉的嗎？', reply: '是' },
    // 齊老先生
    { id: 'q-q-hand', topic: 'qi', text: '拿走包裹的是齊老先生嗎？', reply: '是' },
    { id: 'q-q-own', topic: 'qi', text: '包裹是齊老先生自己要用的嗎？', reply: '不是', say: '他替別人收的。', unlocks: ['someone'] },
    { id: 'q-q-family', topic: 'qi', text: '齊老先生的家人知道這件事嗎？', reply: '不重要' },
    // 藥
    { id: 'q-m-his', topic: 'medicine', text: '藥是齊老先生自己吃的嗎？', reply: '不是', unlocks: ['someone'] },
    { id: 'q-m-sick', topic: 'medicine', text: '吃藥的人病得很重嗎？', reply: '不重要', say: '是每天都要吃的那種。' },
    // 另一個人
    { id: 'q-so-name', topic: 'someone', text: '那個人不能用自己的名字收包裹嗎？', reply: '是', unlocks: ['nameless'] },
    { id: 'q-so-here', topic: 'someone', text: '那個人也住在這棟樓嗎？', reply: '是也不是', say: '登記上，沒有。' },
    { id: 'q-so-woman', topic: 'someone', text: '那個人是女的嗎？', reply: '是' },
    // 不能用名字
    { id: 'q-n-why', topic: 'nameless', text: '她不能用本名，是因為在躲什麼人嗎？', reply: '是' },
    // 其他
    { id: 'q-ghost', topic: 'ghost', text: '櫃台鬧鬼嗎？', reply: '不是' },
    { id: 'q-p-danger', topic: 'parcel', text: '包裹裡是危險的東西嗎？', reply: '不是' },
    { id: 'q-l-print', topic: 'label', text: '標籤是印出來的嗎？', reply: '是', say: '每次都一樣。藥局的老闆是齊老先生的學生。' },
    { id: 'q-six', topic: 'six', text: '早上六點這個時間很重要嗎？', reply: '是', say: '夜班和早班交接的時候，櫃台沒有人。' },
    { id: 'q-tue', topic: 'tuesday', text: '每個禮拜二都會有嗎？', reply: '是' },
    { id: 'q-counter', topic: 'counter', text: '他是從櫃台後面拿走的嗎？', reply: '不重要' },
  ],
  board: [
    { id: 's1', time: '20 年前', text: '大樓{b1}，「四」這個數字跳過去了。', blanks: [{ id: 'b1', category: '事情', answer: 'renumber' }] },
    { id: 's2', time: '20 年前', text: '所以以前的「四樓」，就是{b2}。', blanks: [{ id: 'b2', category: '地點', answer: 'floor5' }] },
    { id: 's3', time: '06:00', text: '每個禮拜二拿走包裹的，是{b3}。', blanks: [{ id: 'b3', category: '人物', answer: 'qi' }] },
    {
      id: 's4',
      time: '06:00',
      text: '包裹裡的{b4}，是替{b5}收的。她{b6}。',
      blanks: [
        { id: 'b4', category: '物品', answer: 'medicine' },
        { id: 'b5', category: '人物', answer: 'someone' },
        { id: 'b6', category: '事情', answer: 'nameless' },
      ],
    },
  ],
  reveal: [
    { who: 季伯, text: '二十年前，住戶開會，說「四」不吉利。整棟樓的門牌，從四樓開始全部往上跳一號。' },
    { who: 季伯, text: '所以以前的四樓之二，就是現在的五樓之二。住著齊老先生，以前是中學老師。' },
    { who: 季伯, text: '藥局的老闆是他的學生。每個禮拜二，學生把藥寄過來，用舊門牌，只寫一個「齊」字。' },
    { who: 季伯, text: '早上六點，夜班和早班交接，櫃台沒有人。他就伸手進來拿走。他知道鏡頭在哪裡。' },
    { who: 季伯, text: '那些藥不是他吃的。' },
    { who: 季伯, text: '是替一個不能用自己名字的人收的。' },
  ],
};

export const night2: Night = {
  n: 2,
  title: '第二夜',
  ambience: 'hum',
  intro: [
    { text: '第二夜。禮拜二。' },
    { text: '晚上九點，快遞送來一個小紙盒。收件地址：松風大廈，四樓之二。' },
    { text: '季伯看了一眼，說：「放櫃台就好。」' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-parcel',
        prompt: '早上六點，一位很瘦的老先生站在櫃台前面，客客氣氣地說：「年輕人，那些包裹，可以不要記在收件簿上嗎？」',
        options: [
          {
            id: 'ok',
            text: '「好。我沒看到。」',
            flag: 'keptParcel',
            reply: [{ who: 齊老先生, text: '謝謝你。' }, { text: '他把紙盒放進外套內袋，慢慢走進電梯。電梯停在五樓。' }],
          },
          {
            id: 'log',
            text: '「抱歉，照規定要登記。」',
            reply: [{ who: 齊老先生, text: '……我明白。' }, { text: '他在收件簿上簽了一個「齊」字，手抖得很厲害。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '那天凌晨三點，十二樓的燈又亮了。' },
        { text: '你這次沒有轉開視線。1203 的門開了一條縫，一隻手伸出來，把門口一個小紙盒拿了進去。' },
        { text: '紙盒，跟你昨天放在櫃台上的那一個，一模一樣。' },
      ],
    },
  ],
  bigClues: [
    '寄到「四樓之二」的藥，是齊老先生替一個「不能用自己名字的女人」收的。',
    '凌晨三點，1203 的門開了一條縫，一隻手把一個小紙盒拿了進去。跟櫃台那個包裹一模一樣。',
  ],
  bigUnlocks: ['qi', 'medicine', 'nameless'],
};
