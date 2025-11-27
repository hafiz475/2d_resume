// src/components/air/usePlanes.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const skyStories = [
  "A pilot once chased a rainbow and found a lost constellation.",
  "This airliner carries whispers from one horizon to another.",
  "On clear nights, the contrails draw maps to forgotten stars.",
  "A lone flyer spotted a flock of geese heading south — they waved.",
  "The engine hums old jazz; passengers dream of cities below."
];

export function usePlaneAnimation(ref, type) {
  const tweens = useRef({});

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    // Gentle flight bob (less than ships)
    gsap.to(el, { y: "+=3", duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(el, { rotation: type === "A" ? "+=0.8" : "-=1.0", duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // Horizontal glide (smoother for sky)
    if (type === "A" || type === "E") {
      tweens.current.main = gsap.timeline({ repeat: -1 })
        .set(el, { x: -360 })
        .to(el, { x: 1600, duration: type === "E" ? 18 : 28, ease: "power1.inOut" });  // Slight curve ease
    } else if (type === "C") {
      tweens.current.main = gsap.timeline({ repeat: -1 })
        .set(el, { x: 1600 })
        .to(el, { x: -700, duration: 22, ease: "power1.inOut" });
    }

    // Sky lights (stars? headlight glow)
    const lights = el.querySelectorAll(".light");
    const turnOnLights = () => gsap.to(lights, { opacity: 1, duration: 1 });
    const turnOffLights = () => gsap.to(lights, { opacity: 0, duration: 1 });

    const onScene = (e) => {
      const scene = e.detail?.scene;
      if (scene?.includes("night") || scene === "sunset") turnOnLights();  // Planes glow at dusk/night
      else turnOffLights();
    };

    window.addEventListener("scene-change", onScene);
    return () => window.removeEventListener("scene-change", onScene);
  }, [ref, type]);
}

export function showSkyStory() {
  const story = skyStories[Math.floor(Math.random() * skyStories.length)];
  console.log("🛩️ Sky Story Triggered:", story);
  if (window.setSkyStory) {  // ← Window check
    window.setSkyStory({ text: story, visible: true });
  } else {
    console.error("🚨 window.setSkyStory missing — overlay not mounted!");
  }
}