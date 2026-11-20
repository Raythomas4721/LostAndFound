import type { Night, Soup } from '../../engine/types';

const 季伯 = '季伯';
const 你 = '你';

/**
 * 第四夜：每天早上變成雪花的十二樓錄影。是季伯每天 06:05 親手刪的。
 * 小湯不能說謊，所以這一碗的湯底就是季伯的坦白；之後大湯裡的謊話會被更正。
 */
const soup: Soup = {
  id: 'snow',
  title: '早上六點的雪花',
  kind: 'small',
  surface: [
    { text: '交班前，你照規定備份昨晚的錄影。十六格，十五格都正常。' },
    { text: '十二樓那一格，從凌晨零點到早上六點，全是雪花。' },
    { text: '你往前翻：前一天也是。再前一天也是。往前翻到最後，八年來的每一天，十二樓的錄影都是雪花。' },
    { text: '系統紀錄寫著：每天 06:05，手動刪除。操作帳號：JI-01。' },
    { text: '季伯上個月就退休了。可是他每天晚上，都還來警衛室坐。' },
    { who: 季伯, text: '……問吧。這一碗，我不騙你。' },
  ],
  start: ['ji', 'you', 'footage', 'account', 'snowimg', 'floor12', 'elevator', 'deleted', 'broken', 'sixofive', 'three'],
  keywords: [
    { id: 'ji', label: '季伯', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'someone', label: '1203 裡的人', category: '人物' },
    { id: 'jianru', label: '簡如', category: '人物' },
    { id: 'wei', label: '魏先生', category: '人物' },

    { id: 'footage', label: '十二樓的錄影', category: '物品' },
    { id: 'account', label: 'JI-01 帳號', category: '物品' },
    { id: 'snowimg', label: '雪花', category: '物品' },

    { id: 'floor12', label: '十二樓', category: '地點' },
    { id: 'elevator', label: '電梯', category: '地點' },
    { id: 'firestairs', label: '逃生梯', category: '地點' },

    { id: 'deleted', label: '手動刪除', category: '事情' },
    { id: 'broken', label: '監視器壞了', category: '事情' },
    { id: 'only12', label: '只刪十二樓', category: '事情' },
    { id: 'hiding', label: '躲在 1203', category: '事情' },
    { id: 'protect', label: '不讓他找到她', category: '事情' },
    { id: 'nightjob', label: '夜班工作', category: '事情' },

    { id: 'sixofive', label: '06:05', category: '時間' },
    { id: 'three', label: '凌晨三點', category: '時間' },
    { id: 'eightyears', label: '八年', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-syslog',
      art: 'syslog',
      name: '錄影主機的系統紀錄',
      description: '一台很舊的錄影主機。螢幕上一行一行的綠色字，每一行都長得一樣。',
      hotspots: [
        { id: 'hs-pass', at: [80, 16], name: '帳號設定', label: 'JI-01 的密碼，八年沒有改過。', unlocks: [] },
        { id: 'hs-only', at: [86, 50], name: '刪除的範圍', label: '每天刪除的，只有 CAM-12 這一支。其他十五支，一支都沒動過。', unlocks: ['only12'] },
        { id: 'hs-first', at: [40, 86], name: '第一筆紀錄', label: '第一筆刪除紀錄，是八年前的十二月。那個月，1203 登記「住戶遷出」。', unlocks: ['eightyears'] },
      ],
    },
  ],
  questions: [
    // 監視器壞了、雪花
    { id: 'q-b-broken', topic: 'broken', text: '十二樓的監視器壞了嗎？', reply: '不是' },
    { id: 'q-s-real', topic: 'snowimg', text: '雪花是錄影被洗掉以後留下的嗎？', reply: '是' },
    // 手動刪除、帳號
    { id: 'q-d-ji', topic: 'deleted', text: '每天刪錄影的是季伯嗎？', reply: '是' },
    { id: 'q-a-other', topic: 'account', text: '有別人知道這個帳號的密碼嗎？', reply: '不是' },
    // 只刪十二樓
    { id: 'q-o-why', topic: 'only12', text: '只刪十二樓，是因為十二樓拍到了不該拍到的人嗎？', reply: '是', unlocks: ['someone'] },
    // 1203 裡的人
    { id: 'q-so-live', topic: 'someone', text: '1203 一直有人住嗎？', reply: '是', say: '八年，一天都沒有離開過這棟樓。', unlocks: ['hiding'] },
    { id: 'q-so-ru', topic: 'someone', text: '1203 裡的人，就是簡如嗎？', reply: '是', unlocks: ['jianru'] },
    { id: 'q-so-ghost', topic: 'someone', text: '1203 裡的是鬼嗎？', reply: '不是' },
    // 簡如
    { id: 'q-j-hide', topic: 'jianru', text: '簡如在躲魏先生嗎？', reply: '是', unlocks: ['wei'] },
    { id: 'q-j-out', topic: 'jianru', text: '她每天晚上都會出門嗎？', reply: '是', say: '在巷口的二十四小時麵店洗碗。三點下班。', unlocks: ['nightjob', 'three'] },
    // 躲在 1203
    { id: 'q-h-why', topic: 'hiding', text: '她躲起來，是因為怕某個人嗎？', reply: '是', unlocks: ['wei'] },
    // 凌晨三點、電梯、逃生梯
    { id: 'q-3-home', topic: 'three', text: '三點十二樓的燈亮，是她下班回來嗎？', reply: '是' },
    { id: 'q-el-no', topic: 'elevator', text: '她回來的時候，搭電梯嗎？', reply: '不是', say: '電梯裡有鏡頭，紀錄也查得到。', unlocks: ['firestairs'] },
    { id: 'q-12-stairs', topic: 'floor12', text: '她是走樓梯上十二樓的嗎？', reply: '是', say: '逃生梯。整條樓梯，只有十二樓的出口有鏡頭。', unlocks: ['firestairs'] },
    // 魏先生
    { id: 'q-w-tape', topic: 'wei', text: '季伯刪錄影，是為了不讓魏先生找到她嗎？', reply: '是', unlocks: ['protect'] },
    // 季伯
    { id: 'q-ji-why', topic: 'ji', text: '季伯退休了還每天來，是為了刪錄影嗎？', reply: '是', say: '新來的人不知道要刪。' },
    { id: 'q-ji-family', topic: 'ji', text: '季伯是簡如的家人嗎？', reply: '不是' },
    // 其他
    { id: 'q-605', topic: 'sixofive', text: '06:05 這個時間很重要嗎？', reply: '是', say: '錄影主機每天六點把前一晚的檔案存好。存好了，才刪得掉。' },
    { id: 'q-you', topic: 'you', text: '季伯本來想讓我也每天刪嗎？', reply: '是也不是', say: '他本來想自己刪到不能來為止。' },
    { id: 'q-ft-keep', topic: 'footage', text: '昨晚十二樓的錄影，現在還在主機裡嗎？', reply: '是', say: '今天早上，季伯還沒刪。' },
    { id: 'q-8', topic: 'eightyears', text: '八年前，她就搬進 1203 了嗎？', reply: '不是', say: '她在 1203 住了更久。八年前，是她「搬走」的時候。' },
    { id: 'q-nj', topic: 'nightjob', text: '她的工作需要用到本名嗎？', reply: '不重要' },
  ],
  board: [
    { id: 's1', time: '06:05', text: '每天早上洗掉十二樓錄影的，是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'ji' }] },
    { id: 's2', time: '八年', text: '1203 沒有空過。{b2}一直住在裡面。', blanks: [{ id: 'b2', category: '人物', answer: 'jianru' }] },
    { id: 's3', time: '03:00', text: '她每天三點下班，走{b3}回十二樓，不搭電梯。', blanks: [{ id: 'b3', category: '地點', answer: 'firestairs' }] },
    { id: 's4', time: '06:05', text: '季伯刪掉錄影，是為了{b4}。', blanks: [{ id: 'b4', category: '事情', answer: 'protect' }] },
  ],
  reveal: [
    { who: 季伯, text: '1203 沒有空過。簡如一直住在裡面。' },
    { who: 季伯, text: '八年前，她從他身邊逃出來。他找得到她的每一個地址，所以她「搬走」了：登記遷出，信箱拿掉名字，連水電都改成我的名字。' },
    { who: 季伯, text: '她在巷口的麵店洗碗，三點下班。回來不搭電梯，走逃生梯。整條逃生梯，只有十二樓的出口有鏡頭。' },
    { who: 季伯, text: '所以每天早上六點，主機存好檔，我就把十二樓那一支刪掉。八年。' },
    { who: 季伯, text: '我退休了。新來的人不知道要刪。所以我每天晚上都來坐。' },
    { text: '季伯把一張摺得很小的紙放在你面前。上面寫著一串密碼。' },
    { who: 季伯, text: '昨天晚上的，我還沒刪。' },
  ],
};

export const night4: Night = {
  n: 4,
  title: '第四夜',
  ambience: 'hum',
  intro: [
    { text: '第四夜。主委在你的櫃台上留了一張紙條：「保險公司魏先生，週五晚上會帶公文來調閱十二樓錄影，請配合。」' },
    { text: '季伯看完紙條，把它對摺，再對摺。' },
    { who: 你, text: '十二樓的錄影，到底拍到了什麼？' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { who: 季伯, text: '這個禮拜，你問我的事，有幾件我騙了你。' },
        { who: 季伯, text: '那隻狗，是簡如的。她不能養，牠一叫，整層樓都會知道 1203 有人。宋太太就替她養。' },
        { who: 季伯, text: '齊老先生收的藥，也是她的。她不能用自己的名字看醫生。' },
        { who: 季伯, text: '這棟樓，知道的人不多。可是知道的人，都在替她藏。' },
        { who: 你, text: '魏先生禮拜五會帶公文來。' },
        { who: 季伯, text: '公文是假的。可是主委不知道。' },
        { who: 季伯, text: '禮拜五晚上，我不來了。我老了，太顯眼。錄影在你手上。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-final',
        prompt: '禮拜五晚上，魏先生來拿十二樓的錄影。你決定：',
        options: [
          {
            id: 'erase',
            text: '跟季伯一樣，早上六點，把錄影刪掉。',
            flag: 'erased',
            reply: [{ who: 季伯, text: '……謝謝。' }, { text: '他把那張寫著密碼的紙，留在了你的抽屜裡。' }],
          },
          {
            id: 'police',
            text: '把錄影、假名片和信箱的照片，一起交給警察。',
            flag: 'police',
            reply: [{ who: 季伯, text: '警察要她自己出面。' }, { who: 你, text: '那就讓她知道，這次不是她一個人。' }, { text: '季伯看了你很久。' }],
          },
          {
            id: 'give',
            text: '照主委說的，把錄影交給他。這是規定。',
            flag: 'gave',
            reply: [{ text: '季伯沒有說話。他把茶喝完，杯子洗乾淨，放回櫃子裡。' }, { text: '那是你最後一次在警衛室看到他。' }],
          },
        ],
      },
    },
  ],
  bigClues: [
    '十二樓的錄影，八年來每天 06:05 被季伯親手刪掉。',
    '1203 沒有空過，簡如一直住在裡面。她躲的是前夫魏先生。',
    '季伯坦白：宋太太養的狗是簡如的；齊老先生收的藥也是她的。',
    '季伯說：這個禮拜，有幾件事他騙了你。',
  ],
  bigUnlocks: ['confession', 'jianru', 'eightyears'],
};
