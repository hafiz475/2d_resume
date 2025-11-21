// src/components/sea/ships/FishingBoat.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function FishingBoat() {
  const ref = useRef();
  useShipAnimation(ref, "E");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,132)">
      <g transform="translate(0,28) scale(1,-1)" opacity="0.2">
        <path d="M0 0 q20 12 40 0 l-40 0 z" fill="#ffd700" />
      </g>

      <path d="M0 0 q20 12 40 0 l-40 0 z" fill="#ffeb3b" opacity="0.98" />
      <rect x="8" y="-12" width="24" height="14" fill="#ff9800" rx="2" />
      <rect x="18" y="-28" width="2" height="18" fill="#fff" />
      <path d="M10 -24 l15 12 l-30 0 z" fill="#fff" opacity="0.88" />
      <circle className="light" cx="20" cy="-4" r="2.5" fill="#ffeb3b" opacity="0" />
    </g>
  );
}