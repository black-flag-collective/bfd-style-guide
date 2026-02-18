import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative bg-bf-dark-bg py-12">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
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
