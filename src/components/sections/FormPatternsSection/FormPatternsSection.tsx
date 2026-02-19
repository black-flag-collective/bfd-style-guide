import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, EyeOff, AlertCircle, Check, ChevronDown, Info } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";

const inputStates = [
  { label: "Default", state: "default" },
  { label: "Focus", state: "focus" },
  { label: "Filled", state: "filled" },
  { label: "Error", state: "error" },
  { label: "Disabled", state: "disabled" },
] as const;

type InputState = (typeof inputStates)[number]["state"];

const stateStyles: Record<InputState, { container: string; label: string; hint: string; icon?: React.ReactNode }> = {
  default: {
    container: "border-bf-border bg-white",
    label: "text-bf-text",
    hint: "",
  },
  focus: {
    container: "border-bf-text bg-white ring-2 ring-bf-text/10",
    label: "text-bf-text",
    hint: "",
  },
  filled: {
    container: "border-bf-border bg-white",
    label: "text-bf-text",
    hint: "",
    icon: <Check size={14} strokeWidth={2} className="text-bf-mint" />,
  },
  error: {
    container: "border-bf-crimson bg-bf-crimson/5",
    label: "text-bf-crimson",
    hint: "text-bf-crimson",
    icon: <AlertCircle size={14} strokeWidth={2} className="text-bf-crimson" />,
  },
  disabled: {
    container: "border-bf-border/60 bg-bf-bg/80 opacity-60 cursor-not-allowed",
    label: "text-bf-muted",
    hint: "",
  },
};

const selectOptions = ["Select a client...", "Acme Corp", "Vanta Security", "Linear Inc", "Vercel"];

export function FormPatternsSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    notifications: true,
    marketing: false,
    analytics: true,
  });
  const [selectedRadio, setSelectedRadio] = useState("email");

  return (
    <section id="forms" className="relative bg-white border-t-4 border-bf-teal py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader number="06" title="Form Patterns" description="Inputs, controls, and validation states. Every form element shares the same visual grammar: rounded-md corners, bf-border at rest, bf-text ring on focus." />

              {/* ── INPUT STATES ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Text Input States</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                  {inputStates.map((s) => {
                    const style = stateStyles[s.state];
                    return (
                      <div key={s.state}>
                        <label
                          className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${style.label}`}
                        >
                          {s.label}
                        </label>
                        <div className={`relative flex items-center h-10 rounded-md border px-3 transition-all ${style.container}`}>
                          <span
                            className={`text-sm flex-1 ${
                              s.state === "filled" ? "text-bf-text" : "text-bf-muted/60"
                            } ${s.state === "disabled" ? "cursor-not-allowed" : ""}`}
                          >
                            {s.state === "filled" ? "Acme Corporation" : s.state === "error" ? "inv@lid" : "Enter client name…"}
                          </span>
                          {style.icon && (
                            <span className="ml-2 flex-shrink-0">{style.icon}</span>
                          )}
                        </div>
                        {s.state === "error" && (
                          <p className="text-xs text-bf-crimson mt-1.5 flex items-center gap-1">
                            <AlertCircle size={10} strokeWidth={2.5} />
                            Invalid email format
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Spec card */}
                <div className="mt-5 bg-bf-surface/60 border border-bf-border rounded-lg p-5">
                  <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-2">Input Spec</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-bf-muted">
                    <div><span className="font-mono text-bf-text">h-10</span> height (40px)</div>
                    <div><span className="font-mono text-bf-text">px-3</span> inner padding</div>
                    <div><span className="font-mono text-bf-text">rounded-md</span> border radius</div>
                    <div><span className="font-mono text-bf-text">text-sm</span> font size (14px)</div>
                  </div>
                </div>
              </div>

              {/* ── SEARCH INPUT ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Search Input</h3>
                <div className="max-w-md">
                  <div className="relative flex items-center h-10 rounded-md border border-bf-border bg-white px-3 gap-2 focus-within:border-bf-text focus-within:ring-2 focus-within:ring-bf-text/10 transition-all">
                    <Search size={14} strokeWidth={2} className="text-bf-muted flex-shrink-0" />
                    <span className="text-sm text-bf-muted/60 flex-1">Search clients, events, files…</span>
                    <span className="hidden sm:flex items-center gap-0.5 text-[10px] text-bf-muted border border-bf-border rounded px-1.5 py-0.5 font-mono">⌘K</span>
                  </div>
                </div>
              </div>

              {/* ── PASSWORD INPUT ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Password Input</h3>
                <div className="max-w-md">
                  <label className="block text-xs font-medium text-bf-text mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative flex items-center h-10 rounded-md border border-bf-border bg-white px-3 transition-all">
                    <span className="text-sm text-bf-text flex-1 tracking-widest">
                      {showPassword ? "hunter42" : "••••••••"}
                    </span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-bf-muted hover:text-bf-text transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} strokeWidth={1.75} /> : <Eye size={14} strokeWidth={1.75} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── TEXTAREA ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Textarea</h3>
                <div className="max-w-lg">
                  <label className="block text-xs font-medium text-bf-text mb-1.5 uppercase tracking-wider">
                    Description
                  </label>
                  <div className="rounded-md border border-bf-border bg-white p-3 min-h-[120px] transition-all">
                    <p className="text-sm text-bf-muted/60 leading-relaxed">
                      Describe the issue in detail. Include steps to reproduce, expected behavior, and any error messages…
                    </p>
                  </div>
                  <p className="text-xs text-bf-muted mt-1.5 text-right">0 / 500</p>
                </div>
              </div>

              {/* ── SELECT DROPDOWN ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Select</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
                  <div>
                    <label className="block text-xs font-medium text-bf-text mb-1.5 uppercase tracking-wider">
                      Client
                    </label>
                    <div className="relative flex items-center h-10 rounded-md border border-bf-border bg-white px-3">
                      <span className="text-sm text-bf-muted/60 flex-1">{selectOptions[0]}</span>
                      <ChevronDown size={14} strokeWidth={2} className="text-bf-muted ml-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-bf-text mb-1.5 uppercase tracking-wider">
                      Client (Selected)
                    </label>
                    <div className="relative flex items-center h-10 rounded-md border border-bf-border bg-white px-3">
                      <span className="text-sm text-bf-text flex-1">{selectOptions[1]}</span>
                      <ChevronDown size={14} strokeWidth={2} className="text-bf-muted ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CONTROLS ROW: Checkbox, Radio, Switch ── */}
              <div className="mb-14">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Checkboxes */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Checkbox</p>
                    <div className="space-y-3">
                      {(["notifications", "marketing", "analytics"] as const).map((key) => {
                        const checked = checkedItems[key];
                        return (
                          <label
                            key={key}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setCheckedItems((p) => ({ ...p, [key]: !p[key] }))}
                          >
                            <span
                              className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all ${
                                checked
                                  ? "bg-bf-text border-bf-text"
                                  : "border-bf-border bg-white group-hover:border-bf-text/40"
                              }`}
                            >
                              {checked && <Check size={10} strokeWidth={3} className="text-white" />}
                            </span>
                            <span className="text-sm text-bf-text capitalize">{key}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Radio */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Radio</p>
                    <div className="space-y-3">
                      {["email", "sms", "slack"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 cursor-pointer group"
                          onClick={() => setSelectedRadio(opt)}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedRadio === opt
                                ? "border-bf-text"
                                : "border-bf-border bg-white group-hover:border-bf-text/40"
                            }`}
                          >
                            {selectedRadio === opt && (
                              <span className="w-2 h-2 rounded-full bg-bf-text" />
                            )}
                          </span>
                          <span className="text-sm text-bf-text capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Switch */}
                  <div>
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-3">Switch</p>
                    <div className="space-y-4">
                      <label
                        className="flex items-center justify-between gap-4 cursor-pointer"
                        onClick={() => setSwitchOn(!switchOn)}
                      >
                        <div>
                          <p className="text-sm text-bf-text font-medium">Dark mode</p>
                          <p className="text-xs text-bf-muted">Automatically switch themes</p>
                        </div>
                        <span
                          className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors ${
                            switchOn ? "bg-bf-text" : "bg-bf-border"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                              switchOn ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </span>
                      </label>
                      <label className="flex items-center justify-between gap-4 opacity-50 cursor-not-allowed">
                        <div>
                          <p className="text-sm text-bf-text font-medium">Beta features</p>
                          <p className="text-xs text-bf-muted">Requires admin access</p>
                        </div>
                        <span className="relative inline-flex h-6 w-11 rounded-full border-2 border-transparent bg-bf-border">
                          <span className="inline-block h-5 w-5 rounded-full bg-white shadow-sm translate-x-0" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── COMPLETE FORM DEMO ── */}
              <div className="mb-10">
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Form Layout</h3>
                <p className="text-sm text-bf-muted mb-4 max-w-xl">
                  On desktop the form uses side-by-side fields where space allows.
                  On tablet and mobile every field stacks into a single column.
                </p>
                <DeviceFrame desktopHeight={460} tabletHeight={480} mobileHeight={500}>
                  {({ device }) => {
                    const isMobile = device === "mobile";
                    const p = isMobile ? 16 : 24;
                    return (
                      <div style={{ height: "100%", overflowY: "auto", background: "#FAFAFA", padding: p }}>
                        <div style={{ maxWidth: isMobile ? "100%" : 480, background: "#fff", border: "1px solid var(--bf-border)", borderRadius: 8, padding: p, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                          <div style={{ marginBottom: 16 }}>
                            <h4 style={{ fontSize: 15, fontWeight: 600, color: "var(--bf-text)" }}>Create Client</h4>
                            <p style={{ fontSize: 12, color: "var(--bf-muted)", marginTop: 2 }}>Add a new client to your organization.</p>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "var(--bf-text)", marginBottom: 4 }}>Client Name</label>
                              <div style={{ height: 36, borderRadius: 6, border: "1px solid var(--bf-border)", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center" }}>
                                <span style={{ fontSize: 13, color: "var(--bf-text)" }}>Acme Corporation</span>
                              </div>
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "var(--bf-text)", marginBottom: 4 }}>Contact Email</label>
                              <div style={{ height: 36, borderRadius: 6, border: "1px solid var(--bf-border)", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center" }}>
                                <span style={{ fontSize: 13, color: "var(--bf-muted)", opacity: 0.6 }}>name@company.com</span>
                              </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                              <div>
                                <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "var(--bf-text)", marginBottom: 4 }}>Plan</label>
                                <div style={{ height: 36, borderRadius: 6, border: "1px solid var(--bf-border)", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                  <span style={{ fontSize: 13, color: "var(--bf-text)" }}>Enterprise</span>
                                  <ChevronDown size={13} strokeWidth={2} style={{ color: "var(--bf-muted)" }} />
                                </div>
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "var(--bf-text)", marginBottom: 4 }}>Seats</label>
                                <div style={{ height: 36, borderRadius: 6, border: "1px solid var(--bf-border)", background: "#fff", padding: "0 10px", display: "flex", alignItems: "center" }}>
                                  <span style={{ fontSize: 13, color: "var(--bf-text)" }}>25</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "var(--bf-text)", marginBottom: 4 }}>Notes</label>
                              <div style={{ borderRadius: 6, border: "1px solid var(--bf-border)", background: "#fff", padding: 10, minHeight: 60 }}>
                                <p style={{ fontSize: 13, color: "var(--bf-muted)", opacity: 0.6 }}>Optional internal notes…</p>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--bf-border)" }}>
                            <button style={{ height: 36, padding: "0 12px", fontSize: 13, fontWeight: 500, borderRadius: 6, color: "var(--bf-muted)", background: "transparent", border: "none", cursor: "pointer" }}>Cancel</button>
                            <button style={{ height: 36, padding: "0 14px", fontSize: 13, fontWeight: 500, borderRadius: 6, color: "#fff", background: "var(--bf-text)", border: "none", cursor: "pointer" }}>Create Client</button>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </DeviceFrame>

                {/* Form spec */}
                <div className="mt-5 bg-bf-surface/60 border border-bf-border rounded-lg p-5 flex items-start gap-3">
                  <Info size={14} strokeWidth={1.75} className="text-bf-muted mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-bf-muted leading-relaxed">
                    <span className="font-semibold text-bf-text">Form anatomy:</span> Label (xs, medium, uppercase) → Input (h-10, rounded-md, white bg) → Helper text (xs, bf-muted).
                    Footer uses right-aligned actions with Ghost cancel + Primary submit. Separator via <span className="font-mono text-bf-text">border-t border-bf-border</span>.
                  </div>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
