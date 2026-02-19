import { useState } from "react";
import { CheckCircle, XCircle, Clock, Circle, AlertTriangle } from "lucide-react";
import { EventDrawer } from "../shared/EventDrawer";
import { EventBadge } from "../shared/EventBadge";
import type { GitHubCardData, GitHubTimelineEvent } from "../cards/GitHubCard";

interface GitHubDrawerProps {
  open: boolean;
  onClose: () => void;
  data: GitHubCardData;
}

function StatusDot({ status }: { status?: GitHubTimelineEvent["status"] }) {
  const colorMap: Record<string, string> = {
    success: "var(--bf-mint)",
    completed: "var(--bf-mint)",
    failure: "var(--bf-crimson)",
    cancelled: "var(--bf-slate)",
    skipped: "var(--bf-slate)",
    pending: "var(--bf-amber)",
    in_progress: "var(--bf-cobalt)",
  };
  const color = status ? colorMap[status] ?? "var(--bf-muted)" : "var(--bf-muted)";

  if (status === "failure") return <XCircle size={12} style={{ color }} className="shrink-0" />;
  if (status === "success" || status === "completed") return <CheckCircle size={12} style={{ color }} className="shrink-0" />;
  if (status === "in_progress") return <Clock size={12} style={{ color }} className="shrink-0 animate-spin" />;
  if (status === "cancelled" || status === "skipped") return <AlertTriangle size={10} style={{ color }} className="shrink-0" />;
  return <Circle size={8} fill={color} stroke="none" className="shrink-0 mt-0.5" />;
}

function OverviewTab({ data }: { data: GitHubCardData }) {
  return (
    <div className="space-y-4">
      {/* Project context — client logo + project name (never repo) */}
      <div className="flex items-center gap-3 rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        {data.clientLogoUrl ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-white shrink-0">
            <img src={data.clientLogoUrl} alt="" className="h-8 w-8 object-contain" />
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--bf-text)" }}>{data.projectName}</p>
          <p className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>{data.repositoryFullName}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Event Type</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.eventType}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Action</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.action ?? "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Sender</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.senderLogin}</p>
          </div>
          {data.branch && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Branch</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.branch}</p>
            </div>
          )}
          {data.workflowName && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Workflow</p>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.workflowName}</p>
            </div>
          )}
          {data.runNumber && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Run</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>#{data.runNumber}</p>
            </div>
          )}
          {data.prNumber && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>PR</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>#{data.prNumber}</p>
            </div>
          )}
          {data.issueNumber && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Issue</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>#{data.issueNumber}</p>
            </div>
          )}
          {data.releaseTag && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Release</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.releaseTag}</p>
            </div>
          )}
          {data.checkName && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Check</p>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.checkName}</p>
            </div>
          )}
          {data.refType && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Ref</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.refType}: {data.refName}</p>
            </div>
          )}
        </div>
      </div>
      {data.conclusion && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Conclusion</p>
          <EventBadge label={data.conclusion} variant={data.conclusion === "success" ? "status-success" : "status-failed"} />
        </div>
      )}
      {data.deployEnvironment && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Deployment</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono" style={{ color: "var(--bf-text)" }}>{data.deployEnvironment}</span>
            {data.deployState && (
              <EventBadge
                label={data.deployState}
                variant={data.deployState === "success" ? "status-success" : data.deployState === "failure" ? "status-failed" : "status-progress"}
              />
            )}
          </div>
        </div>
      )}
      {data.commitMessage && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>
            Push — {data.commitCount ?? 1} commit{(data.commitCount ?? 1) > 1 ? "s" : ""}
          </p>
          <p className="text-sm font-mono" style={{ color: "var(--bf-text)" }}>{data.commitMessage}</p>
        </div>
      )}
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Title</p>
        <p className="text-sm font-semibold" style={{ color: "var(--bf-text)" }}>{data.title}</p>
        {data.body && <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--bf-muted)" }}>{data.body}</p>}
      </div>
    </div>
  );
}

function TimelineTab({ data }: { data: GitHubCardData }) {
  const events = data.timeline ?? [];
  if (!events.length) {
    return <p className="text-xs py-4 text-center" style={{ color: "var(--bf-muted)" }}>No timeline data.</p>;
  }
  return (
    <div className="space-y-0">
      {events.map((evt, i) => (
        <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < events.length - 1 ? "1px solid var(--bf-border)" : undefined }}>
          <StatusDot status={evt.status} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium" style={{ color: "var(--bf-text)" }}>{evt.label}</p>
            {evt.detail && <p className="text-[10px] mt-0.5 truncate" style={{ color: "var(--bf-muted)" }}>{evt.detail}</p>}
          </div>
          <span className="text-[10px] font-mono shrink-0" style={{ color: "var(--bf-muted)" }}>{evt.time}</span>
        </div>
      ))}
    </div>
  );
}

function RawTab({ data }: { data: GitHubCardData }) {
  return (
    <pre
      className="rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
      style={{ backgroundColor: "var(--bf-surface)", color: "var(--bf-text)" }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function GitHubDrawer({ open, onClose, data }: GitHubDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Timeline", "Raw"];

  return (
    <EventDrawer
      open={open}
      onClose={onClose}
      title={data.title}
      subtitle={`${data.eventType} · ${data.projectName}`}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 0 && <OverviewTab data={data} />}
      {activeTab === 1 && <TimelineTab data={data} />}
      {activeTab === 2 && <RawTab data={data} />}
    </EventDrawer>
  );
}
