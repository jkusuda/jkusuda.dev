export type Char = { char: string; x: number; width: number };

export type Word = { chars: Char[]; baseline: number; top: number; bottom: number };

export type TextStyle = {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fill: string;
};

export function readStyle(element: Element): TextStyle {
  const style = getComputedStyle(element);
  return {
    fontFamily: style.fontFamily,
    fontSize: parseFloat(style.fontSize),
    fontWeight: style.fontWeight,
    fill: style.color,
  };
}

function fontAscent({ fontFamily, fontSize, fontWeight }: TextStyle) {
  const context = document.createElement("canvas").getContext("2d")!;
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  return context.measureText("x").fontBoundingBoxAscent;
}

/** Reads the on-screen position of every character, grouped into words. */
function measureWords(element: Element): Word[] {
  const ascent = fontAscent(readStyle(element));
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const words: Word[] = [];
  let current: Word | null = null;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    for (let i = 0; i < node.length; i++) {
      const char = node.data[i];
      if (/\s/.test(char)) {
        current = null;
        continue;
      }
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      // Paragraph breaks and wrapped hyphens change line with no whitespace between them.
      if (!current || Math.abs(rect.top - current.top) > 1) {
        current = {
          chars: [],
          baseline: rect.top + ascent,
          top: rect.top,
          bottom: rect.bottom,
        };
        words.push(current);
      }
      current.chars.push({ char, x: rect.left, width: rect.width });
    }
  }
  return words;
}

/** Same as measureWords, but merges the words that share a line of text. */
export function measureLines(element: Element): Word[] {
  const lines: Word[] = [];
  for (const word of measureWords(element)) {
    const line = lines.at(-1);
    if (line && Math.abs(line.top - word.top) < 1) line.chars.push(...word.chars);
    else lines.push(word);
  }
  return lines;
}
