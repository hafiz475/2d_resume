// src/canvas/Scene2D.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SkySVG from "../components/SkySVG";
import SeaScene from "../components/sea/SeaScene";
import SkyStoryOverlay from "../components/air/SkyStoryOverlay";

const SCENES = [
  "afternoon",
  "sunset",
  "night",
  "sunrise",
  "cloudy",
  "raining",
  "storm",
  "rainbow",
  "winter",
  "night2",
];

export default function Scene2D() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(0);
  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const isTransitioning = useRef(false);

  const transitionTo = (direction) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const newIdx =
      direction === "next"
        ? (currentIdx + 1) % SCENES.length
        : (currentIdx - 1 + SCENES.length) % SCENES.length;

    setNextIdx(newIdx);

    gsap.fromTo(
      nextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentIdx(newIdx);
          setNextIdx(newIdx);
          isTransitioning.current = false;
        },
      }
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("scene-change", { detail: { scene: SCENES[newIdx] } })
      );
    }, 400);
  };

  const goNext = () => transitionTo("next");
  const goPrev = () => transitionTo("prev");

  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning.current || Math.abs(e.deltaY) < 40) return;
      e.deltaY > 0 ? goNext() : goPrev();
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIdx]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("scene-change", { detail: { scene: SCENES[currentIdx] } })
    );
  }, []);

  return (
    <div
      className="scene-container"
      style={{ position: "relative", cursor: "ns-resize", overflow: "hidden" }}
    >
      {/* CURRENT SCENE — SKY FIRST, SEA SECOND */}
      <div ref={currentRef} style={{ position: "absolute", inset: 0 }}>
        <SkySVG initialScene={SCENES[currentIdx]} />
        <SkyStoryOverlay />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <SeaScene />
        </div>
      </div>

      {/* NEXT SCENE — SAME ORDER */}
      {currentIdx !== nextIdx && (
        <div
          ref={nextRef}
          style={{ position: "absolute", inset: 0, opacity: 0 }}
        >
          <SkySVG initialScene={SCENES[nextIdx]} />
          <div
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <SeaScene />
          </div>
        </div>
      )}

      {/* HUD — nice and small again */}
      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 20,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(6,8,12,0.7)",
            padding: "10px 16px",
            borderRadius: "10px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          }}
        >
          <strong style={{ fontSize: "16px", display: "block" }}>
            {SCENES[currentIdx].toUpperCase()}
          </strong>
          <div style={{ fontSize: "13px", opacity: 0.9, marginTop: "4px" }}>
            Scroll slowly — cinematic time travel ✨
          </div>
        </div>
      </div>
    </div>
  );
}
