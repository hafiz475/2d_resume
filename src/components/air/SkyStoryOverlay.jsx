// src/components/air/SkyStoryOverlay.jsx
import React, { useState, useEffect } from "react";
import { skyStories } from "./usePlanes";

let setSkyStory;  // Local setter

// Global function — now exports to window
export function showSkyStory() {
  const story = skyStories[Math.floor(Math.random() * skyStories.length)];
  console.log("🛩️ Sky Story Triggered:", story);  // Keep for debug
  if (window.setSkyStory) {  // Check window global
    window.setSkyStory({ text: story, visible: true });
  } else {
    console.error("🚨 No window.setSkyStory — overlay not ready! Is SkyStoryOverlay rendered in SkySVG?");
  }
}

export default function SkyStoryOverlay() {
  const [story, _setStory] = useState({ visible: false, text: "" });
  
  // FIXED: Set global on EVERY render (safe, idempotent)
  window.setSkyStory = _setStory;  // ← TO WINDOW — now accessible everywhere
  setSkyStory = _setStory;

  // MOUNT TEST: Show first story after 1s (remove after confirming)
  useEffect(() => {
    console.log("☁️ SkyOverlay MOUNTED! window.setSkyStory ready:", !!window.setSkyStory);
    const timer = setTimeout(() => {
      const testStory = skyStories[0];
      console.log("🧪 MOUNT TEST: Showing", testStory);
      window.setSkyStory({ text: testStory, visible: true });
    }, 1000);  // 1s delay
    return () => clearTimeout(timer);
  }, []);  // Run once on mount

  // Auto-dismiss after 4s
  useEffect(() => {
    if (story.visible) {
      const timer = setTimeout(() => {
        window.setSkyStory({ visible: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [story.visible]);

  if (!story.visible) return null;

  return (
    <foreignObject x="0" y="0" width="100%" height="100%">
      <div 
        className="sky-info-overlay"
        style={{
          position: "fixed",
          top: "20vh",
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, rgba(10,20,40,0.98), rgba(0,50,100,0.85))",
          padding: "24px 32px",
          borderRadius: "20px",
          maxWidth: "80vw",
          color: "#ddf",
          fontSize: "16px",
          fontStyle: "italic",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,50,100,0.9)",
          zIndex: 10000,
          pointerEvents: "auto",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)"
        }}
        onClick={() => {
          console.log("✨ Story dismissed by click");
          window.setSkyStory({ visible: false });
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.6 }}>{story.text}</p>
        <div style={{ textAlign: "right", marginTop: 16, fontSize: "13px", opacity: 0.8 }}>
          ✈️ Cloud whisper — click to continue the flight
        </div>
      </div>
    </foreignObject>
  );
}