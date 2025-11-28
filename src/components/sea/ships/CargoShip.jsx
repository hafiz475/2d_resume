// src/components/sea/ships/CargoShip.jsx
import React, { useRef } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function CargoShip() {
  const ref = useRef();
  useShipAnimation(ref, "A"); // reuse left→right slow logic

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory} transform="translate(-500,112)">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M39 21v1h-2v-1a1 1 0 0 1 2 0zM43 21v1h-2v-1a1 1 0 0 1 2 0zM47 21v1h-2v-1a1 1 0 0 1 2 0z" 
          style={{ fill: "#747575" }}
        />
        <path 
          d="M42.57 36c-.51 3.54-.38 2.67-.57 4H3l-.57-4z" 
          style={{ fill: "#db5669" }}
        />
        <path 
          d="m42.57 36-.43 3H9a3.5 3.5 0 0 1-3.46-3z" 
          style={{ fill: "#f26674" }}
        />
        <path 
          d="M47 22c0 2.91.25 5.69-2.25 8.81a10.27 10.27 0 0 0-2.15 5c-.05.36 3.11.23-40.17.23L1 26h30l4-4z" 
          style={{ fill: "#374f68" }}
        />
        <path 
          d="M47 22c0 2.91.25 5.69-2.25 8.81A10.1 10.1 0 0 0 43 34H13.12a9.68 9.68 0 0 1-9.53-8H31l4-4z" 
          style={{ fill: "#425b72" }}
        />
        <path 
          d="M8 14h8v12H8z" 
          style={{ fill: "#dad7e5" }}
        />
        <path 
          d="M16 14c0 10.61-.1 10 0 10a6 6 0 0 1-6-6v-4z" 
          style={{ fill: "#edebf2" }}
        />
        <path 
          d="M10 8h4v6h-4z" 
          style={{ fill: "#7c7d7d" }}
        />
        <path 
          d="M14 11v2h-1a2 2 0 0 1-2-2z" 
          style={{ fill: "#919191" }}
        />
        <path 
          d="M13 18a1 1 0 0 0-2 0 1 1 0 0 0 2 0zM13 22a1 1 0 0 0-2 0 1 1 0 0 0 2 0z" 
          style={{ fill: "#747575" }}
        />
        <path 
          d="M14 31a1 1 0 0 0-2 0 1 1 0 0 0 2 0zM10 31a1 1 0 0 0-2 0 1 1 0 0 0 2 0z" 
          style={{ fill: "#dad7e5" }}
        />
        <path 
          d="M16 22h6v4h-6z" 
          style={{ fill: "#6fabe6" }}
        />
        <path 
          d="M22 22v3h-3a2 2 0 0 1-2-2v-1z" 
          style={{ fill: "#82bcf4" }}
        />
        <path 
          d="M16 18h6v4h-6z" 
          style={{ fill: "#374f68" }}
        />
        <path 
          d="M22 18v3h-3a2 2 0 0 1-2-2v-1z" 
          style={{ fill: "#425b72" }}
        />
        <path 
          d="M16 14h6v4h-6z" 
          style={{ fill: "#9dcc6b" }}
        />
        <path 
          d="M22 14v3h-3a2 2 0 0 1-2-2v-1z" 
          style={{ fill: "#b5e08c" }}
        />
        <path 
          d="M22 18h6v4h-6z" 
          style={{ fill: "#fc6" }}
        />
        <path 
          d="M28 18v3h-3a2 2 0 0 1-2-2v-1z" 
          style={{ fill: "#ffde76" }}
        />
        <path 
          d="M2 22h6v4H2z" 
          style={{ fill: "#db5669" }}
        />
        <path 
          d="M7 22v3H6a3 3 0 0 1-3-3z" 
          style={{ fill: "#f26674" }}
        />
        <path 
          d="M2 18h6v4H2z" 
          style={{ fill: "#6fabe6" }}
        />
        <path 
          d="M7 18v3H5a2 2 0 0 1-2-2v-1z" 
          style={{ fill: "#82bcf4" }}
        />
        <path 
          d="M22 22h6v4h-6z" 
          style={{ fill: "#9dcc6b" }}
        />
        <path 
          d="M28 22v3h-3a2 2 0 0 1-2-2v-1z" 
          style={{ fill: "#b5e08c" }}
        />
        <path 
          d="M14 10h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z" 
          style={{ fill: "#7c7d7d" }}
        />
        <path 
          d="M15 9h-4a1 1 0 0 1-1-1h4a1 1 0 0 1 1 1z" 
          style={{ fill: "#919191" }}
        />
      </svg>
    </g>
  );
}