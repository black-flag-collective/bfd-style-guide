interface BrandLogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

// The ensign is a 13-row grid, 20:13 overall (width:height).
const sizeMap = {
  sm: { width: 37, height: 24 },
  md: { width: 49, height: 32 },
  lg: { width: 74, height: 48 },
};

export function BrandLogo({ variant = "dark", className = "", size = "md" }: BrandLogoProps) {
  const { width, height } = sizeMap[size];
  const fill = variant === "dark" ? "#111111" : "#FAFAFA";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 130"
      width={width}
      height={height}
      className={className}
      aria-label="Black Flag ensign"
      role="img"
    >
      <title>Our Black Flag that we carry as a part of each team we join. One for all and all for one. Encouragement to move fast, ethically, and shape the world we want to be a part of.</title>
      {/* Rows 1-7: flag block — left-half stripes on odd rows, solid canton right half */}
      <rect x="0" y="0" width="100" height="10" fill={fill} />
      <rect x="0" y="20" width="100" height="10" fill={fill} />
      <rect x="0" y="40" width="100" height="10" fill={fill} />
      <rect x="0" y="60" width="100" height="10" fill={fill} />
      <rect x="100" y="0" width="100" height="70" fill={fill} />
      {/* Rows 9, 11, 13: detached full-width stripes — never crop these */}
      <rect x="0" y="80" width="200" height="10" fill={fill} />
      <rect x="0" y="100" width="200" height="10" fill={fill} />
      <rect x="0" y="120" width="200" height="10" fill={fill} />
    </svg>
  );
}
