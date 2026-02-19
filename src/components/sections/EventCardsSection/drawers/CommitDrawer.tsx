import { useState } from "react";
import { Plus, Minus, FileCode, FilePlus, FileMinus, FileEdit, GitPullRequest, ExternalLink } from "lucide-react";
import { EventDrawer } from "../shared/EventDrawer";
import type { CommitCardData, CommitFileChange } from "../cards/CommitCard";

interface CommitDrawerProps {
  open: boolean;
  onClose: () => void;
  data: CommitCardData;
}

function FileStatusIcon({ status }: { status: CommitFileChange["status"] }) {
  const map: Record<CommitFileChange["status"], { icon: typeof FilePlus; color: string }> = {
    added: { icon: FilePlus, color: "var(--bf-mint)" },
    modified: { icon: FileEdit, color: "var(--bf-amber)" },
    removed: { icon: FileMinus, color: "var(--bf-crimson)" },
    renamed: { icon: FileCode, color: "var(--bf-cobalt)" },
  };
  const { icon: Icon, color } = map[status];
  return <Icon size={11} style={{ color }} className="shrink-0" />;
}

function OverviewTab({ data }: { data: CommitCardData }) {
  const [title, ...bodyLines] = data.message.split("\n");
  const body = bodyLines.filter(l => l.trim()).join("\n");
  const files = data.files ?? [];

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
          <p className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>{data.repositoryFullName}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>SHA</p>
            <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.sha.slice(0, 12)}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Branch</p>
            <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.branch}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Author</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.authorName}</p>
            <p className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>@{data.authorLogin}</p>
          </div>
          {data.committerName && data.committerName !== data.authorName && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Committer</p>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.committerName}</p>
              {data.committerEmail && <p className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>{data.committerEmail}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Commit Message</p>
        <p className="text-sm font-semibold" style={{ color: "var(--bf-text)" }}>{title}</p>
        {body && (
          <p className="text-xs mt-2 leading-relaxed whitespace-pre-line" style={{ color: "var(--bf-muted)" }}>{body}</p>
        )}
      </div>

      {data.linkedPr && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Linked Pull Request</p>
          <div className="flex items-center gap-2">
            <GitPullRequest size={14} style={{ color: "var(--bf-royal)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--bf-text)" }}>
              #{data.linkedPr.number} {data.linkedPr.title}
            </span>
          </div>
        </div>
      )}

      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>
            Files Changed ({data.changedFiles})
          </p>
          <div className="flex gap-2">
            <span className="text-xs font-mono" style={{ color: "var(--bf-mint)" }}>+{data.additions}</span>
            <span className="text-xs font-mono" style={{ color: "var(--bf-crimson)" }}>-{data.deletions}</span>
          </div>
        </div>
        {files.length > 0 ? (
          <div className="space-y-0">
            {files.map((f, i) => (
              <div key={f.path} className="flex items-center gap-2 py-1.5" style={{ borderBottom: i < files.length - 1 ? "1px solid var(--bf-border)" : undefined }}>
                <FileStatusIcon status={f.status} />
                <span className="flex-1 text-xs font-mono truncate" style={{ color: "var(--bf-text)" }}>{f.path}</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-mono shrink-0" style={{ color: "var(--bf-mint)" }}>
                  <Plus size={9} />{f.additions}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-mono shrink-0" style={{ color: "var(--bf-crimson)" }}>
                  <Minus size={9} />{f.deletions}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs" style={{ color: "var(--bf-muted)" }}>File details not available.</p>
        )}
      </div>

      {data.htmlUrl && (
        <a
          href={data.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors hover:opacity-80"
          style={{ borderColor: "var(--bf-border)", color: "var(--bf-cobalt)" }}
        >
          <ExternalLink size={14} />
          View on GitHub
        </a>
      )}
    </div>
  );
}

function RawTab({ data }: { data: CommitCardData }) {
  return (
    <pre
      className="rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
      style={{ backgroundColor: "var(--bf-surface)", color: "var(--bf-text)" }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function CommitDrawer({ open, onClose, data }: CommitDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Raw"];

  return (
    <EventDrawer
      open={open}
      onClose={onClose}
      title={data.message.split("\n")[0]}
      subtitle={`commit · ${data.sha.slice(0, 7)} · ${data.projectName}`}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 0 && <OverviewTab data={data} />}
      {activeTab === 1 && <RawTab data={data} />}
    </EventDrawer>
  );
}
