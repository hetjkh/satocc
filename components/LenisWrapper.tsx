"use client";

import { useEffect, ReactNode } from "react";
import { initLenis } from "@/lib/lenis";

export default function LenisWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = initLenis();

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

