import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const sidebarItems = [
  { icon: "⌂", label: "Dashboard" },
  { icon: "⚡", label: "Events" },
  { icon: "👥", label: "People" },
  { icon: "⚙", label: "Settings" },
  { icon: "$", label: "Billing" },
];

const tabItems = ["Overview", "Feedback", "Analytics", "Integrations", "Settings"];

const breadcrumbExamples = [
  { path: ["Clients", "Acme Corp", "Project Alpha"], icon: "A" },
  { path: ["Settings", "Integrations", "GitHub"], icon: "⚙" },
  { path: ["Events", "Webhook Delivery #4821"], icon: "⚡" },
];

export function NavigationSection() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [tabVariant, setTabVariant] = useState<"platinum" | "solid">("platinum");

  return (
    <section id="navigation" className="relative z-[55] px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 400px)" }}>
        <div
          className="sticky top-6 bg-bf-bg rounded-xl shadow-card overflow-hidden"
          style={{ height: "calc(100vh - 48px)" }}
        >
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">
                  Navigation
                </h2>
                <p className="text-base text-bf-muted max-w-2xl">
                  Three tiers for complex admin interfaces. Primary sidebar for
                  top-level context, secondary tabs for sub-pages, tertiary
                  breadcrumbs for deep hierarchy.
                </p>
              </motion.div>

              {/* ── PRIMARY: Sidebar ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                viewport={{ once: true }}
                className="mb-14"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  Primary — Sidebar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Hover-expand from 64 → 208 px. Active item has a 3 px left accent
                  bar. Collapsed shows only icons; expanded reveals labels.
                </p>

                <div className="flex gap-6 items-start">
                  {/* Interactive sidebar demo */}
                  <div
                    className="relative bg-bf-surface rounded-xl border-2 border-bf-border overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex-shrink-0"
                    style={{ width: sidebarExpanded ? 208 : 64 }}
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                  >
                    <div className="py-3 px-2.5 space-y-0.5">
                      {sidebarItems.map((item, i) => (
                        <button
                          key={item.label}
                          onClick={() => setActiveSidebarItem(i)}
                          className={`relative w-full flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
                            sidebarExpanded
                              ? "px-3 gap-3 justify-start"
                              : "justify-center"
                          } ${
                            activeSidebarItem === i
                              ? "bg-bf-text text-white"
                              : "text-bf-muted hover:bg-bf-border/60 hover:text-bf-text"
                          }`}
                        >
                          {activeSidebarItem === i && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-bf-note-warning rounded-r" />
                          )}
                          <span className="text-lg w-6 text-center flex-shrink-0">
                            {item.icon}
                          </span>
                          <AnimatePresence>
                            {sidebarExpanded && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="whitespace-nowrap overflow-hidden"
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Spec card */}
                  <div className="flex-1 bg-bf-paper rounded-xl border-2 border-bf-border p-6 space-y-3">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider">
                      Sidebar Spec
                    </p>
                    <div className="grid grid-cols-[8rem_1fr] gap-x-6 gap-y-2 text-sm">
                      {[
                        ["Collapsed", "64 px"],
                        ["Expanded", "208 px"],
                        ["Easing", "cubic-bezier(0.25, 0.1, 0.25, 1)"],
                        ["Active bar", "3 px left · bf-note-warning"],
                        ["Active fill", "bf-text (inverted text)"],
                        ["Mobile", "Slide-in overlay, always expanded"],
                      ].map(([label, value]) => (
                        <Fragment key={label}>
                          <span className="text-bf-muted">{label}</span>
                          <span className="font-mono text-bf-text text-xs">
                            {value}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── SECONDARY: Tabs ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="mb-14"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  Secondary — Tab Bar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Two variants: Platinum (chrome-style with inset shadows) and Solid
                  (flat fill). Toggle below to compare.
                </p>

                {/* Variant toggle */}
                <div className="flex gap-2 mb-4">
                  {(["platinum", "solid"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setTabVariant(v)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all duration-200 ${
                        tabVariant === v
                          ? "bg-bf-text text-white border-bf-text shadow-comic-sm"
                          : "bg-transparent text-bf-muted border-bf-border hover:border-bf-text/40"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                {/* Tab bar demo */}
                <div
                  className={`rounded-xl border-2 border-bf-border p-1.5 flex gap-1 transition-colors duration-300 ${
                    tabVariant === "platinum" ? "bg-bf-surface" : "bg-bf-paper"
                  }`}
                >
                  {tabItems.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === i
                          ? tabVariant === "platinum"
                            ? "border border-bf-border bg-white text-bf-text shadow-sm"
                            : "bg-bf-text text-white border border-transparent"
                          : "border border-transparent text-bf-muted hover:text-bf-text hover:bg-bf-border/40"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Variant spec cards */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div
                    className={`bg-bf-paper rounded-xl border-2 p-4 transition-colors duration-200 ${
                      tabVariant === "platinum"
                        ? "border-bf-text"
                        : "border-bf-border"
                    }`}
                  >
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-1">
                      Platinum
                    </p>
                    <p className="text-xs text-bf-muted">
                      Surface bg. Active: white card with shadow-sm. Use for
                      settings and detail pages.
                    </p>
                  </div>
                  <div
                    className={`bg-bf-paper rounded-xl border-2 p-4 transition-colors duration-200 ${
                      tabVariant === "solid"
                        ? "border-bf-text"
                        : "border-bf-border"
                    }`}
                  >
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-1">
                      Solid
                    </p>
                    <p className="text-xs text-bf-muted">
                      Paper bg. Active: bf-text fill. Use for quick view toggles
                      and filter groups.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ── TERTIARY: Breadcrumbs ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  Tertiary — Breadcrumbs as Title
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  The final segment is the page title (bold). Preceding segments are
                  muted links. Entity icon appears at the leading edge.
                </p>

                <div className="space-y-3">
                  {breadcrumbExamples.map((example, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease }}
                      viewport={{ once: true }}
                      className="bg-bf-surface rounded-xl border-2 border-bf-border px-5 py-3.5 flex items-center gap-3 hover:border-bf-text/30 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-lg bg-bf-text text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {example.icon}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {example.path.map((segment, j) => (
                          <span key={j} className="flex items-center gap-2">
                            {j > 0 && (
                              <span className="text-bf-border font-medium">/</span>
                            )}
                            <span
                              className={
                                j === example.path.length - 1
                                  ? "font-bold text-bf-text"
                                  : "text-bf-muted hover:text-bf-text cursor-pointer transition-colors"
                              }
                            >
                              {segment}
                            </span>
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fragment({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
