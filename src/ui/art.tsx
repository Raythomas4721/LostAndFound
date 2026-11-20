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

const ART: Record<string, () => JSX.Element> = {
  umbrella: Umbrella,
  bell: Bell,
  pass: VisitorPass,
  hat: ChildHat,
  ledger: LedgerPage,
  watch: PocketWatch,
  card: BusinessCard,
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
