import type { gsap as GSAP } from "gsap";
import type { Scene, Thread } from "@/components/intro/threads";

const HOLD = 1;
const STAGGER = 0.07;
const CROSSFADE = 0.35;
const TAIL_LAG = 0.4;
const FADE_OUT = 0.3;
const OVERLAY_FADE = 0.25;
const EASE = "power2.inOut";
const PIXELS_PER_SECOND = 750;
const MIN_DURATION = 1.8;
const MAX_DURATION = 3;
const PHOTO_FADE_START = 0.35;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function threadRenderer(svg: SVGSVGElement, thread: Thread, startWidth: number) {
  const path = svg.querySelector<SVGElement>(`[data-thread="${thread.line}"]`)!;
  const strokes = thread.strokes.map((stroke) => ({
    ...stroke,
    element: svg.querySelector<SVGElement>(`[data-stroke="${stroke.key}"]`)!,
  }));
  let nextStroke = 0;

  return ({ head, tail }: { head: number; tail: number }) => {
    const widthProgress = clamp01(head / thread.writeStart);
    path.setAttribute(
      "stroke-width",
      String(startWidth + (thread.finalWidth - startWidth) * widthProgress),
    );
    path.setAttribute("stroke-dasharray", `${head - tail} ${thread.total + thread.window}`);
    path.setAttribute("stroke-dashoffset", String(-tail));

    // Strokes are in order along the thread, so only the ones in progress need updating.
    for (let i = nextStroke; i < strokes.length && strokes[i].from < head; i++) {
      const { element, from, length } = strokes[i];
      const progress = clamp01((head - from) / length);
      element.setAttribute("stroke-dashoffset", String(length * (1 - progress)));
      // Round caps would otherwise show a dot before the stroke has started.
      element.setAttribute("opacity", "1");
      if (progress === 1) nextStroke = i + 1;

      if (thread.photo) {
        thread.photo.style.visibility = "visible";
        thread.photo.style.opacity = String(
          clamp01((progress - PHOTO_FADE_START) / (1 - PHOTO_FADE_START)),
        );
      }
    }
  };
}

export function buildTimeline(
  gsap: typeof GSAP,
  svg: SVGSVGElement,
  scene: Scene,
  { onReveal, onDone }: { onReveal: () => void; onDone: () => void },
) {
  const pug = document.querySelector<SVGSVGElement>(".intro-pug")!;
  const timeline = gsap.timeline({ onComplete: onDone });

  timeline.to(pug.querySelectorAll("[data-highlight]"), { opacity: 0, duration: CROSSFADE }, HOLD);

  for (const thread of scene.threads) {
    const render = threadRenderer(svg, thread, scene.threadWidth);
    const path = svg.querySelector(`[data-thread="${thread.line}"]`);
    const brushStroke = pug.querySelector(`[data-line="${thread.line}"]`);
    const start = HOLD + thread.order * STAGGER;
    const duration = Math.min(
      MAX_DURATION,
      Math.max(MIN_DURATION, thread.total / PIXELS_PER_SECOND),
    );
    const progress = { head: thread.window, tail: 0 };
    const update = () => render(progress);

    update();
    timeline
      // The thread is fully in before the brush leaves, so solid shapes never look washed out.
      .to(path, { opacity: 1, duration: CROSSFADE / 2 }, start)
      .to(brushStroke, { opacity: 0, duration: CROSSFADE / 2 }, start + CROSSFADE / 2)
      .to(progress, { head: thread.total, duration, ease: EASE, onUpdate: update }, start)
      // The tail arrives after the head, so the segment shrinks away instead of cutting off.
      .to(
        progress,
        { tail: thread.total, duration: duration + TAIL_LAG, ease: EASE, onUpdate: update },
        start,
      )
      .to(path, { opacity: 0, duration: FADE_OUT }, start + duration + TAIL_LAG - FADE_OUT);

    if (thread.photo) {
      const ringOutline = svg.querySelector(`[data-stroke="${thread.strokes[0].key}"]`);
      timeline.to(ringOutline, { opacity: 0, duration: FADE_OUT }, start + duration + TAIL_LAG);
    }
  }

  timeline.call(onReveal).to(svg, { opacity: 0, duration: OVERLAY_FADE });

  return timeline;
}
