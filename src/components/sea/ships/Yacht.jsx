import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

function Yacht() {
  const ref = useRef();
  useShipAnimation(ref, "E"); // "E" = Yacht (faster one)

  return (
    <g
      ref={ref}
      data-ship="E"
      style={{ cursor: "pointer" }}
      onClick={() => showStory()}
      transform="translate(-100,136)"
    >
      {/* reflection */}
      <g transform="translate(0,26) scale(1,-1)" opacity="0.12">
        <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#0f2b3e" />
        <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" />
      </g>

      {/* hull */}
      <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#0f2b3e" opacity="0.95" />
      <rect x="14" y="-8" width="52" height="6" rx="2" fill="#071726" />
      <rect x="36" y="-28" width="3" height="22" fill="#444" rx="1" />
      <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" opacity="0.95" />

      {/* deck lights (turn on at night) */}
      <circle className="light" cx="18" cy="-6" r="2.4" fill="#ffd76b" opacity="0" />
      <circle className="light" cx="46" cy="-6" r="2.4" fill="#ffd76b" opacity="0" />
    </g>
  );
}

export default Yacht; // ← THIS IS THE IMPORTANT LINE