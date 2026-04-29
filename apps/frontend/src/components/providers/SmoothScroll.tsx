"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isCancelled = false;

    async function setupSmoothScroll() {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const finePointer = window.matchMedia("(pointer: fine)");

      if (reduceMotion.matches || !finePointer.matches) {
        return;
      }

      const { default: Lenis } = await import("lenis");
      if (isCancelled) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      let frameId = 0;

      const raf = (time: number) => {
        lenis.raf(time);
        frameId = window.requestAnimationFrame(raf);
      };

      frameId = window.requestAnimationFrame(raf);

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        lenis.destroy();
      };
    }

    void setupSmoothScroll();

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
