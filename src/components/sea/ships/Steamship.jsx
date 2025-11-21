import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function Steamship() {
  const ref = useRef();
  useShipAnimation(ref, "C");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,128)">
      <g transform="translate(0,30) scale(1,-1)" opacity="0.18">
        <path d="M0 0 q22 10 44 0 q22 -10 44 0 l-88 0 z" fill="#f0f8ff" />
      </g>

      <path d="M0 0 q22 10 44 0 q22 -10 44 0 l-88 0 z" fill="#fafafa" opacity="0.98" />
      <rect x="18" y="-8" width="40" height="5" rx="2" fill="#e0e0e0" />
      
      {/* red funnel */}
      <rect x="10" y="-28" width="8" height="18" rx="2" fill="#d43f3a" />
      <circle className="smoke" cx="14" cy="-32" r="6" fill="rgba(220,220,220,0.8)" />
      
      <rect x="38" y="-28" width="3" height="20" fill="#d43f3a" rx="1" />
      <path d="M40 -26 L66 -6 L40 -6 Z" fill="#87cefa" opacity="0.94" />
      
      <g transform="translate(6,-2)">
        <rect className="light" x="4" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
        <rect className="light" x="14" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
        <rect className="light" x="24" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
      </g>
    </g>
  );
}