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
  const fill = variant === "dark" ? "#171717" : "#F2F2F2";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 140"
      width={width}
      height={height}
      className={className}
      aria-label="Black Flag Design mark"
    >
      <rect x="0" y="5" width="280" height="15" fill={fill} />
      <rect x="0" y="28" width="280" height="15" fill={fill} />
      <rect x="0" y="51" width="280" height="15" fill={fill} />
      <rect x="0" y="74" width="280" height="15" fill={fill} />
      <rect x="0" y="97" width="280" height="15" fill={fill} />
      <rect x="0" y="120" width="280" height="15" fill={fill} />
      <rect x="168" y="0" width="112" height="70" fill={fill} />
    </svg>
  );
}
