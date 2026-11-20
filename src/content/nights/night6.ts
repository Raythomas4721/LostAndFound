import type { Night } from '../../engine/types';

const 溫伯 = '溫伯';
const 阿琴 = '阿琴';
const 書恆 = '卓書恆';
const 秋姨 = '秋姨';
const 你 = '你';

/** 第六晚沒有小湯：乙-7 打開、溫伯坦白、決定誰把鐵盒交出去。 */
export const night6: Night = {
  n: 6,
  title: '第六晚',
  intro: [
    { text: '禮拜六。清倉的最後一天。' },
    { text: '溫伯一整晚沒有出題。他坐在舊倉門口的紙箱上，看著裡面最後一排抽屜。' },
    { who: 阿琴, text: '今天怎麼這麼安靜？' },
    { text: '沒有人回答她。' },
  ],
  after: [
    {
      kind: 'lines',
      when: { all: ['keyKept'] },
      lines: [
        { text: '十點，清單上只剩一格：乙-7。' },
        { text: '你打開上鎖的抽屜，拿出那把生鏽的鐵鑰匙。溫伯站了起來，但沒有攔你。' },
        { text: '鑰匙轉了兩圈。抽屜裡是一只綠色的鐵盒，蓋子上壓著一朵花。標籤上的字很工整：何秋堂。' },
      ],
    },
    {
      kind: 'lines',
      when: { all: ['keyKept'], atLeast: { n: 2, of: ['ticketReturned', 'fangToWen', 'bellToWen'] } },
      lines: [{ who: 溫伯, text: '……我本來打算今晚，自己打開的。' }],
    },
    {
      kind: 'lines',
      when: { all: ['keyGiven'] },
      lines: [
        { text: '十點，溫伯站起來，從口袋裡拿出那把生鏽的鐵鑰匙，走進舊倉。' },
        { text: '你聽到抽屜被拉開的聲音。很久很久，他才走出來。' },
        { text: '他手上捧著一只綠色的鐵盒，蓋子上壓著一朵花。標籤上的字很工整：何秋堂。' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { text: '溫伯在紙箱上坐下來，把鐵盒放在膝蓋上。' },
        { who: 溫伯, text: '四十年前的這個禮拜六，一個姓卓的年輕人把這個盒子交給我。他說，明天晚上會有一個女孩來拿，叫何秋棠。' },
        { who: 溫伯, text: '那天晚上很忙。我把名字寫成「秋堂」，歸進了乙-7。' },
        { who: 溫伯, text: '第二天晚上她來了。我在架上找，找不到。我跟她說，沒有。' },
        { who: 溫伯, text: '她就沒有上車。' },
        { text: '阿琴手上的紙箱，輕輕放到了地上。' },
        { who: 溫伯, text: '三年後我整理舊倉，才看到這一筆。那時候，她已經每天晚上都來了。我不知道要怎麼開口。' },
        { who: 溫伯, text: '我把車票拿出來，帶在身上。每年清倉，我都打開乙-7 看一次。四十年。' },
        { text: '他抬頭看你。' },
        { who: 溫伯, text: '這個禮拜你問我的事……有幾題，我說了謊。現在問吧，我照實說。' },
      ],
    },
    {
      kind: 'lines',
      when: { none: ['toldShuheng'] },
      lines: [
        { text: '十一點前，卓書恆來了。他說明天搭末班車回溪口，來跟大家道別。' },
        { text: '他看到溫伯膝蓋上的鐵盒，整個人停住了。' },
      ],
    },
    {
      kind: 'choice',
      when: { none: ['toldShuheng'] },
      choice: {
        id: 'c-tell-again',
        prompt: '要告訴書恆這只鐵盒的事嗎？',
        options: [
          {
            id: 'tell',
            text: '「這是你父親四十年前寄放的。要給的人，每天晚上都會來。」',
            flag: 'toldShuheng',
            reply: [
              { who: 書恆, text: '……秋棠。' },
              { who: 書恆, text: '明天，我會在月台上。' },
            ],
          },
          {
            id: 'not-yet',
            text: '「這是別人的東西。」',
            reply: [{ text: '書恆點點頭，沒有再問。他走的時候，回頭看了鐵盒好幾次。' }],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '23:00。秋姨準時推門進來。' },
        { who: 秋姨, text: '今天有嗎？' },
        { text: '你看向溫伯。他搖了搖頭，指了指牆上的日曆：明天，禮拜天。' },
        { who: 溫伯, text: '（小聲）四十年前，就是明天。' },
        { who: 你, text: '……明天。明天一定到。' },
        { text: '秋姨看了你很久。' },
        { who: 秋姨, text: '你以前都說「還沒到」。' },
        { text: '她走了。腳步比平常慢。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-box',
        prompt: '明天，鐵盒要怎麼交出去？',
        options: [
          {
            id: 'wen',
            text: '「明天，請您自己交給她。」',
            flag: 'boxByWen',
            reply: [
              { text: '溫伯看著鐵盒，過了很久，點了一次頭。' },
              { who: 溫伯, text: '好。四十年前是我說的「沒有」。明天，也該由我來說。' },
            ],
          },
          {
            id: 'me',
            text: '「明天我來交。您不用出面。」',
            flag: 'boxByMe',
            reply: [
              { who: 溫伯, text: '……謝謝。' },
              { text: '他說謝謝的時候，聽起來一點也不輕鬆。' },
            ],
          },
          {
            id: 'shuheng',
            text: '「交給書恆，讓他帶回溪口，還給卓遠。」',
            flag: 'boxToShuheng',
            reply: [
              { who: 溫伯, text: '還給寄的人……也是一種歸還。' },
              { text: '他把鐵盒放回你手上，再也沒有碰它。' },
            ],
          },
        ],
      },
    },
  ],
  bigClues: [
    '溫伯坦白：四十年前，他把「秋棠」寫成「秋堂」，把鐵盒歸進乙-7。秋棠來問時，他說沒有。',
    '溫伯說：這個禮拜，有幾題他說了謊。',
  ],
  bigUnlocks: ['confession', 'letter'],
};
