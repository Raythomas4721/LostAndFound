import type { Condition, Ending, Epilogue } from '../../engine/types';

const 魏先生 = '魏先生';
const 簡如 = '簡如';
const 你 = '你';

/** 簡如願意走出來：這個禮拜你至少兩次替這棟樓守住了秘密（狗、包裹、擋下魏先生）。 */
export const SHE_TRUSTS_YOU: Condition = { atLeast: { n: 2, of: ['keptDog', 'keptParcel', 'refusedWei'] } };

/** 由上往下，第一個條件成立的就是結局。 */
export const ENDINGS: readonly Ending[] = [
  {
    id: 'someone',
    title: '十二樓有人',
    // 對講機裡說溜嘴（slipped）的話，魏先生會先找到她
    when: { all: ['police'], none: ['slipped'], ...SHE_TRUSTS_YOU },
    summary: '八年來第一次，電梯停在了十二樓。',
    scene: [
      { text: '禮拜五晚上十一點，魏先生拿著一份公文走進大廳。' },
      { text: '大廳的沙發上，已經坐著兩位警察。桌上放著那張假名片、他拍信箱的監視器畫面，和十二樓的錄影。' },
      { who: 魏先生, text: '……這是什麼意思？' },
      { text: '十分鐘以後，他坐上了警車。' },
      { text: '凌晨三點，第十六格，十二樓的燈亮了。' },
      { text: '然後，電梯的樓層燈開始往上跳：九、十、十一、十二。停住。再往下跳，一路回到一樓。' },
      { text: '電梯門打開。一個很瘦的女人，穿著麵店的圍裙，站在裡面。' },
      { who: 簡如, text: '我可以……從正門出去嗎？' },
      { text: '你替她拉開了大門。' },
      { text: '早上七點，樓下的小公園裡，宋太太和她，一人牽著一邊，帶一隻看不見的老狗散步。' },
      { text: '太陽很大。牠走得很慢，可是是往前走。' },
    ],
  },
  {
    id: 'gone',
    title: '監視器',
    when: { all: ['gave'] },
    summary: '十二樓，真的沒有人了。',
    scene: [
      { text: '禮拜五晚上，你把隨身碟交給魏先生。' },
      { who: 魏先生, text: '謝謝。你是個守規矩的人。' },
      { text: '那天凌晨三點，十二樓的燈沒有亮。' },
      { text: '隔天也沒有。再隔天也沒有。' },
      { text: '一個禮拜以後，宋太太在大白天牽著那隻老狗走過大廳。她沒有看你。' },
      { text: '主委請鎖匠打開 1203。裡面很乾淨：一張床，一個狗碗，一排藥罐，每一罐都只寫著一個「齊」字。' },
      { text: '沒有人知道她去了哪裡。也沒有人知道，魏先生有沒有找到她。' },
      { text: '下一個禮拜二，櫃台上又出現一個寄到「四樓之二」的包裹。' },
      { text: '這一次，一直到早上，都沒有人來拿。' },
    ],
  },
  {
    id: 'nobody',
    title: '十二樓沒有人',
    when: { any: ['erased', 'police'] },
    summary: '你成了這棟樓，第二個說「十二樓沒有人」的人。',
    scene: [
      { text: '禮拜五晚上，魏先生沒有拿到他要的東西。' },
      { text: '他在大廳站了很久，看著那一面信箱牆。然後他走了。' },
      { text: '季伯沒有再來警衛室。抽屜裡，那張寫著密碼的紙還在。' },
      { text: '從那天起，每天早上六點零五分，你都打開錄影主機，輸入 JI-01，按下刪除。' },
      { text: '凌晨三點，十二樓的燈會亮。你不看那一格。' },
      { text: '有一天，新來的早班管理員指著第十六格問你：' },
      { who: '早班管理員', text: '那一格是哪裡？' },
      { who: 你, text: '十二樓。沒有人。' },
    ],
  },
];

/** 結局之後，每個人的尾聲。每個人只會出現第一條成立的。 */
export const EPILOGUES: readonly Epilogue[] = [
  { id: 'song-kept', who: '宋太太', when: { all: ['keptDog'] }, text: '宋太太還是每天一點二十分倒著走回家。後來規約重新投票，「禁養寵物」那一條，以一票之差被拿掉了。' },
  { id: 'song', who: '宋太太', when: {}, text: '806 收到了一張違規通知。宋太太繳了罰款。那隻狗，還是每天一點二十分出門。' },
  { id: 'qi-kept', who: '齊老先生', when: { all: ['keptParcel'] }, text: '齊老先生每個禮拜二早上六點，都會在櫃台放一顆橘子。上面用鉛筆寫著：「給夜班」。' },
  { id: 'qi', who: '齊老先生', when: {}, text: '收件簿上，每個禮拜二都多了一個顫抖的「齊」字。' },
  { id: 'wei-refused', who: 魏先生, when: { all: ['refusedWei'] }, text: '魏先生的那個信封，你一直沒有打開。後來你才知道，裡面是一疊錢，和一張簡如八年前的照片。' },
  { id: 'wei-showed', who: 魏先生, when: { all: ['showedWei'] }, text: '你後來常常想起，魏先生看著第十六格說的那句話：「燈的開關，是新的。」' },
  { id: 'wei-slipped', who: 魏先生, when: { all: ['slipped'] }, text: '那天凌晨，對講機裡你說溜的那一句，你後來想了很多年。' },
  { id: 'wei-suspects', who: 魏先生, when: { all: ['weiSuspects'] }, text: '魏先生後來沒再按過那個門鈴。他說，對講機裡的人說了一句他知道是假的話，他就知道這棟樓在藏東西。' },
  { id: 'wei', who: 魏先生, when: {}, text: '魏先生的名片，你一直收在抽屜最裡面。' },
  { id: 'ji-police', who: '季伯', when: { all: ['police'] }, text: '季伯又開始每天晚上來警衛室坐。不是為了刪錄影，只是來喝茶。' },
  { id: 'ji', who: '季伯', when: {}, text: '季伯的帳號 JI-01，你一直沒有刪。' },
];
