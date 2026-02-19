import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { SectionHeader } from "@/components/SectionHeader";

const hierarchy = [
  {
    tier: "Primary",
    name: "Black Flag Mark",
    rule: "Default in product UI. Use this whenever the brand is already clear from context.",
  },
  {
    tier: "Secondary",
    name: "Black Flag Lockup",
    rule: "Use in headers, invoices, and first-impression moments where the full name must be visible.",
  },
  {
    tier: "Tertiary",
    name: "Silly Face",
    rule: "Character mark only. Use sparingly for playful moments, never as the default product logo.",
  },
];

const logoAssets = [
  { name: "Mark (Dark)", description: "Primary mark for light backgrounds", file: "/logos/mark-dark.svg", preview: "dark" as const },
  { name: "Mark (Light)", description: "Primary mark for dark backgrounds", file: "/logos/mark-light.svg", preview: "light" as const },
  { name: "Lockup (Dark)", description: "Wordmark + flag for light backgrounds", file: "/logos/lockup-dark.svg", preview: "dark" as const },
  { name: "Lockup (Light)", description: "Wordmark + flag for dark backgrounds", file: "/logos/lockup-light.svg", preview: "light" as const },
  { name: "Character (Dark)", description: "Mouth icon for light backgrounds", file: "/logos/silly-face-dark.png", preview: "dark" as const },
  { name: "Character (Light)", description: "Mouth icon for dark backgrounds", file: "/logos/silly-face-light.png", preview: "light" as const },
  { name: "Favicon", description: "Browser tab icon", file: "/favicon.svg", preview: "dark" as const },
];

const guidelines = [
  { title: "Clear Space", description: "Maintain clear space equal to mark height around the logo at all times." },
  { title: "Minimum Size", description: "Never smaller than 24x12px. Always maintain the 2:1 aspect ratio for the mark." },
  { title: "Aspect Ratio", description: "The mark is always 2:1 (width:height). No stretching, no exceptions." },
  { title: "Hierarchy", description: "Primary mark first, lockup second, silly face third. Do not invert this order." },
];

export function LogoSection() {
  const handleDownload = (file: string, name: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="logo" className="relative bg-bf-paper py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="01"
                title="Logo"
                description="Black Flag uses a strict logo hierarchy: mark first, lockup second, character mark third."
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
              >
                {hierarchy.map((item, index) => (
                  <div
                    key={item.tier}
                    className="bg-bf-paper rounded-lg px-4 py-3 border border-bf-border"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="text-[10px] text-bf-muted uppercase tracking-wider mb-1">{item.tier}</p>
                    <h3 className="text-sm font-medium text-bf-text mb-1">{item.name}</h3>
                    <p className="text-xs text-bf-muted leading-relaxed">{item.rule}</p>
                  </div>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-text rounded-lg p-4 md:p-6 flex flex-col items-center justify-center aspect-[4/3]"
                >
                  <BrandLogo variant="light" size="lg" className="h-10 md:h-16 lg:h-20" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-bg/60 uppercase tracking-wider">Primary Mark - Light on Dark</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-bg rounded-lg p-4 md:p-6 flex flex-col items-center justify-center shadow-card aspect-[4/3]"
                >
                  <BrandLogo variant="dark" size="lg" className="h-10 md:h-16 lg:h-20" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-muted uppercase tracking-wider">Primary Mark - Dark on Light</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-text rounded-lg p-4 md:p-6 flex flex-col items-center justify-center aspect-[4/3]"
                >
                  <img src="/logos/lockup-light.svg" alt="Black Flag lockup on dark background" className="w-[78%] max-w-[360px] h-auto" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-bg/60 uppercase tracking-wider">Secondary Lockup - Light on Dark</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-bg rounded-lg p-4 md:p-6 flex flex-col items-center justify-center shadow-card aspect-[4/3]"
                >
                  <img src="/logos/lockup-dark.svg" alt="Black Flag lockup on light background" className="w-[78%] max-w-[360px] h-auto" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-muted uppercase tracking-wider">Secondary Lockup - Dark on Light</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-text rounded-lg p-4 md:p-6 flex flex-col items-center justify-center aspect-[4/3]"
                >
                  <img src="/logos/silly-face-light.png" alt="Mouth character mark on dark background" className="h-16 md:h-20 w-auto" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-bg/60 uppercase tracking-wider">Character Mark - Light on Dark</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-bg rounded-lg p-4 md:p-6 flex flex-col items-center justify-center shadow-card aspect-[4/3]"
                >
                  <img src="/logos/silly-face-dark.png" alt="Mouth character mark on light background" className="h-16 md:h-20 w-auto" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-muted uppercase tracking-wider">Character Mark - Dark on Light</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Download Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {logoAssets.map((asset) => (
                    <button
                      key={asset.name}
                      onClick={() => handleDownload(asset.file, asset.file.split("/").pop() || asset.name)}
                      className="bg-bf-paper border border-bf-border rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center border ${asset.preview === "light" ? "bg-bf-text border-bf-text" : "bg-bf-bg border-bf-border"}`}>
                        <img src={asset.file} alt={asset.name} className="w-6 h-6 object-contain" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-bf-text font-medium">{asset.name}</p>
                        <p className="text-xs text-bf-muted">{asset.description}</p>
                      </div>
                      <Download size={16} strokeWidth={1.75} className="text-bf-muted group-hover:text-bf-text transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {guidelines.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="bg-bf-paper rounded-lg px-4 py-3 border border-bf-border"
                  >
                    <h3 className="text-sm font-medium text-bf-text mb-1">{item.title}</h3>
                    <p className="text-xs text-bf-muted leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
        </div>
      </div>
    </section>
  );
}
