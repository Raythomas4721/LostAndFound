import type { Night, Soup } from '../../engine/types';

const 溫伯 = '溫伯';
const 男人 = '背相機的男人';
const 阿琴 = '阿琴';
const 秋姨 = '秋姨';
const 你 = '你';

const soup: Soup = {
  id: 'five-umbrellas',
  title: '雨中的五把傘',
  kind: 'small',
  surface: [
    { text: '雨下了一整晚。一個背著相機的男人站在櫃台前，頭髮濕透了。' },
    { who: 男人, text: '不好意思，架上的傘，可以借我五把嗎？十分鐘就還。' },
    { text: '他抱著五把傘走到空無一人的第二月台，一把一把撐開，在月台邊排成一排。' },
    { text: '他退到柱子後面，對著那排傘拍了一張照片。只拍了一張。' },
    { text: '然後他把傘收好，全部還回來，每一把都擦乾了。' },
    { who: 男人, text: '謝謝。這樣他就看得到了。' },
    { text: '他走得很急，一張紙片從外套口袋掉出來，落在櫃台前面。' },
    { who: 溫伯, text: '撿起來看看吧。然後問我。' },
  ],
  start: ['man', 'you', 'umbrellas', 'camera', 'waitroom', 'photo-taking', 'borrow', 'tonight', 'rain'],
  keywords: [
    { id: 'man', label: '背相機的男人', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'zhuo', label: '姓卓的病人', category: '人物' },
    { id: 'zhuoyuan', label: '男人的父親', category: '人物' },
    { id: 'girl', label: '照片裡的女孩', category: '人物' },

    { id: 'umbrellas', label: '五把傘', category: '物品' },
    { id: 'camera', label: '相機', category: '物品' },
    { id: 'oldphoto', label: '舊照片', category: '物品' },
    { id: 'pass', label: '探病證', category: '物品' },

    { id: 'waitroom', label: '候車室', category: '地點' },
    { id: 'platform2', label: '第二月台', category: '地點' },
    { id: 'hospital', label: '溪口醫院', category: '地點' },

    { id: 'photo-taking', label: '拍照', category: '事情' },
    { id: 'borrow', label: '借傘', category: '事情' },
    { id: 'ill', label: '病得下不了床', category: '事情' },
    { id: 'bring', label: '帶回病房給他看', category: '事情' },

    { id: 'tonight', label: '今晚', category: '時間' },
    { id: 'rain', label: '下雨天', category: '時間' },
    { id: 'forty', label: '四十年前', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-pass',
      art: 'pass',
      name: '掉下來的紙片',
      description: '一張護貝過的小卡，邊角被雨打濕了。',
      hotspots: [
        { id: 'hs-title', at: [50, 21], name: '標題', label: '卡片上印著「探病證」。', unlocks: ['pass'] },
        { id: 'hs-hospital', at: [66, 41], name: '醫院名稱', label: '溪口醫院，三樓，312 病房。', unlocks: ['hospital'] },
        { id: 'hs-patient', at: [30, 64], name: '病人姓名', label: '病人姓名被雨水暈開了，只看得出第一個字是「卓」。', unlocks: ['zhuo'] },
        { id: 'hs-back', at: [84, 80], name: '背面', label: '背面用原子筆寫著：「霧埔站　第二月台　東邊第三根柱子」。', unlocks: ['platform2'] },
      ],
    },
  ],
  questions: [
    // 背相機的男人
    { id: 'q-reporter', topic: 'man', text: '他是記者嗎？', reply: '不是', say: '他是攝影師，但今天不是來工作的。' },
    { id: 'q-before', topic: 'man', text: '他以前來過霧埔嗎？', reply: '不是', say: '第一次來。' },
    { id: 'q-knows', topic: 'man', text: '他認識這個車站的人嗎？', reply: '是也不是', say: '他不認識。但有人認識。' },
    // 你
    { id: 'q-you', topic: 'you', text: '這件事跟我有關嗎？', reply: '不是' },
    // 五把傘
    { id: 'q-five', topic: 'umbrellas', text: '一定要五把嗎？', reply: '是', say: '少一把都不行。' },
    { id: 'q-color', topic: 'umbrellas', text: '傘的顏色重要嗎？', reply: '不重要' },
    { id: 'q-recreate', topic: 'umbrellas', text: '他是在重現某個畫面嗎？', reply: '是', unlocks: ['oldphoto'] },
    // 相機、拍照、借傘
    { id: 'q-cam', topic: 'camera', text: '相機很特別嗎？', reply: '不重要' },
    { id: 'q-contest', topic: 'photo-taking', text: '照片是要拿去比賽嗎？', reply: '不是' },
    { id: 'q-forsomeone', topic: 'photo-taking', text: '照片是要給別人看的嗎？', reply: '是', say: '給一個沒辦法自己來的人。' },
    { id: 'q-borrow', topic: 'borrow', text: '他自己沒有傘嗎？', reply: '不重要' },
    // 舊照片
    { id: 'q-hisphoto', topic: 'oldphoto', text: '舊照片是他拍的嗎？', reply: '不是' },
    { id: 'q-yuanphoto', topic: 'oldphoto', text: '舊照片是他父親拍的嗎？', reply: '是', requires: ['zhuoyuan'], say: '四十年前拍的。', unlocks: ['forty'] },
    { id: 'q-here', topic: 'oldphoto', text: '舊照片是在霧埔站拍的嗎？', reply: '是', say: '同一個月台，同一根柱子後面。' },
    { id: 'q-people', topic: 'oldphoto', text: '舊照片裡有人嗎？', reply: '是', say: '傘後面站著一個女孩。', unlocks: ['girl'] },
    // 照片裡的女孩
    { id: 'q-mother', topic: 'girl', text: '女孩是這個男人的母親嗎？', reply: '不是' },
    { id: 'q-stilllive', topic: 'girl', text: '女孩還住在霧埔嗎？', reply: '不重要', say: '……對這碗湯來說，不重要。' },
    // 姓卓的病人
    { id: 'q-zhuofamily', topic: 'zhuo', text: '姓卓的病人是這個男人的家人嗎？', reply: '是', say: '是他父親，叫卓遠。', unlocks: ['zhuoyuan'] },
    { id: 'q-zhuoknow', topic: 'zhuo', text: '我認識姓卓的病人嗎？', reply: '不是' },
    // 男人的父親（卓遠）
    { id: 'q-ill', topic: 'zhuoyuan', text: '他父親生病了嗎？', reply: '是', say: '住在溪口醫院，已經下不了床了。', unlocks: ['ill'] },
    { id: 'q-dead', topic: 'zhuoyuan', text: '他父親過世了嗎？', reply: '不是' },
    { id: 'q-cameto', topic: 'zhuoyuan', text: '他父親來過霧埔嗎？', reply: '是', say: '很久以前。' },
    // 探病證、溪口醫院
    { id: 'q-passwho', topic: 'pass', text: '探病證是這個男人的嗎？', reply: '是' },
    { id: 'q-fromhosp', topic: 'hospital', text: '男人是從醫院直接過來的嗎？', reply: '是', say: '搭支線，一個多小時。' },
    { id: 'q-tohosp', topic: 'hospital', text: '照片是要帶去醫院給他父親的嗎？', reply: '是', requires: ['ill'], say: '他說的「他」，就躺在 312 號病房。', unlocks: ['bring'] },
    // 第二月台、候車室
    { id: 'q-pillar', topic: 'platform2', text: '拍照的位置是特別選的嗎？', reply: '是', say: '東邊第三根柱子後面。一步都不能差。' },
    { id: 'q-waitroom', topic: 'waitroom', text: '這件事跟候車室有關嗎？', reply: '不是' },
    // 下雨天、四十年前
    { id: 'q-rain', topic: 'rain', text: '下雨很重要嗎？', reply: '是', say: '四十年前那天，也在下雨。', unlocks: ['forty'] },
    { id: 'q-tonight', topic: 'tonight', text: '一定要今晚拍嗎？', reply: '是也不是', say: '要下雨的晚上。這個禮拜過了，就沒有車站可以拍了。' },
    { id: 'q-fortysame', topic: 'forty', text: '四十年前那張照片，也是五把傘嗎？', reply: '是' },
  ],
  board: [
    { id: 's1', text: '他說的「他」，是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'zhuoyuan' }] },
    { id: 's2', text: '「他」{b2}，沒辦法再來霧埔了。', blanks: [{ id: 'b2', category: '事情', answer: 'ill' }] },
    {
      id: 's3',
      text: '{b3}，「他」在{b4}拍過一模一樣的照片。',
      blanks: [
        { id: 'b3', category: '時間', answer: 'forty' },
        { id: 'b4', category: '地點', answer: 'platform2' },
      ],
    },
    { id: 's4', text: '這張新照片，是要{b5}。', blanks: [{ id: 'b5', category: '事情', answer: 'bring' }] },
  ],
  reveal: [
    { who: 溫伯, text: '他叫卓書恆。他父親卓遠住在溪口醫院，已經下不了床了。' },
    { who: 溫伯, text: '四十年前一個下雨天，卓遠在第二月台拍過一張照片：五把撐開的傘排成一排，傘後面站著一個女孩。' },
    { who: 溫伯, text: '他父親說，想再看一次霧埔站。可是他來不了，霧埔站也等不了了。' },
    { who: 溫伯, text: '所以兒子替他來，借了五把傘，站在同一根柱子後面，拍同一張照片。' },
    { text: '他停了一下。' },
    { who: 溫伯, text: '……拍得到月台，拍不到那個女孩了。' },
  ],
};

export const night3: Night = {
  n: 3,
  title: '第三晚',
  ambience: 'rain',
  intro: [
    { text: '從傍晚就開始下雨。候車室的地板上，一路都是濕腳印。' },
    { text: '溫伯比平常早到，坐在站長室門口，一直看著窗外的月台。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '十點多，阿琴撐著傘從站長室那頭跑過來。' },
        { who: 阿琴, text: '站長室門口地上撿的，泡了一點水。' },
        { text: '是一張很舊的車票，紙已經黃了。' },
        { text: '「霧埔 → 溪口　末班夜車」。日期是四十年前，這個禮拜天。' },
        { text: '溫伯看到車票，臉色變了一下。' },
        { who: 溫伯, text: '舊東西，沒用了。丟了吧。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-ticket',
        prompt: '這張車票要怎麼辦？',
        options: [
          {
            id: 'throw',
            text: '照溫伯說的，丟掉。',
            flag: 'ticketThrown',
            reply: [
              { text: '你把車票丟進垃圾桶。' },
              { text: '打烊前你回頭看了一眼，垃圾桶已經被倒乾淨了。溫伯倒的。' },
            ],
          },
          {
            id: 'keep',
            text: '「招領處的東西，不能說丟就丟。」登記，收進抽屜。',
            flag: 'ticketKept',
            reply: [
              { text: '你寫好拾獲單，把車票夾進登記本裡。' },
              { text: '溫伯沒有反對。他只是很久都沒有再看你這邊。' },
            ],
          },
          {
            id: 'return',
            text: '等阿琴走了，私下把車票還給溫伯。',
            flag: 'ticketReturned',
            reply: [
              { text: '你把車票放在溫伯的茶杯旁邊，什麼也沒說。' },
              { text: '他看著那張車票，過了很久，才把它收進皮夾最裡面那一層。' },
              { who: 溫伯, text: '……謝謝。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '23:00。雨還在下，秋姨的傘在門口滴著水。' },
        { who: 秋姨, text: '今天有嗎？' },
        { who: 你, text: '還沒到。' },
        { who: 秋姨, text: '那天也是這樣的雨。' },
        { text: '她說完就走了。你不知道她說的是哪一天。' },
      ],
    },
  ],
  bigClues: [
    '一張四十年前的車票：「霧埔 → 溪口　末班夜車」，日期是這個禮拜天。掉在站長室門口。',
    '卓遠四十年前在第二月台拍過一張照片，傘後面站著一個女孩。',
    '秋姨說：「那天也是這樣的雨。」',
  ],
  bigUnlocks: ['zhuoyuan', 'girl', 'ticket', 'platform2', 'hospital', 'lasttrain', 'forty'],
};
