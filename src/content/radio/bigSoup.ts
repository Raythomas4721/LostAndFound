import type { Soup } from '../../engine/types';

const 老鍾 = '老鍾';

/**
 * 三點零三分的大湯。第一夜結束時打開，線索詞一夜一夜透過 bigUnlocks 多起來。
 * 老鍾在第四夜坦白（解鎖 confession）之前，標了 hesitant 的題目都是謊話；
 * 坦白之後，同一個線索詞底下的更正版（corrects）會取代它們。
 */
export const bigSoup: Soup = {
  id: 'big-303',
  title: '三點零三分',
  kind: 'big',
  surface: [
    { text: '每天凌晨三點零三分，熱線會響。接起來，沒有人說話，只有浪的聲音。' },
    { who: 老鍾, text: '不要掛。' },
  ],
  start: ['zhong', 'caller', 'nobody', 'station', 'silence', 'waves', 'closing', 'three03'],
  keywords: [
    { id: 'zhong', label: '老鍾', category: '人物' },
    { id: 'caller', label: '打電話的人', category: '人物' },
    { id: 'yelu', label: '夜鷺', category: '人物' },
    { id: 'keeper', label: '守燈人', category: '人物' },
    { id: 'oldwoman', label: '一個老太太', category: '人物' },
    { id: 'widow', label: '守燈人的太太', category: '人物' },
    { id: 'ajie', label: '阿傑', category: '人物' },

    { id: 'hotline', label: '燈塔專線', category: '物品' },
    { id: 'note', label: '被撕掉的那一頁', category: '物品' },
    { id: 'signal', label: '電台的訊號', category: '物品' },
    { id: 'flashlight', label: '手電筒', category: '物品' },
    { id: 'transmitter', label: '發射機', category: '物品' },

    { id: 'station', label: '電台', category: '地點' },
    { id: 'lighthouse', label: '北角燈塔', category: '地點' },
    { id: 'sea', label: '海邊', category: '地點' },

    { id: 'nobody', label: '線的另一頭沒有人', category: '事情' },
    { id: 'silence', label: '不說話', category: '事情' },
    { id: 'waves', label: '浪的聲音', category: '事情' },
    { id: 'clockwork', label: '喀喀的聲音', category: '事情' },
    { id: 'closing', label: '停止播送', category: '事情' },
    { id: 'license', label: '執照被收回', category: '事情' },
    { id: 'stroke', label: '中風', category: '事情' },
    { id: 'roger', label: '「燈塔，收到」', category: '事情' },
    { id: 'missed', label: '沒有接到', category: '事情' },
    { id: 'stillon', label: '每天晚上照樣開台', category: '事情' },
    { id: 'confession', label: '老鍾的坦白', category: '事情' },

    { id: 'three03', label: '三點零三分', category: '時間' },
    { id: 'thirty', label: '三十年前', category: '時間' },
    { id: 'twelve', label: '十二年前', category: '時間' },
  ],
  evidence: [],
  questions: [
    // 線的另一頭沒有人（謊）
    { id: 'n-really', topic: 'nobody', text: '線的另一頭，真的沒有人嗎？', reply: '是', hesitant: true, say: '……沒有人。' },
    { id: 'n-really-t', topic: 'nobody', text: '線的另一頭，真的沒有人嗎？', reply: '不是', corrects: 'n-really', requires: ['confession'], say: '有。三十年來，每天晚上都有。' },
    { id: 'n-ghost', topic: 'nobody', text: '打來的是鬼嗎？', reply: '不是' },

    // 打電話的人
    { id: 'c-alive', topic: 'caller', text: '打電話的人還活著嗎？', reply: '是' },
    { id: 'c-old', topic: 'caller', text: '打電話的是一個老人嗎？', reply: '是', say: '一個老太太。', unlocks: ['oldwoman'] },
    { id: 'c-know', topic: 'caller', text: '老鍾，你知道是誰打來的嗎？', reply: '不是', hesitant: true, say: '……不知道。' },
    { id: 'c-know-t', topic: 'caller', text: '老鍾，你知道是誰打來的嗎？', reply: '是', corrects: 'c-know', requires: ['confession'], say: '我知道。三十年來每一天都知道。' },

    // 不說話、浪的聲音
    { id: 'si-prank', topic: 'silence', text: '不說話，是在惡作劇嗎？', reply: '不是' },
    { id: 'si-cant', topic: 'silence', text: '她不說話，是因為說不出來嗎？', reply: '是', requires: ['oldwoman'], unlocks: ['stroke'] },
    { id: 'si-wait', topic: 'silence', text: '她打來，是在等這邊說什麼嗎？', reply: '是', requires: ['oldwoman'], say: '等一句話。' },
    { id: 'w-sea', topic: 'waves', text: '浪的聲音，是因為她在海邊打的嗎？', reply: '是', unlocks: ['sea'] },

    // 老太太
    { id: 'o-wife', topic: 'oldwoman', text: '老太太是守燈人的太太嗎？', reply: '是', requires: ['keeper'], unlocks: ['widow'] },
    { id: 'o-yelu', topic: 'oldwoman', text: '老太太是夜鷺的家人嗎？', reply: '不是' },
    { id: 'o-ajie', topic: 'oldwoman', text: '老太太認識阿傑嗎？', reply: '不重要' },

    // 喀喀的聲音
    { id: 'cw-lens', topic: 'clockwork', text: '喀喀的聲音，是燈塔上的什麼東西在轉嗎？', reply: '是', say: '燈拆了，可是轉燈的齒輪還在。她每天晚上都會去轉一圈。', unlocks: ['lighthouse'] },
    { id: 'cw-clock', topic: 'clockwork', text: '喀喀的聲音是時鐘嗎？', reply: '不是' },

    // 燈塔專線
    { id: 'h-where', topic: 'hotline', text: '專線的另一頭，是北角燈塔嗎？', reply: '是', unlocks: ['lighthouse'] },
    { id: 'h-old', topic: 'hotline', text: '專線是三十年前就有的嗎？', reply: '是', say: '颱風、海象，燈塔都靠這條線告訴我們。' },

    // 燈塔
    { id: 'l-climb', topic: 'lighthouse', text: '她每天晚上都會爬上燈塔嗎？', reply: '是', requires: ['oldwoman'] },
    { id: 'l-locked', topic: 'lighthouse', text: '燈塔的門鎖住，她就打不了這通電話嗎？', reply: '是' },

    // 守燈人
    { id: 'k-call', topic: 'keeper', text: '三十年前的颱風夜，守燈人也在三點零三分打過這條線嗎？', reply: '是', requires: ['hotline'] },
    { id: 'k-name', topic: 'keeper', text: '守燈人姓莊嗎？', reply: '是' },

    // 老鍾
    { id: 'z-duty', topic: 'zhong', text: '三十年前那一夜，是你值班嗎？', reply: '不是', hesitant: true, say: '……不是我。' },
    { id: 'z-duty-t', topic: 'zhong', text: '三十年前那一夜，是你值班嗎？', reply: '是', corrects: 'z-duty', requires: ['confession'], say: '是我。只有我。' },
    { id: 'z-why', topic: 'zhong', text: '老鍾每天晚上開台，是為了接這通電話嗎？', reply: '是', say: '每一天。', unlocks: ['stillon'] },
    { id: 'z-owe', topic: 'zhong', text: '老鍾欠打電話的人什麼嗎？', reply: '是' },

    // 訊號（謊）
    { id: 's-legal', topic: 'signal', text: '電台的訊號是合法的嗎？', reply: '是', hesitant: true, say: '……當然。' },
    { id: 's-legal-t', topic: 'signal', text: '電台的訊號是合法的嗎？', reply: '不是', corrects: 's-legal', requires: ['confession'], unlocks: ['license'] },
    { id: 's-aim', topic: 'signal', text: '訊號是特地對著北角的嗎？', reply: '是', requires: ['lighthouse'] },

    // 被撕掉的那一頁（謊）
    { id: 'p-yelu', topic: 'note', text: '那一頁是夜鷺撕掉的嗎？', reply: '是', hesitant: true, say: '……大概吧。' },
    { id: 'p-yelu-t', topic: 'note', text: '那一頁是夜鷺撕掉的嗎？', reply: '不是', corrects: 'p-yelu', requires: ['confession'], say: '是我撕的。' },
    { id: 'p-words', topic: 'note', text: '被撕掉的，是要對打電話的人說的話嗎？', reply: '是', requires: ['confession'] },

    // 夜鷺
    { id: 'y-knew', topic: 'yelu', text: '夜鷺知道是誰打來的嗎？', reply: '是' },
    { id: 'y-said', topic: 'yelu', text: '夜鷺接到這通電話，都會說同一句話嗎？', reply: '是', say: '「燈塔，收到。今晚海面平靜。」', unlocks: ['roger'] },
    { id: 'y-quit', topic: 'yelu', text: '夜鷺不做了，跟這通電話有關嗎？', reply: '不重要', say: '她要結婚了。' },

    // 停止播送、執照
    { id: 'cl-caught', topic: 'closing', text: '電台要停，是因為被查到了嗎？', reply: '是', requires: ['license'], say: '禮拜天要來拆發射機。' },
    { id: 'cl-money', topic: 'closing', text: '電台要停，是因為沒有錢嗎？', reply: '不是' },
    { id: 'li-still', topic: 'license', text: '執照收回以後，電台還是每天晚上播嗎？', reply: '是', unlocks: ['stillon'] },
    { id: 'tr-hide', topic: 'transmitter', text: '發射機是老鍾自己藏起來的嗎？', reply: '是' },

    // 沒有接到、中風
    { id: 'm-who', topic: 'missed', text: '三十年前沒有接到電話的，是老鍾嗎？', reply: '是' },
    { id: 'st-when', topic: 'stroke', text: '她是中風以後，才開始不說話的嗎？', reply: '是', say: '以前她會說：「這裡是燈塔。」' },

    // 時間
    { id: 't-why', topic: 'three03', text: '三點零三分這個時間很重要嗎？', reply: '是', say: '三十年前的那一通，也是三點零三分。' },
    { id: 't-twelve', topic: 'twelve', text: '十二年前，電台就應該停播了嗎？', reply: '是' },
  ],
  board: [
    { id: 'g1', text: '三點零三分的電話，是從{c1}的專線打來的。', blanks: [{ id: 'c1', category: '地點', answer: 'lighthouse' }] },
    { id: 'g2', text: '打電話的是{c2}。她說不出話，在等這邊說一句{c3}。', blanks: [{ id: 'c2', category: '人物', answer: 'widow' }, { id: 'c3', category: '事情', answer: 'roger' }] },
    {
      id: 'g3',
      text: '三十年前的颱風夜，{c4}打來那一通，值班的{c5}沒有接到。',
      blanks: [
        { id: 'c4', category: '人物', answer: 'keeper' },
        { id: 'c5', category: '人物', answer: 'zhong' },
      ],
    },
    {
      id: 'g4',
      text: '電台的{c6}，老鍾還是{c7}，只為了這通電話有人接。',
      blanks: [
        { id: 'c6', category: '事情', answer: 'license' },
        { id: 'c7', category: '事情', answer: 'stillon' },
      ],
    },
  ],
  reveal: [
    { who: 老鍾, text: '三十年前的颱風夜，三點零三分，燈塔專線響了。是守燈人莊進海，要我們叫海上的船回港。' },
    { who: 老鍾, text: '播音室裡沒有人。我在屋頂上修天線。' },
    { who: 老鍾, text: '他自己爬上燈塔，用手電筒照了一整夜的海。船都回來了。他沒有。' },
    { who: 老鍾, text: '他太太後來中風，說不出話。可是她每天晚上還是走去燈塔，爬上去照一次海。三點零三分，拿起那支專線。' },
    { who: 老鍾, text: '她在等那天晚上，沒有人對她先生說的那一句。' },
    { who: 老鍾, text: '十二年前執照收回，我把發射機藏在山上，每天晚上照樣開台。只為了三點零三分，這條線有人接。' },
    { who: 老鍾, text: '夜鷺替我說了八年：「燈塔，收到。今晚海面平靜。」' },
    { text: '老鍾看著那顆熱線燈。三點零二分。' },
    { who: 老鍾, text: '這是最後一次了。' },
  ],
};
