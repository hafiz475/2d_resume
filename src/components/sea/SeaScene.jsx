// src/components/sea/SeaScene.jsx
import React from "react";
import SeaBackground from "./SeaBackground";
import Waves from "./Waves";
import Shimmer from "./Shimmer";
import DistantBoats from "./DistantBoats";
import Titanic from "./ships/Titanic";
import AmbulanceShip from "./ships/AmbulanceShip";
import PirateShip from "./ships/PirateShip";
import Tugboat from "./ships/Tugboat";
import GhostShip from "./ships/GhostShip";
import ShipStoryOverlay from "./ships/ShipStoryOverlay";
// import ShipStoryOverlay from "./ShipStoryOverlay";

export default function SeaScene() {
  return (
    <svg
      className="sand-svg"
      viewBox="0 0 1400 180"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d2438" />
          <stop offset="100%" stopColor="#040e1c" />
        </linearGradient>
        <linearGradient id="glintGrad" x1="0%" x2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="seaBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <SeaBackground />
      <Waves />
      <Shimmer />
      <DistantBoats />

      {/* SEA LAYER — Ships only, no planes */}
      <g id="ships" pointerEvents="all">
        <g transform="translate(-100, 90) scale(0.4)">
          <Tugboat />
        </g>
        <g transform="translate(200, 70) scale(0.45)">
          <Titanic />
        </g>
        <g transform="translate(500, 85) scale(0.4)">
          <AmbulanceShip />
        </g>
        <g transform="translate(800, 65) scale(0.42)">
          <PirateShip />
        </g>
        <g transform="translate(1100, 95) scale(0.4)">
          <GhostShip />
        </g>
      </g>

      <ShipStoryOverlay />
    </svg>
  );
}