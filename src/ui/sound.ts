// 音效全部用 Web Audio 即時合成，不需要音檔。
import type { Ambience } from '../engine/types';
// 瀏覽器要等使用者點過畫面才能出聲，所以 AudioContext 在第一次播放時才建立。

export type Sfx = 'ask' | 'unlock' | 'correct' | 'wrong' | 'finish' | 'tea' | 'bell';

const MUTE_KEY = 'lostandfound.sound.muted';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = readMuted();
let ambience: { kind: Ambience; sources: AudioScheduledSourceNode[]; gain: GainNode } | null = null;
let wanted: Ambience | null = null;

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? '1' : '0');
  } catch {
    // 存不了就只在這次有效
  }
  if (master && ctx) master.gain.setTargetAtTime(value ? 0 : 0.7, ctx.currentTime, 0.05);
  if (!value && wanted) startAmbience(wanted);
}

function audio(): { ctx: AudioContext; out: GainNode } | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.7;
      master.connect(ctx.destination);
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return { ctx, out: master! };
}

/** 一個帶包絡的音。 */
function tone(freq: number, start: number, dur: number, opts: { type?: OscillatorType; vol?: number; to?: number } = {}) {
  const a = audio();
  if (!a) return;
  const { ctx: c, out } = a;
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(freq, t);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.vol ?? 0.2, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function noiseBuffer(c: AudioContext, seconds: number): AudioBuffer {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

/** 倒茶：一小段濾過的噪音。 */
function pour() {
  const a = audio();
  if (!a) return;
  const { ctx: c, out } = a;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.7);
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(900, c.currentTime);
  filter.frequency.linearRampToValueAtTime(1800, c.currentTime + 0.6);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.12, c.currentTime + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.65);
  src.connect(filter).connect(g).connect(out);
  src.start();
}

export function play(name: Sfx): void {
  if (muted) return;
  switch (name) {
    case 'ask': // 木頭的「叩」
      tone(220, 0, 0.08, { type: 'triangle', vol: 0.18, to: 140 });
      break;
    case 'unlock': // 新線索詞：兩個音的小鈴
      tone(880, 0, 0.35, { vol: 0.12 });
      tone(1320, 0.09, 0.45, { vol: 0.1 });
      break;
    case 'correct': // 句子填對：溫暖的大三度
      tone(523, 0, 0.5, { type: 'triangle', vol: 0.14 });
      tone(659, 0.08, 0.6, { type: 'triangle', vol: 0.12 });
      break;
    case 'wrong': // 填錯：悶悶的低音
      tone(180, 0, 0.25, { type: 'sine', vol: 0.16, to: 120 });
      break;
    case 'finish': // 喝完一碗湯：月台的發車鈴
      [784, 988, 1175].forEach((f, i) => tone(f, i * 0.16, 0.9, { vol: 0.11 }));
      break;
    case 'tea':
      pour();
      break;
    case 'bell': // 最後一次搖鈴
      [0, 0.32, 0.64].forEach((t) => {
        tone(1568, t, 1.4, { vol: 0.09 });
        tone(2350, t, 0.9, { vol: 0.04 });
      });
      break;
  }
}

/** 很稀疏的爆音，像收音機訊號不穩時的劈啪聲。 */
function crackleBuffer(c: AudioContext, seconds: number): AudioBuffer {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) if (Math.random() < 0.0004) data[i] = (Math.random() * 2 - 1) * 0.9;
  return buf;
}

/** 兩秒的循環：每一秒開頭一聲很短的「滴」。 */
function tickBuffer(c: AudioContext): AudioBuffer {
  const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const data = buf.getChannelData(0);
  for (const start of [0, c.sampleRate]) {
    const len = Math.floor(c.sampleRate * 0.012);
    for (let i = 0; i < len; i++) data[start + i] = (Math.random() * 2 - 1) * (1 - i / len) * 0.8;
  }
  return buf;
}

function filtered(c: AudioContext, src: AudioNode, type: BiquadFilterType, freq: number, q = 0.7): BiquadFilterNode {
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  src.connect(f);
  return f;
}

function loop(c: AudioContext, buffer: AudioBuffer): AudioBufferSourceNode {
  const src = c.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  return src;
}

/**
 * 背景環境音：
 * - rain：濾過的白噪音（失物招領處第三晚）
 * - static：收音機的嘶嘶聲加上偶爾的劈啪（電台）
 * - storm：大雨加上忽大忽小的風（民宿）
 * - school：空教室的低風聲和時鐘滴答（最後一屆）
 * - hum：警衛室的日光燈嗡嗡聲和機房風扇（十二樓沒有人）
 */
function startAmbience(kind: Ambience) {
  if (muted) return;
  if (ambience?.kind === kind) return;
  stopAmbience();
  const a = audio();
  if (!a) return;
  const { ctx: c, out } = a;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.connect(out);
  const sources: AudioScheduledSourceNode[] = [];

  if (kind === 'rain' || kind === 'storm') {
    const rain = loop(c, noiseBuffer(c, 3));
    const level = c.createGain();
    level.gain.value = kind === 'storm' ? 1.3 : 1;
    filtered(c, filtered(c, rain, 'highpass', 300), 'lowpass', 1400).connect(level).connect(gain);
    sources.push(rain);
  }
  if (kind === 'storm') {
    // 風：低頻噪音，音量跟著一個很慢的波忽大忽小
    const wind = loop(c, noiseBuffer(c, 4));
    const windGain = c.createGain();
    windGain.gain.value = 0.9;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.09;
    const depth = c.createGain();
    depth.gain.value = 0.7;
    lfo.connect(depth).connect(windGain.gain);
    filtered(c, wind, 'lowpass', 420, 1.2).connect(windGain).connect(gain);
    sources.push(wind, lfo);
  }
  if (kind === 'school') {
    // 空教室：很低的風聲，加上牆上時鐘一秒一下的滴答
    const wind = loop(c, noiseBuffer(c, 4));
    const windGain = c.createGain();
    windGain.gain.value = 0.5;
    filtered(c, wind, 'lowpass', 300, 1).connect(windGain).connect(gain);
    const tick = loop(c, tickBuffer(c));
    filtered(c, tick, 'bandpass', 2400, 2).connect(gain);
    sources.push(wind, tick);
  }
  if (kind === 'hum') {
    // 警衛室：日光燈的低頻嗡嗡聲，加上機房很遠的風扇
    const hum = c.createOscillator();
    hum.type = 'sawtooth';
    hum.frequency.value = 60;
    const humGain = c.createGain();
    humGain.gain.value = 0.12;
    filtered(c, hum, 'lowpass', 240).connect(humGain).connect(gain);
    const fan = loop(c, noiseBuffer(c, 3));
    const fanGain = c.createGain();
    fanGain.gain.value = 0.25;
    filtered(c, fan, 'bandpass', 700, 0.8).connect(fanGain).connect(gain);
    sources.push(hum, fan);
  }
  if (kind === 'static') {
    const hiss = loop(c, noiseBuffer(c, 3));
    const hissGain = c.createGain();
    hissGain.gain.value = 0.35;
    filtered(c, hiss, 'bandpass', 2600, 0.5).connect(hissGain).connect(gain);
    const crackle = loop(c, crackleBuffer(c, 5));
    filtered(c, crackle, 'highpass', 1200).connect(gain);
    sources.push(hiss, crackle);
  }

  gain.gain.exponentialRampToValueAtTime(kind === 'static' ? 0.03 : 0.05, c.currentTime + 2);
  for (const s of sources) s.start();
  ambience = { kind, sources, gain };
}

function stopAmbience() {
  if (!ambience || !ctx) return;
  const { sources, gain } = ambience;
  gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.5);
  for (const s of sources) s.stop(ctx.currentTime + 2);
  ambience = null;
}

/** 背景環境音。要在使用者點過畫面之後呼叫才會出聲。 */
export function setAmbience(kind: Ambience | null): void {
  wanted = kind;
  if (kind) startAmbience(kind);
  else stopAmbience();
}
