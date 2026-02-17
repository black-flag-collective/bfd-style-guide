import { useState } from "react";
import { motion } from "framer-motion";
import {
  AWS,
  Cloudflare,
  Supabase,
  Convex,
  Clerk,
  GitHubDark,
} from "developer-icons";

const ease = [0.16, 1, 0.3, 1] as const;

interface VendorDef {
  id: string;
  name: string;
  color: string;
  role: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

const vendors: VendorDef[] = [
  { id: "convex", name: "Convex", color: "#ee342f", role: "Backend", Icon: Convex },
  { id: "cloudflare", name: "Cloudflare", color: "#f6821f", role: "Edge", Icon: Cloudflare },
  { id: "clerk", name: "Clerk", color: "#6c47ff", role: "Auth", Icon: Clerk },
  { id: "github", name: "GitHub", color: "#24292e", role: "Source", Icon: GitHubDark },
  { id: "aws", name: "AWS", color: "#ff9900", role: "Cloud", Icon: AWS },
  { id: "supabase", name: "Supabase", color: "#3ecf8e", role: "DB", Icon: Supabase },
];

/* Cursor has no developer-icons entry — inline SVG */
function CursorLogo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="currentColor"
        d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"
      />
    </svg>
  );
}

/* Linear has no developer-icons entry — inline SVG */
function LinearLogo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="currentColor"
        d="M1.22 61.44a48.5 48.5 0 0 0 37.34 37.34c1.24.28 2.2-.93 1.67-2.07l-36.93-36.93c-1.14-.54-2.35.42-2.08 1.66ZM.06 46.64c-.2 1.2 1.02 2.13 2.08 1.59L46.16 2.21C45.62 1.14 44.7-.08 43.5.12A49.2 49.2 0 0 0 .06 46.64ZM8.3 69.83c-.49 1.14.56 2.32 1.77 1.97L69.83 8.3c-1.14-.49-2.32.56-1.97 1.77-.3 1.44-.74 2.86-1.32 4.24L10.42 70.43a49 49 0 0 1-2.12-.6Zm10 14.82 47.82-47.82c-.05-1.49-.22-2.97-.52-4.42L16.78 81.23a49 49 0 0 0 1.53 3.42Zm6.8 7.97 41.13-41.13c-.4-1.4-.94-2.76-1.6-4.07L20.97 89.08a49 49 0 0 0 4.14 3.54Zm11.48 5.57 28.25-28.25a22.5 22.5 0 0 0-3.87-4.9 22.5 22.5 0 0 0-4.9-3.87L27.81 89.42a49 49 0 0 0 8.77 8.77Zm19.92 1.53c1.38-.58 2.74-1.3 4.06-2.14L87.91 70.23c-.84 1.32-1.56 2.68-2.14 4.06L56.5 99.72Zm17.5-5.47L99.72 68.53c.14-.38.27-.77.4-1.16L73.26 94.23c-.39.13-.77.26-1.16.4l-.6.02Zm12.52-6.44c1.38-.58 2.8-1.02 4.24-1.32L97.72 79.5a49 49 0 0 1-.6-2.12l-10.6 10.47Zm7.2-9.77L99.96 72c-.05-1.4-.22-2.78-.52-4.14l-5.16 5.22Zm5.54-11.57c.02-.2.04-.4.06-.6l.62-.62c-.2.41-.42.82-.68 1.22Z"
      />
    </svg>
  );
}

const allVendors: (VendorDef | { id: string; name: string; color: string; role: string; Icon: React.FC<{ size?: number; className?: string }> })[] = [
  ...vendors,
  { id: "cursor", name: "Cursor", color: "#000000", role: "IDE", Icon: CursorLogo },
  { id: "linear", name: "Linear", color: "#5e6ad2", role: "Issues", Icon: LinearLogo },
];

export function VendorLogosSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<"inactive" | "active">("inactive");

  return (
    <section id="vendor-logos" className="relative z-[56] px-6 pt-6">
      <div className="relative" style={{ height: "calc(100vh + 400px)" }}>
        <div
          className="sticky top-6 bg-bf-bg rounded-xl shadow-card overflow-hidden"
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
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">
                  Vendor&nbsp;Logos
                </h2>
                <p className="text-base text-bf-muted max-w-2xl">
                  Partner and integration logos use <strong>opacity states</strong>,
                  never CSS grayscale. Preserves brand color fidelity while creating
                  clear visual hierarchy.
                </p>
              </motion.div>

              {/* ── Watermark Pattern ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                viewport={{ once: true }}
                className="mb-14"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  Watermark Pattern
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Logo sits in the card corner. Inactive: 40 % opacity. Hover:
                  70 %. Active: full opacity + semantic green tint.
                </p>

                {/* Toggle */}
                <div className="flex gap-2 mb-4">
                  {(["inactive", "active"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveCard(v)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all duration-200 ${
                        activeCard === v
                          ? "bg-bf-text text-white border-bf-text shadow-comic-sm"
                          : "bg-transparent text-bf-muted border-bf-border hover:border-bf-text/40"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inactive card */}
                  <div className="relative bg-white rounded-xl border-2 border-bf-border p-5 overflow-hidden group hover:border-bf-text/30 transition-colors">
                    <p className="text-sm font-medium text-bf-text mb-1">
                      Webhook received
                    </p>
                    <p className="text-xs text-bf-muted mb-8">
                      2 min ago · POST /api/webhook
                    </p>
                    <div
                      className={`absolute bottom-3 right-3 transition-opacity duration-200 ${
                        activeCard === "inactive"
                          ? "opacity-40 group-hover:opacity-70"
                          : "opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      <GitHubDark
                        size={20}
                        className={
                          activeCard === "active"
                            ? "text-green-600"
                            : "text-bf-muted"
                        }
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          activeCard === "active"
                            ? "text-green-700 bg-green-50 border border-green-200"
                            : "text-bf-muted bg-bf-surface border border-bf-border"
                        }`}
                      >
                        {activeCard}
                      </span>
                    </div>
                  </div>

                  {/* Opacity scale */}
                  <div className="bg-bf-paper rounded-xl border-2 border-bf-border p-5">
                    <p className="text-xs font-black text-bf-text uppercase tracking-wider mb-4">
                      Opacity Scale
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[
                        { op: "0.4", label: "Rest", cls: "opacity-40 text-bf-muted" },
                        { op: "0.7", label: "Hover", cls: "opacity-70 text-bf-muted" },
                        {
                          op: "1.0",
                          label: "Active",
                          cls: "opacity-100 text-green-600",
                        },
                      ].map((s) => (
                        <div key={s.op}>
                          <div
                            className={`mx-auto mb-2 w-10 h-10 flex items-center justify-center ${s.cls}`}
                          >
                            <Convex size={28} />
                          </div>
                          <p className="text-xs font-mono text-bf-muted">
                            opacity: {s.op}
                          </p>
                          <p className="text-[10px] text-bf-muted mt-0.5">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── Integration Grid ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="mb-14"
              >
                <h3 className="text-sm font-medium text-bf-text mb-2 uppercase tracking-wider">
                  Integration Grid
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Each tile shows the vendor brand color on hover. Icon size: 32 px
                  in tiles. No grayscale filter — ever.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {allVendors.map((vendor, i) => {
                    const isHovered = hovered === i;
                    return (
                      <motion.button
                        key={vendor.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative bg-white rounded-xl border-2 border-bf-border p-5 text-center transition-all duration-200 hover:border-bf-text/30 hover:shadow-card group"
                      >
                        <div
                          className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-200 border-2"
                          style={{
                            borderColor: isHovered
                              ? `${vendor.color}40`
                              : "var(--bf-border)",
                            backgroundColor: isHovered
                              ? `${vendor.color}0A`
                              : "var(--bf-surface)",
                          }}
                        >
                          <vendor.Icon
                            size={32}
                            className="transition-colors duration-200"
                          />
                        </div>
                        <p className="text-sm font-bold text-bf-text">
                          {vendor.name}
                        </p>
                        <p className="text-[10px] text-bf-muted uppercase tracking-wider mt-0.5">
                          {vendor.role}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── Rules Sticky Note ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  className="bg-bf-note-warning border-4 border-bf-text shadow-comic p-6 max-w-sm rotate-1"
                >
                  <p className="font-black text-base uppercase tracking-tight text-bf-text mb-3">
                    Logo Rules
                  </p>
                  <div className="space-y-1.5 text-sm text-bf-text/80 font-medium">
                    <p>✓ Opacity states (0.4 → 0.7 → 1.0)</p>
                    <p>✓ Inline at 16 px, foreground color only</p>
                    <p>✓ Brand color on hover in grid context</p>
                    <p>✓ Active = full opacity + semantic green</p>
                    <p className="text-bf-destructive font-bold">✗ Never CSS grayscale</p>
                    <p className="text-bf-destructive font-bold">
                      ✗ Never colorize inline logos
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
