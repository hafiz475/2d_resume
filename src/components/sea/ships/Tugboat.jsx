// src/components/sea/ships/Tugboat.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function Tugboat() {
  const ref = useRef();
  useShipAnimation(ref, "C");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(-400,130)">
      <g transform="translate(0,32) scale(1,-1)" opacity="0.2">
        <path d="M0 0 q18 10 36 0 l-36 0 z" fill="#ff4444" />
      </g>

      <path d="M0 0 q18 10 36 0 l-36 0 z" fill="#ff4444" opacity="0.98" />
      <rect x="8" y="-20" width="20" height="24" fill="#ffffff" rx="3" />
      <rect x="14" y="-30" width="8" height="14" fill="#333" rx="2" />
      <circle className="smoke" cx="18" cy="-34" r="5" fill="rgba(200,200,200,0.9)" />
      <circle className="light" cx="18" cy="-8" r="3" fill="#ffd76b" opacity="0" />
    </g>
  );
}