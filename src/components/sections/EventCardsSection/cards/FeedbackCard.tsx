import { EventCard } from "../shared/EventCard";
import { EventBadge, type BadgeVariant } from "../shared/EventBadge";
import { EventFooter } from "../shared/EventFooter";

export type FeedbackTimelineEvent = {
  time: string;
  label: string;
  detail?: string;
};

export interface FeedbackCardData {
  kind: "text" | "voice" | "element" | "location" | "document";
  userName: string;
  userAvatarUrl?: string;
  userEmail?: string;
  projectName: string;
  clientLogoUrl?: string;
  text: string;
  screenshotUrl?: string;
  status: string;
  severity: string;
  url?: string;
  selector?: string;
  viewport?: string;
  userAgent?: string;
  transcript?: string;
  transcriptionStatus?: string;
  audioUrl?: string;
  timeline?: FeedbackTimelineEvent[];
  timestamp: string;
}

const kindGradient: Record<string, string> = {
  text: "from-amber-400 to-yellow-500",
  voice: "from-pink-400 to-rose-500",
  element: "from-orange-400 to-amber-500",
  location: "from-blue-400 to-indigo-500",
  document: "from-emerald-400 to-teal-500",
};

const statusVariant: Record<string, BadgeVariant> = {
  Backlog: "status-backlog",
  Todo: "status-backlog",
  "In Progress": "status-progress",
  "In Review": "status-progress",
  Done: "status-done",
  Canceled: "status-failed",
};

const severityVariant: Record<string, BadgeVariant> = {
  none: "severity-none",
  minor: "severity-minor",
  major: "severity-major",
};

interface FeedbackCardProps {
  data: FeedbackCardData;
  selected?: boolean;
  onClick?: () => void;
}

export function FeedbackCard({ data, selected, onClick }: FeedbackCardProps) {
  const gradient = kindGradient[data.kind] ?? kindGradient.text;

  return (
    <EventCard
      avatarUrl={data.userAvatarUrl}
      avatarInitials={data.userName.split(" ").map(w => w[0]).join("").slice(0, 2)}
      avatarGradient={gradient}
      clientLogoUrl={data.clientLogoUrl}
      selected={selected}
      onClick={onClick}
      header={
        <>
          <span className="text-sm font-semibold truncate" style={{ color: "var(--bf-dark-text)" }}>
            {data.userName}
          </span>
          <span className="text-[10px] shrink-0" style={{ color: "var(--bf-dark-muted)" }}>·</span>
          <span className="text-[11px] truncate" style={{ color: "var(--bf-dark-muted)" }}>
            {data.projectName}
          </span>
        </>
      }
      body={
        <div>
          <p className="text-sm leading-relaxed line-clamp-5" style={{ color: "var(--bf-dark-text)" }}>
            {data.text}
          </p>
          {data.screenshotUrl && (
            <div className="mt-2 h-16 w-full overflow-hidden rounded-md bg-bf-dark-bg">
              <img src={data.screenshotUrl} alt="Screenshot" className="h-full w-full object-cover opacity-60" />
            </div>
          )}
        </div>
      }
      footer={
        <EventFooter
          vendor="blackflag"
          timestamp={data.timestamp}
          tags={
            <>
              <EventBadge label={data.status} variant={statusVariant[data.status] ?? "status-backlog"} />
              {data.severity !== "none" && (
                <EventBadge label={data.severity} variant={severityVariant[data.severity] ?? "severity-none"} />
              )}
            </>
          }
        />
      }
    />
  );
}
