import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colorCategories = {
  base: {
    label: "Base",
    percentage: "80%",
    description: "Monochromatic foundation. The workhorse neutrals that make up the majority of every screen.",
    colors: [
      { name: "Background", hex: "#FFFFFF", hsl: "hsl(0, 0%, 100%)", usage: "Page background" },
      { name: "Surface", hex: "#FAFAFA", hsl: "hsl(0, 0%, 98%)", usage: "Card/surface fill" },
      { name: "Text", hex: "#171717", hsl: "hsl(0, 0%, 9%)", usage: "Primary text, logo dark variant" },
      { name: "Muted", hex: "#737373", hsl: "hsl(0, 0%, 45%)", usage: "Secondary/muted text" },
      { name: "Border", hex: "#E5E5E5", hsl: "hsl(0, 0%, 90%)", usage: "Borders, dividers" },
    ],
  },
  accent: {
    label: "Accent",
    percentage: "10%",
    description: "Brand ink and warm paper tones. Subtle differentiation from pure neutrals.",
    colors: [
      { name: "Accent Ink", hex: "#181B20", hsl: "hsl(220, 13%, 11%)", usage: "Brand ink / dark accent" },
      { name: "Paper", hex: "#F8F7F6", hsl: "hsl(30, 8%, 97%)", usage: "Off-white paper background" },
      { name: "Button", hex: "#171717", hsl: "hsl(0, 0%, 9%)", usage: "Primary button bg" },
      { name: "Button Text", hex: "#FFFFFF", hsl: "hsl(0, 0%, 100%)", usage: "Primary button label" },
    ],
  },
  pop: {
    label: "Pop",
    percentage: "10%",
    description: "Playful accent colors for personality moments. Used sparingly for maximum impact.",
    colors: [
      { name: "Yellow", hex: "#FFC800", hsl: "hsl(48, 100%, 50%)", usage: "Yellow sticky note, warnings" },
      { name: "Green", hex: "#5AE09A", hsl: "hsl(142, 76%, 60%)", usage: "Green sticky note, success" },
      { name: "Purple", hex: "#7B3EC4", hsl: "hsl(270, 60%, 52%)", usage: "Purple sticky note, highlights" },
      { name: "Destructive", hex: "#E04848", hsl: "hsl(0, 75%, 60%)", usage: "Error/destructive actions" },
    ],
  },
};

type CategoryKey = keyof typeof colorCategories;
const categoryOrder: CategoryKey[] = ["base", "accent", "pop"];

export function ColorSection() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("base");
  const [userOverride, setUserOverride] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef<number>(window.scrollY);
  const activeCategory = colorCategories[activeTab];

  const handleTabClick = (key: CategoryKey) => {
    setActiveTab(key);
    setUserOverride(true);
    lastScrollYRef.current = window.scrollY;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (userOverride) {
        if (Math.abs(window.scrollY - lastScrollYRef.current) > 50) setUserOverride(false);
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const tabIndex = Math.min(categoryOrder.length - 1, Math.floor(scrollProgress * categoryOrder.length));
      const newTab = categoryOrder[tabIndex];
      if (newTab !== activeTab) setActiveTab(newTab);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, userOverride]);

  return (
    <section id="colors" className="relative z-30 px-6 pt-6" ref={sectionRef}>
      <div className="relative" style={{ height: `calc(100vh * ${categoryOrder.length})` }}>
        <div className="sticky top-6 bg-bf-bg rounded-xl shadow-card overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-2">Color</h2>
                  <p className="text-base text-bf-muted">Monochromatic base with playful accent pops.</p>
                </div>
                <nav className="flex-shrink-0 relative z-10">
                  <div className="flex items-center gap-1.5 p-1.5 bg-bf-surface/60 backdrop-blur-sm border border-bf-border/30 rounded-lg" role="tablist" aria-label="Color categories">
                    {categoryOrder.map((key) => {
                      const cat = colorCategories[key];
                      const isActive = activeTab === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => handleTabClick(key)}
                          className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md cursor-pointer ${isActive ? "bg-bf-bg text-bf-text shadow-card" : "text-bf-muted hover:text-bf-text hover:bg-bf-bg/50"}`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </nav>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-xl font-medium text-bf-text">{activeCategory.label} Colors</h3>
                    <span className="text-xs font-medium text-bf-bg px-3 py-1 bg-bf-text rounded-md">{activeCategory.percentage}</span>
                  </div>
                  <p className="text-sm text-bf-muted mb-6">{activeCategory.description}</p>
                  <div className="space-y-2">
                    {activeCategory.colors.map((color, index) => (
                      <motion.div
                        key={color.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-[4rem_8rem_5rem_1fr] gap-4 items-center py-2 border-b border-bf-border/30 last:border-0 group"
                      >
                        <div className="w-14 h-10 rounded-md shadow-sm transition-all duration-300 group-hover:shadow-md flex-shrink-0" style={{ backgroundColor: color.hex }} />
                        <span className="text-sm font-medium text-bf-text">{color.name}</span>
                        <span className="text-xs font-mono text-bf-muted">{color.hex}</span>
                        <span className="text-sm text-bf-muted">{color.usage}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
