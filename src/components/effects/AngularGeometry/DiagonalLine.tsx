import { motion } from "framer-motion";
import type { DiagonalLineProps } from "./types";

export function DiagonalLine({ direction, length = 40, offset = 20, strokeWidth = 1, color = "currentColor", className = "", animationDelay = 0 }: DiagonalLineProps) {
  const getCoordinates = () => {
    if (direction === "rising") {
      return { x1: `${offset}%`, y1: `${100 - offset}%`, x2: `${offset + length}%`, y2: `${100 - offset - length}%` };
    }
    return { x1: `${offset}%`, y1: `${offset}%`, x2: `${offset + length}%`, y2: `${offset + length}%` };
  };
  const coords = getCoordinates();
  return (
    <motion.svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}>
      <motion.line x1={coords.x1} y1={coords.y1} x2={coords.x2} y2={coords.y2} stroke={color} strokeWidth={strokeWidth} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: animationDelay + 0.1, ease: [0.16, 1, 0.3, 1] }} />
    </motion.svg>
  );
}
