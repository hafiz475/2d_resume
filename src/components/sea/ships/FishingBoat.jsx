// src/components/sea/ships/FishingBoat.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function FishingBoat() {
  const ref = useRef();
  useShipAnimation(ref, "E"); // fast & bouncy

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,132)">
      <g transform="translate(0,28) scale(1,-1)" opacity="0.14">
        <path d="M0 0 q20 12 40 0 l-40 0 z" fill="#394a3e" />
      </g>

      <path d="M0 0 q20 12 40 0 l-40 0 z" fill="#395e47" opacity="0.95" />
      <rect x="8" y="-12" width="24" height="14" fill="#c97d3a" rx="2" />
      <rect x="18" y="-28" width="2" height="18" fill="#ddd" />
      <path d="M10 -24 l15 12 l-30 0 z" fill="#f1f1f1" opacity="0.7" />
      <circle className="light" cx="20" cy="-4" r="2.5" fill="#ffd76b" opacity="0" />
    </g>
  );
}