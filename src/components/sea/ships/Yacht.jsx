import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function Yacht() {
  const ref = useRef();
  useShipAnimation(ref, "E");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(-100,136)">
      <g transform="translate(0,26) scale(1,-1)" opacity="0.18">
        <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#f0f8ff" />
      </g>

      <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#ffffff" opacity="0.98" />
      <rect x="14" y="-8" width="52" height="6" rx="2" fill="#f5f5f5" />
      <rect x="36" y="-28" width="3" height="22" fill="#daa520" rx="1" />
      <path d="M40 -26 L66 -6 L40 -6 Z" fill="#b0e0e6" opacity="0.96" />
      
      <circle className="light" cx="18" cy="-6" r="2.6" fill="#ffd700" opacity="0" />
      <circle className="light" cx="46" cy="-6" r="2.6" fill="#ffd700" opacity="0" />
    </g>
  );
}