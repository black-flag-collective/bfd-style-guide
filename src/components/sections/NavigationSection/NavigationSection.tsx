import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────── */
/* DATA — mirrors real admin-app-convex nav items    */
/* ───────────────────────────────────────────────── */

const sidebarItems = [
  { icon: "🏢", label: "Clients", shortcut: "⌘1" },
  { icon: "⚡", label: "Events", shortcut: "⌘2" },
  { icon: "💲", label: "Code Gen", shortcut: "⌘3" },
  { icon: "🖥", label: "Infrastructure", shortcut: "⌘4" },
  { icon: "👥", label: "People", shortcut: "⌘5" },
];

const detailPageTabs = [
  "Meetings",
  "Files",
  "Knowledge",
  "Whiteboards",
  "Events",
  "Work",
  "Deployments",
  "Analytics",
];

const settingsTabItems = ["Access", "Vendors", "Meetings"];

const filterSortTabs = ["All", "Linear", "GitHub", "Webhook", "BFD"];

const breadcrumbSets = [
  { path: ["Clients", "Acme Corp", "Project Alpha"], icon: "A" },
  { path: ["Clients", "Black Flag", "Foundry", "Events"], icon: "⚑" },
  { path: ["Settings", "Vendors", "GitHub"], icon: "⚙" },
  { path: ["Events", "Webhook Delivery #4821"], icon: "⚡" },
  { path: ["Clients", "HealthCo", "HW Portal", "Files", "docs/"], icon: "📁" },
];

const pageHeaderExamples = [
  {
    title: "Clients",
    description: "All client accounts and their projects",
    breadcrumbs: [] as string[],
    actions: ["+ New Client"],
  },
  {
    title: "Events",
    description: "Incoming webhooks, issue updates, and deployment events",
    breadcrumbs: [] as string[],
    actions: ["Filter", "Export"],
  },
];

/* ───────────────────────────────────────────────── */
/* COMPONENT                                        */
/* ───────────────────────────────────────────────── */

export function NavigationSection() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState(0);
  const [activeSettingsTab, setActiveSettingsTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);
  const [tabVariant, setTabVariant] = useState<"platinum" | "solid">("solid");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section id="navigation" className="relative z-[55] px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 2200px)" }}>
        <div
          className="sticky top-6 bg-bf-bg rounded-xl shadow-card overflow-hidden"
          style={{ height: "calc(100vh - 48px)" }}
        >
          <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
              {/* ═══════════════════════════════════════════ */}
              {/* HEADER                                     */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">
                  Navigation
                </h2>
                <p className="text-base text-bf-muted max-w-2xl">
                  Four tiers for complex admin interfaces. Primary sidebar for
                  top-level context, page headers with breadcrumbs, secondary tabs
                  for sub-pages, and filter bars for data views. Every pattern
                  below is drawn from the real admin app.
                </p>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 1. PRIMARY: Sidebar                        */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  1 · Primary — Sidebar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Hover-expand from 64 → 208 px. Active item uses a dark fill with 3 px left
                  accent bar. Collapsed shows only icons with right-side tooltips;
                  expanded reveals labels. User avatar pinned to bottom.
                </p>

                <div className="flex gap-6 items-start">
                  {/* Interactive sidebar demo */}
                  <div
                    className="relative bg-bf-surface rounded-xl border-2 border-bf-border overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex-shrink-0 flex flex-col"
                    style={{ width: sidebarExpanded ? 208 : 64, minHeight: 340 }}
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                  >
                    {/* Logo zone */}
                    <div
                      className={`flex items-center h-16 px-2.5 border-b border-bf-border ${
                        sidebarExpanded ? "justify-start" : "justify-center"
                      }`}
                    >
                      <div className="h-8 w-8 rounded bg-bf-text flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-black">⚑</span>
                      </div>
                      <AnimatePresence>
                        {sidebarExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="ml-2.5 text-sm font-bold text-bf-text whitespace-nowrap overflow-hidden"
                          >
                            Black Flag
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 py-3 px-2.5 space-y-0.5">
                      {sidebarItems.map((item, i) => (
                        <button
                          key={item.label}
                          onClick={() => setActiveSidebarItem(i)}
                          className={`relative w-full flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200 border ${
                            sidebarExpanded
                              ? "px-3 gap-3 justify-start"
                              : "justify-center"
                          } ${
                            activeSidebarItem === i
                              ? "border-[#c4c4c4] bg-gradient-to-b from-[#fafafa] to-[#ececec] text-bf-text shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                              : "border-transparent text-bf-muted hover:bg-white/45 hover:text-bf-text"
                          }`}
                        >
                          {activeSidebarItem === i && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-bf-text rounded-r" />
                          )}
                          <span className="text-base w-5 text-center flex-shrink-0">
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
                    </nav>

                    {/* User area */}
                    <div className="border-t border-bf-border px-2.5 py-2">
                      <div
                        className={`flex items-center rounded-lg py-2 hover:bg-bf-border/40 transition-colors cursor-pointer ${
                          sidebarExpanded
                            ? "px-2 gap-3 justify-start"
                            : "justify-center"
                        }`}
                      >
                        <div className="h-8 w-8 rounded-full bg-bf-text/10 flex items-center justify-center text-xs font-bold text-bf-text flex-shrink-0">
                          KP
                        </div>
                        <AnimatePresence>
                          {sidebarExpanded && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm font-medium text-bf-text truncate whitespace-nowrap">
                                Keith Patterson
                              </p>
                              <p className="text-[10px] text-bf-muted truncate whitespace-nowrap">
                                keith@blackflag.design
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Spec card */}
                  <div className="flex-1 space-y-4">
                    <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-6 space-y-3">
                      <p className="text-xs font-black text-bf-text uppercase tracking-wider">
                        Sidebar Spec
                      </p>
                      <div className="grid grid-cols-[8rem_1fr] gap-x-6 gap-y-2 text-sm">
                        {[
                          ["Collapsed", "64 px (icon only)"],
                          ["Expanded", "208 px (icon + label)"],
                          ["Trigger", "mouseenter / mouseleave"],
                          ["Easing", "cubic-bezier(0.25, 0.1, 0.25, 1)"],
                          ["Duration", "300 ms"],
                          ["Active fill", "gradient from-[#fafafa] to-[#ececec]"],
                          ["Active bar", "3 px left · bf-text · rounded-r"],
                          ["Border", "border-[#c4c4c4] on active"],
                          ["Shadow", "inset_0_1px_0_rgba(255,255,255,0.8)"],
                          ["Logo zone", "h-16 md:h-20 · aligns with page header"],
                          ["Mobile", "Slide-in overlay, 256 px, always expanded"],
                          ["Tooltips", "Right-side on collapsed icons"],
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

                    {/* User popover spec */}
                    <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                      <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                        User Popover Menu
                      </p>
                      <div className="bg-white rounded-lg border border-bf-border p-2 max-w-[14rem] shadow-sm space-y-0.5">
                        <div className="px-2 py-1.5 text-sm text-bf-text rounded hover:bg-bf-surface cursor-pointer transition-colors">
                          My Profile
                        </div>
                        <div className="px-2 py-1.5 text-sm text-bf-text rounded hover:bg-bf-surface cursor-pointer transition-colors">
                          Settings
                        </div>
                        <div className="border-t border-bf-border my-1" />
                        <div className="px-2 py-1.5 text-sm text-red-600 rounded hover:bg-red-50 cursor-pointer transition-colors">
                          Sign Out
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 2. PAGE HEADERS                            */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  2 · Page Headers
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Two variants: <strong>Chrome</strong> (gradient with inner shadow — default for top-level pages)
                  and <strong>Default</strong> (clean white). Chrome headers feature breadcrumbs above the
                  title (desktop only) and optional action buttons aligned right.
                </p>

                {/* Chrome variant header demos */}
                <div className="space-y-4">
                  {/* Top-level page header */}
                  <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                    <div className="border-b border-[#bdbdbd] bg-gradient-to-b from-[#ececec] to-[#dfdfdf] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                      <div className="h-16 md:h-20 flex items-center px-4 md:px-6">
                        <div className="flex items-center justify-between w-full gap-3">
                          <div className="min-w-0 flex-1">
                            <h1 className="text-xl md:text-2xl font-semibold text-bf-text tracking-tight">
                              Clients
                            </h1>
                            <p className="hidden md:block text-xs text-bf-muted mt-0.5">
                              All client accounts and their projects
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="px-3 py-1.5 text-xs font-bold bg-bf-text text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                              + New Client
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bf-surface px-4 py-2">
                      <span className="text-[10px] font-mono text-bf-muted uppercase tracking-wider">
                        Chrome variant · top-level page · h-16 md:h-20
                      </span>
                    </div>
                  </div>

                  {/* Detail page header with breadcrumbs */}
                  <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                    <div className="border-b border-[#bdbdbd] bg-gradient-to-b from-[#ececec] to-[#dfdfdf] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                      <div className="h-16 md:h-20 flex items-center px-4 md:px-6">
                        <div className="flex items-center justify-between w-full gap-3">
                          <div className="min-w-0 flex-1">
                            <nav className="hidden md:flex items-center gap-2 text-xs text-bf-muted mb-1">
                              <span className="hover:text-bf-text cursor-pointer transition-colors">
                                Clients
                              </span>
                              <span className="text-bf-border">›</span>
                              <span className="hover:text-bf-text cursor-pointer transition-colors">
                                Black Flag
                              </span>
                              <span className="text-bf-border">›</span>
                              <span className="text-bf-text">Foundry</span>
                            </nav>
                            <h1 className="text-xl md:text-2xl font-semibold text-bf-text tracking-tight">
                              Events
                            </h1>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="px-3 py-1.5 text-xs font-medium text-bf-muted border border-bf-border rounded-lg cursor-pointer hover:bg-white transition-colors">
                              Filter
                            </span>
                            <span className="px-3 py-1.5 text-xs font-medium text-bf-muted border border-bf-border rounded-lg cursor-pointer hover:bg-white transition-colors">
                              Export
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bf-surface px-4 py-2">
                      <span className="text-[10px] font-mono text-bf-muted uppercase tracking-wider">
                        Chrome variant · with breadcrumbs · action buttons
                      </span>
                    </div>
                  </div>

                  {/* Entity header (DetailPageLayout pattern) */}
                  <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                    <div className="border-b border-[#bdbdbd] bg-gradient-to-b from-[#ececec] to-[#dfdfdf] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                      <div className="h-16 md:h-20 flex items-center px-4 md:px-6">
                        <div className="flex items-center justify-between w-full gap-3">
                          <nav className="flex items-center gap-3 text-xl md:text-2xl font-medium text-bf-text tracking-tight min-w-0">
                            <div className="h-9 w-9 rounded bg-bf-text flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-black">⚑</span>
                            </div>
                            <span className="truncate">BFD Style Guide</span>
                          </nav>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="px-3 py-1.5 text-xs font-bold bg-bf-text text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                              Deploy
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bf-surface px-4 py-2">
                      <span className="text-[10px] font-mono text-bf-muted uppercase tracking-wider">
                        Entity header · logo + name as breadcrumb · DetailPageLayout pattern
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header spec */}
                <div className="mt-4 bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">
                    Page Header Spec
                  </p>
                  <div className="grid grid-cols-[8rem_1fr] gap-x-6 gap-y-2 text-sm">
                    {[
                      ["Height", "h-16 (64 px) mobile · h-20 (80 px) desktop"],
                      ["Chrome bg", "gradient from-[#ececec] to-[#dfdfdf]"],
                      ["Chrome border", "border-[#bdbdbd]"],
                      ["Chrome shadow", "inset_0_1px_0_rgba(255,255,255,0.85)"],
                      ["Title size", "text-xl md:text-3xl · font-semibold"],
                      ["Breadcrumbs", "hidden md:flex · text-sm · above title"],
                      ["Entity logo", "h-9 w-9 · rounded · object-contain"],
                      ["Max width", "max-w-[1600px] mx-auto"],
                      ["Padding", "px-4 md:px-6"],
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
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 3. SECONDARY: Tab Bar                      */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  3 · Secondary — Tab Bar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Two variants: <strong>Platinum</strong> (chrome-style, matches macOS
                  toolbar chrome — currently used in admin app) and <strong>Solid</strong>
                  (flat BFD fill — our target brand direction). Toggle below to compare.
                </p>

                {/* Variant toggle */}
                <div className="flex gap-2 mb-5">
                  {(["solid", "platinum"] as const).map((v) => (
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

                {/* Detail page tabs (9 tabs — real admin app) */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  Detail Page — 8 tabs (real admin app)
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden mb-4">
                  <div
                    className={`px-2 py-2 transition-colors duration-300 ${
                      tabVariant === "platinum"
                        ? "bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] border-b border-[#bdbdbd] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                        : "bg-bf-paper border-b border-bf-border"
                    }`}
                  >
                    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                      {detailPageTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDetailTab(i)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0 border ${
                            activeDetailTab === i
                              ? tabVariant === "platinum"
                                ? "border-[#bcbcbc] bg-[#f8f8f8] text-bf-text shadow-[0_1px_0_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                : "bg-bf-text text-white border-transparent"
                              : "border-transparent text-bf-muted hover:text-bf-text hover:bg-white/40"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white h-16 flex items-center justify-center">
                    <span className="text-sm text-bf-muted">
                      {detailPageTabs[activeDetailTab]} content area
                    </span>
                  </div>
                </div>

                {/* Settings tabs (3 tabs) */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  Settings Page — 3 tabs
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden mb-4">
                  <div
                    className={`px-2 py-2 transition-colors duration-300 ${
                      tabVariant === "platinum"
                        ? "bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] border-b border-[#bdbdbd] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                        : "bg-bf-paper border-b border-bf-border"
                    }`}
                  >
                    <div className="flex gap-1">
                      {settingsTabItems.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveSettingsTab(i)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap border ${
                            activeSettingsTab === i
                              ? tabVariant === "platinum"
                                ? "border-[#bcbcbc] bg-[#f8f8f8] text-bf-text shadow-[0_1px_0_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                : "bg-bf-text text-white border-transparent"
                              : "border-transparent text-bf-muted hover:text-bf-text hover:bg-white/40"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white h-12 flex items-center justify-center">
                    <span className="text-sm text-bf-muted">
                      {settingsTabItems[activeSettingsTab]} settings panel
                    </span>
                  </div>
                </div>

                {/* Variant spec cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`bg-bf-paper rounded-xl border-2 p-5 transition-colors duration-200 ${
                      tabVariant === "solid" ? "border-bf-text" : "border-bf-border"
                    }`}
                  >
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                      Solid (BFD Direction)
                    </p>
                    <p className="text-xs text-bf-muted mb-3">
                      Paper bg. Active: bf-text fill with white text. Clean, bold, brand-forward.
                      Use as the primary tab variant going forward.
                    </p>
                    <div className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                      {[
                        ["Active bg", "bg-bf-text"],
                        ["Active text", "text-white"],
                        ["Inactive", "text-bf-muted"],
                        ["Track bg", "bg-bf-paper"],
                      ].map(([k, v]) => (
                        <Fragment key={k}>
                          <span className="text-bf-muted">{k}</span>
                          <span className="font-mono text-bf-text">{v}</span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`bg-bf-paper rounded-xl border-2 p-5 transition-colors duration-200 ${
                      tabVariant === "platinum" ? "border-bf-text" : "border-bf-border"
                    }`}
                  >
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                      Platinum (Current App)
                    </p>
                    <p className="text-xs text-bf-muted mb-3">
                      Chrome gradient. Active: raised card with inset shadow.
                      macOS-inspired. Will be rewritten to Solid in future.
                    </p>
                    <div className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                      {[
                        ["Track bg", "gradient #f2f2f2 → #dcdcdc"],
                        ["Active bg", "bg-[#f8f8f8]"],
                        ["Active bdr", "border-[#bcbcbc]"],
                        ["Shadow", "inset white + outer sm"],
                      ].map(([k, v]) => (
                        <Fragment key={k}>
                          <span className="text-bf-muted">{k}</span>
                          <span className="font-mono text-bf-text">{v}</span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 4. SETTINGS SECONDARY NAV                  */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  4 · Settings Secondary Nav
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Keyboard-navigable sub-section picker with prev/next arrow buttons.
                  Arrow keys cycle through items. Used within vendor settings to navigate
                  between individual vendor configurations.
                </p>

                <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                  <div className="flex shrink-0 items-center gap-1 border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#ececec] px-1 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    {/* Prev button */}
                    <button
                      onClick={() =>
                        setActiveSettingsTab(
                          (activeSettingsTab - 1 + settingsTabItems.length) %
                            settingsTabItems.length
                        )
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-bf-muted transition-colors hover:bg-black/5 hover:text-bf-text"
                    >
                      ‹
                    </button>
                    <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5">
                      {settingsTabItems.map((item, i) => {
                        const isActive = i === activeSettingsTab;
                        return (
                          <button
                            key={item}
                            onClick={() => setActiveSettingsTab(i)}
                            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium transition-all ${
                              isActive
                                ? "border border-[#bcbcbc] bg-white text-bf-text shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                : "border border-transparent text-bf-muted hover:bg-white/50 hover:text-bf-text"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                    {/* Next button */}
                    <button
                      onClick={() =>
                        setActiveSettingsTab(
                          (activeSettingsTab + 1) % settingsTabItems.length
                        )
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-bf-muted transition-colors hover:bg-black/5 hover:text-bf-text"
                    >
                      ›
                    </button>
                  </div>
                  <div className="bg-white h-12 flex items-center justify-center">
                    <span className="text-xs text-bf-muted">
                      ← / → arrow keys to navigate · {settingsTabItems[activeSettingsTab]} selected
                    </span>
                  </div>
                </div>

                <div className="mt-3 bg-bf-paper rounded-xl border-2 border-bf-border p-4">
                  <div className="grid grid-cols-[8rem_1fr] gap-x-6 gap-y-1.5 text-[11px]">
                    {[
                      ["Track bg", "gradient from-[#f6f6f6] to-[#ececec]"],
                      ["Active", "bg-white · border-[#bcbcbc] · shadow"],
                      ["Arrows", "h-7 w-7 · ‹ / › · wrapping cycle"],
                      ["Keyboard", "ArrowLeft / ArrowRight global"],
                    ].map(([k, v]) => (
                      <Fragment key={k}>
                        <span className="text-bf-muted">{k}</span>
                        <span className="font-mono text-bf-text">{v}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 5. FILTER / SORT BAR                       */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  5 · Filter / Sort Bar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Pill-style source filters for data-dense views like event feeds.
                  Each pill acts as a toggle. Combined with dropdown selects for
                  job type, status, and vendor filtering.
                </p>

                <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                  <div className="bg-bf-surface border-b border-bf-border px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-bf-muted mr-1">🔍</span>
                      {filterSortTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveFilterTab(i)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 border ${
                            activeFilterTab === i
                              ? "bg-bf-text text-white border-bf-text"
                              : "bg-white text-bf-muted border-bf-border hover:border-bf-text/40 hover:text-bf-text"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                      <div className="h-4 w-px bg-bf-border mx-1" />
                      <span className="px-2.5 py-1 text-xs font-medium bg-white text-bf-muted border border-bf-border rounded-md">
                        Status ▾
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium bg-white text-bf-muted border border-bf-border rounded-md">
                        Date ▾
                      </span>
                    </div>
                  </div>
                  <div className="bg-white h-12 flex items-center justify-center">
                    <span className="text-xs text-bf-muted">
                      Showing {filterSortTabs[activeFilterTab]} events
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 6. BREADCRUMBS                             */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  6 · Breadcrumbs
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  The final segment is the page title (bold). Preceding segments are
                  muted links with chevron separators. Entity icon appears at the leading edge.
                  Desktop only — hidden on mobile.
                </p>

                <div className="space-y-3">
                  {breadcrumbSets.map((example, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease }}
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
                              <span className="text-bf-border">›</span>
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

                <div className="mt-4 bg-bf-paper rounded-xl border-2 border-bf-border p-4">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                    Entity Hierarchy
                  </p>
                  <p className="text-xs text-bf-muted mb-3">
                    The admin app uses a strict two-level hierarchy:
                    <strong> Client → Project</strong>. All content (events, files, meetings)
                    lives under a project. Breadcrumbs reflect this at every depth.
                  </p>
                  <div className="bg-white rounded-lg border border-bf-border p-3 font-mono text-xs text-bf-text space-y-1">
                    <p>Clients (top-level page)</p>
                    <p className="pl-4">└─ Client Detail (tabs: Projects, Meetings, Events, Files, Expenses)</p>
                    <p className="pl-8">└─ Project Detail (tabs: Meetings, Files, Knowledge, Whiteboards, Events, Work, Deployments, Analytics)</p>
                    <p className="pl-12">└─ Individual item views (event drawer, file viewer, etc.)</p>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 7. MOBILE NAV                              */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  7 · Mobile Navigation
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Mobile replaces the hover sidebar with a hamburger trigger and slide-in
                  overlay. Tab bars switch to horizontal scroll. Breadcrumbs are hidden.
                </p>

                <div className="flex gap-4 items-start">
                  {/* Mobile phone frame */}
                  <div className="w-[200px] flex-shrink-0">
                    <div className="relative bg-bf-text rounded-2xl p-2 overflow-hidden">
                      <div className="bg-white rounded-xl overflow-hidden">
                        {/* Mobile header bar */}
                        <div className="flex items-center h-11 px-3 border-b border-bf-border bg-gradient-to-b from-[#ececec] to-[#dfdfdf]">
                          <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-6 w-6 rounded flex items-center justify-center bg-bf-text"
                          >
                            <span className="text-white text-[8px] font-black">⚑</span>
                          </button>
                          <span className="ml-2 text-[10px] font-semibold text-bf-text">
                            Clients
                          </span>
                        </div>

                        {/* Mobile sidebar overlay */}
                        <AnimatePresence>
                          {mobileMenuOpen && (
                            <>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 z-10 rounded-xl"
                                onClick={() => setMobileMenuOpen(false)}
                              />
                              <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.3, ease }}
                                className="absolute left-2 top-2 bottom-2 w-[140px] bg-white z-20 rounded-lg shadow-lg border border-bf-border flex flex-col"
                              >
                                <div className="flex items-center justify-between px-2 py-2 border-b border-bf-border">
                                  <span className="text-[9px] font-bold text-bf-text">
                                    Black Flag
                                  </span>
                                  <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-bf-muted text-[10px]"
                                  >
                                    ✕
                                  </button>
                                </div>
                                <nav className="flex-1 py-1 px-1 space-y-0.5">
                                  {sidebarItems.map((item, i) => (
                                    <div
                                      key={item.label}
                                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[9px] font-medium ${
                                        activeSidebarItem === i
                                          ? "bg-bf-surface text-bf-text border border-bf-border"
                                          : "text-bf-muted"
                                      }`}
                                    >
                                      <span className="text-[10px]">{item.icon}</span>
                                      <span>{item.label}</span>
                                    </div>
                                  ))}
                                </nav>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        {/* Content placeholder */}
                        <div className="h-48 flex items-center justify-center">
                          <p className="text-[9px] text-bf-muted text-center px-4">
                            Tap flag icon to open mobile sidebar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile spec */}
                  <div className="flex-1 space-y-3">
                    <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                      <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">
                        Mobile Patterns
                      </p>
                      <div className="grid grid-cols-[8rem_1fr] gap-x-6 gap-y-2 text-sm">
                        {[
                          ["Sidebar", "Slide-in overlay, 256 px, always expanded"],
                          ["Trigger", "Logo icon tap → open sidebar"],
                          ["Overlay", "bg-black/50 · click to dismiss"],
                          ["Close", "✕ button in sidebar header"],
                          ["Tabs", "overflow-x-auto scrollbar-hide"],
                          ["Breadcrumbs", "hidden (md:flex only)"],
                          ["Header height", "h-16 (consistent with desktop)"],
                          ["Page title", "Visible in header bar"],
                        ].map(([k, v]) => (
                          <Fragment key={k}>
                            <span className="text-bf-muted">{k}</span>
                            <span className="font-mono text-bf-text text-xs">
                              {v}
                            </span>
                          </Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                      <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                        Responsive Breakpoints
                      </p>
                      <div className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-1.5 text-[11px]">
                        {[
                          ["< md", "Mobile sidebar (overlay), h-16 header, no breadcrumbs"],
                          ["≥ md", "Hover sidebar (64 → 208 px), h-20 header, breadcrumbs visible"],
                        ].map(([k, v]) => (
                          <Fragment key={k}>
                            <span className="text-bf-muted font-mono">{k}</span>
                            <span className="text-bf-text">{v}</span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 8. FULL COMPOSITE DEMO                     */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  8 · Composite — All Layers
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  How all four navigation tiers stack in a real detail page view.
                  Sidebar + Page Header + Tabs + Content with breadcrumbs.
                </p>

                {/* Full admin layout composite */}
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-bf-surface">
                  <div className="flex h-[360px]">
                    {/* Mini sidebar */}
                    <div className="w-12 flex-shrink-0 bg-gradient-to-b from-[#ececec] to-[#dfdfdf] border-r border-[#bdbdbd] flex flex-col py-2 items-center">
                      <div className="h-6 w-6 rounded bg-bf-text flex items-center justify-center mb-3">
                        <span className="text-white text-[8px] font-black">⚑</span>
                      </div>
                      {sidebarItems.map((item, i) => (
                        <div
                          key={item.label}
                          className={`relative w-8 h-8 rounded-md flex items-center justify-center text-[11px] mb-0.5 ${
                            i === 0
                              ? "bg-gradient-to-b from-[#fafafa] to-[#ececec] border border-[#c4c4c4] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                              : "text-bf-muted hover:bg-white/40"
                          }`}
                        >
                          {i === 0 && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-bf-text rounded-r" />
                          )}
                          {item.icon}
                        </div>
                      ))}
                      <div className="mt-auto">
                        <div className="w-6 h-6 rounded-full bg-bf-text/10 flex items-center justify-center text-[8px] font-bold text-bf-text">
                          KP
                        </div>
                      </div>
                    </div>

                    {/* Main area */}
                    <div className="flex-1 flex flex-col min-w-0">
                      {/* Entity header */}
                      <div className="h-12 flex items-center px-3 bg-gradient-to-b from-[#ececec] to-[#dfdfdf] border-b border-[#bdbdbd] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded bg-bf-text flex items-center justify-center">
                            <span className="text-white text-[10px] font-black">⚑</span>
                          </div>
                          <span className="text-sm font-medium text-bf-text truncate">
                            BFD Style Guide
                          </span>
                        </div>
                      </div>

                      {/* Platinum tab strip */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] border-b border-[#bdbdbd] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] overflow-x-auto">
                        {["Meetings", "Files", "Events", "Work", "Analytics"].map(
                          (tab, i) => (
                            <span
                              key={tab}
                              className={`px-2 py-1 text-[10px] font-medium rounded whitespace-nowrap ${
                                i === 2
                                  ? "border border-[#bcbcbc] bg-[#f8f8f8] text-bf-text shadow-sm"
                                  : "text-bf-muted"
                              }`}
                            >
                              {tab}
                            </span>
                          )
                        )}
                      </div>

                      {/* Content area */}
                      <div className="flex-1 bg-white p-3 overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="text-[10px] text-bf-muted">🔍</span>
                          {["All", "Linear", "GitHub"].map((f, i) => (
                            <span
                              key={f}
                              className={`px-1.5 py-0.5 text-[9px] font-medium rounded border ${
                                i === 0
                                  ? "bg-bf-text text-white border-bf-text"
                                  : "bg-white text-bf-muted border-bf-border"
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="flex items-center gap-2 p-2 rounded-lg border border-bf-border mb-1.5 hover:border-bf-text/30 transition-colors"
                          >
                            <div className="h-6 w-6 rounded-full bg-bf-surface flex items-center justify-center text-[8px] font-bold text-bf-text">
                              U{n}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-medium text-bf-text truncate">
                                Event card #{n}
                              </p>
                              <p className="text-[8px] text-bf-muted">
                                2 min ago · webhook
                              </p>
                            </div>
                            <span className="text-[8px] text-bf-muted opacity-40">⚡</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Composite label */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "① Sidebar (64 px)",
                    "② Entity Header",
                    "③ Tab Bar",
                    "④ Filter Bar",
                    "⑤ Content Cards",
                  ].map((label) => (
                    <span
                      key={label}
                      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-bf-paper border-2 border-bf-border text-bf-text"
                    >
                      {label}
                    </span>
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
