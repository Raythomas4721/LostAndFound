import type { Night, Soup } from '../../engine/types';

const 季伯 = '季伯';
const 你 = '你';

/** 第一夜：倒著走的人。宋太太牽著一隻又黑又矮、看不見的老狗；大樓禁養寵物，監視器又拍不到牠。 */
const soup: Soup = {
  id: 'backwards',
  title: '倒著走的人',
  kind: 'small',
  surface: [
    { text: '凌晨一點二十分。八樓走廊那一格：806 的宋太太從電梯口走出來，一路倒著走回家。' },
    { text: '她一邊倒著走，一邊對著空蕩蕩的走廊小聲說話。右手垂得很低，像是牽著誰。' },
    { text: '走到門口，她蹲下來，對著地板說了一句什麼，才開門進去。' },
    { text: '畫面裡，從頭到尾，只有她一個人。' },
    { who: 季伯, text: '看到了？想知道就問。我只說是跟不是。這棟樓的事，我大概都知道。' },
  ],
  start: ['song', 'you', 'camera', 'hallway', 'elevator', 'backwards', 'talking', 'ghost', 'onetwenty'],
  keywords: [
    { id: 'song', label: '宋太太', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'someone', label: '被牽著的什麼', category: '人物' },
    { id: 'dog', label: '一隻老狗', category: '人物' },

    { id: 'camera', label: '八樓的監視器', category: '物品' },
    { id: 'leash', label: '很細的線', category: '物品' },

    { id: 'hallway', label: '八樓走廊', category: '地點' },
    { id: 'elevator', label: '電梯口', category: '地點' },

    { id: 'backwards', label: '倒著走', category: '事情' },
    { id: 'talking', label: '對空氣說話', category: '事情' },
    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'shadow', label: '地上那團黑', category: '事情' },
    { id: 'high', label: '監視器裝得很高', category: '事情' },
    { id: 'blindspot', label: '監視器拍不到', category: '事情' },
    { id: 'blind', label: '看不見', category: '事情' },
    { id: 'nopets', label: '大樓禁養寵物', category: '事情' },

    { id: 'onetwenty', label: '一點二十分', category: '時間' },
    { id: 'everynight', label: '每天晚上', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-cam8',
      art: 'cctv-hall',
      name: 'CAM-08　八樓走廊',
      description: '黑白的監視器畫面，有點雜訊。鏡頭裝在天花板角落，往下斜斜地拍整條走廊。',
      hotspots: [
        { id: 'hs-hand', at: [44, 70], name: '她的右手', label: '右手垂得很低，手指之間好像有一條很細的線，一直繃著。', unlocks: ['leash'] },
        { id: 'hs-floor', at: [42, 93], name: '畫面下緣', label: '地板上有一團比影子還黑的東西，跟著她一起移動。', unlocks: ['shadow'] },
        { id: 'hs-stamp', at: [95, 17], name: '時間戳記', label: '01:20:07　CAM-08。這支鏡頭裝在天花板最高的地方。', unlocks: ['high'] },
      ],
    },
  ],
  questions: [
    // 對空氣說話、鬧鬼
    { id: 'q-t-ghost', topic: 'talking', text: '她在跟鬼說話嗎？', reply: '不是' },
    { id: 'q-t-alive', topic: 'talking', text: '她在跟某個活著的東西說話嗎？', reply: '是', say: '牠會跟著她的聲音走。', unlocks: ['someone'] },
    { id: 'q-ghost', topic: 'ghost', text: '八樓鬧鬼嗎？', reply: '不是' },
    // 線、地上那團黑
    { id: 'q-l-leash', topic: 'leash', text: '那條線是牽繩嗎？', reply: '是', unlocks: ['someone'] },
    { id: 'q-s-same', topic: 'shadow', text: '地上那團黑，就是她牽著的東西嗎？', reply: '是', unlocks: ['someone'] },
    // 被牽著的什麼
    { id: 'q-so-human', topic: 'someone', text: '她牽著的是人嗎？', reply: '不是', say: '四條腿。', unlocks: ['dog'] },
    { id: 'q-so-kid', topic: 'someone', text: '她牽著的是小孩嗎？', reply: '不是' },
    // 老狗
    { id: 'q-d-old', topic: 'dog', text: '那隻狗很老了嗎？', reply: '是', say: '十四歲。' },
    { id: 'q-d-see', topic: 'dog', text: '那隻狗看得見嗎？', reply: '不是', say: '兩隻眼睛都白了。', unlocks: ['blind'] },
    { id: 'q-d-cam', topic: 'dog', text: '監視器拍得到那隻狗嗎？', reply: '不是', say: '黑狗，又矮，貼著地走。', unlocks: ['blindspot'] },
    { id: 'q-d-hers', topic: 'dog', text: '那隻狗是宋太太自己的嗎？', reply: '是也不是', say: '……問別的。' },
    { id: 'q-d-lift', topic: 'dog', text: '那隻狗怕電梯嗎？', reply: '不重要' },
    // 監視器
    { id: 'q-h-floor', topic: 'high', text: '鏡頭裝得高，所以拍不到貼著地板的東西嗎？', reply: '是', unlocks: ['blindspot'] },
    { id: 'q-c-broken', topic: 'camera', text: '八樓的監視器壞了嗎？', reply: '不是' },
    // 倒著走
    { id: 'q-b-face', topic: 'backwards', text: '她倒著走，是為了一直面對著什麼嗎？', reply: '是', say: '她要讓牠從正前方聽到她的聲音。' },
    // 宋太太
    { id: 'q-s-hide', topic: 'song', text: '宋太太半夜才出門，是怕被人看到嗎？', reply: '是', say: '這棟樓的規約，不准養狗。', unlocks: ['nopets'] },
    { id: 'q-s-lie', topic: 'song', text: '宋太太在騙人嗎？', reply: '是也不是', say: '她沒說謊。她只是什麼都沒說。' },
    { id: 'q-s-every', topic: 'song', text: '她每天晚上都這樣嗎？', reply: '是', unlocks: ['everynight'] },
    // 其他
    { id: 'q-time', topic: 'onetwenty', text: '一點二十分這個時間很重要嗎？', reply: '是', say: '那時候走廊不會有人。' },
    { id: 'q-lift', topic: 'elevator', text: '她是從外面回來的嗎？', reply: '是', say: '樓下的小公園。' },
    { id: 'q-hall', topic: 'hallway', text: '八樓走廊有別人看到過她嗎？', reply: '不重要' },
    { id: 'q-you', topic: 'you', text: '季伯早就知道這件事嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', time: '01:20', text: '宋太太牽著的，是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'dog' }] },
    { id: 's2', time: '01:20', text: '牠又黑又矮，貼著地走，{b2}。', blanks: [{ id: 'b2', category: '事情', answer: 'blindspot' }] },
    { id: 's3', time: '01:21', text: '她倒著走，是因為牠{b3}，只能跟著她的聲音走。', blanks: [{ id: 'b3', category: '事情', answer: 'blind' }] },
    { id: 's4', time: '01:22', text: '她半夜才出門，是因為{b4}。', blanks: [{ id: 'b4', category: '事情', answer: 'nopets' }] },
  ],
  reveal: [
    { who: 季伯, text: '806 的宋太太，養了一隻黑色的老狗。十四歲了，兩隻眼睛都看不見。' },
    { who: 季伯, text: '這棟樓的規約，不准養狗。所以她只在一點多、走廊沒有人的時候，帶牠下樓。' },
    { who: 季伯, text: '狗看不見，只能跟著她的聲音走。她就倒著走，一路面對著牠，一路跟牠說話。' },
    { who: 季伯, text: '鏡頭裝在天花板，往下拍。黑狗貼著地，畫面裡什麼都看不到。' },
    { who: 季伯, text: '所以你看到的，是一個對著空氣說話、倒著走路的女人。' },
    { text: '季伯喝了一口茶。' },
    { who: 季伯, text: '那隻狗，本來不是她的。' },
  ],
};

export const night1: Night = {
  n: 1,
  title: '第一夜',
  ambience: 'hum',
  intro: [
    { text: '松風大廈，十四層樓，九十六戶。你是新來的夜班管理員。' },
    { text: '警衛室的牆上是十六格監視器畫面。每一格，是這棟樓的一個角落。' },
    { text: '前任的夜班管理員季伯，上個月退休了。可是他說，晚上睡不著，每天都會來警衛室坐一下。' },
    { who: 季伯, text: '看監視器很簡單。十五格都是正常的。' },
    { who: 你, text: '那第十六格呢？' },
    { who: 季伯, text: '十二樓。沒有人住。你不用看它。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-report',
        prompt: '早上交班，日報表上有一格「異常事項」。你寫：',
        options: [
          {
            id: 'none',
            text: '「無異常。」',
            flag: 'keptDog',
            reply: [{ text: '季伯看了一眼報表，沒有說話，把你的茶杯也倒滿了。' }],
          },
          {
            id: 'report',
            text: '「806 疑似飼養寵物。」',
            reply: [{ who: 季伯, text: '……規定就是規定。' }, { text: '他說得很慢，像是嘴巴裡有沙。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '凌晨三點。你的眼角瞄到第十六格。' },
        { text: '十二樓的走廊，燈亮了。1203 的門打開，又關上。' },
        { text: '你調出電梯紀錄：從十一點到現在，電梯一次都沒有停過十二樓。' },
        { who: 你, text: '季伯，十二樓——' },
        { who: 季伯, text: '十二樓，沒有人。' },
      ],
    },
  ],
  bigClues: [
    '湯面：1203 登記空屋八年。每天凌晨三點，十二樓走廊的燈會亮，1203 的門會開；可是電梯從來沒有停過十二樓。',
    '季伯說：「十二樓，沒有人。」',
    '宋太太偷養的那隻看不見的老狗，「本來不是她的」。',
  ],
  bigUnlocks: ['dog'],
};
