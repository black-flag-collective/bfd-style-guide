import { GitBranch, Plus, Minus, FileCode } from "lucide-react";
import { EventCard } from "../shared/EventCard";
import { EventFooter } from "../shared/EventFooter";

export type CommitFileChange = {
  path: string;
  additions: number;
  deletions: number;
  status: "added" | "modified" | "removed" | "renamed";
};

export interface CommitCardData {
  sha: string;
  message: string;
  authorName: string;
  authorLogin: string;
  authorAvatarUrl?: string;
  repositoryFullName: string;
  projectName: string;
  clientLogoUrl?: string;
  branch: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  files?: CommitFileChange[];
  linkedPr?: { number: number; title: string };
  committerName?: string;
  committerEmail?: string;
  htmlUrl?: string;
  timestamp: string;
}

interface CommitCardProps {
  data: CommitCardData;
  selected?: boolean;
  onClick?: () => void;
}

export function CommitCard({ data, selected, onClick }: CommitCardProps) {
  const [title, ...bodyLines] = data.message.split("\n");
  const body = bodyLines.filter(l => l.trim()).join("\n");

  return (
    <EventCard
      avatarUrl={data.authorAvatarUrl}
      avatarInitials={data.authorLogin.slice(0, 2).toUpperCase()}
      avatarGradient="from-gray-500 to-gray-700"
      clientLogoUrl={data.clientLogoUrl}
      selected={selected}
      onClick={onClick}
      header={
        <>
          <span className="text-sm font-semibold truncate" style={{ color: "var(--bf-dark-text)" }}>
            {data.authorLogin}
          </span>
          <span className="text-[10px] shrink-0" style={{ color: "var(--bf-dark-muted)" }}>·</span>
          <span className="text-[11px] truncate" style={{ color: "var(--bf-dark-muted)" }}>
            {data.projectName}
          </span>
        </>
      }
      body={
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--bf-dark-text)" }}>
            {title}
          </p>
          {body && (
            <p className="text-xs line-clamp-4 whitespace-pre-line" style={{ color: "var(--bf-dark-muted)" }}>
              {body}
            </p>
          )}
        </div>
      }
      footer={
        <EventFooter
          vendor="github"
          timestamp={data.timestamp}
          tags={
            <>
              <span className="text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                {data.sha.slice(0, 7)}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                <GitBranch size={10} /> {data.branch}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono" style={{ color: "var(--bf-mint)" }}>
                <Plus size={9} />{data.additions}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono" style={{ color: "var(--bf-crimson)" }}>
                <Minus size={9} />{data.deletions}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono" style={{ color: "var(--bf-dark-muted)" }}>
                <FileCode size={9} />{data.changedFiles}
              </span>
            </>
          }
        />
      }
    />
  );
}
