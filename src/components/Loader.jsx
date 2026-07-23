
import React, { useState, useEffect, useRef } from 'react';

const PageLoader = () => {
  const [visible, setVisible] = useState(true);

  const bwRef   = useRef(null);
  const ballRef = useRef(null);
  const shRef   = useRef(null);
  const txRef   = useRef(null);
  const rafRef  = useRef(null);

  useEffect(() => {
    const W = window.innerWidth;

    const BALL_D     = 120;
    const BALL_R     = BALL_D / 2;
    const DEG_PER_PX = 360 / (Math.PI * BALL_D);

    // Timings
    const SCALE_UP  = 100;
    const ROLL_IN   = 1600; 
    const ALIGN     = 300; 
    const HOLD      = 2000; 
    const ROLL_OUT  = 1600; 
    const TOTAL     = SCALE_UP + ROLL_IN + ALIGN + HOLD + ROLL_OUT;

    const startX = -(W / 2 + BALL_R + 60);
    const endX   =   W / 2 + BALL_R + 60;

    const SCALE_START = 0.1;   // Chota (Small)
    const SCALE_PEAK  = 1.3;   // Bara (Large/Peak)

    // Easings
    const easeInQuart    = t => Math.pow(t, 4);
    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOutCubic   = t => 1 - Math.pow(1 - t, 3);
    const easeInCubic    = t => Math.pow(t, 3);
    const easeOutCirc    = t => Math.sqrt(1 - Math.pow(t - 1, 2));

    const lerp  = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    const BREATHE_AMP  = 0.04;
    const BREATHE_FREQ = 0.55;

    let cumulativeRot   = 0;
    let lastX           = startX;
    let alignStartRot   = 0;
    let alignTargetRot  = 0;
    let alignInitDone   = false;
    let t0 = null;

    const frame = ts => {
      if (!t0) t0 = ts;
      const e = clamp(ts - t0, 0, TOTAL);

      let x            = 0;
      let scale        = SCALE_PEAK;
      let opacity      = 1;
      let breatheScale = 1;
      let textOpacity  = 0;
      let textY        = 18;

      // PHASE 0 & 1: LEFT TO CENTER (Scaling UP: Chote se Bara)
      if (e < SCALE_UP + ROLL_IN) {
        const p = clamp((e - SCALE_UP) / ROLL_IN, 0, 1);
        const pe = easeOutCirc(p); 

        x = lerp(startX, 0, pe);
        // Small to Large logic applied here
        scale = lerp(SCALE_START, SCALE_PEAK, easeOutCubic(p));
        opacity = clamp(e / (SCALE_UP + 200), 0, 1);

        const dx = x - lastX;
        cumulativeRot += dx * DEG_PER_PX;
        alignInitDone = false;
      }

      // PHASE 2: ALIGN
      else if (e < SCALE_UP + ROLL_IN + ALIGN) {
        const p = (e - SCALE_UP - ROLL_IN) / ALIGN;
        if (!alignInitDone) {
          alignStartRot  = cumulativeRot;
          alignTargetRot = Math.round(cumulativeRot / 360) * 360;
          if (alignTargetRot === alignStartRot) alignTargetRot += 360;
          alignInitDone = true;
        }
        x = 0;
        scale = SCALE_PEAK;
        cumulativeRot = lerp(alignStartRot, alignTargetRot, easeInOutCubic(p));
      }

      // PHASE 3: HOLD & TEXT
      else if (e < SCALE_UP + ROLL_IN + ALIGN + HOLD) {
        const p = (e - SCALE_UP - ROLL_IN - ALIGN) / HOLD;
        x = 0;
        scale = SCALE_PEAK;
        breatheScale = 1 + BREATHE_AMP * Math.sin(2 * Math.PI * BREATHE_FREQ * p);

        if (p < 0.15) {
          const pp = p / 0.15;
          textOpacity = easeOutCubic(pp);
          textY = lerp(18, 0, easeOutCubic(pp));
        } else if (p > 0.75) {
          const pp = (p - 0.75) / 0.25;
          textOpacity = 1 - easeInCubic(pp);
          textY = lerp(0, -12, easeInCubic(pp));
        } else {
          textOpacity = 1;
          textY = 0;
        }
      }

      // PHASE 4: CENTER TO RIGHT (Scaling DOWN: Bare se Chota - As requested)
      else {
        const p = (e - SCALE_UP - ROLL_IN - ALIGN - HOLD) / ROLL_OUT;
        const pe = easeInQuart(p);

        x = lerp(0, endX, pe);
        // Large to Small logic remains same
        scale = lerp(SCALE_PEAK, SCALE_START, easeInCubic(p));
        opacity = clamp((1 - p) / 0.2, 0, 1);

        const dx = x - lastX;
        cumulativeRot += dx * DEG_PER_PX;
      }

      lastX = x;

      // Shadow logic based on scale
      const scaleFrac = (scale - SCALE_START) / (SCALE_PEAK - SCALE_START);
      const shWidth   = lerp(15, 130, scaleFrac);
      const shBlur    = lerp(2, 20, scaleFrac);
      const shOp      = lerp(0.05, 0.40, scaleFrac) * opacity;

      // DOM writes
      if (bwRef.current) {
        bwRef.current.style.transform = `translateX(${x.toFixed(2)}px)`;
        bwRef.current.style.opacity   = opacity.toFixed(4);
      }
      if (ballRef.current) {
        ballRef.current.style.transform = `rotate(${cumulativeRot.toFixed(2)}deg) scale(${(scale * breatheScale).toFixed(4)})`;
      }
      if (shRef.current) {
        shRef.current.style.width   = `${shWidth.toFixed(1)}px`;
        shRef.current.style.filter  = `blur(${shBlur.toFixed(1)}px)`;
        shRef.current.style.opacity = shOp.toFixed(4);
      }
      if (txRef.current) {
        txRef.current.style.opacity   = clamp(textOpacity, 0, 1).toFixed(4);
        txRef.current.style.transform = `translateY(${textY.toFixed(2)}px)`;
      }

      if (e < TOTAL) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setVisible(false);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, overflow: 'hidden' }}>
      <div ref={bwRef} style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, willChange: 'transform, opacity' }}>
        <div ref={ballRef} style={{ width: 120, height: 120, borderRadius: '50%', background: '#fff', padding: 6, overflow: 'hidden', willChange: 'transform', boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 0 36px rgba(255,255,255,0.05)' }}>
          <img src="/logo.jpeg" alt="IQRA Optical" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
        </div>
        <div ref={shRef} style={{ height: 8, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)', willChange: 'width, filter, opacity', marginTop: -6 }} />
        <div ref={txRef} style={{ textAlign: 'center', opacity: 0, transform: 'translateY(18px)', willChange: 'opacity, transform', marginTop: 4 }}>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>IQRA OPTICS</h1>
          <span style={{ display: 'block', marginTop: 6, fontSize: 9, letterSpacing: '.55em', color: '#888', textTransform: 'uppercase' }}>WORLD OF VISION</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;