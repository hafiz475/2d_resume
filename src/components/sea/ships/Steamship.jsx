import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

function Steamship() {
  const ref = useRef();
  useShipAnimation(ref, "C");

  return (
    <g
      ref={ref}
      data-ship="C"
      style={{ cursor: "pointer" }}
      onClick={() => showStory()}
      transform="translate(1600,128)"
    >
      {/* reflection */}
      <g transform="translate(0,30) scale(1,-1)" opacity="0.14">
        <path d="M0 0 q22 10 44 0 q22 -10 44 0 l-88 0 z" fill="#263347" />
        <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" />
      </g>

      <path d="M0 0 q22 10 44 0 q22 -10 44 0 l-88 0 z" fill="#263347" opacity="0.9" />
      <rect x="18" y="-8" width="40" height="5" rx="2" fill="#1b2631" />
      <rect x="10" y="-28" width="8" height="18" rx="2" fill="#333" />
      <circle className="smoke" cx="14" cy="-32" r="6" fill="rgba(200,200,200,0.7)" />
      <rect x="38" y="-28" width="3" height="20" fill="#6f4a2f" rx="1" />
      <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" opacity="0.9" />

      {/* windows / lights */}
      <g transform="translate(6,-2)">
        <rect className="light" x="4" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
        <rect className="light" x="14" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
        <rect className="light" x="24" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
      </g>
    </g>
  );
}

export default Steamship;  // ← THIS LINE IS MISSING OR WRONG