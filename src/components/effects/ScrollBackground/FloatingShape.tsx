import { useScrollProgress } from "./useScrollProgress";
import type { FloatingShapeProps } from "./types";

export function FloatingShape({ shape, position, size = 40, speed = 0.3, rotation = 0, color = "currentColor", opacity = 0.2 }: FloatingShapeProps) {
  const { scrollY } = useScrollProgress();
  const translateY = -scrollY * (1 - speed);
  const rotateAmount = rotation + scrollY * 0.02 * speed;
  const [x, y] = position;

  const renderShape = () => {
    switch (shape) {
      case "corner-bracket":
        return (<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"><path d={`M 2 ${size * 0.7} L 2 2 L ${size * 0.7} 2`} stroke={color} strokeWidth={2} strokeLinecap="square" /></svg>);
      case "line":
        return (<svg width={size} height={2} viewBox={`0 0 ${size} 2`} fill="none"><line x1="0" y1="1" x2={size} y2="1" stroke={color} strokeWidth={2} /></svg>);
      case "dot":
        return (<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"><circle cx={size / 2} cy={size / 2} r={size / 4} fill={color} /></svg>);
      default:
        return null;
    }
  };

  return (
    <div className="absolute pointer-events-none will-change-transform" style={{ left: `${x}%`, top: `${y}%`, opacity, transform: `translateY(${translateY}px) rotate(${rotateAmount}deg)` }}>
      {renderShape()}
    </div>
  );
}
