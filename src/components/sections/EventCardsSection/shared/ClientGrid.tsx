import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export interface ClientData {
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  isInternal?: boolean;
}

export const CLIENTS: ClientData[] = [
  {
    name: "Black Flag",
    slug: "black-flag",
    logoUrl: "https://www.google.com/s2/favicons?domain=blackflag.design&sz=128",
    description: "Black Flag Design — Internal projects and tools",
    websiteUrl: "https://blackflag.design",
  },
  {
    name: "Healthspan Wealth",
    slug: "healthspan-wealth",
    logoUrl: "https://pub-bd68ea5aacfa40a9a22a86afbc9beffb.r2.dev/logos/logo.svg",
    description: "Financial wellness platform for health-conscious investors",
    websiteUrl: "https://staging.healthspanwealth.com",
  },
  {
    name: "NCEE",
    slug: "ncee",
    logoUrl: "https://www.google.com/s2/favicons?domain=ncee.org&sz=128",
    description: "National Center on Education and the Economy",
    websiteUrl: "https://ncee.org",
  },
  {
    name: "Totumai",
    slug: "totumai",
    logoUrl: "https://www.google.com/s2/favicons?domain=totumai.net&sz=128",
    description: "Financial services platform for modern entrepreneurs",
    websiteUrl: "https://totumai.net",
  },
  {
    name: "National Library of Medicine",
    slug: "national-library-of-medicine",
    logoUrl: "https://www.ncbi.nlm.nih.gov/core/assets/style-guide/img/NLM-square-logo.png",
    description: "World's largest biomedical library",
    websiteUrl: "https://nlm.nih.gov",
  },
  {
    name: "Advisorpedia",
    slug: "advisorpedia",
    logoUrl: "https://www.google.com/s2/favicons?domain=advisorpedia.com&sz=128",
    description: "Content platform for financial advisors",
    websiteUrl: "https://advisorpedia.com",
  },
  {
    name: "Nxxting",
    slug: "nxxting",
    logoUrl: "https://www.google.com/s2/favicons?domain=nxxting.com&sz=128",
    description: "Design and innovation consultancy partnering on AI development",
    websiteUrl: "https://nxxting.com",
  },
  {
    name: "Voltage Control",
    slug: "voltage-control",
    logoUrl: "https://www.google.com/s2/favicons?domain=voltagecontrol.com&sz=128",
    description: "Experimental applications for facilitators",
    websiteUrl: "https://voltagecontrol.com",
  },
  {
    name: "Love 4 Dogs",
    slug: "love-4-dogs",
    logoUrl: "https://www.google.com/s2/favicons?domain=love4dogs.app&sz=128",
    description: "Dog walking and pet care startup application",
    websiteUrl: "https://love4dogs.app",
  },
];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function getInitialsColor(name: string): string {
  const colors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-orange-500 to-orange-600",
    "from-pink-500 to-pink-600",
    "from-teal-500 to-teal-600",
    "from-indigo-500 to-indigo-600",
    "from-rose-500 to-rose-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function ClientCard({ client, index }: { client: ClientData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="rounded-xl border-2 p-4 transition-colors"
      style={{
        backgroundColor: "var(--bf-paper)",
        borderColor: "var(--bf-border)",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Logo — 40×40 matching admin app Clients.tsx */}
        <div className="shrink-0">
          {client.logoUrl ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden bg-white">
              <img
                src={client.logoUrl}
                alt={`${client.name} logo`}
                className="h-10 w-10 object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${getInitialsColor(client.name)}`}>
              <span className="text-white text-sm font-bold">{getInitials(client.name)}</span>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--bf-text)" }}>
            {client.name}
          </p>
          <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "var(--bf-muted)" }}>
            {client.description}
          </p>
          {client.websiteUrl && (
            <p className="text-[10px] font-mono mt-1 truncate" style={{ color: "var(--bf-cobalt)" }}>
              {client.websiteUrl.replace(/^https?:\/\//, "")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ClientGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CLIENTS.map((client, i) => (
          <ClientCard key={client.slug} client={client} index={i} />
        ))}
      </div>
      <div className="bg-bf-paper border border-bf-border rounded-lg p-4 mt-4">
        <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Client Grid Spec</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-muted)" }}>
          <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>40×40px</span> logo size</div>
          <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>rounded-lg</span> logo radius</div>
          <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>bg-white</span> logo bg</div>
          <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>initials fallback</span> if no logo</div>
        </div>
        <p className="text-[10px] mt-3" style={{ color: "var(--bf-muted)" }}>
          Logo source: <span className="font-mono">clients.logoUrl</span> → Google Favicon API fallback →
          deterministic color + 2-letter initials. On event cards: <span className="font-mono">14×14px opacity-50</span> in header between actor name and project name.
        </p>
      </div>
    </div>
  );
}
