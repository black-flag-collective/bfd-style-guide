import { FloatingShape } from "./FloatingShape";
import { GradientShift } from "./GradientShift";
import type { ScrollBackgroundProps, FloatingShapeProps } from "./types";

const defaultShapes: FloatingShapeProps[] = [
  { shape: "corner-bracket", position: [5, 15], size: 50, speed: 0.2, rotation: 0, opacity: 0.06 },
  { shape: "line", position: [12, 25], size: 80, speed: 0.35, rotation: -45, opacity: 0.04 },
  { shape: "corner-bracket", position: [85, 10], size: 40, speed: 0.25, rotation: 90, opacity: 0.05 },
  { shape: "dot", position: [90, 30], size: 20, speed: 0.15, rotation: 0, opacity: 0.07 },
  { shape: "line", position: [25, 45], size: 60, speed: 0.4, rotation: 30, opacity: 0.04 },
  { shape: "corner-bracket", position: [70, 50], size: 35, speed: 0.3, rotation: 180, opacity: 0.05 },
  { shape: "corner-bracket", position: [10, 75], size: 45, speed: 0.2, rotation: -90, opacity: 0.06 },
  { shape: "line", position: [80, 70], size: 100, speed: 0.35, rotation: 45, opacity: 0.04 },
  { shape: "dot", position: [50, 85], size: 15, speed: 0.45, rotation: 0, opacity: 0.06 },
];

const defaultGradient = {
  from: { start: "#F0EEE9", middle: "#F0EEE9", end: "#F0EEE9" },
  to: { start: "#F0EEE9", middle: "#F0EEE9", end: "#F0EEE9" },
  angle: 135,
};

export function ScrollBackground({
  shapes = defaultShapes,
  gradient = defaultGradient,
  baseOpacity = 1,
  className = "",
  children,
}: ScrollBackgroundProps) {
  return (
    <>
      <GradientShift from={gradient.from} to={gradient.to} angle={gradient.angle} className={className} />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ opacity: baseOpacity }}>
        {shapes.map((shape, index) => (
          <FloatingShape key={`shape-${index}-${shape.shape}-${shape.position.join("-")}`} {...shape} color="var(--bf-text)" />
        ))}
      </div>
      {children}
    </>
  );
}
