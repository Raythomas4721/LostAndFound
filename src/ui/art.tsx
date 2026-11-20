// 失物插畫：每張都是 240×160 的 SVG，用簡單的線條和色塊畫。
// 熱點的位置寫在內容資料（Hotspot.at，百分比），這裡只負責畫。

const INK = '#2a2116';
const PAPER = '#efe3c6';
const PAPER_DARK = '#d8c69e';
const BRASS = '#c99a3d';
const BRASS_DARK = '#8a6420';

function Umbrella() {
  return (
    <>
      {/* 收起來的傘身 */}
      <path d="M58 132 L170 30 L184 40 L76 140 Z" fill="#1b1d22" stroke="#0c0d10" strokeWidth="2" />
      <path d="M80 118 L172 34" stroke="#3a3d45" strokeWidth="2" />
      <path d="M96 116 L176 40" stroke="#3a3d45" strokeWidth="1.5" />
      {/* 傘尖 */}
      <path d="M170 30 L196 10" stroke="#9aa0a8" strokeWidth="3" strokeLinecap="round" />
      {/* 斷掉、纏著膠帶的傘骨 */}
      <path d="M150 62 L168 74" stroke="#9aa0a8" strokeWidth="2" />
      <rect x="152" y="62" width="12" height="7" rx="1" fill="#e7dcae" transform="rotate(35 158 65)" opacity="0.9" />
      {/* 木頭彎柄 */}
      <path d="M66 136 L48 152 C34 164 14 150 26 136" fill="none" stroke="#7a4b22" strokeWidth="9" strokeLinecap="round" />
      <path d="M40 148 l4 -2" stroke="#3b2410" strokeWidth="1.5" />
      <text x="38" y="153" fontSize="8" fill="#f2c46d" fontFamily="serif">秋</text>
      {/* 拾獲標籤 */}
      <path d="M118 96 L132 112" stroke={INK} strokeWidth="1" />
      <rect x="124" y="108" width="40" height="22" rx="2" fill={PAPER} stroke={PAPER_DARK} transform="rotate(12 144 119)" />
      <path d="M130 116 h26 M130 122 h20" stroke="#8a7a5a" strokeWidth="1.2" transform="rotate(12 144 119)" />
    </>
  );
}

function Bell() {
  return (
    <>
      {/* 藍色毛線 */}
      <path d="M40 30 C70 10 90 50 120 34" fill="none" stroke="#4a78c2" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 30 l-8 -6 M40 30 l-9 2" stroke="#4a78c2" strokeWidth="2" strokeLinecap="round" />
      {/* 環 */}
      <circle cx="120" cy="40" r="8" fill="none" stroke={BRASS_DARK} strokeWidth="3" />
      {/* 鈴身 */}
      <path d="M92 104 C92 62 106 48 120 48 C134 48 148 62 148 104 Z" fill={BRASS} stroke={BRASS_DARK} strokeWidth="2" />
      <rect x="86" y="102" width="68" height="8" rx="4" fill={BRASS_DARK} />
      <circle cx="120" cy="116" r="6" fill={BRASS_DARK} />
      <path d="M104 70 C106 60 112 56 118 55" stroke="#f3d48a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 紙條 */}
      <path d="M128 40 L170 58" stroke={INK} strokeWidth="1" />
      <g transform="rotate(14 190 66)">
        <rect x="166" y="54" width="52" height="26" rx="2" fill={PAPER} stroke={PAPER_DARK} />
        <text x="172" y="66" fontSize="7" fill="#6b5a3a" fontFamily="serif">招領</text>
        <text x="172" y="76" fontSize="7" fill="#6b5a3a" fontFamily="serif">0412</text>
      </g>
    </>
  );
}

function VisitorPass() {
  return (
    <>
      <rect x="34" y="22" width="172" height="116" rx="8" fill="#f4f0e4" stroke="#bfb59a" strokeWidth="2" />
      <rect x="34" y="22" width="172" height="26" rx="8" fill="#5f8f86" />
      <rect x="34" y="40" width="172" height="8" fill="#5f8f86" />
      <text x="96" y="40" fontSize="13" fill="#fff" fontFamily="serif" fontWeight="700">探病證</text>
      <path d="M50 66 h110 M50 82 h70" stroke="#8b8b80" strokeWidth="2" />
      <text x="50" y="104" fontSize="9" fill="#555" fontFamily="serif">病人：</text>
      {/* 被雨水暈開的名字 */}
      <ellipse cx="104" cy="101" rx="26" ry="9" fill="#9fb2c8" opacity="0.55" />
      <text x="84" y="104" fontSize="10" fill="#334" fontFamily="serif">卓</text>
      {/* 雨滴痕 */}
      <circle cx="170" cy="112" r="7" fill="#9fb2c8" opacity="0.35" />
      <circle cx="154" cy="70" r="5" fill="#9fb2c8" opacity="0.3" />
      {/* 翻起的角：背面有字 */}
      <path d="M206 108 L206 138 L176 138 Z" fill="#e2dccb" stroke="#bfb59a" />
      <path d="M186 132 l12 -12" stroke="#5560a0" strokeWidth="1" />
    </>
  );
}

function ChildHat() {
  return (
    <>
      <path d="M58 118 C56 64 86 40 120 40 C154 40 184 64 182 118 Z" fill="#c2412f" stroke="#7d2318" strokeWidth="2" />
      {/* 針織紋路 */}
      {[80, 100, 120, 140, 160].map((x) => (
        <path key={x} d={`M${x} 52 C${x - 2} 80 ${x - 2} 100 ${x} 116`} stroke="#9e3123" strokeWidth="1.5" fill="none" />
      ))}
      {/* 帽沿 */}
      <rect x="52" y="112" width="136" height="22" rx="6" fill="#d9543f" stroke="#7d2318" strokeWidth="2" />
      <path d="M60 118 h120 M60 126 h120" stroke="#b5402e" strokeWidth="1" />
      <text x="168" y="129" fontSize="8" fill="#fff" fontFamily="serif">安</text>
      {/* 縫回去的毛球 */}
      <circle cx="120" cy="32" r="15" fill="#e8705c" stroke="#7d2318" strokeWidth="2" />
      <path d="M112 42 l3 4 l3 -4 l3 4 l3 -4 l3 4" stroke="#fff" strokeWidth="1.2" fill="none" />
    </>
  );
}

function LedgerPage() {
  return (
    <>
      <rect x="30" y="14" width="180" height="132" fill={PAPER} stroke={PAPER_DARK} strokeWidth="2" />
      <path d="M30 34 h180" stroke="#b08d57" />
      <path d="M70 14 v132" stroke="#c9a6a6" />
      {[50, 66, 82, 98, 114, 130].map((y) => (
        <path key={y} d={`M30 ${y} h180`} stroke="#d7c7a2" />
      ))}
      <text x="78" y="29" fontSize="9" fill="#6b5a3a" fontFamily="serif">招領登記簿</text>
      {/* 這一筆 */}
      <rect x="72" y="52" width="136" height="44" fill="#f2c46d" opacity="0.25" />
      <text x="76" y="63" fontSize="8" fill={INK} fontFamily="serif">童帽一頂　已領取</text>
      <text x="76" y="78" fontSize="8" fill={INK} fontFamily="serif">拾獲：支線車廂</text>
      <text x="76" y="93" fontSize="8" fill={INK} fontFamily="serif">經手人：葉美華</text>
      {/* 日期被水漬蓋掉 */}
      <ellipse cx="50" cy="74" rx="18" ry="22" fill="#a89a74" opacity="0.4" />
    </>
  );
}

function PocketWatch() {
  return (
    <>
      {/* 斷掉的錶鏈 */}
      <path d="M120 40 C120 24 140 16 160 20 C178 24 190 16 196 8" fill="none" stroke={BRASS_DARK} strokeWidth="3" strokeDasharray="5 3" />
      <path d="M196 8 l6 -4" stroke={BRASS_DARK} strokeWidth="3" />
      <circle cx="120" cy="38" r="6" fill="none" stroke={BRASS_DARK} strokeWidth="3" />
      {/* 錶身 */}
      <circle cx="120" cy="92" r="50" fill={BRASS} stroke={BRASS_DARK} strokeWidth="3" />
      <circle cx="120" cy="92" r="40" fill="#f5ecd2" stroke={BRASS_DARK} strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={120 + Math.sin(a) * 33} cy={92 - Math.cos(a) * 33} r="1.6" fill={INK} />;
      })}
      <path d="M120 92 L120 66 M120 92 L138 100" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="92" r="3" fill={INK} />
      {/* 打開一半的錶蓋 */}
      <path d="M70 92 C70 60 86 44 104 42 L96 92 Z" fill="#b5852e" stroke={BRASS_DARK} strokeWidth="2" opacity="0.9" />
    </>
  );
}

function BusinessCard() {
  return (
    <>
      <rect x="36" y="34" width="168" height="96" rx="4" fill="#f7f5ef" stroke="#c9c3b2" strokeWidth="2" transform="rotate(-4 120 82)" />
      <g transform="rotate(-4 120 82)">
        <text x="52" y="60" fontSize="9" fill="#7a6a4a" fontFamily="serif">仲達古物</text>
        <text x="52" y="86" fontSize="16" fill={INK} fontFamily="serif" fontWeight="700">方仲達</text>
        <path d="M52 100 h120 M52 110 h96" stroke="#b3ab98" strokeWidth="1.5" />
        <rect x="160" y="48" width="28" height="28" fill="none" stroke="#a8432f" strokeWidth="2" />
        <text x="165" y="67" fontSize="10" fill="#a8432f" fontFamily="serif">古</text>
      </g>
    </>
  );
}

// ── 凌晨三點的電台 ──

/** 夜鷺的筆記本：一頁手寫，頁邊有小鳥。 */
function NotesPage() {
  return (
    <>
      <rect x="22" y="10" width="196" height="142" rx="3" fill={PAPER} stroke={PAPER_DARK} />
      <path d="M40 10 v142" stroke="#d9a3a3" strokeWidth="1" />
      {[30, 46, 62, 78, 94, 110, 126, 142].map((y) => (
        <path key={y} d={`M24 ${y} h192`} stroke="#c9d3df" strokeWidth="0.8" />
      ))}
      <text x="46" y="27" fontSize="8" fill="#6b5a3a" fontFamily="serif">老聽眾</text>
      <text x="46" y="43" fontSize="8.5" fill="#3a3226" fontFamily="serif">陳先生（去年春天過世）</text>
      <text x="46" y="57" fontSize="7.5" fill="#3a3226" fontFamily="serif">每晚點〈港邊的燈〉</text>
      <path d="M46 46 h108" stroke="#b5452f" strokeWidth="1" opacity="0.6" />
      {/* 小鳥塗鴉 */}
      <g transform="translate(176 52)" stroke="#3a3226" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <ellipse cx="14" cy="14" rx="11" ry="8" />
        <circle cx="23" cy="9" r="5" />
        <path d="M28 9 l5 1 -5 2" />
        <path d="M4 16 l-7 5" />
        <circle cx="24" cy="8" r="0.8" fill="#3a3226" />
      </g>
      <text x="168" y="92" fontSize="6.5" fill="#6b5a3a" fontFamily="serif">別忘了說晚安</text>
      <text x="46" y="122" fontSize="7.5" fill="#3a3226" fontFamily="serif">海口路 12 號・陳家</text>
      <text x="46" y="138" fontSize="7" fill="#8a7a5a" fontFamily="serif">01:10 前後來電</text>
    </>
  );
}

/** 來電紀錄表。 */
function CallLog() {
  const rows = [52, 70, 88, 106, 124, 142];
  return (
    <>
      <rect x="16" y="8" width="208" height="146" rx="2" fill="#f4f1e6" stroke="#cfc8b2" />
      <rect x="16" y="8" width="208" height="20" fill="#2f4a3c" />
      <text x="24" y="22" fontSize="9" fill="#e7f1e8" fontFamily="serif">汐見之聲 FM 87.3　來電紀錄</text>
      <text x="160" y="22" fontSize="6.5" fill="#b9cdbf" fontFamily="serif">功率</text>
      <rect x="178" y="13" width="32" height="11" rx="2" fill="#f4f1e6" opacity="0.9" />
      <path d="M16 40 h208" stroke="#8a9a8f" />
      <text x="22" y="37" fontSize="7" fill="#4a5a50">時間</text>
      <text x="66" y="37" fontSize="7" fill="#4a5a50">來電</text>
      <text x="150" y="37" fontSize="7" fill="#4a5a50">備註</text>
      {rows.map((y) => (
        <path key={y} d={`M16 ${y} h208`} stroke="#d4d9d2" />
      ))}
      <path d="M60 28 v126 M144 28 v126" stroke="#d4d9d2" />
      <text x="22" y="66" fontSize="7.5" fill="#33302a">01:47</text>
      <path d="M66 63 c8 -6 14 4 22 -2 s10 6 18 0 s8 4 14 -2" stroke="#33302a" fill="none" strokeWidth="1.1" />
      <text x="150" y="66" fontSize="7" fill="#33302a">女孩・七歲</text>
      <rect x="18" y="54" width="122" height="14" fill="none" stroke="#c4673a" strokeDasharray="3 2" />
      <text x="22" y="102" fontSize="7.5" fill="#33302a">02:00</text>
      <text x="150" y="102" fontSize="7" fill="#2f4a3c">海象報告</text>
      <text x="150" y="111" fontSize="6" fill="#2f4a3c">（給海上的船）鍾</text>
      <text x="22" y="138" fontSize="7.5" fill="#33302a">03:03</text>
      <text x="66" y="138" fontSize="7" fill="#9a958a">（無聲）</text>
    </>
  );
}

/** 阿傑的照片：燈塔門口的石階、手電筒、門上的鐵鍊。 */
function LighthouseDoor() {
  return (
    <>
      <rect x="0" y="0" width="240" height="160" fill="#1a2421" />
      {/* 門 */}
      <rect x="150" y="10" width="72" height="112" fill="#3b4440" stroke="#59625d" strokeWidth="2" />
      <path d="M186 10 v112" stroke="#2a312e" strokeWidth="2" />
      {/* 鐵鍊 */}
      <path d="M152 52 C170 62 200 62 220 52" fill="none" stroke="#b9bdb8" strokeWidth="3" strokeDasharray="5 3" />
      <rect x="180" y="28" width="30" height="20" fill="#ece8dc" stroke="#8f8a7d" />
      <text x="183" y="37" fontSize="5" fill="#7a2a20">危險勿入</text>
      <text x="183" y="44" fontSize="4.5" fill="#555">鄉公所</text>
      <rect x="182" y="54" width="10" height="12" rx="2" fill="#8f8a7d" />
      {/* 石階 */}
      <path d="M0 122 h240 v38 H0 Z" fill="#4a524e" />
      <path d="M0 140 h240" stroke="#3a413e" strokeWidth="2" />
      {/* 手電筒 */}
      <g transform="rotate(-8 80 100)">
        <rect x="46" y="92" width="64" height="16" rx="4" fill="#6f7774" stroke="#2d3331" strokeWidth="1.5" />
        <path d="M110 88 L132 84 L132 116 L110 112 Z" fill="#8b938f" stroke="#2d3331" strokeWidth="1.5" />
        <rect x="70" y="91" width="10" height="18" fill="#2d3331" opacity="0.6" />
        <ellipse cx="132" cy="100" rx="3" ry="15" fill="#f6efc6" opacity="0.8" />
      </g>
      {/* 小小的鞋印 */}
      <ellipse cx="126" cy="132" rx="4" ry="7" fill="#353c39" />
      <ellipse cx="138" cy="128" rx="4" ry="7" fill="#353c39" />
    </>
  );
}

/** 十月七日的卡式錄音帶。 */
function Cassette() {
  return (
    <>
      <rect x="26" y="18" width="188" height="120" rx="8" fill="#2b2b30" stroke="#16161a" strokeWidth="2" />
      <rect x="40" y="28" width="160" height="40" rx="3" fill="#efe7cf" />
      <text x="50" y="44" fontSize="9" fill="#3a3226" fontFamily="serif">十月七日　颱風夜</text>
      <text x="50" y="59" fontSize="9" fill="#3a3226" fontFamily="serif" fontWeight="700">全程播出</text>
      <path d="M50 61 h40" stroke="#3a3226" strokeWidth="1.5" />
      <path d="M50 63 h40" stroke="#3a3226" strokeWidth="0.8" />
      <rect x="62" y="74" width="116" height="34" rx="16" fill="#18181c" />
      <circle cx="84" cy="91" r="12" fill="#e8e3d6" />
      <circle cx="156" cy="91" r="12" fill="#e8e3d6" />
      <circle cx="84" cy="91" r="4" fill="#18181c" />
      <circle cx="156" cy="91" r="4" fill="#18181c" />
      <text x="44" y="100" fontSize="14" fill="#efe7cf" fontWeight="700">A</text>
      <path d="M70 138 l8 -16 h84 l8 16" fill="#3a3a40" />
      {/* 帶盒和值班表 */}
      <rect x="168" y="112" width="60" height="42" rx="2" fill="#cfd6dc" opacity="0.55" stroke="#9aa3aa" />
      <path d="M176 118 h40 l-6 30 h-34 Z" fill="#f4efe0" />
      <text x="180" y="130" fontSize="5.5" fill="#555">值班　十月七日</text>
      <text x="180" y="140" fontSize="6" fill="#333">鍾</text>
    </>
  );
}

// ── 斷橋民宿 ──

/** 窗邊的位子：空碗、小鴨子短筷、椅背上的黃雨衣。 */
function WindowSeat() {
  return (
    <>
      <rect x="0" y="0" width="240" height="160" fill="#2a2724" />
      {/* 窗 */}
      <rect x="70" y="6" width="100" height="56" fill="#1a2128" stroke="#4b443c" strokeWidth="3" />
      <path d="M120 6 v56 M70 34 h100" stroke="#4b443c" strokeWidth="2" />
      {[82, 96, 110, 134, 150, 162].map((x) => (
        <path key={x} d={`M${x} 10 l-4 18`} stroke="#5a6b78" strokeWidth="1" opacity="0.7" />
      ))}
      {/* 椅背和雨衣 */}
      <rect x="18" y="20" width="10" height="130" fill="#5b4330" />
      <rect x="48" y="20" width="10" height="130" fill="#5b4330" />
      <rect x="18" y="26" width="40" height="8" fill="#6b5038" />
      <path d="M24 34 L52 34 L60 92 L16 92 Z" fill="#e2b737" stroke="#a88520" strokeWidth="1.5" opacity="0.92" />
      <path d="M30 34 C34 44 46 44 50 34" fill="none" stroke="#a88520" strokeWidth="1.5" />
      {/* 桌面 */}
      <path d="M62 96 L240 96 L240 160 L50 160 Z" fill="#7a5a3d" />
      <rect x="70" y="104" width="100" height="44" rx="4" fill="#d9a3ae" opacity="0.8" />
      {/* 空碗 */}
      <path d="M90 104 C92 130 128 132 132 104 Z" fill="#f1ede4" stroke="#b9b2a2" strokeWidth="1.5" />
      <ellipse cx="111" cy="104" rx="21" ry="5" fill="#e2ddd1" stroke="#b9b2a2" />
      <circle cx="104" cy="104" r="1.2" fill="#fff" />
      <circle cx="116" cy="105" r="1.2" fill="#fff" />
      {/* 短筷子，上面一隻小鴨 */}
      <path d="M150 58 L196 72 M150 64 L194 78" stroke="#c98a4b" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="164" cy="64" rx="5" ry="3.5" fill="#f2c94c" />
      <circle cx="168" cy="61" r="2.5" fill="#f2c94c" />
      <path d="M170 61 l3 0.5" stroke="#e07b39" strokeWidth="1.5" />
    </>
  );
}

/** 黎先生相機的螢幕：縮時照片的最後一張。 */
function CameraScreen() {
  return (
    <>
      <rect x="8" y="4" width="224" height="152" rx="12" fill="#1c1c1f" stroke="#0b0b0c" strokeWidth="2" />
      <rect x="22" y="16" width="196" height="128" rx="3" fill="#0f1418" />
      {/* 雨 */}
      {Array.from({ length: 18 }, (_, i) => (
        <path key={i} d={`M${30 + i * 11} ${20 + (i % 4) * 9} l-5 16`} stroke="#4f5f6b" strokeWidth="0.8" />
      ))}
      {/* 斷掉的橋頭 */}
      <path d="M22 112 L170 104 L176 112 L22 120 Z" fill="#3a4148" />
      <path d="M170 104 l10 -6 l4 10 l-8 4" fill="#2b3136" />
      <path d="M100 108 v-30 M150 105 v-30 M100 82 L150 79" stroke="#6b737a" strokeWidth="2" />
      <path d="M176 112 C190 120 200 132 214 140" stroke="#20262b" strokeWidth="10" opacity="0.6" />
      {/* 黃雨衣 */}
      <path d="M86 74 C90 64 102 64 106 74 L110 106 L82 106 Z" fill="#e2b737" opacity="0.92" />
      <circle cx="96" cy="70" r="7" fill="#e2b737" />
      <path d="M84 82 l-5 12 M108 82 l5 12" stroke="#e2b737" strokeWidth="3" strokeLinecap="round" />
      {/* 螢幕資訊 */}
      <text x="166" y="28" fontSize="7" fill="#d7dde2" fontFamily="monospace">04:12</text>
      <text x="166" y="37" fontSize="6" fill="#9aa4ad" fontFamily="monospace">#287</text>
      <circle cx="36" cy="28" r="3" fill="#c0392b" />
    </>
  );
}

/** 葛老先生的筆記本：封面和打開的一頁。 */
function PoliceNotebook() {
  return (
    <>
      {/* 封面 */}
      <rect x="10" y="14" width="96" height="132" rx="4" fill="#3d4a5a" stroke="#222a33" strokeWidth="2" />
      <rect x="20" y="28" width="76" height="28" fill="#e9e3d2" opacity="0.92" />
      <text x="26" y="40" fontSize="7" fill="#333" fontFamily="serif">溪口分駐所</text>
      <text x="26" y="51" fontSize="9" fill="#222" fontFamily="serif">葛</text>
      <path d="M14 70 h88 M14 110 h88" stroke="#c9d3df" strokeWidth="5" opacity="0.35" />
      {/* 打開的頁 */}
      <rect x="112" y="10" width="120" height="140" rx="2" fill={PAPER} stroke={PAPER_DARK} />
      {[24, 36, 48, 60, 72, 84, 96].map((y) => (
        <text key={y} x="120" y={y} fontSize="8" fill="#5a5040" fontFamily="monospace" opacity={0.45 + (y % 3) * 0.1}>
          □□-7□3　□□-7□3
        </text>
      ))}
      <ellipse cx="164" cy="111" rx="34" ry="10" fill="none" stroke="#c0392b" strokeWidth="2" />
      <text x="138" y="114" fontSize="8.5" fill="#222" fontFamily="monospace">■■-7■3</text>
      <text x="138" y="140" fontSize="5.5" fill="#6b5a3a" fontFamily="serif">目擊者：黑色的車，車尾有貼紙</text>
    </>
  );
}

// ── 最後一屆 ──

/** 六年級教室的石板黑板：很淡的舊名字，最下面一行又小又低。 */
function Blackboard() {
  const names = ['王志明', '李淑芬', '陳建宏', '張雅婷', '林國華', '黃美玲', '吳家豪', '劉怡君'];
  return (
    <>
      <rect x="0" y="0" width="240" height="160" fill="#2b2a26" />
      <rect x="10" y="8" width="220" height="132" fill="#24342c" stroke="#6b5132" strokeWidth="5" />
      {names.map((n, i) => (
        <text key={n} x={i < 4 ? 26 : 90} y={30 + (i % 4) * 18} fontSize="10" fill="#d9dfd6" opacity={0.28 + (i % 3) * 0.08} fontFamily="serif">
          {n}
        </text>
      ))}
      <text x="154" y="30" fontSize="9" fill="#d9dfd6" opacity="0.25" fontFamily="serif">……</text>
      <text x="154" y="66" fontSize="8" fill="#d9dfd6" opacity="0.3" fontFamily="serif">二十三</text>
      {/* 第二十四行 */}
      <text x="72" y="128" fontSize="8" fill="#f1f3ec" opacity="0.7" fontFamily="serif" transform="rotate(-4 80 126)">
        阿□
      </text>
      {/* 粉筆槽 */}
      <rect x="10" y="140" width="220" height="8" fill="#5a4329" />
      <rect x="40" y="148" width="160" height="12" fill="#3a3430" />
    </>
  );
}

/** 廣播室的錄音機，插在定時器上。 */
function Recorder() {
  return (
    <>
      <rect x="0" y="0" width="240" height="160" fill="#22212a" />
      <rect x="44" y="20" width="180" height="104" rx="8" fill="#55545c" stroke="#2a2a30" strokeWidth="2" />
      <rect x="74" y="32" width="120" height="44" rx="4" fill="#1c1c22" />
      <rect x="86" y="38" width="96" height="14" fill="#efe7cf" />
      <text x="90" y="48" fontSize="6.5" fill="#4a3f2c" fontFamily="serif">第三十八屆 畢業典禮</text>
      <circle cx="106" cy="64" r="7" fill="#e8e3d6" />
      <circle cx="162" cy="64" r="7" fill="#e8e3d6" />
      {[70, 94, 118, 142].map((x) => (
        <rect key={x} x={x} y="92" width="18" height="14" rx="2" fill="#3a3a40" />
      ))}
      <circle cx="176" cy="99" r="3" fill="#e23c3c" />
      <rect x="186" y="104" width="30" height="12" rx="2" fill="#1c1c22" />
      <text x="189" y="113" fontSize="7" fill="#9fe39f" fontFamily="monospace">0817</text>
      {/* 定時器 */}
      <path d="M44 100 C28 110 26 124 30 134" fill="none" stroke="#111" strokeWidth="3" />
      <rect x="8" y="126" width="44" height="30" rx="4" fill="#d8d4c6" stroke="#8a867a" />
      <circle cx="30" cy="141" r="10" fill="#f4f1e8" stroke="#8a867a" />
      <path d="M30 141 l0 -8" stroke="#c0392b" strokeWidth="1.5" />
      <text x="26" y="134" fontSize="4" fill="#555">2:00</text>
    </>
  );
}

/** 福利社的冰櫃，裡面一瓶牛奶；地上一排小腳印。 */
function MilkFridge() {
  return (
    <>
      <rect x="0" y="0" width="240" height="160" fill="#1d1f24" />
      <rect x="60" y="6" width="120" height="132" rx="4" fill="#cfd6db" stroke="#7d868c" strokeWidth="2" />
      <rect x="70" y="16" width="100" height="112" fill="#a9c7d4" opacity="0.55" />
      <path d="M70 60 h100 M70 96 h100" stroke="#7d868c" strokeWidth="2" />
      {/* 牛奶瓶 */}
      <path d="M114 60 v-14 c0 -4 -6 -6 -6 -12 v-6 h12 v6 c0 6 -6 8 -6 12" fill="#f4f4ef" stroke="#9aa" />
      <rect x="108" y="44" width="12" height="16" fill="#f4f4ef" />
      <rect x="108" y="26" width="12" height="4" fill="#3d7fbf" />
      <path d="M108 48 h12" stroke="#c9d6dc" />
      {/* 霧氣上的兩個小人 */}
      <g stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none">
        <circle cx="190" cy="34" r="3" />
        <path d="M190 37 v7 M186 40 h8 M190 44 l-3 5 M190 44 l3 5" />
        <circle cx="202" cy="38" r="2.2" />
        <path d="M202 40 v5 M199 42 h6 M202 45 l-2 4 M202 45 l2 4" />
      </g>
      {/* 地板和腳印 */}
      <path d="M0 138 h240 v22 H0 Z" fill="#3a3b40" />
      {[
        [30, 150],
        [44, 144],
        [58, 151],
        [72, 145],
      ].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="4" ry="6" fill="#55575c" transform={`rotate(70 ${x} ${y})`} />
      ))}
    </>
  );
}

/** 四十年前的值夜日誌。 */
function NightLog() {
  return (
    <>
      <rect x="0" y="0" width="240" height="160" fill="#262320" />
      <rect x="16" y="8" width="208" height="146" rx="3" fill="#2f4a6b" />
      <rect x="24" y="12" width="192" height="138" fill={PAPER} />
      {[28, 44, 60, 76, 92, 108, 124, 140].map((y) => (
        <path key={y} d={`M28 ${y} h184`} stroke="#d3c9ab" strokeWidth="0.7" />
      ))}
      <text x="30" y="24" fontSize="7" fill="#5a4c34" fontFamily="serif">六月　畢業典禮</text>
      <text x="30" y="40" fontSize="6.5" fill="#3a3226" fontFamily="serif">颱風轉向。營火取消。畢業班留禮堂。</text>
      <text x="30" y="56" fontSize="7.5" fill="#1f1a12" fontFamily="serif" fontWeight="700">點名：二十三人，全到。</text>
      <path d="M118 52 l3 3 l6 -7" stroke="#6b6b6b" strokeWidth="0.8" fill="none" />
      <text x="30" y="72" fontSize="6.5" fill="#3a3226" fontFamily="serif">22:00 防空洞進水，上鎖。</text>
      {/* 水漬 */}
      <circle cx="170" cy="96" r="18" fill="none" stroke="#b8a77c" strokeWidth="1.2" opacity="0.6" />
      <circle cx="160" cy="104" r="11" fill="none" stroke="#b8a77c" strokeWidth="1" opacity="0.5" />
      <text x="30" y="136" fontSize="7" fill="#3a3226" fontFamily="serif">找到。</text>
      <path d="M58 133 h40" stroke="#3a3226" strokeWidth="1" />
      <text x="62" y="136" fontSize="6" fill="#3a3226" opacity="0.5" fontFamily="serif">□樹</text>
    </>
  );
}

const ART: Record<string, () => JSX.Element> = {
  blackboard: Blackboard,
  recorder: Recorder,
  milk: MilkFridge,
  logbook: NightLog,
  umbrella: Umbrella,
  bell: Bell,
  pass: VisitorPass,
  hat: ChildHat,
  ledger: LedgerPage,
  watch: PocketWatch,
  card: BusinessCard,
  notes: NotesPage,
  log: CallLog,
  flashlight: LighthouseDoor,
  cassette: Cassette,
  bowl: WindowSeat,
  camera: CameraScreen,
  notebook: PoliceNotebook,
};

export function hasArt(id: string | undefined): boolean {
  return !!id && id in ART;
}

export function EvidenceArt({ id, title }: { id: string; title: string }) {
  const Draw = ART[id];
  if (!Draw) return null;
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label={title} className="ev-art">
      <Draw />
    </svg>
  );
}
