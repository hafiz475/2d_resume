// src/components/sea/useShips.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * useShipAnimation
 * Handles ship movement + depth + reflection.
 *
 * ref            → main ship <g>
 * reflectionRef  → reflection <g>
 * type           → "A", "E" (left→right), "C" (right→left)
 */
export function useShipAnimation(ref, type, opts = {}) {
  const tweens = useRef({});

  const {
    depth = 0.5,                // 0.2 = FAR, 0.5 = MID, 0.85 = NEAR
    seedX = Math.random(),
    containerWidth = 1400,
    horizonY = 110,
    reflectionRef = null
  } = opts;

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const refl = reflectionRef?.current || null;

    // ------------------------------
    // DEPTH → VISUAL PROPERTIES
    // ------------------------------
    let scale, yBase, opacity, blurPx, travelDuration;

    if (depth < 0.35) {
      // FAR
      scale = 0.30;
      yBase = horizonY - 20;
      opacity = 0.55;
      blurPx = 1.2;
      travelDuration = 70;
    } else if (depth < 0.70) {
      // MID
      scale = 0.55;
      yBase = horizonY;
      opacity = 0.85;
      blurPx = 0.5;
      travelDuration = 40;
    } else {
      // NEAR
      scale = 0.85;
      yBase = horizonY + 25;
      opacity = 1.0;
      blurPx = 0;
      travelDuration = 22;
    }

    // ------------------------------
    // INITIAL PLACEMENT
    // ------------------------------
    const initialX = (-0.2 + seedX * 1.2) * containerWidth;

    gsap.set(el, {
      transformOrigin: "center",
      x: initialX,
      y: yBase,
      scale,
      opacity,
      filter: `blur(${blurPx}px)`
    });

    // REFLECTION placement
    if (refl) {
      gsap.set(refl, {
        x: initialX,
        y: yBase + 15, // reflection slightly below ship
        scale,
        filter: "blur(4px)",
        transformOrigin: "center"
      });
    }

    // ------------------------------
    // COMPUTE PATH BOUNDS
    // ------------------------------
    const computePositions = () => {
      let w = 200;
      try {
        const box = el.getBBox();
        w = box.width || 200;
      } catch {}

      const pad = 140;
      return {
        left: -w - pad,
        right: containerWidth + w + pad
      };
    };

    // ------------------------------
    // START MOVEMENT
    // ------------------------------
    const startMovement = () => {
      const { left, right } = computePositions();

      if (tweens.current.main) tweens.current.main.kill();

      const move = (fromX, toX) => {
        return gsap.timeline({ repeat: -1 })
          .set(el, { x: fromX })
          .to(el, {
            x: toX,
            duration: travelDuration,
            ease: "none",
            onUpdate: () => {
              if (refl) {
                const shipX = gsap.getProperty(el, "x");
                gsap.set(refl, { x: shipX });
              }
            }
          });
      };

      // LEFT ➜ RIGHT
      if (type === "A" || type === "E") {
        tweens.current.main = move(left, right);
      }
      // RIGHT ➜ LEFT
      else if (type === "C") {
        tweens.current.main = move(right, left);
      }
    };

    startMovement();

    const onResize = () => startMovement();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (tweens.current.main) tweens.current.main.kill();
    };
  }, [ref, type, depth, seedX, containerWidth, horizonY, reflectionRef]);
}
