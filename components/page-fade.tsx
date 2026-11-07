"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

export function PageFade({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} enter="page-fade" exit="page-fade" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
