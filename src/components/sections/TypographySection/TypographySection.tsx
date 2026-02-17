import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const activeFont = { name: "Montserrat", foundry: "Google Fonts", style: "Geometric Sans-Serif" };

const weightShowcase = [
  { weight: 400, label: "400", sample: "Regular" },
  { weight: 500, label: "500", sample: "Medium" },
  { weight: 700, label: "700", sample: "Bold" },
  { weight: 900, label: "900", sample: "Black" },
];

const typeScale = [
  { name: "Display", size: "3rem", lineHeight: "1.1", weight: 700, weightName: "Bold", usage: "Hero sections, major page titles" },
  { name: "H1", size: "1.5rem", lineHeight: "1.1", weight: 400, weightName: "Regular", usage: "Page headings" },
  { name: "H2", size: "1.25rem", lineHeight: "1.25", weight: 400, weightName: "Regular", usage: "Section headings" },
  { name: "H3", size: "1.125rem", lineHeight: "1.3", weight: 500, weightName: "Medium", usage: "Card titles" },
  { name: "Body", size: "0.875rem", lineHeight: "1.6", weight: 400, weightName: "Regular", usage: "Primary reading text" },
  { name: "CTA", size: "0.875rem", lineHeight: "1", weight: 500, weightName: "Medium", usage: "Buttons, action labels", isCta: true },
];

const cardThemes = {
  light: {
    card: "bg-bf-bg",
    title: "text-bf-text",
    subtitle: "text-bf-muted",
    fontName: "text-bf-text",
    fontMeta: "text-bf-muted",
    weightText: "text-bf-text",
    weightLabel: "text-bf-muted",
    scaleMono: "text-bf-muted",
    toggleBg: "bg-bf-surface hover:bg-bf-border",
    toggleIcon: "text-bf-muted",
    textMain: "text-bf-text",
    textSub: "text-bf-muted",
    borderColor: "border-bf-border/30",
  },
  dark: {
    card: "bg-bf-dark-bg",
    title: "text-bf-dark-text",
    subtitle: "text-bf-dark-muted",
    fontName: "text-bf-dark-text",
    fontMeta: "text-bf-dark-muted",
    weightText: "text-bf-dark-text",
    weightLabel: "text-bf-dark-muted",
    scaleMono: "text-bf-dark-muted",
    toggleBg: "bg-white/10 hover:bg-white/20",
    toggleIcon: "text-bf-dark-text",
    textMain: "text-bf-dark-text",
    textSub: "text-bf-dark-muted",
    borderColor: "border-white/10",
  },
};

type ThemeMode = "light" | "dark";

export function TypographySection() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const theme = cardThemes[themeMode];
  const isDark = themeMode === "dark";

  return (
    <section id="typography" className="relative z-40 px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 200px)" }}>
        <div
          className={`sticky top-6 ${theme.card} rounded-xl shadow-card overflow-hidden transition-colors duration-500`}
          style={{ height: "calc(100vh - 48px)" }}
        >
          <div className="h-full px-8 md:px-12 lg:px-16 pt-6 pb-4 flex flex-col overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start justify-between mb-4"
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setThemeMode(isDark ? "light" : "dark")}
                    className={`p-2 rounded-lg transition-all duration-300 ${theme.toggleBg}`}
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <motion.div initial={false} animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                      {isDark ? <Moon className={`w-4 h-4 ${theme.toggleIcon}`} /> : <Sun className={`w-4 h-4 ${theme.toggleIcon}`} />}
                    </motion.div>
                  </button>
                  <div>
                    <h2 className={`text-2xl font-bold ${theme.title} transition-colors duration-500`}>Typography</h2>
                    <p className={`text-xs ${theme.subtitle} transition-colors duration-500`}>Montserrat + JetBrains Mono. Weight-driven hierarchy.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-medium ${theme.fontName} transition-colors duration-500`}>{activeFont.name}</p>
                  <p className={`text-xs ${theme.fontMeta} transition-colors duration-500`}>{activeFont.foundry} &middot; {activeFont.style}</p>
                </div>
              </motion.div>

              <motion.div key={`scale-${themeMode}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex flex-col justify-between py-2">
                  {typeScale.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-6">
                      <p
                        className={`${theme.textMain} transition-colors duration-500`}
                        style={{ fontSize: item.size, lineHeight: item.lineHeight, fontWeight: item.weight, textTransform: item.isCta ? "uppercase" : "none", letterSpacing: item.isCta ? "0.025em" : "normal" }}
                      >
                        {item.name}
                      </p>
                      <p className={`text-xs ${theme.scaleMono} font-mono whitespace-nowrap transition-colors duration-500`}>
                        {item.size} / {item.weightName} {item.weight}{item.isCta ? " / uppercase" : ""}
                      </p>
                    </div>
                  ))}
                </div>
                <div className={`pt-3 border-t ${theme.borderColor} flex items-center justify-between`}>
                  <p className={`text-xs uppercase tracking-widest ${theme.textSub} transition-colors duration-500`}>Weights</p>
                  <div className="flex gap-8">
                    {weightShowcase.map((item) => (
                      <div key={item.label} className="flex items-baseline gap-2">
                        <span className={`text-base ${theme.weightText} transition-colors duration-500`} style={{ fontWeight: item.weight }}>{item.sample}</span>
                        <span className={`text-xs ${theme.weightLabel} transition-colors duration-500`}>{item.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
