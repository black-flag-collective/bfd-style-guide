type BadgeVariant =
  | "github-cicd"
  | "github-code"
  | "github-issues"
  | "github-releases"
  | "github-security"
  | "github-social"
  | "linear"
  | "linear-secondary"
  | "cursor"
  | "feedback-text"
  | "feedback-voice"
  | "feedback-element"
  | "feedback-location"
  | "feedback-document"
  | "commit"
  | "status-success"
  | "status-progress"
  | "status-backlog"
  | "status-failed"
  | "status-done"
  | "severity-minor"
  | "severity-major"
  | "severity-none";

const variantStyles: Record<BadgeVariant, string> = {
  "github-cicd": "bg-bf-cobalt/10 text-bf-cobalt border-bf-cobalt/20",
  "github-code": "bg-bf-royal/10 text-bf-royal border-bf-royal/20",
  "github-issues": "bg-bf-amber/10 text-bf-amber border-bf-amber/20",
  "github-releases": "bg-bf-mint/10 text-bf-mint border-bf-mint/20",
  "github-security": "bg-bf-crimson/10 text-bf-crimson border-bf-crimson/20",
  "github-social": "bg-bf-slate/10 text-bf-slate border-bf-slate/20",
  linear: "bg-bf-royal/10 text-bf-royal border-bf-royal/20",
  "linear-secondary": "bg-bf-cobalt/10 text-bf-cobalt border-bf-cobalt/20",
  cursor: "bg-bf-teal/10 text-bf-teal border-bf-teal/20",
  "feedback-text": "bg-bf-gold/10 text-bf-gold border-bf-gold/20",
  "feedback-voice": "bg-bf-rose/10 text-bf-rose border-bf-rose/20",
  "feedback-element": "bg-bf-amber/10 text-bf-amber border-bf-amber/20",
  "feedback-location": "bg-bf-cobalt/10 text-bf-cobalt border-bf-cobalt/20",
  "feedback-document": "bg-bf-mint/10 text-bf-mint border-bf-mint/20",
  commit: "bg-bf-slate/10 text-bf-slate border-bf-slate/20",
  "status-success": "bg-bf-mint/10 text-bf-mint border-bf-mint/20",
  "status-progress": "bg-bf-amber/10 text-bf-amber border-bf-amber/20",
  "status-backlog": "bg-bf-cobalt/10 text-bf-cobalt border-bf-cobalt/20",
  "status-failed": "bg-bf-crimson/10 text-bf-crimson border-bf-crimson/20",
  "status-done": "bg-bf-mint/10 text-bf-mint border-bf-mint/20",
  "severity-minor": "bg-bf-slate/10 text-bf-slate border-bf-slate/20",
  "severity-major": "bg-bf-crimson/10 text-bf-crimson border-bf-crimson/20",
  "severity-none": "bg-bf-slate/10 text-bf-slate border-bf-slate/20",
};

interface EventBadgeProps {
  label: string;
  variant: BadgeVariant;
  className?: string;
}

export type { BadgeVariant };

export function EventBadge({ label, variant, className = "" }: EventBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
