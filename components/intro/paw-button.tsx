import { PawShape } from "@/components/paw-shape";

export function PawButton({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Replay the intro"
      className="paw-button fixed right-5 bottom-5 z-20 cursor-pointer rounded-full bg-background/80 p-2 text-foreground/60 transition-colors hover:text-foreground focus-visible:text-foreground"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
        <PawShape />
      </svg>
    </button>
  );
}
