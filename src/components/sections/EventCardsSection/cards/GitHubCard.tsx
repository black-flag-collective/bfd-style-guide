import { GitBranch, Play, GitPullRequest, Tag, AlertTriangle, Trash2, Star, GitFork, Eye, MessageCircle, Check, X, FileText, Minus, Plus } from "lucide-react";
import { EventCard } from "../shared/EventCard";
import { EventBadge } from "../shared/EventBadge";
import { EventFooter } from "../shared/EventFooter";

export type GitHubTimelineEvent = {
  time: string;
  label: string;
  detail?: string;
  status?: "success" | "failure" | "pending" | "in_progress" | "completed" | "cancelled" | "skipped";
};

export interface GitHubCardData {
  eventType: string;
  action?: string;
  senderLogin: string;
  senderAvatarUrl?: string;
  repositoryFullName: string;
  projectName: string;
  clientLogoUrl?: string;
  title: string;
  body?: string;
  conclusion?: string;
  branch?: string;
  runNumber?: number;
  prNumber?: number;
  releaseTag?: string;
  issueNumber?: number;
  checkName?: string;
  deployEnvironment?: string;
  deployState?: string;
  refType?: string;
  refName?: string;
  commitCount?: number;
  commitMessage?: string;
  workflowName?: string;
  providerLink?: string;
  timeline?: GitHubTimelineEvent[];
  timestamp: string;
  preview?: GitHubPreview;
}

type GitHubPreview =
  | { kind: "workflow_steps"; steps: { name: string; conclusion: "success" | "failure" | "skipped" | "pending"; durationMs?: number }[] }
  | { kind: "commit_list"; commits: { sha: string; message: string; additions: number; deletions: number }[] }
  | { kind: "file_changes"; files: { path: string; additions: number; deletions: number; status: "added" | "modified" | "removed" }[] }
  | { kind: "review_body"; body: string; state: "approved" | "changes_requested" | "commented" }
  | { kind: "release_notes"; notes: string }
  | { kind: "vulnerability"; severity: string; cvss: number; package: string; fixVersion: string }
  | { kind: "issue_body"; body: string; labels?: { name: string; color: string }[] };

function ConclusionTag({ conclusion }: { conclusion: string }) {
  return (
    <EventBadge
      label={conclusion}
      variant={
        conclusion === "success" || conclusion === "completed"
          ? "status-success"
          : conclusion === "failure" || conclusion === "failed"
            ? "status-failed"
            : "status-progress"
      }
    />
  );
}

function PreviewContent({ preview }: { preview: GitHubPreview }) {
  const dim = "var(--bf-dark-muted)";
  const txt = "var(--bf-dark-text)";

  switch (preview.kind) {
    case "workflow_steps":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
          {preview.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
              {step.conclusion === "success" ? (
                <Check size={11} style={{ color: "var(--bf-mint)", flexShrink: 0 }} />
              ) : step.conclusion === "failure" ? (
                <X size={11} style={{ color: "var(--bf-crimson)", flexShrink: 0 }} />
              ) : step.conclusion === "skipped" ? (
                <Minus size={11} style={{ color: dim, flexShrink: 0 }} />
              ) : (
                <span style={{ width: 11, height: 11, borderRadius: "50%", border: `1.5px solid ${dim}`, flexShrink: 0 }} />
              )}
              <span style={{ color: txt, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{step.name}</span>
              {step.durationMs !== undefined && (
                <span style={{ color: dim, fontSize: 10, fontFamily: "monospace", flexShrink: 0 }}>
                  {step.durationMs < 1000 ? `${step.durationMs}ms` : `${(step.durationMs / 1000).toFixed(1)}s`}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    case "commit_list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
          {preview.commits.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
              <span style={{ fontFamily: "monospace", color: dim, fontSize: 10, flexShrink: 0 }}>{c.sha.slice(0, 7)}</span>
              <span style={{ color: txt, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.message}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, flexShrink: 0 }}>
                <span style={{ color: "var(--bf-mint)" }}>+{c.additions}</span>
                <span style={{ color: dim }}>/</span>
                <span style={{ color: "var(--bf-crimson)" }}>-{c.deletions}</span>
              </span>
            </div>
          ))}
        </div>
      );
    case "file_changes":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
          {preview.files.slice(0, 5).map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
              <FileText size={10} style={{ color: dim, flexShrink: 0 }} />
              <span style={{ color: f.status === "added" ? "var(--bf-mint)" : f.status === "removed" ? "var(--bf-crimson)" : txt, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace", fontSize: 10 }}>
                {f.path}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 10, flexShrink: 0 }}>
                <span style={{ color: "var(--bf-mint)" }}>+{f.additions}</span>
                {" "}
                <span style={{ color: "var(--bf-crimson)" }}>-{f.deletions}</span>
              </span>
            </div>
          ))}
          {preview.files.length > 5 && (
            <span style={{ fontSize: 10, color: dim }}>+{preview.files.length - 5} more files</span>
          )}
        </div>
      );
    case "review_body":
      return (
        <div style={{ marginTop: 4, padding: "6px 8px", borderRadius: 6, border: `1px solid ${preview.state === "approved" ? "rgba(74,222,128,0.2)" : preview.state === "changes_requested" ? "rgba(248,113,113,0.2)" : "var(--bf-dark-border)"}`, background: preview.state === "approved" ? "rgba(74,222,128,0.04)" : preview.state === "changes_requested" ? "rgba(248,113,113,0.04)" : "transparent" }}>
          <p style={{ fontSize: 11, color: txt, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{preview.body}</p>
        </div>
      );
    case "release_notes":
      return (
        <div style={{ marginTop: 4, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--bf-dark-border)", background: "rgba(255,255,255,0.02)" }}>
          <p style={{ fontSize: 11, color: txt, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden", whiteSpace: "pre-line" }}>{preview.notes}</p>
        </div>
      );
    case "vulnerability":
      return (
        <div style={{ marginTop: 4, padding: "6px 8px", borderRadius: 6, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.04)" }}>
          <div style={{ display: "flex", gap: 12, fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: "var(--bf-crimson)", fontWeight: 600 }}>CVSS {preview.cvss}</span>
            <span style={{ color: dim }}>Severity: <span style={{ color: txt }}>{preview.severity}</span></span>
          </div>
          <div style={{ fontSize: 11, color: dim }}>
            <span style={{ fontFamily: "monospace", color: txt }}>{preview.package}</span>
            {" → fix: "}
            <span style={{ fontFamily: "monospace", color: "var(--bf-mint)" }}>{preview.fixVersion}</span>
          </div>
        </div>
      );
    case "issue_body":
      return (
        <div style={{ marginTop: 4 }}>
          <p style={{ fontSize: 11, color: dim, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{preview.body}</p>
          {preview.labels && preview.labels.length > 0 && (
            <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
              {preview.labels.map((l, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, padding: "1px 6px", borderRadius: 9999, border: `1px solid ${l.color}33`, color: l.color }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: l.color }} />
                  {l.name}
                </span>
              ))}
            </div>
          )}
        </div>
      );
  }
}

interface GitHubCardProps {
  data: GitHubCardData;
  selected?: boolean;
  onClick?: () => void;
}

export function GitHubCard({ data, selected, onClick }: GitHubCardProps) {
  return (
    <EventCard
      avatarUrl={data.senderAvatarUrl}
      avatarInitials={data.senderLogin.slice(0, 2).toUpperCase()}
      avatarGradient="from-gray-600 to-gray-800"
      clientLogoUrl={data.clientLogoUrl}
      selected={selected}
      onClick={onClick}
      header={
        <>
          <span className="text-sm font-semibold truncate" style={{ color: "var(--bf-dark-text)" }}>
            {data.senderLogin}
          </span>
          <span className="text-[10px] shrink-0" style={{ color: "var(--bf-dark-muted)" }}>·</span>
          <span className="text-[11px] truncate" style={{ color: "var(--bf-dark-muted)" }}>
            {data.projectName}
          </span>
        </>
      }
      body={
        <div>
          <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--bf-dark-text)" }}>
            {data.title}
          </p>
          {data.body && !data.preview && (
            <p className="text-xs line-clamp-6" style={{ color: "var(--bf-dark-muted)", lineHeight: 1.5 }}>
              {data.body}
            </p>
          )}
          {data.preview && <PreviewContent preview={data.preview} />}
        </div>
      }
      footer={
        <EventFooter
          vendor="github"
          timestamp={data.timestamp}
          tags={
            <>
              {data.conclusion && <ConclusionTag conclusion={data.conclusion} />}
              {data.branch && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  <GitBranch size={10} /> {data.branch}
                </span>
              )}
              {data.runNumber && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  <Play size={10} /> #{data.runNumber}
                </span>
              )}
              {data.prNumber && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  <GitPullRequest size={10} /> #{data.prNumber}
                </span>
              )}
              {data.releaseTag && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  <Tag size={10} /> {data.releaseTag}
                </span>
              )}
              {data.issueNumber && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  <MessageCircle size={10} /> #{data.issueNumber}
                </span>
              )}
              {data.deployEnvironment && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  {data.deployEnvironment}
                </span>
              )}
              {data.refName && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                  {data.refType === "branch" ? <GitBranch size={10} /> : <Tag size={10} />} {data.refName}
                </span>
              )}
              {data.eventType === "dependabot_alert" && <AlertTriangle size={10} style={{ color: "var(--bf-crimson)" }} />}
              {data.eventType === "delete" && <Trash2 size={10} style={{ color: "var(--bf-crimson)" }} />}
              {data.eventType === "star" && <Star size={10} style={{ color: "var(--bf-amber)" }} />}
              {data.eventType === "fork" && <GitFork size={10} style={{ color: "var(--bf-dark-muted)" }} />}
              {data.eventType === "watch" && <Eye size={10} style={{ color: "var(--bf-dark-muted)" }} />}
            </>
          }
        />
      }
    />
  );
}
