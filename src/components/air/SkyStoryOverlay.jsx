// src/components/air/SkyStoryOverlay.jsx
import React, { useState, useEffect } from "react";
import { skyStories } from "./usePlanes";

let setSkyStory;

export function showSkyStory() {
  const story = skyStories[Math.floor(Math.random() * skyStories.length)];
  console.log("🛩️ Sky Story Triggered:", story);
  if (window.setSkyStory) {
    window.setSkyStory({ text: story, visible: true });
  } else {
    console.error("🚨 window.setSkyStory missing — overlay not mounted!");
  }
}

export default function SkyStoryOverlay() {
  const [story, _setStory] = useState({ visible: false, text: "" });
  window.setSkyStory = _setStory;  // Global on window
  setSkyStory = _setStory;

  // Optional: Remove mount test now that it's working
  useEffect(() => {
    console.log("☁️ SkyOverlay MOUNTED! Ready for stories.");
  }, []);

  if (!story.visible) return null;

  return (
    <foreignObject x="0" y="0" width="100%" height="100%">
      <div 
        className="sky-info-overlay"
        style={{
          position: "fixed",  // Full viewport takeover
          top: "50%",         // Center vertically for drama
          left: "50%",
          transform: "translate(-50%, -50%)",  // Perfect center
          background: "linear-gradient(135deg, rgba(10,20,40,0.98), rgba(0,50,100,0.85))",
          padding: "28px 36px",  // Roomier
          borderRadius: "24px",
          maxWidth: "75vw",
          maxHeight: "60vh",  // Don't overwhelm
          color: "#ddf",
          fontSize: "17px",  // Slightly larger
          fontStyle: "italic",
          textAlign: "center",
          boxShadow: "0 25px 70px rgba(0,50,100,0.95), 0 0 0 1px rgba(255,255,255,0.1)",  // Epic glow
          zIndex: 10001,     // ← FIXED: Higher than everything (sea=100, HUD=50)
          pointerEvents: "auto",
          backdropFilter: "blur(20px)",  // Dreamy cloud blur
          border: "1px solid rgba(255,255,255,0.2)",
          opacity: 1,        // Force visible
          animation: "fadeInSky 0.4s ease-out"  // Smooth entry
        }}
        onClick={() => {
          console.log("✨ Story dismissed by click");
          window.setSkyStory({ visible: false });
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.7 }}>{story.text}</p>
        <div style={{ textAlign: "right", marginTop: 18, fontSize: "14px", opacity: 0.8 }}>
          ✈️ Hafiz's sky note — click to chase the horizon
        </div>
      </div>
    </foreignObject>
  );
}