import { useScrollProgress } from "./useScrollProgress";
import type { GradientShiftProps } from "./types";

function interpolateColor(color1: string, color2: string, factor: number): string {
  if (color1.startsWith("#")) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    if (!c1 || !c2) return color1;
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return factor < 0.5 ? color1 : color2;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

export function GradientShift({ from, to, angle = 135, className = "" }: GradientShiftProps) {
  const { progress } = useScrollProgress();
  const currentStart = interpolateColor(from.start, to.start, progress);
  const currentMiddle = interpolateColor(from.middle, to.middle, progress);
  const currentEnd = interpolateColor(from.end, to.end, progress);

  return (
    <div
      className={`fixed inset-0 -z-10 transition-colors duration-100 ${className}`}
      style={{ background: `linear-gradient(${angle}deg, ${currentStart} 0%, ${currentMiddle} 50%, ${currentEnd} 100%)` }}
    />
  );
}
