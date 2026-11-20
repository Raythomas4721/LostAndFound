import type { Night, Soup } from '../../../engine/types';

const 溫伯 = '溫伯';
const 阿琴 = '阿琴';
const 小穗 = '小穗';
const 秋姨 = '秋姨';
const 你 = '你';

const soup: Soup = {
  id: 'bell',
  title: '拆下的鈴鐺',
  kind: 'small',
  surface: [
    { text: '阿琴牽著孫女小穗來。' },
    { who: 阿琴, text: '她說手套掉在這裡。' },
    { text: '你把架上那只藍色毛線手套拿下來。手腕縫著一顆小銅鈴，一動就叮叮響。' },
    { text: '小穗戴上手套，想了想，又脫下來。她低頭咬斷縫線，把鈴鐺拆下來，放在櫃台上。' },
    { who: 小穗, text: '這個留在這裡。給下一個會走丟的人。' },
    { text: '阿琴愣了一下，還來不及問，小穗已經拉著她走了。' },
    { text: '溫伯拿起鈴鐺搖了一下，很久都沒有說話。' },
    { who: 溫伯, text: '……問吧。' },
  ],
  start: ['xiaosui', 'qin', 'you', 'nextlost', 'bell', 'glove', 'platform', 'stall', 'unpick', 'closing', 'tonight', 'sunday'],
  keywords: [
    { id: 'xiaosui', label: '小穗', category: '人物' },
    { id: 'qin', label: '阿琴', category: '人物' },
    { id: 'you', label: '你', category: '人物' },
    { id: 'nextlost', label: '下一個會走丟的人', category: '人物' },
    { id: 'wen', label: '溫伯', category: '人物' },

    { id: 'bell', label: '鈴鐺', category: '物品' },
    { id: 'glove', label: '毛線手套', category: '物品' },
    { id: 'tag', label: '褪色的紙條', category: '物品' },
    { id: 'thread', label: '縫了好幾層的線', category: '物品' },

    { id: 'platform', label: '月台', category: '地點' },
    { id: 'stall', label: '便當攤', category: '地點' },
    { id: 'office', label: '招領處', category: '地點' },

    { id: 'unpick', label: '拆鈴鐺', category: '事情' },
    { id: 'closing', label: '停駛', category: '事情' },
    { id: 'lost', label: '走丟', category: '事情' },
    { id: 'retire', label: '退休', category: '事情' },

    { id: 'tonight', label: '今晚', category: '時間' },
    { id: 'sunday', label: '禮拜天', category: '時間' },
    { id: 'four', label: '四歲', category: '時間' },
  ],
  evidence: [
    {
      id: 'ev-bell',
      art: 'bell',
      name: '小銅鈴',
      description: '一顆拇指大的銅鈴，還綁著一段咬斷的藍色毛線。',
      hotspots: [
        { id: 'hs-tag', at: [79, 42], name: '紙條', label: '鈴鐺的環上綁著一張褪色的小紙條：「招領　第 0412 號」。', unlocks: ['tag', 'office'] },
        { id: 'hs-thread', at: [29, 16], name: '毛線', label: '毛線縫了好幾層，打了三個結。縫的人很怕它掉。', unlocks: ['thread'] },
      ],
    },
  ],
  questions: [
    // 鈴鐺
    { id: 'q-bought', topic: 'bell', text: '鈴鐺是阿琴買的嗎？', reply: '不是' },
    { id: 'q-gift', topic: 'bell', text: '鈴鐺是別人送的嗎？', reply: '是也不是', say: '與其說送，不如說是借她的。' },
    { id: 'q-broken', topic: 'bell', text: '鈴鐺壞了嗎？', reply: '不是', say: '還響得很。' },
    { id: 'q-value', topic: 'bell', text: '鈴鐺很值錢嗎？', reply: '不是' },
    // 紙條、縫線、手套
    { id: 'q-tag', topic: 'tag', text: '紙條上的號碼是招領處的編號嗎？', reply: '是', say: '0412 號。好多年前的了。' },
    { id: 'q-thread', topic: 'thread', text: '鈴鐺是阿琴縫的嗎？', reply: '是', say: '縫得很牢。小穗拆了好一陣子。' },
    { id: 'q-idea', topic: 'thread', text: '縫鈴鐺是阿琴的主意嗎？', reply: '不是' },
    { id: 'q-glove', topic: 'glove', text: '手套跟這件事有關嗎？', reply: '不重要' },
    // 招領處
    { id: 'q-unclaimed', topic: 'office', text: '鈴鐺本來是招領處沒人領的失物嗎？', reply: '是', say: '在架上放了好多年，一直沒人來領。' },
    { id: 'q-staff', topic: 'office', text: '是招領處的人把鈴鐺給小穗的嗎？', reply: '是', say: '那時候夜班只有一個人。', unlocks: ['wen'] },
    // 小穗
    { id: 'q-often', topic: 'xiaosui', text: '小穗很容易走丟嗎？', reply: '是也不是', say: '現在不會了。以前會。', unlocks: ['lost'] },
    { id: 'q-hate', topic: 'xiaosui', text: '小穗討厭鈴鐺嗎？', reply: '不是' },
    { id: 'q-sneak', topic: 'xiaosui', text: '小穗想偷偷跑去哪裡嗎？', reply: '不是' },
    { id: 'q-herself', topic: 'xiaosui', text: '拆鈴鐺是小穗自己決定的嗎？', reply: '是' },
    // 阿琴、你
    { id: 'q-qinknow', topic: 'qin', text: '阿琴知道小穗為什麼拆鈴鐺嗎？', reply: '不是' },
    { id: 'q-you', topic: 'you', text: '這件事跟我有關嗎？', reply: '不是' },
    // 月台、便當攤
    { id: 'q-platform', topic: 'platform', text: '這件事跟月台有關嗎？', reply: '是也不是', say: '她以前在月台底下的樓梯間走丟過。', unlocks: ['lost'] },
    { id: 'q-stall', topic: 'stall', text: '小穗常常待在便當攤嗎？', reply: '是', say: '放學都在那裡寫功課。' },
    // 走丟
    { id: 'q-station', topic: 'lost', text: '她是在車站走丟的嗎？', reply: '是' },
    { id: 'q-young', topic: 'lost', text: '她走丟的時候年紀很小嗎？', reply: '是', say: '四歲。', unlocks: ['four'] },
    { id: 'q-found', topic: 'lost', text: '是溫伯找到她的嗎？', reply: '是', requires: ['wen'], say: '她哭得很大聲，很好找。' },
    // 四歲
    { id: 'q-remember', topic: 'four', text: '小穗還記得那次走丟嗎？', reply: '是', say: '小孩子記得的東西，比大人以為的多。' },
    // 下一個會走丟的人
    { id: 'q-child', topic: 'nextlost', text: '下一個會走丟的人是小孩嗎？', reply: '不是' },
    { id: 'q-someone', topic: 'nextlost', text: '小穗說的是某個特定的人嗎？', reply: '是' },
    { id: 'q-isyou', topic: 'nextlost', text: '下一個會走丟的人是我嗎？', reply: '不是' },
    { id: 'q-iswen', topic: 'nextlost', text: '下一個會走丟的人是溫伯嗎？', reply: '是', requires: ['wen'], say: '……（他看著茶杯）是。' },
    // 溫伯
    { id: 'q-wengave', topic: 'wen', text: '鈴鐺是溫伯給她的嗎？', reply: '是' },
    { id: 'q-retire', topic: 'wen', text: '溫伯要退休了嗎？', reply: '是', say: '禮拜天以後。', unlocks: ['retire'] },
    { id: 'q-closing', topic: 'closing', text: '小穗拆鈴鐺跟停駛有關嗎？', reply: '是', say: '車站要關了，她覺得有些東西該還回來了。' },
    // 退休
    { id: 'q-where', topic: 'retire', text: '溫伯退休以後有地方去嗎？', reply: '是也不是', say: '我跟她說過，我不知道以後要去哪裡。' },
  ],
  board: [
    { id: 's1', text: '鈴鐺本來是{b1}裡沒人領的失物。', blanks: [{ id: 'b1', category: '地點', answer: 'office' }] },
    {
      id: 's2',
      text: '小穗{b2}那年，在車站{b3}過。',
      blanks: [
        { id: 'b2', category: '時間', answer: 'four' },
        { id: 'b3', category: '事情', answer: 'lost' },
      ],
    },
    { id: 's3', text: '找到她、把鈴鐺給她的人，是{b4}。', blanks: [{ id: 'b4', category: '人物', answer: 'wen' }] },
    {
      id: 's4',
      text: '「下一個會走丟的人」是{b5}：他{b6}以後，不知道要去哪裡。',
      blanks: [
        { id: 'b5', category: '人物', answer: 'wen' },
        { id: 'b6', category: '事情', answer: 'retire' },
      ],
    },
  ],
  reveal: [
    { who: 溫伯, text: '四年前的冬天，小穗在車站走丟了。我在月台底下的樓梯間找到她，哭得很大聲。' },
    { who: 溫伯, text: '那顆鈴鐺在招領處的架上放了好多年，一直沒人來領。我把它拿下來，叫阿琴縫在她的手套上。' },
    { who: 溫伯, text: '我跟她說：掛著，下次走丟，大家就聽得到了。等你不會走丟了，再還回來，給下一個會走丟的人。' },
    { text: '他把鈴鐺放在手心。' },
    { who: 溫伯, text: '上禮拜她問我，車站關了以後我要去哪裡。我說，我也不知道。' },
    { text: '他笑了一下。' },
    { who: 溫伯, text: '原來下一個是我。' },
  ],
};

export const night2: Night = {
  n: 2,
  title: '第二晚',
  intro: [
    { text: '今晚沒有下雨。月台上的燈一盞一盞亮起來，便當攤的蒸氣飄進候車室。' },
    { who: 溫伯, text: '昨天那通電話，老潘接得很快。' },
    { text: '他沒再多說，低頭把今天的拾獲單理整齊。' },
  ],
  soup,
  after: [
    {
      kind: 'choice',
      choice: {
        id: 'c-bell',
        prompt: '鈴鐺要怎麼處理？',
        options: [
          {
            id: 'shelf',
            text: '登記成第 0412 號，放回招領處的架上。',
            reply: [
              { text: '你寫好新的標籤，把鈴鐺放回架上最前面的位置。' },
              { who: 溫伯, text: '嗯。照規矩來。' },
            ],
          },
          {
            id: 'to-wen',
            text: '把鈴鐺交給溫伯。「小穗是留給你的。」',
            flag: 'bellToWen',
            reply: [
              { text: '溫伯看著你遞過來的鈴鐺，過了一會兒才接過去。' },
              { text: '他把鈴鐺放進制服胸前的口袋。走路的時候，叮的一聲。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '快打烊的時候，阿琴又回來了，手上捏著一樣東西。' },
        { who: 阿琴, text: '差點忘了，舊倉門口撿到的。' },
        { text: '一把生鏽的小鑰匙，掛牌上寫著「乙-7」。' },
        { text: '溫伯幾乎是立刻站起來。' },
        { who: 溫伯, text: '那是我的。舊倉的銅鑰匙，我找好久了。' },
        { text: '你低頭看手上的鑰匙。是鐵的，鏽得發紅。' },
      ],
    },
    {
      kind: 'choice',
      choice: {
        id: 'c-key',
        prompt: '鑰匙要怎麼辦？',
        options: [
          {
            id: 'give',
            text: '交給溫伯。',
            flag: 'keyGiven',
            reply: [
              { text: '溫伯接過鑰匙，握在手裡，沒有看它。' },
              { who: 溫伯, text: '謝謝。' },
            ],
          },
          {
            id: 'keep',
            text: '「我先登記，明天再給您。」',
            flag: 'keyKept',
            reply: [
              { text: '溫伯的手停在半空中，然後慢慢收回去。' },
              { who: 溫伯, text: '……也好。照規矩來。' },
              { text: '你把鑰匙放進抽屜，上了鎖。' },
            ],
          },
        ],
      },
    },
    {
      kind: 'lines',
      lines: [
        { text: '23:00，秋姨準時推門進來。' },
        { who: 秋姨, text: '綠色的鐵盒，蓋子上壓了一朵花。今天有嗎？' },
        { who: 你, text: '……還沒到。' },
        { text: '她點點頭，像昨天一樣。走到門口時，她回頭看了一眼溫伯的方向。溫伯正在擦一個已經很乾淨的茶杯。' },
      ],
    },
  ],
  bigClues: ['鐵盒的蓋子上壓了一朵花。', '舊倉門口撿到一把鐵鑰匙，掛牌「乙-7」。溫伯說是他的「銅鑰匙」。'],
  bigUnlocks: ['key', 'storeroom'],
};
