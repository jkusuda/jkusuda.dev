/** A modal `<dialog>` that also closes when its backdrop is clicked. */
export function PopupDialog({
  className = "",
  ...props
}: Readonly<React.ComponentProps<"dialog">>) {
  return (
    <dialog
      {...props}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className={`popup-dialog m-auto rounded-3xl bg-background p-0 text-foreground shadow-xl backdrop:bg-foreground/40 ${className}`}
    />
  );
}
