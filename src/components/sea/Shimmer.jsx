// src/components/sea/Shimmer.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Shimmer() {
  const shimmerRef = useRef();

  useEffect(() => {
    if (!shimmerRef.current) return;
    gsap.set(shimmerRef.current, { x: -900, opacity: 0.9 });
    gsap.to(shimmerRef.current, { x: 1600, duration: 6.4, repeat: -1, ease: "none" });
  }, []);

  return (
    <g id="shimmerGroup" pointerEvents="none" filter="url(#seaBlur)">
      <rect ref={shimmerRef} x={-900} y={110} width={900} height={8} fill="url(#glintGrad)" rx="4" />
    </g>
  );
}