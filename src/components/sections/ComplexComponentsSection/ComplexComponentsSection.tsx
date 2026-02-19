import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBuilding,
  IconBolt,
  IconServer,
} from "@tabler/icons-react";
import {
  ChevronRight,
  ChevronDown,
  Settings,
} from "lucide-react";
import { GitHubDark, AWS, Cloudflare, Supabase, Convex, Clerk } from "developer-icons";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";

const ease = [0.16, 1, 0.3, 1] as const;

function CursorIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

function LinearIcon({ size = 14 }: { size?: number }) {
  return <img src="https://linear.app/favicon.ico" alt="Linear" width={size} height={size} style={{ display: "inline-block", verticalAlign: "middle" }} />;
}

function vendorIcon(id: string, size = 16): React.ReactNode {
  switch (id) {
    case "github": return <GitHubDark size={size} />;
    case "linear": return <LinearIcon size={size} />;
    case "cursor": return <CursorIcon size={size} />;
    case "aws": return <AWS size={size} />;
    case "cloudflare": return <Cloudflare size={size} />;
    case "supabase": return <Supabase size={size} />;
    case "convex": return <Convex size={size} />;
    case "clerk": return <Clerk size={size} />;
    default: return null;
  }
}

/* ── iPod card data (real vendor logos via developer-icons) ── */
const vendors = [
  { name: "GitHub", id: "github" },
  { name: "Linear", id: "linear" },
  { name: "Clerk", id: "clerk" },
  { name: "Cursor", id: "cursor" },
];
const vendorFaces = ["Connection", "Issues", "Events", "Operations"];

/* ── Settings tabs ── */
const settingsTabs = ["Access", "Vendors", "Meetings"];
const settingsSubNavItems = [
  { label: "GitHub", id: "github" },
  { label: "Clerk", id: "clerk" },
  { label: "AWS", id: "aws" },
];

function MiniSidebar({ activeIdx = 0 }: { activeIdx?: number }) {
  const items = [
    { Icon: IconBuilding, label: "Clients" },
    { Icon: IconBolt, label: "Events" },
    { Icon: IconServer, label: "Infra" },
  ];
  return (
    <div style={{ width: 48, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8, backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)", borderRight: "1px solid #bdbdbd" }}>
      <div style={{ height: 28, width: 28, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/logos/mark-dark.svg" alt="" style={{ height: 22, width: "auto" }} />
      </div>
      {items.map((item, i) => {
        const Ic = item.Icon;
        const active = i === activeIdx;
        return (
          <div key={item.label} style={{ position: "relative", width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2, border: active ? "1px solid #D4D4D8" : "1px solid transparent", background: active ? "#fff" : "transparent", color: active ? "#171717" : "rgba(23,23,23,0.45)", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.05)" : "none" }}>
            {active && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 2, height: 10, borderRadius: "0 99px 99px 0", background: "#171717" }} />}
            <Ic size={14} stroke={1.75} />
          </div>
        );
      })}
    </div>
  );
}

export function ComplexComponentsSection() {
  const [activeVendor, setActiveVendor] = useState(0);
  const [activeFace, setActiveFace] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);
  const [activeSettingsTab, setActiveSettingsTab] = useState(1);
  const [activeSubNav, setActiveSubNav] = useState(0);

  return (
    <section id="complex-components" className="relative bg-white border-t-4 border-bf-teal py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            number="16"
            title="Complex Components"
            description="Multi-state compound components replicated from the admin app. iPod face-switching cards, accordion expense cards, markdown rendering, and settings page patterns."
          />

          {/* ── 1. iPod Face-Switching Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
              1 · iPod Face-Switching Card
            </h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Horizontal selector bar cycles through entities. The card below shows
              a header with face tabs and a 3D flip animation when switching. Used
              for vendor management and people management.
            </p>
            <DeviceFrame desktopHeight={420} tabletHeight={420} mobileHeight={440}>
              {({ device }) => {
                const isMobile = device === "mobile";
                return (
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FAFAFA" }}>
                    {/* Vendor selector bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", backgroundImage: "linear-gradient(to bottom, #f6f6f6, #ececec)", borderBottom: "1px solid #c8c8c8" }}>
                      <ChevronRight size={12} strokeWidth={2} style={{ color: "rgba(23,23,23,0.3)", transform: "rotate(180deg)", cursor: "pointer", flexShrink: 0 }} />
                      <div style={{ display: "flex", gap: 3, flex: 1, overflowX: "auto" }}>
                        {vendors.map((v, i) => (
                          <button
                            key={v.name}
                            onClick={() => { setActiveVendor(i); setActiveFace(0); }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "4px 10px",
                              borderRadius: 5,
                              fontSize: 11,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                              border: activeVendor === i ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: activeVendor === i ? "#fff" : "transparent",
                              color: activeVendor === i ? "#171717" : "rgba(23,23,23,0.45)",
                              boxShadow: activeVendor === i ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                            }}
                          >
                            {vendorIcon(v.id, 14)}
                            {!isMobile && v.name}
                          </button>
                        ))}
                      </div>
                      <ChevronRight size={12} strokeWidth={2} style={{ color: "rgba(23,23,23,0.3)", cursor: "pointer", flexShrink: 0 }} />
                    </div>

                    {/* Card */}
                    <div style={{ flex: 1, padding: isMobile ? 10 : 14, overflow: "hidden" }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeVendor}
                          initial={{ opacity: 0, rotateY: 90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: -90 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          style={{ height: "100%", perspective: 1100, border: "1px solid #D4D4D8", borderRadius: 8, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}
                        >
                          {/* Card header */}
                          <div style={{ padding: "12px 14px", borderBottom: "1px solid #E4E4E7", display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6, background: "#F4F4F5" }}>
                              {vendorIcon(vendors[activeVendor].id, 18)}
                            </span>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>{vendors[activeVendor].name}</p>
                              <p style={{ fontSize: 10, color: "#71717A" }}>Connected · 3 jobs active</p>
                            </div>
                          </div>
                          {/* Face tabs */}
                          <div style={{ display: "flex", borderBottom: "1px solid #E4E4E7" }}>
                            {vendorFaces.map((face, i) => (
                              <button
                                key={face}
                                onClick={() => setActiveFace(i)}
                                style={{
                                  flex: 1,
                                  padding: "7px 0",
                                  fontSize: 10,
                                  fontWeight: 500,
                                  borderBottom: activeFace === i ? "2px solid #171717" : "2px solid transparent",
                                  color: activeFace === i ? "#171717" : "#71717A",
                                  background: "transparent",
                                  border: "none",
                                  borderBottomWidth: 2,
                                  borderBottomStyle: "solid",
                                  borderBottomColor: activeFace === i ? "#171717" : "transparent",
                                  cursor: "pointer",
                                  transition: "all 150ms ease",
                                  position: "relative",
                                }}
                              >
                                {face}
                                {i === 1 && <span style={{ position: "absolute", top: 5, right: "calc(50% - 20px)", width: 5, height: 5, borderRadius: "50%", background: "#E04848" }} />}
                              </button>
                            ))}
                          </div>
                          {/* Face content */}
                          <div style={{ flex: 1, padding: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 11, color: "#71717A" }}>{vendors[activeVendor].name} · {vendorFaces[activeFace]} content</span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 2. Accordion Expense Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
              2 · Accordion Expense Cards
            </h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Two sections: Code Generation (Cursor with nested project →
              contributor → event rows) and Infrastructure (AWS, Supabase,
              Cloudflare, Convex). Real vendor logos from developer-icons.
            </p>
            <DeviceFrame desktopHeight={540} tabletHeight={540} mobileHeight={560}>
              {({ device }) => {
                const isMobile = device === "mobile";
                const pad = isMobile ? 10 : 16;
                return (
                  <div style={{ height: "100%", overflowY: "auto", background: "#FAFAFA", padding: pad }}>
                    {/* ── CODE GENERATION ── */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <CursorIcon size={14} />
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#171717" }}>Code Generation</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$142.30</span>
                      </div>
                      <div style={{ border: "1px solid #D4D4D8", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
                        {/* Cursor header — expanded */}
                        <button
                          onClick={() => setExpandedAccordion(expandedAccordion === 99 ? null : 99)}
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "transparent", border: "none", cursor: "pointer", borderBottom: expandedAccordion === 99 ? "1px solid #E4E4E7" : "none" }}
                        >
                          <ChevronRight size={12} strokeWidth={2} style={{ color: "#71717A", transform: expandedAccordion === 99 ? "rotate(90deg)" : "none", transition: "transform 200ms", flexShrink: 0 }} />
                          <CursorIcon size={18} />
                          <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                            <p style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>Cursor</p>
                            <p style={{ fontSize: 9, color: "#71717A" }}>47 sessions · 3 contributors · 2.6M tokens</p>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: "#171717", flexShrink: 0 }}>$142.30</span>
                        </button>
                        <AnimatePresence initial={false}>
                          {expandedAccordion === 99 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                              style={{ overflow: "hidden" }}
                            >
                              {/* Project: BFD Admin Apps */}
                              <div style={{ borderBottom: "1px solid #F4F4F5" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px 8px 34px" }}>
                                  <ChevronDown size={10} strokeWidth={2} style={{ color: "#A1A1AA" }} />
                                  <div style={{ width: 16, height: 16, borderRadius: 3, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <img src="/logos/mark-light.svg" alt="" style={{ height: 10, width: "auto" }} />
                                  </div>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: "#171717" }}>BFD Admin Apps</span>
                                  <span style={{ fontSize: 9, color: "#71717A" }}>28 sessions</span>
                                  <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$86.42</span>
                                </div>
                                {/* Contributor: Keith Pattison */}
                                <div style={{ padding: "4px 14px 6px 56px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderBottom: "1px solid #F4F4F5" }}>
                                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #14B8A6, #0891B2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: "#fff", flexShrink: 0 }}>KP</div>
                                    <span style={{ fontSize: 10, fontWeight: 500, color: "#171717" }}>Keith Pattison</span>
                                    <span style={{ fontSize: 9, color: "#71717A" }}>1.2M tokens</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$62.30</span>
                                  </div>
                                  {/* Event rows */}
                                  <div style={{ paddingLeft: 24, paddingTop: 2 }}>
                                    {[
                                      { date: "Feb 18", cost: "$0.42", tokens: "12K/8K", model: "claude-4-opus" },
                                      { date: "Feb 18", cost: "$0.18", tokens: "4K/2K", model: "claude-sonnet-4" },
                                      { date: "Feb 17", cost: "$1.24", tokens: "32K/18K", model: "claude-4-opus" },
                                    ].map((ev, i) => (
                                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 9, color: "#71717A", padding: "2px 0" }}>
                                        <span style={{ width: 40, flexShrink: 0 }}>{ev.date}</span>
                                        <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#171717", width: 36 }}>{ev.cost}</span>
                                        <span style={{ fontFamily: "monospace" }}>{ev.tokens}</span>
                                        <span style={{ padding: "0 4px", fontSize: 8, fontWeight: 600, borderRadius: 2, background: ev.model.includes("opus") ? "#F0EEFF" : "#E8F4F8", color: ev.model.includes("opus") ? "#5E6AD2" : "#0891B2" }}>{ev.model}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Contributor: Background Agent */}
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}>
                                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E4E4E7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: "#71717A", flexShrink: 0 }}>AG</div>
                                    <span style={{ fontSize: 10, fontWeight: 500, color: "#71717A" }}>Background Agent</span>
                                    <span style={{ fontSize: 9, color: "#A1A1AA" }}>400K tokens</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$24.12</span>
                                  </div>
                                </div>
                              </div>
                              {/* Project: MeetingOS (collapsed) */}
                              <div style={{ borderBottom: "1px solid #F4F4F5" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px 8px 34px" }}>
                                  <ChevronRight size={10} strokeWidth={2} style={{ color: "#A1A1AA" }} />
                                  <div style={{ width: 16, height: 16, borderRadius: 3, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <img src="/logos/mark-light.svg" alt="" style={{ height: 10, width: "auto" }} />
                                  </div>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: "#171717" }}>MeetingOS</span>
                                  <span style={{ fontSize: 9, color: "#71717A" }}>12 sessions</span>
                                  <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$32.10</span>
                                </div>
                              </div>
                              {/* Project: BFD Platform (collapsed) */}
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px 8px 34px" }}>
                                  <ChevronRight size={10} strokeWidth={2} style={{ color: "#A1A1AA" }} />
                                  <div style={{ width: 16, height: 16, borderRadius: 3, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <img src="/logos/mark-light.svg" alt="" style={{ height: 10, width: "auto" }} />
                                  </div>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: "#171717" }}>BFD Platform</span>
                                  <span style={{ fontSize: 9, color: "#71717A" }}>7 sessions</span>
                                  <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$23.78</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* ── INFRASTRUCTURE ── */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <IconServer size={14} stroke={1.75} style={{ color: "#71717A" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#171717" }}>Infrastructure</span>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$1,620.00</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {([
                          { vendorId: "aws", name: "AWS", subtitle: "us-east-1 · Month to date", total: "$1,240.00", items: [{ name: "EC2 Instances", cost: "$680.00", pct: "55%" }, { name: "S3 Storage", cost: "$340.00", pct: "27%" }, { name: "CloudFront CDN", cost: "$220.00", pct: "18%" }] },
                          { vendorId: "supabase", name: "Supabase", subtitle: "4 projects · Pro plan", total: "$285.00", items: [{ name: "Pro Plan (×2)", cost: "$50.00" }, { name: "Database Compute", cost: "$135.00" }, { name: "Storage", cost: "$100.00" }] },
                          { vendorId: "cloudflare", name: "Cloudflare", subtitle: "Free tier — Workers + R2", total: "$0.00", items: [{ name: "Requests: 1.2M", cost: "—" }, { name: "Bandwidth: 48 GB", cost: "—" }] },
                          { vendorId: "convex", name: "Convex", subtitle: "2 projects · Pro plan", total: "$95.00", items: [{ name: "Function Calls", cost: "$55.00" }, { name: "Database Storage", cost: "$25.00" }, { name: "File Storage", cost: "$15.00" }] },
                        ] as const).map((provider, idx) => {
                          const isOpen = expandedAccordion === idx;
                          return (
                            <div key={provider.vendorId} style={{ border: "1px solid #D4D4D8", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
                              <button
                                onClick={() => setExpandedAccordion(isOpen ? null : idx)}
                                style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: isMobile ? "10px 12px" : "10px 14px", background: "transparent", border: "none", cursor: "pointer" }}
                              >
                                <ChevronRight size={12} strokeWidth={2} style={{ color: "#71717A", transition: "transform 200ms ease", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", flexShrink: 0 }} />
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, flexShrink: 0 }}>
                                  {vendorIcon(provider.vendorId, 16)}
                                </span>
                                <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                                  <p style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>{provider.name}</p>
                                  <p style={{ fontSize: 9, color: "#71717A" }}>{provider.subtitle}</p>
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: "#171717", flexShrink: 0 }}>{provider.total}</span>
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <div style={{ borderTop: "1px solid #E4E4E7", padding: "0 14px" }}>
                                      {provider.items.map((item, i) => (
                                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < provider.items.length - 1 ? "1px solid #F4F4F5" : "none" }}>
                                          <span style={{ fontSize: 11, color: "#171717" }}>{item.name}</span>
                                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                            {"pct" in item && <span style={{ fontSize: 9, color: "#A1A1AA" }}>{(item as { pct: string }).pct}</span>}
                                            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#71717A" }}>{item.cost}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 3. Markdown / Content Renderer ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
              3 · Markdown / Content Renderer
            </h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Rich markdown rendering with syntax-highlighted code blocks,
              headings, lists, and inline code. Used in knowledge base pages, chat
              messages, and AI summaries.
            </p>
            <DeviceFrame desktopHeight={380} tabletHeight={380} mobileHeight={400}>
              {({ device }) => {
                const isMobile = device === "mobile";
                const p = isMobile ? 14 : 24;
                return (
                  <div style={{ height: "100%", overflowY: "auto", background: "#FAFAFA", padding: p }}>
                    <div style={{ maxWidth: 680, margin: "0 auto" }}>
                      <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#171717", marginBottom: 8, letterSpacing: "-0.01em" }}>Project Architecture</h1>
                      <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.6, marginBottom: 14 }}>
                        This document describes the monorepo structure and key conventions used across
                        all Black Flag Design projects.
                      </p>
                      <h2 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 600, color: "#171717", marginBottom: 6, marginTop: 18 }}>Tech Stack</h2>
                      <ul style={{ fontSize: 12, color: "#171717", lineHeight: 1.8, paddingLeft: 18, marginBottom: 14 }}>
                        <li><strong>Frontend:</strong> React 19, TanStack Router, Tailwind CSS v4</li>
                        <li><strong>Backend:</strong> Convex (real-time, serverless)</li>
                        <li><strong>Auth:</strong> Clerk (SSO, RBAC)</li>
                        <li><strong>Infra:</strong> Fly.io, Cloudflare, Neon PostgreSQL</li>
                      </ul>
                      <h2 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 600, color: "#171717", marginBottom: 6, marginTop: 18 }}>Folder Structure</h2>
                      <div style={{ background: "#1e1e2e", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#cdd6f4", lineHeight: 1.7, overflowX: "auto", marginBottom: 14 }}>
                        <span style={{ color: "#89b4fa" }}>bfd-admin-apps/</span>{"\n"}
                        {"  "}├── <span style={{ color: "#a6e3a1" }}>projects/</span>{"\n"}
                        {"  "}│   ├── admin-app-convex/  <span style={{ color: "#6c7086" }}># Main admin portal</span>{"\n"}
                        {"  "}│   ├── bfd-style-guide/   <span style={{ color: "#6c7086" }}># This guide</span>{"\n"}
                        {"  "}│   └── bfd-platform/      <span style={{ color: "#6c7086" }}># Client-facing</span>{"\n"}
                        {"  "}├── <span style={{ color: "#a6e3a1" }}>blueprints/</span>{"\n"}
                        {"  "}│   └── meeting-os/        <span style={{ color: "#6c7086" }}># Meeting automation</span>{"\n"}
                        {"  "}└── <span style={{ color: "#a6e3a1" }}>shared/</span>              <span style={{ color: "#6c7086" }}># Cross-project types</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#71717A", lineHeight: 1.6 }}>
                        Each project has its own <code style={{ fontSize: 11, background: "#E4E4E7", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", color: "#171717" }}>package.json</code> and
                        independent deployment pipeline via GitHub Actions.
                      </p>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 4. Settings Page Pattern ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
              4 · Settings Page
            </h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Two tiers of secondary navigation: tab bar selects the category,
              chevron picker selects the sub-item. Form content adapts between
              column layouts. On mobile the sub-nav becomes horizontally scrollable.
            </p>
            <DeviceFrame desktopHeight={420} tabletHeight={420} mobileHeight={440}>
              {({ device }) => {
                const isMobile = device === "mobile";
                return (
                  <div style={{ display: "flex", height: "100%" }}>
                    {!isMobile && <MiniSidebar activeIdx={2} />}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                      {/* Header */}
                      <div style={{ height: 40, display: "flex", alignItems: "center", padding: "0 14px", background: "#FAFAFA", borderBottom: "2px solid #D4D4D8" }}>
                        <Settings size={13} strokeWidth={1.75} style={{ color: "#71717A", marginRight: 6 }} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#171717" }}>Settings</span>
                      </div>
                      {/* Tab bar */}
                      <div style={{ display: "flex", gap: 3, padding: "4px 6px", backgroundImage: "linear-gradient(to bottom, #f2f2f2, #dcdcdc)", borderBottom: "1px solid #c8c8c8" }}>
                        {settingsTabs.map((tab, i) => (
                          <button
                            key={tab}
                            onClick={() => setActiveSettingsTab(i)}
                            style={{
                              padding: "4px 10px",
                              fontSize: 11,
                              fontWeight: 500,
                              borderRadius: 5,
                              border: activeSettingsTab === i ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: activeSettingsTab === i ? "#fff" : "transparent",
                              color: activeSettingsTab === i ? "#171717" : "rgba(23,23,23,0.45)",
                              boxShadow: activeSettingsTab === i ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                            }}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      {/* Sub-nav (chevron picker) with vendor icons */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, padding: "4px 6px", backgroundImage: "linear-gradient(to bottom, #f6f6f6, #ececec)", borderBottom: "1px solid #c8c8c8" }}>
                        <ChevronRight size={11} style={{ color: "rgba(23,23,23,0.3)", transform: "rotate(180deg)", cursor: "pointer" }} />
                        {settingsSubNavItems.map((item, i) => (
                          <button
                            key={item.label}
                            onClick={() => setActiveSubNav(i)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "3px 8px",
                              fontSize: 10,
                              fontWeight: 500,
                              borderRadius: 4,
                              border: activeSubNav === i ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: activeSubNav === i ? "#fff" : "transparent",
                              color: activeSubNav === i ? "#171717" : "rgba(23,23,23,0.4)",
                              boxShadow: activeSubNav === i ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                            }}
                          >
                            {vendorIcon(item.id, 11)}
                            {item.label}
                          </button>
                        ))}
                        <ChevronRight size={11} style={{ color: "rgba(23,23,23,0.3)", cursor: "pointer" }} />
                      </div>
                      {/* Form content */}
                      <div style={{ flex: 1, background: "#FAFAFA", padding: isMobile ? 12 : 16, overflowY: "auto" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 10, fontWeight: 500, color: "#171717", marginBottom: 3 }}>API Key</label>
                            <div style={{ height: 32, borderRadius: 5, border: "1px solid #D4D4D8", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center" }}>
                              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#71717A" }}>ghp_xxxx...xxxx</span>
                            </div>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 10, fontWeight: 500, color: "#171717", marginBottom: 3 }}>Webhook URL</label>
                            <div style={{ height: 32, borderRadius: 5, border: "1px solid #D4D4D8", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center" }}>
                              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#71717A" }}>https://api.blackflag.dev/hooks/gh</span>
                            </div>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                            <div>
                              <label style={{ display: "block", fontSize: 10, fontWeight: 500, color: "#171717", marginBottom: 3 }}>Organization</label>
                              <div style={{ height: 32, borderRadius: 5, border: "1px solid #D4D4D8", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 12, color: "#171717" }}>black-flag</span>
                                <ChevronDown size={11} style={{ color: "#71717A" }} />
                              </div>
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 10, fontWeight: 500, color: "#171717", marginBottom: 3 }}>Sync Interval</label>
                              <div style={{ height: 32, borderRadius: 5, border: "1px solid #D4D4D8", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center" }}>
                                <span style={{ fontSize: 12, color: "#171717" }}>5 minutes</span>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
                            <button style={{ padding: "5px 12px", fontSize: 11, fontWeight: 500, borderRadius: 5, border: "none", background: "#171717", color: "#fff", cursor: "pointer" }}>Save</button>
                            <button style={{ padding: "5px 12px", fontSize: 11, fontWeight: 500, borderRadius: 5, border: "1px solid #D4D4D8", background: "transparent", color: "#71717A", cursor: "pointer" }}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
