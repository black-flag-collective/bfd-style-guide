import { motion } from "framer-motion";
import { Inbox, AlertTriangle, Check } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";
import { Clerk, Convex, Cloudflare, GitHubLight } from "developer-icons";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Badge data ── */
const statusBadges = [
  { label: "Backlog", bg: "bg-bf-cobalt/10", text: "text-bf-cobalt", border: "border-bf-cobalt/20" },
  { label: "In Progress", bg: "bg-bf-amber/10", text: "text-bf-amber", border: "border-bf-amber/20" },
  { label: "Done", bg: "bg-bf-mint/10", text: "text-bf-mint", border: "border-bf-mint/20" },
  { label: "Won't Do", bg: "bg-bf-slate/10", text: "text-bf-slate", border: "border-bf-slate/20" },
];

const severityBadges = [
  { label: "None", bg: "bg-bf-slate/10", text: "text-bf-slate", border: "border-bf-slate/20" },
  { label: "Low", bg: "bg-bf-cobalt/10", text: "text-bf-cobalt", border: "border-bf-cobalt/20" },
  { label: "Medium", bg: "bg-bf-gold/10", text: "text-bf-gold", border: "border-bf-gold/20" },
  { label: "High", bg: "bg-bf-amber/10", text: "text-bf-amber", border: "border-bf-amber/20" },
  { label: "Critical", bg: "bg-bf-crimson/10", text: "text-bf-crimson", border: "border-bf-crimson/20" },
];

const baseBadges = [
  { label: "Default", classes: "btn-active border-transparent" },
  { label: "Secondary", classes: "bg-white/10 text-bf-text border-white/20" },
  { label: "Destructive", classes: "btn-destructive border-transparent" },
  { label: "Outline", classes: "bg-transparent text-bf-text border-white/20" },
];

/* ── Table data with real vendor icons ── */
const vendorIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Clerk,
  GitHub: GitHubLight,
  Cloudflare,
  Convex,
};

function VantaIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return <img src="/vendors/vanta.png" alt="Vanta" width={size} height={size} className={`rounded-full ${className}`} />;
}

const tableRows = [
  { name: "User sync", vendor: "Clerk", status: "Done", severity: "None", time: "2 m ago" },
  { name: "Deploy hook", vendor: "GitHub", status: "In Progress", severity: "Medium", time: "5 m ago" },
  { name: "DNS update", vendor: "Cloudflare", status: "Backlog", severity: "High", time: "12 m ago" },
  { name: "DB migration", vendor: "Convex", status: "Done", severity: "Low", time: "1 h ago" },
  { name: "SOC 2 audit", vendor: "Vanta", status: "In Progress", severity: "Critical", time: "30 m ago" },
];

function Badge({ label, bg, text, border }: { label: string; bg: string; text: string; border: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${bg} ${text} ${border}`}>
      {label}
    </span>
  );
}

export function DataPatternsSection() {
  return (
    <section id="data-patterns" className="relative bg-bf-bg border-t-4 border-bf-rose py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="11"
                title="Data Patterns"
                description="Badges, tables, avatars, and state handling for data-dense admin interfaces."
              />

              {/* ── Badges ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Status Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {statusBadges.map((b) => (
                    <Badge key={b.label} {...b} />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Severity Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {severityBadges.map((b) => (
                    <Badge key={b.label} {...b} />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Base Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  {baseBadges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.classes}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Data Table (with real vendor logos) ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Data Table
                </h3>
                <p className="text-sm text-bf-muted mb-4 max-w-xl">
                  On mobile the table scrolls horizontally. On desktop all columns
                  are visible without scrolling.
                </p>
                <DeviceFrame desktopHeight={320} tabletHeight={320} mobileHeight={320}>
                  {() => (
                    <div style={{ height: "100%", overflowX: "auto", overflowY: "auto", background: "#FAFAFA" }}>
                      <table style={{ width: "100%", minWidth: 600, borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--bf-border)", background: "var(--bf-paper)" }}>
                            {["Event", "Vendor", "Status", "Severity", "Time"].map((h, i) => (
                              <th key={h} style={{ height: 40, padding: "0 14px", textAlign: i === 4 ? "right" : "left", fontSize: 11, fontWeight: 900, color: "rgba(23,23,23,0.6)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.map((row, idx) => {
                            const ss = statusBadges.find(b => b.label === row.status) ?? statusBadges[0];
                            const sv = severityBadges.find(b => b.label === row.severity) ?? severityBadges[0];
                            const VI = row.vendor === "Vanta" ? VantaIcon : vendorIcons[row.vendor];
                            return (
                              <tr key={idx} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                                <td style={{ padding: 14, fontSize: 13, fontWeight: 500, color: "var(--bf-text)" }}>{row.name}</td>
                                <td style={{ padding: 14 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--bf-text)" }}>{VI && <VI size={15} />}{row.vendor}</span></td>
                                <td style={{ padding: 14 }}><Badge label={row.status} bg={ss.bg} text={ss.text} border={ss.border} /></td>
                                <td style={{ padding: 14 }}><Badge label={row.severity} bg={sv.bg} text={sv.text} border={sv.border} /></td>
                                <td style={{ padding: 14, fontSize: 13, textAlign: "right", fontFamily: "monospace", color: "rgba(23,23,23,0.5)" }}>{row.time}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </DeviceFrame>

                {/* Original static reference kept below */}
                <div className="mt-6 rounded-xl border-2 border-bf-border overflow-hidden">
                  <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-bf-border bg-bf-paper">
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-text/70 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-text/70 uppercase tracking-wider">
                          Vendor
                        </th>
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-text/70 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-text/70 uppercase tracking-wider">
                          Severity
                        </th>
                        <th className="h-11 px-4 text-right text-xs font-black text-bf-text/70 uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, i) => {
                        const statusStyle =
                          statusBadges.find((b) => b.label === row.status) ??
                          statusBadges[0];
                        const severityStyle =
                          severityBadges.find((b) => b.label === row.severity) ??
                          severityBadges[0];
                        const VendorIcon = row.vendor === "Vanta" ? VantaIcon : vendorIcons[row.vendor];

                        return (
                          <tr
                            key={i}
                            className="border-b border-white/5 hover:bg-bf-paper/5 transition-colors"
                          >
                            <td className="p-4 text-sm font-medium" style={{ color: 'var(--bf-text)' }}>
                              {row.name}
                            </td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-2 text-sm text-bf-text">
                                {VendorIcon && (
                                  <VendorIcon size={16} className="opacity-80" />
                                )}
                                {row.vendor}
                              </span>
                            </td>
                            <td className="p-4">
                              <Badge
                                label={row.status}
                                bg={statusStyle.bg}
                                text={statusStyle.text}
                                border={statusStyle.border}
                              />
                            </td>
                            <td className="p-4">
                              <Badge
                                label={row.severity}
                                bg={severityStyle.bg}
                                text={severityStyle.text}
                                border={severityStyle.border}
                              />
                            </td>
                            <td className="p-4 text-sm text-right font-mono text-bf-text/60">
                              {row.time}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>

              {/* ── Avatars ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Avatars
                </h3>
                <div className="flex flex-wrap items-end gap-4 sm:gap-8">
                  {[
                    { initials: "KP", size: "w-8 h-8", textSize: "text-xs", grad: "from-indigo-400 to-purple-500", px: "32" },
                    { initials: "JD", size: "w-10 h-10", textSize: "text-sm", grad: "from-emerald-400 to-teal-500", px: "40" },
                    { initials: "AB", size: "w-14 h-14", textSize: "text-base", grad: "from-orange-400 to-rose-500", px: "56" },
                    { initials: "ML", size: "w-20 h-20", textSize: "text-xl", grad: "from-sky-400 to-blue-600", px: "80" },
                  ].map((a) => (
                    <div key={a.initials} className="text-center">
                      <div
                        className={`${a.size} rounded-full bg-gradient-to-br ${a.grad} flex items-center justify-center text-white ${a.textSize} font-bold mb-2 mx-auto`}
                      >
                        {a.initials}
                      </div>
                      <p className="text-[10px] text-bf-muted font-mono">
                        {a.px} px
                      </p>
                    </div>
                  ))}

                  <div className="hidden sm:block h-16 w-px bg-bf-paper/10 mx-2" />

                  {/* Ring variants */}
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold mb-2 mx-auto ring-2 ring-bf-gold ring-offset-2 ring-offset-bf-bg">
                      <span className="text-sm">?</span>
                    </div>
                    <p className="text-[10px] text-bf-muted">Unmatched</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold mb-2 mx-auto ring-2 ring-bf-mint ring-offset-2 ring-offset-bf-bg">
                      <Check size={16} strokeWidth={2.5} className="text-white" />
                    </div>
                    <p className="text-[10px] text-bf-muted">Online</p>
                  </div>
                </div>
              </div>

              {/* ── Component States ── */}
              <div>
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Component States
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Loading */}
                  <div className="rounded-xl border-2 border-bf-border p-5">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">
                      Loading
                    </p>
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded-md bg-bf-paper/10 animate-pulse" />
                      <div className="h-4 w-1/2 rounded-md bg-bf-paper/10 animate-pulse" />
                      <div className="h-4 w-5/6 rounded-md bg-bf-paper/10 animate-pulse" />
                      <div className="h-20 w-full rounded-lg bg-bf-paper/10 animate-pulse" />
                    </div>
                    <p className="text-[10px] text-bf-muted mt-3 font-mono">
                      data === undefined &rarr; skeleton
                    </p>
                  </div>

                  {/* Empty */}
                  <div className="rounded-xl border-2 border-bf-border p-5 flex flex-col">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-4">
                      Empty State
                    </p>
                    <div className="flex-1 flex flex-col items-center justify-center py-4">
                      <div className="w-12 h-12 rounded-full bg-bf-paper/5 flex items-center justify-center mb-3">
                        <Inbox size={24} strokeWidth={1.75} className="text-bf-muted" />
                      </div>
                      <p className="text-sm font-medium text-bf-text mb-1">
                        No events found
                      </p>
                      <p className="text-xs text-bf-muted max-w-[200px] text-center">
                        Events from your integrations will appear here.
                      </p>
                    </div>
                    <p className="text-[10px] text-bf-muted mt-3 font-mono">
                      data.length === 0 &rarr; empty
                    </p>
                  </div>

                  {/* Error */}
                  <div className="rounded-xl border-2 border-bf-border p-5">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">
                      Error State
                    </p>
                    <div className="rounded-lg border-2 border-red-400/40 bg-red-950/50 p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={16} strokeWidth={2} className="text-red-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-red-200">
                            Connection failed
                          </p>
                          <p className="text-xs text-red-300/90 mt-1">
                            Unable to reach the backend. Check your connection.
                          </p>
                          <button className="mt-3 text-xs font-bold text-red-200 border-2 border-red-400/40 rounded-md px-3 py-1.5 hover:bg-red-500/20 transition-colors uppercase tracking-wider">
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-bf-muted mt-3 font-mono">
                      catch(err) &rarr; alert destructive
                    </p>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
