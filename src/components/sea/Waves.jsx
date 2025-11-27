// src/components/sea/Waves.jsx
import React from "react";
import { gsap } from "gsap";

export default function Waves() {
  const wave1 = React.useRef();
  const wave2 = React.useRef();
  const wave3 = React.useRef();

  React.useEffect(() => {
    gsap.to(wave1.current, { x: 80, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(wave2.current, { x: 60, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(wave3.current, { x: 100, duration: 7.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  return (
    <g id="waves-layer" pointerEvents="none">
      <path
        ref={wave1}
        d="M-600 110 C-480 102 -360 118 -240 110 S-120 102 0 110 S120 118 240 110 S360 102 480 110 S600 118 720 110 S840 102 960 110"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <path
        ref={wave2}
        d="M-600 126 C-480 120 -360 132 -240 126 S-120 120 0 126 S120 132 240 126 S360 120 480 126 S600 132 720 126 S840 120 960 126"
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.0"
      />
      <path
        ref={wave3}
        d="M-600 142 C-480 138 -360 146 -240 142 S-120 138 0 142 S120 146 240 142 S360 138 480 142 S600 146 720 142 S840 138 960 142"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="0.8"
      />
    </g>
  );
}