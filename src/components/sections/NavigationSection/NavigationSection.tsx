import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  { icon: "⌂", label: "Dashboard", active: true },
  { icon: "⚡", label: "Events", active: false },
  { icon: "👥", label: "People", active: false },
  { icon: "⚙", label: "Settings", active: false },
  { icon: "$", label: "Billing", active: false },
];

const tabItems = [
  { label: "Overview", active: true },
  { label: "Feedback", active: false },
  { label: "Analytics", active: false },
  { label: "Integrations", active: false },
  { label: "Settings", active: false },
];

const breadcrumbExamples = [
  { path: ["Clients", "Acme Corp", "Project Alpha"], icon: "A" },
  { path: ["Settings", "Integrations", "GitHub"], icon: "⚙" },
  { path: ["Events", "Webhook Delivery #4821"], icon: "⚡" },
];

export function NavigationSection() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);

  return (
    <section id="navigation" className="relative py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">Navigation</h2>
          <p className="text-base text-bf-muted max-w-2xl">
            Three tiers of navigation for complex admin interfaces. Primary sidebar, secondary tabs, and tertiary breadcrumbs each serve a distinct wayfinding purpose.
          </p>
        </motion.div>

        {/* Primary: Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Primary — Sidebar</h3>
          <p className="text-sm text-bf-muted mb-6 max-w-xl">
            Hover-expand sidebar. Collapsed shows icons with tooltips (64px). Expanded reveals labels (208px). Active item gets a gradient background with inset shadow and 3px left accent bar.
          </p>

          <div className="flex gap-6 items-start">
            {/* Collapsed sidebar demo */}
            <div
              className="relative bg-gradient-to-b from-[#f0f0f0] to-[#e4e4e4] rounded-xl border border-bf-border overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex-shrink-0"
              style={{ width: sidebarExpanded ? 208 : 64 }}
              onMouseEnter={() => setSidebarExpanded(true)}
              onMouseLeave={() => setSidebarExpanded(false)}
            >
              <div className="py-3 px-2.5 space-y-0.5">
                {sidebarItems.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveSidebarItem(i)}
                    className={`relative w-full flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200 border ${
                      sidebarExpanded ? "px-3 gap-3 justify-start" : "justify-center"
                    } ${
                      activeSidebarItem === i
                        ? "border-[#c4c4c4] bg-gradient-to-b from-[#fafafa] to-[#ececec] text-bf-text shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                        : "border-transparent text-bf-muted hover:bg-white/45 hover:text-bf-text"
                    }`}
                  >
                    {activeSidebarItem === i && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-bf-text rounded-r" />
                    )}
                    <span className="text-lg w-6 text-center flex-shrink-0">{item.icon}</span>
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

            {/* Spec callout */}
            <div className="flex-1 bg-bf-surface rounded-xl border border-bf-border p-6 space-y-3">
              <p className="text-xs font-medium text-bf-text uppercase tracking-wider">Sidebar Spec</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="text-bf-muted">Collapsed width</div>
                <div className="font-mono text-bf-text">64px</div>
                <div className="text-bf-muted">Expanded width</div>
                <div className="font-mono text-bf-text">208px</div>
                <div className="text-bf-muted">Easing</div>
                <div className="font-mono text-bf-text text-xs">cubic-bezier(0.25, 0.1, 0.25, 1)</div>
                <div className="text-bf-muted">Active indicator</div>
                <div className="font-mono text-bf-text">3px left bar</div>
                <div className="text-bf-muted">Active background</div>
                <div className="font-mono text-bf-text text-xs">gradient #fafafa → #ececec</div>
                <div className="text-bf-muted">Mobile</div>
                <div className="font-mono text-bf-text">Slide-in overlay, always expanded</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary: Tabs (Platinum variant) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Secondary — Platinum Tabs</h3>
          <p className="text-sm text-bf-muted mb-6 max-w-xl">
            Chrome-style tabbed navigation for sub-pages. Gradient background with inset shadows on active tab. Keyboard navigable with arrow keys.
          </p>

          <div className="space-y-4">
            {/* Platinum tabs demo */}
            <div className="bg-gradient-to-b from-[#f6f6f6] to-[#ececec] rounded-xl border border-bf-border p-1.5 flex gap-1">
              {tabItems.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === i
                      ? "border border-[#bcbcbc] bg-white text-bf-text shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
                      : "border border-transparent text-bf-muted hover:bg-white/40 hover:text-bf-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Standard tabs variant */}
            <div className="bg-bf-surface rounded-xl border border-bf-border p-1.5 flex gap-1">
              {tabItems.slice(0, 3).map((tab, i) => (
                <button
                  key={`std-${tab.label}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    i === 0
                      ? "bg-bf-text text-white"
                      : "text-bf-muted hover:bg-bf-border/50 hover:text-bf-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-bf-surface rounded-xl border border-bf-border p-4">
                <p className="text-xs font-medium text-bf-text uppercase tracking-wider mb-2">Platinum Variant</p>
                <p className="text-xs text-bf-muted">Chrome-style gradient bg. Active tab: white with inset shadow. Use for settings, detail pages.</p>
              </div>
              <div className="flex-1 bg-bf-surface rounded-xl border border-bf-border p-4">
                <p className="text-xs font-medium text-bf-text uppercase tracking-wider mb-2">Standard Variant</p>
                <p className="text-xs text-bf-muted">Muted bg. Active tab: solid fill. Use for simple view toggles, filter groups.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tertiary: Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Tertiary — Breadcrumbs as Title</h3>
          <p className="text-sm text-bf-muted mb-6 max-w-xl">
            Breadcrumbs double as the page title. The final segment is bold, preceding segments are muted links. Entity logos appear before the title for context.
          </p>

          <div className="space-y-3">
            {breadcrumbExamples.map((example, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-[#ececec] to-[#dfdfdf] rounded-xl border border-bf-border px-6 py-4 flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-lg bg-bf-text text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {example.icon}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {example.path.map((segment, j) => (
                    <span key={j} className="flex items-center gap-2">
                      {j > 0 && <span className="text-bf-muted">/</span>}
                      <span className={j === example.path.length - 1 ? "font-semibold text-bf-text" : "text-bf-muted hover:text-bf-text cursor-pointer transition-colors"}>
                        {segment}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
