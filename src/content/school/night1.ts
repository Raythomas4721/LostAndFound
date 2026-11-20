import type { Night, Soup } from '../../engine/types';

const 廖伯 = '廖伯';
const 你 = '你';

/** 第一夜：每天多一行的粉筆字。是四十年前的舊字，石板受潮才浮出來；今晚是你用濕抹布擦，才一次全回來。 */
const soup: Soup = {
  id: 'chalk',
  title: '多一行的粉筆字',
  kind: 'small',
  surface: [
    { text: '二樓的六年級教室，已經十年沒有學生了。全校七個孩子，都擠在一樓上課。' },
    { text: '這幾天，你每天早上經過那間教室，黑板上都有很淡的粉筆字。一行一個名字。每天早上，都多一行。' },
    { text: '那間教室的鑰匙，只有廖伯有。' },
    { text: '今天放學後，你拿濕抹布，把黑板仔仔細細擦了一遍。' },
    { text: '半夜巡堂，你再推開那間教室的門。' },
    { text: '黑板上，二十三個名字，一行一行，全都回來了。最下面，還有歪歪扭扭的第二十四行。' },
    { text: '門口，廖伯的手電筒照了過來。' },
    { who: 廖伯, text: '想知道，就問。我只說是、不是。' },
  ],
  start: ['you', 'liao', 'students', 'board', 'chalk', 'rag', 'key', 'classroom', 'ghost', 'prank', 'appear', 'everymorning', 'midnight'],
  keywords: [
    { id: 'you', label: '你', category: '人物' },
    { id: 'liao', label: '廖伯', category: '人物' },
    { id: 'students', label: '現在的學生', category: '人物' },
    { id: 'teacher', label: '當年的導師', category: '人物' },
    { id: 'child', label: '一個孩子', category: '人物' },

    { id: 'board', label: '黑板', category: '物品' },
    { id: 'chalk', label: '粉筆字', category: '物品' },
    { id: 'rag', label: '濕抹布', category: '物品' },
    { id: 'key', label: '教室鑰匙', category: '物品' },
    { id: 'line24', label: '第二十四行', category: '物品' },

    { id: 'classroom', label: '六年級教室', category: '地點' },

    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'prank', label: '惡作劇', category: '事情' },
    { id: 'appear', label: '浮出來', category: '事情' },
    { id: 'nodust', label: '沒有新的粉筆灰', category: '事情' },
    { id: 'adulthand', label: '大人的字', category: '事情' },
    { id: 'damp', label: '受潮', category: '事情' },
    { id: 'wetwipe', label: '用濕抹布擦', category: '事情' },

    { id: 'everymorning', label: '每天早上', category: '時間' },
    { id: 'midnight', label: '半夜', category: '時間' },
    { id: 'forty', label: '四十年前', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-board',
      art: 'blackboard',
      name: '六年級教室的黑板',
      description: '一整塊深綠色的石板黑板，邊框的木頭都裂了。字很淡，要斜著看才看得清楚。',
      hotspots: [
        { id: 'hs-names', at: [6, 22], name: '前面的名字', label: '二十三個名字，筆跡很工整，一筆一畫，是大人的字。', unlocks: ['adulthand'] },
        { id: 'hs-24', at: [22, 80], name: '第二十四行', label: '最後一行寫得很低，歪歪的，只有兩個字。第一個是「阿」，第二個看不清楚。', unlocks: ['line24'] },
        { id: 'hs-tray', at: [86, 92], name: '粉筆槽', label: '粉筆槽是乾的。沒有新的粉筆灰，也沒有粉筆。', unlocks: ['nodust'] },
      ],
    },
  ],
  questions: [
    // 粉筆字
    { id: 'q-c-new', topic: 'chalk', text: '字是最近才寫上去的嗎？', reply: '不是' },
    { id: 'q-c-old', topic: 'chalk', text: '字是很久以前寫的嗎？', reply: '是', say: '四十年前。畢業那一天。', unlocks: ['forty'] },
    // 沒有粉筆灰
    { id: 'q-nd-none', topic: 'nodust', text: '這幾天，有人在這塊黑板上寫過字嗎？', reply: '不是' },
    // 浮出來
    { id: 'q-a-self', topic: 'appear', text: '字是自己浮出來的嗎？', reply: '是也不是', say: '它們一直都在。' },
    { id: 'q-a-weather', topic: 'appear', text: '字浮出來，跟天氣有關嗎？', reply: '是', say: '山上起霧的晚上，石板會吸水。', unlocks: ['damp'] },
    // 每天早上
    { id: 'q-m-more', topic: 'everymorning', text: '起霧的日子，字就多一點嗎？', reply: '是', unlocks: ['damp'] },
    // 黑板
    { id: 'q-b-old', topic: 'board', text: '黑板很舊嗎？', reply: '是', say: '石板的。比我還老。' },
    { id: 'q-b-wipe', topic: 'board', text: '黑板上的字擦得掉嗎？', reply: '是也不是', say: '擦得掉上面那一層。' },
    // 濕抹布
    { id: 'q-r-cause', topic: 'rag', text: '字一次全部回來，是因為我用了濕抹布嗎？', reply: '是', unlocks: ['wetwipe'] },
    // 你
    { id: 'q-y-did', topic: 'you', text: '是我做的事，讓字跑出來的嗎？', reply: '是', say: '你用濕的擦了，對吧。', unlocks: ['wetwipe'] },
    // 廖伯
    { id: 'q-l-dry', topic: 'liao', text: '廖伯每天都會擦這塊黑板嗎？', reply: '是', say: '用乾的板擦。四十年，都用乾的。' },
    { id: 'q-l-write', topic: 'liao', text: '字是廖伯寫的嗎？', reply: '不是' },
    // 鑰匙、教室
    { id: 'q-k-only', topic: 'key', text: '晚上有人偷偷進來過嗎？', reply: '不是' },
    { id: 'q-cl-why', topic: 'classroom', text: '這間教室十年沒用，是因為鬧鬼嗎？', reply: '不是', say: '是沒有六年級了。' },
    // 鬧鬼、惡作劇
    { id: 'q-ghost', topic: 'ghost', text: '是鬼寫的嗎？', reply: '不是' },
    { id: 'q-prank', topic: 'prank', text: '是學生的惡作劇嗎？', reply: '不是' },
    { id: 'q-st', topic: 'students', text: '現在的學生跟這件事有關嗎？', reply: '不是' },
    // 大人的字、導師
    { id: 'q-ah-teacher', topic: 'adulthand', text: '前面那些字，是老師寫的嗎？', reply: '是', unlocks: ['teacher'] },
    { id: 'q-t-names', topic: 'teacher', text: '老師寫的是那一屆學生的名字嗎？', reply: '是', say: '畢業那天，一個一個寫上去的。二十三個。' },
    // 第二十四行、孩子
    { id: 'q-24-same', topic: 'line24', text: '第二十四行跟前面是同一個人寫的嗎？', reply: '不是' },
    { id: 'q-24-kid', topic: 'line24', text: '第二十四行是小孩子寫的嗎？', reply: '是', say: '他踮著腳，也只寫得到那麼高。', unlocks: ['child'] },
    { id: 'q-ch-class', topic: 'child', text: '那個孩子也是那一屆的嗎？', reply: '是也不是', say: '他在那間教室，坐了六年。' },
    { id: 'q-ch-liao', topic: 'child', text: '廖伯認識那個孩子嗎？', reply: '是', say: '……問別的。' },
    // 時間
    { id: 'q-mid', topic: 'midnight', text: '半夜這個時間很重要嗎？', reply: '不重要' },
    { id: 'q-forty', topic: 'forty', text: '四十年前，這塊黑板就在這間教室了嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '黑板上的字，是{b1}寫的。', blanks: [{ id: 'b1', category: '時間', answer: 'forty' }] },
    { id: 's2', text: '石板{b2}，舊字就會一點一點浮出來。', blanks: [{ id: 'b2', category: '事情', answer: 'damp' }] },
    { id: 's3', text: '今晚一次全部回來，是因為{b3}。', blanks: [{ id: 'b3', category: '事情', answer: 'wetwipe' }] },
    { id: 's4', text: '最後那一行又小又低，是{b4}自己寫上去的。', blanks: [{ id: 'b4', category: '人物', answer: 'child' }] },
  ],
  reveal: [
    { who: 廖伯, text: '那是石板黑板。粉筆寫久了，字會吃進石頭裡。' },
    { who: 廖伯, text: '四十年前畢業那天，林老師把全班二十三個名字，一個一個寫在上面。' },
    { who: 廖伯, text: '起霧的晚上，石板吸了水，舊字就會浮出來一點。所以你每天早上看到的，都多一行。' },
    { who: 廖伯, text: '你今天用濕抹布擦，整塊都濕透了。四十年前的字，一次全部回來。' },
    { who: 廖伯, text: '最後那一行，是典禮結束以後，一個孩子踮著腳，自己寫上去的。' },
    { text: '廖伯拿起乾的板擦，把第二十四行輕輕擦掉。擦完了，他站在黑板前面，很久沒有動。' },
  ],
};

export const night1: Night = {
  n: 1,
  title: '第一夜',
  ambience: 'school',
  intro: [
    { text: '鷺嶺國小在山上，全校只剩七個學生。這學期結束，就要廢校了。' },
    { text: '你是代課老師。最後一個禮拜，學校要你跟老校工廖伯輪流值夜。' },
    { who: 廖伯, text: '晚上就是巡堂、關燈、鎖門。鎖門之前，問一聲「還有沒有人」。' },
    { text: '他帶你去校史室拿鑰匙。牆上掛著一張很舊的畢業照：「第三十八屆畢業紀念」。' },
    { text: '照片下面的名冊寫著二十三個名字。可是照片裡，有二十四個孩子。' },
    { text: '最後一排最邊邊那一個，臉被一團白光遮住了。' },
    { who: 你, text: '這裡多了一個人。' },
    { who: 廖伯, text: '那屆是二十三個。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-board',
        prompt: '黑板還是濕的，二十四行字都還在。你：',
        options: [
          {
            id: 'photo',
            text: '在字消失以前，用手機拍下來。',
            flag: 'keptBoard',
            reply: [{ text: '你按下快門。閃光燈一亮，最後那一行字，在照片上反而最清楚。' }],
          },
          {
            id: 'leave',
            text: '關上門，讓它自己乾。',
            reply: [{ text: '你關上門。走廊盡頭，廖伯的手電筒光停在樓梯口，等你一起下樓。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '凌晨兩點，你在值夜室被吵醒。' },
        { text: '走廊的喇叭沙沙作響。一個女人的聲音，很慢地說：' },
        { who: '廣播', text: '一號，王志明。' },
        { text: '一個小孩的聲音回答：「有。」' },
        { text: '然後廣播就斷了。' },
      ],
    },
  ],
  bigClues: [
    '湯面：校史室那張四十年前的畢業照，名冊上是二十三個學生，照片裡有二十四個。多出來的那個站在最後一排最邊邊，臉被一團白光遮住了。',
    '廖伯說：「那屆是二十三個。」',
    '六年級教室的黑板上，四十年前的二十三個名字下面，還有一行又小又低的第二十四行：「阿□」。',
  ],
  bigUnlocks: ['board'],
};
