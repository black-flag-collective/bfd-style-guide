import { CornerBracket } from "./CornerBracket";
import { DiagonalLine } from "./DiagonalLine";
import type { AngularGeometryProps, CornerPosition } from "./types";

const defaultCorners: CornerPosition[] = ["top-left", "top-right", "bottom-left", "bottom-right"];

export function AngularGeometry({ elements = { corners: defaultCorners }, color = "rgba(255, 255, 255, 0.3)", opacity = 1, staggerDelay = 0.08, className = "" }: AngularGeometryProps) {
  const corners = elements.corners || [];
  const diagonals = elements.diagonals || [];
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      {corners.map((position, index) => (
        <CornerBracket key={position} position={position} color={color} size={80} strokeWidth={2} animationDelay={index * staggerDelay} className="m-6 md:m-10" />
      ))}
      {diagonals.map((diagonal, index) => (
        <DiagonalLine key={`diagonal-${diagonal.direction}-${diagonal.offset}`} direction={diagonal.direction} offset={diagonal.offset} color={color} strokeWidth={1} animationDelay={(corners.length + index) * staggerDelay} />
      ))}
    </div>
  );
}
