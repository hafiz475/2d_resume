// src/canvas/Scene2D.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SkySVG from "../components/SkySVG";
import SeaScene from "../components/sea/SeaScene";

const SCENES = ["afternoon","sunset","night","sunrise","cloudy","raining","storm","rainbow","winter","night2"];

export default function Scene2D() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(0);
  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const isTransitioning = useRef(false);

  const transitionTo = (direction) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const newIdx = direction === "next"
      ? (currentIdx + 1) % SCENES.length
      : (currentIdx - 1 + SCENES.length) % SCENES.length;

    setNextIdx(newIdx);

    // Real cinematic cross-fade
    gsap.fromTo(nextRef.current, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentIdx(newIdx);
          setNextIdx(newIdx);
          isTransitioning.current = false;
        }
      }
    );

    // Dispatch new scene during fade (lights turn on perfectly)
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("scene-change", {
        detail: { scene: SCENES[newIdx] }
      }));
    }, 300);
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

  // Initial scene
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("scene-change", {
      detail: { scene: SCENES[currentIdx] }
    }));
  }, []);

  return (
    <div className="scene-container" style={{ position: "relative", cursor: "ns-resize" }}>
      {/* CURRENT SCENE (always visible) */}
      <div 
        ref={currentRef}
        style={{ 
          position: "absolute", 
          inset: 0, 
          opacity: currentIdx === nextIdx ? 1 : 1  // stays solid
        }}
      >
        <SkySVG initialScene={SCENES[currentIdx]} />
        <SeaScene />
      </div>

      {/* NEXT SCENE (fades in on top) */}
      {currentIdx !== nextIdx && (
        <div 
          ref={nextRef}
          style={{ 
            position: "absolute", 
            inset: 0, 
            opacity: 0 
          }}
        >
          <SkySVG initialScene={SCENES[nextIdx]} />
          <SeaScene />
        </div>
      )}

      <div className="hud">
        <div className="hud-inner">
          <strong>{SCENES[currentIdx].toUpperCase()}</strong>
          <div className="hint">Scroll = pure cinematic time travel ✨</div>
        </div>
      </div>
    </div>
  );
}