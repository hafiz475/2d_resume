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

    // --- Floating / bobbing + rotation (mirrors ship style) ---
    gsap.to(el, { y: "+=8", duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(el, { rotation: type === "A" ? "+=1.2" : "-=1.4", duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    // extra small bob for visual richness (ship had a second smaller bob too)
    gsap.to(el, { y: "+=4", duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // --- Helper: compute offscreen start/end based on element bbox + window width ---
    const computePositions = () => {
      let elWidth = 200;
      try {
        const bbox = el.getBBox ? el.getBBox() : el.getBoundingClientRect();
        elWidth = bbox.width || (bbox.right - bbox.left) || el.getBoundingClientRect().width || 200;
      } catch (err) {
        elWidth = el.getBoundingClientRect ? el.getBoundingClientRect().width : 200;
      }
      const pad = 120; // offscreen padding
      return {
        startLeft: -elWidth - pad,
        endRight: window.innerWidth + elWidth + pad
      };
    };

    // --- Create main horizontal glide (mirrors ship durations + linear ease) ---
    const createMainTween = () => {
      if (tweens.current.main) {
        try { tweens.current.main.kill(); } catch (e) {}
      }

      const { startLeft, endRight } = computePositions();
      // durations matched to ship: E -> 16, A -> 26, C -> 20 (C is right->left)
      const dur = type === "E" ? 16 : type === "A" ? 26 : 20;

      if (type === "A" || type === "E") {
        tweens.current.main = gsap.timeline({ repeat: -1 })
          .set(el, { x: startLeft })
          .to(el, { x: endRight, duration: dur, ease: "linear" });
      } else if (type === "C") {
        // travel right -> left
        const startRight = endRight;
        const endLeft = startLeft;
        tweens.current.main = gsap.timeline({ repeat: -1 })
          .set(el, { x: startRight })
          .to(el, { x: endLeft, duration: dur, ease: "linear" });
      }
    };

    // initial create and resize handler
    createMainTween();
    const onResize = () => createMainTween();
    window.addEventListener("resize", onResize);

    // --- Optional smoke/lights logic (mirror ship behavior) ---
    if (type === "C") {
      const smoke = el.querySelector(".smoke");
      if (smoke) {
        gsap.to(smoke, { scale: 1.8, opacity: 0, duration: 1.8, repeat: -1, ease: "power1.out", repeatDelay: 0.4 });
      }
    }

    const lights = el.querySelectorAll?.(".light") ?? [];
    const turnOnLights = () => gsap.to(lights, { opacity: 1, duration: 1 });
    const turnOffLights = () => gsap.to(lights, { opacity: 0, duration: 1 });

    const onScene = (e) => {
      const scene = e.detail?.scene;
      if (scene?.includes("night") || scene === "storm") turnOnLights();
      else turnOffLights();
    };

    window.addEventListener("scene-change", onScene);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scene-change", onScene);
      try { if (tweens.current.main) tweens.current.main.kill(); } catch (e) {}
    };
  }, [ref, type]);
}

export function showSkyStory() {
  const story = skyStories[Math.floor(Math.random() * skyStories.length)];
  console.log("🛩️ Sky Story Triggered:", story);
  if (window.setSkyStory) window.setSkyStory({ text: story, visible: true });
  else console.error("🚨 window.setSkyStory missing — overlay not mounted!");
}
