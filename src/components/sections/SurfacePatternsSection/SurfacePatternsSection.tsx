import { motion } from "framer-motion";
import { X, Trash2, AlertTriangle, ChevronRight, Settings, Users, Bell, LogOut, ExternalLink, MoreHorizontal, Copy, Pencil } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export function SurfacePatternsSection() {
  return (
    <section id="surfaces" className="relative bg-bf-dark-bg py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader number="07" title="Surfaces & Overlays" description="Dialogs, drawers, tooltips, and dropdown menus. Layered surfaces that interrupt or augment the primary flow without losing context." dark={true} />

              {/* ── DIALOG / MODAL ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: "var(--bf-dark-text)" }}>
                  Dialog
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Standard dialog */}
                  <div className="relative bg-black/40 rounded-lg p-6 sm:p-10 flex items-center justify-center min-h-[280px]">
                    <div className="w-full max-w-sm rounded-lg border shadow-xl p-6" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-semibold" style={{ color: "var(--bf-text)" }}>Create Project</h4>
                          <p className="text-sm mt-0.5" style={{ color: "var(--bf-muted)" }}>Add a new project to this client.</p>
                        </div>
                        <button className="rounded-sm p-1 transition-colors" style={{ color: "var(--bf-muted)" }}>
                          <X size={14} strokeWidth={2} />
                        </button>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--bf-text)" }}>Project Name</label>
                          <div className="h-10 rounded-md border px-3 flex items-center" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
                            <span className="text-sm" style={{ color: "var(--bf-text)" }}>admin-app-convex</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--bf-text)" }}>Repository</label>
                          <div className="h-10 rounded-md border px-3 flex items-center" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
                            <span className="text-sm" style={{ color: "var(--bf-muted)" }}>https://github.com/…</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button className="h-9 px-3 text-sm font-medium rounded-md transition-colors" style={{ color: "var(--bf-muted)" }}>
                          Cancel
                        </button>
                        <button className="h-9 px-3 text-sm font-medium rounded-md text-white transition-colors" style={{ backgroundColor: "var(--bf-text)" }}>
                          Create
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Destructive confirm dialog */}
                  <div className="relative bg-black/40 rounded-lg p-6 sm:p-10 flex items-center justify-center min-h-[280px]">
                    <div className="w-full max-w-sm rounded-lg border shadow-xl p-6" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(224,72,72,0.1)" }}>
                          <AlertTriangle size={18} strokeWidth={1.75} style={{ color: "var(--bf-crimson)" }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold" style={{ color: "var(--bf-text)" }}>Delete Client</h4>
                          <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--bf-muted)" }}>
                            This action cannot be undone. All projects, events, and data associated with 
                            <span className="font-medium" style={{ color: "var(--bf-text)" }}> Acme Corp</span> will be permanently removed.
                          </p>
                          <div className="flex justify-end gap-2 mt-5">
                            <button className="h-9 px-3 text-sm font-medium rounded-md transition-colors" style={{ color: "var(--bf-muted)" }}>
                              Cancel
                            </button>
                            <button className="h-9 px-3 text-sm font-medium rounded-md text-white transition-colors" style={{ backgroundColor: "var(--bf-crimson)" }}>
                              <span className="flex items-center gap-1.5">
                                <Trash2 size={13} strokeWidth={2} />
                                Delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-bf-dark-surface border border-bf-dark-border rounded-lg p-5">
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-dark-text)" }}>Dialog Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-dark-muted)" }}>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>max-w-lg</span> default width</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>p-6</span> inner padding</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>shadow-xl</span> elevation</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>bg-black/80</span> overlay</div>
                  </div>
                </div>
              </div>

              {/* ── SHEET / DRAWER ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: "var(--bf-dark-text)" }}>
                  Sheet / Drawer
                </h3>
                <div className="relative bg-black/40 rounded-lg overflow-hidden min-h-[320px] flex">
                  {/* Faux page behind */}
                  <div className="flex-1 p-6 opacity-40">
                    <div className="h-4 w-32 rounded bg-white/10 mb-3" />
                    <div className="h-3 w-48 rounded bg-white/5 mb-6" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-12 rounded-md bg-white/5 border border-white/5" />
                      ))}
                    </div>
                  </div>
                  {/* Sheet panel */}
                  <div className="w-full sm:w-[55%] border-l shadow-2xl p-6 flex flex-col" style={{ backgroundColor: "var(--bf-bg)", borderColor: "var(--bf-border)" }}>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h4 className="text-base font-semibold" style={{ color: "var(--bf-text)" }}>Event Detail</h4>
                        <p className="text-xs mt-0.5" style={{ color: "var(--bf-muted)" }}>cursor-session · 2m ago</p>
                      </div>
                      <button className="rounded-sm p-1" style={{ color: "var(--bf-muted)" }}>
                        <X size={14} strokeWidth={2} />
                      </button>
                    </div>
                    {/* Tabs */}
                    <div className="flex gap-1 mb-4 p-1 rounded-md" style={{ backgroundColor: "var(--bf-surface)" }}>
                      {["Overview", "Timeline", "Cost"].map((tab, i) => (
                        <button
                          key={tab}
                          className={`flex-1 text-xs font-medium py-1.5 rounded-sm transition-all ${
                            i === 0 ? "bg-bf-text text-white" : ""
                          }`}
                          style={i !== 0 ? { color: "var(--bf-muted)" } : undefined}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    {/* Content skeleton */}
                    <div className="flex-1 space-y-3">
                      <div className="h-16 rounded-md border" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }} />
                      <div className="h-24 rounded-md border" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }} />
                      <div className="h-12 rounded-md border" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-bf-dark-surface border border-bf-dark-border rounded-lg p-5">
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-dark-text)" }}>Sheet Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-dark-muted)" }}>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>90vw / max-w-2xl</span> width</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>slide-in-from-right</span> entry</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>500ms</span> open, 300ms close</div>
                    <div><span className="font-mono" style={{ color: "var(--bf-dark-text)" }}>bg-black/95</span> overlay</div>
                  </div>
                </div>
              </div>

              {/* ── TOOLTIP / POPOVER / DROPDOWN ROW ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: "var(--bf-dark-text)" }}>
                  Floating Surfaces
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Tooltip */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: "var(--bf-dark-text)" }}>Tooltip</p>
                    <div className="bg-bf-dark-surface border border-bf-dark-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px] relative">
                      <div className="rounded-md px-3 py-1.5 text-xs font-medium shadow-lg mb-2" style={{ backgroundColor: "var(--bf-text)", color: "var(--bf-dark-text)" }}>
                        Copy to clipboard
                      </div>
                      <div className="w-2 h-2 rotate-45 -mt-3 mb-4" style={{ backgroundColor: "var(--bf-text)" }} />
                      <button className="h-9 w-9 rounded-md border flex items-center justify-center" style={{ borderColor: "var(--bf-dark-border)", color: "var(--bf-dark-muted)" }}>
                        <Copy size={14} strokeWidth={1.75} />
                      </button>
                      <p className="text-[10px] mt-3" style={{ color: "var(--bf-dark-muted)" }}>Dark fill, text-xs, rounded-md, max-w-xs</p>
                    </div>
                  </div>

                  {/* Popover */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: "var(--bf-dark-text)" }}>Popover</p>
                    <div className="bg-bf-dark-surface border border-bf-dark-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
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
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: "var(--bf-dark-text)" }}>Dropdown Menu</p>
                    <div className="bg-bf-dark-surface border border-bf-dark-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
                      <div className="relative">
                        <button className="h-8 w-8 rounded-md border flex items-center justify-center" style={{ borderColor: "var(--bf-dark-border)", color: "var(--bf-dark-muted)" }}>
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
                <div className="mt-4 bg-bf-dark-surface border border-bf-dark-border rounded-lg p-5">
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-dark-text)" }}>Floating Surface Hierarchy</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs" style={{ color: "var(--bf-dark-muted)" }}>
                      <thead>
                        <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                          <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--bf-dark-text)" }}>Surface</th>
                          <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--bf-dark-text)" }}>Background</th>
                          <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--bf-dark-text)" }}>Shadow</th>
                          <th className="text-left py-2 font-medium" style={{ color: "var(--bf-dark-text)" }}>Z-Index</th>
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
                            <td className="py-2 pr-4 font-medium" style={{ color: "var(--bf-dark-text)" }}>{row.name}</td>
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
