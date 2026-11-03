# SHADE VERSE · The Trailer Is Code

**Live:** https://shade-verse-trailer.pages.dev · **Game:** https://shade-verse.vercel.app

There is no video file behind this trailer. Press play and the real Shade Verse engine renders every frame in your browser.
A director script pauses the game as a game (no player input, no AI decisions) and stages it shot by shot: Shadow, Ghost, the Captain,
the drones, the time of day, rain, lightning, aurora, time scale and a programmed camera, all timed to the score and the voices.

## How it works

| file | role |
|---|---|
| `src/trailer/timeline.json` | the edit: 38 shots with start times and lengths, voice lines, fades, flashes, title and end cards |
| `src/trailer/shots.ts` | every shot as code: `setup()` stages the world at the cut, `step(f)` runs each 24 fps frame (camera, button presses, lightning) |
| `src/trailer/toolkit.ts` | the director's handles into the engine: `T.hero`, `T.ghost`, `T.bots`, `T.boss`, `T.ph` (sun), `T.rain`, `T.aur`, `T.follow` (chase cam) |
| `src/trailer/director.ts` | the player: loads the city behind the curtain, schedules music + voices on Web Audio, steps the engine on the music clock, draws letterbox, fades, flashes and cards |
| `public/trailer/clock.js` | routes `performance.now` / `requestAnimationFrame` through a virtual clock the director owns |
| `scripts/render.mjs` | renders the same code frame-exact to an MP4 (`?render` mode) and mixes the audio from the timeline |

Story (first half slice of life, second half combat): the Captain, who has ruled the sea for a hundred years, watches the city live its life:
dawn over the towers, the farm island, robots on the street, a climb and a sunset flight, the kelp forest and the deep, the aurora.
He asks if anyone is finally worth a fight. Shadow: *"Oh, we will."* Ghost: *"Together."* Then the storm breaks.

In the live player press **c** (or the `</> this shot` button) to read the code of the shot on screen, **h** to hide the HUD.

## Run

```bash
npm install
npm run dev            # open the page and press Play
npm run build          # static site in dist/
# render an MP4 from the same code (needs Chrome + `npm i -D puppeteer-core`):
CHROME=/path/to/chrome node scripts/render.mjs --url http://localhost:4173 --out out --w 1920 --h 1080
node scripts/render.mjs --mux out    # -> out/trailer.mp4
```

The engine under `src/` is Shade Verse itself (React Three Fiber, three.js), built with its instrumented hooks on (`VITE_DBG=1`)
so the director can reach the simulation. Score, voices and engine by Shifat Masud.
