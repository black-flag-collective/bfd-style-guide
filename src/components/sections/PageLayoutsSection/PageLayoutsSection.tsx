import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconBuilding,
  IconBolt,
  IconCurrencyDollar,
  IconServer,
  IconUsers,
} from "@tabler/icons-react";
import {
  Search,
  ChevronRight,
  Folder,
  File,
  Upload,
  FolderPlus,
  Filter,
  ChevronDown,
  Video,
  FileText,
  Briefcase,
  LayoutGrid,
  Activity,
  GitBranch,
  Server,
  BarChart3,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { GitHubDark, Convex, Clerk, Cloudflare, AWS, Supabase } from "developer-icons";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";
import { CLIENTS } from "../EventCardsSection/shared/ClientGrid";

const ease = [0.16, 1, 0.3, 1] as const;

function CursorIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

function LinearIcon({ size = 14 }: { size?: number }) {
  return (
    <img src="https://linear.app/favicon.ico" alt="Linear" width={size} height={size} style={{ display: "inline-block", verticalAlign: "middle" }} />
  );
}

function VendorPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>
      {icon}
      <span>{label}</span>
    </span>
  );
}

const sidebarItems = [
  { Icon: IconBuilding, label: "Clients" },
  { Icon: IconBolt, label: "Events" },
  { Icon: IconCurrencyDollar, label: "Code Gen" },
  { Icon: IconServer, label: "Infrastructure" },
  { Icon: IconUsers, label: "People" },
];

function MiniSidebar({ activeIdx = 0 }: { activeIdx?: number }) {
  return (
    <div
      style={{
        width: 48,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 8,
        backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)",
        borderRight: "1px solid #bdbdbd",
      }}
    >
      <div style={{ height: 28, width: 28, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/logos/mark-dark.svg" alt="" style={{ height: 22, width: "auto" }} />
      </div>
      {sidebarItems.map((item, i) => {
        const Ic = item.Icon;
        const active = i === activeIdx;
        return (
          <div
            key={item.label}
            style={{
              position: "relative",
              width: 32,
              height: 32,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
              border: active ? "1px solid #D4D4D8" : "1px solid transparent",
              background: active ? "#fff" : "transparent",
              color: active ? "#171717" : "rgba(23,23,23,0.45)",
              boxShadow: active ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            {active && (
              <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 2, height: 10, borderRadius: "0 99px 99px 0", background: "#171717" }} />
            )}
            <Ic size={14} stroke={1.75} />
          </div>
        );
      })}
    </div>
  );
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

const initialsColors = ["#3B6CE7", "#5AE09A", "#A855F7", "#F59E0B", "#EC4899", "#14B8A6", "#6366F1", "#F43F5E"];
function getColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return initialsColors[Math.abs(h) % initialsColors.length];
}

const clientDetailTabs = ["Meetings", "Files", "Projects", "Events", "Expenses", "Settings"];

interface ProjectRow {
  name: string;
  slug: string;
  logoUrl?: string;
  commitsThisWeek: number;
  commitsLastWeek: number;
  costThisWeek: string;
  repoCount: number;
  lastCommit: string;
  vendors: string[];
}

const blackFlagProjects: ProjectRow[] = [
  { name: "BFD Admin Apps", slug: "bfd-admin-apps", commitsThisWeek: 47, commitsLastWeek: 32, costThisWeek: "$8.42", repoCount: 1, lastCommit: "2m ago", vendors: ["github", "cursor", "linear"] },
  { name: "BFD Platform", slug: "bfd-platform", commitsThisWeek: 12, commitsLastWeek: 18, costThisWeek: "$3.10", repoCount: 1, lastCommit: "1h ago", vendors: ["github", "cursor"] },
  { name: "MeetingOS", slug: "meeting-os", commitsThisWeek: 8, commitsLastWeek: 5, costThisWeek: "$1.80", repoCount: 1, lastCommit: "3h ago", vendors: ["github", "cursor", "linear"] },
  { name: "BFD Front Door", slug: "bfd-front-door", commitsThisWeek: 3, commitsLastWeek: 7, costThisWeek: "$0.90", repoCount: 1, lastCommit: "6h ago", vendors: ["github", "cursor"] },
  { name: "Senior Agent Tools", slug: "senior-agent-tools", commitsThisWeek: 0, commitsLastWeek: 2, costThisWeek: "$0.00", repoCount: 1, lastCommit: "3d ago", vendors: ["github"] },
  { name: "BFD Widget", slug: "bfd-widget", commitsThisWeek: 1, commitsLastWeek: 0, costThisWeek: "$0.20", repoCount: 1, lastCommit: "1d ago", vendors: ["github", "cursor"] },
];

const projectDetailTabs: { label: string; icon: typeof Video }[] = [
  { label: "Meetings", icon: Video },
  { label: "Files", icon: FileText },
  { label: "Knowledge", icon: Briefcase },
  { label: "Whiteboards", icon: LayoutGrid },
  { label: "Events", icon: Activity },
  { label: "Work", icon: GitBranch },
  { label: "Deployments", icon: Server },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

function vendorIcon(vendor: string, size = 12): React.ReactNode {
  switch (vendor) {
    case "github": return <GitHubDark size={size} />;
    case "linear": return <LinearIcon size={size} />;
    case "cursor": return <CursorIcon size={size} />;
    case "convex": return <Convex size={size} />;
    case "clerk": return <Clerk size={size} />;
    case "cloudflare": return <Cloudflare size={size} />;
    case "aws": return <AWS size={size} />;
    case "supabase": return <Supabase size={size} />;
    default: return null;
  }
}

function CommitTrend({ thisWeek, lastWeek }: { thisWeek: number; lastWeek: number }) {
  if (thisWeek === 0 && lastWeek === 0) return <Clock size={10} style={{ color: "#A1A1AA" }} />;
  if (thisWeek > lastWeek) return <ArrowUpRight size={10} style={{ color: "#22C55E" }} />;
  if (thisWeek < lastWeek) return <ArrowDownRight size={10} style={{ color: "#EF4444" }} />;
  return <span style={{ fontSize: 8, color: "#A1A1AA" }}>—</span>;
}

const eventSamples = [
  { actor: "kpatt1011", vendor: "github", title: "Push to main — 3 commits", time: "2m ago", vendorId: "github" },
  { actor: "Keith Pattison", vendor: "cursor", title: "Agent session: rewrite PageLayoutsSection", time: "4m ago", vendorId: "cursor" },
  { actor: "Keith Pattison", vendor: "linear", title: "BFA-142 moved to In Progress", time: "12m ago", vendorId: "linear" },
  { actor: "kpatt1011", vendor: "github", title: "PR #87 merged: event card vendor logos", time: "28m ago", vendorId: "github" },
  { actor: "Keith Pattison", vendor: "cursor", title: "Agent session: fix TypeScript errors", time: "1h ago", vendorId: "cursor" },
];

const files = [
  { type: "folder" as const, name: "designs" },
  { type: "folder" as const, name: "contracts" },
  { type: "file" as const, name: "brand-guide.pdf", size: "3.5 MB" },
  { type: "file" as const, name: "architecture.png", size: "890 KB" },
  { type: "file" as const, name: "meeting-notes.md", size: "8 KB" },
  { type: "file" as const, name: "invoice-jan.pdf", size: "240 KB" },
  { type: "file" as const, name: "logo-v3.svg", size: "42 KB" },
  { type: "file" as const, name: "requirements.pdf", size: "1.2 MB" },
];

export function PageLayoutsSection() {
  const [activeClientTab, setActiveClientTab] = useState(2);
  const [activeProjectTab, setActiveProjectTab] = useState(4);

  return (
    <section id="page-layouts" className="relative bg-bf-paper border-t-4 border-bf-royal py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            number="15"
            title="Page Layouts"
            description="Full-page compositions from the admin app with real client data, vendor logos, and proper tab structures. Each uses the sidebar, chrome header, and responsive grid."
          />

          {/* ── 1. Clients Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">1 · Clients Grid</h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Top-level collection with real client logos, descriptions, and website
              URLs. 3 columns desktop, 2 tablet, 1 mobile. Cards use logo with
              deterministic-color initials fallback.
            </p>
            <DeviceFrame desktopHeight={480} tabletHeight={480} mobileHeight={520}>
              {({ device }) => {
                const isMobile = device === "mobile";
                const isTablet = device === "tablet";
                const cols = isMobile ? 1 : isTablet ? 2 : 3;
                return (
                  <div style={{ display: "flex", height: "100%" }}>
                    {!isMobile && <MiniSidebar activeIdx={0} />}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", background: "#FAFAFA", borderBottom: "2px solid #D4D4D8" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#171717" }}>Clients</span>
                        <span style={{ padding: "3px 10px", fontSize: 10, fontWeight: 700, borderRadius: 5, background: "#171717", color: "#fff", cursor: "pointer" }}>+ New</span>
                      </div>
                      <div style={{ flex: 1, background: "#FAFAFA", padding: isMobile ? 10 : 14, overflowY: "auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
                          {CLIENTS.map(c => {
                            const color = getColor(c.name);
                            return (
                              <div key={c.slug} style={{ border: "1px solid #D4D4D8", borderRadius: 8, padding: 12, background: "#fff", cursor: "pointer", transition: "all 150ms ease" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                  {c.logoUrl ? (
                                    <img src={c.logoUrl} alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "contain", background: "#fff" }} />
                                  ) : (
                                    <div style={{ width: 28, height: 28, borderRadius: 6, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>
                                      {getInitials(c.name)}
                                    </div>
                                  )}
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>{c.name}</span>
                                </div>
                                <p style={{ fontSize: 10, color: "#71717A", lineHeight: 1.4 }}>{c.description}</p>
                                {c.websiteUrl && (
                                  <p style={{ fontSize: 9, fontFamily: "monospace", color: "#3B6CE7", marginTop: 4 }}>
                                    {c.websiteUrl.replace(/^https?:\/\//, "")}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 2. Client Detail — Black Flag ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">2 · Client Detail</h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Drill-down view for Black Flag. Chrome header with logo, 6 tabs
              (Meetings, Files, Projects, Events, Expenses, Settings). Projects
              tab shows activity indicators and vendor integration badges.
            </p>
            <DeviceFrame desktopHeight={520} tabletHeight={520} mobileHeight={540}>
              {({ device }) => {
                const isMobile = device === "mobile";
                return (
                  <div style={{ display: "flex", height: "100%" }}>
                    {!isMobile && <MiniSidebar activeIdx={0} />}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                      {/* Chrome header */}
                      <div style={{ backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)", borderBottom: "1px solid #bdbdbd", padding: isMobile ? "10px 12px" : "12px 16px" }}>
                        {!isMobile && (
                          <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#71717A", marginBottom: 4 }}>
                            <span>Clients</span>
                            <ChevronRight size={10} strokeWidth={2} style={{ color: "#D4D4D8" }} />
                            <span style={{ color: "#171717", fontWeight: 500 }}>Black Flag</span>
                          </nav>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <img
                            src="https://www.google.com/s2/favicons?domain=blackflag.design&sz=128"
                            alt=""
                            style={{ width: 28, height: 28, borderRadius: 6, objectFit: "contain" }}
                          />
                          <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 600, color: "#171717", letterSpacing: "-0.01em" }}>Black Flag</span>
                          <span style={{ fontSize: 10, color: "#71717A", fontFamily: "monospace" }}>blackflag.design</span>
                        </div>
                      </div>
                      {/* Tab strip — 6 tabs */}
                      <div style={{ display: "flex", gap: 3, padding: "5px 6px", backgroundImage: "linear-gradient(to bottom, #f2f2f2, #dcdcdc)", borderBottom: "1px solid #c8c8c8", overflowX: "auto" }}>
                        {clientDetailTabs.map((tab, i) => (
                          <button
                            key={tab}
                            onClick={() => setActiveClientTab(i)}
                            style={{
                              padding: "4px 10px",
                              fontSize: 11,
                              fontWeight: 500,
                              borderRadius: 5,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                              border: activeClientTab === i ? "1px solid #D4D4D8" : "1px solid transparent",
                              background: activeClientTab === i ? "#fff" : "transparent",
                              color: activeClientTab === i ? "#171717" : "rgba(23,23,23,0.45)",
                              boxShadow: activeClientTab === i ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                            }}
                          >
                            {tab}
                            {tab === "Projects" && (
                              <span style={{ marginLeft: 4, fontSize: 9, fontWeight: 700, padding: "0 4px", borderRadius: 3, background: "#171717", color: "#fff" }}>
                                {blackFlagProjects.length}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                      {/* Content: Projects tab */}
                      <div style={{ flex: 1, background: "#FAFAFA", padding: isMobile ? 10 : 14, overflowY: "auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                          {blackFlagProjects.map(p => (
                            <div key={p.slug} style={{ border: "1px solid #D4D4D8", borderRadius: 8, padding: 12, background: "#fff", cursor: "pointer", position: "relative" }}>
                              {/* Cost badge */}
                              <span style={{ position: "absolute", top: 8, right: 10, fontSize: 9, fontWeight: 600, fontFamily: "monospace", color: "#71717A" }}>
                                <DollarSign size={9} style={{ display: "inline", verticalAlign: "middle" }} />
                                {p.costThisWeek.replace("$", "")}
                              </span>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                <div style={{ width: 24, height: 24, borderRadius: 5, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <img src="/logos/mark-light.svg" alt="" style={{ height: 15, width: "auto" }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>{p.name}</span>
                              </div>
                              {/* Activity row */}
                              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "#71717A" }}>
                                <CommitTrend thisWeek={p.commitsThisWeek} lastWeek={p.commitsLastWeek} />
                                <span style={{ fontFamily: "monospace" }}>{p.commitsThisWeek} commits</span>
                                <span style={{ color: "#D4D4D8" }}>·</span>
                                <span>{p.lastCommit}</span>
                              </div>
                              {/* Vendor integration badges */}
                              <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                                {p.vendors.map(v => (
                                  <span key={v} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: 4, border: "1px solid #E4E4E7", background: "#FAFAFA" }}>
                                    {vendorIcon(v, 11)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 3. Project Detail — BFD Admin Apps ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">3 · Project Detail</h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              9-tab project view with icon'd tabs. Breadcrumbs show client → project
              hierarchy. Events tab has vendor-logo'd filter pills. Every vendor
              mention carries its icon.
            </p>
            <DeviceFrame desktopHeight={520} tabletHeight={520} mobileHeight={540}>
              {({ device }) => {
                const isMobile = device === "mobile";
                return (
                  <div style={{ display: "flex", height: "100%" }}>
                    {!isMobile && <MiniSidebar activeIdx={0} />}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                      {/* Chrome header */}
                      <div style={{ backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)", borderBottom: "1px solid #bdbdbd", padding: isMobile ? "10px 12px" : "12px 16px" }}>
                        {!isMobile && (
                          <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#71717A", marginBottom: 4 }}>
                            <span>Clients</span>
                            <ChevronRight size={10} strokeWidth={2} style={{ color: "#D4D4D8" }} />
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                              <img src="https://www.google.com/s2/favicons?domain=blackflag.design&sz=128" alt="" style={{ width: 11, height: 11, borderRadius: 2 }} />
                              Black Flag
                            </span>
                            <ChevronRight size={10} strokeWidth={2} style={{ color: "#D4D4D8" }} />
                            <span style={{ color: "#171717", fontWeight: 500 }}>BFD Admin Apps</span>
                          </nav>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <img src="/logos/mark-light.svg" alt="" style={{ height: 18, width: "auto" }} />
                          </div>
                          <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 600, color: "#171717", letterSpacing: "-0.01em" }}>BFD Admin Apps</span>
                        </div>
                      </div>
                      {/* Tab strip — 9 tabs with icons */}
                      <div style={{ display: "flex", gap: 2, padding: "5px 6px", backgroundImage: "linear-gradient(to bottom, #f2f2f2, #dcdcdc)", borderBottom: "1px solid #c8c8c8", overflowX: "auto" }}>
                        {projectDetailTabs.map((tab, i) => {
                          const TabIcon = tab.icon;
                          return (
                            <button
                              key={tab.label}
                              onClick={() => setActiveProjectTab(i)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "4px 8px",
                                fontSize: 10,
                                fontWeight: 500,
                                borderRadius: 5,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                border: activeProjectTab === i ? "1px solid #D4D4D8" : "1px solid transparent",
                                background: activeProjectTab === i ? "#fff" : "transparent",
                                color: activeProjectTab === i ? "#171717" : "rgba(23,23,23,0.45)",
                                boxShadow: activeProjectTab === i ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                                cursor: "pointer",
                                transition: "all 150ms ease",
                              }}
                            >
                              <TabIcon size={11} strokeWidth={1.75} />
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>
                      {/* Content: Events tab */}
                      <div style={{ flex: 1, background: "#FAFAFA", padding: 0, display: "flex", flexDirection: "column", minWidth: 0 }}>
                        {/* Vendor filter bar */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "#fff", borderBottom: "1px solid #D4D4D8" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, height: 26, borderRadius: 5, border: "1px solid #D4D4D8", padding: "0 8px", minWidth: isMobile ? "100%" : 120, flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
                            <Search size={10} strokeWidth={1.75} style={{ color: "#71717A" }} />
                            <span style={{ fontSize: 10, color: "#71717A" }}>Search events…</span>
                          </div>
                          {!isMobile && (
                            <>
                              {[
                                { label: "All", active: true },
                                { label: "GitHub", icon: <GitHubDark size={11} />, active: false },
                                { label: "Linear", icon: <LinearIcon size={11} />, active: false },
                                { label: "Cursor", icon: <CursorIcon size={11} />, active: false },
                                { label: "Feedback", active: false },
                              ].map(f => (
                                <span
                                  key={f.label}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 3,
                                    padding: "2px 8px",
                                    fontSize: 9,
                                    fontWeight: 500,
                                    borderRadius: 4,
                                    border: f.active ? "1px solid #171717" : "1px solid #D4D4D8",
                                    background: f.active ? "#171717" : "transparent",
                                    color: f.active ? "#fff" : "#71717A",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                  }}
                                >
                                  {f.icon}
                                  {f.label}
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                        {/* Event list */}
                        <div style={{ flex: 1, padding: "8px 12px", overflowY: "auto" }}>
                          {eventSamples.map((ev, idx) => (
                            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderRadius: 6, border: "1px solid #D4D4D8", marginBottom: 5, background: "#fff", cursor: "pointer" }}>
                              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#E4E4E7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#171717", flexShrink: 0 }}>
                                {ev.actor.slice(0, 2).toUpperCase()}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: 10, fontWeight: 500, color: "#171717", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</p>
                                <div style={{ display: "flex", gap: 4, marginTop: 2, alignItems: "center" }}>
                                  {vendorIcon(ev.vendorId, 10)}
                                  <span style={{ fontSize: 8, color: "#71717A" }}>{ev.actor} · {ev.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 4. File Browser ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">4 · File Browser</h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Breadcrumb navigation within a project's Files tab. 4 columns desktop,
              2 tablet, 1 mobile. Upload and new-folder actions in the toolbar.
            </p>
            <DeviceFrame desktopHeight={420} tabletHeight={420} mobileHeight={460}>
              {({ device }) => {
                const isMobile = device === "mobile";
                const isTablet = device === "tablet";
                const cols = isMobile ? 1 : isTablet ? 2 : 4;
                return (
                  <div style={{ display: "flex", height: "100%" }}>
                    {!isMobile && <MiniSidebar activeIdx={0} />}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                      <div style={{ backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)", borderBottom: "1px solid #bdbdbd", padding: isMobile ? "10px 12px" : "12px 16px" }}>
                        {!isMobile && (
                          <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#71717A", marginBottom: 4 }}>
                            <span>Clients</span>
                            <ChevronRight size={10} strokeWidth={2} style={{ color: "#D4D4D8" }} />
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                              <img src="https://www.google.com/s2/favicons?domain=ncee.org&sz=128" alt="" style={{ width: 11, height: 11, borderRadius: 2 }} />
                              NCEE
                            </span>
                            <ChevronRight size={10} strokeWidth={2} style={{ color: "#D4D4D8" }} />
                            <span style={{ color: "#171717", fontWeight: 500 }}>Teaching Partner</span>
                          </nav>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <img src="https://www.google.com/s2/favicons?domain=ncee.org&sz=128" alt="" style={{ width: 24, height: 24, borderRadius: 5 }} />
                          <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 600, color: "#171717" }}>Teaching Partner</span>
                        </div>
                      </div>
                      {/* Tabs */}
                      <div style={{ display: "flex", gap: 3, padding: "4px 6px", backgroundImage: "linear-gradient(to bottom, #f2f2f2, #dcdcdc)", borderBottom: "1px solid #c8c8c8" }}>
                        {["Meetings", "Files", "Events"].map((t, i) => (
                          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 8px", fontSize: 10, fontWeight: 500, borderRadius: 4, border: i === 1 ? "1px solid #D4D4D8" : "1px solid transparent", background: i === 1 ? "#fff" : "transparent", color: i === 1 ? "#171717" : "rgba(23,23,23,0.45)" }}>
                            {i === 0 && <Video size={10} strokeWidth={1.5} />}
                            {i === 1 && <FileText size={10} strokeWidth={1.5} />}
                            {i === 2 && <Activity size={10} strokeWidth={1.5} />}
                            {t}
                          </span>
                        ))}
                      </div>
                      {/* Breadcrumbs + actions */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#FAFAFA", borderBottom: "1px solid #E4E4E7" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#71717A" }}>
                          <span style={{ cursor: "pointer" }}>Files</span>
                          <ChevronRight size={10} style={{ color: "#D4D4D8" }} />
                          <span style={{ color: "#171717", fontWeight: 500 }}>docs</span>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 8px", fontSize: 9, fontWeight: 500, borderRadius: 4, border: "1px solid #D4D4D8", color: "#71717A", cursor: "pointer" }}><FolderPlus size={10} /> New folder</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 8px", fontSize: 9, fontWeight: 500, borderRadius: 4, background: "#171717", color: "#fff", cursor: "pointer" }}><Upload size={10} /> Upload</span>
                        </div>
                      </div>
                      {/* Grid */}
                      <div style={{ flex: 1, background: "#FAFAFA", padding: "10px 12px", overflowY: "auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
                          {files.map((f, idx) => (
                            <div key={idx} style={{ border: "1px solid #D4D4D8", borderRadius: 6, padding: 10, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                              {f.type === "folder" ? (
                                <Folder size={16} strokeWidth={1.5} style={{ color: "#E89020", flexShrink: 0 }} />
                              ) : (
                                <File size={16} strokeWidth={1.5} style={{ color: "#71717A", flexShrink: 0 }} />
                              )}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: 11, fontWeight: 500, color: "#171717", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</p>
                                {f.type === "file" && <p style={{ fontSize: 9, color: "#71717A" }}>{f.size}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── 5. Expenses Tab — Code Gen + Infrastructure ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">5 · Expenses Tab</h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Two sections: Code Generation (Cursor costs with nested project →
              contributor → event hierarchy) and Infrastructure (AWS, Supabase,
              Cloudflare, Convex accordions). Date range picker and invoice export.
            </p>
            <DeviceFrame desktopHeight={620} tabletHeight={620} mobileHeight={640}>
              {({ device }) => {
                const isMobile = device === "mobile";
                return (
                  <div style={{ display: "flex", height: "100%" }}>
                    {!isMobile && <MiniSidebar activeIdx={0} />}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                      {/* Chrome header */}
                      <div style={{ backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)", borderBottom: "1px solid #bdbdbd", padding: isMobile ? "10px 12px" : "12px 16px" }}>
                        {!isMobile && (
                          <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#71717A", marginBottom: 4 }}>
                            <span>Clients</span>
                            <ChevronRight size={10} strokeWidth={2} style={{ color: "#D4D4D8" }} />
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                              <img src="https://www.google.com/s2/favicons?domain=blackflag.design&sz=128" alt="" style={{ width: 11, height: 11, borderRadius: 2 }} />
                              Black Flag
                            </span>
                          </nav>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <img src="https://www.google.com/s2/favicons?domain=blackflag.design&sz=128" alt="" style={{ width: 24, height: 24, borderRadius: 5 }} />
                          <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 600, color: "#171717" }}>Black Flag</span>
                        </div>
                      </div>
                      {/* Tab strip — Expenses active */}
                      <div style={{ display: "flex", gap: 3, padding: "5px 6px", backgroundImage: "linear-gradient(to bottom, #f2f2f2, #dcdcdc)", borderBottom: "1px solid #c8c8c8", overflowX: "auto" }}>
                        {clientDetailTabs.map((tab, i) => (
                          <span key={tab} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 500, borderRadius: 5, whiteSpace: "nowrap", flexShrink: 0, border: i === 4 ? "1px solid #D4D4D8" : "1px solid transparent", background: i === 4 ? "#fff" : "transparent", color: i === 4 ? "#171717" : "rgba(23,23,23,0.45)", boxShadow: i === 4 ? "0 1px 2px rgba(0,0,0,0.05)" : "none" }}>
                            {tab}
                          </span>
                        ))}
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, background: "#FAFAFA", padding: isMobile ? 10 : 14, overflowY: "auto" }}>
                        {/* Total + controls */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>Estimated Expenses</span>
                            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: "#171717", marginLeft: 10 }}>$1,762.30</span>
                          </div>
                          <div style={{ display: "flex", gap: 4 }}>
                            <span style={{ padding: "3px 8px", fontSize: 9, fontWeight: 500, borderRadius: 4, border: "1px solid #171717", background: "#171717", color: "#fff" }}>Month to date</span>
                            <span style={{ padding: "3px 8px", fontSize: 9, fontWeight: 500, borderRadius: 4, border: "1px solid #D4D4D8", color: "#71717A" }}>Last month</span>
                            <span style={{ padding: "3px 8px", fontSize: 9, fontWeight: 500, borderRadius: 4, border: "1px solid #D4D4D8", color: "#71717A", cursor: "pointer" }}>Download PDF</span>
                          </div>
                        </div>

                        {/* ── CODE GENERATION SECTION ── */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <CursorIcon size={14} />
                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#171717" }}>Code Generation</span>
                            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$142.30</span>
                          </div>
                          {/* Cursor accordion — expanded */}
                          <div style={{ border: "1px solid #D4D4D8", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #E4E4E7" }}>
                              <ChevronDown size={12} strokeWidth={2} style={{ color: "#71717A" }} />
                              <CursorIcon size={16} />
                              <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>Cursor</span>
                              <span style={{ fontSize: 9, color: "#71717A" }}>47 sessions · 3 contributors</span>
                              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$142.30</span>
                            </div>

                            {/* Project: BFD Admin Apps */}
                            <div style={{ borderBottom: "1px solid #F4F4F5" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px 8px 34px" }}>
                                <ChevronDown size={10} strokeWidth={2} style={{ color: "#A1A1AA" }} />
                                <div style={{ width: 18, height: 18, borderRadius: 4, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <img src="/logos/mark-light.svg" alt="" style={{ height: 11, width: "auto" }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#171717" }}>BFD Admin Apps</span>
                                <span style={{ fontSize: 9, color: "#71717A" }}>28 sessions</span>
                                <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$86.42</span>
                              </div>
                              {/* Contributor rows */}
                              <div style={{ padding: "0 14px 6px 56px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: "1px solid #F4F4F5" }}>
                                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #14B8A6, #0891B2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: "#fff", flexShrink: 0 }}>KP</div>
                                  <span style={{ fontSize: 10, fontWeight: 500, color: "#171717" }}>Keith Pattison</span>
                                  <span style={{ fontSize: 9, color: "#71717A" }}>1.2M tokens</span>
                                  <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$62.30</span>
                                </div>
                                {/* Sample events */}
                                <div style={{ paddingLeft: 26, paddingTop: 4 }}>
                                  {[
                                    { date: "Feb 18", cost: "$0.42", inT: "12K", outT: "8K", model: "claude-4-opus" },
                                    { date: "Feb 18", cost: "$0.18", inT: "4K", outT: "2K", model: "claude-sonnet-4" },
                                    { date: "Feb 17", cost: "$1.24", inT: "32K", outT: "18K", model: "claude-4-opus" },
                                  ].map((ev, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 9, color: "#71717A", padding: "2px 0" }}>
                                      <span style={{ width: 44, flexShrink: 0 }}>{ev.date}</span>
                                      <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#171717", width: 40 }}>{ev.cost}</span>
                                      <span style={{ fontFamily: "monospace" }}>{ev.inT}/{ev.outT}</span>
                                      <span style={{ padding: "0 4px", fontSize: 8, fontWeight: 600, borderRadius: 2, background: "#F0EEFF", color: "#5E6AD2" }}>{ev.model}</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0" }}>
                                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E4E4E7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: "#71717A", flexShrink: 0 }}>AG</div>
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
                                <div style={{ width: 18, height: 18, borderRadius: 4, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <img src="/logos/mark-light.svg" alt="" style={{ height: 11, width: "auto" }} />
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
                                <div style={{ width: 18, height: 18, borderRadius: 4, background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <img src="/logos/mark-light.svg" alt="" style={{ height: 11, width: "auto" }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#171717" }}>BFD Platform</span>
                                <span style={{ fontSize: 9, color: "#71717A" }}>7 sessions</span>
                                <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$23.78</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── INFRASTRUCTURE SECTION ── */}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <Server size={13} strokeWidth={1.75} style={{ color: "#71717A" }} />
                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#171717" }}>Infrastructure</span>
                            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#171717", marginLeft: "auto" }}>$1,620.00</span>
                          </div>
                          {[
                            { vendor: "aws", label: "AWS", subtitle: "us-east-1 · Month to date", total: "$1,240.00", items: [{ name: "EC2 Instances", cost: "$680.00", pct: "55%" }, { name: "S3 Storage", cost: "$340.00", pct: "27%" }, { name: "CloudFront CDN", cost: "$220.00", pct: "18%" }] },
                            { vendor: "supabase", label: "Supabase", subtitle: "4 projects · Pro plan", total: "$285.00", items: [{ name: "Pro Plan (×2)", cost: "$50.00" }, { name: "Database Compute", cost: "$135.00" }, { name: "Storage", cost: "$100.00" }] },
                            { vendor: "cloudflare", label: "Cloudflare", subtitle: "Free tier — Workers + R2", total: "$0.00", items: [{ name: "Requests: 1.2M", cost: "—" }, { name: "Bandwidth: 48 GB", cost: "—" }, { name: "Threats Blocked: 312", cost: "—" }] },
                            { vendor: "convex", label: "Convex", subtitle: "2 projects · Pro plan", total: "$95.00", items: [{ name: "Function Calls", cost: "$55.00" }, { name: "Database Storage", cost: "$25.00" }, { name: "File Storage", cost: "$15.00" }] },
                          ].map((prov, idx) => (
                            <div key={prov.vendor} style={{ border: "1px solid #D4D4D8", borderRadius: 8, background: "#fff", overflow: "hidden", marginBottom: 6 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", cursor: "pointer" }}>
                                <ChevronRight size={12} strokeWidth={2} style={{ color: "#71717A", transform: idx === 0 ? "rotate(90deg)" : "none", transition: "transform 200ms" }} />
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, flexShrink: 0 }}>
                                  {vendorIcon(prov.vendor, 16)}
                                </span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>{prov.label}</span>
                                  <p style={{ fontSize: 9, color: "#71717A" }}>{prov.subtitle}</p>
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: "#171717", flexShrink: 0 }}>{prov.total}</span>
                              </div>
                              {idx === 0 && (
                                <div style={{ borderTop: "1px solid #E4E4E7", padding: "0 14px" }}>
                                  {prov.items.map((item, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < prov.items.length - 1 ? "1px solid #F4F4F5" : "none" }}>
                                      <span style={{ fontSize: 11, color: "#171717" }}>{item.name}</span>
                                      <div style={{ display: "flex", gap: 8 }}>
                                        {"pct" in item && <span style={{ fontSize: 9, color: "#A1A1AA" }}>{item.pct}</span>}
                                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "#71717A" }}>{item.cost}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </DeviceFrame>
          </motion.div>

          {/* ── Component Tree Audit ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
              Component Coverage Audit
            </h3>
            <p className="text-sm text-bf-muted mb-5 max-w-xl">
              Mapping of admin-app-convex React components to style guide coverage.
            </p>
            <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5 sm:p-7 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs font-mono leading-relaxed" style={{ color: "var(--bf-text)" }}>
{`AdminLayout
 ├─ AdminSidebar             `}<Badge label="COVERED" color="#5AE09A" />{`
 └─ Pages
     ├─ Clients (grid)       `}<Badge label="COVERED" color="#5AE09A" />{` → real client logos + data
     ├─ ClientDetail          `}<Badge label="COVERED" color="#5AE09A" />{` → 6 tabs, Projects with activity
     ├─ ProjectDetail         `}<Badge label="COVERED" color="#5AE09A" />{` → 9 tabs with icons, vendor filters
     ├─ Events Feed           `}<Badge label="COVERED" color="#5AE09A" />{` → EventCardsSection
     ├─ Expenses              `}<Badge label="COVERED" color="#5AE09A" />{` → vendor-grouped cost breakdown
     ├─ File Browser          `}<Badge label="COVERED" color="#5AE09A" />{` → breadcrumbs + grid
     ├─ Settings              `}<Badge label="COVERED" color="#3B6CE7" />{` → ComplexComponents
     ├─ People                `}<Badge label="COVERED" color="#3B6CE7" />{` → ComplexComponents
     └─ InfraCosts            `}<Badge label="COVERED" color="#3B6CE7" />{` → ComplexComponents`}
              </pre>
              <div className="mt-5 pt-4 border-t border-bf-border flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold">
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: "#5AE09A", display: "inline-block" }} /> Fully covered in this section
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold">
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: "#3B6CE7", display: "inline-block" }} /> Covered in ComplexComponents
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "1px 5px",
        fontSize: 9,
        fontWeight: 700,
        borderRadius: 3,
        background: `${color}20`,
        color,
        letterSpacing: "0.04em",
        verticalAlign: "middle",
      }}
    >
      {label}
    </span>
  );
}
