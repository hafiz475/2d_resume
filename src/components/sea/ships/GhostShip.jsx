// src/components/sea/ships/GhostShip.jsx
import React, { useEffect, useRef, useState } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function GhostShip() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useShipAnimation(ref, "C");

  useEffect(() => {
    const handler = (e) => setVisible(e.detail?.scene === "night2");
    window.addEventListener("scene-change", handler);
    return () => window.removeEventListener("scene-change", handler);
  }, []);

  if (!visible) return null;

  return (
    <g ref={ref} opacity="0.68" style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,108)">
      <path d="M0 0 q50 28 100 0 l-100 0 z" fill="#88e0ff" opacity="0.7" />
      <path d="M20 -80 l60 0 l-10 60 l-40 -60 z" fill="#40c4ff" opacity="0.6" />
      <circle cx="50" cy="-20" r="22" fill="#00ffff" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}