import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X, Inbox, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const alertVariants = [
  {
    type: "info",
    icon: Info,
    title: "New deployment available",
    desc: "Version 2.4.1 is ready. Review changes before deploying.",
    bg: "rgba(59,108,231,0.08)",
    border: "rgba(59,108,231,0.25)",
    iconColor: "var(--bf-cobalt)",
    textColor: "var(--bf-text)",
    descColor: "var(--bf-muted)",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Client created successfully",
    desc: "Acme Corporation has been added to your organization.",
    bg: "rgba(90,224,154,0.08)",
    border: "rgba(90,224,154,0.25)",
    iconColor: "var(--bf-mint)",
    textColor: "var(--bf-text)",
    descColor: "var(--bf-muted)",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "API rate limit approaching",
    desc: "You've used 85% of your hourly quota. Consider optimizing requests.",
    bg: "rgba(232,144,32,0.08)",
    border: "rgba(232,144,32,0.25)",
    iconColor: "var(--bf-amber)",
    textColor: "var(--bf-text)",
    descColor: "var(--bf-muted)",
  },
  {
    type: "error",
    icon: AlertCircle,
    title: "Webhook delivery failed",
    desc: "3 events failed to deliver to endpoint. Retrying in 30s.",
    bg: "rgba(224,72,72,0.08)",
    border: "rgba(224,72,72,0.25)",
    iconColor: "var(--bf-crimson)",
    textColor: "var(--bf-text)",
    descColor: "var(--bf-muted)",
  },
];

const toastVariants = [
  { label: "Success", icon: CheckCircle, text: "Changes saved", color: "var(--bf-mint)" },
  { label: "Error", icon: AlertCircle, text: "Failed to save", color: "var(--bf-crimson)" },
  { label: "Info", icon: Info, text: "3 new events", color: "var(--bf-cobalt)" },
];

export function FeedbackSection() {
  return (
    <section id="feedback" className="relative bg-white border-t-4 border-bf-crimson py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader number="08" title="Feedback & States" description="Alerts, toasts, loading skeletons, and empty states. How the system communicates status, progress, and absence to the user." />

              {/* ── ALERT BANNERS ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Alert Banners</h3>
                <div className="space-y-3">
                  {alertVariants.map((alert) => (
                    <div
                      key={alert.type}
                      className="rounded-lg border p-4 flex items-start gap-3"
                      style={{ backgroundColor: alert.bg, borderColor: alert.border }}
                    >
                      <alert.icon size={16} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" style={{ color: alert.iconColor }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: alert.textColor }}>{alert.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: alert.descColor }}>{alert.desc}</p>
                      </div>
                      <button className="flex-shrink-0 p-0.5 rounded-sm transition-colors" style={{ color: alert.descColor }}>
                        <X size={12} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-bf-surface/60 border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">Alert Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-bf-muted">
                    <div><span className="font-mono text-bf-text">p-4</span> inner padding</div>
                    <div><span className="font-mono text-bf-text">rounded-lg</span> border radius</div>
                    <div><span className="font-mono text-bf-text">crew/8%</span> bg tint</div>
                    <div><span className="font-mono text-bf-text">crew/25%</span> border tint</div>
                  </div>
                </div>
              </div>

              {/* ── TOAST NOTIFICATIONS ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Toast Notifications</h3>
                <div className="flex flex-wrap gap-4 items-start">
                  {toastVariants.map((toast) => (
                    <div
                      key={toast.label}
                      className="inline-flex items-center gap-2.5 rounded-lg border border-bf-border bg-white shadow-md px-4 py-3"
                    >
                      <toast.icon size={16} strokeWidth={1.75} style={{ color: toast.color }} />
                      <span className="text-sm font-medium text-bf-text">{toast.text}</span>
                      <button className="ml-2 text-bf-muted hover:text-bf-text transition-colors">
                        <X size={12} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Toast with action */}
                <div className="mt-4">
                  <div className="inline-flex items-center gap-3 rounded-lg border border-bf-border bg-white shadow-md px-4 py-3">
                    <WifiOff size={16} strokeWidth={1.75} className="text-bf-amber" />
                    <div>
                      <p className="text-sm font-medium text-bf-text">Connection lost</p>
                      <p className="text-xs text-bf-muted">Attempting to reconnect…</p>
                    </div>
                    <button className="ml-3 h-7 px-2.5 text-xs font-medium rounded-md bg-bf-text text-white hover:bg-bf-text/90 transition-colors flex items-center gap-1">
                      <RefreshCw size={10} strokeWidth={2} />
                      Retry
                    </button>
                  </div>
                </div>

                <div className="mt-5 bg-bf-surface/60 border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">Toast Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-bf-muted">
                    <div><span className="font-mono text-bf-text">shadow-md</span> elevation</div>
                    <div><span className="font-mono text-bf-text">rounded-lg</span> radius</div>
                    <div><span className="font-mono text-bf-text">bottom-right</span> position</div>
                    <div><span className="font-mono text-bf-text">5s</span> auto-dismiss</div>
                  </div>
                </div>
              </div>

              {/* ── SKELETON LOADING ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Skeleton Loading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card skeleton */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Card Skeleton</p>
                    <div className="border border-bf-border rounded-lg p-5 bg-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-bf-surface animate-pulse" />
                        <div className="flex-1">
                          <div className="h-3.5 w-32 rounded bg-bf-surface animate-pulse mb-2" />
                          <div className="h-2.5 w-20 rounded bg-bf-surface/60 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <div className="h-3 w-full rounded bg-bf-surface animate-pulse" />
                        <div className="h-3 w-4/5 rounded bg-bf-surface animate-pulse" />
                        <div className="h-3 w-3/5 rounded bg-bf-surface/60 animate-pulse" />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 w-16 rounded-full bg-bf-surface animate-pulse" />
                        <div className="h-6 w-20 rounded-full bg-bf-surface/60 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Table skeleton */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Table Skeleton</p>
                    <div className="border border-bf-border rounded-lg overflow-hidden bg-white">
                      <div className="border-b border-bf-border px-4 py-3 flex gap-6">
                        {[48, 80, 64, 40].map((w, i) => (
                          <div key={i} className="h-2.5 rounded bg-bf-surface animate-pulse" style={{ width: w }} />
                        ))}
                      </div>
                      {[1, 2, 3, 4].map((row) => (
                        <div key={row} className="border-b border-bf-border/50 px-4 py-3.5 flex gap-6 items-center">
                          <div className="h-3 w-12 rounded bg-bf-surface/70 animate-pulse" />
                          <div className="h-3 w-24 rounded bg-bf-surface animate-pulse" />
                          <div className="h-3 w-16 rounded bg-bf-surface/60 animate-pulse" />
                          <div className="h-5 w-14 rounded-full bg-bf-surface/50 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-bf-surface/60 border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">Skeleton Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-bf-muted">
                    <div><span className="font-mono text-bf-text">animate-pulse</span> animation</div>
                    <div><span className="font-mono text-bf-text">bg-bf-surface</span> fill color</div>
                    <div><span className="font-mono text-bf-text">rounded-md</span> shape</div>
                    <div><span className="font-mono text-bf-text">Match layout</span> sizing rule</div>
                  </div>
                </div>
              </div>

              {/* ── PROGRESS & SPINNERS ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Progress Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Progress bars */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Progress Bar</p>
                    <div className="space-y-4">
                      {[
                        { label: "Upload", value: 72, color: "var(--bf-cobalt)" },
                        { label: "Processing", value: 45, color: "var(--bf-amber)" },
                        { label: "Complete", value: 100, color: "var(--bf-mint)" },
                      ].map((bar) => (
                        <div key={bar.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-bf-text">{bar.label}</span>
                            <span className="text-xs font-mono text-bf-muted">{bar.value}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-bf-surface overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spinners */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Spinner</p>
                    <div className="flex items-center gap-8">
                      {[
                        { size: 24, label: "sm" },
                        { size: 32, label: "md" },
                        { size: 48, label: "lg" },
                      ].map((s) => (
                        <div key={s.label} className="flex flex-col items-center gap-2">
                          <div
                            className="rounded-full border-2 border-bf-surface animate-spin"
                            style={{
                              width: s.size,
                              height: s.size,
                              borderTopColor: "var(--bf-text)",
                            }}
                          />
                          <span className="text-[10px] font-mono text-bf-muted">{s.label}</span>
                        </div>
                      ))}

                      <div className="flex flex-col items-center gap-2 ml-4">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-bf-surface/60">
                          <div
                            className="w-4 h-4 rounded-full border-2 border-bf-surface animate-spin"
                            style={{ borderTopColor: "var(--bf-text)" }}
                          />
                          <span className="text-xs text-bf-muted">Loading…</span>
                        </div>
                        <span className="text-[10px] font-mono text-bf-muted">inline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── EMPTY / ERROR STATES ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Empty & Error States</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Empty state */}
                  <div className="border border-bf-border rounded-lg bg-white p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
                    <Inbox size={28} strokeWidth={1.25} className="text-bf-muted/50 mb-3" />
                    <p className="text-sm font-medium text-bf-text mb-1">No events yet</p>
                    <p className="text-xs text-bf-muted leading-relaxed max-w-[200px]">
                      Events will appear here once your integrations start sending data.
                    </p>
                  </div>

                  {/* Connection error */}
                  <div className="border border-bf-border rounded-lg bg-white p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
                    <WifiOff size={28} strokeWidth={1.25} className="text-bf-amber/70 mb-3" />
                    <p className="text-sm font-medium text-bf-text mb-1">Connection lost</p>
                    <p className="text-xs text-bf-muted leading-relaxed max-w-[200px] mb-3">
                      Unable to reach the server. Check your network and try again.
                    </p>
                    <button className="h-8 px-3 text-xs font-medium rounded-md border border-bf-border text-bf-text hover:bg-bf-surface transition-colors flex items-center gap-1.5">
                      <RefreshCw size={11} strokeWidth={2} />
                      Retry
                    </button>
                  </div>

                  {/* Fatal error */}
                  <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[180px]" style={{ borderColor: "rgba(224,72,72,0.25)", backgroundColor: "rgba(224,72,72,0.03)" }}>
                    <AlertCircle size={28} strokeWidth={1.25} className="mb-3" style={{ color: "var(--bf-crimson)" }} />
                    <p className="text-sm font-medium text-bf-text mb-1">Something went wrong</p>
                    <p className="text-xs text-bf-muted leading-relaxed max-w-[200px] mb-3">
                      An unexpected error occurred. Our team has been notified.
                    </p>
                    <button className="h-8 px-3 text-xs font-medium rounded-md text-white transition-colors flex items-center gap-1.5" style={{ backgroundColor: "var(--bf-crimson)" }}>
                      Report Issue
                    </button>
                  </div>
                </div>

                <div className="mt-5 bg-bf-surface/60 border border-bf-border rounded-lg p-5 flex items-start gap-3">
                  <Info size={14} strokeWidth={1.75} className="text-bf-muted mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-bf-muted leading-relaxed">
                    <span className="font-semibold text-bf-text">Empty state anatomy:</span> Icon (muted, 28px, strokeWidth 1.25) → Title (sm, medium) → Description (xs, muted, max-w-[200px]) → Optional action button.
                    Center vertically and horizontally within the container. Minimum height <span className="font-mono text-bf-text">180px</span>.
                  </div>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
