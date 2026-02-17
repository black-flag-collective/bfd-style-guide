import { AnimatePresence, motion } from "framer-motion";
import { OverlayBackground } from "./OverlayBackground";
import { AngularGeometry } from "../AngularGeometry";
import type { MenuOverlayProps } from "./types";
import type { CornerPosition } from "../AngularGeometry/types";

const defaultCorners: CornerPosition[] = ["top-left", "top-right", "bottom-left", "bottom-right"];

export function MenuOverlay({
  isOpen,
  onClose,
  backgroundColor = "rgba(23, 23, 23, 0.95)",
  blurAmount = 24,
  showCorners = true,
  corners = defaultCorners,
  showDiagonals = true,
  accentColor = "rgba(255, 255, 255, 0.15)",
  children,
  className = "",
}: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className={`fixed inset-0 z-40 ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <OverlayBackground color={backgroundColor} blur={blurAmount} />
          {(showCorners || showDiagonals) && (
            <AngularGeometry
              elements={{ corners: showCorners ? corners : [], diagonals: showDiagonals ? [{ direction: "falling", offset: 10 }, { direction: "rising", offset: 60 }] : [] }}
              color={accentColor}
              opacity={1}
              staggerDelay={0.1}
            />
          )}
          <motion.div className="relative z-10 h-full" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            {children}
          </motion.div>
          {onClose && <div className="absolute inset-0 z-0" onClick={onClose} aria-hidden="true" />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
