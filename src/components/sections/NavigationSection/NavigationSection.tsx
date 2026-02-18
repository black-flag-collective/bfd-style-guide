import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBuilding,
  IconBolt,
  IconCurrencyDollar,
  IconServer,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import {
  Search,
  Settings,
  Folder,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { SectionHeader } from "@/components/SectionHeader";

const ease = [0.16, 1, 0.3, 1] as const;

const ICON_SIZE = 20;
const ICON_STROKE = 1.75;

type TablerIcon = typeof IconBuilding;

interface SidebarItem {
  Icon: TablerIcon;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { Icon: IconBuilding, label: "Clients" },
  { Icon: IconBolt, label: "Events" },
  { Icon: IconCurrencyDollar, label: "Code Gen" },
  { Icon: IconServer, label: "Infrastructure" },
  { Icon: IconUsers, label: "People" },
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

const ipodFaces = ["Connection", "History", "Performance", "Summary"];

const drawerTabs = ["Overview", "Entity", "Timeline", "Artifacts", "Raw Source"];

const rangeOptions = ["24h", "7d", "30d"];

interface BreadcrumbExample {
  path: string[];
  icon: "building" | "bolt" | "settings" | "folder";
  iconLabel: string;
}

const breadcrumbIcons: Record<BreadcrumbExample["icon"], TablerIcon | typeof Settings | typeof Folder> = {
  building: IconBuilding,
  bolt: IconBolt,
  settings: Settings as unknown as TablerIcon,
  folder: Folder as unknown as TablerIcon,
};

const breadcrumbSets: BreadcrumbExample[] = [
  { path: ["Clients", "Acme Corp", "Project Alpha"], icon: "building", iconLabel: "A" },
  { path: ["Clients", "Black Flag", "Foundry", "Events"], icon: "bolt", iconLabel: "BF" },
  { path: ["Settings", "Vendors", "GitHub"], icon: "settings", iconLabel: "S" },
  { path: ["Events", "Webhook Delivery #4821"], icon: "bolt", iconLabel: "E" },
  { path: ["Clients", "HealthCo", "HW Portal", "Files", "docs/"], icon: "folder", iconLabel: "F" },
];

export function NavigationSection() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState(0);
  const [activeSettingsTab, setActiveSettingsTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIpodFace, setActiveIpodFace] = useState(0);
  const [activeDrawerTab, setActiveDrawerTab] = useState(0);
  const [activeRange, setActiveRange] = useState(0);

  return (
    <section id="navigation" className="relative bg-bf-bg py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="09"
                title="Navigation"
                description="Six tiers of navigation for complex admin interfaces. From primary sidebar to page-level platinum tabs, content-level segmented controls, drawer underline tabs, and filter bars. Every pattern below is the canonical specification — no alternatives, no variations."
              />

              {/* ═══════════════════════════════════════════ */}
              {/* 1. PRIMARY: Sidebar                        */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  1 · Primary — Sidebar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Hover-expand from 64 → 208 px. Active item uses a clean white fill
                  with subtle border and 3 px left accent bar. Collapsed shows only
                  icons with right-side tooltips; expanded reveals labels. User avatar
                  pinned to bottom.
                </p>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Interactive sidebar — full-height preview matching AdminSidebar.tsx */}
                  <div
                    className="relative rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex-shrink-0 flex flex-col bg-gradient-to-b from-[#ececec] to-[#dfdfdf] border border-[#bdbdbd] shadow-sm"
                    style={{ width: sidebarExpanded ? 208 : 64, height: 540 }}
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                  >
                    {/* Logo zone — h-20, crossfade between icon mark and full lockup */}
                    <div
                      className={`flex items-center h-20 px-3 ${
                        sidebarExpanded ? "justify-start" : "justify-center"
                      }`}
                    >
                      <div className="relative flex items-center h-10">
                        <div
                          className={`transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                            sidebarExpanded
                              ? "opacity-0 scale-90 pointer-events-none absolute left-0"
                              : "opacity-100 scale-100"
                          }`}
                        >
                          <BrandLogo variant="dark" size="sm" className="h-10 w-auto" />
                        </div>
                        <div
                          className={`transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                            sidebarExpanded
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95 pointer-events-none absolute left-0"
                          }`}
                        >
                          <img src="/logos/lockup-dark.svg" alt="Black Flag Design" className="h-7 w-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Nav items — @tabler/icons-react · size 20 · stroke 1.75 */}
                    <nav className="flex-1 py-3 px-3 space-y-1">
                      {sidebarItems.map((item, i) => {
                        const IconComponent = item.Icon;
                        const isActive = activeSidebarItem === i;
                        return (
                          <button
                            key={item.label}
                            onClick={() => setActiveSidebarItem(i)}
                            className={`relative w-full flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200 border ${
                              sidebarExpanded
                                ? "px-3 gap-3 justify-start"
                                : "justify-center"
                            } ${
                              isActive
                                ? "border-[#c4c4c4] bg-gradient-to-b from-[#fafafa] to-[#ececec] text-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                                : "border-transparent text-[#171717]/55 hover:bg-white/45 hover:text-[#171717]/85"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-[#171717] transition-all duration-200 ${
                                isActive ? "h-4 opacity-100" : "h-0 opacity-0"
                              }`}
                            />
                            <IconComponent size={ICON_SIZE} stroke={ICON_STROKE} className="flex-shrink-0" />
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
                        );
                      })}
                    </nav>

                    {/* User area — avatar pinned to bottom */}
                    <div className="border-t border-[#bdbdbd] px-3 py-3">
                      <div
                        className={`flex items-center rounded-lg py-2 hover:bg-white/45 transition-colors cursor-pointer ${
                          sidebarExpanded
                            ? "px-2 gap-3 justify-start"
                            : "justify-center"
                        }`}
                      >
                        <div className="h-8 w-8 rounded-full bg-[#171717]/10 flex items-center justify-center text-xs font-bold text-[#171717] flex-shrink-0">
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
                              <p className="text-sm font-medium text-[#171717] truncate whitespace-nowrap">
                                Keith Pattison
                              </p>
                              <p className="text-xs text-[#171717]/55 truncate whitespace-nowrap">
                                keith@blackflag.design
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Spec cards */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-6 space-y-3">
                      <p className="text-xs font-black text-bf-text uppercase tracking-wider">
                        Sidebar Spec
                      </p>
                      <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-3 sm:gap-x-6 gap-y-2 text-sm">
                        {[
                          ["Icons", "@tabler/icons-react · size 20 · stroke 1.75"],
                          ["Collapsed", "w-16 (64 px) · icon only"],
                          ["Expanded", "w-52 (208 px) · icon + label"],
                          ["Trigger", "mouseenter / mouseleave"],
                          ["Easing", "cubic-bezier(0.25, 0.1, 0.25, 1)"],
                          ["Duration", "300 ms"],
                          ["Frame bg", "gradient from-[#ececec] to-[#dfdfdf]"],
                          ["Frame border", "border-[#bdbdbd]"],
                          ["Active fill", "gradient from-[#fafafa] to-[#ececec]"],
                          ["Active border", "border-[#c4c4c4]"],
                          ["Active shadow", "inset 0 1px 0 rgba(255,255,255,0.8)"],
                          ["Active bar", "3 px left · bg-foreground · rounded-r-full"],
                          ["Inactive text", "text-foreground/55"],
                          ["Hover", "hover:bg-white/45 hover:text-foreground/85"],
                          ["Logo collapsed", "BrandLogo mark · h-10 · crossfade"],
                          ["Logo expanded", "lockup-dark.svg · h-7 · crossfade"],
                          ["Logo zone", "h-20 · aligns with page header"],
                          ["Mobile", "Slide-in overlay, w-64 (256 px), always expanded"],
                          ["Tooltips", "Right-side on collapsed icons (shadcn/ui)"],
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
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  2 · Page Headers
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Page headers anchor every view. Paper background with strong
                  typographic emphasis. Breadcrumbs sit above the title on desktop.
                  Optional action buttons aligned right.
                </p>

                <div className="space-y-4">
                  {/* Top-level page header */}
                  <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                    <div className="border-b-2 border-bf-border bg-bf-paper">
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
                            <span className="px-3 py-1.5 text-xs font-bold btn-active rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                              + New Client
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bf-surface px-4 py-2">
                      <span className="text-[10px] font-mono text-bf-muted uppercase tracking-wider">
                        Top-level page · h-16 md:h-20 · bg-bf-paper
                      </span>
                    </div>
                  </div>

                  {/* Detail page header with breadcrumbs */}
                  <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                    <div className="border-b-2 border-bf-border bg-bf-paper">
                      <div className="h-16 md:h-20 flex items-center px-4 md:px-6">
                        <div className="flex items-center justify-between w-full gap-3">
                          <div className="min-w-0 flex-1">
                            <nav className="hidden md:flex items-center gap-1.5 text-xs text-bf-muted mb-1">
                              <span className="hover:text-bf-text cursor-pointer transition-colors">
                                Clients
                              </span>
                              <ChevronRight size={12} strokeWidth={2} className="text-bf-border" />
                              <span className="hover:text-bf-text cursor-pointer transition-colors">
                                Black Flag
                              </span>
                              <ChevronRight size={12} strokeWidth={2} className="text-bf-border" />
                              <span className="text-bf-text">Foundry</span>
                            </nav>
                            <h1 className="text-xl md:text-2xl font-semibold text-bf-text tracking-tight">
                              Events
                            </h1>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="px-3 py-1.5 text-xs font-medium text-bf-muted border border-bf-border rounded-lg cursor-pointer hover:bg-bf-paper transition-colors">
                              Filter
                            </span>
                            <span className="px-3 py-1.5 text-xs font-medium text-bf-muted border border-bf-border rounded-lg cursor-pointer hover:bg-bf-paper transition-colors">
                              Export
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bf-surface px-4 py-2">
                      <span className="text-[10px] font-mono text-bf-muted uppercase tracking-wider">
                        With breadcrumbs · action buttons · bg-bf-paper
                      </span>
                    </div>
                  </div>

                  {/* Entity header (DetailPageLayout pattern) */}
                  <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                    <div className="border-b-2 border-bf-border bg-bf-paper">
                      <div className="h-16 md:h-20 flex items-center px-4 md:px-6">
                        <div className="flex items-center justify-between w-full gap-3">
                          <nav className="flex items-center gap-3 text-xl md:text-2xl font-medium text-bf-text tracking-tight min-w-0">
                            <div className="h-9 w-9 rounded bg-bf-text flex items-center justify-center flex-shrink-0 p-1.5">
                              <BrandLogo variant="light" size="sm" className="w-full h-full" />
                            </div>
                            <span className="truncate">BFD Style Guide</span>
                          </nav>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="px-3 py-1.5 text-xs font-bold btn-active rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                              Deploy
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bf-surface px-4 py-2">
                      <span className="text-[10px] font-mono text-bf-muted uppercase tracking-wider">
                        Entity header · logo + name · DetailPageLayout pattern
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header spec */}
                <div className="mt-4 bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">
                    Page Header Spec
                  </p>
                  <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-3 sm:gap-x-6 gap-y-2 text-sm">
                    {[
                      ["Height", "h-16 (64 px) mobile · h-20 (80 px) desktop"],
                      ["Background", "bg-bf-paper"],
                      ["Border", "border-b-2 border-bf-border"],
                      ["Title size", "text-xl md:text-2xl · font-semibold"],
                      ["Breadcrumbs", "hidden md:flex · text-xs · above title"],
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
              {/* 3. PLATINUM TAB BAR                        */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  3 · Platinum Tab Bar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  The signature page-level secondary navigation. A brushed-metal
                  gradient track with raised pill triggers. Active state uses a subtle
                  border, light fill, and inset shadow that feels tactile — like real
                  hardware controls. Used on every detail page and settings panel.
                </p>

                {/* Detail page tabs (8+ tabs, horizontal scroll) */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  Detail Page — 8 tabs, scrollable
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden mb-4">
                  <div className="border-y border-[#bdbdbd] bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] px-2 py-2">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                      {detailPageTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDetailTab(i)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0 border ${
                            activeDetailTab === i
                              ? "border-[#bcbcbc] bg-[#f8f8f8] text-[#171717] shadow-[0_1px_0_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]"
                              : "border-transparent text-[#171717]/60 hover:bg-white/40 hover:text-[#171717]"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-bf-paper h-16 flex items-center justify-center">
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
                  <div className="border-y border-[#bdbdbd] bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] px-2 py-2">
                    <div className="flex gap-2">
                      {settingsTabItems.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveSettingsTab(i)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap border ${
                            activeSettingsTab === i
                              ? "border-[#bcbcbc] bg-[#f8f8f8] text-[#171717] shadow-[0_1px_0_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]"
                              : "border-transparent text-[#171717]/60 hover:bg-white/40 hover:text-[#171717]"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-bf-paper h-12 flex items-center justify-center">
                    <span className="text-sm text-bf-muted">
                      Access settings panel
                    </span>
                  </div>
                </div>

                {/* Platinum tab spec */}
                <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                    Platinum Tab Spec
                  </p>
                  <p className="text-xs text-bf-muted mb-3">
                    Metallic gradient track with raised pill active states. The only
                    page-level secondary navigation pattern. No alternatives.
                  </p>
                  <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                    {[
                      ["Track bg", "gradient from-[#f2f2f2] to-[#dcdcdc]"],
                      ["Track border", "border-y border-[#bdbdbd]"],
                      ["Track shadow", "inset 0 1px 0 rgba(255,255,255,0.85)"],
                      ["Active bg", "bg-[#f8f8f8]"],
                      ["Active border", "border-[#bcbcbc]"],
                      ["Active shadow", "0 1px 0 white/70, inset 0 1px 0 white/90"],
                      ["Active text", "text-foreground (#171717)"],
                      ["Inactive text", "text-foreground/60"],
                      ["Hover", "hover:bg-white/40"],
                      ["Radius", "rounded-md"],
                      ["Padding", "px-3 py-1.5"],
                      ["Gap", "gap-2"],
                      ["Routing", "URL (?tab=) via TanStack Router"],
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
              {/* 4. SETTINGS SECONDARY NAV                  */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  4 · Settings Secondary Nav
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Keyboard-navigable sub-section picker with prev/next arrow buttons.
                  Arrow keys cycle through items. Used within vendor settings to navigate
                  between individual vendor configurations.
                </p>

                <div className="rounded-xl border-2 border-bf-border overflow-hidden">
                  <div className="flex shrink-0 items-center gap-1 border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#ececec] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] px-1 py-1.5">
                    {/* Prev button */}
                    <button
                      onClick={() =>
                        setActiveSettingsTab(
                          (activeSettingsTab - 1 + settingsTabItems.length) %
                            settingsTabItems.length
                        )
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#171717]/45 transition-colors hover:bg-black/5 hover:text-[#171717]"
                    >
                      <ChevronLeft size={14} strokeWidth={2} />
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
                                ? "border border-[#bcbcbc] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                : "border border-transparent text-[#171717]/45 hover:bg-white/50 hover:text-[#171717]"
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
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#171717]/45 transition-colors hover:bg-black/5 hover:text-[#171717]"
                    >
                      <ChevronRight size={14} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="bg-bf-paper h-12 flex items-center justify-center">
                    <span className="text-xs text-bf-muted">
                      ← / → arrow keys to navigate · {settingsTabItems[activeSettingsTab]} selected
                    </span>
                  </div>
                </div>

                <div className="mt-3 bg-bf-paper rounded-xl border-2 border-bf-border p-4">
                  <div className="grid grid-cols-[7rem_1fr] gap-x-6 gap-y-1.5 text-[11px]">
                    {[
                      ["Track bg", "gradient from-[#f6f6f6] to-[#ececec]"],
                      ["Track border", "border-b border-[#c8c8c8]"],
                      ["Active bg", "bg-white"],
                      ["Active border", "border-[#bcbcbc]"],
                      ["Active shadow", "0 1px 2px rgba(0,0,0,0.08), inset white/90"],
                      ["Inactive", "text-foreground/45 hover:bg-white/50"],
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
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
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
                      <Search size={14} strokeWidth={ICON_STROKE} className="text-bf-muted mr-1 flex-shrink-0" />
                      {filterSortTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveFilterTab(i)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 border ${
                            activeFilterTab === i
                              ? "btn-active-border"
                              : "bg-bf-paper text-bf-muted border-bf-border hover:border-bf-text/40 hover:text-bf-text"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                      <div className="h-4 w-px bg-bf-border mx-1" />
                      <span className="px-2.5 py-1 text-xs font-medium bg-bf-paper text-bf-muted border border-bf-border rounded-md">
                        Status ▾
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium bg-bf-paper text-bf-muted border border-bf-border rounded-md">
                        Date ▾
                      </span>
                    </div>
                  </div>
                  <div className="bg-bf-paper h-12 flex items-center justify-center">
                    <span className="text-xs text-bf-muted">
                      Showing {filterSortTabs[activeFilterTab]} events
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 6. IPOD SEGMENTS                           */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.27, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  6 · iPod Segments
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Rounded pill controls for switching &ldquo;faces&rdquo; within a
                  content area — like flipping a card to see different sides of the
                  same entity. Used in People and Vendor management views. Each face
                  triggers a card-flip animation on the content below.
                </p>

                <div className="rounded-xl border-2 border-bf-border overflow-hidden mb-4">
                  <div className="bg-gradient-to-b from-[#f6f6f6] to-[#ececec] border-b border-[#c8c8c8] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Range selector (sits beside iPod segments in real app) */}
                      <div className="flex items-center gap-1">
                        {rangeOptions.map((range, i) => (
                          <button
                            key={range}
                            onClick={() => setActiveRange(i)}
                            className={`rounded-md px-2 py-0.5 text-xs font-medium transition-all border ${
                              activeRange === i
                                ? "border-[#bcbcbc] bg-white text-[#171717]"
                                : "border-transparent text-[#171717]/45 hover:bg-white/50"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                      <div className="h-4 w-px bg-[#c8c8c8]" />
                      {/* iPod segments */}
                      <div className="inline-flex gap-1">
                        {ipodFaces.map((face, i) => (
                          <button
                            key={face}
                            onClick={() => setActiveIpodFace(i)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border ${
                              activeIpodFace === i
                                ? "border-[#aeaeae] bg-gradient-to-b from-[#fefefe] to-[#ebebeb] text-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_1px_1px_rgba(0,0,0,0.08)]"
                                : "border-transparent text-[#171717]/55 hover:bg-white/40 hover:text-[#171717]"
                            }`}
                          >
                            {face}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-bf-paper h-24 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIpodFace}
                        initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                        className="text-center"
                        style={{ perspective: 1000 }}
                      >
                        <p className="text-sm font-medium text-bf-text">
                          {ipodFaces[activeIpodFace]} Face
                        </p>
                        <p className="text-xs text-bf-muted mt-1">
                          Card flip animation · {rangeOptions[activeRange]} range selected
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* iPod segment spec */}
                  <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                      iPod Segment Spec
                    </p>
                    <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                      {[
                        ["Shape", "rounded-full (pill)"],
                        ["Padding", "px-3.5 py-1.5"],
                        ["Active bg", "gradient from-[#fefefe] to-[#ebebeb]"],
                        ["Active border", "border-[#aeaeae]"],
                        ["Active shadow", "inset white/92, 0 1px 1px black/8"],
                        ["Inactive", "text-foreground/55 hover:bg-white/40"],
                        ["Content anim", "cardFlipIn 0.5s ease-out"],
                        ["Routing", "URL-based (?face= param)"],
                      ].map(([k, v]) => (
                        <Fragment key={k}>
                          <span className="text-bf-muted">{k}</span>
                          <span className="font-mono text-bf-text">{v}</span>
                        </Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Range selector spec */}
                  <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                      Range Selector Spec
                    </p>
                    <p className="text-xs text-bf-muted mb-2">
                      Compact time-range toggles. Sits inline beside iPod segments
                      or filter bars. Smaller than tabs — intentionally minimal.
                    </p>
                    <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                      {[
                        ["Size", "text-xs · px-2 py-0.5"],
                        ["Active", "border-[#bcbcbc] bg-white"],
                        ["Inactive", "border-transparent text-foreground/45"],
                        ["Radius", "rounded-md"],
                        ["Routing", "URL-based (?range= param)"],
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
              {/* 7. UNDERLINE TABS                          */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  7 · Underline Tabs
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Lightweight tabs for drawers, modals, and side panels. Minimal
                  chrome — just a 2 px bottom border indicator. The lightest
                  navigation pattern in the hierarchy. Tab count varies by context
                  (2–6). Never used at page level.
                </p>

                {/* Drawer-style underline tabs demo */}
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-white mb-4">
                  <div className="border-b border-bf-border px-5">
                    <div className="flex gap-6 overflow-x-auto">
                      {drawerTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDrawerTab(i)}
                          className={`py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                            activeDrawerTab === i
                              ? "border-[#171717] text-[#171717]"
                              : "border-transparent text-[#171717]/40 hover:text-[#171717]/65"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-24 flex items-center justify-center">
                    <span className="text-sm text-bf-muted">
                      {drawerTabs[activeDrawerTab]} panel content
                    </span>
                  </div>
                </div>

                {/* Fewer tabs variant */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  Minimal variant — 2 tabs (Feedback source)
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-white mb-4">
                  <div className="border-b border-bf-border px-5">
                    <div className="flex gap-6">
                      {["Overview", "Raw Source"].map((tab, i) => (
                        <button
                          key={tab}
                          className={`py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                            i === 0
                              ? "border-[#171717] text-[#171717]"
                              : "border-transparent text-[#171717]/40 hover:text-[#171717]/65"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-sm text-bf-muted">
                      Overview content
                    </span>
                  </div>
                </div>

                <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                    Underline Tab Spec
                  </p>
                  <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                    {[
                      ["Indicator", "border-b-2 border-foreground"],
                      ["Inactive", "border-transparent text-foreground/40"],
                      ["Hover", "text-foreground/65"],
                      ["Padding", "py-3 (vertical only)"],
                      ["Gap", "gap-6 (generous, airy spacing)"],
                      ["Background", "bg-white (clean, no gradient)"],
                      ["Context", "Drawers, modals, panels only"],
                      ["Routing", "Local state (never URL-persisted)"],
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
              {/* 8. NAVIGATION HIERARCHY                    */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.33, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  8 · Navigation Hierarchy
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  How the six navigation tiers compose in a real admin interface.
                  Each tier has a single pattern — no alternatives, no feature flags,
                  no &ldquo;it depends.&rdquo; Pick the tier that matches your context.
                </p>

                <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-6 space-y-4">
                  {[
                    {
                      tier: "1",
                      name: "Sidebar",
                      pattern: "Hover-expand rail",
                      context: "Top-level app sections (Clients, Events, Settings…)",
                      style: "Gradient track, 3 px left accent, icon + label",
                    },
                    {
                      tier: "2",
                      name: "Page Header",
                      pattern: "Breadcrumb + title",
                      context: "Every page — anchors the view",
                      style: "Paper bg, h-20, entity icon left",
                    },
                    {
                      tier: "3",
                      name: "Platinum Tabs",
                      pattern: "Raised pill on metallic track",
                      context: "Page sub-sections (Detail tabs, Settings tabs)",
                      style: "Gradient track, border + inset shadow active",
                    },
                    {
                      tier: "4",
                      name: "Settings Sub-Nav",
                      pattern: "Chevron picker",
                      context: "Cycling within a tab (vendor configs, meeting sources)",
                      style: "Gradient track, white pill active, ← → arrows",
                    },
                    {
                      tier: "5",
                      name: "iPod Segments",
                      pattern: "Rounded pill toggle",
                      context: "View/face switching within content (Connection, History…)",
                      style: "Pill shape, gradient active, card flip animation",
                    },
                    {
                      tier: "6",
                      name: "Underline Tabs",
                      pattern: "Border-bottom indicator",
                      context: "Drawers, modals, side panels",
                      style: "Minimal — 2 px bottom border, no bg, gap-6",
                    },
                  ].map((tier) => (
                    <div key={tier.tier} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#171717] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {tier.tier}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-sm font-bold text-bf-text">
                            {tier.name}
                          </span>
                          <span className="text-[10px] font-mono text-bf-muted">
                            {tier.pattern}
                          </span>
                        </div>
                        <p className="text-xs text-bf-muted">{tier.context}</p>
                        <p className="text-[10px] font-mono text-bf-muted/70 mt-0.5">
                          {tier.style}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 9. BREADCRUMBS                             */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  9 · Breadcrumbs
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  The final segment is the page title (bold). Preceding segments are
                  muted links with chevron separators. Entity icon appears at the leading edge.
                  Desktop only — hidden on mobile.
                </p>

                <div className="space-y-3">
                  {breadcrumbSets.map((example, i) => {
                    const IconComponent = breadcrumbIcons[example.icon];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease }}
                        viewport={{ once: true }}
                        className="bg-bf-surface rounded-xl border-2 border-bf-border px-5 py-3.5 flex items-center gap-3 hover:border-bf-text/30 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg btn-active flex items-center justify-center flex-shrink-0">
                          <IconComponent size={16} strokeWidth={ICON_STROKE} />
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                          {example.path.map((segment, j) => (
                            <span key={j} className="flex items-center gap-1.5">
                              {j > 0 && (
                                <ChevronRight size={12} strokeWidth={2} className="text-bf-border" />
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
                    );
                  })}
                </div>

                <div className="mt-4 bg-bf-paper rounded-xl border-2 border-bf-border p-4">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                    Entity Hierarchy
                  </p>
                  <p className="text-xs text-bf-muted mb-3">
                    The canonical entity hierarchy is a strict two-level structure:
                    <strong> Client → Project</strong>. All content (events, files, meetings)
                    lives under a project. Breadcrumbs reflect this at every depth.
                  </p>
                  <div className="bg-bf-paper rounded-lg border border-bf-border p-3 font-mono text-[10px] sm:text-xs text-bf-text space-y-1 overflow-x-auto">
                    <p className="whitespace-nowrap">Clients (top-level page)</p>
                    <p className="whitespace-nowrap pl-4">└─ Client Detail (tabs: Projects, Meetings, Events, Files, Expenses)</p>
                    <p className="whitespace-nowrap pl-8">└─ Project Detail (tabs: Meetings, Files, Knowledge, ...)</p>
                    <p className="whitespace-nowrap pl-12">└─ Individual item views (event drawer, file viewer, etc.)</p>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════ */}
              {/* 10. MOBILE NAV                             */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  10 · Mobile Navigation
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Mobile replaces the hover sidebar with a hamburger trigger and slide-in
                  overlay. Tab bars switch to horizontal scroll. Breadcrumbs are hidden.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Mobile phone frame */}
                  <div className="w-[200px] flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative bg-bf-text rounded-2xl p-2 overflow-hidden">
                      <div className="bg-white rounded-xl overflow-hidden">
                        {/* Mobile header bar */}
                        <div className="flex items-center h-11 px-3 border-b border-[#bdbdbd] bg-white">
                          <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-6 w-auto flex items-center justify-center"
                          >
                            <BrandLogo variant="dark" size="sm" className="h-5 w-auto" />
                          </button>
                          <span className="ml-2 text-[10px] font-semibold text-[#171717]">
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
                                className="absolute inset-0 bg-black/50 z-10 rounded-xl"
                                onClick={() => setMobileMenuOpen(false)}
                              />
                              <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                className="absolute left-2 top-2 bottom-2 w-[140px] bg-white z-20 rounded-lg shadow-lg border border-[#bdbdbd] flex flex-col"
                              >
                                <div className="flex items-center justify-between px-2 py-2">
                                  <BrandLogo variant="dark" size="sm" className="h-4 w-auto" />
                                  <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-[#171717]/55 hover:text-[#171717] transition-colors"
                                  >
                                    <IconX size={12} stroke={2} />
                                  </button>
                                </div>
                                <nav className="flex-1 py-1 px-1.5 space-y-0.5">
                                  {sidebarItems.map((item, i) => {
                                    const IconComponent = item.Icon;
                                    const isActive = activeSidebarItem === i;
                                    return (
                                      <div
                                        key={item.label}
                                        className={`relative flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[9px] font-medium border ${
                                          isActive
                                            ? "border-[#c4c4c4] bg-gradient-to-b from-[#fafafa] to-[#ececec] text-[#171717]"
                                            : "border-transparent text-[#171717]/55"
                                        }`}
                                      >
                                        {isActive && (
                                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#171717] rounded-r-full" />
                                        )}
                                        <IconComponent size={12} stroke={ICON_STROKE} />
                                        <span>{item.label}</span>
                                      </div>
                                    );
                                  })}
                                </nav>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        {/* Content placeholder */}
                        <div className="h-48 flex items-center justify-center">
                          <p className="text-[9px] text-[#171717]/45 text-center px-4">
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
                      <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-3 sm:gap-x-6 gap-y-2 text-sm">
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
              {/* 11. FULL COMPOSITE DEMO                    */}
              {/* ═══════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  11 · Composite — All Layers
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  How multiple navigation tiers stack in a real detail page view.
                  Sidebar + Page Header + Platinum Tabs + Content with filter bar.
                </p>

                {/* Full admin layout composite */}
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-bf-surface">
                  <div className="flex h-[360px]">
                    {/* Mini sidebar — collapsed state matching admin sidebar */}
                    <div className="w-12 flex-shrink-0 bg-gradient-to-b from-[#ececec] to-[#dfdfdf] border-r border-[#bdbdbd] flex flex-col py-2 items-center">
                      <div className="h-8 w-8 flex items-center justify-center mb-3">
                        <BrandLogo variant="dark" size="sm" className="h-8 w-auto" />
                      </div>
                      {sidebarItems.map((item, i) => {
                        const IconComponent = item.Icon;
                        return (
                          <div
                            key={item.label}
                            className={`relative w-8 h-8 rounded-md flex items-center justify-center mb-0.5 border ${
                              i === 0
                                ? "border-[#c4c4c4] bg-gradient-to-b from-[#fafafa] to-[#ececec] text-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                                : "border-transparent text-[#171717]/55 hover:bg-white/45"
                            }`}
                          >
                            {i === 0 && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#171717] rounded-r-full" />
                            )}
                            <IconComponent size={14} stroke={ICON_STROKE} />
                          </div>
                        );
                      })}
                      <div className="mt-auto">
                        <div className="w-6 h-6 rounded-full bg-[#171717]/10 flex items-center justify-center text-[8px] font-bold text-[#171717]">
                          KP
                        </div>
                      </div>
                    </div>

                    {/* Main area */}
                    <div className="flex-1 flex flex-col min-w-0">
                      {/* Entity header */}
                      <div className="h-12 flex items-center px-3 bg-bf-paper border-b-2 border-bf-border">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded bg-bf-text flex items-center justify-center p-1">
                            <BrandLogo variant="light" size="sm" className="w-full h-full" />
                          </div>
                          <span className="text-sm font-medium text-bf-text truncate">
                            BFD Style Guide
                          </span>
                        </div>
                      </div>

                      {/* Tab strip — Platinum style */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] border-y border-[#bdbdbd] overflow-x-auto">
                        {["Meetings", "Files", "Events", "Work", "Analytics"].map(
                          (tab, i) => (
                            <span
                              key={tab}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded whitespace-nowrap border ${
                                i === 2
                                  ? "border-[#bcbcbc] bg-[#f8f8f8] text-[#171717] shadow-[0_1px_0_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                  : "border-transparent text-[#171717]/55"
                              }`}
                            >
                              {tab}
                            </span>
                          )
                        )}
                      </div>

                      {/* Content area */}
                      <div className="flex-1 bg-bf-paper p-3 overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-3">
                          <Search size={10} strokeWidth={ICON_STROKE} className="text-bf-muted" />
                          {["All", "Linear", "GitHub"].map((f, i) => (
                            <span
                              key={f}
                              className={`px-1.5 py-0.5 text-[9px] font-medium rounded border ${
                                i === 0
                                  ? "btn-active-border"
                                  : "bg-bf-paper text-bf-muted border-bf-border"
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
                            <IconBolt size={10} stroke={ICON_STROKE} className="text-bf-muted opacity-40" />
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
                    "③ Platinum Tabs",
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
    </section>
  );
}
