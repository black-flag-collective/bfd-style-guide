import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const timingSpecs = [
  { name: "Interaction", value: "0.2s ease-in-out", usage: "Buttons, links, inputs" },
  { name: "Scroll Entrance", value: "0.8s cubic-bezier(0.4, 0, 0.2, 1)", usage: "Fade-in-up, scale-in" },
  { name: "Stagger Increment", value: "0.1s per child", usage: "Sequential child reveals" },
  { name: "Transform", value: "0.3s ease-out", usage: "Hover scale, translate" },
  { name: "Framer Motion", value: "[0.16, 1, 0.3, 1]", usage: "Section animations" },
  { name: "Marquee", value: "60s linear infinite", usage: "Scrolling text" },
];

export function MotionSection() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <section id="motion" className="relative z-50 px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 200px)" }}>
        <div className="sticky top-6 bg-bf-bg rounded-xl shadow-card overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-2">Motion</h2>
                  <p className="text-base text-bf-muted">Animation timing, easing, and interaction patterns.</p>
                </div>
                <button
                  onClick={() => setReplayKey((k) => k + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-bf-text text-bf-bg rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Play className="w-3.5 h-3.5" /> Replay
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" key={replayKey}>
                {/* Fade In Up */}
                <div className="bg-bf-surface rounded-lg p-6">
                  <h3 className="text-sm font-medium text-bf-text mb-3 uppercase tracking-wider">Fade In Up</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="h-16 bg-bf-text rounded-lg flex items-center justify-center"
                  >
                    <span className="text-bf-bg text-sm font-medium">0.8s / cubic-bezier(0.4, 0, 0.2, 1)</span>
                  </motion.div>
                </div>

                {/* Stagger Children */}
                <div className="bg-bf-surface rounded-lg p-6">
                  <h3 className="text-sm font-medium text-bf-text mb-3 uppercase tracking-wider">Stagger Children</h3>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 h-16 bg-bf-text rounded-lg"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-bf-muted mt-2">0.1s increment per child</p>
                </div>

                {/* Hover Scale */}
                <div className="bg-bf-surface rounded-lg p-6">
                  <h3 className="text-sm font-medium text-bf-text mb-3 uppercase tracking-wider">Hover Scale</h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-16 bg-bf-text rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-bf-bg text-sm font-medium">Hover me &mdash; scale 1.05</span>
                  </motion.div>
                </div>

                {/* Comic Shadow Hover */}
                <div className="bg-bf-surface rounded-lg p-6">
                  <h3 className="text-sm font-medium text-bf-text mb-3 uppercase tracking-wider">Comic Shadow</h3>
                  <motion.div
                    whileHover={{ x: -2, y: -2 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-16 bg-bf-note-warning border-3 border-black shadow-comic rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-bf-text text-sm font-bold">4px 4px 0px 0px rgba(0,0,0,0.95)</span>
                  </motion.div>
                </div>
              </div>

              {/* Marquee Demo */}
              <div className="bg-bf-surface rounded-lg p-4 mb-6 overflow-hidden">
                <h3 className="text-sm font-medium text-bf-text mb-3 uppercase tracking-wider">Marquee &mdash; 60s linear infinite</h3>
                <div className="overflow-hidden relative hover:[&>div]:pause" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                  <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
                    {Array.from({ length: 2 }).map((_, setIdx) =>
                      ["Black Flag Design", "\u2022", "Software so good you can\u2019t help but smile", "\u2022", "Playful Confidence", "\u2022", "Direct, No-BS", "\u2022"].map((text, i) => (
                        <span key={`${setIdx}-${i}`} className="text-lg font-bold text-bf-text">{text}</span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Timing Reference Table */}
              <div>
                <h3 className="text-sm font-medium text-bf-text mb-3 uppercase tracking-wider">Timing Reference</h3>
                <div className="space-y-1">
                  {timingSpecs.map((spec) => (
                    <div key={spec.name} className="grid grid-cols-[8rem_1fr_1fr] gap-4 items-center py-1.5 border-b border-bf-border/30 last:border-0">
                      <span className="text-sm font-medium text-bf-text">{spec.name}</span>
                      <span className="text-xs font-mono text-bf-muted">{spec.value}</span>
                      <span className="text-xs text-bf-muted">{spec.usage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
