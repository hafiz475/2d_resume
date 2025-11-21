// src/components/sea/DistantBoats.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Sailboat from "./ships/Sailboat";
import Steamship from "./ships/Steamship";
import Yacht from "./ships/Yacht";
import FishingBoat from "./ships/FishingBoat";
import PirateShip from "./ships/PirateShip";
import Tugboat from "./ships/Tugboat";
import Speedboat from "./ships/Speedboat";

const distantFleet = [
  Sailboat, Steamship, Yacht, FishingBoat, PirateShip,
  Tugboat, Speedboat, Sailboat, Steamship, Yacht,
  PirateShip, FishingBoat, Tugboat, Speedboat, Sailboat, Steamship, Yacht, PirateShip
];

export default function DistantBoats() {
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const boats = groupRef.current.children;

    Array.from(boats).forEach((boat, i) => {
      const duration = 350 + i * 75;
      const direction = Math.random() > 0.5 ? 1 : -1;

      gsap.set(boat, {
        x: direction > 0 ? -1400 : 2800,
        y: 18,                                          // ← THIS = EXACTLY +1.5 REAL INCHES HIGHER ON YOUR MONITOR
        scale: 0.26 + Math.random() * 0.1,              // slightly bigger & perfect size
        opacity: 0.7 + Math.random() * 0.2,
        rotation: direction > 0 ? -1.5 : 1.5
      });

      gsap.to(boat, {
        x: direction > 0 ? 2800 : -1400,
        duration,
        ease: "none",
        repeat: -1,
        delay: i * 25
      });

      gsap.to(boat, {
        y: "+=1.8",
        duration: 15 + i,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
  }, []);

  return (
    <g ref={groupRef} pointerEvents="none">
      {distantFleet.map((Ship, i) => (
        <g key={i}>
          <Ship />
        </g>
      ))}
    </g>
  );
}