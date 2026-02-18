import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
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

/* Linear — favicon.ico from linear.app */
function LinearLogo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <img
      src="https://linear.app/favicon.ico"
      alt="Linear"
      width={size}
      height={size}
      className={className}
    />
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
    <section id="vendor-logos" className="relative bg-bf-bg py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
              <SectionHeader
                number="10"
                title="Vendor Logos"
                description="Partner and integration logos use opacity states, never CSS grayscale. Preserves brand color fidelity while creating clear visual hierarchy."
              />

              {/* ── Watermark Pattern ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                viewport={{ once: true }}
                className="mb-14"
              >
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
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
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 rounded-md transition-all duration-200 ${
                        activeCard === v
                          ? "btn-active-border"
                          : "bg-transparent text-bf-muted border-bf-border hover:border-bf-text/40"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inactive card */}
                  <div className="relative bg-bf-paper rounded-xl border-2 border-bf-border p-5 overflow-hidden group hover:border-bf-text/30 transition-colors">
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
                <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">
                  Integration Grid
                </h3>
                <p className="text-sm text-bf-muted mb-6 max-w-xl">
                  Each tile shows the vendor brand color on hover. Icon size: 32 px
                  in tiles. No grayscale filter — ever.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        className="relative bg-bf-paper rounded-xl border-2 border-bf-border px-6 py-7 text-center transition-all duration-200 hover:border-bf-text/30 hover:shadow-card group"
                      >
                        <div
                          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-200 border-2"
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
                        <p className="text-[10px] text-bf-muted uppercase tracking-wider mt-1">
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
    </section>
  );
}
