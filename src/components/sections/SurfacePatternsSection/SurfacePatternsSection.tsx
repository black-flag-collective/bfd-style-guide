import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, AlertTriangle, ChevronRight, Settings, Users, Bell, LogOut, ExternalLink, MoreHorizontal, Copy, Pencil, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 350 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: { duration: 0.12 },
  },
};

function InlineDialogDemo({
  trigger,
  children,
  label,
}: {
  trigger: React.ReactNode;
  children: (opts: { onClose: () => void }) => React.ReactNode;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-lg overflow-hidden min-h-[340px] flex flex-col">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--bf-muted)" }}>{label}</span>
        <button
          onClick={() => setOpen(true)}
          className="text-xs font-medium px-3 py-1.5 rounded-md border transition-colors hover:bg-black/5"
          style={{ borderColor: "var(--bf-border)", color: "var(--bf-text)" }}
        >
          {trigger}
        </button>
      </div>
      <div className="relative flex-1 bg-black/40 rounded-b-lg flex items-center justify-center p-6 sm:p-10">
        {/* Static preview when closed */}
        <AnimatePresence mode="wait">
          {!open && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/50 select-none"
            >
              Click the button above to preview
            </motion.p>
          )}
        </AnimatePresence>

        {/* Animated overlay + dialog */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 bg-black/60 rounded-b-lg"
                onClick={() => setOpen(false)}
              />
              <motion.div
                key="dialog"
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative z-10 w-full max-w-sm"
              >
                {children({ onClose: () => setOpen(false) })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SurfacePatternsSection() {
  const [fakeCreating, setFakeCreating] = useState(false);
  const [fakeDeleting, setFakeDeleting] = useState(false);

  const simulateAction = (setter: (v: boolean) => void, onClose: () => void) => {
    setter(true);
    setTimeout(() => {
      setter(false);
      onClose();
    }, 1200);
  };

  return (
    <section id="surfaces" className="relative bg-bf-bg border-t-4 border-bf-amber py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader number="07" title="Surfaces & Overlays" description="Dialogs, drawers, tooltips, and dropdown menus. Layered surfaces that interrupt or augment the primary flow without losing context." />

              {/* ── DIALOG / MODAL ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: "var(--bf-text)" }}>
                  Dialog
                </h3>
                <p className="text-sm mb-6 leading-relaxed max-w-2xl" style={{ color: "var(--bf-muted)" }}>
                  Mirrors the real Create Project and Delete Client dialogs from <span className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bf-surface)", color: "var(--bf-text)" }}>admin-app-convex/ClientDetail.tsx</span>. Click each trigger to see the open/close animation with spring physics.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Standard dialog — mirrors ClientDetail.tsx "Create New Project" (line 549) */}
                  <InlineDialogDemo trigger="Open Create Project" label="Standard · Create">
                    {({ onClose }) => (
                      <div className="rounded-lg border shadow-xl p-6" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-base font-semibold" style={{ color: "var(--bf-text)" }}>Create New Project</h4>
                            <p className="text-sm mt-0.5" style={{ color: "var(--bf-muted)" }}>Create a new project for Acme Corp. A project helps you organize feedback for a specific application or product.</p>
                          </div>
                          <button onClick={onClose} className="rounded-sm p-1 transition-colors hover:bg-black/5" style={{ color: "var(--bf-muted)" }}>
                            <X size={14} strokeWidth={2} />
                          </button>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--bf-text)" }}>Project Name *</label>
                            <div className="h-10 rounded-md border px-3 flex items-center" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
                              <span className="text-sm" style={{ color: "var(--bf-text)" }}>admin-app-convex</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--bf-text)" }}>Description</label>
                            <div className="h-20 rounded-md border px-3 py-2 flex items-start" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
                              <span className="text-sm" style={{ color: "var(--bf-muted)" }}>Enter project description</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={onClose}
                            className="h-9 px-3 text-sm font-medium rounded-md border transition-colors hover:bg-black/5"
                            style={{ color: "var(--bf-muted)", borderColor: "var(--bf-border)" }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => simulateAction(setFakeCreating, onClose)}
                            disabled={fakeCreating}
                            className="h-9 px-4 text-sm font-medium rounded-md text-white transition-colors disabled:opacity-70"
                            style={{ backgroundColor: "var(--bf-text)" }}
                          >
                            {fakeCreating ? (
                              <span className="flex items-center gap-1.5">
                                <Loader2 size={13} strokeWidth={2} className="animate-spin" />
                                Creating…
                              </span>
                            ) : (
                              "Create Project"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </InlineDialogDemo>

                  {/* Destructive confirm dialog — mirrors ClientDetail.tsx AlertDialog (line 678) */}
                  <InlineDialogDemo trigger="Open Delete Confirm" label="Destructive · AlertDialog">
                    {({ onClose }) => (
                      <div className="rounded-lg border shadow-xl p-6" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(224,72,72,0.1)" }}>
                            <AlertTriangle size={18} strokeWidth={1.75} style={{ color: "var(--bf-crimson)" }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold" style={{ color: "var(--bf-text)" }}>Are you absolutely sure?</h4>
                            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--bf-muted)" }}>
                              This action cannot be undone. This will permanently delete
                              <span className="font-medium" style={{ color: "var(--bf-text)" }}> Acme Corp</span> and all associated projects, feedback, and data.
                            </p>
                            <div className="flex justify-end gap-2 mt-5">
                              <button
                                onClick={onClose}
                                className="h-9 px-3 text-sm font-medium rounded-md border transition-colors hover:bg-black/5"
                                style={{ color: "var(--bf-muted)", borderColor: "var(--bf-border)" }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => simulateAction(setFakeDeleting, onClose)}
                                disabled={fakeDeleting}
                                className="h-9 px-4 text-sm font-medium rounded-md text-white transition-colors disabled:opacity-70"
                                style={{ backgroundColor: "var(--bf-crimson)" }}
                              >
                                {fakeDeleting ? (
                                  <span className="flex items-center gap-1.5">
                                    <Loader2 size={13} strokeWidth={2} className="animate-spin" />
                                    Deleting…
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1.5">
                                    <Trash2 size={13} strokeWidth={2} />
                                    Delete Client
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </InlineDialogDemo>
                </div>

                <div className="mt-4 bg-bf-paper border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Dialog Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-muted)" }}>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>max-w-lg</span> default width</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>p-6</span> inner padding</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>shadow-xl</span> elevation</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>bg-black/80</span> overlay</div>
                  </div>
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--bf-border)" }}>
                    <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Animation</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-muted)" }}>
                      <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>spring</span> type (damping 25, stiffness 350)</div>
                      <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>scale 0.95→1</span> entry</div>
                      <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>120ms</span> exit duration</div>
                      <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>fade+scale</span> overlay + content</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--bf-border)" }}>
                    <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Source</p>
                    <p className="text-xs font-mono" style={{ color: "var(--bf-muted)" }}>
                      admin-app-convex → app/src/apps/admin/pages/ClientDetail.tsx (lines 549–704)
                    </p>
                  </div>
                </div>
              </div>

              {/* ── SHEET / DRAWER ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: "var(--bf-text)" }}>
                  Sheet / Drawer
                </h3>
                <p className="text-sm mb-4 max-w-xl" style={{ color: "var(--bf-muted)" }}>
                  On desktop and tablet the drawer slides in from the right as a
                  side panel. On mobile it becomes a full-screen sheet.
                </p>
                <DeviceFrame desktopHeight={380} tabletHeight={380} mobileHeight={420}>
                  {({ device }) => {
                    const isMobile = device === "mobile";
                    return (
                      <div style={{ display: "flex", height: "100%", position: "relative", background: "rgba(0,0,0,0.35)" }}>
                        {!isMobile && (
                          <div style={{ flex: 1, padding: 16, opacity: 0.4 }}>
                            <div style={{ height: 12, width: 100, borderRadius: 4, background: "rgba(255,255,255,0.12)", marginBottom: 10 }} />
                            <div style={{ height: 8, width: 160, borderRadius: 4, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
                            {[1, 2, 3].map(n => (
                              <div key={n} style={{ height: 36, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 6 }} />
                            ))}
                          </div>
                        )}
                        <div style={{ width: isMobile ? "100%" : device === "tablet" ? "55%" : "45%", borderLeft: isMobile ? "none" : "1px solid var(--bf-border)", background: "var(--bf-bg)", display: "flex", flexDirection: "column", padding: isMobile ? 16 : 20 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <div>
                              <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--bf-text)" }}>Event Detail</h4>
                              <p style={{ fontSize: 11, color: "var(--bf-muted)", marginTop: 2 }}>cursor-session · 2m ago</p>
                            </div>
                            <button style={{ color: "var(--bf-muted)", background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                              <X size={14} strokeWidth={2} />
                            </button>
                          </div>
                          <div style={{ display: "flex", gap: 4, marginBottom: 12, padding: 4, borderRadius: 6, background: "var(--bf-surface)" }}>
                            {["Overview", "Timeline", "Cost"].map((tab, i) => (
                              <button key={tab} style={{ flex: 1, fontSize: 11, fontWeight: 500, padding: "5px 0", borderRadius: 4, border: "none", cursor: "pointer", background: i === 0 ? "var(--bf-text)" : "transparent", color: i === 0 ? "#fff" : "var(--bf-muted)" }}>{tab}</button>
                            ))}
                          </div>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ height: 48, borderRadius: 6, border: "1px solid var(--bf-border)", background: "var(--bf-paper)" }} />
                            <div style={{ height: 72, borderRadius: 6, border: "1px solid var(--bf-border)", background: "var(--bf-paper)" }} />
                            <div style={{ height: 36, borderRadius: 6, border: "1px solid var(--bf-border)", background: "var(--bf-paper)" }} />
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </DeviceFrame>

                <div className="mt-4 bg-bf-paper border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Sheet Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-muted)" }}>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>90vw / max-w-2xl</span> width</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>slide-in-from-right</span> entry</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>500ms</span> open, 300ms close</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>bg-black/95</span> overlay</div>
                  </div>
                </div>
              </div>

              {/* ── TOOLTIP / POPOVER / DROPDOWN ROW ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: "var(--bf-text)" }}>
                  Floating Surfaces
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Tooltip */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: "var(--bf-text)" }}>Tooltip</p>
                    <div className="bg-bf-paper border border-bf-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px] relative">
                      <div className="rounded-md px-3 py-1.5 text-xs font-medium shadow-lg mb-2" style={{ backgroundColor: "var(--bf-text)", color: "var(--bf-text)" }}>
                        Copy to clipboard
                      </div>
                      <div className="w-2 h-2 rotate-45 -mt-3 mb-4" style={{ backgroundColor: "var(--bf-text)" }} />
                      <button className="h-9 w-9 rounded-md border flex items-center justify-center" style={{ borderColor: "var(--bf-border)", color: "var(--bf-muted)" }}>
                        <Copy size={14} strokeWidth={1.75} />
                      </button>
                      <p className="text-[10px] mt-3" style={{ color: "var(--bf-muted)" }}>Dark fill, text-xs, rounded-md, max-w-xs</p>
                    </div>
                  </div>

                  {/* Popover */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: "var(--bf-text)" }}>Popover</p>
                    <div className="bg-bf-paper border border-bf-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
                      <div className="w-56 rounded-lg border shadow-lg p-4" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--bf-text)" }}>User Info</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: "var(--bf-text)" }}>
                            KP
                          </div>
                          <div>
                            <p className="text-xs font-medium" style={{ color: "var(--bf-text)" }}>Kevin Patterson</p>
                            <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>kevin@blackflag.dev</p>
                          </div>
                        </div>
                        <div className="border-t pt-2 mt-1" style={{ borderColor: "var(--bf-border)" }}>
                          <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>Role: Admin · Last active: 2m ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: "var(--bf-text)" }}>Dropdown Menu</p>
                    <div className="bg-bf-paper border border-bf-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
                      <div className="relative">
                        <button className="h-8 w-8 rounded-md border flex items-center justify-center" style={{ borderColor: "var(--bf-border)", color: "var(--bf-muted)" }}>
                          <MoreHorizontal size={14} strokeWidth={1.75} />
                        </button>
                        <div className="absolute top-full right-0 mt-1 w-44 rounded-md border shadow-lg py-1 z-10" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                          {[
                            { icon: Pencil, label: "Edit", shortcut: "⌘E" },
                            { icon: Copy, label: "Duplicate", shortcut: "⌘D" },
                            { icon: ExternalLink, label: "Open in new tab" },
                          ].map((item) => (
                            <button
                              key={item.label}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-bf-surface"
                              style={{ color: "var(--bf-text)" }}
                            >
                              <item.icon size={13} strokeWidth={1.75} style={{ color: "var(--bf-muted)" }} />
                              <span className="flex-1 text-left">{item.label}</span>
                              {item.shortcut && (
                                <span className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>{item.shortcut}</span>
                              )}
                            </button>
                          ))}
                          <div className="my-1 border-t" style={{ borderColor: "var(--bf-border)" }} />
                          <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-bf-crimson/10" style={{ color: "var(--bf-crimson)" }}>
                            <Trash2 size={13} strokeWidth={1.75} />
                            <span className="flex-1 text-left">Delete</span>
                            <span className="text-[10px] font-mono">⌘⌫</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating surfaces spec */}
                <div className="mt-4 bg-bf-paper border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Floating Surface Hierarchy</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs" style={{ color: "var(--bf-muted)" }}>
                      <thead>
                        <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                          <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--bf-text)" }}>Surface</th>
                          <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--bf-text)" }}>Background</th>
                          <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--bf-text)" }}>Shadow</th>
                          <th className="text-left py-2 font-medium" style={{ color: "var(--bf-text)" }}>Z-Index</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Tooltip", bg: "bf-text (dark fill)", shadow: "shadow-lg", z: "z-50" },
                          { name: "Popover", bg: "bf-bg (light card)", shadow: "shadow-lg", z: "z-50" },
                          { name: "Dropdown", bg: "bf-bg (light card)", shadow: "shadow-lg", z: "z-50" },
                          { name: "Dialog", bg: "bf-bg (light card)", shadow: "shadow-xl", z: "z-50" },
                          { name: "Sheet", bg: "white", shadow: "shadow-2xl", z: "z-50" },
                        ].map((row) => (
                          <tr key={row.name} className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <td className="py-2 pr-4 font-medium" style={{ color: "var(--bf-text)" }}>{row.name}</td>
                            <td className="py-2 pr-4 font-mono">{row.bg}</td>
                            <td className="py-2 pr-4 font-mono">{row.shadow}</td>
                            <td className="py-2 font-mono">{row.z}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
