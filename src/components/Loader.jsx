import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';

/* ─────────────────────────────────────────────────────────
   MATRIX RAIN  — subtle atmosphere, never a distraction.
   Throttled to 1 draw per 3 rAF ticks (~20fps visual refresh
   at 60fps compositor) so the canvas stays cheap.
───────────────────────────────────────────────────────── */
function MatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let raf;
    let frame = 0;
    const W = (canvas.width  = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const FONT = 13;
    const COLS = Math.floor(W / FONT);
    /* Staggered starts — avoids "wall of rain" burst on load */
    const drops = Array.from({ length: COLS }, () => Math.random() * -H * 2);
    const chars  = 'IQRAOPTICS01アイウエオカキクケコ@#$~';

    function draw() {
      frame++;
      if (frame % 3 === 0) {
        ctx.fillStyle = 'rgba(8, 8, 16, 0.20)';
        ctx.fillRect(0, 0, W, H);
        ctx.font = `${FONT}px monospace`;

        drops.forEach((y, i) => {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = '#e8440a';
          ctx.globalAlpha = Math.random() * 0.22 + 0.05;
          ctx.fillText(ch, i * FONT, y);
          ctx.globalAlpha = 1;
          drops[i] = y > H + FONT * 8
            ? -FONT * (8 + Math.random() * 22)
            : y + FONT;
        });
      }
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="ldr-matrix" />;
}

/* ─────────────────────────────────────────────────────────
   SPARKS  — 12 particles in two choreographed waves.
   Wave A (i<6):  fires at ~1.55s alongside logo landing.
   Wave B (i>=6): fires at ~2.40s as a secondary beat.
   Uses animation-fill-mode: forwards so they don't loop.
───────────────────────────────────────────────────────── */
const SPARKS = Array.from({ length: 12 }, (_, i) => ({
  angle: `${i * 30}deg`,
  dist:  `${68 + (i % 3) * 20}px`,
  dur:   `${1.9 + (i % 4) * 0.28}s`,
  delay: i < 6
    ? `${1.55 + i * 0.04}s`
    : `${2.40 + (i - 6) * 0.04}s`,
  size:  i % 3 === 0 ? 4 : 2,
  color: i % 2 === 0 ? '#e8440a' : '#ff6a1a',
}));

/* ─────────────────────────────────────────────────────────
   PULSE RINGS  — exactly 2, one pair per breath cycle.
───────────────────────────────────────────────────────── */
const PULSES = [
  { dur: '2.8s', delay: '1.55s' },
  { dur: '2.8s', delay: '2.35s' },
];

/* ═══════════════════════════════════════════════════════
   LOADER
   Phase timeline (absolute ms from mount):
     0    → DOM mounts
     300  → CSS delay ends → logo begins cinematic flight
     1400 → Logo lands perfectly at center
     1650 → phase: 'live'  → breathing + glow activate
     3300 → phase: 'exit'
     4000 → onLoadingComplete fires
═══════════════════════════════════════════════════════ */
const Loader = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('live'), 1650);
    const t2 = setTimeout(() => setPhase('exit'), 3300);
    const t3 = setTimeout(() => onLoadingComplete?.(), 4000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onLoadingComplete]);

  const isLive = phase === 'live' || phase === 'exit';

  return (
    <div className={`ldr${phase === 'exit' ? ' ldr-exit' : ''}`}>

      {/* ── Layer 0: Matrix rain canvas ─────────────────── */}
      <MatrixCanvas />

      {/* ── Layer 1: Grid texture via ::before ──────────── */}

      {/* ── Layer 2: Vignette — edges dark, center open ─── */}
      <div className="ldr-vignette" aria-hidden="true" />

      {/* ── Layer 3: Warm radial plate behind logo ───────── */}
      <div className="ldr-radial" aria-hidden="true" />

      {/* ── Layer 4: Scanline sweep ──────────────────────── */}
      <div className="scanline" aria-hidden="true" />

      {/* ── Layer 5: Corner HUD brackets ─────────────────── */}
      <div className="corner corner-tl" aria-hidden="true" />
      <div className="corner corner-tr" aria-hidden="true" />
      <div className="corner corner-bl" aria-hidden="true" />
      <div className="corner corner-br" aria-hidden="true" />

      {/* ── Layer 6: 3-D orbital scene ───────────────────── */}
      <div className="ldr-scene" aria-hidden="true">

        {/* Back rings — blurred for perceived depth */}
        <div className="orb orb-depth orb-1" />
        <div className="orb orb-depth orb-2" />

        {/* Front rings — crisp, precise */}
        <div className="orb orb-3" />
        <div className="orb orb-eq" />

        {/* Orbiting energy dot */}
        <div className="orb-dot" />

        {/* Pulse rings */}
        {PULSES.map((p, i) => (
          <div
            key={i}
            className="pulse-ring"
            style={{ '--pdur': p.dur, '--pdelay': p.delay }}
          />
        ))}

        {/* Spark burst particles */}
        {SPARKS.map((s, i) => (
          <div
            key={i}
            className="spark"
            style={{
              '--angle': s.angle,
              '--dist':  s.dist,
              '--dur':   s.dur,
              '--delay': s.delay,
              width:     `${s.size}px`,
              height:    `${s.size}px`,
              background: s.color,
            }}
          />
        ))}

        {/*
          ┌─ TWO-LAYER LOGO STRUCTURE ──────────────────────────┐
          │                                                      │
          │  .ldr-logo-track  ← 3-D cinematic entry             │
          │    transform: translateX(-55vw) rotateY(42deg)       │
          │    → translateX(0) rotateY(0deg)                     │
          │    Plays ONCE, then holds final state (fill:both)    │
          │                                                      │
          │    .ldr-logo-wrap  ← scale breathing + glow ring    │
          │      transform: scale(1) ↔ scale(1.025)             │
          │      Starts AFTER entry lands (live phase)           │
          │                                                      │
          │      <img>  ← always sharp, no transform on it      │
          │                                                      │
          │  Separation avoids CSS transform override conflict.  │
          └──────────────────────────────────────────────────── ┘
        */}
        <div className="ldr-logo-track">
          <div className={`ldr-logo-wrap${isLive ? ' ldr-logo-live' : ''}`}>
            <img
              src="./logo.png"
              alt="IQRA Optics"
              className="ldr-logo"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ── Layer 7: HUD brand text ──────────────────────── */}
      <div className="ldr-hud">
        <div className="ldr-brand">IQRA&nbsp;Optics</div>
        <div className="ldr-sub">INITIALIZING&nbsp;SYSTEM</div>
      </div>

      {/* ── Layer 8: Progress bar ────────────────────────── */}
      <div className="ldr-bar-wrap" aria-hidden="true">
        <div className="ldr-bar-track">
          <div className="ldr-bar-fill" />
        </div>
      </div>

    </div>
  );
};

export default Loader;