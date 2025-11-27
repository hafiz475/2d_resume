// src/components/sea/DistantBoats.jsx
import React from "react";

export default function DistantBoats() {
  return (
    <g id="distant-boats" opacity="0.18" pointerEvents="none">
      {/* Tiny silhouettes on the horizon */}
      <path
        d="M180 92 L190 88 L200 92 Z M188 88 L188 84 M192 88 L192 84"
        fill="none"
        stroke="#88aacc"
        strokeWidth="0.8"
      />
      <path
        d="M380 98 L394 93 L408 98 Z M390 93 L390 88 M398 93 L398 88"
        fill="none"
        stroke="#99bbdd"
        strokeWidth="1"
      />
      <path
        d="M680 88 L696 82 L712 88 Z M688 82 L688 76 M700 82 L700 76"
        fill="none"
        stroke="#77aadd"
        strokeWidth="1.2"
      />
      <path
        d="M980 95 L992 90 L1004 95 Z M986 90 L986 85 M996 90 L996 85"
        fill="none"
        stroke="#88bbff"
        strokeWidth="0.9"
      />
      <path
        d="M1180 90 L1196 84 L1212 90 Z M1188 84 L1188 78 M1200 84 L1200 78"
        fill="none"
        stroke="#99ccff"
        strokeWidth="1.1"
      />

      {/* Even tinier dots (barely visible) */}
      <circle cx="280" cy="96" r="0.8" fill="#88ccff" opacity="0.6" />
      <circle cx="520" cy="92" r="0.7" fill="#99ddff" opacity="0.5" />
      <circle cx="880" cy="94" r="0.9" fill="#77bbff" opacity="0.7" />
    </g>
  );
}