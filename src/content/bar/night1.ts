import type { Night, Soup } from '../../engine/types';

const 阿森 = '阿森';
const 阿哲 = '阿哲';
const 你 = '你';

/**
 * 禮拜一：沒喝的那一杯。吧台那個只點水的男人就是她的男朋友阿哲，他騙她說加班、跟著她來；
 * 她一進門就從鏡子看到他。兩個人整晚裝作不認識。對面那杯小黃瓜琴通寧，不是阿哲會喝的酒。
 */
const soup: Soup = {
  id: 'secondglass',
  title: '沒喝的那一杯',
  kind: 'small',
  witnessNames: { zhe: '吧台的男人' },
  surface: [
    { text: '禮拜一，晚上九點。熟客安安一個人坐在窗邊的雙人座，點了兩杯酒。' },
    { text: '一杯她自己慢慢喝。另一杯放在對面，冰塊化光了，一直沒有人碰。' },
    { text: '吧台最裡面坐著一個男人，整晚只點了一杯水，背對著窗邊。' },
    { text: '十二點，安安結帳。走到門口，她回頭，很大聲地說：' },
    { who: '安安', text: '他今天加班。' },
    { who: 阿森, text: '你剛來，先記住一件事：吧台後面的人，只說看到的。' },
  ],
  start: ['anan', 'man', 'asen', 'glass2', 'water', 'overtime', 'window', 'bar'],
  keywords: [
    { id: 'anan', label: '安安', category: '人物' },
    { id: 'man', label: '吧台的男人', category: '人物' },
    { id: 'asen', label: '阿森', category: '人物' },
    { id: 'zhe', label: '阿哲', category: '人物' },
    { id: 'absent', label: '一個沒來的人', category: '人物' },

    { id: 'glass2', label: '對面那杯酒', category: '物品' },
    { id: 'water', label: '一杯水', category: '物品' },
    { id: 'cucumber', label: '小黃瓜琴通寧', category: '物品' },
    { id: 'whisky', label: '威士忌加水', category: '物品' },

    { id: 'window', label: '雙人座', category: '地點' },
    { id: 'bar', label: '吧台', category: '地點' },

    { id: 'overtime', label: '加班', category: '事情' },
    { id: 'pretend', label: '裝作不認識', category: '事情' },
    { id: 'followed', label: '跟著她來', category: '事情' },
  ],
  evidence: [],
  questions: [
    // 吧台的男人
    { id: 'm-know', topic: 'man', text: '吧台的男人和安安認識嗎？', reply: '是', say: '她一進門，就看了他一眼。然後整晚，再也沒看過。', unlocks: ['pretend'] },
    { id: 'm-know-a', topic: 'man', text: '吧台的男人和安安認識嗎？', who: 'anan', reply: '不是', lie: true, say: '沒見過。' },
    { id: 'm-know-z', topic: 'man', text: '吧台的男人和安安認識嗎？', who: 'zhe', reply: '不是', lie: true, say: '誰？' },
    { id: 'm-bf', topic: 'man', text: '吧台的男人，是安安的男朋友嗎？', reply: '是', requires: ['pretend'], say: '他叫阿哲。他們在一起四年了。', unlocks: ['zhe'] },
    { id: 'm-bf-z', topic: 'man', text: '吧台的男人，是安安的男朋友嗎？', who: 'zhe', reply: '不是', lie: true, requires: ['pretend'] },

    // 加班
    { id: 'o-real', topic: 'overtime', text: '阿哲今天真的在加班嗎？', who: 'zhe', reply: '是', lie: true, requires: ['zhe'], say: '……嗯。' },
    { id: 'o-real-h', topic: 'overtime', text: '阿哲今天真的在加班嗎？', reply: '不是', requires: ['zhe'], say: '他七點就坐在那裡了。下午他打電話來，叫我別跟安安說他會來。', unlocks: ['followed'] },
    { id: 'o-said', topic: 'overtime', text: '「加班」是阿哲自己跟安安說的嗎？', who: 'anan', reply: '是', requires: ['zhe'], say: '他下午傳訊息說的。' },
    { id: 'o-loud', topic: 'overtime', text: '她最後那句話，是說給吧台聽的嗎？', who: 'anan', reply: '不是', lie: true },
    { id: 'o-loud-h', topic: 'overtime', text: '她最後那句話，是說給吧台聽的嗎？', reply: '是', say: '她說完，看的是吧台後面那面鏡子。' },

    // 對面那杯
    { id: 'g-zhe-a', topic: 'glass2', text: '對面那杯，是點給阿哲的嗎？', who: 'anan', reply: '是', lie: true, requires: ['zhe'], say: '他說要來的。' },
    { id: 'g-zhe', topic: 'glass2', text: '對面那杯，是點給阿哲的嗎？', reply: '不是', requires: ['zhe'], say: '阿哲只喝威士忌加水。今晚他連那個都沒點。', unlocks: ['whisky'] },
    { id: 'g-special', topic: 'glass2', text: '對面那杯，是很少人點的酒嗎？', reply: '是', say: '琴通寧，加一片小黃瓜。這條巷子，只有一個客人這樣喝。', unlocks: ['cucumber'] },
    { id: 'g-who', topic: 'cucumber', text: '她點那杯，是在等一個今晚沒來的人嗎？', reply: '是', say: '她看了好幾次手機。', unlocks: ['absent'] },
    { id: 'g-who-a', topic: 'cucumber', text: '她點那杯，是在等一個今晚沒來的人嗎？', who: 'anan', reply: '不是', lie: true, say: '我只是想喝兩杯。' },
    { id: 'g-asen', topic: 'cucumber', text: '阿森知道那杯是誰在喝的嗎？', reply: '是', say: '知道。我不說。' },

    // 一杯水
    { id: 'w-watch', topic: 'water', text: '吧台的男人只點水，是為了一直清醒地看著窗邊嗎？', reply: '是', say: '他看的是鏡子。從最裡面那個位子，鏡子照得到雙人座。' },
    { id: 'w-watch-z', topic: 'water', text: '吧台的男人只點水，是為了一直清醒地看著窗邊嗎？', who: 'zhe', reply: '不是', lie: true, say: '我要開車。' },
    { id: 'w-money', topic: 'water', text: '他只點水，是因為沒帶錢嗎？', reply: '不重要' },

    // 其他
    { id: 'win-hers', topic: 'window', text: '雙人座是安安常坐的位子嗎？', reply: '是也不是', say: '禮拜五，他們四個人坐那張大桌。雙人座，她最近才開始一個人來坐。' },
    { id: 'a-angry', topic: 'anan', text: '安安今晚在生氣嗎？', who: 'anan', reply: '不是', lie: true },
    { id: 'a-angry-h', topic: 'anan', text: '安安今晚在生氣嗎？', reply: '是', say: '冰塊咬得很響。' },
    { id: 'as-tell', topic: 'asen', text: '阿森會把今晚的事告訴別人嗎？', reply: '不是', say: '酒館的規矩。' },
    { id: 'bar-mirror', topic: 'bar', text: '坐在吧台，看得到窗邊嗎？', reply: '是', say: '吧台後面有一面鏡子。' },
  ],
  board: [
    { id: 's1', text: '吧台那個只點水的男人，是安安的男朋友{a1}。', blanks: [{ id: 'a1', category: '人物', answer: 'zhe' }] },
    { id: 's2', text: '他們兩個，整晚都在{a2}。', blanks: [{ id: 'a2', category: '事情', answer: 'pretend' }] },
    {
      id: 's3',
      text: '他跟她說要{a3}，其實是{a4}。',
      blanks: [
        { id: 'a3', category: '事情', answer: 'overtime' },
        { id: 'a4', category: '事情', answer: 'followed' },
      ],
    },
    {
      id: 's4',
      text: '對面那杯{a5}，阿哲從來不喝。她在等的，是{a6}。',
      blanks: [
        { id: 'a5', category: '物品', answer: 'cucumber' },
        { id: 'a6', category: '人物', answer: 'absent' },
      ],
    },
  ],
  reveal: [
    { who: 阿森, text: '吧台那個是阿哲，安安的男朋友。在一起四年了。' },
    { who: 阿森, text: '下午他打電話來，說今晚要「加班」，叫我別跟安安說他會來。七點，他自己來了，坐最裡面，背對著窗。' },
    { who: 阿森, text: '安安一進門，就從鏡子裡看到他了。兩個人，一整晚，裝作不認識。' },
    { who: 阿森, text: '她點了兩杯。對面那杯是小黃瓜琴通寧——阿哲不喝這個。' },
    { who: 阿森, text: '最後那句「他今天加班」，是說給鏡子裡的人聽的。意思是：我知道你在。' },
    { text: '你把那杯沒人碰的酒倒掉。小黃瓜還是綠的。' },
    { who: 阿森, text: '那杯是誰在喝的，我知道。可是我只說我看到的。' },
  ],
};

export const night1: Night = {
  n: 1,
  title: '禮拜一',
  ambience: 'bar',
  intro: [
    { text: '巷子底的小酒館「半杯」，九點開門，三點打烊。招牌上的燈，只亮一半。' },
    { text: '今天是你第一天上班。老闆阿森五十多歲，話很少，擦杯子擦得很慢。' },
    { who: 阿森, text: '來這裡的人，喝的不只是酒。客人說什麼，你聽；客人問你，你只說看到的。' },
    { who: 阿森, text: '想知道什麼就問。同一句話，可以問不同的人——客人說的，不一定是真的。' },
    { text: '窗邊有一張小桌，只放得下兩張椅子。阿森說，那叫「雙人座」。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '打烊後，阿哲沒有走。他把那杯水喝完，叫住你。' },
        { who: 阿哲, text: '新來的？……她剛剛，有沒有說，她在等誰？' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-ask',
        prompt: '阿哲在等你回答。',
        options: [
          {
            id: 'quote',
            text: '「她說，你今天加班。」',
            flag: 'quoteAnan',
            reply: [{ who: 阿哲, text: '……對。我是這樣跟她說的。' }, { text: '他笑了一下，笑得很難看。' }],
          },
          {
            id: 'gin',
            text: '「對面那杯，是小黃瓜琴通寧。」',
            flag: 'toldGin',
            reply: [
              { text: '阿哲的手停在半空中。' },
              { who: 阿哲, text: '……我知道是誰在喝那個。' },
              { text: '他沒有說是誰。他付了兩杯酒的錢，走了。' },
            ],
          },
          {
            id: 'out',
            text: '「你自己去問她吧。」',
            flag: 'stayOut',
            reply: [{ who: 阿哲, text: '也是。' }, { text: '他走到門口，又回頭看了一眼雙人座。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '阿森把最後一個杯子掛上架。' },
        { who: 阿森, text: '禮拜五，他們四個人會一起來，坐那張大桌。阿哲和安安，小凡和以晴。' },
        { who: 阿森, text: '小黃瓜琴通寧，是小凡在喝的。' },
        { who: 你, text: '……那你剛剛為什麼不說？' },
        { who: 阿森, text: '剛剛沒有人問我「小凡喝什麼」。' },
      ],
    },
  ],
  bigClues: ['禮拜一：安安一個人坐雙人座，對面放著一杯小黃瓜琴通寧。阿哲騙她說加班，坐在吧台背對著她。', '小黃瓜琴通寧，是小凡的酒。'],
  bigUnlocks: ['cucumber'],
};
