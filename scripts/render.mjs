// Render the trailer to an exact 24 fps MP4 from the same code that plays live.
// usage: node scripts/render.mjs --url http://localhost:4173 --out out --from 0 --to 3360 [--w 1920 --h 1080]
//        then: node scripts/render.mjs --mux out  (frames + score + voices -> out/trailer.mp4)
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const A = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map((s) => { const [k, ...v] = s.trim().split(' '); return [k, v.join(' ') || true]; }));
const TL = JSON.parse(fs.readFileSync(new URL('../src/trailer/timeline.json', import.meta.url)));
if (A.mux) {
  const out = A.mux, pub = new URL('../public/', import.meta.url).pathname;
  const ins = ['-i', pub + TL.music.src, ...TL.voice.flatMap((v) => ['-i', pub + v.src])];
  const AF = 'aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo';
  const parts = [`[0:a]${AF},adelay=${Math.round(TL.music.at * 1000)}:all=1,volume=${TL.music.gain}[m]`];
  TL.voice.forEach((v, k) => parts.push(`[${k + 1}:a]${AF},adelay=${Math.round(v.at * 1000)}:all=1,volume=${v.gain || 1.15},apad[v${k}]`));
  parts.push(TL.voice.map((_, k) => `[v${k}]`).join('') + `amix=inputs=${TL.voice.length}:normalize=0:duration=longest[vo]`);
  parts.push('[vo]asplit[vo1][vo2]', '[m][vo1]sidechaincompress=threshold=0.012:ratio=12:attack=15:release=450[md]', '[md][vo2]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...ins, '-filter_complex', parts.join(';'), '-map', '[a]', '-t', String(TL.duration), out + '/audio.m4a'], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(TL.fps), '-i', out + '/f%05d.jpg', '-i', out + '/audio.m4a', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out + '/trailer.mp4'], { stdio: 'inherit' });
  console.log('wrote', out + '/trailer.mp4'); process.exit(0);
}
const W = +(A.w || 1280), H = +(A.h || 720), out = A.out || 'out', from = +(A.from || 0), to = +(A.to || Math.round(TL.duration * TL.fps));
fs.mkdirSync(out, { recursive: true });
const b = await puppeteer.launch({ executablePath: process.env.CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--mute-audio', `--window-size=${W},${H}`] });
const p = await b.newPage(); await p.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
p.on('pageerror', (e) => console.error('page:', String(e)));
await p.goto((A.url || 'http://127.0.0.1:4173') + '/?render', { waitUntil: 'load', timeout: 120000 });
await p.waitForFunction(() => window.__trailer && window.__trailer.ready, { timeout: 900000, polling: 500 });
for (let i = from; i < to; i++) {
  await p.evaluate((i) => window.__trailer.frame(i), i);
  await p.screenshot({ path: `${out}/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
  if (i % 48 === 0) console.log('frame', i);
}
await b.close();
