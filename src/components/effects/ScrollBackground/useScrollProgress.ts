import { useState, useEffect, useRef, useCallback } from "react";
import type { ScrollProgress } from "./types";

export function useScrollProgress(): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    scrollY: 0,
    progress: 0,
    velocity: 0,
    direction: "idle",
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef<number>();

  const updateScroll = useCallback(() => {
    const now = Date.now();
    const currentScrollY = window.scrollY;
    const timeDelta = now - lastTime.current;
    const docHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const maxScroll = docHeight - viewHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / maxScroll)) : 0;
    const velocity = timeDelta > 0 ? (currentScrollY - lastScrollY.current) / timeDelta : 0;

    let direction: ScrollProgress["direction"] = "idle";
    if (Math.abs(velocity) > 0.01) {
      direction = velocity > 0 ? "down" : "up";
    }

    setScrollProgress({ scrollY: currentScrollY, progress, velocity, direction });
    lastScrollY.current = currentScrollY;
    lastTime.current = now;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateScroll]);

  return scrollProgress;
}
