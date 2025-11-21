// src/components/sea/ships/CruiseLiner.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function CruiseLiner() {
  const ref = useRef();
  useShipAnimation(ref, "A");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(-800,90)">
      <rect x="0" y="0" width="560" height="80" fill="#f0f0f0" rx="12" />
      <rect x="20" y="-120" width="520" height="140" fill="#ffffff" rx="8" />
      {[...Array(12)].map((_, i) => (
        <rect key={i} x={40 + i * 40} y="-40" width="28" height="20" fill="#1e90ff" />
      ))}
      {[...Array(8)].map((_, i) => (
        <circle key={i} className="light" cx={80 + i * 60} cy="-80" r="3" fill="#ffd76b" opacity="0" />
      ))}
    </g>
  );
}