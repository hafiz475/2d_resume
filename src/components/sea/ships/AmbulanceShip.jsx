// src/components/sea/ships/AmbulanceShip.jsx
import React, { useRef } from "react";
import { showStory } from "./ShipStoryOverlay";
import { useShipAnimation } from "../useShips";
// import { useShipAnimation } from "../../useShips";
// import { showStory } from "../ShipStoryOverlay";

export default function AmbulanceShip() {
  const ref = useRef();
  useShipAnimation(ref, "C");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory}>
      <svg
        height="64px"
        width="64px"
        viewBox="0 0 512.001 512.001"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full ambulance ship SVG pasted here (same as you provided) */}
        <path
          style={{ fill: "#E8E8E8" }}
          d="M217.522,70.744H135.87c-7.393,0-13.387,5.994-13.387,13.387v105.213h108.427V84.131 C230.909,76.738,224.916,70.744,217.522,70.744z"
        />
        {/* ... all other paths from your ambulance SVG ... */}
        <path
          style={{ fill: "#333E48" }}
          d="M411.256,377.374H382.02c-4.634,0-8.392-3.757-8.392-8.392s3.757-8.392,8.392-8.392h29.236 c4.634,0,8.392,3.757,8.392,8.392S415.891,377.374,411.256,377.374z"
        />
      </svg>
    </g>
  );
}
