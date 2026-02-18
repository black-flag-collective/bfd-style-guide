import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  number: string;
  title: string;
  description: string;
  dark?: boolean;
  actions?: ReactNode;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function SectionHeader({
  number,
  title,
  description,
  dark = false,
  actions,
}: SectionHeaderProps) {
  const labelColor = dark ? "text-bf-dark-muted" : "text-bf-muted";
  const lineColor = dark ? "bg-bf-dark-border" : "bg-bf-border";
  const titleColor = dark ? "text-bf-dark-text" : "text-bf-text";
  const descColor = dark ? "text-bf-dark-muted" : "text-bf-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true }}
      className="mb-12 sm:mb-16"
    >
      <div className="flex items-center gap-4 mb-5">
        <span
          className={`text-[11px] font-medium tracking-[0.2em] uppercase ${labelColor}`}
        >
          {number}
        </span>
        <div className={`h-px flex-1 ${lineColor} max-w-16 sm:max-w-24`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
        <div className="flex-1 min-w-0">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${titleColor} mb-3 tracking-tight`}
          >
            {title}
          </h2>
          <p
            className={`text-base sm:text-lg ${descColor} max-w-xl leading-relaxed`}
          >
            {description}
          </p>
        </div>
        {actions && (
          <div className="flex-shrink-0">{actions}</div>
        )}
      </div>
    </motion.div>
  );
}
