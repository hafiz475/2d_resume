// src/components/sea/ships/Speedboat.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function Speedboat() {
  const ref = useRef();
  useShipAnimation(ref, "E"); // super fast

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(-200,140)">
      <path d="M0 0 l60 0 l-15 12 l-30 -12 z" fill="#fff" opacity="0.95" />
      <path d="M8 -6 l44 0 l-10 8 l-24 -8 z" fill="#e63946" />
      <circle className="light" cx="30" cy="-2" r="2" fill="#ffd76b" opacity="0" />
    </g>
  );
}