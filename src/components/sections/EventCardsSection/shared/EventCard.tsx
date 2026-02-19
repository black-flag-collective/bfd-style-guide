import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface EventCardProps {
  avatarUrl?: string;
  avatarInitials?: string;
  avatarGradient?: string;
  clientLogoUrl?: string;
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function EventCard({
  avatarUrl,
  avatarInitials = "?",
  avatarGradient = "from-indigo-400 to-purple-500",
  clientLogoUrl,
  header,
  body,
  footer,
  selected = false,
  onClick,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`group relative grid h-[304px] min-h-[304px] max-h-[304px] cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-bf-gold ring-2 ring-bf-gold ring-offset-2 ring-offset-bf-dark-bg"
          : "border-bf-dark-border hover:border-bf-dark-muted/50"
      }`}
      style={{
        backgroundColor: "var(--bf-dark-surface)",
        gridTemplateColumns: "56px 1fr",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* Zone A: Identity Rail — avatar, then client logo below */}
      <div
        className="row-span-3 flex flex-col items-center py-4"
        style={{ borderRight: "1px solid var(--bf-dark-border)" }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient} text-xs font-bold text-white`}
          >
            {avatarInitials}
          </div>
        )}
        {/* Client logo — below avatar, full rail width, low opacity */}
        {clientLogoUrl && (
          <img
            src={clientLogoUrl}
            alt=""
            className="mt-2 h-5 w-5 rounded-sm object-contain opacity-30"
          />
        )}
      </div>

      {/* Zone B: Header — actor name · project name */}
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 min-w-0">
        {header}
      </div>

      {/* Zone C: Body */}
      <div className="overflow-hidden px-4 py-1">
        <div className="h-full overflow-hidden text-sm leading-relaxed" style={{ color: "var(--bf-dark-text)" }}>
          {body}
        </div>
      </div>

      {/* Zone D: Footer */}
      {footer}
    </motion.div>
  );
}
