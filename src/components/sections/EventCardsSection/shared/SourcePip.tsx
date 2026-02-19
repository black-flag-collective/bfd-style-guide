import { GitHubLight } from "developer-icons";

type SourceType = "github" | "linear" | "cursor" | "feedback" | "commit";

function LinearIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
      <path d="M1.22541 61.5228c-.97401-6.3956-.97401-12.6501 0-19.0457l18.12469 9.5228L1.22541 61.5228ZM12.9355 22.4912C17.0398 17.225 22.225 12.9398 28.2266 9.97L37.5 28.1089 12.9355 22.4912ZM40.954 1.22541c6.396-.97401 12.65-.97401 19.046 0L50.477 19.3501 40.954 1.22541ZM77.509 9.97c6.001 2.97 11.186 7.255 15.291 12.5212L68.236 28.1089 77.509 9.97ZM98.775 42.477c.974 6.396.974 12.65 0 19.046L80.65 52 98.775 42.477ZM87.064 77.509c-4.104 5.266-9.29 9.551-15.291 12.521L62.5 71.891l24.564 5.618ZM59.046 98.775c-6.396.974-12.65.974-19.046 0L49.523 80.65l9.523 18.125ZM22.491 90.03c-6.002-2.97-11.187-7.255-15.291-12.521L31.764 71.891 22.491 90.03ZM50 65c-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15Z" />
    </svg>
  );
}

function CursorIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l14 9-7 2-4 7z" />
    </svg>
  );
}

function BlackFlagIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2v20M4 4h12l-3 4 3 4H4" />
    </svg>
  );
}

const sourceIcons: Record<SourceType, React.FC<{ size?: number }>> = {
  github: ({ size }) => <GitHubLight size={size ?? 12} />,
  linear: LinearIcon,
  cursor: CursorIcon,
  feedback: BlackFlagIcon,
  commit: ({ size }) => <GitHubLight size={size ?? 12} />,
};

interface SourcePipProps {
  source: SourceType;
  className?: string;
}

export type { SourceType };

export function SourcePip({ source, className = "" }: SourcePipProps) {
  const Icon = sourceIcons[source];
  return (
    <div
      className={`absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-bf-paper bg-bf-bg text-bf-text ${className}`}
    >
      <Icon size={10} />
    </div>
  );
}
