export type Category = '人物' | '物品' | '地點' | '事情' | '時間';
export const CATEGORIES: readonly Category[] = ['人物', '物品', '地點', '事情', '時間'];

export type Reply = '是' | '不是' | '不重要' | '是也不是';

/** 一句台詞。who 省略時是旁白。 */
export interface Line {
  who?: string;
  text: string;
}

export interface Keyword {
  id: string;
  label: string;
  category: Category;
}

export interface Question {
  id: string;
  /** 掛在哪個線索詞底下 */
  topic: string;
  text: string;
  reply: Reply;
  /** 溫伯補充的一句話 */
  say?: string;
  /** 問了之後解鎖的線索詞 */
  unlocks?: string[];
  /** 要先有這些線索詞，這題才會出現 */
  requires?: string[];
  /** 溫伯在說謊或迴避（只限大湯）。一定要有一題 corrects 指向它。 */
  hesitant?: boolean;
  /** 這題是哪一題的更正。出現之後，原本那題就會被藏起來；原本那題問過的話，會自動重新回答。 */
  corrects?: string;
}

export interface Hotspot {
  id: string;
  /** 按鈕上的短名稱，例如「傘柄」 */
  name: string;
  /** 細看時看到的描述 */
  label: string;
  unlocks: string[];
  /** 在插畫上的位置（百分比，左上角是 0,0） */
  at?: [number, number];
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  hotspots: Hotspot[];
  /** 插畫的 id，對應 src/ui/art.tsx */
  art?: string;
}

export interface Blank {
  id: string;
  category: Category;
  /** 正解的線索詞 id */
  answer: string;
}

export interface Sentence {
  id: string;
  /** 用 {blankId} 標出空格的位置 */
  text: string;
  blanks: Blank[];
}

export interface Soup {
  id: string;
  title: string;
  /** small = 每晚的小湯；big = 整本湯本的大湯，最後一晚才喝得完 */
  kind: 'small' | 'big';
  surface: Line[];
  start: string[];
  keywords: Keyword[];
  evidence: Evidence[];
  questions: Question[];
  board: Sentence[];
  reveal: Line[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  /** 選了之後立起來的旗標，給結局和尾聲用 */
  flag?: string;
  /** 選了之後的回應 */
  reply?: Line[];
}

export interface Choice {
  id: string;
  prompt: string;
  options: ChoiceOption[];
}

/**
 * 依旗標決定要不要發生。所有欄位都要成立（AND）：
 * all 全部有、any 至少一個有、none 全部沒有、atLeast 其中至少 n 個有、or 其中一個子條件成立。
 */
export interface Condition {
  all?: string[];
  any?: string[];
  none?: string[];
  atLeast?: { n: number; of: string[] };
  or?: Condition[];
}

/** 喝完湯之後依序發生的事：一段對話，或一個選擇。when 不成立就跳過。 */
export type Step = { kind: 'lines'; lines: Line[]; when?: Condition } | { kind: 'choice'; choice: Choice; when?: Condition };

export interface Night {
  n: number;
  title: string;
  intro: Line[];
  /** 沒有湯的晚上（例如第六晚），開場之後直接進入 after。 */
  soup?: Soup;
  after: Step[];
  /** 這一晚結束時，筆記本大湯頁多出的線索 */
  bigClues?: string[];
  /** 這一晚結束時，大湯解鎖的線索詞 */
  bigUnlocks?: string[];
  /** 背景環境音 */
  ambience?: Ambience;
}

export interface Ending {
  id: string;
  title: string;
  when: Condition;
  /** 結局畫面上的一段話 */
  summary: string;
  /** 結局卡之前播的那一場戲 */
  scene: Line[];
}

export interface Epilogue {
  id: string;
  who: string;
  when: Condition;
  text: string;
}

/** 背景環境音：雨、收音機的雜訊、颱風、夜裡空教室的風和鐘。 */
export type Ambience = 'rain' | 'static' | 'storm' | 'school';

/** 湯本的類型：決定首頁的分類和配色基調。 */
export type Genre = '溫馨' | '怪奇' | '驚悚' | '恐怖' | '懸疑';

/**
 * 介面上跟著湯本換的字：誰回答你、提示叫什麼、失物叫什麼。
 * 引擎不認得這些，只有畫面會用。
 */
export interface StoryVoice {
  /** 回答是非題的人 */
  host: string;
  /** 說謊停頓時用的代名詞 */
  hostPronoun: '他' | '她';
  /** 頂欄的名字 */
  brand: string;
  /** 首頁按鈕和每晚開場的按鈕 */
  begin: string;
  resume: string;
  /** 證物欄的標題，例如「失物」 */
  evidence: string;
  /** 提示按鈕：圖示、文字，以及結局統計的「喝了 N 杯茶」 */
  hint: { icon: string; label: string; used: string; unit: string };
  /** 提示的幾種說法 */
  hintLines: { inspect: string; later: string; done: string };
  /** 大湯還不能喝完時的說明 */
  bigWait: string;
  bigWaitSolved: string;
  /** 結局卡上「這一週的湯」 */
  summaryHeading: string;
  /** 結局卡最下面那一句 */
  endingNote: string;
  /** 「第一晚」之類的叫法：晚、夜、天 */
  unit: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  genre: Genre;
  /** 首頁卡片和開場頁的介紹，一行一句 */
  blurb: string[];
  /** 「七個晚上，約一小時」 */
  length: string;
  /** CSS 的 data-theme，決定配色 */
  theme: string;
  /** localStorage 的 key；各本分開存 */
  saveKey: string;
  voice: StoryVoice;
  nights: readonly Night[];
  endings: readonly Ending[];
  epilogues: readonly Epilogue[];
}

/** 還沒開張的湯本：首頁先擺一張卡。 */
export interface UpcomingStory {
  id: string;
  title: string;
  subtitle: string;
  genre: Genre;
  blurb: string[];
  theme: string;
}
