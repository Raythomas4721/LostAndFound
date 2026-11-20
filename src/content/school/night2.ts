import type { Night, Soup } from '../../engine/types';

const 廖伯 = '廖伯';
const 小葵 = '小葵';
const 你 = '你';

/** 第二夜：半夜的點名廣播。是廖伯定時放的四十年前點名錄音；喊你名字的，是小葵錄在後面的練習。 */
const soup: Soup = {
  id: 'rollcall',
  title: '半夜的點名',
  kind: 'small',
  surface: [
    { text: '第二夜，兩點。廣播又響了。這一次，你走到廣播室門口聽。' },
    { text: '一個女人的聲音，很慢地點名。「一號，王志明。」「有。」「二號……」每一聲「有」，都是不同的小孩。' },
    { text: '點到二十三號，停了很久。' },
    { text: '然後，一個小女孩的聲音說：「代課老師——」接著，喊了你的名字。' },
    { text: '廣播室的門是鎖著的。從門縫看進去，裡面一個人都沒有。只有一台錄音機的小紅燈亮著。' },
    { text: '你背後傳來廖伯的聲音：' },
    { who: 廖伯, text: '你聽到自己的名字了？' },
  ],
  start: ['you', 'liao', 'woman', 'girlvoice', 'recorder', 'room', 'rollcall', 'yourname', 'ghost', 'two'],
  keywords: [
    { id: 'you', label: '你', category: '人物' },
    { id: 'liao', label: '廖伯', category: '人物' },
    { id: 'woman', label: '點名的女人', category: '人物' },
    { id: 'girlvoice', label: '小女孩的聲音', category: '人物' },
    { id: 'lin', label: '林老師', category: '人物' },
    { id: 'kui', label: '小葵', category: '人物' },

    { id: 'recorder', label: '錄音機', category: '物品' },
    { id: 'timer', label: '定時器', category: '物品' },

    { id: 'room', label: '廣播室', category: '地點' },

    { id: 'rollcall', label: '點名', category: '事情' },
    { id: 'yourname', label: '喊了你的名字', category: '事情' },
    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'graduation', label: '畢業典禮', category: '事情' },
    { id: 'newpart', label: '後面錄了新的', category: '事情' },
    { id: 'practice', label: '練習', category: '事情' },
    { id: 'ceremony', label: '廢校典禮', category: '事情' },

    { id: 'two', label: '兩點', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-recorder',
      art: 'recorder',
      name: '廣播室的錄音機',
      description: '一台很舊的卡式錄音機，接在廣播的總開關上。廖伯用鑰匙開了門，讓你進來看。',
      hotspots: [
        { id: 'hs-timer', at: [10, 72], name: '插頭', label: '錄音機的插頭接在一個舊式定時器上，指針停在「2:00」。', unlocks: ['timer'] },
        { id: 'hs-label', at: [84, 30], name: '帶子的標籤', label: '「第三十八屆　畢業典禮　點名」。字很娟秀，是女老師的字。', unlocks: ['graduation'] },
        { id: 'hs-counter', at: [95, 70], name: '計數器', label: '計數器跑到很後面。帶子在二十三號之後，接了一段新錄的東西。', unlocks: ['newpart'] },
      ],
    },
  ],
  questions: [
    // 點名的女人
    { id: 'q-w-ghost', topic: 'woman', text: '點名的女人是鬼嗎？', reply: '不是' },
    { id: 'q-w-teacher', topic: 'woman', text: '點名的女人是老師嗎？', reply: '是', say: '林老師。那一屆的導師。', unlocks: ['lin'] },
    { id: 'q-w-alive', topic: 'woman', text: '點名的女人還活著嗎？', reply: '不重要' },
    // 小女孩的聲音
    { id: 'q-g-old', topic: 'girlvoice', text: '小女孩是四十年前的學生嗎？', reply: '不是' },
    { id: 'q-g-now', topic: 'girlvoice', text: '小女孩是現在的學生嗎？', reply: '是', say: '全校最大的那一個。', unlocks: ['kui'] },
    // 喊你的名字
    { id: 'q-y-call', topic: 'yourname', text: '喊我的名字，是在叫我過去嗎？', reply: '不是' },
    { id: 'q-y-rec', topic: 'yourname', text: '有人特地把我的名字錄進去嗎？', reply: '是', unlocks: ['practice'] },
    // 錄音機、定時器
    { id: 'q-r-self', topic: 'recorder', text: '錄音機是自己開起來的嗎？', reply: '是也不是', say: '有東西替它開。', unlocks: ['timer'] },
    { id: 'q-t-liao', topic: 'timer', text: '定時器是廖伯設的嗎？', reply: '是', say: '很多年前就設好了。' },
    // 廖伯
    { id: 'q-l-every', topic: 'liao', text: '廖伯每天晚上都放這捲帶子嗎？', reply: '是' },
    { id: 'q-l-knew', topic: 'liao', text: '廖伯早就知道帶子被錄了新的嗎？', reply: '不是', say: '今天晚上才知道。' },
    // 新錄的、練習、典禮
    { id: 'q-n-recent', topic: 'newpart', text: '後面那一段是最近才錄的嗎？', reply: '是', unlocks: ['practice'] },
    { id: 'q-p-what', topic: 'practice', text: '錄的人是在練習什麼嗎？', reply: '是', say: '禮拜五最後一次典禮，要點名。全校七個人，加上老師。', unlocks: ['ceremony'] },
    { id: 'q-c-last', topic: 'ceremony', text: '廢校典禮是這個禮拜五嗎？', reply: '是' },
    { id: 'q-gr-old', topic: 'graduation', text: '前面那一段，是四十年前的畢業典禮嗎？', reply: '是' },
    // 小葵
    { id: 'q-k-scare', topic: 'kui', text: '小葵是故意嚇我的嗎？', reply: '不是' },
    { id: 'q-k-know', topic: 'kui', text: '小葵知道帶子前面錄著什麼嗎？', reply: '不是', say: '她拿了架子上最舊的一捲，以為是空的。' },
    { id: 'q-k-key', topic: 'kui', text: '小葵有廣播室的鑰匙嗎？', reply: '不是', say: '她白天跟我借的。' },
    // 林老師
    { id: 'q-lin-class', topic: 'lin', text: '林老師是那一屆的導師嗎？', reply: '是' },
    // 點名
    { id: 'q-rc-all', topic: 'rollcall', text: '點的是全班的名字嗎？', reply: '是也不是', say: '二十三個。……問別的。' },
    // 其他
    { id: 'q-ghost', topic: 'ghost', text: '廣播室鬧鬼嗎？', reply: '不是' },
    { id: 'q-room', topic: 'room', text: '剛才廣播室裡有人嗎？', reply: '不是' },
    { id: 'q-two', topic: 'two', text: '兩點這個時間很重要嗎？', reply: '不重要', say: '那是我巡完最後一圈的時間。' },
  ],
  board: [
    { id: 's1', text: '每天兩點的廣播，是{b1}用定時器設好的。', blanks: [{ id: 'b1', category: '人物', answer: 'liao' }] },
    { id: 's2', text: '放的是四十年前{b2}的點名，點名的是{b3}。', blanks: [{ id: 'b2', category: '事情', answer: 'graduation' }, { id: 'b3', category: '人物', answer: 'lin' }] },
    { id: 's3', text: '喊你名字的，是{b4}。', blanks: [{ id: 'b4', category: '人物', answer: 'kui' }] },
    { id: 's4', text: '她借了帶子，在後面錄了{b5}的點名練習。', blanks: [{ id: 'b5', category: '事情', answer: 'ceremony' }] },
  ],
  reveal: [
    { who: 廖伯, text: '每天兩點，廣播室的錄音機會自己響。定時器是我設的。' },
    { who: 廖伯, text: '帶子是四十年前，第三十八屆畢業典禮的點名。點名的是林老師。' },
    { who: 廖伯, text: '前天，小葵跟我借廣播室，說要練習禮拜五廢校典禮的點名。她從架子上拿了最舊的一捲，以為是空白帶。' },
    { who: 廖伯, text: '她把全校七個人、還有老師們的名字，都錄在後面。包括你。' },
    { who: 廖伯, text: '所以今天晚上，林老師點完二十三號，接著就是小葵的聲音，喊了你。' },
    { text: '廖伯把帶子倒回去一點，按下播放。二十三號喊完之後，有一段很短的沙沙聲。你好像聽到一個很小的聲音，說了一個字。' },
    { text: '他按了停止。' },
    { who: 廖伯, text: '前面的，不准洗掉。' },
  ],
};

export const night2: Night = {
  n: 2,
  title: '第二夜',
  ambience: 'school',
  intro: [
    { text: '第二夜。白天，小葵一直跟在你後面。她是全校最大的學生，六年級，下學期就要去山下讀國中了。' },
    { who: 小葵, text: '老師，禮拜五的典禮，我要負責點名喔。' },
    { who: 你, text: '那要練習喔。' },
    { who: 小葵, text: '我已經在練了。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-tape',
        prompt: '第二天，小葵知道了，很緊張：「老師，我是不是把很重要的東西錄壞了？」你說：',
        options: [
          {
            id: 'new',
            text: '「沒關係，我們換一捲新的帶子，重錄一次。」',
            reply: [{ who: 小葵, text: '好……' }, { text: '她把那捲舊帶子雙手捧著，還給了廖伯。' }],
          },
          {
            id: 'same',
            text: '「不要換。就錄在同一捲，讓你們接在他們後面。」',
            flag: 'sameTape',
            reply: [
              { who: 小葵, text: '可以嗎？' },
              { text: '你看向廖伯。他沉默了很久，然後點點頭。' },
              { who: 廖伯, text: '……接在後面。不要蓋到前面。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '那天晚上兩點，廣播又響了。你數著：一號，二號……二十三號。' },
        { text: '二十三號之後，那段很短的沙沙聲。你把耳朵貼近喇叭。' },
        { text: '一個很小、很小的男孩的聲音，說：「有。」' },
      ],
    },
  ],
  bigClues: [
    '每天兩點，廖伯用定時器放四十年前第三十八屆畢業典禮的點名錄音。點名的是當年的導師林老師。',
    '錄音裡點完二十三號以後，有一段沙沙聲，一個很小的男孩聲音說：「有。」',
    '廖伯說：「前面的，不准洗掉。」',
  ],
  bigUnlocks: ['tape', 'twoam', 'lin', 'kui'],
};
