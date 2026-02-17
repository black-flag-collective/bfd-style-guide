import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const examples = [
  {
    doText: "Software so good you can't help but smile.",
    dontText: "We are a leading provider of innovative software solutions.",
    principle: "Playful Confidence",
  },
  {
    doText: "Broken software sucks. We can fix it.",
    dontText: "Our team has identified several areas of improvement in your current technology stack.",
    principle: "Direct, No-BS",
  },
  {
    doText: "We become your tech team. Something off? We fix it. No extra charge.",
    dontText: "Our comprehensive service level agreement covers a wide range of support scenarios.",
    principle: "Partner-First",
  },
  {
    doText: "Business idea to production services at warp speed.",
    dontText: "We employ agile methodologies to accelerate your digital transformation journey.",
    principle: "Speed-Focused",
  },
];

const toneSpectrum = [
  { label: "Playful", description: "Sticky notes, bold claims, exclamation points, humor" },
  { label: "Confident", description: "Direct statements, no hedging, clear value propositions" },
  { label: "Professional", description: "Process explanations, technical credibility, structured info" },
  { label: "Partner", description: "Inclusive language, shared goals, commitment statements" },
];

export function VoiceSection() {
  return (
    <section id="voice" className="relative z-[70] px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 200px)" }}>
        <div className="sticky top-6 bg-bf-bg rounded-xl shadow-card overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">Voice &amp; Tone</h2>
                <p className="text-base text-bf-muted max-w-xl">
                  Lead with playful confidence. Follow with professional substance. Never corporate-speak. Never fake positivity.
                </p>
              </motion.div>

              {/* Do / Don't Examples */}
              <div className="space-y-4 mb-8">
                {examples.map((example, index) => (
                  <motion.div
                    key={example.principle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="grid grid-cols-[1fr_1fr] gap-4"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-medium text-green-700 uppercase tracking-wider">Do &mdash; {example.principle}</span>
                      </div>
                      <p className="text-sm text-bf-text font-medium leading-relaxed">&ldquo;{example.doText}&rdquo;</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <X className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-medium text-red-700 uppercase tracking-wider">Don&rsquo;t</span>
                      </div>
                      <p className="text-sm text-bf-muted leading-relaxed">&ldquo;{example.dontText}&rdquo;</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tone Spectrum */}
              <div>
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Tone Spectrum</h3>
                <div className="grid grid-cols-4 gap-3">
                  {toneSpectrum.map((tone, index) => (
                    <motion.div
                      key={tone.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className="bg-bf-surface rounded-lg p-4 border border-bf-border/50"
                    >
                      <h4 className="text-sm font-medium text-bf-text mb-1">{tone.label}</h4>
                      <p className="text-xs text-bf-muted leading-relaxed">{tone.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Golden Rule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mt-8 bg-bf-note-warning border-3 border-black shadow-comic p-6"
              >
                <p className="font-black text-lg uppercase tracking-tight text-bf-text mb-2">The Golden Rule</p>
                <p className="font-bold text-sm leading-snug text-bf-text/80">
                  If it sounds like it came from a corporate marketing department, rewrite it.
                  If it sounds like something a smart friend would say, ship it.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
