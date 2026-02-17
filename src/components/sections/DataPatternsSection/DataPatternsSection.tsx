import { motion } from "framer-motion";
import { Clerk, Convex, Cloudflare, GitHubDark } from "developer-icons";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Badge data ── */
const statusBadges = [
  { label: "Backlog", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  { label: "In Progress", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  { label: "Done", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  { label: "Won't Do", bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
];

const severityBadges = [
  { label: "None", bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  { label: "Low", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  { label: "Medium", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  { label: "High", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  { label: "Critical", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
];

const baseBadges = [
  { label: "Default", classes: "bg-bf-text text-white border-transparent" },
  { label: "Secondary", classes: "bg-bf-surface text-bf-text border-bf-border" },
  { label: "Destructive", classes: "bg-bf-destructive text-white border-transparent" },
  { label: "Outline", classes: "bg-transparent text-bf-text border-bf-border" },
];

/* ── Table data with real vendor icons ── */
const vendorIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Clerk,
  GitHub: GitHubDark,
  Cloudflare,
  Convex,
};

const tableRows = [
  { name: "User sync", vendor: "Clerk", status: "Done", severity: "None", time: "2 m ago" },
  { name: "Deploy hook", vendor: "GitHub", status: "In Progress", severity: "Medium", time: "5 m ago" },
  { name: "DNS update", vendor: "Cloudflare", status: "Backlog", severity: "High", time: "12 m ago" },
  { name: "DB migration", vendor: "Convex", status: "Done", severity: "Low", time: "1 h ago" },
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
    <section id="data-patterns" className="relative z-[60] px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 500px)" }}>
        <div
          className="sticky top-6 bg-bf-dark-bg rounded-xl shadow-float overflow-hidden"
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
                className="mb-10"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-dark-text mb-3">
                  Data&nbsp;Patterns
                </h2>
                <p className="text-base text-bf-dark-muted max-w-xl">
                  Badges, tables, avatars, and state handling for data-dense admin
                  interfaces.
                </p>
              </motion.div>

              {/* ── Badges ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">
                  Status Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {statusBadges.map((b) => (
                    <Badge key={b.label} {...b} />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">
                  Severity Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {severityBadges.map((b) => (
                    <Badge key={b.label} {...b} />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">
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
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">
                  Data Table
                </h3>
                <div className="rounded-xl border-2 border-white/10 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-dark-muted uppercase tracking-wider">
                          Event
                        </th>
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-dark-muted uppercase tracking-wider">
                          Vendor
                        </th>
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-dark-muted uppercase tracking-wider">
                          Status
                        </th>
                        <th className="h-11 px-4 text-left text-xs font-black text-bf-dark-muted uppercase tracking-wider">
                          Severity
                        </th>
                        <th className="h-11 px-4 text-right text-xs font-black text-bf-dark-muted uppercase tracking-wider">
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
                        const VendorIcon = vendorIcons[row.vendor];

                        return (
                          <tr
                            key={i}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="p-4 text-sm font-medium text-bf-dark-text">
                              {row.name}
                            </td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-2 text-sm text-bf-dark-muted">
                                {VendorIcon && (
                                  <VendorIcon size={16} className="opacity-60" />
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
                            <td className="p-4 text-sm text-bf-dark-muted text-right font-mono">
                              {row.time}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Avatars ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">
                  Avatars
                </h3>
                <div className="flex items-end gap-8">
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
                      <p className="text-[10px] text-bf-dark-muted font-mono">
                        {a.px} px
                      </p>
                    </div>
                  ))}

                  <div className="h-16 w-px bg-white/10 mx-2" />

                  {/* Ring variants */}
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold mb-2 mx-auto ring-2 ring-amber-400 ring-offset-2 ring-offset-bf-dark-bg">
                      ?
                    </div>
                    <p className="text-[10px] text-bf-dark-muted">Unmatched</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold mb-2 mx-auto ring-2 ring-green-500 ring-offset-2 ring-offset-bf-dark-bg">
                      ✓
                    </div>
                    <p className="text-[10px] text-bf-dark-muted">Online</p>
                  </div>
                </div>
              </div>

              {/* ── Component States ── */}
              <div>
                <h3 className="text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider">
                  Component States
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Loading */}
                  <div className="rounded-xl border-2 border-white/10 p-5">
                    <p className="text-xs font-black text-bf-dark-text uppercase tracking-wider mb-3">
                      Loading
                    </p>
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded-md bg-white/10 animate-pulse" />
                      <div className="h-4 w-1/2 rounded-md bg-white/10 animate-pulse" />
                      <div className="h-4 w-5/6 rounded-md bg-white/10 animate-pulse" />
                      <div className="h-20 w-full rounded-lg bg-white/10 animate-pulse" />
                    </div>
                    <p className="text-[10px] text-bf-dark-muted mt-3 font-mono">
                      data === undefined &rarr; skeleton
                    </p>
                  </div>

                  {/* Empty */}
                  <div className="rounded-xl border-2 border-white/10 p-5 flex flex-col">
                    <p className="text-xs font-black text-bf-dark-text uppercase tracking-wider mb-4">
                      Empty State
                    </p>
                    <div className="flex-1 flex flex-col items-center justify-center py-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <span className="text-2xl text-bf-dark-muted">📭</span>
                      </div>
                      <p className="text-sm font-medium text-bf-dark-text mb-1">
                        No events found
                      </p>
                      <p className="text-xs text-bf-dark-muted max-w-[200px] text-center">
                        Events from your integrations will appear here.
                      </p>
                    </div>
                    <p className="text-[10px] text-bf-dark-muted mt-3 font-mono">
                      data.length === 0 &rarr; empty
                    </p>
                  </div>

                  {/* Error */}
                  <div className="rounded-xl border-2 border-white/10 p-5">
                    <p className="text-xs font-black text-bf-dark-text uppercase tracking-wider mb-3">
                      Error State
                    </p>
                    <div className="rounded-lg border-2 border-red-500/30 bg-red-950/30 p-4">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 text-sm mt-0.5">⚠</span>
                        <div>
                          <p className="text-sm font-bold text-red-300">
                            Connection failed
                          </p>
                          <p className="text-xs text-red-400/70 mt-1">
                            Unable to reach the backend. Check your connection.
                          </p>
                          <button className="mt-3 text-xs font-bold text-red-300 border-2 border-red-500/30 rounded-md px-3 py-1.5 hover:bg-red-500/10 transition-colors uppercase tracking-wider">
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-bf-dark-muted mt-3 font-mono">
                      catch(err) &rarr; alert destructive
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
