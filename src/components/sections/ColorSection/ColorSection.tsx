import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const colorCategories = {
  base: {
    label: "Foundation",
    percentage: "60%",
    description: "The Ship — cool zinc grays. Sharp, engineered, zero warmth. Every screen feels intentional and professional, like precision-machined steel.",
    colors: [
      { name: "Zinc 100", hex: "#F4F4F5", persona: "The Harbor", usage: "Primary background — cool, professional canvas" },
      { name: "Zinc 200", hex: "#E4E4E7", persona: "The Hull", usage: "Surfaces, sidebars, recessed panels" },
      { name: "Zinc 50", hex: "#FAFAFA", persona: "The Chart", usage: "Elevated panels, headers, active states" },
      { name: "Ink", hex: "#171717", persona: "The Flag", usage: "Primary text — bold, uncompromising" },
      { name: "Zinc 500", hex: "#71717A", persona: "The Helm", usage: "Secondary text, muted labels" },
      { name: "Zinc 300", hex: "#D4D4D8", persona: "The Rigging", usage: "Borders, dividers, structural lines" },
    ],
  },
  accent: {
    label: "Brand",
    percentage: "15%",
    description: "The Officers — brand identity elements. The flag, the seal, the signature. Authoritative and uncompromising.",
    colors: [
      { name: "Brand Ink", hex: "#18181B", persona: "The Seal", usage: "Brand dark accent, authority" },
      { name: "Flag Black", hex: "#171717", persona: "The Standard", usage: "Primary button, CTA background" },
      { name: "Clean White", hex: "#FAFAFA", persona: "The Signal", usage: "Button text — crisp on dark" },
    ],
  },
  crew: {
    label: "Crew",
    percentage: "25%",
    description: "Every crew member has a job. Bold, grungy, unapologetic state colors for an enterprise app that doesn't pretend to be something it's not.",
    colors: [
      { name: "Gold", hex: "#FFC800", persona: "The Lookout", usage: "Warnings, caution, attention" },
      { name: "Mint", hex: "#5AE09A", persona: "The Medic", usage: "Success, healthy, online, all-clear" },
      { name: "Royal", hex: "#7B3EC4", persona: "The Navigator", usage: "Highlights, premium, special" },
      { name: "Crimson", hex: "#E04848", persona: "The Cannon", usage: "Errors, danger, delete" },
      { name: "Cobalt", hex: "#3B6CE7", persona: "The Compass", usage: "Info, links, focus, guidance" },
      { name: "Amber", hex: "#E89020", persona: "The Forge", usage: "Pending, processing, in-progress" },
      { name: "Teal", hex: "#2BB5A0", persona: "The Tide", usage: "Active, online, connected, live" },
      { name: "Rose", hex: "#D94F8C", persona: "The Signal Flag", usage: "Notifications, badges, unread" },
      { name: "Slate", hex: "#64748B", persona: "The Anchor", usage: "Archived, disabled, at rest" },
    ],
  },
};

type CategoryKey = keyof typeof colorCategories;
const categoryOrder: CategoryKey[] = ["base", "accent", "crew"];

export function ColorSection() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("base");
  const activeCategory = colorCategories[activeTab];

  const handleTabClick = (key: CategoryKey) => setActiveTab(key);

  return (
    <section id="colors" className="relative bg-white border-t-4 border-bf-gold py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="02"
                title="Color"
                description="Cool zinc foundation. Bold crew state colors. Engineered, not decorated."
              />
              <nav className="flex-shrink-0 relative z-10 -mt-6 sm:-mt-8 mb-10">
                <div className="flex items-center gap-1 p-1 bg-bf-paper border border-bf-border rounded-lg w-fit" role="tablist" aria-label="Color categories">
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
                        className={`px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md cursor-pointer ${isActive ? "btn-active" : "text-bf-muted hover:text-bf-text hover:bg-bf-paper/40"}`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </nav>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-sm font-medium text-bf-text uppercase tracking-wider">{activeCategory.label} Colors</h3>
                    <span className="text-xs font-medium px-3 py-1 btn-active rounded-md">{activeCategory.percentage}</span>
                  </div>
                  <p className="text-sm text-bf-muted mb-6">{activeCategory.description}</p>
                  <div className="space-y-2">
                    {activeCategory.colors.map((color, index) => (
                      <motion.div
                        key={color.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden md:grid grid-cols-[4rem_8rem_7rem_5rem_1fr] gap-4 items-center py-2.5 border-b border-bf-border/30 last:border-0 group"
                      >
                        <div className="w-14 h-10 rounded-md shadow-sm transition-all duration-300 group-hover:shadow-md flex-shrink-0 border border-bf-border/20" style={{ backgroundColor: color.hex }} />
                        <span className="text-sm font-medium text-bf-text">{color.name}</span>
                        <span className="text-[11px] font-mono text-bf-royal italic">{color.persona}</span>
                        <span className="text-xs font-mono text-bf-muted">{color.hex}</span>
                        <span className="text-sm text-bf-muted">{color.usage}</span>
                      </motion.div>
                    ))}
                    {activeCategory.colors.map((color, index) => (
                      <motion.div
                        key={`mobile-${color.name}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden flex items-center gap-3 py-2.5 border-b border-bf-border/30 last:border-0 group"
                      >
                        <div className="w-10 h-10 rounded-md shadow-sm flex-shrink-0 border border-bf-border/20" style={{ backgroundColor: color.hex }} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium text-bf-text">{color.name}</span>
                            <span className="text-xs font-mono text-bf-muted">{color.hex}</span>
                          </div>
                          <span className="text-[11px] font-mono text-bf-royal italic">{color.persona}</span>
                          <span className="block text-xs text-bf-muted mt-0.5">{color.usage}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
