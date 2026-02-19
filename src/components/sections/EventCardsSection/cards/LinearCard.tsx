import { EventCard } from "../shared/EventCard";
import { EventBadge } from "../shared/EventBadge";
import { EventFooter } from "../shared/EventFooter";

export type LinearTimelineEvent = {
  time: string;
  label: string;
  detail?: string;
  fromState?: string;
  toState?: string;
};

export interface LinearCardData {
  eventType: string;
  action: string;
  actorName: string;
  actorAvatarUrl?: string;
  projectName: string;
  clientLogoUrl?: string;
  teamName?: string;
  teamKey?: string;
  issueTitle?: string;
  issueState?: string;
  issuePriority?: number;
  issueNumber?: number;
  commentBody?: string;
  cycleName?: string;
  description?: string;
  labelName?: string;
  labelColor?: string;
  timeline?: LinearTimelineEvent[];
  timestamp: string;
  preview?: LinearPreview;
}

type LinearPreview =
  | { kind: "issue_description"; description: string; subIssues?: { title: string; state: string }[] }
  | { kind: "comment"; body: string }
  | { kind: "cycle_progress"; completed: number; total: number; inProgress: number; backlog: number; endDate: string }
  | { kind: "state_change"; from: string; to: string; description?: string }
  | { kind: "label_info"; labels: { name: string; color: string }[] };

const priorityLabels: Record<number, string> = { 0: "No priority", 1: "Urgent", 2: "High", 3: "Medium", 4: "Low" };

function LinearPreviewContent({ preview }: { preview: LinearPreview }) {
  const dim = "var(--bf-dark-muted)";
  const txt = "var(--bf-dark-text)";

  switch (preview.kind) {
    case "issue_description":
      return (
        <div style={{ marginTop: 4 }}>
          <p style={{ fontSize: 11, color: dim, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {preview.description}
          </p>
          {preview.subIssues && preview.subIssues.length > 0 && (
            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
              {preview.subIssues.map((si, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                    background: si.state === "Done" ? "var(--bf-mint)" : si.state === "In Progress" ? "var(--bf-amber)" : "var(--bf-dark-border)",
                  }} />
                  <span style={{ color: si.state === "Done" ? dim : txt, textDecoration: si.state === "Done" ? "line-through" : "none", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {si.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    case "comment":
      return (
        <div style={{ marginTop: 4, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--bf-dark-border)", background: "rgba(255,255,255,0.02)" }}>
          <p style={{ fontSize: 11, color: txt, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {preview.body}
          </p>
        </div>
      );
    case "cycle_progress": {
      const pct = Math.round((preview.completed / preview.total) * 100);
      return (
        <div style={{ marginTop: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: txt }}>{preview.completed}/{preview.total} completed</span>
            <span style={{ color: dim }}>{pct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "var(--bf-dark-border)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, background: "var(--bf-mint)", width: `${pct}%`, transition: "width 300ms ease" }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 10, color: dim }}>
            <span><span style={{ color: "var(--bf-mint)" }}>{preview.completed}</span> done</span>
            <span><span style={{ color: "var(--bf-amber)" }}>{preview.inProgress}</span> active</span>
            <span>{preview.backlog} backlog</span>
            <span>ends {preview.endDate}</span>
          </div>
        </div>
      );
    }
    case "state_change":
      return (
        <div style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, marginBottom: 4 }}>
            <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, border: "1px solid var(--bf-dark-border)", color: dim }}>{preview.from}</span>
            <span style={{ color: dim }}>→</span>
            <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, border: "1px solid var(--bf-dark-border)", color: txt, fontWeight: 500 }}>{preview.to}</span>
          </div>
          {preview.description && (
            <p style={{ fontSize: 11, color: dim, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {preview.description}
            </p>
          )}
        </div>
      );
    case "label_info":
      return (
        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {preview.labels.map((l, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, padding: "2px 8px", borderRadius: 9999, border: `1px solid ${l.color}33`, color: l.color }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: l.color }} />
              {l.name}
            </span>
          ))}
        </div>
      );
  }
}

interface LinearCardProps {
  data: LinearCardData;
  selected?: boolean;
  onClick?: () => void;
}

export function LinearCard({ data, selected, onClick }: LinearCardProps) {
  const identifier = data.teamKey && data.issueNumber ? `${data.teamKey}-${data.issueNumber}` : undefined;
  const hasPreview = !!data.preview;
  const bodyText = data.commentBody ?? data.description;

  return (
    <EventCard
      avatarUrl={data.actorAvatarUrl}
      avatarInitials={data.actorName.split(" ").map(w => w[0]).join("").slice(0, 2)}
      avatarGradient="from-violet-500 to-indigo-600"
      clientLogoUrl={data.clientLogoUrl}
      selected={selected}
      onClick={onClick}
      header={
        <>
          <span className="text-sm font-semibold truncate" style={{ color: "var(--bf-dark-text)" }}>
            {data.actorName}
          </span>
          <span className="text-[10px] shrink-0" style={{ color: "var(--bf-dark-muted)" }}>·</span>
          <span className="text-[11px] truncate" style={{ color: "var(--bf-dark-muted)" }}>
            {identifier ? `${identifier} · ${data.projectName}` : data.projectName}
          </span>
        </>
      }
      body={
        <div>
          <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--bf-dark-text)" }}>
            {data.issueTitle ?? `${data.eventType} ${data.action}d`}
          </p>
          {!hasPreview && bodyText && bodyText !== data.issueTitle && (
            <p className="text-xs line-clamp-6" style={{ color: "var(--bf-dark-muted)", lineHeight: 1.5 }}>
              {bodyText}
            </p>
          )}
          {data.preview && <LinearPreviewContent preview={data.preview} />}
        </div>
      }
      footer={
        <EventFooter
          vendor="linear"
          timestamp={data.timestamp}
          tags={
            <>
              {data.issueState && (
                <EventBadge
                  label={data.issueState}
                  variant={
                    data.issueState === "Done" || data.issueState === "Completed"
                      ? "status-done"
                      : data.issueState === "In Progress"
                        ? "status-progress"
                        : data.issueState === "Canceled"
                          ? "status-failed"
                          : "status-backlog"
                  }
                />
              )}
              {data.issuePriority !== undefined && data.issuePriority > 0 && (
                <span className="text-[10px] font-mono" style={{ color: data.issuePriority <= 2 ? "var(--bf-crimson)" : "var(--bf-dark-muted)" }}>
                  P{data.issuePriority} {priorityLabels[data.issuePriority]}
                </span>
              )}
              {data.labelName && (
                <span className="inline-flex items-center gap-1 text-[10px]" style={{ color: "var(--bf-dark-muted)" }}>
                  {data.labelColor && <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: data.labelColor }} />}
                  {data.labelName}
                </span>
              )}
              {data.cycleName && (
                <span className="text-[10px]" style={{ color: "var(--bf-dark-muted)" }}>
                  {data.cycleName}
                </span>
              )}
            </>
          }
        />
      }
    />
  );
}
