interface BrandLogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 48, height: 24 },
  md: { width: 64, height: 32 },
  lg: { width: 96, height: 48 },
};

export function BrandLogo({ variant = "dark", className = "", size = "md" }: BrandLogoProps) {
  const { width, height } = sizeMap[size];
  const fill = variant === "dark" ? "#111111" : "#F0EEE9";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 140"
      width={width}
      height={height}
      className={className}
      aria-label="Black Flag Design mark"
      role="img"
    >
      <title>Our Black Flag that we carry as a part of each team we join. One for all and all for one. Encouragement to move fast, ethically, and shape the world we want to be a part of.</title>
      {/* 7 horizontal stripes — matches designer's original asset */}
      <rect y="0" width="280" height="16" fill={fill} />
      <rect y="23" width="280" height="16" fill={fill} />
      <rect y="46" width="280" height="16" fill={fill} />
      <rect y="69" width="280" height="16" fill={fill} />
      <rect y="92" width="280" height="16" fill={fill} />
      <rect y="115" width="280" height="16" fill={fill} />
      <rect y="138" width="280" height="2" fill={fill} />
      {/* Solid canton — top-right quadrant */}
      <rect x="154" y="0" width="126" height="70" fill={fill} />
    </svg>
  );
}
