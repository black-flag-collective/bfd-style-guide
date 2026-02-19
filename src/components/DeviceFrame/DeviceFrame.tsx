import { useState, useEffect, type ReactNode, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export type Device = "desktop" | "tablet" | "mobile";

interface DeviceFrameProps {
  children: (ctx: { device: Device; width: number }) => ReactNode;
  defaultDevice?: Device;
  desktopHeight?: number;
  tabletHeight?: number;
  mobileHeight?: number;
  hint?: string;
  onDeviceChange?: (device: Device) => void;
}

const devices: { id: Device; label: string; Icon: typeof Monitor; width: number }[] = [
  { id: "desktop", label: "Desktop", Icon: Monitor, width: 1280 },
  { id: "tablet", label: "Tablet", Icon: Tablet, width: 768 },
  { id: "mobile", label: "Mobile", Icon: Smartphone, width: 375 },
];

const tabBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 14px",
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 200ms ease",
  border: "1px solid transparent",
  background: "transparent",
  color: "rgba(23,23,23,0.5)",
};

const tabActive: CSSProperties = {
  border: "1px solid #D4D4D8",
  background: "#FFFFFF",
  color: "#171717",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const bezel: CSSProperties = {
  borderRadius: 12,
  border: "3px solid #171717",
  overflow: "hidden",
  background: "#171717",
  padding: 4,
};

const viewport: CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  background: "#F4F4F5",
};

const crossFade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
};

export function DeviceFrame({
  children,
  defaultDevice = "desktop",
  desktopHeight = 520,
  tabletHeight = 520,
  mobileHeight = 520,
  hint,
  onDeviceChange,
}: DeviceFrameProps) {
  const [active, setActive] = useState<Device>(defaultDevice);

  useEffect(() => {
    onDeviceChange?.(active);
  }, [active, onDeviceChange]);

  const heightMap: Record<Device, number> = {
    desktop: desktopHeight,
    tablet: tabletHeight,
    mobile: mobileHeight,
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-4">
        <div
          style={{
            display: "inline-flex",
            gap: 4,
            padding: 4,
            borderRadius: 8,
            background: "#F4F4F5",
            border: "1px solid #D4D4D8",
          }}
        >
          {devices.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              style={{
                ...tabBase,
                ...(active === d.id ? tabActive : {}),
              }}
            >
              <d.Icon size={14} strokeWidth={1.75} />
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hint text */}
      {hint && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-bf-muted mb-2">
          {hint}
        </p>
      )}

      {/* Frame */}
      <AnimatePresence mode="wait">
        <motion.div key={active} {...crossFade}>
          {active === "mobile" ? (
            <MobileBezel height={heightMap.mobile}>
              {children({ device: "mobile", width: 375 })}
            </MobileBezel>
          ) : (
            <div
              style={{
                ...bezel,
                ...(active === "tablet"
                  ? { maxWidth: 768, margin: "0 auto" }
                  : {}),
              }}
            >
              <div
                style={{
                  ...viewport,
                  height: heightMap[active],
                  width: "100%",
                }}
              >
                {children({
                  device: active,
                  width: active === "desktop" ? 1280 : 768,
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MobileBezel({
  children,
  height,
}: {
  children: ReactNode;
  height: number;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 375,
          borderRadius: 32,
          border: "3px solid #171717",
          background: "#171717",
          padding: "12px 6px",
          position: "relative",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 6,
            borderRadius: 3,
            background: "#3f3f46",
            zIndex: 10,
          }}
        />
        <div
          style={{
            ...viewport,
            height,
            width: "100%",
            marginTop: 4,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
