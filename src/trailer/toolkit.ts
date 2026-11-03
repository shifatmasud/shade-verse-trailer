// @ts-nocheck
/**
 * Director toolkit. The game is paused as a game: no player input, no AI choices.
 * Every shot drives the real engine through these handles: hero / Ghost / enemies placement,
 * time of day, weather, aurora, time scale and the camera rig (window.__camOv).
 */
export function makeT() {
  const w = window as any, g = w.__game, s = g.sim, I = w.__svMainInput || g.input;
  const T: any = {};
  T.ph = (v) => { w.__todPh = v; };                                   // time of day: 0 dawn … 1.5 noon … 3 dusk … 4.71 midnight
  T.hero = (x, y, z, extra) => {                                      // place Shadow (mutate in place: the renderer holds these arrays)
    s.pos[0] = x; s.pos[1] = y; s.pos[2] = z; s.vel[0] = 0; s.vel[1] = 0; s.vel[2] = 0;
    if (extra && extra.vel) { const v = extra.vel; extra = { ...extra }; delete extra.vel; s.vel[0] = v[0]; s.vel[1] = v[1]; s.vel[2] = v[2]; }
    s.web = false; s.wall = null; s.swim = false; s.glideOn = false; s.hp = 100; if (extra) Object.assign(s, extra);
  };
  T.ghost = (x, y, z) => { const A = w.__ghostActor; if (A) { A.pos[0] = x; A.pos[1] = y; A.pos[2] = z; A.vel[0] = 0; A.vel[1] = 0; A.vel[2] = 0; } };
  T.ang = (a) => { s.ang = a; s.yaw = a; };
  T.gang = (a) => { const A = w.__ghostActor; if (A) { A.ang = a; A.yaw = a; } };
  T.boss = () => s.enemies.find((e) => e.boss);
  T.clearEnemies = () => { s.enemies.forEach((e) => { if (!e.boss) { e.down = 1e5; e.atk = 0; e.x = -900; e.z = -900; } }); };
  T.bots = (list) => { const free = s.enemies.filter((e) => !e.boss); list.forEach((b, i) => { const e = free[i]; if (!e) return;
    e.kind = b.k || 0; e.x = b.x; e.y = b.y; e.z = b.z; e.hp = b.hp || 3; e.down = 0; e.atk = -2; e.hit = 0; e.kb = [0, 0]; e.born = s.t - 5;
    e.air = e.kind === 2; e.roof = undefined; e.__hr = undefined; e.__hr1 = undefined; e.slam = 0; e.vy = 0; }); };
  T.R = { x0: -13.08, x1: 13.08, z0: -13.09, z1: 13.09 };            // the spawn rooftop
  T.rbots = (list) => { T.bots(list.map((b) => ({ ...b, y: 30 }))); const free = s.enemies.filter((e) => !e.boss); list.forEach((b, i) => { if (free[i]) free[i].roof = { ...T.R }; }); };
  T.aur = (v) => { w.__weather.aurForce = v; w.__weather.aur.value = v; };
  T.rain = (v) => { w.__weather.force = v; if (w.__weather.rain) w.__weather.rain.value = v; };   // snap: a cut has no time for clouds to roll in
  T.lerp = (a, b, u) => a.map((x, i) => x + (b[i] - x) * u);
  T.ease = (u) => u * u * (3 - 2 * u);
  T.F = w.__F || (w.__F = { c: null });
  T.follow = (side, up, back, lerp) => {                              // chase camera: trails the hero's velocity, smoothed
    const p = s.pos, v = s.vel; const sp = Math.hypot(v[0], v[2]);
    const dx = sp > 1 ? v[0] / sp : Math.sin(s.ang), dz = sp > 1 ? v[2] / sp : Math.cos(s.ang);
    const want = [p[0] - dx * back + dz * side, p[1] + up, p[2] - dz * back - dx * side];
    const F = w.__F; if (!F.c) F.c = want; const k = lerp || 0.15; F.c = F.c.map((x, i) => x + (want[i] - x) * k);
    w.__camOv = [...F.c, p[0] + dx * 3, p[1] + 1, p[2] + dz * 3];
  };
  return { T, s, g, I };
}
