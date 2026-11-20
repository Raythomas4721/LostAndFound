import type { Soup } from '../../engine/types';

const 季伯 = '季伯';

/**
 * 十二樓沒有人的大湯。推理板是一條時間軸（timeline 規則）。
 * 季伯在第四夜坦白（解鎖 confession）之前，標了 hesitant 的題目都是謊話。
 */
export const bigSoup: Soup = {
  id: 'big-1203',
  title: '十二樓沒有人',
  kind: 'big',
  surface: [
    { text: '1203 登記空屋八年。每天凌晨三點，十二樓走廊的燈會亮，1203 的門會打開。' },
    { text: '可是電梯紀錄裡，從來沒有人到過十二樓。' },
    { who: 季伯, text: '十二樓，沒有人。' },
  ],
  start: ['ji', 'you', 'floor12', 'unit1203', 'elevator', 'elevatorlog', 'nobody', 'lighton', 'noelevator', 'three'],
  keywords: [
    { id: 'ji', label: '季伯', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'jianru', label: '簡如', category: '人物' },
    { id: 'wei', label: '魏先生', category: '人物' },
    { id: 'song', label: '宋太太', category: '人物' },
    { id: 'qi', label: '齊老先生', category: '人物' },
    { id: 'dog', label: '看不見的老狗', category: '人物' },

    { id: 'elevatorlog', label: '電梯紀錄', category: '物品' },
    { id: 'footage', label: '十二樓的錄影', category: '物品' },
    { id: 'medicine', label: '四樓之二的藥', category: '物品' },

    { id: 'floor12', label: '十二樓', category: '地點' },
    { id: 'unit1203', label: '1203', category: '地點' },
    { id: 'elevator', label: '電梯', category: '地點' },
    { id: 'firestairs', label: '逃生梯', category: '地點' },
    { id: 'restaurant', label: '巷口的麵店', category: '地點' },

    { id: 'nobody', label: '十二樓沒有人', category: '事情' },
    { id: 'lighton', label: '三點燈亮', category: '事情' },
    { id: 'noelevator', label: '電梯沒停過', category: '事情' },
    { id: 'nameless', label: '不能用自己的名字', category: '事情' },
    { id: 'erase', label: '刪掉錄影', category: '事情' },
    { id: 'wholebuilding', label: '整棟樓在替她藏', category: '事情' },
    { id: 'confession', label: '季伯的坦白', category: '事情' },

    { id: 'three', label: '凌晨三點', category: '時間' },
    { id: 'eightyears', label: '八年', category: '時間' },
  ],
  evidence: [],
  questions: [
    // 十二樓沒有人（謊）
    { id: 'n-empty', topic: 'nobody', text: '1203 真的沒有人住嗎？', reply: '是', hesitant: true, say: '……沒有。' },
    { id: 'n-empty-t', topic: 'nobody', text: '1203 真的沒有人住嗎？', reply: '不是', corrects: 'n-empty', requires: ['confession'], say: '一直都有。' },
    { id: 'n-many', topic: 'nobody', text: '這棟樓有別人知道 1203 有人嗎？', reply: '是也不是', requires: ['song', 'qi'], say: '知道的人不多。知道的，都在替她藏。', unlocks: ['wholebuilding'] },
    { id: 'n-ghost', topic: 'nobody', text: '十二樓鬧鬼嗎？', reply: '不是' },

    // 三點燈亮（謊）
    { id: 'l-auto', topic: 'lighton', text: '三點的燈，是感應燈自己壞掉亮的嗎？', reply: '是', hesitant: true, say: '……老樓了。' },
    { id: 'l-auto-t', topic: 'lighton', text: '三點的燈，是感應燈自己壞掉亮的嗎？', reply: '不是', corrects: 'l-auto', requires: ['confession'], say: '是她開的。她回家了。' },

    // 電梯沒停過
    { id: 'e-stairs', topic: 'noelevator', text: '電梯沒停過十二樓，是因為有人走樓梯上去嗎？', reply: '是', unlocks: ['firestairs'] },
    { id: 'e-log', topic: 'elevatorlog', text: '電梯紀錄被改過嗎？', reply: '不是' },
    { id: 'f-cam', topic: 'firestairs', text: '逃生梯裡有監視器嗎？', reply: '是也不是', say: '整條樓梯，只有十二樓的出口有。' },

    // 錄影（謊）
    { id: 'f-system', topic: 'footage', text: '十二樓的錄影，是系統自己壞掉的嗎？', reply: '是', hesitant: true, say: '……那台主機很舊了。' },
    { id: 'f-system-t', topic: 'footage', text: '十二樓的錄影，是系統自己壞掉的嗎？', reply: '不是', corrects: 'f-system', requires: ['confession'], say: '是我每天早上刪的。', unlocks: ['erase'] },
    { id: 'f-erase', topic: 'footage', text: '每天早上，都有人把十二樓的錄影刪掉嗎？', reply: '是', unlocks: ['erase'] },
    { id: 'f-find', topic: 'footage', text: '那段錄影能讓魏先生找到她嗎？', reply: '是', requires: ['wei'] },

    // 季伯（謊）
    { id: 'j-know', topic: 'ji', text: '季伯認識 1203 以前的房客嗎？', reply: '不是', hesitant: true, say: '……不熟。' },
    { id: 'j-know-t', topic: 'ji', text: '季伯認識 1203 以前的房客嗎？', reply: '是', corrects: 'j-know', requires: ['confession'], say: '水電，是用我的名字繳的。' },
    { id: 'j-retire', topic: 'ji', text: '季伯退休了還每天來，跟十二樓有關嗎？', reply: '是' },

    // 簡如
    { id: 'r-alive', topic: 'jianru', text: '簡如還活著嗎？', reply: '是' },
    { id: 'r-work', topic: 'jianru', text: '她每天晚上都出門工作嗎？', reply: '是', say: '在巷口的二十四小時麵店洗碗。', unlocks: ['restaurant'] },
    { id: 'r-wife', topic: 'jianru', text: '簡如是魏先生的前妻嗎？', reply: '是' },
    { id: 'r-name', topic: 'jianru', text: '她不能用自己的名字，是怕被魏先生找到嗎？', reply: '是', unlocks: ['nameless'] },

    // 三點
    { id: 't-home', topic: 'three', text: '三點是 1203 的人下班回家的時間嗎？', reply: '是', requires: ['jianru'], unlocks: ['restaurant'] },

    // 狗、宋太太
    { id: 'd-1203', topic: 'dog', text: '那隻狗跟 1203 有關嗎？', reply: '是', say: '牠一叫，整層樓都會知道 1203 有人。' },
    { id: 'd-foster', topic: 'dog', text: '狗是宋太太替別人養的嗎？', reply: '是', unlocks: ['song'] },
    { id: 's-know', topic: 'song', text: '宋太太知道 1203 有人嗎？', reply: '是' },

    // 齊老先生、藥
    { id: 'm-1203', topic: 'medicine', text: '四樓之二的藥，是給 1203 的人的嗎？', reply: '是' },
    { id: 'q-know', topic: 'qi', text: '齊老先生知道 1203 有人嗎？', reply: '是' },

    // 魏先生
    { id: 'w-why', topic: 'wei', text: '魏先生要錄影，是為了找到她嗎？', reply: '是' },
    { id: 'w-paper', topic: 'wei', text: '魏先生的公文是真的嗎？', reply: '不是' },

    // 其他
    { id: 'u-water', topic: 'unit1203', text: '1203 一直有在用水電嗎？', reply: '是', say: '很少，可是一直有。' },
    { id: 'y-tape', topic: 'you', text: '昨晚十二樓的錄影，現在在我手上嗎？', reply: '是', requires: ['confession'] },
    { id: 'e8', topic: 'eightyears', text: '八年前，她是假裝搬走的嗎？', reply: '是' },
    { id: 'el-cam', topic: 'elevator', text: '電梯裡有監視器嗎？', reply: '是' },
    { id: 'fl-who', topic: 'floor12', text: '十二樓還有別的住戶嗎？', reply: '不重要' },
  ],
  board: [
    {
      id: 'g1',
      time: '03:00',
      text: '{c1}從{c2}下班回來。',
      blanks: [
        { id: 'c1', category: '人物', answer: 'jianru' },
        { id: 'c2', category: '地點', answer: 'restaurant' },
      ],
    },
    { id: 'g1b', time: '03:00', text: '她走{c3}回十二樓。所以電梯從來沒停過。', blanks: [{ id: 'c3', category: '地點', answer: 'firestairs' }] },
    { id: 'g2', time: '03:01', text: '1203 的燈亮了。她不能用自己的名字，因為她在躲{c4}。', blanks: [{ id: 'c4', category: '人物', answer: 'wei' }] },
    {
      id: 'g3',
      time: '06:00',
      text: '她的藥，{c5}用舊門牌替她收；她的狗，{c6}替她養。',
      blanks: [
        { id: 'c5', category: '人物', answer: 'qi' },
        { id: 'c6', category: '人物', answer: 'song' },
      ],
    },
    {
      id: 'g4',
      time: '06:05',
      text: '{c7}每天{c8}。',
      blanks: [
        { id: 'c7', category: '人物', answer: 'ji' },
        { id: 'c8', category: '事情', answer: 'erase' },
      ],
    },
    { id: 'g5', time: '八年', text: '這棟樓知道的人不多，可是{c9}。', blanks: [{ id: 'c9', category: '事情', answer: 'wholebuilding' }] },
  ],
  reveal: [
    { who: 季伯, text: '八年前，簡如從他身邊逃出來。他找得到她的每一個地址。' },
    { who: 季伯, text: '所以她「搬走」了。登記遷出，信箱拿掉名字，水電改成我的名字。可是她哪裡都沒去。' },
    { who: 季伯, text: '她在巷口的麵店洗碗，三點下班，走逃生梯回來。電梯裡有鏡頭，她從來不搭。' },
    { who: 季伯, text: '她的藥，齊老師用舊門牌替她收。她的狗，宋太太替她養。' },
    { who: 季伯, text: '整條逃生梯，只有十二樓的出口有鏡頭。所以每天早上六點零五分，我把那一支刪掉。' },
    { who: 季伯, text: '這棟樓，知道的人不多。知道的，都說：十二樓，沒有人。' },
    { text: '牆上的第十六格，十二樓的走廊。燈是暗的。' },
    { who: 季伯, text: '明天，他就來了。' },
  ],
};
