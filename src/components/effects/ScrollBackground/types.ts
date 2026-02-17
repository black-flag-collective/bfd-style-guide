export interface ScrollProgress {
  scrollY: number;
  progress: number;
  velocity: number;
  direction: "up" | "down" | "idle";
}

export interface ParallaxLayerProps {
  speed?: number;
  offsetY?: number;
  opacityRange?: [number, number];
  children: React.ReactNode;
  className?: string;
}

export interface GradientShiftProps {
  from: { start: string; middle: string; end: string };
  to: { start: string; middle: string; end: string };
  angle?: number;
  className?: string;
}

export interface FloatingShapeProps {
  shape: "corner-bracket" | "line" | "dot";
  position: [number, number];
  size?: number;
  speed?: number;
  rotation?: number;
  color?: string;
  opacity?: number;
}

export interface ScrollBackgroundProps {
  shapes?: FloatingShapeProps[];
  gradient?: GradientShiftProps;
  baseOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}
