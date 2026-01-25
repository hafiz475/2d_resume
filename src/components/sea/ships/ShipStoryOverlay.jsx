// src/components/sea/ships/ShipStoryOverlay.jsx
import React, { useState } from "react";
import { stories } from "../useShips";

let setStory;
export function showStory() {
  const story = stories[Math.floor(Math.random() * stories.length)];
  setStory({ text: story, visible: true });
}

export default function ShipStoryOverlay() {
  const [story, _setStory] = useState({ visible: false, text: "" });
  setStory = _setStory;

  if (!story.visible) return null;

  return (
    <foreignObject x="0" y="0" width="100%" height="100%">
      <div className="ship-info-overlay" style={{
        position: "absolute",
        top: "18%", left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(6,12,22,0.92)",
        padding: "18px 24px",
        borderRadius: "12px",
        maxWidth: "92vw",
        color: "#cff",
        fontSize: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        zIndex: 100,
        pointerEvents: "none"
      }}>
        <p style={{ margin: 0, lineHeight: 1.5 }}>{story.text}</p>
        <div style={{ textAlign: "right", marginTop: 12, fontSize: "12px", opacity: 0.7 }}>
          Click anywhere to close
        </div>
      </div>
    </foreignObject>
  );
}