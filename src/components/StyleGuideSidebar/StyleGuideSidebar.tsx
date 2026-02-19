import { useState, useEffect, useSyncExternalStore } from "react";
import {
  IconBell,
  IconBolt,
  IconBuilding,
  IconCompass,
  IconFlag,
  IconForms,
  IconLayoutGrid,
  IconLayersIntersect,
  IconMessageCircle,
  IconPalette,
  IconPlayerPlay,
  IconTable,
  IconTemplate,
  IconPuzzle,
  IconTypography,
  IconX,
} from "@tabler/icons-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true
  );
}

type SidebarIcon = typeof IconFlag;

const sectionItems: Array<{ name: string; icon: SidebarIcon; href: string }> = [
  { name: "Logo", icon: IconFlag, href: "#logo" },
  { name: "Colors", icon: IconPalette, href: "#colors" },
  { name: "Typography", icon: IconTypography, href: "#typography" },
  { name: "Motion", icon: IconPlayerPlay, href: "#motion" },
  { name: "Components", icon: IconLayoutGrid, href: "#components" },
  { name: "Forms", icon: IconForms, href: "#forms" },
  { name: "Surfaces", icon: IconLayersIntersect, href: "#surfaces" },
  { name: "Feedback", icon: IconBell, href: "#feedback" },
  { name: "Navigation", icon: IconCompass, href: "#navigation" },
  { name: "Vendors", icon: IconBuilding, href: "#vendor-logos" },
  { name: "Data", icon: IconTable, href: "#data-patterns" },
  { name: "Voice", icon: IconMessageCircle, href: "#voice" },
  { name: "Events", icon: IconBolt, href: "#event-cards" },
  { name: "Pages", icon: IconTemplate, href: "#page-layouts" },
  { name: "Complex", icon: IconPuzzle, href: "#complex-components" },
];

interface StyleGuideSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function SidebarNavigation({
  onMobileClose,
  expanded,
  activeIndex,
  onItemClick,
}: {
  onMobileClose?: () => void;
  expanded: boolean;
  activeIndex: number;
  onItemClick: (index: number) => void;
}) {
  return (
    <nav className="flex-1 px-2.5 py-3 overflow-y-auto scrollbar-hide"
      style={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {sectionItems.map((item, index) => {
        const active = activeIndex === index;
        const Icon = item.icon;

        return (
          <button
            key={item.name}
            onClick={() => {
              onItemClick(index);
              const el = document.querySelector(item.href);
              if (el) el.scrollIntoView({ behavior: "smooth" });
              onMobileClose?.();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: 8,
              padding: expanded ? "10px 12px" : "10px 0",
              gap: expanded ? 12 : 0,
              justifyContent: expanded ? "flex-start" : "center",
              fontSize: 14,
              fontWeight: 500,
              position: "relative",
              border: active ? "1px solid #c4c4c4" : "1px solid transparent",
              background: active
                ? "linear-gradient(to bottom, #fafafa, #ececec)"
                : "transparent",
              color: active ? "#171717" : "rgba(23,23,23,0.55)",
              boxShadow: active
                ? "inset 0 1px 0 rgba(255,255,255,0.8)"
                : "none",
              transition: "all 200ms ease",
              cursor: "pointer",
            }}
            className="group"
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.background = "rgba(255,255,255,0.45)";
                e.currentTarget.style.color = "rgba(23,23,23,0.85)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(23,23,23,0.55)";
              }
            }}
          >
            {/* Active left accent bar */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 3,
                borderRadius: "0 9999px 9999px 0",
                background: "#171717",
                height: active ? 16 : 0,
                opacity: active ? 1 : 0,
                transition: "all 200ms ease",
              }}
            />
            <Icon size={20} stroke={1.75} style={{ flexShrink: 0 }} />
            {expanded && (
              <span style={{ whiteSpace: "nowrap", fontSize: 14, fontWeight: 500 }}>
                {item.name}
              </span>
            )}
            {/* Tooltip on collapsed state */}
            {!expanded && (
              <span
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  left: "calc(100% + 10px)",
                  top: "50%",
                  zIndex: 20,
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  borderRadius: 6,
                  border: "1px solid #D4D4D8",
                  background: "#FAFAFA",
                  padding: "4px 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#171717",
                  opacity: 0,
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                  transition: "opacity 150ms ease",
                }}
                className="group-hover:!opacity-100"
              >
                {item.name}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function SidebarCharacterMark({ expanded }: { expanded: boolean }) {
  return (
    <div
      style={{
        borderTop: "1px solid #bdbdbd",
        padding: "12px 10px",
        flexShrink: 0,
        minHeight: 40,
      }}
      aria-hidden="true"
    />
  );
}

export function StyleGuideSidebar({
  mobileOpen = false,
  onMobileClose,
}: StyleGuideSidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      let current = 0;
      for (let i = 0; i < sectionItems.length; i++) {
        const el = document.querySelector(sectionItems[i].href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const mainRect = mainEl.getBoundingClientRect();
          if (rect.top - mainRect.top <= 120) {
            current = i;
          }
        }
      }
      setActiveIndex(current);
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  const DURATION = "300ms";
  const CUBIC = "cubic-bezier(0.25,0.1,0.25,1)";

  if (isDesktop) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          borderRight: "1px solid #bdbdbd",
          backgroundImage: "linear-gradient(to bottom, #ececec, #dfdfdf)",
          flexShrink: 0,
          overflow: "visible",
          width: isHovered ? 208 : 64,
          minWidth: isHovered ? 208 : 64,
          transition: `all ${DURATION} ${CUBIC}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo zone — crossfade mark ↔ lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 80,
            padding: "0 10px",
            flexShrink: 0,
            justifyContent: isHovered ? "flex-start" : "center",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center", height: 48 }}>
            {/* Mark — collapsed */}
            <div
              style={{
                transition: `all ${DURATION} ${CUBIC}`,
                opacity: isHovered ? 0 : 1,
                transform: isHovered ? "scale(0.9)" : "scale(1)",
                position: isHovered ? "absolute" : "relative",
                left: 0,
                pointerEvents: isHovered ? "none" : "auto",
              }}
            >
              <img src="/logos/mark-dark.svg" alt="Black Flag Design" style={{ height: 40, width: "auto" }} />
            </div>
            {/* Lockup — expanded */}
            <div
              style={{
                transition: `all ${DURATION} ${CUBIC}`,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(0.95)",
                position: isHovered ? "relative" : "absolute",
                left: 0,
                pointerEvents: isHovered ? "auto" : "none",
              }}
            >
              <img src="/logos/lockup-dark.svg" alt="Black Flag Design" style={{ height: 48, width: "auto" }} />
            </div>
          </div>
        </div>

        <SidebarNavigation
          expanded={isHovered}
          activeIndex={activeIndex}
          onItemClick={setActiveIndex}
        />
        <SidebarCharacterMark expanded={isHovered} />
      </div>
    );
  }

  // Mobile layout
  return (
    <>
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: 256,
          borderRight: "1px solid #bdbdbd",
          background: "#FFFFFF",
          transition: "transform 300ms ease-in-out",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px",
            height: 72,
            flexShrink: 0,
          }}
        >
          <img src="/logos/lockup-dark.svg" alt="Black Flag Design" style={{ height: 48, width: "auto" }} />
          <button
            onClick={onMobileClose}
            style={{
              color: "#71717A",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Close menu"
          >
            <IconX size={20} stroke={1.75} />
          </button>
        </div>

        <SidebarNavigation
          onMobileClose={onMobileClose}
          expanded={true}
          activeIndex={activeIndex}
          onItemClick={setActiveIndex}
        />
        <SidebarCharacterMark expanded={true} />
      </div>
    </>
  );
}
