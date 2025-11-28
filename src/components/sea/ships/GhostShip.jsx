// src/components/sea/ships/GhostShip.jsx
import React, { useEffect, useRef, useState } from "react";
import { useShipAnimation } from "../useShips";
import { showStory } from "./ShipStoryOverlay";

export default function GhostShip() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useShipAnimation(ref, "C");

  useEffect(() => {
    const handler = (e) => setVisible(e.detail?.scene === "night2");
    window.addEventListener("scene-change", handler);
    return () => window.removeEventListener("scene-change", handler);
  }, []);

  if (!visible) return null;

  return (
    <g ref={ref} opacity="0.68" style={{ cursor: "pointer" }} onClick={showStory} transform="translate(1600,108)">
      <svg
        width="655.359"
        height="655.359"
        viewBox="0 0 6.827 6.827"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3.482.99C3.482.93 3.45.88 3.413.88c-.037 0-.068.05-.068.111v3.983c0 .061.03.111.068.111.038 0 .069-.05.069-.111V.99z" 
          style={{ fill: "#757575", fillRule: "nonzero" }}
        />
        <path 
          d="M5.943 4.723c.127.562-.143 1.212-.84 1.214l-3.355.01C1.04 5.95.755 5.294.883 4.724l.84.25h3.38c.315 0 .584-.148.84-.25z" 
          style={{ fill: "#795548" }}
        />
        <path 
          d="M3.482 1.943c-.101.011.38 1.497-.043 3.03 0 0 .772-.356 1.486 0 .57-.918-.436-2.804-1.443-3.03z" 
          style={{ fill: "#dc2e27" }}
        />
        <path 
          d="M3.482 1.943c-.005 0-.009.005-.011.012-.032.097 1.195 1.324 1.118 2.899a1.479 1.479 0 0 1 .336.119c.57-.918-.436-2.804-1.443-3.03z" 
          style={{ fill: "#b3342e" }}
        />
        <path 
          d="M3.345 4.973s-.892-.386-1.852-.066c0 0 1.623-1.509 1.852-3.018 0 0-.229 2.105 0 3.084z" 
          style={{ fill: "#dc2e27" }}
        />
        <path 
          d="M1.684 4.852a2.397 2.397 0 0 0-.19.055s1.622-1.509 1.851-3.018l-.02.147S3.05 4.37 1.685 4.852h-.001z" 
          style={{ fill: "#b3342e" }}
        />
        <path 
          d="M3.347.972h-.93l.354.287-.357.304h.937z" 
          style={{ fill: "#009688" }}
        />
        <path 
          d="M3.347.972h-.93l.353.286h.58z" 
          style={{ fill: "#00796b" }}
        />
        <g>
          <path 
            d="M.86 5.12h5.107c-.004.036-.01.072-.016.107H.877A1.142 1.142 0 0 1 .86 5.12z" 
            style={{ fill: "#573f37" }}
          />
          <path 
            d="M.904 5.333h5.02a1.002 1.002 0 0 1-.04.107H.943a1.015 1.015 0 0 1-.04-.107z" 
            style={{ fill: "#573f37" }}
          />
          <path 
            d="M1 5.547h4.828a.846.846 0 0 1-.077.106H1.076A.868.868 0 0 1 1 5.547z" 
            style={{ fill: "#573f37" }}
          />
          <path 
            d="M1.183 5.76h4.46a.771.771 0 0 1-.179.107h-4.11a.79.79 0 0 1-.17-.107z" 
            style={{ fill: "#573f37" }}
          />
        </g>
        <path 
          style={{ fill: "none" }} 
          d="M0 0h6.827v6.827H0z" 
        />
      </svg>
    </g>
  );
}