import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  SandLine.jsx -> now SeaLine.jsx style component (keeps filename to avoid import changes)
  - three ship types: Sailboat (A), Steamship (C), Yacht (E)
  - waves, shimmer, reflections
  - scene interactions: storm increases tilt & speed, night dims sails & enables lights
  - clickable ships show a random story popup
*/

export default function SandLine() {
  const wavesRef = useRef();
  const shimmerRef = useRef();
  const shipARef = useRef(); // Sailboat
  const shipCRef = useRef(); // Steamship
  const shipERef = useRef(); // Yacht
  const overlayRef = useRef();

  // store tweens so we can update speed/tilt
  const shipTweens = useRef({});

  // random story generator
  const stories = [
    "A lone sailor once raced a storm and found a glowing bottle with a map.",
    "This steamship used to deliver spices; today it hums with old radio songs.",
    "A wealthy captain once painted the hull red; the yacht still remembers the summers.",
    "They say a small island appears here on foggy nights — but only to fishermen.",
    "Once the sail caught a strange northern light and the crew sang for three days."
  ];

  useEffect(() => {
    // create waves if empty
    if (wavesRef.current && wavesRef.current.childElementCount === 0) {
      const createWave = (y, amp = 8, speed = 6, opacity = 0.12, stroke = "rgba(255,255,255,0.12)", width=1.2) => {
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M -600 ${y} C -480 ${y - amp}, -360 ${y + amp}, -240 ${y} S -120 ${y - amp}, 0 ${y} S 120 ${y + amp}, 240 ${y} S 360 ${y - amp}, 480 ${y} S 600 ${y + amp}, 720 ${y} S 840 ${y - amp}, 960 ${y}`;
        p.setAttribute("d", d);
        p.setAttribute("stroke", stroke);
        p.setAttribute("stroke-width", width);
        p.setAttribute("fill", "none");
        p.style.opacity = opacity;
        wavesRef.current.appendChild(p);
        gsap.to(p, { x: 60, duration: speed + Math.random() * 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      };

      createWave(110, 8, 6.0, 0.22, "rgba(255,255,255,0.14)", 1.4);
      createWave(126, 6, 5.0, 0.14, "rgba(255,255,255,0.12)", 1.2);
      createWave(142, 4, 7.2, 0.10, "rgba(255,255,255,0.08)", 1.0);
    }

    // shimmer / glint
    if (shimmerRef.current) {
      gsap.set(shimmerRef.current, { x: -900, opacity: 0.9 });
      gsap.to(shimmerRef.current, { x: 1600, duration: 6.4, repeat: -1, ease: "none" });
    }

    // ship A - Sailboat (left -> right)
    if (shipARef.current) {
      shipTweens.current.A = gsap.timeline({ repeat: -1 })
        .set(shipARef.current, { x: -360, y: 100, rotation: -4, transformOrigin: "center center" })
        .to(shipARef.current, { x: 1600, duration: 26, ease: "linear" }, 0);

      gsap.to(shipARef.current, { y: "+=8", duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(shipARef.current, { rotation: "+=2.6", duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    // ship C - Steamship (right -> left)
    if (shipCRef.current) {
      shipTweens.current.C = gsap.timeline({ repeat: -1 })
        .set(shipCRef.current, { x: 1600, y: 128, rotation: 2, transformOrigin: "center center" })
        .to(shipCRef.current, { x: -700, duration: 20, ease: "linear" }, 0);

      gsap.to(shipCRef.current, { y: "-=6", duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(shipCRef.current, { rotation: "-=2.8", duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // smoke puffing (small circle scale)
      const smoke = shipCRef.current.querySelector(".smoke");
      if (smoke) {
        gsap.set(smoke, { scale: 0.6, transformOrigin: "center center", opacity: 0.9 });
        gsap.to(smoke, { scale: 1.8, opacity: 0.0, duration: 1.8, repeat: -1, ease: "power1.out", repeatDelay: 0.4 });
      }
    }

    // ship E - Yacht (faster left -> right)
    if (shipERef.current) {
      shipTweens.current.E = gsap.timeline({ repeat: -1 })
        .set(shipERef.current, { x: -100, y: 136, rotation: -1, transformOrigin: "center center" })
        .to(shipERef.current, { x: 1600, duration: 14, ease: "linear" }, 0);

      gsap.to(shipERef.current, { y: "+=6", duration: 3.0, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(shipERef.current, { rotation: "+=2", duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    // clickable overlay container
    if (!overlayRef.current) {
      const o = document.createElement("div");
      o.className = "ship-info-overlay";
      o.style.position = "fixed";
      o.style.left = "50%";
      o.style.top = "18%";
      o.style.transform = "translateX(-50%)";
      o.style.zIndex = 9999;
      o.style.pointerEvents = "auto";
      o.style.display = "none";
      o.style.minWidth = "260px";
      o.style.maxWidth = "420px";
      o.style.background = "rgba(8,12,18,0.9)";
      o.style.color = "#eaf4ff";
      o.style.padding = "14px 18px";
      o.style.borderRadius = "10px";
      o.style.boxShadow = "0 16px 30px rgba(0,0,0,0.6)";
      document.body.appendChild(o);
      overlayRef.current = o;
    }

    // click handlers for ships -> show random story
    const onClickShip = (ev) => {
      const target = ev.currentTarget;
      const type = target.getAttribute("data-ship") || "ship";
      const title = type === "A" ? "Sailboat" : type === "C" ? "Steamship" : "Yacht";
      const story = stories[Math.floor(Math.random() * stories.length)];
      const html = `<strong style="display:block;margin-bottom:6px">${title}</strong><div style="font-size:13px;opacity:0.95">${story}</div><div style="text-align:right;margin-top:10px"><button id="closeShipInfo" style="background:#cfe7ff;color:#05223a;border:none;padding:6px 8px;border-radius:6px;cursor:pointer">Close</button></div>`;
      overlayRef.current.innerHTML = html;
      overlayRef.current.style.display = "block";

      const btn = document.getElementById("closeShipInfo");
      if (btn) btn.onclick = () => { overlayRef.current.style.display = "none"; };
    };

    const a = shipARef.current;
    const c = shipCRef.current;
    const e = shipERef.current;
    if (a) a.addEventListener("click", onClickShip);
    if (c) c.addEventListener("click", onClickShip);
    if (e) e.addEventListener("click", onClickShip);

    // scene change listener: adjust ship behavior (storm, night, default)
    function onScene(e) {
      const scene = e.detail?.scene || "";
      // night: dim sails and enable tiny lights
      if (scene === "night" || scene === "night2") {
        gsap.to([a, c, e], { opacity: 0.9, duration: 0.6 }); // slightly dim overall
        // sails and windows (elements with class .light) turn on
        [a, c, e].forEach((g) => {
          if (!g) return;
          const lights = g.querySelectorAll(".light");
          lights.forEach((L) => gsap.to(L, { opacity: 1, duration: 0.6 }));
        });
        // slow down slightly
        Object.values(shipTweens.current).forEach((tl) => { if (tl && tl.timeScale) tl.timeScale(0.85); });
      } else if (scene === "storm") {
        // storm: increase tilt and speed
        Object.values(shipTweens.current).forEach((tl) => { if (tl && tl.timeScale) tl.timeScale(1.6); });
        // increase rotation amplitude by tweaking rotation tweens
        gsap.to([a, c, e], { rotation: "+=6", duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" });
      } else {
        // default/clear: normal speeds and lights off
        Object.values(shipTweens.current).forEach((tl) => { if (tl && tl.timeScale) tl.timeScale(1.0); });
        [a, c, e].forEach((g) => {
          if (!g) return;
          const lights = g.querySelectorAll(".light");
          lights.forEach((L) => gsap.to(L, { opacity: 0, duration: 0.6 }));
        });
        gsap.to([a, c, e], { rotation: 0, duration: 1.0 });
      }
    }

    window.addEventListener("scene-change", onScene);

    // cleanup
    return () => {
      window.removeEventListener("scene-change", onScene);
      if (overlayRef.current) {
        try { overlayRef.current.remove(); } catch {}
        overlayRef.current = null;
      }
      // remove click listeners
      if (a) a.removeEventListener("click", onClickShip);
      if (c) c.removeEventListener("click", onClickShip);
      if (e) e.removeEventListener("click", onClickShip);
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <svg className="sand-svg" viewBox="0 0 1400 220" preserveAspectRatio="none" pointerEvents="none">
      <defs>
        <linearGradient id="seaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5fb6ff" />
          <stop offset="50%" stopColor="#3e90d6" />
          <stop offset="100%" stopColor="#0f3b63" />
        </linearGradient>

        <linearGradient id="glintGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>

        <filter id="seaBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>

        <linearGradient id="reflexGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      {/* ocean base */}
      <rect x="0" y="0" width="1400" height="220" fill="url(#seaGrad)" />

      {/* distant islands on horizon */}
      <g id="islands" pointerEvents="none" opacity="0.95">
        <path d="M220 84 q40 -18 80 0 q36 12 72 -2 q28 -10 60 2 q30 12 58 -4 q60 -20 120 0 v28 h-390 z" fill="#123245" opacity="0.85" transform="translate(50,6) scale(0.9)" />
        <path d="M980 78 q34 -16 72 0 q40 14 80 -4 v28 h-152 z" fill="#123245" opacity="0.82" transform="translate(-20,4) scale(0.8)" />
      </g>

      {/* subtle horizon line */}
      <rect x="0" y="96" width="1400" height="2" fill="rgba(255,255,255,0.04)" />

      {/* waves */}
      <g ref={wavesRef} id="waves-layer" pointerEvents="none" />

      {/* ships group: pointerEvents will be enabled for ships */}
      <g id="ships" pointerEvents="all">
        {/* Sailboat A */}
        <g ref={shipARef} data-ship="A" style={{ cursor: "pointer" }} transform="translate(-300,100)">
          {/* reflection (flipped, faded) */}
          <g transform="translate(0,36) scale(1,-1)" opacity="0.18">
            <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#2a2f3a" />
            <path d="M59 -36 L95 -4 L59 -4 Z" fill="#fff" />
          </g>
          {/* hull */}
          <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#2a2f3a" opacity="0.95" />
          <rect x="28" y="-10" width="64" height="6" rx="2" fill="#1f2630" />
          <rect x="56" y="-38" width="3" height="28" fill="#7a5230" rx="1" />
          <path d="M59 -36 L95 -4 L59 -4 Z" fill="#fff" opacity="0.95" />
          <rect x="59" y="-40" width="18" height="4" rx="1" fill="#e85a4f" />
          {/* tiny mast light (on at night) */}
          <circle className="light" cx="59" cy="-10" r="3" fill="#ffd76b" opacity="0" />
        </g>

        {/* Steamship C */}
        <g ref={shipCRef} data-ship="C" style={{ cursor: "pointer" }} transform="translate(1600,128)">
          {/* reflection */}
          <g transform="translate(0,30) scale(1,-1)" opacity="0.14">
            <path d="M0 0 q22 10 44 0 q22 -10 44 0 l-88 0 z" fill="#263347" />
            <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" />
          </g>

          <path d="M0 0 q22 10 44 0 q22 -10 44 0 l-88 0 z" fill="#263347" opacity="0.9" />
          <rect x="18" y="-8" width="40" height="5" rx="2" fill="#1b2631" />
          {/* smokestack */}
          <rect x="10" y="-28" width="8" height="18" rx="2" fill="#333" />
          <circle className="smoke" cx="14" cy="-32" r="6" fill="rgba(200,200,200,0.7)" />
          <rect x="38" y="-28" width="3" height="20" fill="#6f4a2f" rx="1" />
          <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" opacity="0.9" />
          {/* windows - lights */}
          <g transform="translate(6,-2)">
            <rect className="light" x="4" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
            <rect className="light" x="14" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
            <rect className="light" x="24" y="0" width="6" height="3" rx="1" fill="#ffd76b" opacity="0" />
          </g>
        </g>

        {/* Yacht E */}
        <g ref={shipERef} data-ship="E" style={{ cursor: "pointer" }} transform="translate(-100,136)">
          {/* reflection */}
          <g transform="translate(0,26) scale(1,-1)" opacity="0.12">
            <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#0f2b3e" />
            <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" />
          </g>

          <path d="M0 0 q30 14 60 0 q30 -14 60 0 l-120 0 z" fill="#0f2b3e" opacity="0.95" />
          <rect x="14" y="-8" width="52" height="6" rx="2" fill="#071726" />
          <rect x="36" y="-28" width="3" height="22" fill="#444" rx="1" />
          <path d="M40 -26 L66 -6 L40 -6 Z" fill="#fff" opacity="0.95" />
          {/* small deck lights */}
          <circle className="light" cx="18" cy="-6" r="2.4" fill="#ffd76b" opacity="0" />
          <circle className="light" cx="46" cy="-6" r="2.4" fill="#ffd76b" opacity="0" />
        </g>
      </g>

      {/* shimmer / glint */}
      <g id="shimmerGroup" pointerEvents="none" filter="url(#seaBlur)">
        <rect ref={shimmerRef} x={-900} y={110} width={900} height={8} fill="url(#glintGrad)" opacity="0.95" rx="4" />
      </g>
    </svg>
  );
}
