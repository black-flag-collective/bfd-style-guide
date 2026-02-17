import type { CornerPosition } from "../AngularGeometry/types";

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  backgroundColor?: string;
  blurAmount?: number;
  showCorners?: boolean;
  corners?: CornerPosition[];
  showDiagonals?: boolean;
  accentColor?: string;
  children: React.ReactNode;
  className?: string;
}

export interface OverlayBackgroundProps {
  color: string;
  blur: number;
  className?: string;
}
