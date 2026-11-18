import type { Night, Soup } from '../../engine/types';

const 溫伯 = '溫伯';
const 方先生 = '灰西裝的男人';
const 方 = '方先生';
const 秋姨 = '秋姨';
const 你 = '你';

const soup: Soup = {
  id: 'wrong-color',
  title: '說錯顏色的人',
  kind: 'small',
  surface: [
    { text: '一個穿灰西裝的男人走到櫃台前，皮鞋擦得很亮。' },
    { who: 方先生, text: '我昨天在車上掉了一只懷錶。銀色的，錶蓋上有花紋。' },
    { text: '架上確實有一只懷錶，是葉姊昨天從車廂撿回來的。可是那只懷錶是銅的。' },
    { who: 你, text: '不好意思，我們這裡只有一只銅的。' },
    { text: '男人看了懷錶一眼，笑了。' },
    { who: 方先生, text: '那就不是我的。謝謝你，你們做事很仔細。' },
    { text: '他遞了一張名片給溫伯，心情很好地走了。' },
    { who: 溫伯, text: '……問吧。這碗湯，我也想知道你怎麼看。' },
  ],
  start: ['fang', 'you', 'owner', 'watch', 'office', 'storeroom', 'mistaken', 'thanks', 'clearing', 'tonight'],
  keywords: [
    { id: 'fang', label: '灰西裝的男人', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'owner', label: '懷錶的主人', category: '人物' },
    { id: 'collector', label: '鐵道文物收藏家', category: '人物' },

    { id: 'watch', label: '銅懷錶', category: '物品' },
    { id: 'card', label: '名片', category: '物品' },
    { id: 'box', label: '綠色鐵盒', category: '物品' },
    { id: 'ledger', label: '登記簿', category: '物品' },

    { id: 'office', label: '招領處', category: '地點' },
    { id: 'storeroom', label: '舊倉', category: '地點' },
    { id: 'auction', label: '拍賣會', category: '地點' },

    { id: 'mistaken', label: '記錯了', category: '事情' },
    { id: 'thanks', label: '道謝', category: '事情' },
    { id: 'clearing', label: '清倉', category: '事情' },
    { id: 'onpurpose', label: '故意', category: '事情' },

    { id: 'tonight', label: '今晚', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-watch',
      name: '銅懷錶',
      description: '一只銅製懷錶，錶鏈斷了一截。',
      hotspots: [
        { id: 'hs-lid', name: '錶蓋', label: '錶蓋內側刻著「霧埔支線開通紀念」。是當年發給員工的。', unlocks: [] },
        { id: 'hs-chain', name: '錶鏈', label: '錶鏈的斷口很新，像是被勾到扯斷的。', unlocks: [] },
      ],
    },
    {
      id: 'ev-card',
      name: '名片',
      description: '灰西裝男人留給溫伯的名片，紙很厚。',
      hotspots: [{ id: 'hs-card', name: '名片上的字', label: '「仲達古物　方仲達　收購各式鐵道舊物、站牌、票據、紀念品」', unlocks: ['card'] }],
    },
  ],
  questions: [
    // 灰西裝的男人
    { id: 'q-owner', topic: 'fang', text: '他是懷錶的主人嗎？', reply: '不是' },
    { id: 'q-mistaken', topic: 'fang', text: '他記錯顏色了嗎？', reply: '不是', say: '他記得很清楚。他看過那只錶。', unlocks: ['onpurpose'] },
    { id: 'q-bad', topic: 'fang', text: '他是壞人嗎？', reply: '是也不是', say: '他不覺得自己在做壞事。' },
    { id: 'q-before', topic: 'fang', text: '他以前來過車站嗎？', reply: '是', say: '昨天清倉，他說自己是鐵道協會的志工，來幫忙搬箱子。' },
    // 名片
    { id: 'q-collector', topic: 'card', text: '他是收藏家嗎？', reply: '是', unlocks: ['collector'] },
    { id: 'q-sell', topic: 'card', text: '他會把東西拿去賣嗎？', reply: '是也不是', say: '好東西他自己留，其他的送拍賣會。', unlocks: ['auction'] },
    // 故意
    { id: 'q-reject', topic: 'onpurpose', text: '他是想被拒絕嗎？', reply: '是', say: '被拒絕，他才知道要準備什麼。' },
    { id: 'q-test', topic: 'onpurpose', text: '他是在試探招領處嗎？', reply: '是', say: '他想知道，我們會不會隨便把東西交出去。' },
    // 懷錶
    { id: 'q-watchvalue', topic: 'watch', text: '懷錶很值錢嗎？', reply: '是也不是', say: '對收藏的人來說值錢。' },
    { id: 'q-wantwatch', topic: 'watch', text: '他真正想要的是懷錶嗎？', reply: '不是' },
    { id: 'q-ownerwho', topic: 'owner', text: '懷錶的主人會來領嗎？', reply: '不重要' },
    // 舊倉、清倉
    { id: 'q-instore', topic: 'storeroom', text: '他想要的東西在舊倉裡嗎？', reply: '是', requires: ['onpurpose'], say: '乙-7。', unlocks: ['box'] },
    { id: 'q-sawledger', topic: 'clearing', text: '他在清倉的時候看過登記簿嗎？', reply: '是', say: '還拍了照。', unlocks: ['ledger'] },
    // 綠色鐵盒、登記簿
    { id: 'q-knowsname', topic: 'box', text: '他知道鐵盒的領取人叫什麼嗎？', reply: '是', say: '何秋堂。他照著登記簿念的。' },
    { id: 'q-knowsqiu', topic: 'box', text: '他知道秋姨每天晚上都會來嗎？', reply: '不是' },
    { id: 'q-ledgerwhy', topic: 'ledger', text: '他拍登記簿，是為了冒領東西嗎？', reply: '是' },
    // 其他
    { id: 'q-thanks', topic: 'thanks', text: '他道謝是真心的嗎？', reply: '是', say: '他真的很高興。' },
    { id: 'q-you', topic: 'you', text: '這件事跟我有關嗎？', reply: '是也不是', say: '他要騙的，是今晚值班的人。' },
    { id: 'q-tonight', topic: 'tonight', text: '他今晚還會再來嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '他是{b1}說錯懷錶顏色的。', blanks: [{ id: 'b1', category: '事情', answer: 'onpurpose' }] },
    { id: 's2', text: '他在試探{b2}，會不會隨便把東西交出去。', blanks: [{ id: 'b2', category: '地點', answer: 'office' }] },
    {
      id: 's3',
      text: '他真正想領的是{b3}；他手上有{b4}的照片。',
      blanks: [
        { id: 'b3', category: '物品', answer: 'box' },
        { id: 'b4', category: '物品', answer: 'ledger' },
      ],
    },
    { id: 's4', text: '他是{b5}，想趁停駛前把舊東西弄到手。', blanks: [{ id: 'b5', category: '人物', answer: 'collector' }] },
  ],
  reveal: [
    { who: 溫伯, text: '他叫方仲達，收鐵道舊東西的。昨天清倉，他說自己是志工，來幫忙搬箱子。' },
    { who: 溫伯, text: '他看到了登記簿，拍了照。一只四十年沒人領的鐵盒，寄放人只寫一個「卓」字，領取人叫「何秋堂」。' },
    { who: 溫伯, text: '今天他故意說錯懷錶的顏色。我們要是把錶給他，他就知道招領處不核對，隨便說說就拿得到。' },
    { who: 溫伯, text: '我們沒給，他也高興。這表示他只要把登記簿上的字背熟，就領得到。' },
    { text: '溫伯把名片翻過來，又翻回去。' },
    { who: 溫伯, text: '他今晚還會再來。' },
  ],
};

export const night5: Night = {
  n: 5,
  title: '第五晚',
  intro: [
    { text: '舊倉清了一半，候車室裡堆滿了封好的紙箱。' },
    { text: '溫伯今天話很少。你兩次看到他走到舊倉門口，又走回來。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '23:00。秋姨來了。' },
        { who: 秋姨, text: '明天就禮拜六了。' },
        { text: '她沒有問鐵盒。她只是在長椅上坐了一會兒，看著月台上的燈，然後走了。' },
        { text: '23:30。灰西裝的男人又出現了。他把手機放在櫃台上，螢幕上是登記簿那一頁的照片。' },
        { who: 方, text: '綠色鐵盒一只，領取人何秋堂。那是我外婆。她過世了，我是來替她領的。' },
        { who: 方, text: '乙-7，對吧？我可以等你們去拿。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-fang',
        prompt: '你要怎麼處理方先生？',
        options: [
          {
            id: 'to-wen',
            text: '請他稍等，去站長室找溫伯。',
            flag: 'fangToWen',
            reply: [
              { text: '溫伯聽完，什麼也沒說，直接走到櫃台前。' },
              { who: 溫伯, text: '方先生。那只鐵盒的領取人，每天晚上都會來。她還活著。' },
              { who: 溫伯, text: '請回吧。' },
              { text: '方先生看了溫伯很久，收起手機，走了。' },
              { text: '溫伯回到站長室，把門關上。你聽到裡面很久都沒有聲音。' },
            ],
          },
          {
            id: 'myself',
            text: '自己攔下他：「這個名字寫錯了。真正的主人，每天晚上都會來。」',
            flag: 'fangStopped',
            reply: [
              { text: '方先生的笑容停了一下。' },
              { who: 方, text: '寫錯了？登記簿上的字，你說錯就錯？' },
              { who: 你, text: '她的名字是海棠的棠。她今天晚上十一點才來過。' },
              { text: '他收起手機，點點頭，像是輸了一盤棋。' },
              { who: 方, text: '那祝她早日領到。' },
              { text: '他走了以後，你發現溫伯一直站在站長室門口。他什麼也沒說。' },
            ],
          },
        ],
      },
    },
  ],
  bigClues: ['方仲達拿著登記簿的照片，想用「何秋堂」的名字冒領鐵盒。', '方先生問「乙-7，對吧？」的時候，溫伯沒有否認。'],
  bigUnlocks: ['fang'],
};
