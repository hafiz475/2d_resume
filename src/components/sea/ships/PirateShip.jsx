// src/components/sea/ships/PirateShip.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function PirateShip() {
  const ref = useRef();
  useShipAnimation(ref, "C"); // right→left menacing

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,104)">
      <g transform="translate(0,44) scale(1,-1)" opacity="0.15">
        <path d="M0 0 q40 20 80 0 l-80 0 z" fill="#000" />
      </g>

      <path d="M0 0 q40 20 80 0 l-80 0 z" fill="#111" />
      <rect x="20" y="-60" width="40" height="68" fill="#222" />
      <path d="M0 -60 l80 0 l-20 40 l-40 -40 z" fill="#000" />
      <path d="M20 -40 L40 -20 L60 -40 Z" fill="#fff" stroke="#000" strokeWidth="2" />
      <circle cx="40" cy="-50" r="8" fill="#000" />
      <path d="M36 -54 q4 4 8 0 q4 -4 0 -8 q-4 -4 -8 0 q-4 4 0 8" fill="#fff" />
      <circle className="light" cx="40" cy="-10" r="4" fill="#ff3366" opacity="0" />
    </g>
  );
}