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

const distantFleet = [Sailboat, Yacht, Steamship, PirateShip, FishingBoat];

export default function DistantBoats() {
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const wraps = groupRef.current.querySelectorAll(".boatWrap");

    const svg = groupRef.current.ownerSVGElement;
    if (!svg) return;

    // real horizon line in pixels
    const seaEl = document.querySelector(".sand-svg");
    const seaRect = seaEl.getBoundingClientRect();
    const horizonPixelY = seaRect.top;

    // convert pixel → viewBox Y
    const pt = svg.createSVGPoint();
    pt.x = 0;
    pt.y = horizonPixelY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const horizonY = svgP.y;

    // real screen width
    const screenWidth = window.innerWidth;

    wraps.forEach((wrap, i) => {
      const direction = Math.random() > 0.5 ? 1 : -1;

      const startX = direction > 0 ? -600 : screenWidth + 600;
      const endX = direction > 0 ? screenWidth + 600 : -600;

      // move boat more above (closer to horizon)
      const y = horizonY - 10; // adjust this number if needed

      // fewer boats = larger look, less clutter
      const scale = 0.35 + Math.random() * 0.08;

      wrap.setAttribute(
        "transform",
        `translate(${startX}, ${y}) scale(${scale})`
      );
      wrap.style.opacity = 0.92;

      // full-width sail across entire screen
      gsap.to(wrap, {
        attr: { transform: `translate(${endX}, ${y}) scale(${scale})` },
        duration: 45 + Math.random() * 10,
        ease: "none",
        repeat: -1,
        delay: i * 0.4,
      });

      // bob effect
      const inner = wrap.querySelector(".boatInner");
      if (inner) {
        gsap.to(inner, {
          attr: { transform: "translate(0, 1.4)" },
          duration: 4 + Math.random() * 1.5,
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
