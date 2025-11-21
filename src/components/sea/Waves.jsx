// src/components/sea/Waves.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Waves() {
  const wavesRef = useRef();

  useEffect(() => {
    if (!wavesRef.current || wavesRef.current.children.length > 0) return;

    const createWave = (y, amp = 8, speed = 6, opacity = 0.12, width = 1.2) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M-600 ${y} C-480 ${y-amp} -360 ${y+amp} -240 ${y} S-120 ${y-amp} 0 ${y} S120 ${y+amp} 240 ${y} S360 ${y-amp} 480 ${y} S600 ${y+amp} 720 ${y} S840 ${y-amp} 960 ${y}`;
      path.setAttribute("d", d);
      path.setAttribute("stroke", "rgba(255,255,255,0.12)");
      path.setAttribute("stroke-width", width);
      path.setAttribute("fill", "none");
      path.style.opacity = opacity;
      wavesRef.current.appendChild(path);

      gsap.to(path, {
        x: 60,
        duration: speed + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };

    createWave(110, 8, 6.0, 0.22, 1.4);
    createWave(126, 6, 5.0, 0.14, 1.2);
    createWave(142, 4, 7.2, 0.10, 1.0);
  }, []);

  return <g ref={wavesRef} id="waves-layer" pointerEvents="none" />;
}