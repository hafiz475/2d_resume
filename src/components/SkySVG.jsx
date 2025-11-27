// src/components/SkySVG.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PlaneSmall from "./air/PlaneSmall";   // ← Import planes here
import AeroplaneBig from "./air/AeroplaneBig";
import SkyStoryOverlay from "./air/SkyStoryOverlay";

const WIDTH = 1400;
const HEIGHT = 720;

export default function SkySVG({ initialScene = "afternoon" }) {
  const skyRef = useRef();
  const sunRef = useRef();
  const raysRef = useRef();
  const gradeRef = useRef();
  const L1 = useRef();
  const L2 = useRef();

  useEffect(() => {
    function onScene(e) {
      const scene = e.detail?.scene || initialScene;
      applyScene(scene);
    }
    window.addEventListener("scene-change", onScene);
    applyScene(initialScene);
    return () => window.removeEventListener("scene-change", onScene);
  }, []);

  function applyScene(scene) {
    if (!skyRef.current) return;
    if (scene === "sunset") {
      gsap.to(skyRef.current, { fill: "#ffb07a", duration: 1.2 });
      gsap.to(gradeRef.current, { opacity: 0.75, duration: 1.2 });
    } else if (scene === "night" || scene === "night2") {
      gsap.to(skyRef.current, { fill: "#081026", duration: 1.2 });
      gsap.to(gradeRef.current, { opacity: 0, duration: 1.2 });
    } else if (scene === "storm") {
      gsap.to(skyRef.current, { fill: "#3a4a63", duration: 1.0 });
      gsap.to(gradeRef.current, { opacity: 0.35, duration: 1.0 });
    } else {
      gsap.to(skyRef.current, { fill: "#8ec5ff", duration: 1.2 });
      gsap.to(gradeRef.current, { opacity: 0, duration: 1.2 });
    }
  }

  return (
    <svg className="sky-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gradeGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffb57d" />
          <stop offset="100%" stopColor="#6fc2ff" />
        </linearGradient>
      </defs>
      <rect ref={skyRef} x="0" y="0" width={WIDTH} height={HEIGHT} fill="#8ec5ff" />
      <rect ref={gradeRef} x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#gradeGrad)" style={{ mixBlendMode: "overlay", opacity: 0 }} />
      
      {/* CLOUDS */}
      <g ref={L1} className="cloud-layer" style={{ opacity: 0.9 }}>
        <ellipse cx="120" cy="96" rx="110" ry="28" fill="#fff" opacity="0.95" />
        <ellipse cx="420" cy="64" rx="80" ry="22" fill="#fff" opacity="0.9" />
        <ellipse cx="860" cy="120" rx="94" ry="26" fill="#fff" opacity="0.92" />
      </g>
      <g ref={L2} className="cloud-layer" style={{ opacity: 0.9 }}>
        <ellipse cx="340" cy="140" rx="130" ry="36" fill="#fff" opacity="0.92" />
        <ellipse cx="760" cy="88" rx="76" ry="20" fill="#fff" opacity="0.9" />
      </g>

      {/* PLANES — NOW IN SKY LAYER, HIGH UP */}
      <g id="sky-planes" pointerEvents="all">
        <g transform="translate(0, 80) scale(0.4)">     {/* ← High Y=80, small scale */}
          <PlaneSmall />
        </g>
        <g transform="translate(-400, 60) scale(0.35)">  {/* ← Even higher, smaller */}
          <AeroplaneBig />
        </g>
      </g>
      <SkyStoryOverlay />  {/* ← Overlay for sky stories */}
    </svg>
  );
}