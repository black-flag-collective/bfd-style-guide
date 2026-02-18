import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuOverlay } from "@/components/effects";

const navItems = [
  { label: "Welcome", href: "#welcome" },
  { label: "Logo", href: "#logo" },
  { label: "Colors", href: "#colors" },
  { label: "Typography", href: "#typography" },
  { label: "Motion", href: "#motion" },
  { label: "Components", href: "#components" },
  { label: "Forms", href: "#forms" },
  { label: "Surfaces", href: "#surfaces" },
  { label: "Feedback", href: "#feedback" },
  { label: "Navigation", href: "#navigation" },
  { label: "Vendors", href: "#vendor-logos" },
  { label: "Data", href: "#data-patterns" },
  { label: "Voice", href: "#voice" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6">
        <div className="flex items-center justify-end gap-3">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
              isOpen
                ? "bg-bf-text"
                : "bg-bf-bg shadow-card hover:shadow-card-hover hover:scale-[1.02]"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X size={20} strokeWidth={1.75} className="text-white" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} strokeWidth={1.75} className="text-bf-text" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      <MenuOverlay
        isOpen={isOpen}
        backgroundColor="rgba(240, 238, 233, 0.98)"
        blurAmount={12}
        showCorners={true}
        showDiagonals={false}
        accentColor="rgba(23, 23, 23, 0.06)"
      >
        <nav className="flex h-full flex-col items-center justify-center gap-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => scrollToSection(item.href)}
              className="text-lg md:text-xl font-medium text-bf-muted px-6 py-2.5 rounded-lg transition-all duration-200 hover:bg-bf-text hover:text-white"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </MenuOverlay>
    </>
  );
}
