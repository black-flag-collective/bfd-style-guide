import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const activeFont = {
  name: "Montserrat",
  foundry: "Google Fonts",
  style: "Geometric Sans-Serif",
};

const monoFont = {
  name: "JetBrains Mono",
  foundry: "JetBrains",
  style: "Monospace",
};

const typeScale = [
  {
    label: "Display",
    specimen: "Software so good you can't help but smile",
    size: "3rem",
    mobileSize: "2rem",
    lineHeight: "1.1",
    weight: 700,
    weightLabel: "Bold 700",
  },
  {
    label: "H1",
    specimen: "Broken software sucks. We fix it.",
    size: "1.5rem",
    lineHeight: "1.2",
    weight: 400,
    weightLabel: "Regular 400",
  },
  {
    label: "H2",
    specimen: "Everything your tech team should be",
    size: "1.25rem",
    lineHeight: "1.25",
    weight: 400,
    weightLabel: "Regular 400",
  },
  {
    label: "H3",
    specimen: "From idea to production at warp speed",
    size: "1.125rem",
    lineHeight: "1.3",
    weight: 500,
    weightLabel: "Medium 500",
  },
  {
    label: "Body",
    specimen:
      "We become your tech team. Something off? We fix it. No extra charge. Business idea to production services — that's what we do.",
    size: "0.875rem",
    lineHeight: "1.6",
    weight: 400,
    weightLabel: "Regular 400",
  },
  {
    label: "CTA",
    specimen: "Get started now",
    size: "0.875rem",
    lineHeight: "1",
    weight: 500,
    weightLabel: "Medium 500 / uppercase",
    uppercase: true,
    tracking: "0.05em",
  },
];

const weightShowcase = [
  { weight: 400, sample: "Regular" },
  { weight: 500, sample: "Medium" },
  { weight: 700, sample: "Bold" },
  { weight: 900, sample: "Black" },
];

const theme = {
  bg: "bg-bf-bg border-t-4 border-bf-cobalt",
  text: "#171717",
  muted: "#71717A",
  border: "border-bf-border/30",
  labelBg: "bg-bf-surface",
  labelBorder: "border-bf-border",
  monoBg: "bg-bf-surface",
};

export function TypographySection() {
  return (
    <section id="typography" className={`relative ${theme.bg} py-16 sm:py-24`}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="mb-12 sm:mb-16"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ color: theme.muted }}>03</span>
                  <div className={`h-px flex-1 max-w-16 sm:max-w-24 ${theme.border}`} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div>
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1"
                      style={{ color: theme.text }}
                    >
                      Typography
                    </h2>
                    <p
                      className="text-base max-w-xl"
                      style={{ color: theme.muted }}
                    >
                      Montserrat + JetBrains Mono. Weight-driven hierarchy.
                    </p>
                  </div>
                </div>

                {/* Font meta */}
                <div className="hidden sm:flex items-center gap-6 flex-shrink-0 pt-1">
                  <div className="text-right">
                    <p className="text-sm font-semibold" style={{ color: theme.text }}>
                      {activeFont.name}
                    </p>
                    <p className="text-[10px]" style={{ color: theme.muted }}>
                      {activeFont.foundry} &middot; {activeFont.style}
                    </p>
                  </div>
                  <div className={`w-px h-8 ${theme.border}`} />
                  <div className="text-right">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: theme.text, fontFamily: "var(--font-mono)" }}
                    >
                      {monoFont.name}
                    </p>
                    <p className="text-[10px]" style={{ color: theme.muted }}>
                      {monoFont.foundry} &middot; {monoFont.style}
                    </p>
                  </div>
                </div>
                </div>
              </motion.div>

              {/* Type scale specimens */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex-1 space-y-6 sm:space-y-8"
              >
                {typeScale.map((item) => (
                  <div key={item.label}>
                    {/* Label pill */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${theme.labelBg} ${theme.labelBorder}`}
                        style={{ color: theme.muted }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: theme.muted }}
                      >
                        {item.size} / {item.weightLabel}
                      </span>
                    </div>

                    {/* Specimen */}
                    <p
                      className="max-w-3xl"
                      style={{
                        color: theme.text,
                        fontSize: ("mobileSize" in item && item.mobileSize)
                          ? `clamp(${(item as any).mobileSize}, 5vw, ${item.size})`
                          : item.size,
                        lineHeight: item.lineHeight,
                        fontWeight: item.weight,
                        textTransform: item.uppercase ? "uppercase" : "none",
                        letterSpacing: item.tracking ?? "normal",
                      }}
                    >
                      {item.specimen}
                    </p>
                  </div>
                ))}

                {/* Mono specimen */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${theme.labelBg} ${theme.labelBorder}`}
                      style={{ color: theme.muted }}
                    >
                      Mono
                    </span>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: theme.muted }}
                    >
                      0.8125rem / Regular 400
                    </span>
                  </div>
                  <p
                    className={`rounded-lg px-4 py-3 ${theme.monoBg}`}
                    style={{
                      color: theme.text,
                      fontSize: "0.8125rem",
                      lineHeight: "1.6",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    const fixBrokenSoftware = async (client: Client) =&gt; &#123;
                    <br />
                    &nbsp;&nbsp;return await deploy(client.project, &#123; fast: true &#125;);
                    <br />
                    &#125;;
                  </p>
                </div>
              </motion.div>

              {/* Weights strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease }}
                className={`mt-6 sm:mt-8 pt-4 border-t ${theme.border}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: theme.muted }}
                  >
                    Weights
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    {weightShowcase.map((w) => (
                      <div key={w.weight} className="flex items-baseline gap-2">
                        <span
                          className="text-base sm:text-lg"
                          style={{ color: theme.text, fontWeight: w.weight }}
                        >
                          {w.sample}
                        </span>
                        <span
                          className="text-[10px] sm:text-xs font-mono"
                          style={{ color: theme.muted }}
                        >
                          {w.weight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
        </div>
      </div>
    </section>
  );
}
