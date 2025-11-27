// src/components/air/AeroplaneBig.jsx
import React, { useRef } from "react";
import { usePlaneAnimation } from "./usePlanes";  // ← New sky hook
import { showSkyStory } from "./usePlanes";      // ← Sky stories

export default function AeroplaneBig() {
  const ref = useRef();
  usePlaneAnimation(ref, "E");  // Slow majestic fly-by

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showSkyStory}>  // ← Sky story on click
      <svg
        height="157px"
        width="157px"
        viewBox="0 0 496.016 496.016"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Your full big plane SVG paths here — unchanged */}
        <path style={{ fill: "#DAE5E5" }} d="M64.816,246.474c0,26.4-36.8,18.4-46.4,18.4c-10.4,0.8-18.4-20.8-18.4-46.4s-0.8-50.4,8.8-50.4 C19.216,168.074,64.816,220.874,64.816,246.474z" />
        {/* ... all other paths ... */}
        <path style={{ fill: "#809391" }} d="M233.616,287.274c0.8,0,2.4-3.2,2.4-8c0,0,0,0,0-0.8h-4c0,0,0,0,0,0.8 C231.216,284.074,232.016,287.274,233.616,287.274z" />
      </svg>
    </g>
  );
}