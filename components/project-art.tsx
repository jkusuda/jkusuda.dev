const MOTIFS = {
  browser: (
    <>
      <rect x="70" y="36" width="180" height="128" rx="10" />
      <path d="M70 62 H250" />
      <path d="M84 49 H84.01 M96 49 H96.01 M108 49 H108.01" />
      <circle cx="160" cy="113" r="32" />
      <path d="M128 113 H148 M172 113 H192" />
      <circle cx="160" cy="113" r="12" />
    </>
  ),
  galaxy: (
    <>
      <path d="M248 84 C262 74 278 88 270 104 C260 122 230 116 226 92 C222 62 258 44 286 62" />
      <path d="M36 164 C80 164 92 124 128 118 C166 112 178 96 222 92" strokeDasharray="2 9" />
      <path d="M36 164 H36.01 M128 118 H128.01 M180 104 H180.01" strokeWidth="7" />
      <path
        d="M72 62 H72.01 M116 44 H116.01 M180 40 H180.01 M64 112 H64.01 M272 160 H272.01 M216 164 H216.01"
        strokeWidth="4"
      />
    </>
  ),
  card: (
    <>
      <rect x="92" y="28" width="104" height="144" rx="8" />
      <path d="M110 54 H178 M110 74 H178 M110 94 H150" />
      <rect x="146" y="104" width="112" height="70" rx="9" fill="var(--project-tint)" />
      <path d="M146 124 H258" />
      <path d="M186 150 L198 160 L220 138" />
    </>
  ),
  island: (
    <>
      <circle cx="74" cy="58" r="17" />
      <path d="M78 146 C110 124 214 124 246 146" />
      <path d="M40 168 C60 158 80 178 100 168 S140 158 160 168 S200 178 220 168 S260 158 280 168" />
      <path d="M160 132 C158 110 164 92 172 76" />
      <path d="M172 76 C150 64 132 72 124 88 M172 76 C190 60 212 66 222 84 M172 76 C164 56 146 48 130 52 M172 76 C182 56 200 46 216 52" />
    </>
  ),
  comet: (
    <>
      <circle cx="226" cy="66" r="15" />
      <path d="M213 75 C170 100 116 124 54 136 M218 79 C184 110 140 140 92 160 M210 68 C172 76 130 86 88 88" />
      <path
        d="M60 50 H60.01 M120 36 H120.01 M270 130 H270.01 M214 158 H214.01 M280 40 H280.01 M160 170 H160.01"
        strokeWidth="4"
      />
    </>
  ),
};

export type ProjectArtName = keyof typeof MOTIFS;

export function ProjectArt({ name }: Readonly<{ name: ProjectArtName }>) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="size-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {MOTIFS[name]}
    </svg>
  );
}
