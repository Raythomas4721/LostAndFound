import type { Night, Soup } from '../../engine/types';

const 老鍾 = '老鍾';
const 小苡 = '小苡';
const 你 = '你';

/** 第一夜：點給「陳先生」的歌。陳先生是一隻鸚鵡，那句「謝謝，晚安」是牠學過世的爺爺說的。 */
const soup: Soup = {
  id: 'parrot',
  title: '點給陳先生的歌',
  kind: 'small',
  caller: '小苡',
  surface: [
    { text: '凌晨一點十二分，第一通電話。是一個年輕女孩。' },
    { who: 小苡, text: '我想點一首〈港邊的燈〉，給陳先生。' },
    { text: '你翻了翻前任主持人留下的筆記。上面有一行：「陳先生，去年春天過世。」' },
    { who: 你, text: '……陳先生他，聽得到嗎？' },
    { who: 小苡, text: '聽得到。他要聽完才睡得著。' },
    { text: '歌放完了。電話那頭，一個蒼老的男人聲音，慢慢地說：' },
    { who: '電話裡的聲音', text: '謝謝，晚安。' },
    { text: '電話掛了。玻璃另一邊，導播老鍾按下對講鈕。' },
    { who: 老鍾, text: '想知道怎麼回事？問我。我只回答是、不是。這個鎮上的事，我大概都知道。' },
  ],
  start: ['xiaoyi', 'chen', 'voice', 'song', 'notes', 'prank', 'everynight'],
  keywords: [
    { id: 'xiaoyi', label: '小苡', category: '人物' },
    { id: 'chen', label: '陳先生', category: '人物' },
    { id: 'voice', label: '電話裡的聲音', category: '人物' },
    { id: 'grandpa', label: '小苡的爺爺', category: '人物' },
    { id: 'parrot', label: '一隻鸚鵡', category: '人物' },

    { id: 'song', label: '〈港邊的燈〉', category: '物品' },
    { id: 'notes', label: '前任主持人的筆記', category: '物品' },

    { id: 'chenhouse', label: '海口路的陳家', category: '地點' },

    { id: 'prank', label: '惡作劇', category: '事情' },
    { id: 'died', label: '去年春天過世', category: '事情' },
    { id: 'goodnight', label: '說晚安', category: '事情' },
    { id: 'mimic', label: '學人說話', category: '事情' },
    { id: 'nosleep', label: '聽不到歌就不睡', category: '事情' },

    { id: 'everynight', label: '每天晚上', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-notes',
      art: 'notes',
      name: '夜鷺的筆記本',
      description: '前任主持人「夜鷺」留下的筆記本，記著老聽眾的習慣。字很小，很整齊。',
      hotspots: [
        { id: 'hs-line', at: [12, 27], name: '那一行字', label: '「陳先生（去年春天過世）——每晚點〈港邊的燈〉。」', unlocks: ['died'] },
        { id: 'hs-doodle', at: [92, 30], name: '頁邊的塗鴉', label: '頁邊畫了一隻小鳥，旁邊寫著：「別忘了說晚安。」', unlocks: ['goodnight'] },
        { id: 'hs-addr', at: [12, 74], name: '來電地址', label: '來電地址：海口路 12 號，陳家。', unlocks: ['chenhouse'] },
      ],
    },
  ],
  questions: [
    // 小苡
    { id: 'q-xy-family', topic: 'xiaoyi', text: '小苡跟陳先生是一家人嗎？', reply: '是也不是', say: '陳先生是她爺爺留下來的。', unlocks: ['grandpa'] },
    { id: 'q-xy-lie', topic: 'xiaoyi', text: '小苡在說謊嗎？', reply: '不是' },
    // 惡作劇
    { id: 'q-prank', topic: 'prank', text: '這是惡作劇嗎？', reply: '不是' },
    // 陳先生
    { id: 'q-c-dead', topic: 'chen', text: '陳先生過世了嗎？', reply: '不是', say: '過世的是另一個人。' },
    { id: 'q-c-human', topic: 'chen', text: '陳先生是人嗎？', reply: '不是', unlocks: ['parrot'] },
    { id: 'q-c-ghost', topic: 'chen', text: '陳先生是鬼嗎？', reply: '不是' },
    { id: 'q-c-old', topic: 'chen', text: '陳先生年紀很大嗎？', reply: '是', say: '以牠來說，算很老了。' },
    // 電話裡的聲音
    { id: 'q-v-chen', topic: 'voice', text: '說「謝謝，晚安」的是陳先生嗎？', reply: '是', say: '聲音是陳先生發出來的。但那不是他自己的聲音。' },
    { id: 'q-v-record', topic: 'voice', text: '那是一段錄音嗎？', reply: '不是' },
    { id: 'q-v-old', topic: 'voice', text: '那是一個老人的聲音嗎？', reply: '是也不是', say: '聽起來是。' },
    // 筆記
    { id: 'q-n-same', topic: 'notes', text: '筆記上的陳先生，跟小苡說的陳先生，是同一個嗎？', reply: '不是', say: '筆記寫的是小苡的爺爺。夜鷺也叫他陳先生。', unlocks: ['grandpa'] },
    { id: 'q-n-wrong', topic: 'notes', text: '筆記寫錯了嗎？', reply: '不是' },
    // 過世
    { id: 'q-d-who', topic: 'died', text: '過世的是小苡的爺爺嗎？', reply: '是', unlocks: ['grandpa'] },
    // 爺爺
    { id: 'q-g-listen', topic: 'grandpa', text: '爺爺以前也聽這個節目嗎？', reply: '是', say: '每天晚上，一邊聽，一邊跟陳先生說話。' },
    { id: 'q-g-said', topic: 'grandpa', text: '爺爺每晚聽完歌，都會說「謝謝，晚安」嗎？', reply: '是', say: '那是他每天晚上的最後一句話。' },
    { id: 'q-g-name', topic: 'grandpa', text: '「陳先生」這個名字，是爺爺取的嗎？', reply: '是', requires: ['parrot'], say: '他說，這樣家裡就有兩個陳先生。' },
    // 鸚鵡
    { id: 'q-p-copy', topic: 'parrot', text: '牠會學爺爺的聲音嗎？', reply: '是', unlocks: ['mimic'] },
    { id: 'q-p-sleep', topic: 'parrot', text: '牠聽不到這首歌，就不睡覺嗎？', reply: '是', say: '爺爺走了以後，牠每天晚上叫到天亮。', unlocks: ['nosleep'] },
    { id: 'q-p-sick', topic: 'parrot', text: '牠生病了嗎？', reply: '不重要' },
    // 說晚安
    { id: 'q-gn-voice', topic: 'goodnight', text: '「別忘了說晚安」跟電話裡的那句話有關嗎？', reply: '是', requires: ['parrot'], say: '說晚安的不是主持人。', unlocks: ['mimic'] },
    // 歌
    { id: 'q-s-other', topic: 'song', text: '換一首歌也可以嗎？', reply: '不是', requires: ['parrot'], say: '牠只認這一首。' },
    { id: 'q-s-special', topic: 'song', text: '這首歌對小苡很特別嗎？', reply: '不重要' },
    // 陳家
    { id: 'q-h-alone', topic: 'chenhouse', text: '陳家現在只剩小苡一個人嗎？', reply: '是也不是', say: '還有陳先生。' },
  ],
  board: [
    { id: 's1', text: '陳先生是{b1}。', blanks: [{ id: 'b1', category: '人物', answer: 'parrot' }] },
    { id: 's2', text: '牠的主人{b2}，去年春天過世了。', blanks: [{ id: 'b2', category: '人物', answer: 'grandpa' }] },
    { id: 's3', text: '電話裡那句「謝謝，晚安」，是牠在{b3}。', blanks: [{ id: 'b3', category: '事情', answer: 'mimic' }] },
    { id: 's4', text: '爺爺走了以後，牠{b4}，小苡只好每天晚上打電話來點歌。', blanks: [{ id: 'b4', category: '事情', answer: 'nosleep' }] },
  ],
  reveal: [
    { who: 老鍾, text: '陳伯是汐見最老的漁夫，也是這個節目最老的聽眾。' },
    { who: 老鍾, text: '他養了一隻灰鸚鵡，取名叫「陳先生」。他說，這樣家裡就有兩個陳先生。' },
    { who: 老鍾, text: '每天晚上，他陪陳先生聽完〈港邊的燈〉，說一句「謝謝，晚安」，關燈睡覺。' },
    { who: 老鍾, text: '去年春天，陳伯走了。陳先生每天晚上叫到天亮，誰哄都沒用。' },
    { who: 老鍾, text: '後來小苡想到：打電話來點那首歌。歌放完，陳先生就會用爺爺的聲音說「謝謝，晚安」，然後安安靜靜地睡了。' },
    { text: '老鍾放開對講鈕，又按下去。' },
    { who: 老鍾, text: '這個鎮上，還在聽我們的，就剩這些了。' },
  ],
};

export const night1: Night = {
  n: 1,
  title: '第一夜',
  ambience: 'static',
  intro: [
    { text: '汐見鎮在海邊。山上有一座小小的電台：汐見之聲，FM 87.3。' },
    { text: '你是代班的深夜主持人。原本的主持人「夜鷺」上個月突然不做了，只留下一本筆記。' },
    { who: 老鍾, text: '節目叫《不關燈》，一點到四點。有人打電話進來，你就聽他說。' },
    { text: '他敲了敲玻璃，指著牆上的一張公告：本台將於本週日起停止播送。' },
    { who: 老鍾, text: '做完這個禮拜，就收了。' },
    { who: 老鍾, text: '還有一件事。三點零三分，熱線會響。不要掛。' },
    { who: 你, text: '誰打來的？' },
    { who: 老鍾, text: '……接了你就知道了。' },
  ],
  soup,
  after: [
    {
      kind: 'lines',
      lines: [
        { text: '三點零三分。熱線的燈亮了。' },
        { text: '你接起來。電話那頭沒有人說話。' },
        { text: '只有浪的聲音，一下，一下，很遠。還有風。' },
        { who: 你, text: '喂？您好，這裡是汐見之聲。' },
        { text: '沒有回答。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-303',
        prompt: '電話那頭一直沒有聲音。你：',
        options: [
          {
            id: 'hangup',
            text: '「可能是打錯了。」把電話掛掉。',
            reply: [
              { text: '你掛了電話。玻璃另一邊，老鍾的手停在半空中。' },
              { who: 老鍾, text: '……下次不要掛。' },
            ],
          },
          {
            id: 'wait',
            text: '「沒關係，我在聽。」一直等到對方先掛。',
            flag: 'waited',
            reply: [
              { text: '你等了很久。浪的聲音一直沒有停。' },
              { text: '三點十一分，電話那頭輕輕地掛了。' },
              { text: '玻璃另一邊，老鍾看著你，點了點頭。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '四點，節目結束。你收拾東西的時候，問老鍾：' },
        { who: 你, text: '那通電話，每天都打來嗎？' },
        { who: 老鍾, text: '每天。三點零三分。' },
        { who: 你, text: '來電顯示是空的。' },
        { who: 老鍾, text: '那條線的另一頭，三十年前就沒有人了。' },
      ],
    },
  ],
  bigClues: [
    '湯面：每天凌晨三點零三分，熱線會響。接起來沒有人說話，只有浪的聲音。',
    '老鍾說：「不要掛。」',
    '來電顯示是空的。老鍾說：「那條線的另一頭，三十年前就沒有人了。」',
    '電台這個禮拜天就要停止播送。',
  ],
};
