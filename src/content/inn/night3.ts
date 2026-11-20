import type { Night, Soup } from '../../engine/types';

const 老闆娘 = '老闆娘';
const 你 = '你';

/** 第三夜：寫了十年的車牌。葛老先生是當年辦案的警察，今晚在黎先生的舊照片裡找到了那台車。 */
const soup: Soup = {
  id: 'plate',
  title: '寫了十年的車牌',
  kind: 'small',
  surface: [
    { text: '第三夜。山莊裡只剩下三個房客的燈：黎先生、江先生、葛老先生。' },
    { text: '葛老先生一整晚坐在交誼廳，在一本很厚的筆記本上寫字。' },
    { text: '你送茶過去的時候看了一眼：整本筆記本，每一頁，都寫滿同一串字——「□□-7□3」。一行一行，寫了幾千遍。' },
    { text: '今晚，他翻到新的一頁，只寫了一次。四個字都填滿了。然後他用紅筆把它圈起來，圈得很用力，紙都破了。' },
    { text: '他闔上筆記本，抬頭看著樓梯。樓上，是黎先生的房間。' },
    { text: '老闆娘把茶壺放下。' },
    { who: 老闆娘, text: '想問什麼，就問。' },
  ],
  start: ['ge', 'li', 'boss', 'notebook', 'plate', 'redcircle', 'lounge', 'upstairs', 'revenge', 'tenyears', 'tonight'],
  keywords: [
    { id: 'ge', label: '葛老先生', category: '人物' },
    { id: 'li', label: '黎先生', category: '人物' },
    { id: 'boss', label: '老闆娘', category: '人物' },
    { id: 'police', label: '警察', category: '人物' },
    { id: 'witness', label: '目擊者', category: '人物' },
    { id: 'zou', label: '小鄒', category: '人物' },
    { id: 'xiaoqing', label: '小晴', category: '人物' },

    { id: 'notebook', label: '筆記本', category: '物品' },
    { id: 'plate', label: '車牌', category: '物品' },
    { id: 'redcircle', label: '紅圈', category: '物品' },
    { id: 'sticker', label: '車尾貼紙', category: '物品' },
    { id: 'oldphoto', label: '黎先生的舊照片', category: '物品' },

    { id: 'lounge', label: '交誼廳', category: '地點' },
    { id: 'upstairs', label: '樓上', category: '地點' },

    { id: 'revenge', label: '報仇', category: '事情' },
    { id: 'case', label: '一件案子', category: '事情' },
    { id: 'hitrun', label: '肇事逃逸', category: '事情' },
    { id: 'missing', label: '缺了兩個字', category: '事情' },

    { id: 'tenyears', label: '十年', category: '時間' },
    { id: 'tonight', label: '今晚', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-notebook',
      art: 'notebook',
      name: '葛老先生的筆記本',
      description: '很厚的一本，邊角都捲起來了。封面用透明膠帶補過好幾次。',
      hotspots: [
        { id: 'hs-cover', at: [42, 16], name: '封面', label: '封面寫著：「溪口分駐所　葛」，還有一個日期——十年前的十月。', unlocks: ['police'] },
        { id: 'hs-pages', at: [64, 44], name: '前面的頁', label: '前面幾百頁，車牌都缺了兩個字：「□□-7□3」。只有今晚這一頁，四個字是全的。', unlocks: ['missing'] },
        { id: 'hs-margin', at: [70, 80], name: '頁邊的小字', label: '某一頁的邊邊寫著：「目擊者說：黑色的車，車尾有一張貼紙。」', unlocks: ['sticker'] },
      ],
    },
  ],
  questions: [
    // 車牌
    { id: 'q-p-his', topic: 'plate', text: '那是葛老先生自己的車牌嗎？', reply: '不是' },
    { id: 'q-p-case', topic: 'plate', text: '那台車跟一件案子有關嗎？', reply: '是', unlocks: ['case'] },
    // 案子
    { id: 'q-c-died', topic: 'case', text: '那件案子有人死了嗎？', reply: '是', say: '一個十二歲的女孩。', unlocks: ['xiaoqing'] },
    { id: 'q-c-car', topic: 'case', text: '那是一場車禍嗎？', reply: '是', say: '撞了人，車沒有停。', unlocks: ['hitrun'] },
    { id: 'q-c-solved', topic: 'case', text: '案子破了嗎？', reply: '不是' },
    // 缺了兩個字
    { id: 'q-m-why', topic: 'missing', text: '缺兩個字，是因為目擊者沒看清楚嗎？', reply: '是', unlocks: ['witness'] },
    // 目擊者
    { id: 'q-w-kid', topic: 'witness', text: '目擊者當時是小孩嗎？', reply: '是', say: '跟那個女孩一起走路回家的同學。' },
    { id: 'q-w-here', topic: 'witness', text: '目擊者也在山莊裡嗎？', reply: '是也不是', say: '來過。', unlocks: ['zou'] },
    // 小鄒
    { id: 'q-z-gone', topic: 'zou', text: '小鄒不見，跟這件事有關嗎？', reply: '是' },
    // 紅圈
    { id: 'q-rc-found', topic: 'redcircle', text: '畫紅圈，是因為他找到那台車了嗎？', reply: '是' },
    { id: 'q-rc-photo', topic: 'redcircle', text: '他是在一張照片裡看到那個車牌的嗎？', reply: '是', say: '黎先生的攝影集。十年前拍的舊吊橋，角落停著一台黑色的車。', unlocks: ['oldphoto'] },
    { id: 'q-rc-guess', topic: 'redcircle', text: '葛老先生只是隨便猜的嗎？', reply: '不是' },
    // 舊照片、貼紙
    { id: 'q-op-li', topic: 'oldphoto', text: '照片裡那台車，是黎先生的嗎？', reply: '是', say: '十年前是。' },
    { id: 'q-st-match', topic: 'sticker', text: '照片裡的車尾也有貼紙嗎？', reply: '是', requires: ['oldphoto'] },
    // 黎先生
    { id: 'q-l-know', topic: 'li', text: '黎先生知道葛老先生是誰嗎？', reply: '不是' },
    { id: 'q-l-drunk', topic: 'li', text: '黎先生那天晚上喝了酒嗎？', reply: '不重要' },
    // 葛老先生、警察
    { id: 'q-g-police', topic: 'ge', text: '葛老先生以前是警察嗎？', reply: '是', unlocks: ['police'] },
    { id: 'q-po-case', topic: 'police', text: '這件案子是他辦的嗎？', reply: '是', say: '他辦的最後一件案子。退休了，還沒有結。' },
    // 報仇
    { id: 'q-rv-ge', topic: 'revenge', text: '葛老先生想報仇嗎？', reply: '不是', say: '他只是想結案。' },
    // 其他
    { id: 'q-up', topic: 'upstairs', text: '葛老先生想上樓去找黎先生嗎？', reply: '是也不是', say: '他想。但是他坐著沒動。' },
    { id: 'q-ten', topic: 'tenyears', text: '他寫這串車牌寫了十年嗎？', reply: '是' },
    { id: 'q-lounge', topic: 'lounge', text: '他是故意坐在交誼廳寫的嗎？', reply: '不重要' },
    { id: 'q-boss-knew', topic: 'boss', text: '老闆娘早就知道葛老先生在找什麼嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '葛老先生以前是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'police' }] },
    { id: 's2', text: '那串車牌，是十年前那起{b2}的車。', blanks: [{ id: 'b2', category: '事情', answer: 'hitrun' }] },
    { id: 's3', text: '當年只看清楚兩個字的目擊者，是{b3}。', blanks: [{ id: 'b3', category: '人物', answer: 'zou' }] },
    {
      id: 's4',
      text: '今晚，他在{b4}裡看到了完整的車牌。那台車，是{b5}的。',
      blanks: [
        { id: 'b4', category: '物品', answer: 'oldphoto' },
        { id: 'b5', category: '人物', answer: 'li' },
      ],
    },
  ],
  reveal: [
    { who: 老闆娘, text: '葛老先生以前是溪口分駐所的警察。十年前，他接了一件車禍。' },
    { who: 老闆娘, text: '颱風夜，舊吊橋前面的路上，一台黑色的車撞了一個十二歲的女孩，沒有停。' },
    { who: 老闆娘, text: '跟她一起走回家的同學，只看清楚了車牌的兩個字。那個同學，姓鄒。' },
    { who: 老闆娘, text: '葛老先生把那串缺字的車牌，寫了十年。' },
    { who: 老闆娘, text: '今天晚上，他在黎先生的攝影集裡，看到一張十年前拍的舊吊橋。照片角落，停著一台黑色的車。四個字，清清楚楚。' },
    { text: '老闆娘把茶壺放回爐子上，火開得很小。' },
    { who: 老闆娘, text: '那個女孩，是小晴。' },
  ],
};

export const night3: Night = {
  n: 3,
  title: '第三夜',
  ambience: 'storm',
  intro: [
    { text: '第三夜。黎先生沒有下樓吃晚餐。你把飯端上去，他只開了一條門縫。' },
    { who: '黎先生', text: '江先生呢？還在嗎？' },
    { who: 你, text: '還在。' },
    { who: '黎先生', text: '……幫我看著他。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '凌晨一點。你在廚房找到老闆娘。她坐在窗邊，小晴的位子上。' },
        { who: 你, text: '那些房客，到底去哪裡了？' },
        { who: 老闆娘, text: '……我這幾天，說了很多謊。' },
        { who: 老闆娘, text: '他們都沒事。都在後山的舊茶寮，有吃有睡。小鄒是小晴的同學，江太太是小晴的導師。葛老先生明天早上也會過去。' },
        { who: 老闆娘, text: '他們都是我請來的。只有黎先生，是我用免費住宿騙上山的。' },
        { who: 老闆娘, text: '橋斷了，是老天幫忙。我只是讓他一天一天，看著人變少。' },
        { who: 你, text: '你想做什麼？' },
        { who: 老闆娘, text: '我不想報仇。十年了，我只想聽他自己說一次。' },
        { who: 老闆娘, text: '明天晚上，山莊裡只剩下他、你、我。我需要你幫一個忙。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-last',
        prompt: '最後一夜，你要：',
        options: [
          {
            id: 'help',
            text: '「我幫你。」',
            flag: 'helpedHer',
            reply: [{ who: 老闆娘, text: '三點鐘，把交誼廳的燈關掉。其他的，不用你做。' }],
          },
          {
            id: 'warn',
            text: '回房間之前，敲了黎先生的門。',
            flag: 'warnedLi',
            reply: [
              { text: '你把老闆娘說的話，全部告訴了他。' },
              { text: '走廊的燈下，黎先生的臉一點血色都沒有。' },
              { who: '黎先生', text: '……謝謝你。' },
            ],
          },
          {
            id: 'out',
            text: '「這不關我的事。」回房間，把門鎖上。',
            flag: 'lockedIn',
            reply: [{ who: 老闆娘, text: '也好。你本來就只是來打工的。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '第四天早上，葛老先生不見了。' },
        { text: '他的筆記本留在交誼廳的桌上，翻開在畫了紅圈的那一頁。' },
      ],
    },
  ],
  bigClues: [
    '葛老先生是十年前辦案的警察。十年前的颱風夜，一台黑色的車在舊吊橋前撞了小晴，沒有停。',
    '當年的目擊者，是跟小晴一起走回家的同學小鄒。',
    '葛老先生在黎先生的舊照片裡，看到了那台車的完整車牌。',
    '老闆娘坦白：不見的房客都在後山的舊茶寮，都是她請來的。只有黎先生是被騙上山的。',
    '老闆娘說：「我不想報仇。」',
  ],
  bigUnlocks: ['ge', 'notebook', 'plate', 'hitrun', 'oldphoto', 'confession'],
};
