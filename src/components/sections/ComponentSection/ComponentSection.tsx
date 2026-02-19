import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight, Bell, Plus, Search, Trash2, Check, AlertTriangle, X } from "lucide-react";
import type { CSSProperties } from "react";

// ─── Typed variant spec — inline styles so Tailwind scanning is irrelevant ──
interface BtnVariant {
  name: string;
  desc?: string;
  label: string;
  base: CSSProperties;       // applied via style={}
  hover: Record<string, unknown>; // applied via whileHover={}
}

// Light-surface variants
const lightVariants: BtnVariant[] = [
  {
    name: "Solid",
    desc: "Primary action — highest emphasis",
    label: "Save changes",
    base:  { backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717" },
    hover: { backgroundColor: "#333333" },
  },
  {
    name: "Outline",
    desc: "Secondary action — medium emphasis",
    label: "Cancel",
    base:  { backgroundColor: "transparent", color: "#171717", border: "2px solid #171717" },
    hover: { backgroundColor: "rgba(23,23,23,0.06)" },
  },
  {
    name: "Ghost",
    desc: "Tertiary action — low emphasis",
    label: "Learn more",
    base:  { backgroundColor: "transparent", color: "#171717", border: "2px solid transparent" },
    hover: { backgroundColor: "rgba(23,23,23,0.07)" },
  },
  {
    name: "Link",
    desc: "Inline / inline-text action",
    label: "View details →",
    base:  { backgroundColor: "transparent", color: "#171717", border: "2px solid transparent", textDecoration: "underline", textUnderlineOffset: "4px", textDecorationColor: "rgba(23,23,23,0.3)" },
    hover: { textDecorationColor: "rgba(23,23,23,0.8)" },
  },
];

// Dark-surface variants
const darkVariants: BtnVariant[] = [
  {
    name: "Solid",
    label: "Save changes",
    base:  { backgroundColor: "#FAFAFA", color: "#171717", border: "2px solid #FAFAFA" },
    hover: { backgroundColor: "#E5E5E5" },
  },
  {
    name: "Outline",
    label: "Cancel",
    base:  { backgroundColor: "transparent", color: "#FAFAFA", border: "2px solid rgba(250,250,250,0.45)" },
    hover: { backgroundColor: "rgba(250,250,250,0.12)", border: "2px solid rgba(250,250,250,0.85)" },
  },
  {
    name: "Ghost",
    label: "Learn more",
    base:  { backgroundColor: "transparent", color: "rgba(250,250,250,0.75)", border: "2px solid transparent" },
    hover: { backgroundColor: "rgba(250,250,250,0.12)", color: "#FAFAFA" },
  },
  {
    name: "Link",
    label: "View details →",
    base:  { backgroundColor: "transparent", color: "rgba(250,250,250,0.75)", border: "2px solid transparent", textDecoration: "underline", textUnderlineOffset: "4px", textDecorationColor: "rgba(250,250,250,0.3)" },
    hover: { color: "#FAFAFA", textDecorationColor: "rgba(250,250,250,0.8)" },
  },
];

const buttonSizes = [
  { name: "sm", label: "Small", px: "12px", height: "32px", fontSize: "11px", borderRadius: "4px" },
  { name: "md", label: "Default", px: "16px", height: "40px", fontSize: "13px", borderRadius: "6px" },
  { name: "lg", label: "Large", px: "24px", height: "48px", fontSize: "15px", borderRadius: "8px" },
];

// Semantic buttons — fully inline-style driven
const semanticButtons = [
  {
    name: "Danger",
    desc: "Destructive irreversible actions",
    solidBase:   { backgroundColor: "#E04848", color: "#FFFFFF", border: "2px solid #E04848" },
    solidHover:  { backgroundColor: "#C03838" },
    outlineBase:  { backgroundColor: "transparent", color: "#E04848", border: "2px solid #E04848" },
    outlineHover: { backgroundColor: "rgba(224,72,72,0.07)" },
    icon: <Trash2 size={13} />,
    token: "bf-crimson",
    hex: "#E04848",
  },
  {
    name: "Warning",
    desc: "Caution / irreversible but recoverable",
    solidBase:   { backgroundColor: "#E89020", color: "#FFFFFF", border: "2px solid #E89020" },
    solidHover:  { backgroundColor: "#C07010" },
    outlineBase:  { backgroundColor: "transparent", color: "#E89020", border: "2px solid #E89020" },
    outlineHover: { backgroundColor: "rgba(232,144,32,0.07)" },
    icon: <AlertTriangle size={13} />,
    token: "bf-amber",
    hex: "#E89020",
  },
  {
    name: "Success",
    desc: "Confirmation / completion",
    solidBase:   { backgroundColor: "#171717", color: "#5AE09A", border: "2px solid #5AE09A" },
    solidHover:  { backgroundColor: "rgba(90,224,154,0.12)" },
    outlineBase:  { backgroundColor: "transparent", color: "#2BB5A0", border: "2px solid #2BB5A0" },
    outlineHover: { backgroundColor: "rgba(43,181,160,0.07)" },
    icon: <Check size={13} />,
    token: "bf-mint / bf-teal",
    hex: "#5AE09A / #2BB5A0",
  },
];

const iconSizes = [
  { label: "sm", size: 32, iconPx: 13, radius: "4px" },
  { label: "md", size: 40, iconPx: 15, radius: "6px" },
  { label: "lg", size: 48, iconPx: 17, radius: "8px" },
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
    textColor: "text-[#FAFAFA]",
    bodyColor: "text-[#FAFAFA]/80",
    borderColor: "border-[#FAFAFA]",
    btnBorder: "border-[#FAFAFA]",
    btnText: "text-[#FAFAFA]",
    title: "VANTA PARTNER",
    body: "Enterprise-grade security built in.",
    rotation: "rotate-1",
  },
];

export function ComponentSection() {
  return (
    <section id="components" className="relative bg-bf-paper border-t-4 border-bf-text py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader number="05" title="Components" description="Button variants, sticky notes, and card patterns defined by CVA." />

              {/* ── BUTTON VARIANTS ─────────────────────────────────── */}
              <div className="mb-16">
                <h3 className="text-sm font-medium text-bf-text mb-1 uppercase tracking-wider">Button Variants</h3>
                <p className="text-xs text-bf-muted mb-6">Four variants × three sizes, demonstrated on both light and dark surfaces.</p>

                {/* ── Light surface context ── */}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-bf-muted mb-3">Light surface</p>
                <div className="rounded-xl border-2 border-bf-border bg-bf-bg p-6 mb-4 overflow-x-auto">
                  <div className="min-w-[520px]">
                    <div className="grid grid-cols-[72px_1fr_1fr_1fr_1fr] gap-3 mb-4">
                      <div />
                      {lightVariants.map((v) => (
                        <div key={v.name}>
                          <p className="text-xs font-semibold text-bf-text tracking-wide">{v.name}</p>
                          <p className="text-[10px] text-bf-muted mt-0.5 leading-tight">{v.desc}</p>
                        </div>
                      ))}
                    </div>
                    {buttonSizes.map((size) => (
                      <div key={size.name} className="grid grid-cols-[72px_1fr_1fr_1fr_1fr] gap-3 mb-3 items-center">
                        <div>
                          <p className="text-[10px] font-mono text-bf-muted">{size.name}</p>
                          <p className="text-[9px] text-bf-muted/60">{size.label}</p>
                        </div>
                        {lightVariants.map((v) => (
                          <motion.button
                            key={`light-${v.name}-${size.name}`}
                            className="inline-flex items-center justify-center font-medium tracking-wide w-full"
                            style={{ ...v.base, height: size.height, paddingLeft: size.px, paddingRight: size.px, fontSize: size.fontSize, borderRadius: size.radius }}
                            whileHover={v.hover}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            {v.label}
                          </motion.button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Dark surface context ── */}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-bf-muted mb-3">Dark surface</p>
                <div className="rounded-xl overflow-x-auto mb-8" style={{ backgroundColor: "#171717", border: "2px solid #171717" }}>
                  <div className="p-6 min-w-[520px]">
                    <div className="grid grid-cols-[72px_1fr_1fr_1fr_1fr] gap-3 mb-4">
                      <div />
                      {darkVariants.map((v) => (
                        <div key={v.name}>
                          <p className="text-xs font-semibold tracking-wide" style={{ color: "#FAFAFA" }}>{v.name}</p>
                        </div>
                      ))}
                    </div>
                    {buttonSizes.map((size) => (
                      <div key={size.name} className="grid grid-cols-[72px_1fr_1fr_1fr_1fr] gap-3 mb-3 items-center">
                        <div>
                          <p className="text-[10px] font-mono" style={{ color: "rgba(250,250,250,0.45)" }}>{size.name}</p>
                        </div>
                        {darkVariants.map((v) => (
                          <motion.button
                            key={`dark-${v.name}-${size.name}`}
                            className="inline-flex items-center justify-center font-medium tracking-wide w-full"
                            style={{ ...v.base, height: size.height, paddingLeft: size.px, paddingRight: size.px, fontSize: size.fontSize, borderRadius: size.radius }}
                            whileHover={v.hover}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            {v.label}
                          </motion.button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Button States ── */}
                <h4 className="text-xs font-semibold uppercase tracking-widest text-bf-text mb-3">States</h4>
                <div className="rounded-xl border-2 border-bf-border bg-bf-bg p-6 mb-8">
                  <div className="flex flex-wrap gap-6 items-end">
                    {([
                      {
                        label: "Normal",
                        el: (
                          <motion.button
                            className="inline-flex items-center justify-center font-medium tracking-wide"
                            style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 13, borderRadius: 6, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717" }}
                            whileHover={{ backgroundColor: "#333333" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >Default</motion.button>
                        ),
                      },
                      {
                        label: "Focus",
                        el: (
                          <motion.button
                            className="inline-flex items-center justify-center font-medium tracking-wide ring-2 ring-offset-2"
                            style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 13, borderRadius: 6, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717", outline: "none", boxShadow: "0 0 0 2px #F4F4F5, 0 0 0 4px #171717" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >Focused</motion.button>
                        ),
                      },
                      {
                        label: "Disabled",
                        el: (
                          <button
                            disabled
                            className="inline-flex items-center justify-center font-medium tracking-wide cursor-not-allowed"
                            style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 13, borderRadius: 6, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717", opacity: 0.3 }}
                          >Disabled</button>
                        ),
                      },
                      {
                        label: "Loading",
                        el: (
                          <motion.button
                            className="inline-flex items-center justify-center gap-2 font-medium tracking-wide"
                            style={{ height: 40, paddingLeft: 20, paddingRight: 20, fontSize: 13, borderRadius: 6, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717" }}
                            whileHover={{ backgroundColor: "#333333" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >
                            <svg className="animate-spin h-3.5 w-3.5" style={{ color: "rgba(250,250,250,0.55)" }} fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            Saving…
                          </motion.button>
                        ),
                      },
                      {
                        label: "Icon Trailing",
                        el: (
                          <motion.button
                            className="inline-flex items-center justify-center gap-2 font-medium tracking-wide"
                            style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 13, borderRadius: 6, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717" }}
                            whileHover={{ backgroundColor: "#333333" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >
                            With icon <ArrowRight size={14} />
                          </motion.button>
                        ),
                      },
                      {
                        label: "Icon Leading",
                        el: (
                          <motion.button
                            className="inline-flex items-center justify-center gap-2 font-medium tracking-wide"
                            style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 13, borderRadius: 6, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717" }}
                            whileHover={{ backgroundColor: "#333333" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Plus size={14} /> New item
                          </motion.button>
                        ),
                      },
                    ] as { label: string; el: React.ReactNode }[]).map(({ label, el }) => (
                      <div key={label} className="flex flex-col items-center gap-2">
                        {el}
                        <span className="text-[9px] text-bf-muted uppercase tracking-wider">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Semantic / Contextual Buttons ── */}
                <h4 className="text-xs font-semibold uppercase tracking-widest text-bf-text mb-3">Semantic Variants</h4>
                <p className="text-[11px] text-bf-muted mb-4">Use crew-state color tokens for destructive, warning, or success contexts only.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {semanticButtons.map((sem) => (
                    <div key={sem.name} className="rounded-xl border-2 border-bf-border bg-bf-bg p-4">
                      <p className="text-xs font-semibold text-bf-text mb-0.5">{sem.name}</p>
                      <p className="text-[10px] text-bf-muted mb-3 leading-tight">{sem.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <motion.button
                          className="inline-flex items-center justify-center gap-1.5 font-medium tracking-wide"
                          style={{ ...sem.solidBase, height: 36, paddingLeft: 14, paddingRight: 14, fontSize: 12, borderRadius: 6 }}
                          whileHover={sem.solidHover}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                        >
                          {sem.icon} {sem.name}
                        </motion.button>
                        <motion.button
                          className="inline-flex items-center justify-center gap-1.5 font-medium tracking-wide"
                          style={{ ...sem.outlineBase, height: 36, paddingLeft: 14, paddingRight: 14, fontSize: 12, borderRadius: 6 }}
                          whileHover={sem.outlineHover}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                        >
                          {sem.icon} {sem.name}
                        </motion.button>
                      </div>
                      <p className="text-[9px] font-mono text-bf-muted">{sem.token} — {sem.hex}</p>
                    </div>
                  ))}
                </div>

                {/* ── Icon-Only Buttons ── */}
                <h4 className="text-xs font-semibold uppercase tracking-widest text-bf-text mb-3">Icon Buttons</h4>
                <div className="rounded-xl border-2 border-bf-border bg-bf-bg p-6 mb-8">
                  <div className="flex flex-wrap gap-8 items-end">
                    {iconSizes.map((s) => (
                      <div key={s.label} className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                          {/* Solid icon */}
                          <motion.button
                            className="inline-flex items-center justify-center"
                            style={{ width: s.size, height: s.size, borderRadius: s.radius, backgroundColor: "#171717", color: "#FAFAFA", border: "2px solid #171717" }}
                            whileHover={{ backgroundColor: "#333333" }}
                            whileTap={{ scale: 0.93 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Bell size={s.iconPx} />
                          </motion.button>
                          {/* Outline icon */}
                          <motion.button
                            className="inline-flex items-center justify-center"
                            style={{ width: s.size, height: s.size, borderRadius: s.radius, backgroundColor: "transparent", color: "#171717", border: "2px solid #171717" }}
                            whileHover={{ backgroundColor: "rgba(23,23,23,0.06)" }}
                            whileTap={{ scale: 0.93 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Search size={s.iconPx} />
                          </motion.button>
                          {/* Ghost icon */}
                          <motion.button
                            className="inline-flex items-center justify-center"
                            style={{ width: s.size, height: s.size, borderRadius: s.radius, backgroundColor: "transparent", color: "#171717", border: "2px solid transparent" }}
                            whileHover={{ backgroundColor: "rgba(23,23,23,0.07)" }}
                            whileTap={{ scale: 0.93 }}
                            transition={{ duration: 0.15 }}
                          >
                            <X size={s.iconPx} />
                          </motion.button>
                        </div>
                        <span className="text-[9px] font-mono text-bf-muted">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Usage Spec Table ── */}
                <h4 className="text-xs font-semibold uppercase tracking-widest text-bf-text mb-3">When to Use</h4>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-bf-surface border-b-2 border-bf-border">
                        <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-bf-muted">Variant</th>
                        <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-bf-muted">Use when</th>
                        <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-bf-muted hidden sm:table-cell">Never use when</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bf-border">
                      {[
                        ["Solid", "One primary CTA per view — save, submit, pay, continue", "Multiple solid buttons compete; no clear hierarchy"],
                        ["Outline", "Secondary action that is adjacent to a Solid button", "Standalone as a primary CTA — lacks enough emphasis"],
                        ["Ghost", "Tertiary actions (cancel, reset, settings icon row)", "Any context where the action needs discoverable contrast"],
                        ["Link", "Inline body text, breadcrumb trails, list item actions", "Actions in toolbars or buttons — hard to hit on mobile"],
                        ["Icon-only", "Space-constrained toolbars with obvious meaning + tooltip", "Novel icons without tooltips — violates discoverability"],
                        ["Semantic", "Destructive / caution / success confirmation dialogs only", "Decorative color; never use red/amber for non-destructive"],
                      ].map(([variant, use, never]) => (
                        <tr key={variant} className="bg-bf-paper hover:bg-bf-bg transition-colors">
                          <td className="px-4 py-2.5 font-semibold text-bf-text whitespace-nowrap">{variant}</td>
                          <td className="px-4 py-2.5 text-bf-muted leading-snug">{use}</td>
                          <td className="px-4 py-2.5 text-bf-muted leading-snug hidden sm:table-cell">{never}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sticky Notes */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Sticky Notes</h3>
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
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Card Patterns</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {["Light", "Dark", "Blur / Glass"].map((name, i) => {
                    const styles = [
                      "bg-bf-bg border-2 border-bf-border rounded-xl hover:border-bf-text/50 hover:shadow-lg",
                      "bg-bf-paper border-2 border-bf-border rounded-xl hover:border-white/30 hover:shadow-lg",
                      "bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/15",
                    ];
                    return (
                      <motion.div
                        key={name}
                        whileHover={{ y: -4 }}
                        className={`${styles[i]} p-5 transition-all duration-300 cursor-pointer`}
                      >
                        <p className={`text-sm font-medium mb-1 ${i === 0 ? "text-bf-text" : "text-bf-text"}`}>{name}</p>
                        <p className={`text-xs ${i === 0 ? "text-bf-muted" : "text-bf-muted"}`}>Hover to preview interaction</p>
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
