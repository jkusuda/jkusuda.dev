import {
  Baloo_2,
  Cedarville_Cursive,
  Fredoka,
  Lilita_One,
  Playfair_Display,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";

// These only download when a popup that uses them opens.
const lilitaOne = Lilita_One({ weight: "400", subsets: ["latin"], preload: false });
const baloo = Baloo_2({ subsets: ["latin"], preload: false });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], preload: false });
const fredoka = Fredoka({ subsets: ["latin"], preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], preload: false });
const cedarville = Cedarville_Cursive({ weight: "400", subsets: ["latin"], preload: false });

export type PopupTheme = {
  /** Base font and text color for the whole popup. */
  surface: string;
  /** Layer between the background image and the content. */
  scrim?: string;
  /** Which part of the background stays in view when it's cropped. */
  imagePosition?: string;
  title: string;
  tagline?: { text: string; className: string };
  description: string;
  link: string;
  media: string;
  stack: string;
  close: string;
};

const POKEBROWSER_BUTTON =
  "rounded-lg border-2 border-[#2f6b2a] bg-[#9dcd9d] font-semibold text-[#173b1c] shadow-[0_3px_0_#2f6b2a] transition-colors hover:bg-[#b3d9b3]";
const SUBSCRIPTOS_BUTTON =
  "border-2 border-black font-bold shadow-[3px_3px_0_#000] transition-transform motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px";
const MII_BUTTON =
  "rounded-full bg-white font-medium text-[#153c61] shadow-md transition-colors hover:bg-[#fff9dc]";

const THEMES: Record<string, PopupTheme> = {
  pokebrowser: {
    surface: `${baloo.className} text-[#173b1c]`,
    title: `${lilitaOne.className} text-5xl text-white md:text-6xl [text-shadow:-2px_-2px_0_#2f6b2a,2px_-2px_0_#2f6b2a,-2px_2px_0_#2f6b2a,2px_2px_0_#2f6b2a,0_5px_0_#2f6b2a]`,
    // Sprites from the animated background pass behind these, so they get a light halo.
    description: "text-lg leading-snug font-medium [text-shadow:0_0_6px_#fff,0_0_2px_#fff]",
    link: POKEBROWSER_BUTTON,
    media: "rounded-xl border-4 border-[#2f6b2a] shadow-[0_6px_0_#2f6b2a]",
    stack: "text-[#102a14] [filter:drop-shadow(0_0_3px_#fff)]",
    close: POKEBROWSER_BUTTON,
  },
  "journey-to-the-eye": {
    surface: `${spaceMono.className} text-[#d9d9d9]`,
    scrim: "bg-black/30",
    title: "text-3xl font-bold tracking-[0.2em] text-white uppercase md:text-4xl",
    description: "text-sm leading-relaxed",
    link: "border border-[#ff4444] text-xs tracking-widest text-[#ff6b6b] uppercase transition-colors hover:bg-[#ff4444] hover:text-black",
    media: "border border-white/30",
    stack: "text-white",
    close:
      "border border-white/40 bg-black text-xs tracking-widest text-white uppercase transition-colors hover:border-white",
  },
  subscriptos: {
    surface: `${spaceMono.className} text-black`,
    // The screenshot's page is white, so fading to white hides its text but keeps the cards.
    // Phones are too narrow to show the cards without the text, so they stay fully white.
    scrim:
      "bg-white md:bg-transparent md:bg-[linear-gradient(to_right,transparent_2%,white_19%,white_81%,transparent_98%),linear-gradient(to_bottom,white_14%,transparent_14%)]",
    title: `${spaceGrotesk.className} text-5xl font-bold tracking-tight md:text-6xl`,
    description: "text-sm leading-relaxed",
    link: `${spaceGrotesk.className} ${SUBSCRIPTOS_BUTTON} bg-[#f0436a] text-white`,
    media: "border-2 border-black shadow-[6px_6px_0_#000]",
    stack: "text-black",
    close: `${spaceGrotesk.className} ${SUBSCRIPTOS_BUTTON} bg-white text-black`,
  },
  "mii-nagement": {
    surface: `${fredoka.className} text-white`,
    title:
      "text-5xl font-bold text-[#ffde27] md:text-6xl [text-shadow:-2px_-2px_0_#153c61,2px_-2px_0_#153c61,-2px_2px_0_#153c61,2px_2px_0_#153c61,0_4px_0_#153c61]",
    description: "text-lg leading-snug font-medium [text-shadow:0_1px_4px_#153c61]",
    link: MII_BUTTON,
    media: "rounded-3xl border-[5px] border-white shadow-lg",
    stack: "text-[#153c61]",
    close: MII_BUTTON,
  },
  meeteor: {
    surface: "text-white [text-shadow:0_1px_4px_#141c34]",
    imagePosition: "center 62%",
    scrim: "bg-[linear-gradient(to_bottom,#141c34f2,#141c34b3_45%,transparent_85%)]",
    title: `${playfair.className} text-6xl lowercase`,
    tagline: {
      text: "blast off into the cosmos",
      className: `${cedarville.className} text-xl text-[#f0b14f]`,
    },
    description: "leading-relaxed text-[#e9e4f3]",
    link: "rounded-full border border-[#f0b14f] text-[#f0b14f] transition-colors hover:bg-[#f0b14f] hover:text-[#141c34]",
    media: "rounded-2xl border border-[#b8b1d4]/50 bg-[#141c34]/60 text-[#e9e4f3]",
    stack: "text-[#141c34]",
    close:
      "rounded-full border border-white/40 bg-[#141c34]/70 text-white transition-colors hover:border-white",
  },
};

const DEFAULT_THEME: PopupTheme = {
  surface: "text-foreground",
  title: "text-4xl font-light tracking-[-0.03em]",
  description: "leading-relaxed text-muted-foreground",
  link: "rounded-full border border-foreground/40 transition-colors hover:border-foreground",
  media: "rounded-lg",
  stack: "text-foreground",
  close:
    "rounded-full bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground",
};

export function popupTheme(slug: string) {
  return THEMES[slug] ?? DEFAULT_THEME;
}
