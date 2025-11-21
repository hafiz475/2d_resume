import React, { useEffect, useRef, useState } from "react";
import SkySVG from "./SkySVG";
import SandLine from "./SandLine";

const SCENES = ["afternoon","sunset","night","sunrise","cloudy","raining","storm","rainbow","winter","night2"];

export default function Scene2D() {
  const [index, setIndex] = useState(0);
  const tlRef = useRef(null);

  function nextScene() {
    setIndex((i) => (i + 1) % SCENES.length);
  }

  useEffect(() => {
    const event = new CustomEvent("scene-change", { detail: { scene: SCENES[index] }});
    window.dispatchEvent(event);

    if (tlRef.current) tlRef.current.kill?.();

    if (["sunset","sunrise","raining","storm","rainbow","winter"].includes(SCENES[index])) {
      tlRef.current = { kill: () => {} }; // placeholder
      // keep automatic advance using setTimeout
      const t = setTimeout(nextScene, 5500);
      tlRef.current.kill = () => clearTimeout(t);
    } else {
      const t = setTimeout(nextScene, 6500);
      tlRef.current = { kill: () => clearTimeout(t) };
    }

    return () => { tlRef.current?.kill(); };
  }, [index]);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextScene();
      if (e.key === "ArrowLeft") setIndex(i => (i-1+SCENES.length)%SCENES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="scene-container" onClick={() => setIndex(i => (i+1) % SCENES.length)}>
      <SkySVG initialScene={SCENES[index]} />
      <SandLine />

      <div className="top-right-indicator">
        <div className="dot" />
      </div>

      <div className="hud">
        <div className="hud-inner">
          <strong>{SCENES[index].toUpperCase()}</strong>
          <div className="hint">Click anywhere — Right/Left arrows to navigate</div>
        </div>
      </div>
    </div>
  );
}
