import { motion } from "framer-motion";
import type { OverlayBackgroundProps } from "./types";

export function OverlayBackground({ color, blur, className = "" }: OverlayBackgroundProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{ backgroundColor: color, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}
