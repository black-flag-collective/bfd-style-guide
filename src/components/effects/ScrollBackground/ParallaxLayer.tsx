import { useScrollProgress } from "./useScrollProgress";
import type { ParallaxLayerProps } from "./types";

export function ParallaxLayer({ speed = 0.5, offsetY = 0, opacityRange, children, className = "" }: ParallaxLayerProps) {
  const { scrollY, progress } = useScrollProgress();
  const translateY = offsetY - scrollY * (1 - speed);
  let opacity = 1;
  if (opacityRange) {
    const [minOpacity, maxOpacity] = opacityRange;
    opacity = minOpacity + progress * (maxOpacity - minOpacity);
  }
  return (
    <div className={`will-change-transform ${className}`} style={{ transform: `translateY(${translateY}px)`, opacity }}>
      {children}
    </div>
  );
}
