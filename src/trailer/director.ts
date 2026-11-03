// @ts-nocheck
/**
 * SHADE VERSE: the trailer is code.
 * The director pauses the game as a game, then plays timeline.json: each shot's setup() stages the real
 * engine, step(f) drives it frame by frame, and the music and voices are scheduled on the same clock.
 * Live:   open the page, press Play. The engine renders every frame in your browser.
 * Render: ?render  exposes window.__trailer.frame(i) so scripts/render.mjs can capture an exact 24 fps MP4.
 */
import TL from './timeline.json';
import { SHOTS } from './shots';
import { makeT } from './toolkit';
import './trailer.css';

const w = window as any;
const FPS = TL.fps, FRAME = 1000 / FPS;
const RENDER = new URLSearchParams(location.search).has('render');
const $ = (tag, cls, parent, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; (parent || document.body).appendChild(e); return e; };

// ---------- overlay ----------
const root = $('div', 'tr-root');
const barT = $('div', 'tr-bar tr-top', root), barB = $('div', 'tr-bar tr-bot', root);
const fade = $('div', 'tr-fade', root), flash = $('div', 'tr-flash', root);
const card = $('div', 'tr-card', root);
const hud = $('div', 'tr-hud', root); const hudTxt = $('span', '', hud); const codeBtn = $('button', 'tr-codebtn', hud, '&lt;/&gt; this shot');
const codeBox = $('pre', 'tr-code', root);
const start = $('div', 'tr-start', root, `
  <div class="tr-kicker">SHADE VERSE</div>
  <h1>The trailer is code.</h1>
  <p>No video file. Every frame is rendered live by the game engine in your browser.<br/>
  A director script pauses the game, stages Shadow, Ghost, the Captain, the weather and the sun,<br/>
  and flies a programmed camera through ${TL.shots.length} shots, timed to the score.</p>
  <button class="tr-play" disabled>Loading the city…</button>
  <div class="tr-links"><a href="https://github.com/shifatmasud/shade-verse-trailer" target="_blank">source</a> · <a href="https://shade-verse.vercel.app/" target="_blank">play the game</a></div>`);
const playBtn = start.querySelector('.tr-play');
codeBtn.onclick = () => root.classList.toggle('tr-showcode');
if (RENDER) root.classList.add('tr-render');

// ---------- engine control ----------
let ctx = null, cur = -1, lastF = -1;
function resetInput(I) { if (!I) return; if (I.keys) for (const k in I.keys) I.keys[k] = false;
  Object.assign(I, { jumpQ: false, jumpHeld: false, swing: false, swingQ: false, meleeHeld: false, meleeQ: false, attackQ: false, shotQ: false, specialQ: false, grabQ: false, rideQ: false, dodgeQ: false }); }
function shotIndex(t) { let i = -1; for (let k = 0; k < TL.shots.length; k++) if (t >= TL.shots[k].at) i = k; return i; }
function enter(i) {
  const def = TL.shots[i], S = SHOTS[def.id]; ctx = makeT(); const { T, s, g, I } = ctx;
  w.__F = { c: null }; w.__ts = 1; w.__flashPin = 0; w.__ghostHold = false; resetInput(I);
  S.setup(T, s, g, I);
  for (let f = -S.warm; f < 0; f++) { S.step(T, s, g, I, f, f / FPS); w.__vt.step(FRAME); }   // settle physics before the cut is seen
  cur = i; lastF = -1;
  hudTxt.textContent = `shot ${String(i + 1).padStart(2, '0')}/${TL.shots.length} · ${def.id}`;
  codeBox.textContent = `// ${def.id}  (src/trailer/shots.ts)\nsetup: ${S.setup.toString()}\n\nstep: ${S.step.toString()}`;
}
function tick(t, dt) {
  const i = shotIndex(t);
  if (i >= 0) {
    if (i !== cur) enter(i);
    const def = TL.shots[i], S = SHOTS[def.id], { T, s, g, I } = ctx;
    const f = Math.floor((t - def.at) * FPS + 1e-6);
    for (let k = lastF + 1; k <= f; k++) S.step(T, s, g, I, k, k / FPS);
    lastF = Math.max(lastF, f);
  }
  w.__vt.step(dt);
  overlays(t);
}
function overlays(t) {
  let a = 0; const end = TL.shots.length ? TL.shots[TL.shots.length - 1].at + TL.shots[TL.shots.length - 1].dur : 0;
  if (t >= end) a = 1;
  for (const F of TL.fades) { if (t >= F.at && t <= F.at + F.dur) a = F.from + (F.to - F.from) * ((t - F.at) / F.dur); else if (t > F.at + F.dur && t < (F.at + F.dur + 0.05)) a = F.to; }
  fade.style.opacity = String(a);
  let fl = 0; for (const x of TL.flashes) { const d = t - x; if (d >= 0 && d < 0.35) fl = Math.max(fl, 1 - d / 0.35); }
  flash.style.opacity = String(fl * 0.85);
  const c = TL.cards.find((c) => t >= c.at && t < c.at + c.dur);
  if (c) { const u = (t - c.at) / c.dur; const op = Math.min(1, u * c.dur / 0.6, (1 - u) * c.dur / 0.8);
    const html = c.kind === 'title' ? `<div class="tr-title">${c.text}</div>` : `<div class="tr-end">${c.text}</div><div class="tr-sub">${c.sub}</div><div class="tr-url">${c.url}</div>`;
    if (card.dataset.k !== c.kind) { card.innerHTML = html; card.dataset.k = c.kind; }
    card.style.opacity = String(Math.max(0, op)); const sc = 1 + u * 0.06; card.style.transform = `scale(${sc})`; }
  else { card.style.opacity = '0'; card.dataset.k = ''; }
}

// ---------- boot: load the world behind the curtain ----------
async function until(fn, ms = 250) { while (!fn()) await new Promise((r) => setTimeout(r, ms)); }
async function boot() {
  await until(() => !!w.__game);
  await new Promise((r) => setTimeout(r, 1200));
  w.__game.start();
  await until(() => w.__game.sim.mode === 'play' && !!w.__gl && !!w.__weather);
  await new Promise((r) => setTimeout(r, 2500));
  document.body.classList.add('tr-on');
  fade.style.opacity = '1';
  if (RENDER) { w.__vt.start(); w.__trailer = { ready: true, frames: Math.round(TL.duration * FPS), fps: FPS, frame: (i) => tick(i / FPS, FRAME) }; return; }
  playBtn.disabled = false; playBtn.textContent = '▶  Play trailer';
}

// ---------- live playback: the music is the master clock ----------
let actx = null, T0 = 0, prevReal = 0, running = false;
async function loadBuf(src) { const r = await fetch(src); return actx.decodeAudioData(await r.arrayBuffer()); }
async function play() {
  playBtn.disabled = true; playBtn.textContent = 'Rolling…';
  actx = actx || new (window.AudioContext || window.webkitAudioContext)(); await actx.resume();
  const music = await loadBuf(TL.music.src); const voices = await Promise.all(TL.voice.map((v) => loadBuf(v.src)));
  const bus = actx.createGain(); bus.connect(actx.destination);
  const mg = actx.createGain(); mg.gain.value = TL.music.gain; mg.connect(bus);
  T0 = actx.currentTime + 0.4;
  const m = actx.createBufferSource(); m.buffer = music; m.connect(mg); m.start(T0 + TL.music.at);
  TL.voice.forEach((v, k) => { const src = actx.createBufferSource(); src.buffer = voices[k]; const vg = actx.createGain(); vg.gain.value = 1.15; src.connect(vg); vg.connect(bus); src.start(T0 + v.at);
    // duck the score under every line
    const d = voices[k].duration; mg.gain.setTargetAtTime(TL.music.gain * 0.45, T0 + v.at - 0.15, 0.08); mg.gain.setTargetAtTime(TL.music.gain, T0 + v.at + d + 0.1, 0.25); });
  start.classList.add('tr-hide'); root.classList.add('tr-live');
  cur = -1; lastF = -1; w.__vt.start(); running = true; prevReal = performance.now ? w.__vt.now() : 0;
  const loop = () => {
    if (!running) return;
    const t = actx.currentTime - T0, now = w.__vt.now(); const dt = Math.min(100, Math.max(1, now - prevReal)); prevReal = now;
    if (t >= 0) tick(Math.min(t, TL.duration), dt); else { w.__vt.step(dt); overlays(0); }
    if (t >= TL.duration) { running = false; start.classList.remove('tr-hide'); playBtn.disabled = false; playBtn.textContent = '↺  Play again'; root.classList.remove('tr-live'); return; }
    w.__vt.raf(loop);
  };
  w.__vt.raf(loop);
}
playBtn.onclick = play;
addEventListener('keydown', (e) => { if (e.key === 'h') root.classList.toggle('tr-nohud'); if (e.key === 'c') root.classList.toggle('tr-showcode'); });
boot();
