// src/components/air/AeroplaneBig.jsx
import React, { useRef } from "react";
import { usePlaneAnimation } from "./usePlanes";
import { showSkyStory } from "./usePlanes";
import gsap from "gsap";

export default function AeroplaneBig() {
  const ref = useRef();
  const bannerRef = useRef();  // For banner trail

  usePlaneAnimation(ref, "E");

  // Sync banner to plane's x (trails behind)
  React.useEffect(() => {
    if (!ref.current || !bannerRef.current) return;
    const tl = gsap.timeline({ repeat: -1 });
    tl.set(bannerRef.current, { x: -60 })  // Start behind plane
      .to(bannerRef.current, { 
        x: "+=1960",  // Match plane's full glide
        duration: 18,  // Sync to "E" type duration
        ease: "power1.inOut" 
      }, 0);  // Start at same time as plane
  }, []);

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showSkyStory}>
      <svg
        height="157px"
        width="157px"
        viewBox="0 0 496.016 496.016"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Your full big plane SVG paths — unchanged */}
        <path style={{ fill: "#DAE5E5" }} d="M64.816,246.474c0,26.4-36.8,18.4-46.4,18.4c-10.4,0.8-18.4-20.8-18.4-46.4s-0.8-50.4,8.8-50.4 C19.216,168.074,64.816,220.874,64.816,246.474z" />
        {/* ... all other paths ... */}
        <path style={{ fill: "#809391" }} d="M233.616,287.274c0.8,0,2.4-3.2,2.4-8c0,0,0,0,0-0.8h-4c0,0,0,0,0,0.8 C231.216,284.074,232.016,287.274,233.616,287.274z" />
      </svg>

      {/* TOWED BANNER — Trails behind */}
      <g ref={bannerRef} transform="translate(0, 20)">
        {/* Ribbon tail (curved line) */}
        <path 
          d="M0 0 Q-20 -10 -40 0 Q-60 10 -80 0" 
          fill="none" 
          stroke="#ff4444" 
          strokeWidth="2" 
          opacity="0.9" 
          strokeLinecap="round"
        />
        {/* Banner box */}
        <rect x="-50" y="-8" width="80" height="16" rx="4" fill="#ff4444" opacity="0.95" />
        {/* Text: "I'm Hafiz" (adjust font if needed) */}
        <text x="-30" y="4" fontFamily="Arial, sans-serif" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">
          I'm Hafiz
        </text>
        {/* Little flag end */}
        <polygon points="-80,0 -90,-5 -90,5" fill="#ff4444" opacity="0.9" />
      </g>
    </g>
  );
}