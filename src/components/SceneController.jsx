import React, { useEffect, useState, useRef } from "react";
import SkySVG from "./SkySVG";
import SandLine from "./SandLine";

const SCENES = [
  "afternoon",
  "sunset",
  "night",
  "sunrise",
  "cloudy",
  "raining",
  "storm",
  "winter",
  "night2"
];

export default function SceneController() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    dispatchScene();
    // auto advance
    scheduleAutoAdvance();
    // keyboard nav
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timeoutRef.current) timeoutRef.current.kill?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function dispatchScene() {
    const scene = SCENES[index];
    window.dispatchEvent(new CustomEvent("scene-change", { detail: { scene } }));
  }

  function scheduleAutoAdvance() {
    // longer on cinematic scenes
    const cinematic = ["sunset", "sunrise", "raining", "storm", "winter"];
    const delay = cinematic.includes(SCENES[index]) ? 6.2 : 5.8;
    // use setTimeout (gsap not necessary here)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIndex((i) => (i + 1) % SCENES.length), delay * 1000);
  }

  function next() {
    setIndex((i) => (i + 1) % SCENES.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + SCENES.length) % SCENES.length);
  }

  return (
    <div className="scene-container" onClick={next}>
      <SkySVG initialScene={SCENES[index]} />
      <SandLine />

      <div className="top-right-indicator">
        <div className="dot" />
      </div>

      <div className="hud">
        <div className="hud-inner">
          <strong>{SCENES[index].toUpperCase()}</strong>
          <div className="hint">Click anywhere — Right/Left arrows to navigate</div>
          <div style={{ marginTop: 8 }}>
            <a href="/mnt/data/2D_resume.zip" style={{ color: "#cfe7ff", textDecoration: "underline" }} download>
              Download uploaded ZIP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
