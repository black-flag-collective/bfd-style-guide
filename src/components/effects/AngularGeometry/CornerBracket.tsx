import { motion } from "framer-motion";
import type { CornerBracketProps } from "./types";

export function CornerBracket({ position, size = 60, strokeWidth = 2, color = "currentColor", className = "", animationDelay = 0 }: CornerBracketProps) {
  const positionClasses: Record<typeof position, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const getPath = () => {
    const s = size;
    switch (position) {
      case "top-left": return `M ${strokeWidth} ${s} L ${strokeWidth} ${strokeWidth} L ${s} ${strokeWidth}`;
      case "top-right": return `M ${s - strokeWidth} ${s} L ${s - strokeWidth} ${strokeWidth} L 0 ${strokeWidth}`;
      case "bottom-left": return `M ${strokeWidth} 0 L ${strokeWidth} ${s - strokeWidth} L ${s} ${s - strokeWidth}`;
      case "bottom-right": return `M ${s - strokeWidth} 0 L ${s - strokeWidth} ${s - strokeWidth} L 0 ${s - strokeWidth}`;
    }
  };

  return (
    <motion.div className={`absolute pointer-events-none ${positionClasses[position]} ${className}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, delay: animationDelay, ease: [0.16, 1, 0.3, 1] }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d={getPath()} stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: animationDelay + 0.1, ease: [0.16, 1, 0.3, 1] }} />
      </svg>
    </motion.div>
  );
}
