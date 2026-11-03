/* Shade Verse trailer: the director owns time.
   performance.now and requestAnimationFrame are routed through a virtual clock, so the trailer can
   play live (clock follows the music) or render frame-exact (clock steps 1/24 s per frame). */
(function () {
  var realNow = performance.now.bind(performance), origRaf = window.requestAnimationFrame.bind(window), q = [];
  var V = window.__vt = { on: false, t: 0, raf: origRaf, now: realNow };
  performance.now = function () { return V.on ? V.t : realNow(); };
  window.requestAnimationFrame = function (cb) { if (V.on) { q.push(cb); return q.length; } return origRaf(cb); };
  V.start = function () { if (!V.on) { V.t = realNow(); V.on = true; } };
  V.step = function (dt) { V.t += dt; var cbs = q.splice(0); for (var i = 0; i < cbs.length; i++) { try { cbs[i](V.t); } catch (e) { console.error(e); } } };
  try { localStorage.setItem('shadeverse-muted', '1'); } catch (e) {}
})();
