import { GitHubLight } from "developer-icons";

type VendorType = "github" | "linear" | "cursor" | "blackflag";

function LinearWatermark({ size = 20 }: { size?: number }) {
  return (
    <img
      src="https://linear.app/favicon.ico"
      alt="Linear"
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}

function CursorWatermark({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

function BlackFlagWatermark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2v20M4 4h12l-3 4 3 4H4" />
    </svg>
  );
}

const vendorIcons: Record<VendorType, React.FC<{ size?: number }>> = {
  github: ({ size }) => <GitHubLight size={size ?? 20} />,
  linear: LinearWatermark,
  cursor: CursorWatermark,
  blackflag: BlackFlagWatermark,
};

interface VendorWatermarkProps {
  vendor: VendorType;
  active?: boolean;
  className?: string;
}

export type { VendorType };

export function VendorWatermark({ vendor, active = false, className = "" }: VendorWatermarkProps) {
  const Icon = vendorIcons[vendor];
  return (
    <div
      className={className}
      style={{ opacity: active ? 0.6 : 0.35, transition: "opacity 200ms ease" }}
    >
      <Icon size={20} />
    </div>
  );
}
