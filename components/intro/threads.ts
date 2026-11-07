import { FALLBACK_GLYPH, GLYPHS } from "@/components/intro/glyphs";
import {
  measureLines,
  readStyle,
  type Char,
  type TextStyle,
  type Word,
} from "@/components/intro/measure";
import {
  firstPoint,
  formatPoint,
  lastPoint,
  mapPoints,
  pointsOf,
  ring,
  type Point,
} from "@/components/intro/path";
import { PUG_LINES, PUG_SIZE } from "@/components/intro/pug";

// These lines are circles on the pug, so they re-form as the circles around the photos.
const PHOTO_LINES = ["eye-ring-left", "pupil-left"];
export const RING_WIDTH = 2;

type WriteStroke = { key: string; d: string; from: number; length: number };

export type Thread = {
  line: string;
  order: number;
  d: string;
  total: number;
  /** Length of the visible segment, which starts out covering the pug line. */
  window: number;
  /** Distance along the thread where the first letter begins. */
  writeStart: number;
  finalWidth: number;
  strokes: WriteStroke[];
  /** The photo this thread draws a ring around, which fades in as the ring closes. */
  photo?: HTMLElement;
};

type TextRun = Word & { key: string; style: TextStyle; strokes: WriteStroke[] };

export type Scene = {
  width: number;
  height: number;
  threadWidth: number;
  threads: Thread[];
  runs: TextRun[];
  rings: WriteStroke[];
};

type RunChar = { char: Char; run: TextRun };

/** One piece of page text, like the headline or a nav item, with its position. */
type TextBlock = { chars: RunChar[]; top: number; centerX: number; weight: number };

type PugLine = { name: string; d: string; x: number; y: number };

let measurer: SVGPathElement | undefined;

function pathLength(d: string) {
  measurer ??= document.createElementNS("http://www.w3.org/2000/svg", "path");
  measurer.setAttribute("d", d);
  return measurer.getTotalLength();
}

const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

/** Grows one continuous path: pug line, then a connector, then hops between pen strokes. */
class Route {
  d: string;
  length: number;
  end: Point;
  private tangent: Point | null;

  constructor(lineD: string) {
    const points = pointsOf(lineD);
    const end = points.at(-1)!;
    const [beforeX, beforeY] = points.at(-2)!;
    const size = Math.hypot(end[0] - beforeX, end[1] - beforeY) || 1;
    this.d = lineD;
    this.length = pathLength(lineD);
    this.end = end;
    this.tangent = [(end[0] - beforeX) / size, (end[1] - beforeY) / size];
  }

  /** Adds a piece that starts where the route ends and returns where it begins. */
  add(piece: string) {
    const from = this.length;
    this.d += ` ${piece.replace(/^M\s*\S+\s+\S+\s*/, "")}`;
    this.length += pathLength(piece);
    this.end = lastPoint(piece);
    return from;
  }

  travelTo(target: Point, lift: number) {
    const [x, y] = this.end;
    const distance = Math.hypot(target[0] - x, target[1] - y);
    if (distance < 0.5) return;

    if (this.tangent) {
      const reach = distance * 0.5;
      const pull: Point = [x + this.tangent[0] * reach, y + this.tangent[1] * reach];
      const arrive: Point = [target[0], target[1] - distance * 0.3];
      this.tangent = null;
      this.add(
        `M${formatPoint(this.end)} C${formatPoint(pull)} ${formatPoint(arrive)} ${formatPoint(target)}`,
      );
    } else {
      const mid: Point = [(x + target[0]) / 2, (y + target[1]) / 2 - lift];
      this.add(`M${formatPoint(this.end)} Q${formatPoint(mid)} ${formatPoint(target)}`);
    }
  }
}

function readBlocks(runs: TextRun[]): TextBlock[] {
  const targets = document.querySelectorAll("[data-intro-target]");
  return Array.from(targets, (element) => {
    const style = readStyle(element);
    const blockRuns = measureLines(element).map((line): TextRun => {
      const run = { ...line, key: `run-${runs.length}`, style, strokes: [] };
      runs.push(run);
      return run;
    });
    const chars = blockRuns.flatMap((run) => run.chars.map((char) => ({ char, run })));
    const rect = element.getBoundingClientRect();
    return {
      chars,
      top: rect.top,
      centerX: rect.left + rect.width / 2,
      // The square root stops a long bio from taking nearly every line from the headline.
      weight: Math.sqrt(chars.length) * style.fontSize,
    };
  });
}

function readPugLines(): PugLine[] {
  return Object.entries(PUG_LINES).map(([name, d]) => {
    const points = pointsOf(d);
    return {
      name,
      d,
      x: average(points.map(([x]) => x)),
      y: average(points.map(([, y]) => y)),
    };
  });
}

/** Shares `count` lines between blocks by weight. Every block gets at least one. */
function shareLines(blocks: TextBlock[], count: number) {
  const totalWeight = blocks.reduce((sum, block) => sum + block.weight, 0);
  const shares = blocks.map((block) =>
    Math.max(1, Math.round((block.weight / totalWeight) * count)),
  );
  const largest = () => shares.indexOf(Math.max(...shares));

  while (shares.reduce((sum, share) => sum + share, 0) > count) shares[largest()]--;
  while (shares.reduce((sum, share) => sum + share, 0) < count) shares[largest()]++;
  return shares;
}

function splitEvenly<T>(items: T[], parts: number) {
  return Array.from({ length: parts }, (_, part) =>
    items.slice(
      Math.round((part / parts) * items.length),
      Math.round(((part + 1) / parts) * items.length),
    ),
  );
}

/** Pairs lines with text top to bottom, so each line goes to the text nearest its height. */
function assignLines(lines: PugLine[], blocks: TextBlock[]) {
  const sortedLines = [...lines].sort((a, b) => a.y - b.y);
  const sortedBlocks = [...blocks].sort((a, b) => a.top - b.top);
  const shares = shareLines(sortedBlocks, sortedLines.length);

  let next = 0;
  return sortedBlocks.flatMap((block, index) => {
    const chunks = splitEvenly(block.chars, shares[index]);
    return chunks.map((chars) => ({ line: sortedLines[next++], chars }));
  });
}

function writeChars(route: Route, chars: RunChar[]) {
  const strokes: WriteStroke[] = [];

  for (const { char, run } of chars) {
    const { fontSize } = run.style;
    for (const glyphStroke of GLYPHS[char.char] ?? FALLBACK_GLYPH) {
      const d = mapPoints(glyphStroke, (x, y) => [
        char.x + x * char.width,
        run.baseline - y * fontSize,
      ]);
      route.travelTo(firstPoint(d), fontSize * 0.2);
      const stroke = {
        key: `${run.key}-${run.strokes.length}`,
        d,
        length: pathLength(d),
        from: route.add(d),
      };
      run.strokes.push(stroke);
      strokes.push(stroke);
    }
  }
  return strokes;
}

function drawRing(route: Route, photo: HTMLElement, key: string): WriteStroke {
  const { left, top, width } = photo.getBoundingClientRect();
  const d = ring([left + width / 2, top + width / 2], width / 2);
  route.travelTo(firstPoint(d), 0);
  return { key, d, length: pathLength(d), from: route.add(d) };
}

/** Measures the page as laid out right now and routes every pug line to its target. */
export function buildScene(): Scene {
  const pugRect = document.querySelector(".intro-pug")!.getBoundingClientRect();
  const scale = pugRect.width / PUG_SIZE;
  const pugCenterX = pugRect.left + pugRect.width / 2;
  const threadWidth = Math.max(1.5, 3 * scale);

  const runs: TextRun[] = [];
  const blocks = readBlocks(runs);
  const allLines = readPugLines();
  const lines = allLines.filter((line) => !PHOTO_LINES.includes(line.name));
  const photos = Array.from(document.querySelectorAll<HTMLElement>("[data-intro-photo]"));
  const rings: WriteStroke[] = [];

  // Lines on the center of the face join the left side, which has the most text.
  const isRightLine = (line: PugLine) => line.x > PUG_SIZE / 2 + 1;
  const isRightBlock = (block: TextBlock) => block.centerX > pugCenterX;
  const rightBlocks = blocks.filter(isRightBlock);
  const leftBlocks = blocks.filter((block) => !isRightBlock(block));

  const assignments = rightBlocks.length
    ? [
        ...assignLines(
          lines.filter((line) => !isRightLine(line)),
          leftBlocks,
        ),
        ...assignLines(lines.filter(isRightLine), rightBlocks),
      ]
    : assignLines(lines, leftBlocks);

  const photoAssignments = photos.map((photo, index) => ({
    line: allLines.find((line) => line.name === PHOTO_LINES[index])!,
    chars: [],
    photo,
  }));
  const allAssignments: { line: PugLine; chars: RunChar[]; photo?: HTMLElement }[] = [
    ...assignments,
    ...photoAssignments,
  ];

  const threads = allAssignments
    .sort((a, b) => a.line.y - b.line.y)
    .map(({ line, chars, photo }, order): Thread => {
      const onScreen = mapPoints(line.d, (x, y) => [
        pugRect.left + x * scale,
        pugRect.top + y * scale,
      ]);
      const route = new Route(onScreen);
      const lineLength = route.length;
      const strokes = photo
        ? [drawRing(route, photo, `ring-${rings.length}`)]
        : writeChars(route, chars);
      if (photo) rings.push(strokes[0]);
      return {
        line: line.name,
        order,
        d: route.d,
        total: route.length,
        window: lineLength,
        writeStart: strokes[0].from,
        finalWidth: photo
          ? Math.min(threadWidth, RING_WIDTH)
          : Math.min(threadWidth, Math.max(0.9, chars[0].run.style.fontSize * 0.055)),
        strokes,
        photo,
      };
    });

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    threadWidth,
    threads,
    runs,
    rings,
  };
}
