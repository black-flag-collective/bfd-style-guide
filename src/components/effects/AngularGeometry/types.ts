export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface CornerBracketProps {
  position: CornerPosition;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  animationDelay?: number;
}

export interface DiagonalLineProps {
  direction: "rising" | "falling";
  length?: number;
  offset?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  animationDelay?: number;
}

export interface AngularGeometryProps {
  elements?: {
    corners?: CornerPosition[];
    diagonals?: Array<{ direction: DiagonalLineProps["direction"]; offset?: number }>;
  };
  color?: string;
  opacity?: number;
  staggerDelay?: number;
  className?: string;
}
