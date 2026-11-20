// 畫出湯館的圖示（一碗冒著熱氣的湯），存成手機「加入主畫面」要用的 PNG。
// 圖示改了才需要重跑：npx tsx scripts/make-icons.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

type RGB = [number, number, number];
const BG: RGB = [0x14, 0x10, 0x13];
const BOWL: RGB = [0xeb, 0xa2, 0x5e];
const RIM: RGB = [0xf6, 0xc4, 0x8a];
const STEAM: RGB = [0xef, 0xe3, 0xd6];

const CX = 0.5;
const CY = 0.53;
const R = 0.26;

/** 回傳 (x, y) 這一點的顏色和不透明度；座標是 0–1。後面的蓋前面的。 */
function layers(x: number, y: number): [RGB, number][] {
  const out: [RGB, number][] = [];
  // 碗：下半圓
  if (y >= CY && Math.hypot(x - CX, y - CY) <= R) out.push([BOWL, 1]);
  // 碗腳
  if (Math.abs(x - CX) <= 0.09 && y >= CY + R - 0.02 && y <= CY + R + 0.035) out.push([BOWL, 1]);
  // 碗口
  if (Math.abs(x - CX) <= R + 0.03 && y >= CY - 0.022 && y <= CY + 0.012) out.push([RIM, 1]);
  // 三縷熱氣
  for (const k of [-1, 0, 1]) {
    const top = k === 0 ? 0.18 : 0.23;
    const bottom = CY - 0.07;
    if (y < top - 0.02 || y > bottom + 0.02) continue;
    const yc = Math.min(Math.max(y, top), bottom);
    const fx = CX + k * 0.11 + 0.024 * Math.sin(((yc - top) / 0.26) * Math.PI * 2 + k);
    if (Math.hypot(x - fx, y - yc) <= 0.019) out.push([STEAM, 0.85]);
  }
  return out;
}

function render(size: number): Buffer {
  const SS = 4; // 每個像素取 4×4 個樣本，邊緣才不會有鋸齒
  const rows: Buffer[] = [];
  for (let py = 0; py < size; py++) {
    const row = Buffer.alloc(1 + size * 3);
    for (let px = 0; px < size; px++) {
      let r = 0;
      let g = 0;
      let b = 0;
      for (let sy = 0; sy < SS; sy++)
        for (let sx = 0; sx < SS; sx++) {
          let c: RGB = BG;
          for (const [col, a] of layers((px + (sx + 0.5) / SS) / size, (py + (sy + 0.5) / SS) / size))
            c = [c[0] + (col[0] - c[0]) * a, c[1] + (col[1] - c[1]) * a, c[2] + (col[2] - c[2]) * a];
          r += c[0];
          g += c[1];
          b += c[2];
        }
      const n = SS * SS;
      row[1 + px * 3] = Math.round(r / n);
      row[2 + px * 3] = Math.round(g / n);
      row[3 + px * 3] = Math.round(b / n);
    }
    rows.push(row);
  }
  return png(size, size, Buffer.concat(rows));
}

const CRC = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function png(w: number, h: number, raw: Buffer): Buffer {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

mkdirSync('public/icons', { recursive: true });
for (const [name, size] of [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
  ['favicon-32.png', 32],
] as const) {
  writeFileSync(`public/icons/${name}`, render(size));
  console.log(`public/icons/${name}`);
}
