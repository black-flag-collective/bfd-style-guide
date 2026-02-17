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
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="flex items-center justify-end gap-3">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-12 w-12 items-center justify-center bg-bf-bg rounded-lg shadow-card transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X className="h-5 w-5 text-bf-text" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-5 w-5 text-bf-text" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      <MenuOverlay isOpen={isOpen} showCorners={true} showDiagonals={true} accentColor="rgba(255, 255, 255, 0.15)">
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => scrollToSection(item.href)}
              className="text-4xl font-medium text-bf-dark-muted transition-colors hover:text-bf-dark-text md:text-5xl"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </MenuOverlay>
    </>
  );
}
