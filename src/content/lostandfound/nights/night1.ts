import type { Night, Soup } from '../../../engine/types';

const 溫伯 = '溫伯';
const 老潘 = '老潘';
const 秋姨 = '老太太';
const 你 = '你';

const soup: Soup = {
  id: 'umbrella',
  title: '留下的傘',
  kind: 'small',
  surface: [
    { text: '開計程車的老潘推門進來，帽子上都是雨。' },
    { who: 老潘, text: '阿琴說撿到一把黑傘？' },
    { text: '你把傘遞給他。他把傘轉過來，看了一眼傘柄，點點頭。' },
    { text: '然後他把傘放回櫃台。' },
    { who: 老潘, text: '放著吧。明天這個時候，你再打電話給我，說「有人撿到一把傘」。拜託了。' },
    { text: '他走了。' },
    { text: '溫伯在旁邊看著，慢慢喝了一口茶。' },
    { who: 溫伯, text: '想知道為什麼？問我吧。我只回答是、不是。這是夜班的老規矩。' },
  ],
  start: ['pan', 'qin', 'umbrella', 'taxi', 'home', 'phone'],
  keywords: [
    { id: 'pan', label: '老潘', category: '人物' },
    { id: 'qin', label: '阿琴', category: '人物' },
    { id: 'qiuyue', label: '秋月', category: '人物' },
    { id: 'youngpan', label: '年輕時的老潘', category: '人物' },

    { id: 'umbrella', label: '黑傘', category: '物品' },
    { id: 'carved', label: '刻著「秋」字的傘柄', category: '物品' },
    { id: 'rib', label: '斷掉的傘骨', category: '物品' },

    { id: 'taxi', label: '計程車', category: '地點' },
    { id: 'home', label: '家', category: '地點' },
    { id: 'platform', label: '月台', category: '地點' },

    { id: 'phone', label: '電話', category: '事情' },
    { id: 'memory', label: '記性變差', category: '事情' },
    { id: 'waiting', label: '等人', category: '事情' },
    { id: 'safe', label: '平安回家', category: '事情' },

    { id: 'dusk', label: '每天傍晚', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-umbrella',
      art: 'umbrella',
      name: '黑色長柄傘',
      description: '一把用了很多年的黑色長柄傘，木頭傘柄磨得發亮。',
      hotspots: [
        { id: 'hs-carved', at: [14, 86], name: '傘柄', label: '木頭傘柄上刻了一個「秋」字，刻得很深。', unlocks: ['carved'] },
        { id: 'hs-rib', at: [66, 41], name: '傘骨', label: '有一根傘骨斷了，用膠帶纏過。', unlocks: ['rib'] },
        { id: 'hs-tag', at: [60, 74], name: '拾獲標籤', label: '拾獲標籤：第二月台，東側長椅。阿琴的字。', unlocks: ['platform'] },
      ],
    },
  ],
  questions: [
    // 黑傘
    { id: 'q-mine', topic: 'umbrella', text: '傘是老潘的嗎？', reply: '不是' },
    { id: 'q-wife', topic: 'umbrella', text: '傘是老潘太太的嗎？', reply: '是', say: '她叫秋月。', unlocks: ['qiuyue'] },
    { id: 'q-stolen', topic: 'umbrella', text: '傘是偷來的嗎？', reply: '不是' },
    // 傘柄、傘骨
    { id: 'q-carved', topic: 'carved', text: '刻的字很重要嗎？', reply: '是', say: '那是他太太名字裡的字。', unlocks: ['qiuyue'] },
    { id: 'q-rib', topic: 'rib', text: '傘壞了跟這件事有關嗎？', reply: '不重要' },
    // 老潘
    { id: 'q-want', topic: 'pan', text: '老潘想要這把傘嗎？', reply: '是也不是', say: '他想要的不是傘。' },
    { id: 'q-fight', topic: 'pan', text: '老潘跟太太吵架了嗎？', reply: '不是' },
    { id: 'q-lie', topic: 'pan', text: '老潘在騙我嗎？', reply: '不是' },
    // 阿琴
    { id: 'q-qin', topic: 'qin', text: '阿琴跟這件事有關嗎？', reply: '不是' },
    // 計程車、家
    { id: 'q-taxi', topic: 'taxi', text: '計程車跟這件事有關嗎？', reply: '是也不是', say: '他開了三十年夜班計程車，傍晚是最忙的時候。' },
    { id: 'q-home', topic: 'home', text: '秋月會自己走回家嗎？', reply: '是', requires: ['qiuyue'] },
    // 秋月
    { id: 'q-dead', topic: 'qiuyue', text: '秋月過世了嗎？', reply: '不是' },
    { id: 'q-sick', topic: 'qiuyue', text: '秋月生病了嗎？', reply: '是', say: '醫生說是記性的病。', unlocks: ['memory'] },
    { id: 'q-lose', topic: 'qiuyue', text: '秋月常常掉東西嗎？', reply: '是', say: '每次都是同一張長椅。', unlocks: ['dusk'] },
    // 月台
    { id: 'q-daily', topic: 'platform', text: '傘每天都掉在月台嗎？', reply: '是', unlocks: ['dusk'] },
    { id: 'q-ride', topic: 'platform', text: '秋月去月台是要搭車嗎？', reply: '不是', requires: ['qiuyue'] },
    { id: 'q-wait', topic: 'platform', text: '秋月去月台是在等人嗎？', reply: '是', requires: ['qiuyue'], unlocks: ['waiting'] },
    // 每天傍晚
    { id: 'q-dusk', topic: 'dusk', text: '傍晚這個時間很重要嗎？', reply: '是', say: '六點。以前有一班車是六點到的。' },
    // 等人
    { id: 'q-alive', topic: 'waiting', text: '她等的人還活著嗎？', reply: '是' },
    { id: 'q-whom', topic: 'waiting', text: '她等的是老潘嗎？', reply: '是也不是', say: '是很多年前的他。', unlocks: ['youngpan'] },
    // 年輕時的老潘
    { id: 'q-train', topic: 'youngpan', text: '老潘年輕時搭火車上下班嗎？', reply: '是', say: '每天傍晚六點那班。' },
    // 記性變差
    { id: 'q-forget', topic: 'memory', text: '秋月忘了老潘現在開計程車嗎？', reply: '是', say: '有時候記得，有時候不記得。' },
    // 電話
    { id: 'q-notify', topic: 'phone', text: '電話是要通知他來拿傘嗎？', reply: '不是' },
    { id: 'q-need', topic: 'phone', text: '老潘需要這通電話嗎？', reply: '是' },
    { id: 'q-relief', topic: 'phone', text: '這通電話會讓老潘放心嗎？', reply: '是', say: '接到電話，他就知道她今天也平安回家了。', unlocks: ['safe'] },
    {
      id: 'q-pickup',
      topic: 'phone',
      text: '老潘不能自己去月台接她嗎？',
      reply: '不是',
      requires: ['platform'],
      say: '傍晚是他最忙的時候。而且她一看到他，就會問「你今天怎麼沒搭車回來」。',
    },
  ],
  board: [
    { id: 's1', text: '這把傘是{b1}的。', blanks: [{ id: 'b1', category: '人物', answer: 'qiuyue' }] },
    {
      id: 's2',
      text: '她{b2}了，每天傍晚都會到{b3}。',
      blanks: [
        { id: 'b2', category: '事情', answer: 'memory' },
        { id: 'b3', category: '地點', answer: 'platform' },
      ],
    },
    { id: 's3', text: '她在等{b4}。', blanks: [{ id: 'b4', category: '人物', answer: 'youngpan' }] },
    {
      id: 's4',
      text: '招領處的{b5}，是老潘確認她{b6}的方法。',
      blanks: [
        { id: 'b5', category: '事情', answer: 'phone' },
        { id: 'b6', category: '事情', answer: 'safe' },
      ],
    },
  ],
  reveal: [
    { who: 溫伯, text: '秋月年輕的時候，每天傍晚都去月台等老潘下班。後來老潘改開計程車，她也就不去了。' },
    { who: 溫伯, text: '去年她開始忘東西。先是忘了鑰匙，後來忘了老潘早就不搭火車了。' },
    { who: 溫伯, text: '現在她每天傍晚都去等那班六點的車。等不到，就自己走回家，傘忘在長椅上。' },
    { who: 溫伯, text: '我們打電話給老潘，他就知道她今天也去了，也回家了。' },
    { text: '他放下茶杯。' },
    { who: 溫伯, text: '下禮拜開始，就沒有六點那班車了。' },
  ],
};

export const night1: Night = {
  n: 1,
  title: '第一晚',
  intro: [
    { text: '溫伯把一大串鑰匙放在桌上。' },
    { who: 溫伯, text: '招領處很簡單：東西來了就上架，有人來問就對一對，對了就還。' },
    { text: '他看了一眼牆上的公告：霧埔支線將於本週日末班車後停駛。' },
    { who: 溫伯, text: '最後一個禮拜了，你運氣好，不會太忙。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-call',
        prompt: '明天打電話給老潘的時候，你要說：',
        options: [
          {
            id: 'as-asked',
            text: '「有人撿到一把傘。」',
            reply: [{ who: 溫伯, text: '好。就這樣說。' }],
          },
          {
            id: 'promise',
            text: '「有人撿到一把傘。還有，停駛以後，我也會每天打給你。」',
            flag: 'promisedPan',
            reply: [
              { text: '溫伯看了你一眼。' },
              { who: 溫伯, text: '停駛以後就沒有招領處了。' },
              { who: 你, text: '電話還在。' },
              { text: '他沒說話，把茶杯推過來，替你也倒了一杯。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '23:00，一位穿深色外套的老太太推門進來，頭髮梳得很整齊。' },
        { who: 秋姨, text: '請問，有沒有一只綠色的鐵盒？上面寫的是我的名字，何秋棠。' },
        { text: '你看了看架上。' },
        { who: 你, text: '……沒有。' },
        { who: 秋姨, text: '這樣啊。那我明天再來。' },
        { text: '她點點頭，好像早就知道。' },
        { text: '她走了以後，溫伯說：' },
        { who: 溫伯, text: '她每天晚上都會來。你就說還沒到。' },
        { who: 你, text: '她來了多久了？' },
        { who: 溫伯, text: '……四十年。' },
      ],
    },
  ],
  bigClues: [
    '湯面：四十年來，她每天晚上都到車站問同一個東西。',
    '她叫何秋棠，要找一只綠色的鐵盒，上面寫著她的名字。',
    '溫伯說：「你就說還沒到。」',
  ],
};
