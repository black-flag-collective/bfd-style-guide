import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

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
    <section id="voice" className="relative bg-bf-paper border-t-4 border-bf-slate py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="12"
                title="Voice & Tone"
                description="Lead with playful confidence. Follow with professional substance. Never corporate-speak. Never fake positivity."
              />

              {/* Do / Don't Examples */}
              <div className="space-y-4 mb-8">
                {examples.map((example, index) => (
                  <motion.div
                    key={example.principle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                  >
                    <div className="bg-bf-mint/10 border border-bf-mint/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-bf-mint flex items-center justify-center">
                          <Check size={12} strokeWidth={2.5} className="text-white" />
                        </div>
                        <span className="text-xs font-medium text-bf-text uppercase tracking-wider">Do &mdash; {example.principle}</span>
                      </div>
                      <p className="text-sm text-bf-text font-medium leading-relaxed">&ldquo;{example.doText}&rdquo;</p>
                    </div>
                    <div className="bg-bf-crimson/10 border border-bf-crimson/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-bf-crimson flex items-center justify-center">
                          <X size={12} strokeWidth={2.5} className="text-white" />
                        </div>
                        <span className="text-xs font-medium text-bf-text uppercase tracking-wider">Don&rsquo;t</span>
                      </div>
                      <p className="text-sm text-bf-muted leading-relaxed">&ldquo;{example.dontText}&rdquo;</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tone Spectrum */}
              <div>
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Tone Spectrum</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
    </section>
  );
}
