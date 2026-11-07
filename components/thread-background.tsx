"use client";

import { useEffect, useRef } from "react";

const LINE_SPACING = 68;
const POINT_SPACING = 18;
const CURSOR_RADIUS = 190;
const CURSOR_PUSH = 34;
const CURSOR_EASE = 0.08;
const BASE_ALPHA = 0.6;
const NEAR_CURSOR_ALPHA = 0.35;

/** The resting height of a thread. Nearby threads share similar phases, so they flow together. */
function restingY(baseY: number, index: number, x: number, time: number) {
  const phase = index * 0.35;
  return (
    baseY +
    12 * Math.sin(x * 0.004 + time * 0.22 + phase) +
    6 * Math.sin(x * 0.011 - time * 0.16 + phase * 1.7)
  );
}

export function ThreadBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const styles = getComputedStyle(document.documentElement);
    const threadColor = styles.getPropertyValue("--border").trim();
    const cursorColor = styles.getPropertyValue("--foreground").trim();
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let frame = 0;

    // `strength` eases in and out, so threads settle back when the cursor leaves.
    const cursor = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0 };

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const traceThread = (baseY: number, index: number, time: number) => {
      context.beginPath();
      for (let x = -POINT_SPACING; x <= width + POINT_SPACING; x += POINT_SPACING) {
        const y = restingY(baseY, index, x, time);
        const dx = x - cursor.x;
        const dy = y - cursor.y;
        const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / CURSOR_RADIUS);
        const push = falloff * falloff * CURSOR_PUSH * cursor.strength * (dy < 0 ? -1 : 1);
        context.lineTo(x, y + push);
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;
      const lineCount = Math.ceil(height / LINE_SPACING) + 2;

      const glow = context.createLinearGradient(
        cursor.x - CURSOR_RADIUS,
        0,
        cursor.x + CURSOR_RADIUS,
        0,
      );
      glow.addColorStop(0, "transparent");
      glow.addColorStop(0.5, cursorColor);
      glow.addColorStop(1, "transparent");

      for (let index = 0; index < lineCount; index++) {
        const baseY = index * LINE_SPACING - LINE_SPACING / 2;

        context.globalAlpha = BASE_ALPHA;
        context.strokeStyle = threadColor;
        traceThread(baseY, index, time);
        context.stroke();

        const closeness = Math.max(0, 1 - Math.abs(baseY - cursor.y) / CURSOR_RADIUS);
        if (closeness > 0 && cursor.strength > 0.01) {
          context.globalAlpha = NEAR_CURSOR_ALPHA * closeness * cursor.strength;
          context.strokeStyle = glow;
          traceThread(baseY, index, time);
          context.stroke();
        }
      }
    };

    const animate = (now: number) => {
      cursor.x += (cursor.targetX - cursor.x) * CURSOR_EASE;
      cursor.y += (cursor.targetY - cursor.y) * CURSOR_EASE;
      cursor.strength += (cursor.targetStrength - cursor.strength) * CURSOR_EASE;
      draw(now / 1000);
      frame = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (cursor.targetStrength === 0) {
        cursor.x = event.clientX;
        cursor.y = event.clientY;
      }
      cursor.targetX = event.clientX;
      cursor.targetY = event.clientY;
      cursor.targetStrength = event.pointerType === "mouse" ? 1 : 0;
    };
    const handlePointerLeave = () => {
      cursor.targetStrength = 0;
    };

    resize();

    if (reducedMotion) {
      draw(0);
      const redraw = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", redraw);
      return () => window.removeEventListener("resize", redraw);
    }

    frame = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 size-full"
    />
  );
}
