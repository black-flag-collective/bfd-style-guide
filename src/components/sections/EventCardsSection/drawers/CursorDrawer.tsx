import { useState } from "react";
import {
  FileEdit, Terminal, MessageSquare, Eye, Cpu, Zap, Search, Globe,
  FolderSearch, CheckSquare, AlertCircle, Brain, Play, Square,
  BookOpen, Wrench, ChevronDown, ChevronRight,
  FileCode, ListChecks,
} from "lucide-react";
import { EventDrawer } from "../shared/EventDrawer";
import { EventBadge } from "../shared/EventBadge";
import type { CursorSessionData, CursorTimelineEvent } from "../cards/CursorSessionCard";

interface CursorDrawerProps {
  open: boolean;
  onClose: () => void;
  data: CursorSessionData;
}

/* ─── Timeline Event Renderer ─── */

function TimelineIcon({ event }: { event: CursorTimelineEvent }) {
  const iconProps = { size: 13, className: "shrink-0" };
  const colorMap: Record<CursorTimelineEvent["type"], string> = {
    session_start: "var(--bf-mint)",
    user_prompt: "var(--bf-gold)",
    agent_thought: "var(--bf-slate)",
    agent_response: "var(--bf-teal)",
    file_read: "var(--bf-cobalt)",
    file_write: "var(--bf-mint)",
    file_edit: "var(--bf-amber)",
    shell_command: "var(--bf-rose)",
    grep_search: "var(--bf-royal)",
    glob_search: "var(--bf-royal)",
    semantic_search: "var(--bf-royal)",
    web_search: "var(--bf-cobalt)",
    todo_write: "var(--bf-gold)",
    read_lints: "var(--bf-amber)",
    subagent_launch: "var(--bf-teal)",
    subagent_result: "var(--bf-teal)",
    edit_notebook: "var(--bf-amber)",
    mcp_tool: "var(--bf-cobalt)",
    session_end: "var(--bf-crimson)",
  };
  const color = colorMap[event.type];
  const style = { color };

  const iconMap: Record<CursorTimelineEvent["type"], React.ReactNode> = {
    session_start: <Play {...iconProps} style={style} />,
    user_prompt: <MessageSquare {...iconProps} style={style} />,
    agent_thought: <Brain {...iconProps} style={style} />,
    agent_response: <Cpu {...iconProps} style={style} />,
    file_read: <Eye {...iconProps} style={style} />,
    file_write: <FileCode {...iconProps} style={style} />,
    file_edit: <FileEdit {...iconProps} style={style} />,
    shell_command: <Terminal {...iconProps} style={style} />,
    grep_search: <Search {...iconProps} style={style} />,
    glob_search: <FolderSearch {...iconProps} style={style} />,
    semantic_search: <Search {...iconProps} style={style} />,
    web_search: <Globe {...iconProps} style={style} />,
    todo_write: <ListChecks {...iconProps} style={style} />,
    read_lints: <AlertCircle {...iconProps} style={style} />,
    subagent_launch: <Zap {...iconProps} style={style} />,
    subagent_result: <CheckSquare {...iconProps} style={style} />,
    edit_notebook: <BookOpen {...iconProps} style={style} />,
    mcp_tool: <Wrench {...iconProps} style={style} />,
    session_end: <Square {...iconProps} style={style} />,
  };
  return <>{iconMap[event.type]}</>;
}

function ExpandableBlock({ children, maxLines = 3 }: { children: string; maxLines?: number }) {
  const [expanded, setExpanded] = useState(false);
  const lines = children.split("\n");
  const needsTruncation = lines.length > maxLines || children.length > 200;
  const displayText = expanded ? children : lines.slice(0, maxLines).join("\n").slice(0, 200);

  return (
    <div className="mt-1">
      <pre
        className="rounded px-2 py-1.5 text-[10px] font-mono leading-relaxed whitespace-pre-wrap break-all"
        style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "var(--bf-text)" }}
      >
        {displayText}{!expanded && needsTruncation && "…"}
      </pre>
      {needsTruncation && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          className="flex items-center gap-0.5 text-[9px] font-medium mt-0.5 cursor-pointer"
          style={{ color: "var(--bf-teal)" }}
        >
          {expanded ? <ChevronDown size={9} /> : <ChevronRight size={9} />}
          {expanded ? "collapse" : `show ${lines.length - maxLines} more lines`}
        </button>
      )}
    </div>
  );
}

function FilePath({ path }: { path: string }) {
  const parts = path.split("/");
  const fileName = parts.pop()!;
  const dir = parts.join("/");
  return (
    <span className="font-mono text-[10px]">
      {dir && <span style={{ color: "var(--bf-muted)" }}>{dir}/</span>}
      <span style={{ color: "var(--bf-cobalt)" }}>{fileName}</span>
    </span>
  );
}

function DurationBadge({ ms }: { ms: number }) {
  const label = ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  return (
    <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--bf-muted)" }}>
      {label}
    </span>
  );
}

function ExitCodeBadge({ code }: { code: number }) {
  const isSuccess = code === 0;
  return (
    <span
      className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
      style={{
        backgroundColor: isSuccess ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
        color: isSuccess ? "var(--bf-mint)" : "var(--bf-crimson)",
      }}
    >
      exit {code}
    </span>
  );
}

function TimelineEventDetail({ event }: { event: CursorTimelineEvent }) {
  switch (event.type) {
    case "session_start":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "var(--bf-teal)" }}>
            {event.model}
          </span>
          <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--bf-muted)" }}>
            {event.composerMode}
          </span>
          <span className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>
            {event.gitBranch}
          </span>
        </div>
      );
    case "user_prompt":
      return <ExpandableBlock maxLines={3}>{event.text}</ExpandableBlock>;
    case "agent_thought":
      return (
        <div>
          <ExpandableBlock maxLines={2}>{event.text}</ExpandableBlock>
          {event.durationMs && <DurationBadge ms={event.durationMs} />}
        </div>
      );
    case "agent_response":
      return event.durationMs ? <DurationBadge ms={event.durationMs} /> : null;
    case "file_read":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <FilePath path={event.filePath} />
          {event.lineRange && (
            <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
              lines {event.lineRange}
            </span>
          )}
          {event.totalLines && (
            <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
              ({event.totalLines} lines)
            </span>
          )}
        </div>
      );
    case "file_write":
      return (
        <div className="mt-0.5">
          <FilePath path={event.filePath} />
          {event.contentPreview && (
            <ExpandableBlock maxLines={3}>{event.contentPreview}</ExpandableBlock>
          )}
        </div>
      );
    case "file_edit":
      return (
        <div className="mt-0.5">
          <FilePath path={event.filePath} />
          {event.oldString && event.newString && (
            <div className="mt-1 rounded overflow-hidden text-[10px] font-mono" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
              <div className="px-2 py-1 border-b" style={{ borderColor: "rgba(255,255,255,0.05)", color: "var(--bf-crimson)" }}>
                − {event.oldString.slice(0, 120)}{event.oldString.length > 120 ? "…" : ""}
              </div>
              <div className="px-2 py-1" style={{ color: "var(--bf-mint)" }}>
                + {event.newString.slice(0, 120)}{event.newString.length > 120 ? "…" : ""}
              </div>
            </div>
          )}
        </div>
      );
    case "shell_command":
      return (
        <div className="mt-0.5">
          <div className="rounded px-2 py-1.5 text-[10px] font-mono" style={{ backgroundColor: "rgba(0,0,0,0.4)", color: "var(--bf-rose)" }}>
            $ {event.command}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            {event.exitCode !== undefined && <ExitCodeBadge code={event.exitCode} />}
            {event.durationMs !== undefined && <DurationBadge ms={event.durationMs} />}
          </div>
          {event.output && <ExpandableBlock maxLines={4}>{event.output}</ExpandableBlock>}
        </div>
      );
    case "grep_search":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-mono" style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "var(--bf-royal)" }}>
            /{event.pattern}/
          </span>
          {event.matchCount !== undefined && (
            <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
              {event.matchCount} matches in {event.filesMatched} files
            </span>
          )}
        </div>
      );
    case "glob_search":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-mono" style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "var(--bf-royal)" }}>
            {event.pattern}
          </span>
          {event.filesFound !== undefined && (
            <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
              {event.filesFound} files found
            </span>
          )}
        </div>
      );
    case "semantic_search":
      return (
        <div className="mt-0.5">
          <span className="text-[10px] italic" style={{ color: "var(--bf-text)" }}>
            "{event.query}"
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {event.targetDir && (
              <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
                in {event.targetDir}
              </span>
            )}
            {event.resultsCount !== undefined && (
              <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
                → {event.resultsCount} results
              </span>
            )}
          </div>
        </div>
      );
    case "web_search":
      return (
        <span className="text-[10px] italic mt-0.5 block" style={{ color: "var(--bf-text)" }}>
          "{event.searchTerm}"
        </span>
      );
    case "todo_write":
      return (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>
            {event.tasksCount} tasks
          </span>
          {event.taskPreview && (
            <span className="text-[10px] truncate" style={{ color: "var(--bf-text)" }}>
              — {event.taskPreview}
            </span>
          )}
        </div>
      );
    case "read_lints":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <FilePath path={event.filePath} />
          {event.errorCount !== undefined && (
            <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{
              backgroundColor: event.errorCount > 0 ? "rgba(248,113,113,0.1)" : "rgba(74,222,128,0.1)",
              color: event.errorCount > 0 ? "var(--bf-crimson)" : "var(--bf-mint)",
            }}>
              {event.errorCount} errors
            </span>
          )}
          {event.warningCount !== undefined && event.warningCount > 0 && (
            <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{ backgroundColor: "rgba(251,191,36,0.1)", color: "var(--bf-amber)" }}>
              {event.warningCount} warnings
            </span>
          )}
        </div>
      );
    case "subagent_launch":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "var(--bf-teal)" }}>
            {event.subagentType}
          </span>
          {event.model && (
            <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
              model: {event.model}
            </span>
          )}
          <span className="text-[10px] truncate" style={{ color: "var(--bf-text)" }}>
            {event.description}
          </span>
        </div>
      );
    case "subagent_result":
      return (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] truncate" style={{ color: "var(--bf-text)" }}>
            {event.description}
          </span>
          {event.durationMs && <DurationBadge ms={event.durationMs} />}
        </div>
      );
    case "edit_notebook":
      return (
        <div className="flex items-center gap-1.5 mt-0.5">
          <FilePath path={event.notebookPath} />
          <span className="text-[9px] font-mono" style={{ color: "var(--bf-muted)" }}>
            cell [{event.cellIndex}]
          </span>
        </div>
      );
    case "mcp_tool":
      return (
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <span className="rounded-full px-1.5 py-0.5 text-[9px] font-mono" style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "var(--bf-cobalt)" }}>
            {event.serverName}
          </span>
          <span className="text-[10px] font-mono" style={{ color: "var(--bf-text)" }}>
            {event.toolName}
          </span>
          {event.filePath && <FilePath path={event.filePath} />}
        </div>
      );
    case "session_end": {
      const durationLabel = event.totalDurationMs < 60000
        ? `${(event.totalDurationMs / 1000).toFixed(0)}s`
        : `${(event.totalDurationMs / 60000).toFixed(1)}m`;
      return (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] font-mono" style={{ color: "var(--bf-muted)" }}>
            {durationLabel} total · {event.totalEvents} events
          </span>
        </div>
      );
    }
  }
}

const eventLabel: Record<CursorTimelineEvent["type"], string> = {
  session_start: "Session started",
  user_prompt: "User prompt",
  agent_thought: "Agent thinking",
  agent_response: "Agent response",
  file_read: "Read file",
  file_write: "Write file",
  file_edit: "Edit file",
  shell_command: "Shell command",
  grep_search: "Grep search",
  glob_search: "Glob search",
  semantic_search: "Semantic search",
  web_search: "Web search",
  todo_write: "Updated tasks",
  read_lints: "Checked lints",
  subagent_launch: "Subagent launched",
  subagent_result: "Subagent completed",
  edit_notebook: "Edit notebook",
  mcp_tool: "MCP tool",
  session_end: "Session ended",
};

/* ─── Tab Components ─── */

function OverviewTab({ data }: { data: CursorSessionData }) {
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
          <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>{data.branch} · {data.model} · {data.stateLabel}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Developer</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.userName}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Model</p>
            <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.model}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Branch</p>
            <p className="text-sm font-mono mt-1" style={{ color: "var(--bf-text)" }}>{data.branch}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--bf-muted)" }}>Status</p>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--bf-text)" }}>{data.stateLabel}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-3" style={{ color: "var(--bf-muted)" }}>Activity Breakdown</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: MessageSquare, label: "Prompts", count: data.activity.prompts },
            { icon: FileEdit, label: "Edits", count: data.activity.edits },
            { icon: Terminal, label: "Shells", count: data.activity.shells },
            { icon: Eye, label: "Reads", count: data.activity.reads },
          ].map(item => (
            <div key={item.label} className="text-center">
              <item.icon size={16} className="mx-auto mb-1" style={{ color: "var(--bf-muted)" }} />
              <p className="text-lg font-bold" style={{ color: "var(--bf-text)" }}>{item.count}</p>
              <p className="text-[10px]" style={{ color: "var(--bf-muted)" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>First Prompt</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--bf-text)" }}>{data.firstPrompt}</p>
      </div>
    </div>
  );
}

function TimelineTab({ data }: { data: CursorSessionData }) {
  if (!data.timeline.length) {
    return (
      <p className="text-xs py-4 text-center" style={{ color: "var(--bf-muted)" }}>
        No timeline events available.
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {data.timeline.map((evt, i) => (
        <div
          key={i}
          className="relative py-2.5 pl-7"
          style={{ borderBottom: i < data.timeline.length - 1 ? "1px solid var(--bf-border)" : undefined }}
        >
          {/* Vertical connector line */}
          {i < data.timeline.length - 1 && (
            <div
              className="absolute left-[6px] top-[22px] bottom-0 w-px"
              style={{ backgroundColor: "var(--bf-border)" }}
            />
          )}
          {/* Icon */}
          <div className="absolute left-0 top-[10px]">
            <TimelineIcon event={evt} />
          </div>
          {/* Content */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold" style={{ color: "var(--bf-text)" }}>
                {eventLabel[evt.type]}
              </p>
              <TimelineEventDetail event={evt} />
            </div>
            <span className="text-[10px] font-mono shrink-0 mt-0.5" style={{ color: "var(--bf-muted)" }}>
              {evt.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CostTab({ data }: { data: CursorSessionData }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-3" style={{ color: "var(--bf-muted)" }}>Session Cost</p>
        <p className="text-3xl font-bold font-mono" style={{ color: "var(--bf-text)" }}>{data.cost}</p>
        <p className="text-xs mt-1" style={{ color: "var(--bf-muted)" }}>{data.duration} duration · {data.eventCount} events</p>
      </div>
      <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wider mb-3" style={{ color: "var(--bf-muted)" }}>Token Breakdown</p>
        <div className="space-y-2">
          {[
            { label: "Input tokens", value: "12,450", cost: "$0.15" },
            { label: "Output tokens", value: "8,320", cost: "$0.25" },
            { label: "Cache read", value: "45,000", cost: "$0.02" },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "var(--bf-muted)" }}>{row.label}</span>
              <div className="text-right">
                <span className="text-xs font-mono" style={{ color: "var(--bf-text)" }}>{row.value}</span>
                <span className="text-[10px] font-mono ml-2" style={{ color: "var(--bf-muted)" }}>{row.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {(data.subagentCount ?? 0) > 0 && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--bf-border)", backgroundColor: "var(--bf-paper)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--bf-muted)" }}>Subagent Costs</p>
          <EventBadge label={`${data.subagentCount} subagent${data.subagentCount! > 1 ? "s" : ""}`} variant="cursor" />
        </div>
      )}
    </div>
  );
}

function RawTab({ data }: { data: CursorSessionData }) {
  return (
    <pre
      className="rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
      style={{ backgroundColor: "var(--bf-surface)", color: "var(--bf-text)" }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function CursorDrawer({ open, onClose, data }: CursorDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Timeline", "Cost", "Raw"];

  return (
    <EventDrawer
      open={open}
      onClose={onClose}
      title={data.firstPrompt.slice(0, 60) + (data.firstPrompt.length > 60 ? "..." : "")}
      subtitle={`cursor session · ${data.projectName} · ${data.branch}`}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 0 && <OverviewTab data={data} />}
      {activeTab === 1 && <TimelineTab data={data} />}
      {activeTab === 2 && <CostTab data={data} />}
      {activeTab === 3 && <RawTab data={data} />}
    </EventDrawer>
  );
}
