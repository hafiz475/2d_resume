// src/components/sea/ships/Sailboat.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function Sailboat() {
  const ref = useRef();
  useShipAnimation(ref, "A");

  return (
    <g
      ref={ref}
      data-ship="A"
      style={{ cursor: "pointer" }}
      onClick={() => showStory()}
      transform="translate(-300,100)"
    >
      {/* reflection */}
      <g transform="translate(0,36) scale(1,-1)" opacity="0.18">
        <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#2a2f3a" />
        <path d="M59 -36 L95 -4 L59 -4 Z" fill="#fff" />
      </g>

      {/* hull & sail */}
      <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#2a2f3a" opacity="0.95" />
      <rect x="28" y="-10" width="64" height="6" rx="2" fill="#1f2630" />
      <rect x="56" y="-38" width="3" height="28" fill="#7a5230" rx="1" />
      <path d="M59 -36 L95 -4 L59 -4 Z" fill="#fff" opacity="0.95" />
      <rect x="59" y="-40" width="18" height="4" rx="1" fill="#e85a4f" />
      <circle className="light" cx="59" cy="-10" r="3" fill="#ffd76b" opacity="0" />
    </g>
  );
}