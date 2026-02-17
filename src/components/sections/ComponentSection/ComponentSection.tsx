import { motion } from "framer-motion";

const buttonVariants = [
  { name: "Default", classes: "bg-bf-text text-bf-bg border border-bf-text hover:opacity-90" },
  { name: "Outline", classes: "bg-transparent text-bf-text border border-bf-border hover:bg-bf-surface" },
  { name: "Ghost", classes: "bg-transparent text-bf-text border border-transparent hover:bg-bf-surface" },
  { name: "Link", classes: "bg-transparent text-bf-text underline-offset-4 hover:underline border border-transparent" },
];

const buttonSizes = [
  { name: "sm", classes: "h-9 px-3 text-sm rounded-sm" },
  { name: "default", classes: "h-10 px-4 text-sm rounded-md" },
  { name: "lg", classes: "h-12 px-6 text-sm rounded-lg" },
];

const stickyNotes = [
  { variant: "warning", bg: "bg-bf-note-warning", title: "BROKEN SOFTWARE", body: "We can fix it. No extra charge.", rotation: "rotate-2" },
  { variant: "success", bg: "bg-bf-note-success", title: "100% SATISFACTION", body: "Guaranteed or your money back.", rotation: "-rotate-1" },
  { variant: "highlight", bg: "bg-bf-note-highlight", title: "VANTA PARTNER", body: "Enterprise-grade security built in.", rotation: "rotate-1" },
];

export function ComponentSection() {
  return (
    <section id="components" className="relative z-[60] px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 200px)" }}>
        <div className="sticky top-6 bg-bf-dark-bg rounded-xl shadow-float overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-dark-text mb-3">Components</h2>
                <p className="text-base text-bf-dark-muted max-w-xl">Button variants, sticky notes, and card patterns defined by CVA.</p>
              </motion.div>

              {/* Button Variants Grid */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">Button Variants</h3>
                <div className="grid grid-cols-4 gap-3">
                  {buttonVariants.map((variant) => (
                    <div key={variant.name} className="space-y-2">
                      <p className="text-xs text-bf-dark-muted mb-2">{variant.name}</p>
                      {buttonSizes.map((size) => (
                        <button
                          key={`${variant.name}-${size.name}`}
                          className={`w-full inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 ${variant.classes} ${size.classes}`}
                        >
                          {size.name === "sm" ? "Small" : size.name === "lg" ? "Large" : "Button"}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky Notes */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">Sticky Notes</h3>
                <div className="flex gap-6 justify-center">
                  {stickyNotes.map((note, index) => (
                    <motion.div
                      key={note.variant}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, x: -2, y: -2 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className={`${note.bg} ${note.rotation} border-4 border-black shadow-comic p-5 w-64 cursor-pointer`}
                    >
                      <p className="font-black text-lg uppercase tracking-tight text-bf-text mb-2">{note.title}</p>
                      <p className="font-bold text-sm leading-snug text-bf-text/80 mb-3">{note.body}</p>
                      <span className="inline-block font-black text-xs uppercase tracking-wide border-2 border-black px-3 py-1.5 text-bf-text">
                        Learn More &rarr;
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Card Patterns */}
              <div>
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">Card Patterns</h3>
                <div className="grid grid-cols-3 gap-4">
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
        </div>
      </div>
    </section>
  );
}
