import { useState } from "react";
import { motion } from "framer-motion";

interface VendorDef {
  name: string;
  icon: string;
  color: string;
  role: string;
}

const vendors: VendorDef[] = [
  { name: "Convex", icon: "◆", color: "#ee342f", role: "Backend" },
  { name: "Cloudflare", icon: "☁", color: "#f6821f", role: "Edge" },
  { name: "Clerk", icon: "🔐", color: "#6c47ff", role: "Auth" },
  { name: "GitHub", icon: "⬡", color: "#24292e", role: "Source" },
  { name: "AWS", icon: "▲", color: "#ff9900", role: "Cloud" },
  { name: "Linear", icon: "◇", color: "#5e6ad2", role: "Issues" },
  { name: "Cursor", icon: "▶", color: "#000000", role: "IDE" },
  { name: "Supabase", icon: "⚡", color: "#3ecf8e", role: "DB" },
];

export function VendorLogosSection() {
  const [activeVendor, setActiveVendor] = useState<number | null>(null);

  return (
    <section id="vendor-logos" className="relative py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">Vendor Logos</h2>
          <p className="text-base text-bf-muted max-w-2xl">
            Partner and integration logos use opacity states, never CSS grayscale. This preserves brand color fidelity while creating clear visual hierarchy between active and inactive states.
          </p>
        </motion.div>

        {/* Watermark Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Watermark Pattern</h3>
          <p className="text-sm text-bf-muted mb-6 max-w-xl">
            Used on event cards and list items. Logo sits in the bottom-right corner. Inactive: 40% opacity. Hover: 70%. Active/connected: 70% default, 100% on hover, tinted green.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inactive card */}
            <div className="relative bg-white rounded-xl border-2 border-bf-border p-5 overflow-hidden group hover:border-bf-text/30 transition-colors">
              <p className="text-sm font-medium text-bf-text mb-1">Webhook received</p>
              <p className="text-xs text-bf-muted mb-8">2 minutes ago &middot; POST /api/webhook</p>
              <div className="absolute bottom-3 right-3 transition-opacity duration-200 opacity-40 group-hover:opacity-70">
                <div className="w-6 h-6 rounded flex items-center justify-center text-bf-muted">
                  <span className="text-lg">⬡</span>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-medium text-bf-muted bg-bf-surface px-1.5 py-0.5 rounded">inactive</span>
              </div>
            </div>

            {/* Active card */}
            <div className="relative bg-white rounded-xl border-2 border-bf-border p-5 overflow-hidden group hover:border-bf-text/30 transition-colors">
              <p className="text-sm font-medium text-bf-text mb-1">Sync completed</p>
              <p className="text-xs text-bf-muted mb-8">Just now &middot; 14 items synced</p>
              <div className="absolute bottom-3 right-3 transition-all duration-200 opacity-70 group-hover:opacity-100 text-green-600">
                <span className="text-lg">◆</span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded">active</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-bf-surface rounded-xl border border-bf-border p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-8 h-8 mx-auto mb-2 rounded flex items-center justify-center text-bf-muted opacity-40">
                  <span className="text-xl">◆</span>
                </div>
                <p className="text-xs font-mono text-bf-muted">opacity: 0.4</p>
                <p className="text-[10px] text-bf-muted mt-0.5">Inactive / Rest</p>
              </div>
              <div>
                <div className="w-8 h-8 mx-auto mb-2 rounded flex items-center justify-center text-bf-muted opacity-70">
                  <span className="text-xl">◆</span>
                </div>
                <p className="text-xs font-mono text-bf-muted">opacity: 0.7</p>
                <p className="text-[10px] text-bf-muted mt-0.5">Hover / Focus</p>
              </div>
              <div>
                <div className="w-8 h-8 mx-auto mb-2 rounded flex items-center justify-center text-green-600">
                  <span className="text-xl">◆</span>
                </div>
                <p className="text-xs font-mono text-bf-muted">opacity: 1.0 + green</p>
                <p className="text-[10px] text-bf-muted mt-0.5">Active / Connected</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vendor Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Integration Grid</h3>
          <p className="text-sm text-bf-muted mb-6 max-w-xl">
            Full vendor display for integration pages. Each tile uses the vendor brand color on hover. Icon size: 20px inline, 32px in tiles. No grayscale filter.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {vendors.map((vendor, i) => (
              <motion.button
                key={vendor.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveVendor(i)}
                onMouseLeave={() => setActiveVendor(null)}
                className="relative bg-white rounded-xl border-2 border-bf-border p-5 text-center transition-all duration-200 hover:border-bf-text/30 hover:shadow-lg group"
              >
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 border border-bf-border"
                  style={{
                    color: activeVendor === i ? vendor.color : "var(--bf-color-muted)",
                    backgroundColor: activeVendor === i ? `${vendor.color}10` : "var(--bf-color-surface)",
                    borderColor: activeVendor === i ? `${vendor.color}30` : undefined,
                  }}
                >
                  {vendor.icon}
                </div>
                <p className="text-sm font-semibold text-bf-text">{vendor.name}</p>
                <p className="text-[10px] text-bf-muted uppercase tracking-wider mt-0.5">{vendor.role}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-medium text-bf-text mb-4 uppercase tracking-wider">Inline Logo Usage</h3>
          <p className="text-sm text-bf-muted mb-6 max-w-xl">
            Vendor logos appear inline in tabs, badges, and list items at 16px. Color matches the text foreground. Never colorize inline logos.
          </p>

          <div className="bg-gradient-to-b from-[#f6f6f6] to-[#ececec] rounded-xl border border-bf-border p-1.5 flex gap-1 max-w-lg">
            {[
              { icon: "⬡", label: "GitHub" },
              { icon: "◇", label: "Linear" },
              { icon: "◆", label: "Convex" },
            ].map((tab, i) => (
              <button
                key={tab.label}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  i === 0
                    ? "border border-[#bcbcbc] bg-white text-bf-text shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
                    : "border border-transparent text-bf-muted hover:bg-white/40 hover:text-bf-text"
                }`}
              >
                <span className="text-xs">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-bf-surface rounded-xl border border-bf-border p-5">
            <p className="text-xs font-medium text-bf-text uppercase tracking-wider mb-3">Logo Rules</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-bf-muted">Use opacity states (0.4 → 0.7 → 1.0) for visual hierarchy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-bf-muted">Inline logos at 16px, foreground color only</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-bf-muted">Active state: full opacity + semantic green (#16a34a)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-bf-muted">Brand color on hover in tile/grid context only</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span className="text-bf-muted">Never use CSS grayscale filter on logos</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span className="text-bf-muted">Never colorize inline (tab/badge) logos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
