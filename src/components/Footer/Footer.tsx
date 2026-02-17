import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-[80] px-6 pt-6 pb-6">
      <div className="bg-bf-dark-bg rounded-xl shadow-float overflow-hidden py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-6 md:flex-row"
          >
            <div>
              <span className="font-medium text-2xl text-gray-300">Black Flag Design</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Black Flag Design. All rights reserved.
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
