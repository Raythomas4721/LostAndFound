import type { Night, Soup } from '../../engine/types';

const 老闆娘 = '老闆娘';
const 黎先生 = '黎先生';
const 江先生 = '江先生';

/**
 * 第二夜：縮時照片裡的黃雨衣女孩。其實是穿著小晴雨衣的江太太。
 * 換人回答：今晚老闆娘不在，回答你的是江先生。他替太太說了三句謊，可以拿證據對質。
 */
const soup: Soup = {
  id: 'raincoat',
  title: '黃雨衣的女孩',
  kind: 'small',
  surface: [
    { text: '第二天，風雨沒有停。黎先生一整天都在窗邊擦他的相機。' },
    { text: '晚上，他衝進餐廳，把相機推到你面前。' },
    { who: 黎先生, text: '我昨晚把相機架在窗口，對著斷橋拍縮時。你看最後一張。' },
    { text: '凌晨四點十二分。斷掉的橋頭，站著一個穿黃色雨衣的小女孩，背對著鏡頭。' },
    { who: 黎先生, text: '這種天氣，誰會讓小孩站在那裡？' },
    { text: '他的手在抖。你轉頭找老闆娘：廚房是空的，後門沒關好，風一直灌進來。' },
    { text: '江先生放下碗。' },
    { who: 江先生, text: '老闆娘出去了。……你問我吧。我太太的事，我最清楚。' },
  ],
  host: {
    name: '江先生',
    pronoun: '他',
    note: '今晚老闆娘不在，回答你的是江先生。他說的話，不一定是真的——覺得他在說謊，就拿出證據對質。',
    confront: {
      broken: '江先生把碗放下，沉默了很久。「……好。這一題，我說實話。」',
      truthful: '「這一題，我沒有騙你。」他看著你，眼睛沒有閃。',
      noproof: '「你有證據嗎？」他低下頭，繼續喝粥。',
    },
  },
  start: ['li', 'girl', 'boss', 'mrjiang', 'ge', 'camera', 'photos', 'raincoat', 'bridgehead', 'room', 'ghost', 'four12'],
  keywords: [
    { id: 'li', label: '黎先生', category: '人物' },
    { id: 'girl', label: '照片裡的女孩', category: '人物' },
    { id: 'boss', label: '老闆娘', category: '人物' },
    { id: 'mrjiang', label: '江先生', category: '人物' },
    { id: 'ge', label: '葛老先生', category: '人物' },
    { id: 'adult', label: '一個大人', category: '人物' },
    { id: 'mrsjiang', label: '江太太', category: '人物' },
    { id: 'xiaoqing', label: '小晴', category: '人物' },

    { id: 'camera', label: '相機', category: '物品' },
    { id: 'photos', label: '縮時照片', category: '物品' },
    { id: 'raincoat', label: '黃雨衣', category: '物品' },
    { id: 'railing', label: '橋頭的欄杆', category: '物品' },

    { id: 'bridgehead', label: '斷橋頭', category: '地點' },
    { id: 'room', label: '黎先生的房間', category: '地點' },
    { id: 'backpath', label: '後山小路', category: '地點' },
    { id: 'teahouse', label: '舊茶寮', category: '地點' },

    { id: 'ghost', label: '鬧鬼', category: '事情' },
    { id: 'timelapse', label: '縮時攝影', category: '事情' },
    { id: 'walkin', label: '走進畫面', category: '事情' },
    { id: 'toosmall', label: '雨衣太小', category: '事情' },
    { id: 'steps', label: '往樹林的腳印', category: '事情' },
    { id: 'zipped', label: '有人幫她拉拉鍊', category: '事情' },

    { id: 'four12', label: '四點十二分', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-camera',
      art: 'camera',
      name: '黎先生的相機',
      description: '一台很重的單眼相機。螢幕上是那張照片，亮度被調到最高。',
      hotspots: [
        { id: 'hs-count', at: [92, 20], name: '螢幕角落', label: '04:12，第 287 張。往前翻一張，04:11，橋頭還是空的。她剛好停在畫面正中間。', unlocks: ['walkin'] },
        { id: 'hs-rail', at: [58, 58], name: '欄杆', label: '女孩旁邊是橋頭的欄杆。欄杆只到她的腰。', unlocks: ['railing'] },
        { id: 'hs-sleeve', at: [32, 56], name: '袖子', label: '雨衣很緊，袖子只到手肘，下襬也短了一截。', unlocks: ['toosmall'] },
        { id: 'hs-zip', name: '背後', label: '雨衣的拉鍊在背後，一路拉到脖子。一個人穿，手搆不到那裡。', unlocks: ['zipped'] },
        { id: 'hs-mud', name: '橋頭的泥地', label: '往後翻到 04:20：橋頭的泥地上留著一串腳印，沒有回山莊，轉進了右邊的樹林。', unlocks: ['steps'] },
      ],
    },
  ],
  questions: [
    // 照片裡的女孩
    { id: 'q-g-ghost', topic: 'girl', text: '照片裡的是鬼嗎？', reply: '不是' },
    { id: 'q-g-kid', topic: 'girl', text: '照片裡的是小孩嗎？', reply: '不是', say: '是大人。', unlocks: ['adult'] },
    { id: 'q-g-guest', topic: 'girl', text: '照片裡的人住在山莊裡嗎？', reply: '是' },
    // 欄杆、雨衣太小
    { id: 'q-ra-tall', topic: 'railing', text: '欄杆只到她的腰，所以她其實很高嗎？', reply: '是', unlocks: ['adult'] },
    { id: 'q-ts-adult', topic: 'toosmall', text: '雨衣太小，是因為穿的人是大人嗎？', reply: '是', unlocks: ['adult'] },
    // 大人
    { id: 'q-a-woman', topic: 'adult', text: '那個大人是女的嗎？', reply: '是', say: '……房客裡，女的只有一個。', unlocks: ['mrsjiang'] },
    { id: 'q-a-boss', topic: 'adult', text: '那個大人是老闆娘嗎？', reply: '不是' },
    // 江太太、江先生
    { id: 'q-mj-purpose', topic: 'mrsjiang', text: '江太太是故意被拍到的嗎？', reply: '不是', hesitant: true, say: '她不知道那裡有相機。', contradictedBy: ['walkin'] },
    { id: 'q-mj-purpose-t', topic: 'mrsjiang', text: '江太太是故意被拍到的嗎？', reply: '是', corrects: 'q-mj-purpose', requires: ['teahouse'], say: '她知道那台相機整晚都對著橋。她要他看到。' },
    { id: 'q-mj-here', topic: 'mrsjiang', text: '江太太現在還在山莊裡嗎？', reply: '是', say: '現在還在。' },
    { id: 'q-mr-know', topic: 'mrjiang', text: '江先生知道太太半夜出去嗎？', reply: '不是', hesitant: true, say: '我睡得很熟。', contradictedBy: ['zipped'] },
    { id: 'q-mr-know-t', topic: 'mrjiang', text: '江先生知道太太半夜出去嗎？', reply: '是', corrects: 'q-mr-know', requires: ['teahouse'], say: '……雨衣的拉鍊，是我在背後幫她拉的。' },
    // 黃雨衣
    { id: 'q-r-kid', topic: 'raincoat', text: '雨衣本來是小孩的嗎？', reply: '是' },
    { id: 'q-r-whose', topic: 'raincoat', text: '雨衣是小晴的嗎？', reply: '是', say: '老闆娘一直收著。', unlocks: ['xiaoqing'] },
    { id: 'q-r-new', topic: 'raincoat', text: '雨衣是新的嗎？', reply: '不是', say: '洗過很多次了。' },
    { id: 'q-mj-coat', topic: 'mrsjiang', text: '江太太穿的雨衣，是她自己的嗎？', reply: '不是', say: '尺寸差太多了。' },
    // 相機、照片
    { id: 'q-c-auto', topic: 'camera', text: '照片是相機自己拍的嗎？', reply: '是', say: '每分鐘一張，拍了一整夜。他自己設定的。', unlocks: ['timelapse'] },
    { id: 'q-c-touch', topic: 'camera', text: '有人動過黎先生的相機嗎？', reply: '不是' },
    { id: 'q-p-edit', topic: 'photos', text: '照片被修過嗎？', reply: '不是' },
    // 斷橋頭、走進畫面
    { id: 'q-bh-cross', topic: 'bridgehead', text: '她是想過橋嗎？', reply: '不是', say: '橋已經斷了。' },
    { id: 'q-bh-after', topic: 'bridgehead', text: '她後來往別的地方走了嗎？', reply: '不是', hesitant: true, say: '站一下，就回房間了。', contradictedBy: ['steps'] },
    { id: 'q-bh-after-t', topic: 'bridgehead', text: '她後來往別的地方走了嗎？', reply: '是', corrects: 'q-bh-after', requires: ['mrsjiang'], say: '……往後山。', unlocks: ['backpath'] },
    { id: 'q-wi-pass', topic: 'walkin', text: '她只是經過橋頭嗎？', reply: '是', say: '……經過而已。' },
    // 後山小路
    { id: 'q-bp-lead', topic: 'backpath', text: '後山小路通到別的地方嗎？', reply: '是', say: '一間舊茶寮。很久沒人用了。', unlocks: ['teahouse'] },
    { id: 'q-th-anyone', topic: 'teahouse', text: '茶寮裡有人嗎？', reply: '不重要' },
    // 黎先生
    { id: 'q-l-scared', topic: 'li', text: '黎先生被嚇到了嗎？', reply: '是' },
    { id: 'q-l-seen', topic: 'li', text: '黎先生認得那件雨衣嗎？', reply: '是也不是', say: '他好像在哪裡看過。' },
    // 其他
    { id: 'q-ghost', topic: 'ghost', text: '山莊真的鬧鬼嗎？', reply: '不是' },
    { id: 'q-time', topic: 'four12', text: '四點十二分這個時間很重要嗎？', reply: '是也不是', say: '天亮前，雨最小的時候。' },
    { id: 'q-room', topic: 'room', text: '照片是從黎先生的房間拍的嗎？', reply: '是' },
    { id: 'q-ge', topic: 'ge', text: '葛老先生跟這張照片有關嗎？', reply: '不重要' },
  ],
  board: [
    { id: 's1', text: '照片是黎先生自己設定的{b1}拍到的。', blanks: [{ id: 'b1', category: '事情', answer: 'timelapse' }] },
    { id: 's2', text: '照片裡的不是小孩，是{b2}。', blanks: [{ id: 'b2', category: '人物', answer: 'mrsjiang' }] },
    { id: 's3', text: '她身上那件黃雨衣，是{b3}的。', blanks: [{ id: 'b3', category: '人物', answer: 'xiaoqing' }] },
    { id: 's4', text: '她在橋頭站了一下，就走上了{b4}。', blanks: [{ id: 'b4', category: '地點', answer: 'backpath' }] },
  ],
  reveal: [
    { who: 江先生, text: '……好吧。照片是黎先生自己的相機拍的，每分鐘一張，拍了一整夜。' },
    { who: 江先生, text: '四點十一分，橋頭沒有人。四點十二分，我太太走進畫面，停在正中間。' },
    { who: 江先生, text: '那不是小孩。雨衣太小，她只能硬穿上去，袖子只到手肘。拉鍊在背後，是我幫她拉的。' },
    { who: 江先生, text: '那件雨衣，是小晴的。' },
    { who: 江先生, text: '她在橋頭站了一下，讓相機拍清楚，就往後山的小路走了。' },
    { text: '後門砰的一聲打開。老闆娘渾身濕透地走進來，手上拿著一支手電筒。她看了江先生一眼。' },
    { who: 老闆娘, text: '他跟你說了多少？' },
    { who: 江先生, text: '夠多了。' },
    { text: '黎先生看著老闆娘。' },
    { who: 黎先生, text: '她為什麼要穿你女兒的雨衣，站在那裡？' },
    { who: 老闆娘, text: '你明天早上，自己問她。' },
  ],
};

export const night2: Night = {
  n: 2,
  title: '第二夜',
  ambience: 'storm',
  intro: [
    { text: '第二夜。風小了一點，雨沒有停。手機一格訊號都沒有。' },
    { text: '晚餐的長桌上擺了七副碗筷。窗邊那碗飯，還在。' },
    { text: '葛老先生吃得很慢，一直看著黎先生。黎先生沒有發現。' },
    { text: '晚餐一結束，老闆娘就披上雨衣，說要去後山看水管，從後門出去了。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-photo',
        prompt: '黎先生把記憶卡交給你：「幫我把那張刪掉。我不想再看到。」',
        options: [
          {
            id: 'delete',
            text: '照他說的，把照片刪掉。',
            flag: 'deletedPhoto',
            reply: [
              { who: 黎先生, text: '謝謝。……你相信有鬼嗎？' },
              { text: '你搖搖頭。' },
              { who: 黎先生, text: '我以前也不信。' },
            ],
          },
          {
            id: 'copy',
            text: '刪掉之前，偷偷把照片存進自己的手機。',
            flag: 'keptPhoto',
            reply: [{ text: '你把照片存了下來。手機螢幕上，那件黃雨衣在黑暗裡亮得刺眼。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '第三天早上。江太太不見了。' },
        { text: '江先生一個人坐在餐桌前，慢慢地喝粥。' },
        { who: 江先生, text: '她先回去了。' },
        { who: 黎先生, text: '從哪裡回去？橋斷了！' },
        { who: 江先生, text: '她走得到的。' },
        { text: '窗邊的位子，那碗白飯旁邊，多了一件摺好的黃色雨衣。' },
      ],
    },
  ],
  bigClues: [
    '縮時照片裡的「女孩」是江太太，穿著小晴的黃雨衣，站在斷橋頭，然後走上後山小路。',
    '後山小路通到一間舊茶寮，很久沒人用了。',
    '第三天早上，江太太不見了。江先生說：「她走得到的。」',
    '黎先生好像在哪裡看過那件黃雨衣。',
  ],
  bigUnlocks: ['raincoat', 'backpath', 'mrsjiang', 'mrjiang'],
};
