// src/components/sea/ships/CargoShip.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function CargoShip() {
  const ref = useRef();
  useShipAnimation(ref, "A"); // reuse left→right slow logic

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(-500,112)">
      {/* reflection */}
      <g transform="translate(0,50) scale(1,-1)" opacity="0.16">
        <rect x="0" y="0" width="360" height="60" fill="#1a2b3d" rx="8" />
      </g>

      {/* massive hull + containers */}
      <rect x="0" y="0" width="360" height="60" fill="#1e3a5f" rx="8" />
      <rect x="12" y="-40" width="336" height="48" fill="#c94a3e" rx="4" />
      <rect x="32" y="-36" width="80" height="40" fill="#3b8b6e" rx="3" />
      <rect x="128" y="-36" width="80" height="40" fill="#d9773a" rx="3" />
      <rect x="224" y="-36" width="80" height="40" fill="#4a6fa5" rx="3" />

      {/* bridge & lights */}
      <rect x="240" y="-68" width="96" height="36" fill="#2d4059" rx="4" />
      <circle className="light" cx="288" cy="-48" r="3" fill="#ffd76b" opacity="0" />
      <circle className="light" cx="300" cy="-48" r="3" fill="#ffd76b" opacity="0" />
    </g>
  );
}