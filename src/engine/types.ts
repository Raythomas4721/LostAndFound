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
  /** 溫伯在說謊或迴避（只限大湯） */
  hesitant?: boolean;
}

export interface Hotspot {
  id: string;
  /** 細看時看到的描述 */
  label: string;
  unlocks: string[];
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  hotspots: Hotspot[];
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
  /** small = 每晚的小湯；big = 秋姨的大湯 */
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
}

export interface Choice {
  id: string;
  prompt: string;
  options: ChoiceOption[];
}

export interface Night {
  n: number;
  title: string;
  intro: Line[];
  soup: Soup;
  afterSoup?: Line[];
  choice?: Choice;
  outro: Line[];
}
