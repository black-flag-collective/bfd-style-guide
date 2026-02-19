import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.querySelector("#logo");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="welcome" className="relative bg-bf-bg min-h-screen">
      <div className="flex flex-col min-h-screen px-6 sm:px-12 md:px-20 lg:px-28">
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 sm:pt-14 md:pt-16 flex items-center gap-4 sm:gap-5"
          >
            <img
              src="/logos/silly-face-dark.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 object-contain"
              style={{ opacity: 0.55 }}
            />
            <div className="h-7 sm:h-8 w-px bg-bf-border" />
            <span className="text-sm sm:text-base font-medium tracking-tight text-bf-muted">
              Black Flag Design
            </span>
          </motion.div>

          {/* Zone 2: Main content — centered in remaining space */}
          <div className="flex-1 flex flex-col justify-center -mt-4 sm:-mt-6">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mb-5 sm:mb-6 md:mb-8"
              >
                <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-bf-muted">
                  Brand Guidelines
                </span>
                <div className="h-px flex-1 bg-bf-border max-w-16 sm:max-w-24" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold text-bf-text leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)" }}
              >
                Software so good you can&rsquo;t help but smile
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-bf-muted leading-relaxed max-w-lg sm:max-w-xl"
                style={{ marginTop: "clamp(4rem, 8vw, 10rem)" }}
              >
                Visual identity, component language, and voice. Reference this
                document as the canonical source.
              </motion.p>
            </div>
          </div>

          {/* Zone 3: Scroll cue — anchored at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="pb-8 sm:pb-10 flex justify-center"
          >
            <button
              onClick={scrollToContent}
              className="text-bf-muted hover:text-bf-text transition-colors"
              aria-label="Scroll to content"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={20} strokeWidth={1.5} />
              </motion.div>
            </button>
          </motion.div>
      </div>
    </section>
  );
}
