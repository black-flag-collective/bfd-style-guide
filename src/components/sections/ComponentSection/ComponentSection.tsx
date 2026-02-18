import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const buttonVariants = [
  {
    name: "Default",
    desc: "Primary action",
    classes: "bg-[#F0EEE9] text-[#1A1816] border-2 border-[#F0EEE9] hover:bg-[#F0EEE9]/90",
  },
  {
    name: "Outline",
    desc: "Secondary action",
    classes: "bg-transparent text-[#F0EEE9] border-2 border-[#F0EEE9]/40 hover:border-[#F0EEE9]/70 hover:bg-[#F0EEE9]/10",
  },
  {
    name: "Ghost",
    desc: "Tertiary action",
    classes: "bg-transparent text-[#F0EEE9]/80 border-2 border-transparent hover:bg-[#F0EEE9]/10 hover:text-[#F0EEE9]",
  },
  {
    name: "Link",
    desc: "Inline action",
    classes: "bg-transparent text-[#F0EEE9]/80 border-2 border-transparent underline underline-offset-4 decoration-[#F0EEE9]/30 hover:text-[#F0EEE9] hover:decoration-[#F0EEE9]/60",
  },
];

const buttonSizes = [
  { name: "Small", key: "sm", classes: "h-8 px-3 text-xs rounded-sm" },
  { name: "Button", key: "default", classes: "h-10 px-4 text-sm rounded-md" },
  { name: "Large", key: "lg", classes: "h-12 px-6 text-base rounded-lg" },
];

const stickyNotes = [
  {
    variant: "warning",
    bg: "bg-bf-note-warning",
    textColor: "text-bf-text",
    bodyColor: "text-bf-text/80",
    borderColor: "border-bf-text",
    btnBorder: "border-bf-text",
    btnText: "text-bf-text",
    title: "BROKEN SOFTWARE",
    body: "We can fix it. No extra charge.",
    rotation: "rotate-2",
  },
  {
    variant: "success",
    bg: "bg-bf-note-success",
    textColor: "text-bf-text",
    bodyColor: "text-bf-text/80",
    borderColor: "border-bf-text",
    btnBorder: "border-bf-text",
    btnText: "text-bf-text",
    title: "100% SATISFACTION",
    body: "Guaranteed or your money back.",
    rotation: "-rotate-1",
  },
  {
    variant: "highlight",
    bg: "bg-[#7B3EC4]",
    textColor: "text-[#F0EEE9]",
    bodyColor: "text-[#F0EEE9]/80",
    borderColor: "border-[#F0EEE9]",
    btnBorder: "border-[#F0EEE9]",
    btnText: "text-[#F0EEE9]",
    title: "VANTA PARTNER",
    body: "Enterprise-grade security built in.",
    rotation: "rotate-1",
  },
];

export function ComponentSection() {
  return (
    <section id="components" className="relative bg-bf-dark-bg py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader number="05" title="Components" description="Button variants, sticky notes, and card patterns defined by CVA." dark={true} />

              {/* Button Variants Table */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">Button Variants</h3>

                {/* Desktop: Matrix grid */}
                <div className="hidden sm:block">
                  <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr] gap-3 mb-3">
                    <div />
                    {buttonVariants.map((variant) => (
                      <div key={variant.name} className="text-center">
                        <p className="text-xs font-semibold text-bf-dark-text tracking-wide">{variant.name}</p>
                        <p className="text-[10px] text-bf-dark-muted mt-0.5">{variant.desc}</p>
                      </div>
                    ))}
                  </div>
                  {buttonSizes.map((size) => (
                    <div key={size.key} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr] gap-3 mb-2">
                      <div className="flex items-center">
                        <p className="text-xs text-bf-dark-muted font-medium">{size.name}</p>
                      </div>
                      {buttonVariants.map((variant) => (
                        <button
                          key={`${variant.name}-${size.key}`}
                          className={`w-full inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 cursor-default ${variant.classes} ${size.classes}`}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Mobile: Stacked by variant */}
                <div className="sm:hidden space-y-4">
                  {buttonVariants.map((variant) => (
                    <div key={variant.name}>
                      <p className="text-xs font-semibold text-bf-dark-text tracking-wide mb-1">{variant.name}</p>
                      <p className="text-[10px] text-bf-dark-muted mb-2">{variant.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {buttonSizes.map((size) => (
                          <button
                            key={`${variant.name}-${size.key}`}
                            className={`inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 cursor-default ${variant.classes} ${size.classes}`}
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky Notes */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">Sticky Notes</h3>
                <div className="flex gap-6 sm:gap-8 justify-center flex-wrap items-start py-4">
                  {stickyNotes.map((note, index) => (
                    <motion.div
                      key={note.variant}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, x: -2, y: -2 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className={`${note.bg} ${note.rotation} ${note.borderColor} border-4 shadow-comic p-5 w-44 sm:w-48 aspect-square flex flex-col justify-between cursor-pointer shrink-0`}
                    >
                      <div>
                        <p className={`font-black text-sm uppercase tracking-tight ${note.textColor} mb-1.5 leading-tight`}>{note.title}</p>
                        <p className={`font-medium text-xs leading-snug ${note.bodyColor}`}>{note.body}</p>
                      </div>
                      <span className={`inline-block font-black text-[10px] uppercase tracking-wide border-2 ${note.btnBorder} px-2.5 py-1 ${note.btnText} w-fit`}>
                        Learn More &rarr;
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Card Patterns */}
              <div>
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">Card Patterns</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {["Light", "Dark", "Blur / Glass"].map((name, i) => {
                    const styles = [
                      "bg-bf-bg border-2 border-bf-border rounded-xl hover:border-bf-text/50 hover:shadow-lg",
                      "bg-bf-dark-surface border-2 border-bf-dark-border rounded-xl hover:border-white/30 hover:shadow-lg",
                      "bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/15",
                    ];
                    return (
                      <motion.div
                        key={name}
                        whileHover={{ y: -4 }}
                        className={`${styles[i]} p-5 transition-all duration-300 cursor-pointer`}
                      >
                        <p className={`text-sm font-medium mb-1 ${i === 0 ? "text-bf-text" : "text-bf-dark-text"}`}>{name}</p>
                        <p className={`text-xs ${i === 0 ? "text-bf-muted" : "text-bf-dark-muted"}`}>Hover to preview interaction</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
