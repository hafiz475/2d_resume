// src/components/sea/Ship.jsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * depth: 0..1 (0 far, 1 near)
 * seedX: optional initial x offset (0..1)
 * horizonY: baseline vertical reference for ships (px)
 * content: you can pass SVG children (paths) or inline markup for each ship
 */
export default function Ship({ id, depth = 0.5, seedX = Math.random(), horizonY = 460, containerWidth = 1400, children }) {
  const gRef = useRef(null);

  useEffect(() => {
    const el = gRef.current;
    if (!el) return;

    // Visual parameters derived from depth
    const scale = 0.5 + depth * 1.0;              // 0.5 -> 1.5
    const yBase = horizonY + (1 - depth) * -40 + depth * 40; // far ships sit higher (closer to horizon)
    const opacity = 0.5 + depth * 0.5;            // 0.5 -> 1
    const blurPx = (1 - depth) * 1.6;             // far ships slightly blurred
    const bobAmp = 2 + depth * 6;                 // near ships bob more (2 -> 8)
    const bobDur = 3 + (1 - depth) * 2;           // far ships slower bob
    // horizontal crossing speed: far ships move slower (bigger duration)
    const travelDuration = 60 - depth * 36;       // depth=0 => ~60s (slow), depth=1 => ~24s (faster)

    // initial x between -20%..100% of container (so ships start scattered)
    const startX = (-0.2 + seedX * 1.2) * containerWidth;

    gsap.set(el, {
      transformOrigin: "center",
      x: startX,
      y: yBase,
      scale,
      opacity,
      filter: `blur(${blurPx}px)`,
      // keep pointer events off by default; Ship clicks can be enabled per-case
      pointerEvents: "auto",
    });

    // horizontal travel: move from current x to beyond right edge, then jump to left
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(el, {
      x: containerWidth + 300,
      duration: travelDuration,
      ease: "none",
      onRepeat() {
        // put it back to -300 so it loops smoothly
        gsap.set(el, { x: -300 });
      },
    });

    // separate bobbing for vertical realism
    const bob = gsap.to(el, {
      y: `+=${bobAmp}`,
      duration: bobDur,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tl.kill();
      bob.kill();
    };
  }, [depth, seedX, horizonY, containerWidth]);

  return (
    <g id={id} ref={gRef}>
      {/* Use children for actual ship SVG paths, or replace with your ship markup */}
      {children}
    </g>
  );
}
