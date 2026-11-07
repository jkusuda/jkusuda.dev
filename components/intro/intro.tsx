"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PawButton } from "@/components/intro/paw-button";
import { Pug } from "@/components/intro/pug";
import { buildScene, RING_WIDTH, type Scene } from "@/components/intro/threads";
import { buildTimeline } from "@/components/intro/timeline";

const PLAYING_ATTRIBUTE = "data-intro-playing";

function Overlay({ scene, ref }: Readonly<{ scene: Scene; ref: React.Ref<SVGSVGElement> }>) {
  const { width, height } = scene;
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden
    >
      {scene.runs.map(({ key, chars, baseline, style, strokes }) => (
        <g key={key}>
          <mask id={key} maskUnits="userSpaceOnUse" x={0} y={0} width={width} height={height}>
            {strokes.map((stroke) => (
              <path
                key={stroke.key}
                data-stroke={stroke.key}
                d={stroke.d}
                fill="none"
                stroke="white"
                strokeWidth={style.fontSize * 0.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${stroke.length} ${stroke.length + 1}`}
                strokeDashoffset={stroke.length}
                opacity={0}
              />
            ))}
          </mask>
          <g mask={`url(#${key})`}>
            <text
              x={chars.map(({ x }) => x.toFixed(2)).join(" ")}
              y={baseline}
              fill={style.fill}
              fontFamily={style.fontFamily}
              fontSize={style.fontSize}
              fontWeight={style.fontWeight}
            >
              {chars.map(({ char }) => char).join("")}
            </text>
          </g>
        </g>
      ))}

      {scene.rings.map(({ key, d, length }) => (
        <path
          key={key}
          data-stroke={key}
          d={d}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={RING_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${length} ${length + 1}`}
          strokeDashoffset={length}
          opacity={0}
        />
      ))}

      {scene.threads.map((thread) => (
        <path
          key={thread.line}
          data-thread={thread.line}
          d={thread.d}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={scene.threadWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0}
        />
      ))}
    </svg>
  );
}

export function Intro() {
  const [scene, setScene] = useState<Scene | null>(null);
  const overlay = useRef<SVGSVGElement>(null);

  const play = useCallback(() => {
    document.fonts.ready.then(() => setScene(buildScene()));
  }, []);

  useEffect(() => {
    // The inline script in the root layout decides whether this visit plays.
    if (document.documentElement.hasAttribute(PLAYING_ATTRIBUTE)) play();
  }, [play]);

  useEffect(() => {
    if (!scene) return;

    let cancelled = false;
    let timeline: gsap.core.Timeline | undefined;
    const skip = () => timeline?.progress(1);

    import("gsap").then(({ gsap }) => {
      if (cancelled || !overlay.current) return;
      timeline = buildTimeline(gsap, overlay.current, scene, {
        onReveal: () => document.documentElement.removeAttribute(PLAYING_ATTRIBUTE),
        onDone: () => setScene(null),
      });
    });

    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("resize", skip);

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("resize", skip);
      timeline?.revert();
      // The timeline reveals photos directly, so it can't revert them for us.
      document
        .querySelectorAll("[data-intro-photo]")
        .forEach((photo) => photo.removeAttribute("style"));
    };
  }, [scene]);

  const replay = () => {
    document.documentElement.setAttribute(PLAYING_ATTRIBUTE, "");
    play();
  };

  return (
    <>
      <Pug />
      {scene && <Overlay scene={scene} ref={overlay} />}
      <PawButton onClick={replay} />
    </>
  );
}
