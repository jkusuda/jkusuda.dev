/** A paw print pointing up, drawn in a 24 by 24 box. */
export function PawShape() {
  return (
    <>
      <ellipse cx="5" cy="11" rx="2.2" ry="2.8" />
      <ellipse cx="9.5" cy="6.5" rx="2.2" ry="3" />
      <ellipse cx="14.5" cy="6.5" rx="2.2" ry="3" />
      <ellipse cx="19" cy="11" rx="2.2" ry="2.8" />
      <path d="M12 11c-3.2 0-6 3.4-6 6.2 0 2 1.5 2.8 3 2.8 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.5 0 3-.8 3-2.8 0-2.8-2.8-6.2-6-6.2Z" />
    </>
  );
}
