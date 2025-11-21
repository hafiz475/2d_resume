// src/components/sea/SeaBackground.jsx
import React from "react";

export default function SeaBackground() {
  return (
    <>
      <rect x="0" y="0" width="1400" height="200" fill="url(#seaGrad)" />
      {/* Deep water subtle shapes */}
      <g opacity="0.4">
        <path d="M0 120 Q340 80 700 110 T1400 100" fill="none" stroke="#0e2a42" strokeWidth="60" />
        <path d="M0 140 Q400 100 800 130 T1400 120" fill="none" stroke="#0b2235" strokeWidth="80" opacity="0.6" />
      </g>
      <rect x="0" y="96" width="1400" height="2" fill="rgba(255,255,255,0.04)" />
    </>
  );
}