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
import { GitHubDark } from "developer-icons";
import { BrandLogo } from "@/components/BrandLogo";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";
import type { Device } from "@/components/DeviceFrame/DeviceFrame";
import { CLIENTS } from "../EventCardsSection/shared/ClientGrid";

function LinearIcon({ size = 14 }: { size?: number }) {
  return (
    <img
      src="https://linear.app/favicon.ico"
      alt="Linear"
      width={size}
      height={size}
      className="inline-block"
    />
  );
}

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

const listPageClients = CLIENTS.slice(0, 3);

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map(word => word[0]).join("").toUpperCase();
}

export function NavigationSection() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState(0);
  const [activeSettingsTab, setActiveSettingsTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIpodFace, setActiveIpodFace] = useState(0);
  const [activeDrawerTab, setActiveDrawerTab] = useState(0);
  const [activeMinimalTab, setActiveMinimalTab] = useState(0);
  const [activeRange, setActiveRange] = useState(0);
  const [sidebarDevice, setSidebarDevice] = useState<Device>("desktop");

  return (
    <section id="navigation" className="relative bg-bf-paper border-t-4 border-bf-cobalt py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="09"
                title="Navigation"
                description="Navigation tiers for complex admin interfaces — primary sidebar, page-level tab bars, segmented controls, underline tabs, filter bars, and page compositions. Every pattern below is the canonical specification."
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
                  Hover-expand from 64 → 208 px. Active item uses a gradient fill
                  with subtle border and 3 px left accent bar. Collapsed shows only
                  icons with tooltip hints; expanded reveals labels. Footer rail
                  reserves space below a divider.
                </p>

                <DeviceFrame
                  hint="Hover sidebar to expand · click items to navigate"
                  desktopHeight={520}
                  tabletHeight={520}
                  mobileHeight={520}
                  onDeviceChange={setSidebarDevice}
                >
                  {({ device }) => {
                    if (device === "mobile") {
                      return (
                        <div style={{ height: "100%", background: "#FFFFFF", position: "relative" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, padding: "0 16px", borderBottom: "1px solid #D4D4D8" }}>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}>
                              <img src="/logos/mark-dark.svg" alt="" style={{ height: 24, width: "auto" }} />
                            </button>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>
                              {sidebarItems[activeSidebarItem]?.label ?? "Logo"}
                            </span>
                            <div style={{ width: 24 }} />
                          </div>
                          <AnimatePresence>
                            {mobileMenuOpen && (
                              <>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 10 }}
                                  onClick={() => setMobileMenuOpen(false)}
                                />
                                <motion.div
                                  initial={{ x: "-100%" }}
                                  animate={{ x: 0 }}
                                  exit={{ x: "-100%" }}
                                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 210, background: "#FFFFFF", zIndex: 20, borderRight: "1px solid #bdbdbd", display: "flex", flexDirection: "column" }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 12px", height: 52, flexShrink: 0, borderBottom: "1px solid #D4D4D8" }}>
                                    <img src="/logos/lockup-dark.svg" alt="" style={{ height: 28, width: "auto" }} />
                                    <button onClick={() => setMobileMenuOpen(false)} style={{ color: "#71717A", background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                                      <IconX size={16} stroke={1.75} />
                                    </button>
                                  </div>
                                  <nav style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
                                    {sidebarItems.map((item, i) => {
                                      const IconComponent = item.Icon;
                                      const isActive = activeSidebarItem === i;
                                      return (
                                        <button
                                          key={item.label}
                                          onClick={() => { setActiveSidebarItem(i); setMobileMenuOpen(false); }}
                                          style={{
                                            display: "flex", alignItems: "center", width: "100%", borderRadius: 7, padding: "7px 10px", gap: 10, justifyContent: "flex-start", fontSize: 12, fontWeight: 500, position: "relative",
                                            border: isActive ? "1px solid #c4c4c4" : "1px solid transparent",
                                            background: isActive ? "linear-gradient(to bottom, #fafafa, #ececec)" : "transparent",
                                            color: isActive ? "#171717" : "rgba(23,23,23,0.55)",
                                            boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.8)" : "none",
                                            transition: "all 200ms ease", cursor: "pointer",
                                          }}
                                        >
                                          <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 2.5, borderRadius: "0 9999px 9999px 0", background: "#171717", height: isActive ? 12 : 0, opacity: isActive ? 1 : 0, transition: "all 200ms ease" }} />
                                          <IconComponent size={15} stroke={1.75} style={{ flexShrink: 0 }} />
                                          <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
                                        </button>
                                      );
                                    })}
                                  </nav>
                                  <div style={{ borderTop: "1px solid #bdbdbd", padding: "8px", flexShrink: 0, minHeight: 24 }} />
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100% - 52px)" }}>
                            <p style={{ fontSize: 12, color: "#71717A", textAlign: "center", padding: "0 24px" }}>
                              {mobileMenuOpen ? "" : "Tap logo mark to open sidebar"}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    const isTablet = device === "tablet";
                    return (
                      <div style={{ display: "flex", height: "100%" }}>
                        <div
                          style={{
                            display: "flex", flexDirection: "column",
                            backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)",
                            borderRight: "1px solid #bdbdbd",
                            width: sidebarExpanded && !isTablet ? 200 : 60,
                            minWidth: sidebarExpanded && !isTablet ? 200 : 60,
                            transition: "all 300ms cubic-bezier(0.25,0.1,0.25,1)",
                            flexShrink: 0, overflow: "hidden",
                          }}
                          onMouseEnter={() => !isTablet && setSidebarExpanded(true)}
                          onMouseLeave={() => !isTablet && setSidebarExpanded(false)}
                        >
                          <div style={{ display: "flex", alignItems: "center", height: 60, padding: "0 10px", flexShrink: 0, justifyContent: sidebarExpanded && !isTablet ? "flex-start" : "center" }}>
                            <div style={{ position: "relative", display: "flex", alignItems: "center", height: 36 }}>
                              <div style={{ transition: "all 300ms cubic-bezier(0.25,0.1,0.25,1)", opacity: sidebarExpanded && !isTablet ? 0 : 1, transform: sidebarExpanded && !isTablet ? "scale(0.9)" : "scale(1)", position: sidebarExpanded && !isTablet ? "absolute" : "relative", left: 0, pointerEvents: sidebarExpanded && !isTablet ? "none" : "auto" }}>
                                <img src="/logos/mark-dark.svg" alt="" style={{ height: 32, width: "auto" }} />
                              </div>
                              <div style={{ transition: "all 300ms cubic-bezier(0.25,0.1,0.25,1)", opacity: sidebarExpanded && !isTablet ? 1 : 0, transform: sidebarExpanded && !isTablet ? "scale(1)" : "scale(0.95)", position: sidebarExpanded && !isTablet ? "relative" : "absolute", left: 0, pointerEvents: sidebarExpanded && !isTablet ? "auto" : "none" }}>
                                <img src="/logos/lockup-dark.svg" alt="" style={{ height: 36, width: "auto" }} />
                              </div>
                            </div>
                          </div>
                          <nav style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
                            {sidebarItems.map((item, i) => {
                              const IconComponent = item.Icon;
                              const isActive = activeSidebarItem === i;
                              const showLabel = sidebarExpanded && !isTablet;
                              return (
                                <button
                                  key={item.label}
                                  onClick={() => setActiveSidebarItem(i)}
                                  style={{
                                    display: "flex", alignItems: "center", width: "100%", borderRadius: 7,
                                    padding: showLabel ? "8px 10px" : "8px 0",
                                    gap: showLabel ? 10 : 0,
                                    justifyContent: showLabel ? "flex-start" : "center",
                                    fontSize: 13, fontWeight: 500, position: "relative",
                                    border: isActive ? "1px solid #c4c4c4" : "1px solid transparent",
                                    background: isActive ? "linear-gradient(to bottom, #fafafa, #ececec)" : "transparent",
                                    color: isActive ? "#171717" : "rgba(23,23,23,0.55)",
                                    boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.8)" : "none",
                                    transition: "all 200ms ease", cursor: "pointer",
                                  }}
                                >
                                  <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, borderRadius: "0 9999px 9999px 0", background: "#171717", height: isActive ? 14 : 0, opacity: isActive ? 1 : 0, transition: "all 200ms ease" }} />
                                  <IconComponent size={18} stroke={1.75} style={{ flexShrink: 0 }} />
                                  {showLabel && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{item.label}</span>}
                                </button>
                              );
                            })}
                          </nav>
                          <div style={{ borderTop: "1px solid #bdbdbd", padding: "10px 8px", flexShrink: 0, minHeight: 32 }} />
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                          <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "2px solid #D4D4D8", background: "#FAFAFA" }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#171717" }}>
                              {sidebarItems[activeSidebarItem]?.label ?? "Logo"}
                            </span>
                          </div>
                          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA" }}>
                            <span style={{ fontSize: 12, color: "#71717A" }}>
                              {sidebarItems[activeSidebarItem]?.label ?? "Logo"} content area
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </DeviceFrame>

                {/* Spec card — context-sensitive to active tab */}
                <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-6 space-y-3">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider">
                    {sidebarDevice === "desktop" ? "Desktop Sidebar Spec" : sidebarDevice === "tablet" ? "Tablet Sidebar Spec" : "Mobile Sidebar Spec"}
                  </p>
                  <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-3 sm:gap-x-6 gap-y-2 text-sm">
                    {(sidebarDevice === "desktop"
                      ? [
                          ["Icons", "@tabler/icons-react · size 20 · stroke 1.75"],
                          ["Collapsed", "w-16 (64 px) · icon only + tooltip"],
                          ["Expanded", "w-52 (208 px) · icon + label"],
                          ["Trigger", "mouseenter / mouseleave"],
                          ["Easing", "cubic-bezier(0.25, 0.1, 0.25, 1)"],
                          ["Duration", "300 ms"],
                          ["Frame bg", "linear-gradient(to bottom, #ececec, #dfdfdf)"],
                          ["Frame border", "1px solid #bdbdbd"],
                          ["Active fill", "linear-gradient(to bottom, #fafafa, #ececec)"],
                          ["Active border", "1px solid #c4c4c4"],
                          ["Active shadow", "inset 0 1px 0 rgba(255,255,255,0.8)"],
                          ["Active bar", "3 px left · bg-foreground · rounded-r-full"],
                          ["Inactive text", "rgba(23,23,23,0.55)"],
                          ["Hover", "bg-white/45 · color rgba(23,23,23,0.85)"],
                          ["Logo collapsed", "mark-dark.svg · h-10 · crossfade"],
                          ["Logo expanded", "lockup-dark.svg · h-12 · crossfade"],
                          ["Footer", "1px solid #bdbdbd divider · reserved space"],
                        ]
                      : sidebarDevice === "tablet"
                      ? [
                          ["Width", "w-16 (64 px) · permanently collapsed"],
                          ["Hover expand", "Disabled — stays icon-only"],
                          ["Logo", "mark-dark.svg · h-8 · centered"],
                          ["Trigger", "Tap icon to navigate (no expand)"],
                          ["Active state", "Same gradient + accent bar as desktop"],
                          ["Frame bg", "Same chrome gradient as desktop"],
                          ["Content area", "Full remaining width"],
                          ["Breakpoint", "768 px – 1024 px"],
                        ]
                      : [
                          ["Width", "w-64 (256 px) · always expanded"],
                          ["Trigger", "Logo mark tap → slide-in"],
                          ["Close", "✕ button + overlay backdrop tap"],
                          ["Overlay", "bg-black/50 · inset 0"],
                          ["Slide easing", "300ms ease-in-out"],
                          ["Position", "fixed · left 0 · full height"],
                          ["z-index", "50 (sidebar) · 40 (overlay)"],
                          ["Header", "lockup-dark.svg + close icon"],
                          ["Active state", "Same gradient + accent bar as desktop"],
                          ["Footer", "Same divider + reserved space"],
                          ["Border", "border-right 1px solid #bdbdbd"],
                          ["Background", "#FFFFFF (clean, no gradient)"],
                        ]
                    ).map(([label, value]) => (
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
                  3 · Tab Bar
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Page-level secondary navigation. Clean surface track with white
                  pill active states and soft shadows. Used on every detail page
                  and settings panel. Active tab syncs with the URL.
                </p>

                {/* Detail page tabs (8+ tabs, horizontal scroll) */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  Detail Page — 8 tabs, scrollable
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden mb-4">
                  <div className="bg-[#F4F4F5] border-b border-[#D4D4D8] px-1.5 py-1.5">
                    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                      {detailPageTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDetailTab(i)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0 border ${
                            activeDetailTab === i
                              ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
                              : "border-transparent text-[#171717]/50 hover:bg-white/60 hover:text-[#171717]"
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
                  <div className="bg-[#F4F4F5] border-b border-[#D4D4D8] px-1.5 py-1.5">
                    <div className="flex gap-1">
                      {settingsTabItems.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveSettingsTab(i)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap border ${
                            activeSettingsTab === i
                              ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
                              : "border-transparent text-[#171717]/50 hover:bg-white/60 hover:text-[#171717]"
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
                    Tab Bar Spec
                  </p>
                  <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1 text-[11px]">
                    {[
                      ["Track bg", "bg-[#F4F4F5] (warm surface, flat)"],
                      ["Track border", "border-b border-[#D4D4D8]"],
                      ["Active bg", "bg-white"],
                      ["Active border", "border-[#D4D4D8]"],
                      ["Active shadow", "0 1px 3px rgba(0,0,0,0.06)"],
                      ["Active text", "text-[#171717]"],
                      ["Inactive text", "text-[#171717]/50"],
                      ["Hover", "hover:bg-white/60"],
                      ["Radius", "rounded-md"],
                      ["Padding", "px-3 py-1.5"],
                      ["Gap", "gap-1"],
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
                  <div className="flex shrink-0 items-center gap-1 border-b border-[#D4D4D8] bg-[#F4F4F5] px-1 py-1.5">
                    <button
                      onClick={() =>
                        setActiveSettingsTab(
                          (activeSettingsTab - 1 + settingsTabItems.length) %
                            settingsTabItems.length
                        )
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#171717]/40 transition-colors hover:bg-white/60 hover:text-[#171717]"
                    >
                      <ChevronLeft size={14} strokeWidth={2} />
                    </button>
                    <div style={{ display: "flex", flex: 1, minWidth: 0, alignItems: "center", justifyContent: "center", gap: 2 }}>
                      {settingsTabItems.map((item, i) => {
                        const isActive = i === activeSettingsTab;
                        return (
                          <button
                            key={item}
                            onClick={() => setActiveSettingsTab(i)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "5px 12px",
                              fontSize: 13,
                              fontWeight: 500,
                              borderRadius: 6,
                              whiteSpace: "nowrap",
                              border: isActive ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: isActive ? "#fff" : "transparent",
                              color: isActive ? "#171717" : "rgba(23,23,23,0.45)",
                              boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" : "none",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() =>
                        setActiveSettingsTab(
                          (activeSettingsTab + 1) % settingsTabItems.length
                        )
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#171717]/40 transition-colors hover:bg-white/60 hover:text-[#171717]"
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
                      ["Track bg", "bg-[#F4F4F5] (matches tab bar)"],
                      ["Track border", "border-b border-[#D4D4D8]"],
                      ["Active bg", "bg-white"],
                      ["Active border", "border-[#D4D4D8]"],
                      ["Active shadow", "0 1px 3px rgba(0,0,0,0.06)"],
                      ["Inactive", "text-foreground/45 hover:bg-white/60"],
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
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <Search size={14} strokeWidth={ICON_STROKE} className="text-bf-muted flex-shrink-0" />
                      {filterSortTabs.map((tab, i) => (
                        <button
                          key={tab}
                          onClick={() => setActiveFilterTab(i)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "5px 10px",
                            fontSize: 12,
                            fontWeight: 500,
                            borderRadius: 6,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            border: activeFilterTab === i ? "1px solid #171717" : "1px solid #D4D4D8",
                            background: activeFilterTab === i ? "#171717" : "#fff",
                            color: activeFilterTab === i ? "#fff" : "#71717A",
                            cursor: "pointer",
                            transition: "all 150ms ease",
                          }}
                        >
                          {tab === "Linear" && <LinearIcon size={12} />}
                          {tab === "GitHub" && <GitHubDark size={12} />}
                          {tab}
                        </button>
                      ))}
                      <div style={{ height: 16, width: 1, background: "#D4D4D8", flexShrink: 0, margin: "0 4px" }} />
                      <span style={{ padding: "5px 10px", fontSize: 12, fontWeight: 500, background: "#fff", color: "#71717A", border: "1px solid #D4D4D8", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
                        Status ▾
                      </span>
                      <span style={{ padding: "5px 10px", fontSize: 12, fontWeight: 500, background: "#fff", color: "#71717A", border: "1px solid #D4D4D8", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
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
                  <div className="bg-[#F4F4F5] border-b border-[#D4D4D8] px-4 py-3">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, overflowX: "auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                        {rangeOptions.map((range, i) => (
                          <button
                            key={range}
                            onClick={() => setActiveRange(i)}
                            style={{
                              padding: "4px 10px",
                              fontSize: 12,
                              fontWeight: 500,
                              borderRadius: 6,
                              whiteSpace: "nowrap",
                              border: activeRange === i ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: activeRange === i ? "#fff" : "transparent",
                              color: activeRange === i ? "#171717" : "rgba(23,23,23,0.45)",
                              boxShadow: activeRange === i ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                            }}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                      <div style={{ height: 16, width: 1, background: "#D4D4D8", flexShrink: 0 }} />
                      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                        {ipodFaces.map((face, i) => (
                          <button
                            key={face}
                            onClick={() => setActiveIpodFace(i)}
                            style={{
                              padding: "6px 14px",
                              fontSize: 12,
                              fontWeight: 500,
                              borderRadius: 9999,
                              whiteSpace: "nowrap",
                              border: activeIpodFace === i ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: activeIpodFace === i ? "#fff" : "transparent",
                              color: activeIpodFace === i ? "#171717" : "rgba(23,23,23,0.5)",
                              boxShadow: activeIpodFace === i ? "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" : "none",
                              cursor: "pointer",
                              transition: "all 200ms ease",
                            }}
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
                        ["Active bg", "bg-white"],
                        ["Active border", "border-[#D4D4D8]"],
                        ["Active shadow", "0 1px 3px rgba(0,0,0,0.06)"],
                        ["Inactive", "text-foreground/50 hover:bg-white/60"],
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
                        ["Active", "border-[#D4D4D8] bg-white shadow-sm"],
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
                  <div style={{ borderBottom: "1px solid var(--bf-border)", padding: "0 20px" }}>
                    <div style={{ display: "flex", gap: 24, overflowX: "auto" }}>
                      {drawerTabs.map((tab, i) => {
                        const isActive = activeDrawerTab === i;
                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveDrawerTab(i)}
                            style={{
                              padding: "12px 0",
                              fontSize: 14,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              background: "transparent",
                              border: "none",
                              borderBottom: isActive ? "2px solid #171717" : "2px solid transparent",
                              color: isActive ? "#171717" : "rgba(23,23,23,0.4)",
                              cursor: "pointer",
                              transition: "color 150ms ease, border-color 150ms ease",
                              marginBottom: -1,
                            }}
                          >
                            {tab}
                          </button>
                        );
                      })}
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
                  <div style={{ borderBottom: "1px solid var(--bf-border)", padding: "0 20px" }}>
                    <div style={{ display: "flex", gap: 24 }}>
                      {["Overview", "Raw Source"].map((tab, i) => {
                        const isActive = activeMinimalTab === i;
                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveMinimalTab(i)}
                            style={{
                              padding: "12px 0",
                              fontSize: 14,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              background: "transparent",
                              border: "none",
                              borderBottom: isActive ? "2px solid #171717" : "2px solid transparent",
                              color: isActive ? "#171717" : "rgba(23,23,23,0.4)",
                              cursor: "pointer",
                              transition: "color 150ms ease, border-color 150ms ease",
                              marginBottom: -1,
                            }}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-sm text-bf-muted">
                      {["Overview", "Raw Source"][activeMinimalTab]} content
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
                      style: "Warm surface, 3 px left accent, icon + label",
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
                      name: "Tab Bar",
                      pattern: "White pill on surface track",
                      context: "Page sub-sections (Detail tabs, Settings tabs)",
                      style: "Surface track, white pill active, soft shadow",
                    },
                    {
                      tier: "4",
                      name: "Sub-Nav",
                      pattern: "Chevron picker",
                      context: "Cycling within a tab (vendor configs, meeting sources)",
                      style: "Surface track, white pill active, ← → arrows",
                    },
                    {
                      tier: "5",
                      name: "Segmented Control",
                      pattern: "Rounded pill toggle",
                      context: "View/face switching within content (Connection, History…)",
                      style: "Pill shape, white active, card flip animation",
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
                  Breadcrumbs appear in the page header chrome, anchored left. The final
                  segment is the current page (semibold). Preceding segments are interactive
                  links. Vendor logos accompany vendor names. Desktop only.
                </p>

                {/* Page header chrome simulation */}
                <div className="rounded-xl border-2 border-bf-border overflow-hidden mb-6">
                  {/* Simulated page header */}
                  <div style={{ 
                    background: "linear-gradient(to bottom, #FAFAFA 0%, #F4F4F5 100%)",
                    borderBottom: "1px solid #E4E4E7",
                    padding: "14px 20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13, color: "rgba(23,23,23,0.45)", cursor: "pointer", transition: "color 150ms" }}>
                        Clients
                      </span>
                      <ChevronRight size={11} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                      <span style={{ fontSize: 13, color: "rgba(23,23,23,0.45)", cursor: "pointer" }}>
                        Black Flag Design
                      </span>
                      <ChevronRight size={11} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                      <span style={{ fontSize: 13, color: "rgba(23,23,23,0.45)", cursor: "pointer" }}>
                        Foundry
                      </span>
                      <ChevronRight size={11} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>
                        Events
                      </span>
                    </div>
                  </div>
                  {/* Simulated page content placeholder */}
                  <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                    <span style={{ fontSize: 12, color: "var(--bf-muted)" }}>Page content area</span>
                  </div>
                </div>

                {/* Breadcrumb variations in a clean grid */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">
                  Context Variations
                </p>
                <div style={{ display: "grid", gap: 8 }}>
                  {/* Client → Project path */}
                  <div style={{
                    background: "#fff",
                    border: "1px solid #E4E4E7",
                    borderRadius: 8,
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Clients</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Acme Corp</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>Project Alpha</span>
                  </div>

                  {/* Settings with vendor logo */}
                  <div style={{
                    background: "#fff",
                    border: "1px solid #E4E4E7",
                    borderRadius: 8,
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Settings</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Vendors</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#171717" }}>
                      <GitHubDark size={13} />
                      GitHub
                    </span>
                  </div>

                  {/* Events path */}
                  <div style={{
                    background: "#fff",
                    border: "1px solid #E4E4E7",
                    borderRadius: 8,
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Events</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#171717" }}>
                      <GitHubDark size={13} />
                      Push to main · 3 commits
                    </span>
                  </div>

                  {/* File browser path */}
                  <div style={{
                    background: "#fff",
                    border: "1px solid #E4E4E7",
                    borderRadius: 8,
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Clients</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>HealthCo</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>HW Portal</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ fontSize: 12, color: "rgba(23,23,23,0.45)" }}>Files</span>
                    <ChevronRight size={10} strokeWidth={2.5} style={{ color: "#D4D4D8" }} />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#171717" }}>
                      <Folder size={13} strokeWidth={1.75} />
                      docs/
                    </span>
                  </div>
                </div>

                {/* Spec card */}
                <div className="mt-5 bg-bf-paper rounded-xl border-2 border-bf-border p-4">
                  <div className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1.5 text-[11px]">
                    {[
                      ["Font size", "13px (matches body copy)"],
                      ["Separator", "ChevronRight · 11px · #D4D4D8"],
                      ["Gap", "6px between all elements"],
                      ["Inactive", "rgba(23,23,23,0.45)"],
                      ["Active", "#171717 · font-weight: 600"],
                      ["Hover", "Inactive → #171717 on hover"],
                      ["Vendor logos", "Always paired with vendor name"],
                      ["Mobile", "Hidden (use back button instead)"],
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
                  Mobile replaces the hover sidebar with a logo trigger and slide-in
                  overlay. Tab bars switch to horizontal scroll. Breadcrumbs are hidden.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Mobile phone frame */}
                  <div className="w-[200px] flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative bg-bf-text rounded-2xl p-2 overflow-hidden">
                      <div className="bg-white rounded-xl overflow-hidden">
                        {/* Mobile header bar */}
                        <div className="flex items-center h-16 px-3 border-b border-[#D4D4D8] bg-white">
                          <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-6 w-auto flex items-center justify-center"
                          >
                            <BrandLogo variant="dark" size="sm" className="h-5 w-auto" />
                          </button>
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
                                className="absolute left-2 top-2 bottom-2 w-[140px] bg-white z-20 rounded-lg shadow-lg border border-[#D4D4D8] flex flex-col"
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
                                            ? "border-[#D4D4D8] bg-white text-[#171717]"
                                            : "border-transparent text-[#171717]/50"
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
                          ["Trigger", "Logo mark tap → open sidebar"],
                          ["Overlay", "bg-black/50 · click to dismiss"],
                          ["Close", "✕ button in sidebar header"],
                          ["Tabs", "overflow-x-auto scrollbar-hide"],
                          ["Breadcrumbs", "hidden (md:flex only)"],
                          ["Header height", "h-16 (consistent with desktop)"],
                          ["Header content", "Logo trigger only (page title optional by shell)"],
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
                  11 · Page Compositions
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  How navigation tiers compose into real page layouts. Each
                  composition below represents a distinct page type in the admin
                  interface. Keep it general — the patterns apply across any feature.
                </p>

                {/* ── Composition A: Detail Page ── */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  A · Detail Page
                </p>
                <p className="text-xs text-bf-muted mb-3">
                  Entity header with breadcrumbs → tab bar → filtered content list.
                  The most common layout for drill-down views.
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-bf-surface mb-6">
                  <div className="flex h-[340px]">
                    <div className="w-12 flex-shrink-0 bg-[#F4F4F5] border-r border-[#D4D4D8] flex flex-col py-2 items-center">
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
                                ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                                : "border-transparent text-[#171717]/50 hover:bg-white/60"
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

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="h-12 flex items-center px-3 bg-bf-paper border-b-2 border-bf-border">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded bg-bf-text flex items-center justify-center p-1">
                            <BrandLogo variant="light" size="sm" className="w-full h-full" />
                          </div>
                          <span className="text-sm font-medium text-bf-text truncate">
                            Project Alpha
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 px-1.5 py-1 bg-[#F4F4F5] border-b border-[#D4D4D8] overflow-x-auto">
                        {["Meetings", "Files", "Events", "Work", "Analytics"].map(
                          (tab, i) => (
                            <span
                              key={tab}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded whitespace-nowrap border ${
                                i === 2
                                  ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                                  : "border-transparent text-[#171717]/50"
                              }`}
                            >
                              {tab}
                            </span>
                          )
                        )}
                      </div>

                      <div className="flex-1 bg-bf-paper p-3 overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-3">
                          <Search size={10} strokeWidth={ICON_STROKE} className="text-bf-muted" />
                          {["All", "Linear", "GitHub"].map((f, i) => (
                            <span
                              key={f}
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium rounded border ${
                                i === 0
                                  ? "btn-active-border"
                                  : "bg-bf-paper text-bf-muted border-bf-border"
                              }`}
                            >
                              {f === "Linear" && <LinearIcon size={9} />}
                              {f === "GitHub" && <GitHubDark size={9} />}
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

                {/* ── Composition B: List Page ── */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  B · List Page
                </p>
                <p className="text-xs text-bf-muted mb-3">
                  Simple top-level page with header and scrollable content. No tabs.
                  Uses the same live client records mirrored from admin-app-convex metadata.
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-bf-surface mb-6">
                  <div className="flex h-[260px]">
                    <div className="w-12 flex-shrink-0 bg-[#F4F4F5] border-r border-[#D4D4D8] flex flex-col py-2 items-center">
                      <div className="h-8 w-8 flex items-center justify-center mb-3">
                        <BrandLogo variant="dark" size="sm" className="h-8 w-auto" />
                      </div>
                      {sidebarItems.slice(0, 3).map((item, i) => {
                        const IconComponent = item.Icon;
                        return (
                          <div
                            key={item.label}
                            className={`relative w-8 h-8 rounded-md flex items-center justify-center mb-0.5 border ${
                              i === 0
                                ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                                : "border-transparent text-[#171717]/50"
                            }`}
                          >
                            {i === 0 && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#171717] rounded-r-full" />
                            )}
                            <IconComponent size={14} stroke={ICON_STROKE} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="h-12 flex items-center justify-between px-3 bg-bf-paper border-b-2 border-bf-border">
                        <h2 className="text-sm font-semibold text-bf-text">Clients</h2>
                        <span className="px-2 py-0.5 text-[9px] font-bold btn-active rounded">+ New</span>
                      </div>
                      <div className="flex-1 bg-bf-paper p-3 overflow-hidden">
                        {listPageClients.map((client) => (
                          <div
                            key={client.slug}
                            className="flex items-center gap-2 p-2 rounded-lg border border-bf-border mb-1.5"
                          >
                            <div className="h-6 w-6 rounded bg-bf-surface overflow-hidden flex items-center justify-center text-[8px] font-bold text-bf-text">
                              {client.logoUrl ? (
                                <img
                                  src={client.logoUrl}
                                  alt=""
                                  className="h-6 w-6 object-contain rounded"
                                />
                              ) : (
                                getInitials(client.name)
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-medium text-bf-text truncate">{client.name}</p>
                              <p className="text-[8px] text-bf-muted truncate">
                                {(client.websiteUrl ?? client.description).replace(/^https?:\/\//, "")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Composition C: Settings Page ── */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  C · Settings Page
                </p>
                <p className="text-xs text-bf-muted mb-3">
                  Header → tab bar → sub-nav → form content. Two tiers of secondary
                  navigation for deeply nested configuration views.
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-bf-surface mb-6">
                  <div className="flex h-[300px]">
                    <div className="w-12 flex-shrink-0 bg-[#F4F4F5] border-r border-[#D4D4D8] flex flex-col py-2 items-center">
                      <div className="h-8 w-8 flex items-center justify-center mb-3">
                        <BrandLogo variant="dark" size="sm" className="h-8 w-auto" />
                      </div>
                      <div className="relative w-8 h-8 rounded-md flex items-center justify-center border border-transparent text-[#171717]/50">
                        <IconBuilding size={14} stroke={ICON_STROKE} />
                      </div>
                      <div className="relative w-8 h-8 rounded-md flex items-center justify-center border border-transparent text-[#171717]/50">
                        <IconBolt size={14} stroke={ICON_STROKE} />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="h-10 flex items-center px-3 bg-bf-paper border-b-2 border-bf-border">
                        <Settings size={12} strokeWidth={ICON_STROKE} className="text-bf-muted mr-2" />
                        <h2 className="text-sm font-semibold text-bf-text">Settings</h2>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-1 bg-[#F4F4F5] border-b border-[#D4D4D8]">
                        {["Access", "Vendors", "Meetings"].map((tab, i) => (
                          <span
                            key={tab}
                            className={`px-2 py-0.5 text-[10px] font-medium rounded border ${
                              i === 1
                                ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                                : "border-transparent text-[#171717]/50"
                            }`}
                          >
                            {tab}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-0.5 px-1 py-1 bg-[#F4F4F5] border-b border-[#D4D4D8]">
                        <ChevronLeft size={10} className="text-[#171717]/40" />
                        {["GitHub", "Clerk", "AWS"].map((v, i) => (
                          <span
                            key={v}
                            className={`px-1.5 py-0.5 text-[9px] font-medium rounded border inline-flex items-center gap-1 ${
                              i === 0
                                ? "border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                                : "border-transparent text-[#171717]/40"
                            }`}
                          >
                            {v === "GitHub" && <GitHubDark size={8} />}
                            {v}
                          </span>
                        ))}
                        <ChevronRight size={10} className="text-[#171717]/40" />
                      </div>
                      <div className="flex-1 bg-bf-paper p-3">
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-bf-surface rounded" />
                          <div className="h-7 w-full bg-bf-surface rounded border border-bf-border" />
                          <div className="h-3 w-32 bg-bf-surface rounded" />
                          <div className="h-7 w-full bg-bf-surface rounded border border-bf-border" />
                          <div className="mt-3 flex gap-2">
                            <span className="px-2 py-0.5 text-[9px] font-bold btn-active rounded">Save</span>
                            <span className="px-2 py-0.5 text-[9px] font-medium text-bf-muted border border-bf-border rounded">Cancel</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Composition D: Dashboard ── */}
                <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">
                  D · Dashboard / Grid
                </p>
                <p className="text-xs text-bf-muted mb-3">
                  Header with segmented control → metric cards → chart area.
                  Used for analytics, infrastructure costs, and accounting views.
                </p>
                <div className="rounded-xl border-2 border-bf-border overflow-hidden bg-bf-surface mb-4">
                  <div className="flex h-[280px]">
                    <div className="w-12 flex-shrink-0 bg-[#F4F4F5] border-r border-[#D4D4D8] flex flex-col py-2 items-center">
                      <div className="h-8 w-8 flex items-center justify-center mb-3">
                        <BrandLogo variant="dark" size="sm" className="h-8 w-auto" />
                      </div>
                      <div className="relative w-8 h-8 rounded-md flex items-center justify-center border border-transparent text-[#171717]/50">
                        <IconBuilding size={14} stroke={ICON_STROKE} />
                      </div>
                      <div className="relative w-8 h-8 rounded-md flex items-center justify-center border border-[#D4D4D8] bg-white text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#171717] rounded-r-full" />
                        <IconServer size={14} stroke={ICON_STROKE} />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="h-10 flex items-center justify-between px-3 bg-bf-paper border-b-2 border-bf-border">
                        <h2 className="text-sm font-semibold text-bf-text">Infrastructure</h2>
                        <div className="flex items-center gap-1">
                          {["24h", "7d", "30d"].map((r, i) => (
                            <span
                              key={r}
                              className={`px-1.5 py-0.5 text-[8px] font-medium rounded border ${
                                i === 1
                                  ? "border-[#D4D4D8] bg-white text-[#171717]"
                                  : "border-transparent text-[#171717]/40"
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 bg-bf-paper p-3 overflow-hidden">
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {[
                            { label: "Compute", val: "$1,240" },
                            { label: "Storage", val: "$380" },
                            { label: "Network", val: "$95" },
                          ].map((m) => (
                            <div key={m.label} className="rounded-lg border border-bf-border p-2 text-center">
                              <p className="text-[8px] text-bf-muted">{m.label}</p>
                              <p className="text-sm font-bold text-bf-text">{m.val}</p>
                            </div>
                          ))}
                        </div>
                        <div className="h-20 rounded-lg border border-bf-border bg-bf-surface flex items-center justify-center">
                          <span className="text-[9px] text-bf-muted">Chart area</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "A · Detail Page",
                    "B · List Page",
                    "C · Settings Page",
                    "D · Dashboard / Grid",
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
