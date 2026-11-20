import type { Soup } from '../../engine/types';

const 溫伯 = '溫伯';

/**
 * 秋姨的大湯。第一晚結束時打開，線索詞會一晚一晚透過 bigUnlocks 多起來，
 * 第七晚才是正式要喝完的湯。
 * 溫伯在第六晚坦白（解鎖 confession）之前，標了 hesitant 的題目都是謊話；
 * 坦白之後，同一個線索詞底下的更正版（corrects）會取代它們。
 */
export const bigSoup: Soup = {
  id: 'big',
  title: '綠色鐵盒',
  kind: 'big',
  surface: [
    { text: '四十年來，她每天晚上都到車站，問一只從來沒有送到的綠色鐵盒。' },
    { who: 溫伯, text: '你就說還沒到。' },
  ],
  start: ['qiutang', 'wen', 'box', 'office', 'closing', 'sunday', 'everynight'],
  keywords: [
    { id: 'qiutang', label: '秋姨（何秋棠）', category: '人物' },
    { id: 'wen', label: '溫伯', category: '人物' },
    { id: 'zhuoyuan', label: '卓遠', category: '人物' },
    { id: 'girl', label: '照片裡的女孩', category: '人物' },
    { id: 'heqiutang', label: '何秋堂', category: '人物' },
    { id: 'shuheng', label: '卓書恆', category: '人物' },
    { id: 'fang', label: '方先生', category: '人物' },

    { id: 'box', label: '綠色鐵盒', category: '物品' },
    { id: 'key', label: '乙-7 的鑰匙', category: '物品' },
    { id: 'ticket', label: '舊車票', category: '物品' },
    { id: 'ledger', label: '登記簿', category: '物品' },
    { id: 'letter', label: '信', category: '物品' },

    { id: 'office', label: '招領處', category: '地點' },
    { id: 'storeroom', label: '舊倉', category: '地點' },
    { id: 'platform2', label: '第二月台', category: '地點' },
    { id: 'hospital', label: '溪口醫院', category: '地點' },
    { id: 'xikoustation', label: '溪口站', category: '地點' },

    { id: 'closing', label: '停駛', category: '事情' },
    { id: 'lasttrain', label: '末班夜車', category: '事情' },
    { id: 'elope', label: '約好一起走', category: '事情' },
    { id: 'changedmind', label: '卓遠反悔了', category: '事情' },
    { id: 'wrongname', label: '寫錯名字', category: '事情' },
    { id: 'afraid', label: '不敢說出口', category: '事情' },
    { id: 'confession', label: '溫伯的坦白', category: '事情' },

    { id: 'sunday', label: '這個禮拜天', category: '時間' },
    { id: 'everynight', label: '每天晚上', category: '時間' },
    { id: 'forty', label: '四十年前', category: '時間' },
    { id: 'threedays', label: '三天', category: '時間' },
  ],
  evidence: [],
  questions: [
    // 綠色鐵盒
    { id: 'b-exists', topic: 'box', text: '鐵盒真的存在嗎？', reply: '是' },
    { id: 'b-forher', topic: 'box', text: '鐵盒是要給秋姨的嗎？', reply: '是' },
    { id: 'b-self', topic: 'box', text: '鐵盒是秋姨自己寄放的嗎？', reply: '不是' },
    { id: 'b-man', topic: 'box', text: '寄放鐵盒的是一個男人嗎？', reply: '是' },
    { id: 'b-still', topic: 'box', text: '鐵盒還在車站裡嗎？', reply: '不是', hesitant: true, say: '……早就不在了。' },
    { id: 'b-still-t', topic: 'box', text: '鐵盒還在車站裡嗎？', reply: '是', corrects: 'b-still', requires: ['confession'], say: '一直在舊倉，乙-7。' },
    { id: 'b-inside', topic: 'box', text: '鐵盒裡有東西嗎？', reply: '不重要', hesitant: true, say: '……那不重要。' },
    { id: 'b-inside-t', topic: 'box', text: '鐵盒裡有東西嗎？', reply: '是', corrects: 'b-inside', requires: ['confession'], say: '一張車票，一封信。' },
    // 溫伯
    { id: 'w-knowqiu', topic: 'wen', text: '溫伯認識秋姨很久了嗎？', reply: '是', say: '四十年。' },
    { id: 'w-fortyago', topic: 'wen', text: '四十年前，溫伯就在這個車站工作嗎？', reply: '是', say: '那年二十四歲，值夜班。' },
    { id: 'w-where', topic: 'wen', text: '溫伯知道鐵盒在哪裡嗎？', reply: '不是', hesitant: true, say: '……不知道。' },
    { id: 'w-where-t', topic: 'wen', text: '溫伯知道鐵盒在哪裡嗎？', reply: '是', corrects: 'w-where', requires: ['confession'], say: '我一直都知道。' },
    { id: 'w-involved', topic: 'wen', text: '溫伯跟鐵盒的事有關嗎？', reply: '不重要', hesitant: true, say: '……跟我沒關係。' },
    { id: 'w-involved-t', topic: 'wen', text: '溫伯跟鐵盒的事有關嗎？', reply: '是', corrects: 'w-involved', requires: ['confession'], say: '是我弄錯的。', unlocks: ['wrongname'] },
    { id: 'w-lied', topic: 'wen', text: '溫伯這個禮拜說過謊嗎？', reply: '是', requires: ['confession'], say: '對你，說了好幾次。' },
    // 秋姨
    { id: 'q-leave', topic: 'qiutang', text: '四十年前，秋姨打算離開霧埔嗎？', reply: '是', unlocks: ['elope'] },
    { id: 'q-married', topic: 'qiutang', text: '秋姨結婚了嗎？', reply: '不是', say: '一個人住。' },
    { id: 'q-hate', topic: 'qiutang', text: '秋姨恨那個人嗎？', reply: '是也不是', say: '她以為他反悔了。', unlocks: ['changedmind'] },
    { id: 'q-girl', topic: 'girl', text: '照片裡的女孩是秋姨嗎？', reply: '是' },
    // 約好一起走
    { id: 'e-lasttrain', topic: 'elope', text: '他們約好搭末班夜車嗎？', reply: '是', requires: ['lasttrain'] },
    { id: 'e-board', topic: 'elope', text: '秋姨那晚上車了嗎？', reply: '不是' },
    { id: 'e-he', topic: 'elope', text: '那個人上車了嗎？', reply: '是也不是', say: '他搭了早一班。' },
    { id: 'e-zhuo', topic: 'elope', text: '要跟她一起走的人是卓遠嗎？', reply: '是', requires: ['zhuoyuan'] },
    // 卓遠反悔了
    { id: 'c-really', topic: 'changedmind', text: '卓遠真的反悔了嗎？', reply: '不是', requires: ['zhuoyuan', 'elope'], say: '他在溪口站等她。', unlocks: ['xikoustation'] },
    { id: 'c-why', topic: 'changedmind', text: '秋姨是因為找不到鐵盒，才以為他反悔的嗎？', reply: '是', requires: ['zhuoyuan'] },
    // 溪口站
    { id: 'x-days', topic: 'xikoustation', text: '卓遠在溪口站等了很久嗎？', reply: '是', say: '三天。', unlocks: ['threedays'] },
    { id: 'x-thought', topic: 'xikoustation', text: '卓遠以為秋姨改變主意了嗎？', reply: '是' },
    // 卓遠
    { id: 'z-left', topic: 'zhuoyuan', text: '寄放鐵盒的人是卓遠嗎？', reply: '是' },
    { id: 'z-alive', topic: 'zhuoyuan', text: '卓遠還在等秋姨嗎？', reply: '是也不是', say: '他在等一張照片。也許不只。' },
    // 何秋堂
    { id: 'h-other', topic: 'heqiutang', text: '何秋堂是另一個人嗎？', reply: '是', hesitant: true, say: '……是吧。' },
    { id: 'h-other-t', topic: 'heqiutang', text: '何秋堂是另一個人嗎？', reply: '不是', corrects: 'h-other', requires: ['confession'], say: '是我寫錯的。棠，我寫成了堂。', unlocks: ['wrongname'] },
    // 登記簿
    { id: 'l-wrote', topic: 'ledger', text: '登記簿上的字是溫伯寫的嗎？', reply: '不重要', hesitant: true, say: '……誰寫的都一樣。' },
    { id: 'l-wrote-t', topic: 'ledger', text: '登記簿上的字是溫伯寫的嗎？', reply: '是', corrects: 'l-wrote', requires: ['confession'], say: '我的字。那時候就寫得很工整。' },
    { id: 'l-blank', topic: 'ledger', text: '「狀態」那一格是故意空著的嗎？', reply: '是也不是', say: '不知道該寫什麼。' },
    // 舊車票
    { id: 't-whose', topic: 'ticket', text: '車票是溫伯的嗎？', reply: '是', hesitant: true, say: '……是我的。' },
    { id: 't-whose-t', topic: 'ticket', text: '車票是溫伯的嗎？', reply: '不是', corrects: 't-whose', requires: ['confession'], say: '是鐵盒裡的，給秋棠的票。我拿出來，帶在身上四十年。' },
    { id: 't-date', topic: 'ticket', text: '車票的日期很重要嗎？', reply: '是', say: '四十年前的這個禮拜天。' },
    // 舊倉、鑰匙
    { id: 'k-drawer', topic: 'key', text: '乙-7 是舊倉的抽屜嗎？', reply: '是' },
    { id: 'k-wens', topic: 'key', text: '鑰匙是溫伯的嗎？', reply: '是也不是', say: '是舊倉的。只是一直在我身上。' },
    { id: 's-inside', topic: 'storeroom', text: '舊倉裡有跟秋姨有關的東西嗎？', reply: '是也不是', say: '……舊倉裡什麼都有。' },
    // 不敢說出口、坦白
    { id: 'a-tried', topic: 'afraid', text: '溫伯想過要說出來嗎？', reply: '是', say: '每一年。' },
    { id: 'a-stay', topic: 'afraid', text: '溫伯留在霧埔，是因為這件事嗎？', reply: '是' },
    { id: 'cf-afraid', topic: 'confession', text: '溫伯四十年都沒說，是因為不敢嗎？', reply: '是', say: '一開始是不敢。後來，是不知道怎麼開口。', unlocks: ['afraid'] },
    { id: 'cf-why', topic: 'confession', text: '溫伯是因為停駛，才決定說出來的嗎？', reply: '是也不是', say: '是因為有人一直問。' },
    // 其他
    { id: 'sh-son', topic: 'shuheng', text: '書恆是卓遠的兒子嗎？', reply: '是' },
    { id: 'f-fang', topic: 'fang', text: '方先生跟四十年前的事有關嗎？', reply: '不是' },
    { id: 'cl-why', topic: 'closing', text: '停駛跟這件事有關嗎？', reply: '是也不是', say: '再不說，就沒有地方可以說了。' },
    { id: 'ho-wait', topic: 'hospital', text: '卓遠現在住在溪口醫院嗎？', reply: '是' },
    { id: 'p2-photo', topic: 'platform2', text: '第二月台那張照片，是他們約好那天拍的嗎？', reply: '不是', say: '是更早的一個下雨天。' },
    { id: 'o-never', topic: 'office', text: '秋姨來問的時候，招領處真的找不到鐵盒嗎？', reply: '是也不是', say: '架上找不到。它不在架上。' },
    { id: 'n-every', topic: 'everynight', text: '秋姨每天晚上來，是還在等鐵盒嗎？', reply: '是也不是', say: '她在等一個答案。' },
    { id: 'su-date', topic: 'sunday', text: '這個禮拜天，剛好是四十年前那一天嗎？', reply: '是', requires: ['forty'] },
  ],
  board: [
    { id: 'g1', text: '鐵盒是{c1}四十年前寄放在招領處，要給秋棠的。', blanks: [{ id: 'c1', category: '人物', answer: 'zhuoyuan' }] },
    {
      id: 'g2',
      text: '那晚值班的{c2}，把領取人寫成了{c3}。',
      blanks: [
        { id: 'c2', category: '人物', answer: 'wen' },
        { id: 'c3', category: '人物', answer: 'heqiutang' },
      ],
    },
    {
      id: 'g3',
      text: '秋棠找不到鐵盒，以為{c4}，沒有搭上{c5}。',
      blanks: [
        { id: 'c4', category: '事情', answer: 'changedmind' },
        { id: 'c5', category: '事情', answer: 'lasttrain' },
      ],
    },
    {
      id: 'g4',
      text: '卓遠在{c6}等了{c7}。',
      blanks: [
        { id: 'c6', category: '地點', answer: 'xikoustation' },
        { id: 'c7', category: '時間', answer: 'threedays' },
      ],
    },
    { id: 'g5', text: '溫伯後來發現了，卻{c8}，在這個小站待了四十年。', blanks: [{ id: 'c8', category: '事情', answer: 'afraid' }] },
  ],
  reveal: [
    { who: 溫伯, text: '四十年前，卓遠和秋棠約好搭末班夜車去溪口。' },
    { who: 溫伯, text: '卓遠臨時得先走。他把車票和一封信放進綠色鐵盒，寄放在招領處：「我在溪口站等你，等到你來。」' },
    { who: 溫伯, text: '那天值班的是我。我把「棠」寫成「堂」，把盒子歸進乙-7。' },
    { who: 溫伯, text: '她來問的時候，我在架上找不到，就跟她說沒有。她以為他反悔了，沒有上車。' },
    { who: 溫伯, text: '卓遠在溪口站等了三天。他以為她不來了。' },
    { who: 溫伯, text: '我後來發現了，可是她已經每天晚上都來了。我開不了口。一年，兩年……四十年。' },
    { text: '他把手放在櫃台上。這個位置，他站了四十年。' },
    { who: 溫伯, text: '這碗湯，是我欠她的。' },
  ],
};
