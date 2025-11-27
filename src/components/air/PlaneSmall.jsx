// src/components/air/PlaneSmall.jsx
import React, { useRef } from "react";
import { showStory } from "../sea/ships/ShipStoryOverlay";
import { useShipAnimation } from "../sea/useShips";

export default function PlaneSmall() {
  const ref = useRef();
  useShipAnimation(ref, "A"); // or "E" for slower majestic fly-by

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory}>
      <svg
        height="64px"
        width="64px"
        viewBox="0 0 512.001 512.001"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full small plane SVG pasted here */}
        <path
          style={{ fill: "#D3CBA9" }}
          d="M242.242,386.783h-25.958c-32.277,0-63.948-8.772-91.625-25.378l-92.236-55.342 C12.308,293.994,0,272.255,0,248.798v-17.841V113.199c0-21.024,17.044-38.068,38.068-38.068l0,0 c16.996,0,31.934,11.267,36.604,27.61l34.326,120.143c1.366,4.778,5.732,8.073,10.702,8.073h58.387h92.198h61.986 c56.977,0,110.513,27.262,144.026,73.342l30.885,42.467c3.132,4.306,4.819,9.495,4.819,14.82l0,0 c0,13.916-11.282,25.197-25.197,25.197H381.059H242.242z"
        />
        {/* ... all other paths ... */}
        <path
          style={{ fill: "#C92B00" }}
          d="M233.739,403.479h155.826c0,18.442-14.949,33.391-33.391,33.391H267.13 C248.688,436.87,233.739,421.921,233.739,403.479z"
        />
      </svg>
    </g>
  );
}
