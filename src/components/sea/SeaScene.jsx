// src/components/sea/SeaScene.jsx
import React from "react";
import SeaBackground from "./SeaBackground";
import Waves from "./Waves";
import Shimmer from "./Shimmer";
import DistantBoats from "./DistantBoats";
import Sailboat from "./ships/Sailboat";
import Steamship from "./ships/Steamship";
import Yacht from "./ships/Yacht";
import FishingBoat from "./ships/FishingBoat";
import PirateShip from "./ships/PirateShip";
import Tugboat from "./ships/Tugboat";
import Speedboat from "./ships/Speedboat";
import GhostShip from "./ships/GhostShip";
import ShipStoryOverlay from "./ships/ShipStoryOverlay";

export default function SeaScene() {
  return (
    <svg
      className="sand-svg"
      viewBox="0 0 1400 200"
      preserveAspectRatio="xMidYMax meet" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d2438" />
          <stop offset="100%" stopColor="#071126" />
        </linearGradient>
        <linearGradient id="glintGrad" x1="0%" x2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="seaBlur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <SeaBackground />
      <Waves />
      <Shimmer />
      <DistantBoats />          {/* ← distant fleet on horizon */}

      <g id="ships" pointerEvents="all">
        <Sailboat />
        <Steamship />
        <Yacht />
        <FishingBoat />
        <PirateShip />
        <Tugboat />
        <Speedboat />
        <GhostShip />
      </g>

      <ShipStoryOverlay />
    </svg>
  );
}