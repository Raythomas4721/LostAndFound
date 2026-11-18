import type { Condition, Ending, Epilogue, Line } from '../engine/types';

const 溫伯 = '溫伯';
const 秋姨 = '秋姨';
const 書恆 = '卓書恆';
const 你 = '你';

/**
 * 溫伯願意自己站出來：鑰匙一開始就交給他，
 * 或者這個禮拜你至少有兩次站在他那邊（私下還車票、把方先生的事交給他、把鈴鐺交給他）。
 */
export const WEN_TRUSTS_YOU: Condition = {
  or: [{ all: ['keyGiven'] }, { atLeast: { n: 2, of: ['ticketReturned', 'fangToWen', 'bellToWen'] } }],
};

export interface EndingWithScene extends Ending {
  scene: Line[];
}

/** 由上往下，第一個條件成立的就是結局。 */
export const ENDINGS: readonly EndingWithScene[] = [
  {
    id: 'last-train',
    title: '末班車',
    when: { all: ['boxByWen', 'toldShuheng'], ...WEN_TRUSTS_YOU },
    summary: '四十年前沒有開走的那一班車，今天晚上開走了。',
    scene: [
      { text: '禮拜天晚上。月台上站滿了來看最後一班車的人。' },
      { text: '23:00，秋姨推門進來。這一次，站在櫃台前面的是溫伯。' },
      { who: 溫伯, text: '何小姐。您的鐵盒，到了。' },
      { text: '他把綠色鐵盒放在櫃台上。蓋子上壓著一朵花。' },
      { who: 溫伯, text: '四十年前，是我把您的名字寫錯了。對不起。' },
      { text: '秋姨看著鐵盒，很久沒有動。然後她打開蓋子，拿出那封信。' },
      { who: 秋姨, text: '……他在溪口等我？' },
      { text: '卓書恆從月台那頭走進來，相機掛在胸前。' },
      { who: 書恆, text: '他還在等。溪口醫院，三一二號房。' },
      { text: '溫伯從抽屜裡拿出一本新的車票簿，撕下一張，用他工整的字寫上：霧埔 → 溪口。末班。' },
      { who: 溫伯, text: '這一班，還來得及。' },
      { text: '23:40，最後一班開往溪口的車進站。葉姊站在車門邊，向秋姨伸出手。' },
      { text: '秋姨提著鐵盒上了車。書恆按下快門。' },
      { text: '溫伯搖了最後一次發車鈴。' },
    ],
  },
  {
    id: 'carried',
    title: '替人送信',
    when: { all: ['boxToShuheng'] },
    summary: '鐵盒回到了寄的人手上。信，才剛開始寫。',
    scene: [
      { text: '禮拜天傍晚，書恆來了。你把綠色鐵盒交給他。' },
      { who: 書恆, text: '我會親手交給他。' },
      { text: '他搭了末班車的前一班走了。' },
      { text: '23:00，秋姨推門進來。' },
      { who: 秋姨, text: '今天有嗎？' },
      { who: 你, text: '……有人替您，送去溪口了。' },
      { text: '秋姨愣住了。然後她慢慢坐到長椅上，坐了很久。' },
      { text: '末班車開走的時候，她還坐在那裡。溫伯替她倒了一杯茶，兩個人都沒有說話。' },
      { text: '兩個禮拜以後，一封從溪口寄來的信，送到了車站後面的巷子。收件人：何秋棠。' },
    ],
  },
  {
    id: 'late-letter',
    title: '遲到的信',
    when: { any: ['boxByWen', 'boxByMe'] },
    summary: '信遲到了四十年。但是它到了。',
    scene: [
      { text: '禮拜天晚上。23:00，秋姨推門進來。' },
      { text: '綠色的鐵盒已經放在櫃台上。蓋子上壓著一朵花。' },
      { who: 秋姨, text: '……到了。' },
      { text: '她坐在候車室的長椅上，把信讀了三遍。' },
      { who: 秋姨, text: '他等過我。' },
      { text: '23:40，末班車開走了。她沒有上車。' },
      { text: '她把信摺好，放回鐵盒，抱在胸前。走到門口時，她回頭對你笑了一下。' },
      { who: 秋姨, text: '謝謝你。明天，我不用再來了。' },
    ],
  },
];

/** 結局之後，每位配角的尾聲。每個人只會出現第一條成立的。 */
export const EPILOGUES: readonly Epilogue[] = [
  { id: 'pan-promise', who: '老潘', when: { all: ['promisedPan'] }, text: '停駛以後，每天傍晚六點，你都打電話給老潘：「有人撿到一把傘。」他每次都說謝謝。' },
  { id: 'pan', who: '老潘', when: {}, text: '停駛以後，老潘每天傍晚都把計程車停在舊車站門口，等秋月走回家。' },
  { id: 'bell-wen', who: '溫伯', when: { all: ['bellToWen'] }, text: '溫伯退休那天，制服胸前的口袋叮的響了一聲。他說，這樣就不會走丟了。' },
  { id: 'bell', who: '小穗', when: {}, text: '那顆鈴鐺跟著舊倉的東西送進了總局，編號 0412，等下一個會走丟的人。' },
  { id: 'hat-ye', who: '葉姊', when: { all: ['hatToYe'] }, text: '葉姊調到別的路線。她的制服口袋裡，一直放著一頂紅色的小帽子。' },
  { id: 'hat', who: '葉姊', when: {}, text: '紅色童帽被裝箱送走了。陳以安考上了大學，最後一次搭支線，是葉姊開的車。' },
  { id: 'fang-wen', who: '方先生', when: { all: ['fangToWen'] }, text: '方先生再也沒有來過。溫伯說，他那天晚上是第一次覺得，招領處是他的。' },
  { id: 'fang', who: '方先生', when: {}, text: '方先生的店裡，多了一塊霧埔站的舊站牌。他說，那是他唯一買得到的東西。' },
  { id: 'ticket-returned', who: '舊車票', when: { all: ['ticketReturned'] }, text: '溫伯把那張舊車票放回了鐵盒。四十年來第一次，盒子是滿的。' },
  { id: 'ticket-kept', who: '舊車票', when: { all: ['ticketKept'] }, text: '那張舊車票夾在你的登記本裡。你一直沒有把它拿出來。' },
  { id: 'ticket-thrown', who: '舊車票', when: { all: ['ticketThrown'] }, text: '那張舊車票被丟掉了。溫伯說沒關係，上面每一個字他都記得。' },
];

/** 每個人只取第一條成立的尾聲。 */
export function pickEpilogues(flags: readonly string[], matches: (c: Condition, f: readonly string[]) => boolean): Epilogue[] {
  const seen = new Set<string>();
  const out: Epilogue[] = [];
  for (const ep of EPILOGUES) {
    if (seen.has(ep.who) || !matches(ep.when, flags)) continue;
    seen.add(ep.who);
    out.push(ep);
  }
  return out;
}
