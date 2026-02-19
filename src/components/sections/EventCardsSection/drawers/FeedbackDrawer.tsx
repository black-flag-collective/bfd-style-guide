import { useState } from "react";
import { Mic } from "lucide-react";
import { EventDrawer } from "../shared/EventDrawer";
import { EventBadge } from "../shared/EventBadge";
import type { FeedbackCardData } from "../cards/FeedbackCard";

interface FeedbackDrawerProps {
  open: boolean;
  onClose: () => void;
  data: FeedbackCardData;
}

function OverviewTab({ data }: { data: FeedbackCardData }) {
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
          <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>{data.kind} feedback · {data.status}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Kind</p>
            <p className="text-sm font-medium mt-1 capitalize" style={{ color: "var(--bf-text)" }}>{data.kind}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Author</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.userName}</p>
            {data.userEmail && (
              <p className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>{data.userEmail}</p>
            )}
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Status</p>
            <div className="mt-1">
              <EventBadge
                label={data.status}
                variant={data.status === "Done" ? "status-done" : data.status === "In Progress" ? "status-progress" : "status-backlog"}
              />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Severity</p>
            <div className="mt-1">
              <EventBadge
                label={data.severity}
                variant={data.severity === "major" ? "severity-major" : data.severity === "minor" ? "severity-minor" : "severity-none"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Feedback</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--bf-text)" }}>{data.text}</p>
      </div>

      {data.kind === "voice" && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Audio Recording</p>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
            <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: "var(--bf-rose)", color: "white" }}>
              <Mic size={14} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "var(--bf-text)" }}>Voice feedback recording</p>
              <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>
                Transcription: {data.transcriptionStatus ?? "completed"}
              </p>
            </div>
          </div>
          {data.transcript && (
            <div className="mt-3">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--bf-muted)" }}>Transcript</p>
              <p className="text-xs leading-relaxed italic" style={{ color: "var(--bf-text)" }}>"{data.transcript}"</p>
            </div>
          )}
        </div>
      )}

      {data.selector && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Element Selector</p>
          <pre className="text-xs font-mono break-all" style={{ color: "var(--bf-cobalt)" }}>{data.selector}</pre>
        </div>
      )}

      {data.url && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Page URL</p>
          <p className="text-sm font-mono break-all" style={{ color: "var(--bf-cobalt)" }}>{data.url}</p>
        </div>
      )}

      {(data.viewport || data.userAgent) && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Environment</p>
          {data.viewport && (
            <p className="text-xs font-mono" style={{ color: "var(--bf-text)" }}>Viewport: {data.viewport}</p>
          )}
          {data.userAgent && (
            <p className="text-xs font-mono mt-1 truncate" style={{ color: "var(--bf-muted)" }}>{data.userAgent}</p>
          )}
        </div>
      )}

      {data.screenshotUrl && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Screenshot</p>
          <div className="rounded-md overflow-hidden border" style={{ borderColor: "var(--bf-border)" }}>
            <img src={data.screenshotUrl} alt="Feedback screenshot" className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineTab({ data }: { data: FeedbackCardData }) {
  const events = data.timeline ?? [];
  if (!events.length) {
    return <p className="text-xs py-4 text-center" style={{ color: "var(--bf-muted)" }}>No timeline data.</p>;
  }
  return (
    <div className="space-y-0">
      {events.map((evt, i) => (
        <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < events.length - 1 ? "1px solid var(--bf-border)" : undefined }}>
          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "var(--bf-gold)" }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium" style={{ color: "var(--bf-text)" }}>{evt.label}</p>
            {evt.detail && <p className="text-[10px] mt-0.5" style={{ color: "var(--bf-muted)" }}>{evt.detail}</p>}
          </div>
          <span className="text-[10px] font-mono shrink-0" style={{ color: "var(--bf-muted)" }}>{evt.time}</span>
        </div>
      ))}
    </div>
  );
}

function RawTab({ data }: { data: FeedbackCardData }) {
  return (
    <pre
      className="rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
      style={{ backgroundColor: "var(--bf-surface)", color: "var(--bf-text)" }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function FeedbackDrawer({ open, onClose, data }: FeedbackDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Timeline", "Raw"];

  return (
    <EventDrawer
      open={open}
      onClose={onClose}
      title={data.text.slice(0, 60) + (data.text.length > 60 ? "..." : "")}
      subtitle={`${data.kind} feedback · ${data.projectName}`}
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
