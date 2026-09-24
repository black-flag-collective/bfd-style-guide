import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, RefreshCw, Search, X } from "lucide-react";

const primaryViews = ["Overview", "Artifacts", "Feedback", "People"];
const secondaryViews = ["Activity", "Operations", "Settings"];
const examples: Record<string, string[]> = {
  Overview: ["Review the current delivery", "Read the latest project conversation"],
  Artifacts: ["Design review", "Implementation plan"],
  Feedback: ["Clarify the next action", "Review the mobile layout"],
  People: ["Business owner", "Technical owner"],
  Activity: ["Discussed the next release", "Shared a design review"],
  Operations: ["Build completed", "Review requested"],
  Settings: ["Project information", "Connected sources"],
};
const states = ["Ready", "First load", "Refreshing", "Empty", "Error"] as const;
type PreviewState = typeof states[number];
const control = "min-h-10 rounded-md px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bf-cobalt";

/** A controlled specimen, not a second implementation of the Agora app. */
export function ProductWorkspaceExample() {
  const [view, setView] = useState("Overview");
  const [state, setState] = useState<PreviewState>("Ready");
  const [query, setQuery] = useState("");
  const more = useRef<HTMLDetailsElement>(null);
  const rows = examples[view].filter(row => row.toLowerCase().includes(query.toLowerCase()));
  const shownViews = secondaryViews.includes(view) ? [...primaryViews, view] : primaryViews;
  const selectView = (next: string) => {
    setView(next);
    setQuery("");
    if (more.current?.open) {
      more.current.open = false;
      more.current.querySelector("summary")?.focus();
    }
  };
  return <div className="mb-8 space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="max-w-2xl text-sm leading-relaxed text-bf-muted">A product view starts with its records and controls. Try secondary views, search, and the loading states. This specimen uses example content; Agora Storybook contains the application components.</p>
      <label className="flex items-center gap-2 text-xs text-bf-muted">Preview state
        <select value={state} onChange={event => setState(event.target.value as PreviewState)} className={`${control} border border-bf-border bg-bf-paper text-bf-text`}>
          {states.map(item => <option key={item}>{item}</option>)}
        </select>
      </label>
    </div>
    <div className="overflow-hidden rounded-lg border border-bf-border bg-bf-bg text-bf-text">
      <div className="flex items-center gap-3 border-b border-bf-border bg-bf-paper p-4">
        <img src="/logos/bfd-dark.svg" alt="BFD" className="h-10 w-12 rounded-md border border-bf-border bg-bf-paper object-contain p-1" />
        <span className="text-sm font-medium">Shared workspace</span>
        <a href="https://app.blackflag.design/admin/projects" className={`${control} ml-auto inline-flex items-center gap-1.5`} aria-label="Open Agora projects">Open Agora<ArrowUpRight aria-hidden="true" size={14} /></a>
      </div>
      <nav aria-label="Example project views" className="flex items-center gap-2 border-b border-bf-border p-2">
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {shownViews.map(item => <button key={item} type="button" aria-current={item === view ? "page" : undefined} onClick={() => selectView(item)} className={`${control} shrink-0 ${item === view ? "bg-bf-text text-bf-paper" : "text-bf-muted hover:bg-bf-surface"}`}>{item}</button>)}
        </div>
        <details ref={more} className="relative shrink-0" onKeyDown={event => {
          if (event.key === "Escape" && more.current) { more.current.open = false; more.current.querySelector("summary")?.focus(); }
        }}>
          <summary className={`${control} flex cursor-pointer list-none items-center gap-1.5 border border-bf-border bg-bf-paper [&::-webkit-details-marker]:hidden`}>{secondaryViews.includes(view) ? view : "More"}<ChevronDown aria-hidden="true" size={14} /></summary>
          <div className="absolute right-0 z-10 mt-1 w-40 rounded-md border border-bf-border bg-bf-paper p-1 shadow-sm">
            {secondaryViews.map(item => <button key={item} type="button" onClick={() => selectView(item)} className={`${control} block w-full text-left hover:bg-bf-surface`}>{item}</button>)}
          </div>
        </details>
      </nav>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search aria-hidden="true" size={16} className="absolute left-3 top-3 text-bf-muted" />
            <input aria-label={`Search example ${view.toLowerCase()}`} value={query} onChange={event => setQuery(event.target.value)} placeholder={`Search ${view.toLowerCase()}`} type="search" className="h-10 w-full rounded-md border border-bf-border bg-bf-paper pl-9 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bf-cobalt [&::-webkit-search-cancel-button]:hidden" />
            {query && <button type="button" aria-label="Clear example search" onClick={() => setQuery("")} className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center"><X aria-hidden="true" size={16} /></button>}
          </div>
          <button type="button" onClick={() => setState("Refreshing")} disabled={state === "Refreshing"} aria-label="Preview refreshing" className={`${control} border border-bf-border bg-bf-paper disabled:opacity-60`}><RefreshCw aria-hidden="true" size={16} /></button>
        </div>
        <div aria-label={`${view} example`} aria-busy={state === "First load" || state === "Refreshing"} className="min-h-40 overflow-hidden rounded-md border border-bf-border bg-bf-paper">
          {state === "First load" ? <div role="status" className="space-y-4 p-5"><span className="sr-only">Loading example records</span>{[1, 2].map(row => <div key={row} aria-hidden="true" className="h-10 rounded bg-bf-surface motion-safe:animate-pulse" />)}</div> : <>
            {state === "Refreshing" && <p role="status" className="border-b border-bf-border px-4 py-2 text-xs text-bf-muted">Refreshing. Current records remain available.</p>}
            {state === "Error" && <div role="alert" className="flex flex-wrap items-center justify-between gap-2 border-b border-bf-border px-4 py-3 text-sm"><span>Could not refresh. Your search and current records are kept.</span><button type="button" onClick={() => setState("Ready")} className={`${control} border border-bf-border`}>Try again</button></div>}
            {state === "Empty" || rows.length === 0 ? <div className="p-6 text-sm"><p>{query ? "No matching records." : "No records in this view yet."}</p>{query && <button type="button" onClick={() => setQuery("")} className={`${control} mt-3 border border-bf-border`}>Clear search</button>}</div> : <ul className="divide-y divide-bf-border">{rows.map(row => <li key={row} className="flex items-center gap-3 p-4"><span className="break-words text-sm">{row}</span></li>)}</ul>}
          </>}
        </div>
      </div>
    </div>
    <ul className="grid gap-3 text-sm leading-relaxed text-bf-muted sm:grid-cols-2">
      <li>Keep the selected secondary view visible. Preserve its URL when opening a feed, drawer, or dialog.</li>
      <li>Use first-load skeletons only before records arrive. Refresh preserves the current view and inputs.</li>
      <li>Keep names, source marks, menus, and useful recent work available on phones and before hover.</li>
      <li>Put occasional configuration behind disclosure. Keep every capability reachable by keyboard and touch.</li>
    </ul>
  </div>;
}
