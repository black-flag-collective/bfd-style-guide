import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { EventDrawer } from "../shared/EventDrawer";
import { EventBadge } from "../shared/EventBadge";
import type { LinearCardData } from "../cards/LinearCard";

interface LinearDrawerProps {
  open: boolean;
  onClose: () => void;
  data: LinearCardData;
}

function OverviewTab({ data }: { data: LinearCardData }) {
  return (
    <div className="space-y-4">
      {/* Project context — client logo + project name */}
      <div className="flex items-center gap-3 rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        {data.clientLogoUrl ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-white shrink-0">
            <img src={data.clientLogoUrl} alt="" className="h-8 w-8 object-contain" />
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--bf-text)" }}>{data.projectName}</p>
          <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>{data.teamName} · {data.eventType}/{data.action}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Entity</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.eventType}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Action</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.action}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Actor</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.actorName}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Team</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>
              {data.teamKey ? `${data.teamName} (${data.teamKey})` : data.teamName ?? "—"}
            </p>
          </div>
          {data.issuePriority !== undefined && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Priority</p>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>
                {["No priority", "Urgent", "High", "Medium", "Low"][data.issuePriority] ?? `P${data.issuePriority}`}
              </p>
            </div>
          )}
          {data.issueNumber !== undefined && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Issue</p>
              <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>
                {data.teamKey ? `${data.teamKey}-${data.issueNumber}` : `#${data.issueNumber}`}
              </p>
            </div>
          )}
          {data.cycleName && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Cycle</p>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.cycleName}</p>
            </div>
          )}
        </div>
      </div>
      {data.issueTitle && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Issue</p>
          <p className="text-sm font-semibold" style={{ color: "var(--bf-text)" }}>{data.issueTitle}</p>
          {data.issueState && (
            <div className="mt-2">
              <EventBadge
                label={data.issueState}
                variant={data.issueState === "Done" ? "status-done" : data.issueState === "In Progress" ? "status-progress" : "status-backlog"}
              />
            </div>
          )}
        </div>
      )}
      {data.commentBody && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Comment</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--bf-text)" }}>{data.commentBody}</p>
        </div>
      )}
      {data.labelName && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Label</p>
          <div className="flex items-center gap-2">
            {data.labelColor && (
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: data.labelColor }} />
            )}
            <span className="text-sm font-medium" style={{ color: "var(--bf-text)" }}>{data.labelName}</span>
          </div>
        </div>
      )}
      {data.description && !data.issueTitle && !data.commentBody && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Description</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--bf-text)" }}>{data.description}</p>
        </div>
      )}
    </div>
  );
}

function TimelineTab({ data }: { data: LinearCardData }) {
  const events = data.timeline ?? [];
  if (!events.length) {
    return <p className="text-xs py-4 text-center" style={{ color: "var(--bf-muted)" }}>No timeline data.</p>;
  }
  return (
    <div className="space-y-0">
      {events.map((evt, i) => (
        <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < events.length - 1 ? "1px solid var(--bf-border)" : undefined }}>
          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "var(--bf-royal)" }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium" style={{ color: "var(--bf-text)" }}>{evt.label}</p>
            {evt.detail && <p className="text-[10px] mt-0.5" style={{ color: "var(--bf-muted)" }}>{evt.detail}</p>}
            {evt.fromState && evt.toState && (
              <div className="flex items-center gap-1 mt-1">
                <EventBadge label={evt.fromState} variant="status-backlog" />
                <ArrowRight size={10} style={{ color: "var(--bf-muted)" }} />
                <EventBadge
                  label={evt.toState}
                  variant={evt.toState === "Done" ? "status-done" : evt.toState === "In Progress" ? "status-progress" : "status-backlog"}
                />
              </div>
            )}
          </div>
          <span className="text-[10px] font-mono shrink-0" style={{ color: "var(--bf-muted)" }}>{evt.time}</span>
        </div>
      ))}
    </div>
  );
}

function RawTab({ data }: { data: LinearCardData }) {
  return (
    <pre
      className="rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
      style={{ backgroundColor: "var(--bf-surface)", color: "var(--bf-text)" }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function LinearDrawer({ open, onClose, data }: LinearDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Timeline", "Raw"];

  return (
    <EventDrawer
      open={open}
      onClose={onClose}
      title={data.issueTitle ?? `${data.eventType} ${data.action}`}
      subtitle={`${data.eventType}/${data.action} · ${data.projectName}`}
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
