import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SandLine() {
  const footprintsRef = useRef();
  const shimmerRef = useRef();
  const wavesRef = useRef();

  useEffect(() => {
    const container = footprintsRef.current;
    if (container && container.childElementCount === 0) {
      const startX = 160;
      for (let i = 0; i < 8; i++) {
        const fx = startX + i * 88 + (Math.random() - 0.5) * 12;
        const fy = 120 + (Math.random() - 0.5) * 8;
        const e = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "ellipse"
        );
        e.setAttribute("cx", fx);
        e.setAttribute("cy", fy);
        e.setAttribute("rx", 4);
        e.setAttribute("ry", 6);
        e.setAttribute(
          "transform",
          `rotate(${(Math.random() - 0.5) * 20} ${fx} ${fy})`
        );
        e.setAttribute("fill", "rgba(30,20,10,0.95)");
        e.style.opacity = 0;
        container.appendChild(e);
      }
    }

    if (shimmerRef.current) {
      gsap.set(shimmerRef.current, { x: -600 });
      gsap.to(shimmerRef.current, {
        x: 1600,
        duration: 8.2,
        repeat: -1,
        ease: "none",
      });
    }

    if (wavesRef.current && wavesRef.current.childElementCount === 0) {
      const createWave = (y, amp = 6, speed = 6, opacity = 0.12) => {
        const p = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        const d = `M -400 ${y} C -320 ${y - amp}, -240 ${
          y + amp
        }, -160 ${y} S -40 ${y - amp}, 40 ${y} S 120 ${
          y + amp
        }, 200 ${y} S 320 ${y - amp}, 400 ${y} S 520 ${
          y + amp
        }, 600 ${y} S 720 ${y - amp}, 800 ${y} S 920 ${y + amp}, 1000 ${y}`;
        p.setAttribute("d", d);
        p.setAttribute("stroke", "rgba(255,255,255," + opacity + ")");
        p.setAttribute("stroke-width", "1.1");
        p.setAttribute("fill", "none");
        p.style.opacity = 1;
        wavesRef.current.appendChild(p);
        gsap.to(p, {
          x: 40,
          duration: speed + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      };
      createWave(56, 4, 6, 0.12);
      createWave(64, 3, 5.4, 0.1);
      createWave(72, 2.5, 7.2, 0.09);
    }

    function onFoot(e) {
      const show = !!e.detail.show;
      const nodes = container.querySelectorAll("ellipse");
      gsap.killTweensOf(nodes);
      if (show) {
        nodes.forEach((n, i) => {
          gsap.to(n, {
            opacity: 1,
            duration: 0.45,
            delay: i * 0.12,
            ease: "power2.out",
          });
          gsap.fromTo(
            n,
            { scale: 0.95 },
            {
              scale: 1.0,
              duration: 0.6,
              delay: i * 0.12,
              transformOrigin: "center center",
              ease: "elastic.out(1,0.5)",
            }
          );
        });
      } else {
        nodes.forEach((n, i) => {
          gsap.to(n, { opacity: 0, duration: 0.6, delay: i * 0.02 });
        });
      }
    }
    window.addEventListener("sand-footprints", onFoot);
    return () => window.removeEventListener("sand-footprints", onFoot);
  }, []);

  return (
    <svg
      className="sand-svg"
      viewBox="0 0 1400 260"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <defs>
        <linearGradient id="sandGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#f2d7a0" />
          <stop offset="50%" stopColor="#e8c68a" />
          <stop offset="100%" stopColor="#f7e8c2" />
        </linearGradient>
        <linearGradient id="shimmerGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>

      <path
        d="
          M0,60
          C 220,10 420,110 700,90
          C 960,70 1180,30 1400,68
          L1400,260
L0,260
          Z
        "
        fill="url(#sandGrad)"
        opacity="0.98"
      />

      <line
        x1="1180"
        y1="28"
        x2="1390"
        y2="28"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.85"
      />

      <g ref={wavesRef} id="waves-layer" pointerEvents="none" />

      <g id="shimmerGroup" pointerEvents="none">
        <rect
          ref={shimmerRef}
          x={-600}
          y={52}
          width={600}
          height={4}
          fill="url(#shimmerGrad)"
          opacity="0.95"
          rx="2"
        />
      </g>

      <g ref={footprintsRef} id="footprints-layer" />
    </svg>
  );
}
