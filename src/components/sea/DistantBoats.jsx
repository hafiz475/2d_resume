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
  Sailboat,
  Steamship,
  Yacht,
  FishingBoat,
  PirateShip,
  Tugboat,
  Speedboat,
  Sailboat,
  Steamship,
  Yacht,
  PirateShip,
  FishingBoat,
  Tugboat,
  Speedboat,
  Sailboat,
  Steamship,
  Yacht,
  PirateShip,
  FishingBoat,
  Tugboat,
];

export default function DistantBoats() {
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const wraps = groupRef.current.querySelectorAll(".boatWrap");

    const svg = groupRef.current.ownerSVGElement;
    if (!svg) return;

    // 1) Get the real pixel horizon (sea SVG top)
    const seaEl = document.querySelector(".sand-svg");
    const seaRect = seaEl.getBoundingClientRect();
    const horizonPixelY = seaRect.top;

    // 2) Convert pixel Y → SVG viewBox Y
    const pt = svg.createSVGPoint();
    pt.x = 0;
    pt.y = horizonPixelY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const horizonY = svgP.y - 2; // Slightly below the seam

    wraps.forEach((wrap, i) => {
      const direction = Math.random() > 0.5 ? 1 : -1;

      const vbWidth = svg.viewBox.baseVal.width;
      const startX = direction > 0 ? -400 : vbWidth + 400;
      const endX = direction > 0 ? vbWidth + 400 : -500;

      // boats sit *exactly* on the real horizon line
      const y = horizonY;

      const scale = 0.32 + Math.random() * 0.06;

      wrap.setAttribute(
        "transform",
        `translate(${startX}, ${y}) scale(${scale})`
      );
      wrap.style.opacity = 0.92;

      gsap.to(wrap, {
        attr: { transform: `translate(${endX}, ${y}) scale(${scale})` },
        duration: 42 + Math.random() * 8,
        ease: "none",
        repeat: -1,
        delay: i * 0.25,
      });

      const inner = wrap.querySelector(".boatInner");
      if (inner) {
        gsap.to(inner, {
          attr: { transform: "translate(0, 1.4)" },
          duration: 4 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });
  }, []);

  return (
    <g ref={groupRef} pointerEvents="none">
      {distantFleet.map((Ship, i) => (
        <g key={i} className="boatWrap">
          <g className="boatInner">
            <Ship />
          </g>
        </g>
      ))}
    </g>
  );
}
