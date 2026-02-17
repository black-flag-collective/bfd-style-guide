import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const logoAssets = [
  { name: "Mark (Dark)", description: "For light backgrounds", file: "/logos/mark-dark.svg", preview: "dark" as const },
  { name: "Mark (Light)", description: "For dark backgrounds", file: "/logos/mark-light.svg", preview: "light" as const },
  { name: "Favicon", description: "Browser tab icon", file: "/favicon.svg", preview: "dark" as const },
];

const guidelines = [
  { title: "Clear Space", description: "Maintain clear space equal to mark height around the logo at all times." },
  { title: "Minimum Size", description: "Never smaller than 24\u00d712px. Always maintain the 2:1 aspect ratio." },
  { title: "Aspect Ratio", description: "The mark is always 2:1 (width:height). No stretching, no exceptions." },
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
    <section id="logo" className="relative z-20 px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 200px)" }}>
        <div
          className="sticky top-6 bg-bf-dark-bg rounded-xl shadow-float overflow-hidden"
          style={{ height: "calc(100vh - 48px)" }}
        >
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-dark-text mb-3">Logo</h2>
                <p className="text-base text-bf-dark-muted max-w-xl">
                  The Black Flag mark: 6 horizontal bars with a solid canton. Always 2:1 aspect ratio.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6 flex flex-col items-center justify-center aspect-[4/3]"
                >
                  <BrandLogo variant="light" size="lg" className="h-10 md:h-16 lg:h-20" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Light on Dark</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="bg-bf-bg rounded-lg p-4 md:p-6 flex flex-col items-center justify-center shadow-card aspect-[4/3]"
                >
                  <BrandLogo variant="dark" size="lg" className="h-10 md:h-16 lg:h-20" />
                  <p className="mt-2 md:mt-4 text-[10px] md:text-xs text-bf-muted uppercase tracking-wider">Dark on Light</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-sm font-medium text-bf-dark-text mb-3 uppercase tracking-wider">Download Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {logoAssets.map((asset) => (
                    <button
                      key={asset.name}
                      onClick={() => handleDownload(asset.file, asset.file.split("/").pop() || asset.name)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center border ${asset.preview === "light" ? "bg-bf-dark-bg border-white/20" : "bg-bf-bg border-bf-border"}`}>
                        <img src={asset.file} alt={asset.name} className="w-6 h-6 object-contain" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-bf-dark-text font-medium">{asset.name}</p>
                        <p className="text-xs text-bf-dark-muted">{asset.description}</p>
                      </div>
                      <Download className="w-4 h-4 text-bf-dark-muted group-hover:text-bf-dark-text transition-colors" />
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
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg px-4 py-3 border border-white/10"
                  >
                    <h3 className="text-sm font-medium text-bf-dark-text mb-1">{item.title}</h3>
                    <p className="text-xs text-bf-dark-muted leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
