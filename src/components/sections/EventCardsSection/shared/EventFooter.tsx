import type { ReactNode } from "react";
import { VendorWatermark, type VendorType } from "./VendorWatermark";

interface EventFooterProps {
  tags: ReactNode;
  timestamp: string;
  vendor: VendorType;
  active?: boolean;
}

export function EventFooter({ tags, timestamp, vendor, active }: EventFooterProps) {
  return (
    <div className="flex items-center gap-2 px-4 pb-3 pt-1">
      <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden">
        {tags}
      </div>
      <span className="shrink-0 text-[11px] font-mono" style={{ color: "var(--bf-muted)" }}>
        {timestamp}
      </span>
      <VendorWatermark vendor={vendor} active={active} />
    </div>
  );
}
