import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ------------------------------------------------------
   FINAL SkySVG.jsx (Part 1/3)
   - Cloud layers
   - Sun & moon
   - Haze filter setup
   - Water reflection gradient
   ------------------------------------------------------ */

const WIDTH = 1400;
const HEIGHT = 720;

/* ---------- Cloud Component ---------- */
function Cloud({ x = 0, y = 0, scale = 1 }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y})`} className="cloud">
      <ellipse rx={68 * s} ry={22 * s} fill="#fff" opacity="0.95" />
      <ellipse
        rx={46 * s}
        ry={20 * s}
        cx={38 * s}
        cy={-10 * s}
        fill="#fff"
        opacity="0.9"
      />
      <ellipse
        rx={44 * s}
        ry={18 * s}
        cx={-36 * s}
        cy={-8 * s}
        fill="#fff"
        opacity="0.9"
      />
    </g>
  );
}

export default function SkySVG({ initialScene = "afternoon" }) {
  /* ---------- Refs ---------- */
  const skyRef = useRef();
  const sunRef = useRef();
  const moonRef = useRef();
  const glowRef = useRef();
  const raysRef = useRef();
  const gradeRef = useRef();

  const hazeFilterRef = useRef();
  const hazeGroupRef = useRef();

  const L1 = useRef();
  const L2 = useRef();
  const L3 = useRef();
  const L4 = useRef();

  const fogRef = useRef();
  const starsRef = useRef();
  const birdsRef = useRef();
  const rainRef = useRef();
  const splashRef = useRef();
  const snowRef = useRef();
  const lightningRef = useRef();

  /* Gust scheduler */
  const gustTimerRef = useRef(null);

  /* ---------- Mount Setup ---------- */
  useEffect(() => {
    initRain();
    initSnow();
    initStars();
    initLightning();
    initFog();
    initBirds();

    function onScene(e) {
      switchScene(e.detail.scene);
    }

    window.addEventListener("scene-change", onScene);
    switchScene(initialScene);

    return () => {
      window.removeEventListener("scene-change", onScene);
      gsap.killTweensOf("*");
      if (gustTimerRef.current) gustTimerRef.current.kill?.();
    };
  }, []);

  /* ------------------------------------------------------
       INITIALIZERS
  ------------------------------------------------------ */

  function initRain() {
    if (!rainRef.current || rainRef.current.childElementCount > 0) return;
    for (let i = 0; i < 90; i++) {
      const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
      d.setAttribute("x1", Math.random() * WIDTH);
      d.setAttribute("y1", Math.random() * -HEIGHT);
      d.setAttribute("x2", Math.random() * WIDTH);
      d.setAttribute("y2", Math.random() * -HEIGHT + 12);
      d.setAttribute("stroke", "rgba(200,220,255,0.65)");
      d.setAttribute("stroke-width", "1.2");
      d.setAttribute("stroke-linecap", "round");
      d.style.opacity = 0;
      rainRef.current.appendChild(d);
    }
  }

  function initSnow() {
    if (!snowRef.current || snowRef.current.childElementCount > 0) return;
    for (let i = 0; i < 60; i++) {
      const f = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      f.setAttribute("cx", Math.random() * WIDTH);
      f.setAttribute("cy", Math.random() * -HEIGHT);
      f.setAttribute("r", 1 + Math.random() * 2.3);
      f.setAttribute("fill", "white");
      f.style.opacity = 0;
      snowRef.current.appendChild(f);
    }
  }

  function initStars() {
    if (!starsRef.current || starsRef.current.childElementCount > 0) return;
    for (let i = 0; i < 140; i++) {
      const s = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      s.setAttribute("cx", Math.random() * WIDTH);
      s.setAttribute("cy", Math.random() * HEIGHT * 0.55);
      s.setAttribute("r", Math.random() * 1.4);
      s.setAttribute("fill", "white");
      s.style.opacity = 0;
      starsRef.current.appendChild(s);
    }
  }

  function initLightning() {
    if (!lightningRef.current || lightningRef.current.childElementCount > 0)
      return;
    for (let i = 0; i < 5; i++) {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("stroke", "rgba(255,255,255,0.95)");
      p.setAttribute("stroke-width", "2");
      p.setAttribute("fill", "none");
      p.style.opacity = 0;
      lightningRef.current.appendChild(p);
    }
  }

  function initFog() {
    if (!fogRef.current || fogRef.current.childElementCount > 0) return;
    for (let i = 0; i < 6; i++) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const h = 40 + i * 6 + Math.random() * 24;
      const y = HEIGHT - 80 + i * 6;

      const d = `M0 ${y}
        C ${WIDTH * 0.25} ${y - h}, ${WIDTH * 0.75} ${y - h}, ${WIDTH} ${y}
        L ${WIDTH} ${HEIGHT}
        L 0 ${HEIGHT}
        Z`;

      p.setAttribute("d", d);
      p.setAttribute("fill", "rgba(240,245,255,0.05)");
      p.style.opacity = 0;
      g.appendChild(p);
      fogRef.current.appendChild(g);
    }
  }

  function initBirds() {
    if (!birdsRef.current || birdsRef.current.childElementCount > 0) return;

    const birdPath = "M0,6 Q8,0 16,6";
    for (let i = 0; i < 8; i++) {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", birdPath);
      p.setAttribute("stroke", "rgba(24,18,12,0.95)");
      p.setAttribute("stroke-width", "2");
      p.setAttribute("fill", "none");
      p.style.opacity = 0;

      const startX = -200 - i * 120;
      const startY = 80 + Math.random() * 140;

      p.setAttribute(
        "transform",
        `translate(${startX},${startY}) scale(${0.9 + Math.random() * 0.7})`
      );
      birdsRef.current.appendChild(p);
    }
  }

  /* ------------------------------------------------------
       CLOUD MOVEMENT HELPERS
  ------------------------------------------------------ */

  function floatLayer(layer, dist = 1400, dur = 10) {
    if (!layer) return;

    gsap.killTweensOf(layer);

    gsap.to(layer, {
      x: `+=${dist}`,
      duration: dur,
      ease: "none",
      repeat: -1,
    });

    gsap.to(layer, {
      y: "+=25",
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.to(layer, { opacity: 1, duration: 1 });
  }

  function stopLayer(layer) {
    if (!layer) return;
    gsap.killTweensOf(layer);
    gsap.to(layer, { opacity: 0, duration: 0.8 });
  }

  // Always sync rays with sun — safe version
  // Sync rays only when SVG is fully mounted
  function syncRaysToSun() {
    const sun = sunRef.current;
    const rays = raysRef.current;
    if (!sun || !rays) return;

    const cx = parseFloat(sun.getAttribute("cx"));
    const cy = parseFloat(sun.getAttribute("cy"));
    if (!cx || !cy) return;

    // Move rays group to sun center
    gsap.set(rays, { x: cx, y: cy });
  }

  /* ------------------------------------------------------
      RENDER — SVG Structure
  ------------------------------------------------------ */
  function switchScene(scene) {
    const tl = gsap.timeline({
      defaults: { duration: 1.4, ease: "power2.out" },
    });

    /* Reset */
    tl.to(
      [
        sunRef.current,
        moonRef.current,
        glowRef.current,
        raysRef.current,
        gradeRef.current,
        starsRef.current,
        rainRef.current,
        snowRef.current,
        lightningRef.current,
        fogRef.current,
      ],
      { opacity: 0 },
      0
    );

    // Reset sky
    tl.to(
      skyRef.current,
      { fill: "#8ec5ff" }, // default sky
      0
    );

    // Stop cloud float
    [L1.current, L2.current, L3.current, L4.current].forEach(stopLayer);

    /* ------------------------------
        SCENE LOGIC
  -------------------------------*/

    switch (scene) {
      /* ------------------ AFTERNOON ------------------ */
      case "afternoon":
        tl.to(
          sunRef.current,
          { opacity: 1, y: HEIGHT * 0.22, onUpdate: syncRaysToSun },
          0
        );
        floatLayer(L1.current, 140, 36);
        floatLayer(L2.current, 200, 48);
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ SUNSET ------------------ */
      case "sunset":
        tl.to(skyRef.current, { fill: "#ffb07a" }, 0);
        tl.to(gradeRef.current, { opacity: 0.75 }, 0);

        tl.to(
          sunRef.current,
          { opacity: 1, y: HEIGHT * 0.28, onUpdate: syncRaysToSun },
          0
        );

        tl.to(glowRef.current, { opacity: 1 }, 0.2);
        tl.to(raysRef.current, { opacity: 0.3 }, 0.2);

        floatLayer(L1.current, 120, 40);
        floatLayer(L2.current, 150, 44);
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ NIGHT ------------------ */
      case "night":
        tl.to(skyRef.current, { fill: "#0d152b" }, 0);
        tl.to(starsRef.current, { opacity: 1 }, 0.5);
        tl.to(moonRef.current, { opacity: 1, y: HEIGHT * 0.24 }, 0.3);

        floatLayer(L3.current, 60, 70);
        floatLayer(L4.current, 80, 60);
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ SUNRISE ------------------ */
      case "sunrise":
        tl.to(skyRef.current, { fill: "#ffcf91" }, 0);
        tl.to(gradeRef.current, { opacity: 0.45 }, 0);

        tl.fromTo(
          sunRef.current,
          { opacity: 1, y: HEIGHT * 0.32 },
          { opacity: 1, y: HEIGHT * 0.2, duration: 2, onUpdate: syncRaysToSun },
          0
        );

        tl.to(glowRef.current, { opacity: 1 }, 0.3);
        tl.to(raysRef.current, { opacity: 0.28 }, 0.4);

        floatLayer(L1.current, 160, 48);
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ CLOUDY ------------------ */
      case "cloudy":
        tl.to(skyRef.current, { fill: "#c6d2e0" }, 0);

        [L1.current, L2.current, L3.current].forEach((L) =>
          floatLayer(L, 50, 50)
        );

        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ RAINING ------------------ */
      case "raining":
        tl.to(skyRef.current, { fill: "#627d9b" }, 0);
        tl.to(rainRef.current, { opacity: 1 }, 0.4);
        tl.to(fogRef.current, { opacity: 1 }, 0.6);

        floatLayer(L4.current, 40, 50);
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ STORM ------------------ */
      case "storm":
        tl.to(skyRef.current, { fill: "#3a4a63" }, 0);
        tl.to(rainRef.current, { opacity: 1 }, 0.3);
        tl.to(lightningRef.current, { opacity: 1 }, 0.1);
        tl.to(fogRef.current, { opacity: 0.7 }, 0.5);

        floatLayer(L4.current, 20, 30);

        // lightning flashes
        gsap.fromTo(
          lightningRef.current.children[0],
          { opacity: 1 },
          { opacity: 0, duration: 0.15, repeat: -1, repeatDelay: 1.8 }
        );
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ WINTER ------------------ */
      case "winter":
        tl.to(skyRef.current, { fill: "#bcd6f6" }, 0);
        tl.to(snowRef.current, { opacity: 1 }, 0.3);
        tl.to(fogRef.current, { opacity: 0.4 }, 0.3);

        floatLayer(L2.current, 70, 60);
        tl.add(() => syncRaysToSun());

        break;

      /* ------------------ NIGHT2 ------------------ */
      case "night2":
        tl.to(skyRef.current, { fill: "#08101e" }, 0);
        tl.to(starsRef.current, { opacity: 1 }, 0.3);
        tl.to(moonRef.current, { opacity: 1, y: HEIGHT * 0.18 }, 0.2);

        floatLayer(L3.current, 40, 70);
        tl.add(() => syncRaysToSun());

        break;

      default:
        break;
    }
  }

  return (
    <svg
      className="sky-svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#ffd89b" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ff9a76" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ff9a76" stopOpacity="0" />
        </radialGradient>

        {/* Rays */}
        <linearGradient id="rayGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,230,180,0.9)" />
          <stop offset="100%" stopColor="rgba(255,230,180,0)" />
        </linearGradient>

        {/* Color grade */}
        <linearGradient id="gradeGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffb57d" />
          <stop offset="100%" stopColor="#6fc2ff" />
        </linearGradient>

        {/* Haze filter */}
        <filter id="hazeFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={hazeFilterRef}
            type="fractalNoise"
            baseFrequency="0.0005 0.0005"
            numOctaves="1"
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Water reflection */}
        <linearGradient id="waterReflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Background sky */}
      <rect
        ref={skyRef}
        x="0"
        y="0"
        width={WIDTH}
        height={HEIGHT}
        fill="#8ec5ff"
      />

      {/* Sunset color grade */}
      <rect
        ref={gradeRef}
        x="0"
        y="0"
        width={WIDTH}
        height={HEIGHT}
        fill="url(#gradeGrad)"
        style={{ mixBlendMode: "overlay", opacity: 0 }}
      />

      {/* Sun, glow, rays */}
      <g id="sun-moon">
        <circle
          ref={sunRef}
          cx={WIDTH * 0.75}
          cy={HEIGHT * 0.22}
          r="44"
          fill="#ffd36b"
          opacity={1}
        />
        <circle
          ref={glowRef}
          cx={WIDTH * 0.75}
          cy={HEIGHT * 0.22}
          r="180"
          fill="url(#sunGlow)"
          opacity={0}
          pointerEvents="none"
        />

        {/* Rays */}
        <g
          ref={raysRef}
          opacity={0}
          transform={`translate(${WIDTH * 0.75}, ${HEIGHT * 0.22})`}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={-4}
              y={-300}
              width="8"
              height="300"
              rx="4"
              fill="url(#rayGrad)"
              opacity={0.26 - i * 0.015}
              transform={`rotate(${i * 15})`}
            />
          ))}
        </g>

        {/* Moon */}
        <circle
          ref={moonRef}
          cx={WIDTH * 0.22}
          cy={HEIGHT + 200}
          r="28"
          fill="#e6f0ff"
          opacity={0}
        />
      </g>

      {/* Cloud layers */}
      <g ref={L1} className="cloud-layer" style={{ opacity: 0 }}>
        <Cloud x={60} y={60} scale={0.9} />
        <Cloud x={460} y={40} scale={1.0} />
        <Cloud x={920} y={110} scale={0.8} />
      </g>

      <g ref={L2} className="cloud-layer" style={{ opacity: 0 }}>
        <Cloud x={-60} y={120} scale={1.1} />
        <Cloud x={340} y={80} scale={1.0} />
        <Cloud x={700} y={140} scale={1.2} />
      </g>

      <g ref={L3} className="cloud-layer" style={{ opacity: 0 }}>
        <Cloud x={-180} y={40} scale={0.8} />
        <Cloud x={260} y={20} scale={1.0} />
        <Cloud x={660} y={60} scale={0.9} />
      </g>

      <g ref={L4} className="cloud-layer" style={{ opacity: 0 }}>
        <Cloud x={-260} y={160} scale={1.4} />
        <Cloud x={140} y={170} scale={1.2} />
        <Cloud x={580} y={150} scale={1.5} />
      </g>

      <g
        ref={hazeGroupRef}
        filter="url(#hazeFilter)"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <g ref={fogRef} />
      </g>

      <g ref={birdsRef} pointerEvents="none" />
      <g ref={rainRef} id="rain-layer" />
      <g ref={splashRef} id="splash-layer" />
      <g ref={snowRef} id="snow-layer" />
      <g ref={starsRef} id="stars-layer" />
      <g ref={lightningRef} id="lightning-layer" />
    </svg>
  );
}
