import { Circle, Cpu, DollarSign, Clock, Users, FileEdit, Terminal, MessageSquare } from "lucide-react";
import { EventCard } from "../shared/EventCard";
import { EventFooter } from "../shared/EventFooter";

/* ─── Cursor Timeline Event Types ─── */

export type CursorTimelineEvent =
  | { type: "session_start"; model: string; composerMode: string; gitBranch: string; time: string }
  | { type: "user_prompt"; text: string; time: string }
  | { type: "agent_thought"; text: string; durationMs?: number; time: string }
  | { type: "agent_response"; durationMs?: number; time: string }
  | { type: "file_read"; filePath: string; lineRange?: string; totalLines?: number; time: string }
  | { type: "file_write"; filePath: string; contentPreview?: string; time: string }
  | { type: "file_edit"; filePath: string; oldString?: string; newString?: string; time: string }
  | { type: "shell_command"; command: string; exitCode?: number; durationMs?: number; output?: string; time: string }
  | { type: "grep_search"; pattern: string; filesMatched?: number; matchCount?: number; time: string }
  | { type: "glob_search"; pattern: string; filesFound?: number; time: string }
  | { type: "semantic_search"; query: string; resultsCount?: number; targetDir?: string; time: string }
  | { type: "web_search"; searchTerm: string; time: string }
  | { type: "todo_write"; tasksCount: number; taskPreview?: string; time: string }
  | { type: "read_lints"; filePath: string; errorCount?: number; warningCount?: number; time: string }
  | { type: "subagent_launch"; description: string; subagentType: string; model?: string; time: string }
  | { type: "subagent_result"; description: string; durationMs?: number; time: string }
  | { type: "edit_notebook"; notebookPath: string; cellIndex: number; time: string }
  | { type: "mcp_tool"; serverName: string; toolName: string; filePath?: string; time: string }
  | { type: "session_end"; totalDurationMs: number; totalEvents: number; time: string };

export interface CursorSessionData {
  userName: string;
  userAvatarUrl?: string;
  projectName: string;
  clientLogoUrl?: string;
  branch: string;
  model: string;
  stateLabel: string;
  isActive: boolean;
  isSubagent?: boolean;
  cost: string;
  duration: string;
  eventCount: number;
  subagentCount?: number;
  firstPrompt: string;
  lastPrompt?: string;
  agentOutputs: string[];
  activity: { prompts: number; edits: number; shells: number; reads: number };
  timeline: CursorTimelineEvent[];
  timestamp: string;
}

interface CursorSessionCardProps {
  data: CursorSessionData;
  selected?: boolean;
  onClick?: () => void;
}

export function CursorSessionCard({ data, selected, onClick }: CursorSessionCardProps) {
  const dim = "var(--bf-dark-muted)";

  return (
    <EventCard
      avatarUrl={data.userAvatarUrl}
      avatarInitials={data.userName.split(" ").map(w => w[0]).join("").slice(0, 2)}
      avatarGradient="from-teal-400 to-cyan-600"
      clientLogoUrl={data.clientLogoUrl}
      selected={selected}
      onClick={onClick}
      header={
        <>
          <span className="text-sm font-semibold truncate" style={{ color: "var(--bf-dark-text)" }}>
            {data.userName}
          </span>
          <span className="text-[10px] shrink-0" style={{ color: dim }}>·</span>
          <span className="text-[11px] truncate" style={{ color: dim }}>
            {data.projectName} · {data.branch}
          </span>
        </>
      }
      body={
        <div style={{ display: "flex", gap: 0, height: "100%" }}>
          <div style={{ flex: 1, overflow: "hidden", paddingRight: 8, borderRight: "1px solid var(--bf-dark-border)" }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: dim, marginBottom: 4 }}>
              User Message
            </p>
            <p className="line-clamp-6" style={{ fontSize: 12, lineHeight: 1.5, color: "var(--bf-dark-text)" }}>
              {data.firstPrompt}
            </p>
          </div>
          <div style={{ flex: 1, overflow: "hidden", paddingLeft: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: dim, marginBottom: 4 }}>
              Agent Output
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {data.agentOutputs.slice(0, 5).map((output, i) => (
                <p key={i} style={{ fontSize: 11, color: "var(--bf-dark-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {output}
                </p>
              ))}
            </div>
          </div>
        </div>
      }
      footer={
        <EventFooter
          vendor="cursor"
          active={data.isActive}
          timestamp={data.timestamp}
          tags={
            <>
              <Circle size={8} fill={data.isActive ? "var(--bf-mint)" : "var(--bf-slate)"} stroke="none" />
              <span style={{ fontSize: 10, fontWeight: 500, color: dim }}>{data.stateLabel}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, fontFamily: "monospace", color: dim }}>
                <Cpu size={10} /> {data.model}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, fontFamily: "monospace", color: dim }}>
                <DollarSign size={10} /> {data.cost}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, fontFamily: "monospace", color: dim }}>
                <Clock size={10} /> {data.duration}
              </span>
              {(data.subagentCount ?? 0) > 0 && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, fontFamily: "monospace", color: dim }}>
                  <Users size={10} /> {data.subagentCount}
                </span>
              )}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, fontFamily: "monospace", color: dim }}>
                <MessageSquare size={9} />{data.activity.prompts}
                <FileEdit size={9} />{data.activity.edits}
                <Terminal size={9} />{data.activity.shells}
              </span>
            </>
          }
        />
      }
    />
  );
}
