import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EventDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: ReactNode;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: "100%", transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export function EventDrawer({
  open,
  onClose,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  children,
}: EventDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-[201] flex h-full w-[90vw] max-w-2xl flex-col shadow-2xl"
            style={{ backgroundColor: "var(--bf-bg)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid var(--bf-border)" }}
            >
              <div>
                <h4 className="text-base font-semibold" style={{ color: "var(--bf-text)" }}>
                  {title}
                </h4>
                {subtitle && (
                  <p className="mt-0.5 text-xs" style={{ color: "var(--bf-muted)" }}>
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 transition-colors hover:bg-bf-surface"
                style={{ color: "var(--bf-muted)" }}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Tabs */}
            {tabs.length > 1 && (
              <div className="px-6 pt-4 pb-2">
                <div
                  className="flex gap-1 rounded-md p-1"
                  style={{ backgroundColor: "var(--bf-surface)" }}
                >
                  {tabs.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => onTabChange(i)}
                      className={`flex-1 rounded-sm py-1.5 text-xs font-medium transition-all ${
                        i === activeTab ? "bg-bf-text text-white" : ""
                      }`}
                      style={i !== activeTab ? { color: "var(--bf-muted)" } : undefined}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
