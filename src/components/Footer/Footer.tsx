import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="relative bg-bf-text py-16">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-8 md:flex-row"
          >
            <div className="flex items-center gap-4">
              <BrandLogo variant="light" size="sm" className="h-6" />
              <span className="font-semibold text-xl text-bf-bg tracking-tight">Black Flag Design</span>
            </div>
            <div className="text-sm text-bf-bg/50 font-mono">
              &copy; {new Date().getFullYear()} Black Flag Design. All rights reserved.
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
