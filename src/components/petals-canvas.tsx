"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: number;
  wobble: number;
  wobbleSpeed: number;
  wobblePhase: number;
}

const COLORS = [
  "rgba(220, 160, 160, 0.6)",
  "rgba(240, 200, 190, 0.55)",
  "rgba(210, 140, 140, 0.5)",
  "rgba(255, 220, 210, 0.45)",
  "rgba(201, 169, 110, 0.4)",
  "rgba(245, 230, 220, 0.5)",
];

export function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createPetal = (): Petal => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 12 + 4,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: Math.random() * 1.2 + 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.035,
      opacity: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: Math.floor(Math.random() * 3),
      wobble: Math.random() * 1.8,
      wobbleSpeed: Math.random() * 0.018 + 0.008,
      wobblePhase: Math.random() * Math.PI * 2,
    });

    for (let i = 0; i < 25; i++) {
      const p = createPetal();
      p.y = Math.random() * canvas.height;
      petalsRef.current.push(p);
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      if (p.type === 0) {
        ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2);
      } else if (p.type === 1) {
        ctx.ellipse(0, 0, p.size * 0.35, p.size * 0.65, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(0, 0, p.size * 0.38, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    };

    let last = 0;
    const animate = (ts: number) => {
      const dt = Math.min((ts - last) / 16, 3);
      last = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalsRef.current.forEach((p, i) => {
        p.wobblePhase += p.wobbleSpeed * dt;
        p.x += (p.speedX + Math.sin(p.wobblePhase) * p.wobble) * dt;
        p.y += p.speedY * dt;
        p.rotation += p.rotationSpeed * dt;
        if (p.y > canvas.height + 20) petalsRef.current[i] = createPetal();
        drawPetal(ctx, p);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
