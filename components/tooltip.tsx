/** Shows above its parent, which needs `group relative`, on hover or keyboard focus. */
export function Tooltip({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 font-sans text-xs font-normal tracking-normal whitespace-nowrap normal-case text-background opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
    >
      {children}
    </span>
  );
}
