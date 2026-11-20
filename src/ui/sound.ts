// 音效全部用 Web Audio 即時合成，不需要音檔。
// 瀏覽器要等使用者點過畫面才能出聲，所以 AudioContext 在第一次播放時才建立。

export type Sfx = 'ask' | 'unlock' | 'correct' | 'wrong' | 'finish' | 'tea' | 'bell';

const MUTE_KEY = 'lostandfound.sound.muted';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = readMuted();
let rain: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
let wantRain = false;

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
  if (!value && wantRain) startRain();
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

function startRain() {
  if (rain || muted) return;
  const a = audio();
  if (!a) return;
  const { ctx: c, out } = a;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 3);
  src.loop = true;
  const low = c.createBiquadFilter();
  low.type = 'lowpass';
  low.frequency.value = 1400;
  const high = c.createBiquadFilter();
  high.type = 'highpass';
  high.frequency.value = 300;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, c.currentTime + 2);
  src.connect(high).connect(low).connect(gain).connect(out);
  src.start();
  rain = { src, gain };
}

function stopRain() {
  if (!rain || !ctx) return;
  const { src, gain } = rain;
  gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.5);
  src.stop(ctx.currentTime + 2);
  rain = null;
}

/** 背景環境音。目前只有雨聲（第三晚）。要在使用者點過畫面之後呼叫才會出聲。 */
export function setAmbience(kind: 'rain' | null): void {
  wantRain = kind === 'rain';
  if (wantRain) startRain();
  else stopRain();
}
