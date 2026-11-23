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
  /** 對質規則：說謊的題目，玩家手上有這些線索詞時，可以當場拆穿 */
  contradictedBy?: string[];
  /** 證人規則：這題是問誰（StoryRules.witnesses.people 的 id）；沒寫就是主持人回答 */
  who?: string;
  /** 證人規則：這個人在說謊。同一個線索詞底下一定要有同一句話、說真話的另一個人。 */
  lie?: boolean;
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
  /** 時間軸規則：這一句發生的時間，推理板會照時間排成一條線 */
  time?: string;
  /** 插播：這一句要等湯面翻轉（Soup.twist）之後才出現 */
  twist?: boolean;
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
  /** 限時來電規則：這碗湯是誰打進來的。有寫才會計算通話題數。 */
  caller?: string;
  /** 證人規則：這碗湯裡，某些證人還不能叫名字（例如「吧台的男人」） */
  witnessNames?: Record<string, string>;
  /**
   * 插播：其他句子都填對時，湯面翻轉——播一段插話、湯面多幾句、解鎖新的線索詞，
   * 推理板多出標了 twist 的句子。插話裡的 {last} 會換成玩家最後問的那一題。
   */
  twist?: { label: string; lines: Line[]; surface?: Line[]; unlocks?: string[] };
  /** 換人回答：這一碗不是平常的主持人回答。換上來的人可以說謊（hesitant），也可以被對質。 */
  host?: { name: string; pronoun: '他' | '她'; note: string; confront?: { broken: string; truthful: string; noproof: string } };
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

/** 反過來問你：別人問是非題，你來回答。 */
export interface ReverseQuestion {
  text: string;
  /** 測驗：正確的回答。答錯會有人小聲更正（wrong），不會卡住。沒寫就是怎麼答都可以。 */
  truth?: Reply;
  /** 可以選的回答；預設四個都可以 */
  options?: Reply[];
  /** 選了某個回答之後：對方的反應、立起的旗標 */
  on?: Partial<Record<Reply, { flag?: string; reply?: Line[] }>>;
  /** 答錯時的更正 */
  wrong?: Line[];
}

export interface Reverse {
  id: string;
  /** 問你的人 */
  asker: string;
  /** 標題，例如「換你當溫伯」 */
  heading: string;
  /** 開始之前的說明 */
  intro: Line[];
  /** 只有你看得到的湯底（測驗用） */
  truth?: Line[];
  questions: ReverseQuestion[];
  /** 全部答完之後 */
  outro: Line[];
  /** 測驗全對時，多說的話 */
  perfect?: Line[];
}

/** 假結局：看起來像結局卡，按下去才發現故事還沒完。 */
export interface FakeEnd {
  title: string;
  summary: string;
  /** 假的「後來」 */
  epilogue?: { who: string; text: string }[];
  /** 卡片碎掉之後的那幾句 */
  crack: Line[];
}

/** 喝完湯之後依序發生的事：一段對話、一個選擇、反過來問你、或一張假結局。when 不成立就跳過。 */
export type Step =
  | { kind: 'lines'; lines: Line[]; when?: Condition }
  | { kind: 'choice'; choice: Choice; when?: Condition }
  | { kind: 'reverse'; reverse: Reverse; when?: Condition }
  | { kind: 'fakeEnd'; fakeEnd: FakeEnd; when?: Condition };

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
export type Ambience = 'rain' | 'static' | 'storm' | 'school' | 'hum' | 'bar';

/** 湯本的類型：決定首頁的分類和配色基調。 */
export type Genre = '溫馨' | '怪奇' | '驚悚' | '恐怖' | '懸疑' | '愛情';

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
  /** 回答「不重要」又沒有補充時，主持人隨口說的一句話（亂問也有回應） */
  quips?: string[];
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
  /** 這本湯本的特殊玩法；沒寫就是基本玩法 */
  rules?: StoryRules;
  nights: readonly Night[];
  endings: readonly Ending[];
  epilogues: readonly Epilogue[];
}

/**
 * 每本湯本可以多一點自己的規則。全部都不會讓人卡死：
 * - call：小湯裡有 caller 的碗，一通電話只能問幾題，問完對方掛斷，要回撥才能繼續
 * - confront：大湯裡的謊話，手上有 contradictedBy 的線索詞時可以當場對質拆穿
 * - flashlight：證物一開始是黑的，手電筒每碗只夠照幾個地方；每用一次提示，補一格電
 * - timeline：推理板畫成時間軸，句子前面標著 Sentence.time
 * - witnesses：同一句話可以問好幾個人（Question.who），各說各話；有人說謊（Question.lie）
 */
export interface StoryRules {
  call?: { length: number; hangup: string; callback: string };
  confront?: { label: string; broken: string; truthful: string; noproof: string; tip: string };
  flashlight?: { battery: number; empty: string; refill: string };
  /** 推理板畫成監視器時間軸：每一句前面標著時間 */
  timeline?: { label: string };
  /** 證人：同一個問題問不同的人，回答可能對不上。湯底揭曉時，列出玩家聽到的謊話。 */
  witnesses?: { people: { id: string; name: string }[]; tip: string; clash: string; liesHeading: string };
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
