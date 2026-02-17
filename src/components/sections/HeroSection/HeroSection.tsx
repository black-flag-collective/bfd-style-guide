import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.querySelector("#logo");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="welcome" className="relative z-10 px-6 pt-6">
      <div
        className="bg-bf-bg rounded-xl shadow-card overflow-hidden"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <div className="h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 md:mb-16 flex items-center gap-6"
            >
              <BrandLogo variant="dark" size="md" />
              <div className="h-10 w-px bg-bf-border" />
              <span className="text-2xl md:text-3xl font-medium tracking-tight text-bf-text">
                Black Flag Design
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] md:text-5xl lg:text-6xl font-bold text-bf-text leading-tight mb-10 md:mb-12"
            >
              Software so good you can&rsquo;t help but smile
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium tracking-widest uppercase text-bf-text">
                  Brand Guidelines
                </span>
                <div className="h-px flex-1 bg-bf-border max-w-24" />
              </div>
              <p className="text-lg text-bf-muted leading-relaxed max-w-2xl">
                Welcome to the Black Flag Design brand guidelines. They define
                our visual identity, component language, and voice. Use your best
                judgement and reference this document as the canonical source.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
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
              <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
