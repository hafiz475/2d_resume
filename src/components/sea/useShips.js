// src/components/sea/useShips.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const stories = [
  "A lone sailor once raced a storm and found a glowing bottle with a map.",
  "This steamship used to deliver spices; today it hums with old radio songs.",
  "A wealthy captain once painted the hull red; the yacht still remembers the summers.",
  "They say a small island appears here on foggy nights — but only to fishermen.",
  "Once the sail caught a strange northern light and the crew sang for three days."
];

export function useShipAnimation(ref, type) {
  const tweens = useRef({});

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    // Common floating bob
    gsap.to(el, { y: "+=8", duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(el, { rotation: type === "A" ? "+=2.6" : "-=2.8", duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // Horizontal movement
    if (type === "A" || type === "E") {
      tweens.current.main = gsap.timeline({ repeat: -1 })
        .set(el, { x: -360 })
        .to(el, { x: 1600, duration: type === "E" ? 16 : 26, ease: "linear" });
    } else if (type === "C") {
      tweens.current.main = gsap.timeline({ repeat: -1 })
        .set(el, { x: 1600 })
        .to(el, { x: -700, duration: 20, ease: "linear" });

      const smoke = el.querySelector(".smoke");
      if (smoke) {
        gsap.to(smoke, { scale: 1.8, opacity: 0, duration: 1.8, repeat: -1, ease: "power1.out", repeatDelay: 0.4 });
      }
    }

    // Night lights
    const lights = el.querySelectorAll(".light");
    const turnOnLights = () => gsap.to(lights, { opacity: 1, duration: 1 });
    const turnOffLights = () => gsap.to(lights, { opacity: 0, duration: 1 });

    const onScene = (e) => {
      const scene = e.detail?.scene;
      if (scene?.includes("night") || scene === "storm") turnOnLights();
      else turnOffLights();
    };

    window.addEventListener("scene-change", onScene);
    return () => window.removeEventListener("scene-change", onScene);
  }, [ref, type]);
}