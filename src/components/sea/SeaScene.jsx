// src/components/sea/SeaScene.jsx
import React, { useRef } from "react";

import SeaBackground from "./SeaBackground";
import Waves from "./Waves";
import Shimmer from "./Shimmer";
import DistantBoats from "./DistantBoats";

import Titanic from "./ships/Titanic";
import AmbulanceShip from "./ships/AmbulanceShip";
import PirateShip from "./ships/PirateShip";
import GhostShip from "./ships/GhostShip";
import CargoShip from "./ships/CargoShip";

import ShipStoryOverlay from "./ships/ShipStoryOverlay";
import { useShipAnimation } from "./useShips";

export default function SeaScene() {
  const containerWidth = 1400;

  // **Correct horizon for a 180px viewBox**
  const horizonY = 110;

  // 3-Layer Depth Assignment
  const ships = [
    // NEAR — big, fast, close to bottom
    { id: "cargo", Comp: CargoShip, type: "E", seed: 0.1, depth: 0.85 },

    // MID — medium size, mid-speed
    { id: "titanic", Comp: Titanic, type: "A", seed: 0.35, depth: 0.5 },
    { id: "pirate", Comp: PirateShip, type: "A", seed: 0.75, depth: 0.5 },

    // FAR — small, slow, near horizon
    { id: "ambulance", Comp: AmbulanceShip, type: "E", seed: 0.52, depth: 0.2 },
    { id: "ghost", Comp: GhostShip, type: "C", seed: 0.9, depth: 0.2 },
  ];

  function ShipWrapper({ id, Comp, type, depth, seed }) {
    const ref = useRef();
    const reflRef = useRef(); // reflection element

    useShipAnimation(ref, type, {
      depth,
      seedX: seed,
      containerWidth,
      horizonY,
      reflectionRef: reflRef, // <-- send reflection to animation hook
    });

    // Reflection opacity per depth
    const reflectionOpacity =
      depth < 0.35
        ? 0.18 // FAR
        : depth < 0.7
        ? 0.32 // MID
        : 0.45; // NEAR

    return (
      <g id={id} style={{ pointerEvents: "auto" }}>
        {/* ========= REFLECTION ========= */}
        <g ref={reflRef} opacity={reflectionOpacity}>
          <g transform="scale(1, -0.35)">
            <Comp />
          </g>
          <rect
            x="-400"
            y="0"
            width="800"
            height="180"
            fill="url(#reflectionMaskGrad)"
            opacity="0.45"
          />
        </g>

        {/* ========= ORIGINAL SHIP ========= */}
        <g ref={ref}>
          <Comp />
        </g>
      </g>
    );
  }

  return (
    <svg
      className="sand-svg"
      viewBox="0 0 1400 180"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SeaBackground />
      <Waves />
      <Shimmer />
      <DistantBoats />

      <g id="ships" pointerEvents="all">
        {ships
          .slice()
          .sort((a, b) => a.depth - b.depth)
          .map((s) => (
            <ShipWrapper
              key={s.id}
              id={s.id}
              Comp={s.Comp}
              type={s.type}
              depth={s.depth}
              seed={s.seed}
            />
          ))}
      </g>

      <defs>
        <linearGradient id="reflectionMaskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ShipStoryOverlay />
    </svg>
  );
}
