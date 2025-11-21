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
    <g ref={ref} opacity="0.7" style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,108)">
      <path d="M0 0 q50 28 100 0 l-100 0 z" fill="#0a3d38" />
      <path d="M20 -80 l60 0 l-10 60 l-40 -60 z" fill="#071d1a" opacity="0.8" />
      <circle cx="50" cy="-20" r="20" fill="#0ff" opacity="0.3" />
      <circle cx="50" cy="-20" r="8" fill="#0ff" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}