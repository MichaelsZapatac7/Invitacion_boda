"use client";

import { useEffect, useRef } from "react";

interface Glitter {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacitySpeed: number;
  opacityPhase: number;
  color: string;
  type: number; // 0=dot, 1=diamond, 2=cross
  wobblePhase: number;
  wobbleSpeed: number;
  wobble: number;
}

const COLORS = [
  "rgba(201, 169, 110, VAL)", // gold
  "rgba(228, 204, 145, VAL)", // light gold
  "rgba(255, 245, 220, VAL)", // champagne
  "rgba(255, 255, 255, VAL)", // white
  "rgba(220, 200, 255, VAL)", // soft lavender shimmer
  "rgba(255, 230, 200, VAL)", // warm white
];

const makeColor = (template: string, alpha: number) =>
  template.replace("VAL", String(alpha.toFixed(2)));

export function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Glitter[]>([]);
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

    const create = (): Glitter => ({
      x: Math.random() * canvas.width,
      y: -8,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      opacitySpeed: Math.random() * 0.025 + 0.01,
      opacityPhase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: Math.floor(Math.random() * 3),
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.008,
      wobble: Math.random() * 0.8 + 0.3,
    });

    // Seed initial particles distributed across screen
    for (let i = 0; i < 80; i++) {
      const p = create();
      p.y = Math.random() * canvas.height;
      p.opacityPhase = Math.random() * Math.PI * 2;
      particlesRef.current.push(p);
    }

    const drawDot = (ctx: CanvasRenderingContext2D, p: Glitter, alpha: number) => {
      const col = makeColor(p.color, alpha);
      // Glow
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3);
      grd.addColorStop(0, makeColor(p.color, alpha * 0.9));
      grd.addColorStop(0.4, makeColor(p.color, alpha * 0.4));
      grd.addColorStop(1, makeColor(p.color, 0));
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2);
      ctx.fill();
      // Core
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawDiamond = (ctx: CanvasRenderingContext2D, p: Glitter, alpha: number) => {
      const s = p.size * 2.2;
      ctx.fillStyle = makeColor(p.color, alpha);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.55, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.55, 0);
      ctx.closePath();
      ctx.fill();
    };

    const drawCross = (ctx: CanvasRenderingContext2D, p: Glitter, alpha: number) => {
      const s = p.size * 2.8;
      const w = p.size * 0.45;
      ctx.fillStyle = makeColor(p.color, alpha);
      // Horizontal bar
      ctx.fillRect(-s, -w, s * 2, w * 2);
      // Vertical bar
      ctx.fillRect(-w, -s, w * 2, s * 2);
      // Diagonal shimmer lines
      ctx.globalAlpha = alpha * 0.4;
      ctx.fillStyle = makeColor(p.color, 1);
      ctx.save();
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-s * 0.7, -w * 0.6, s * 1.4, w * 1.2);
      ctx.fillRect(-w * 0.6, -s * 0.7, w * 1.2, s * 1.4);
      ctx.restore();
    };

    let last = 0;
    const animate = (ts: number) => {
      const dt = Math.min((ts - last) / 16, 3);
      last = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        // Twinkle
        p.opacityPhase += p.opacitySpeed * dt;
        const twinkle = 0.5 + 0.5 * Math.sin(p.opacityPhase);
        const alpha = p.opacity * twinkle;

        // Drift
        p.wobblePhase += p.wobbleSpeed * dt;
        p.x += (p.speedX + Math.sin(p.wobblePhase) * p.wobble) * dt;
        p.y += p.speedY * dt;

        if (p.y > canvas.height + 10) {
          particlesRef.current[i] = create();
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = alpha;

        if (p.type === 0) drawDot(ctx, p, 1);
        else if (p.type === 1) drawDiamond(ctx, p, 1);
        else drawCross(ctx, p, 1);

        ctx.restore();
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
