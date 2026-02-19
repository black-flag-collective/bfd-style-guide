import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { DeviceFrame } from "@/components/DeviceFrame/DeviceFrame";
import { GitHubCard, type GitHubCardData } from "./cards/GitHubCard";
import { LinearCard, type LinearCardData } from "./cards/LinearCard";
import { CursorSessionCard, type CursorSessionData } from "./cards/CursorSessionCard";
import { FeedbackCard, type FeedbackCardData } from "./cards/FeedbackCard";
import { CommitCard, type CommitCardData } from "./cards/CommitCard";
import { GitHubDrawer } from "./drawers/GitHubDrawer";
import { LinearDrawer } from "./drawers/LinearDrawer";
import { CursorDrawer } from "./drawers/CursorDrawer";
import { FeedbackDrawer } from "./drawers/FeedbackDrawer";
import { CommitDrawer } from "./drawers/CommitDrawer";
import { ClientGrid, CLIENTS } from "./shared/ClientGrid";

const ease = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════
 * CLIENT LOGOS — real from admin-app-convex seed data
 * ═══════════════════════════════════════════════════════════ */

const BF_LOGO = CLIENTS.find(c => c.slug === "black-flag")!.logoUrl!;
const HW_LOGO = CLIENTS.find(c => c.slug === "healthspan-wealth")!.logoUrl!;
const NCEE_LOGO = CLIENTS.find(c => c.slug === "ncee")!.logoUrl!;
const TOTUMAI_LOGO = CLIENTS.find(c => c.slug === "totumai")!.logoUrl!;
const NLM_LOGO = CLIENTS.find(c => c.slug === "national-library-of-medicine")!.logoUrl!;
const ADVISORPEDIA_LOGO = CLIENTS.find(c => c.slug === "advisorpedia")!.logoUrl!;
const VOLTAGE_LOGO = CLIENTS.find(c => c.slug === "voltage-control")!.logoUrl!;

/* ═══════════════════════════════════════════════════════════
 * SAMPLE DATA — real data from admin-app-convex
 * ═══════════════════════════════════════════════════════════ */

const githubSamples: GitHubCardData[] = [
  {
    eventType: "workflow_run",
    action: "completed",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    title: "Deploy to Production",
    body: "Workflow 'Deploy to Production' completed successfully on branch main. All 4 jobs passed in 2m 14s.",
    conclusion: "success",
    branch: "main",
    runNumber: 247,
    workflowName: "Deploy to Production",
    timestamp: "2m ago",
    preview: {
      kind: "workflow_steps",
      steps: [
        { name: "Install dependencies (npm ci)", conclusion: "success", durationMs: 3200 },
        { name: "Run ESLint", conclusion: "success", durationMs: 4800 },
        { name: "TypeScript check (tsc --noEmit)", conclusion: "success", durationMs: 8200 },
        { name: "Build application (vite build)", conclusion: "success", durationMs: 18400 },
        { name: "Deploy to Fly.io", conclusion: "success", durationMs: 38000 },
        { name: "Health check (HTTP 200)", conclusion: "success", durationMs: 1200 },
      ],
    },
    timeline: [
      { time: "2:34:02 PM", label: "Workflow queued", detail: "Triggered by push to main", status: "completed" },
      { time: "2:34:05 PM", label: "Job started: lint-and-type-check", status: "completed" },
      { time: "2:36:14 PM", label: "Workflow completed", detail: "4/4 jobs passed", status: "success" },
    ],
  },
  {
    eventType: "pull_request",
    action: "opened",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    title: "feat: add event card showcase to brand style guide",
    branch: "feat/event-cards",
    prNumber: 142,
    timestamp: "8m ago",
    preview: {
      kind: "file_changes",
      files: [
        { path: "src/components/EventCardsSection/shared/EventCard.tsx", additions: 142, deletions: 0, status: "added" },
        { path: "src/components/EventCardsSection/cards/GitHubCard.tsx", additions: 127, deletions: 0, status: "added" },
        { path: "src/components/EventCardsSection/cards/CursorSessionCard.tsx", additions: 147, deletions: 0, status: "added" },
        { path: "src/components/EventCardsSection/shared/EventBadge.tsx", additions: 68, deletions: 0, status: "added" },
        { path: "src/App.tsx", additions: 3, deletions: 1, status: "modified" },
        { path: "src/components/EventCardsSection/shared/SourcePip.tsx", additions: 95, deletions: 0, status: "added" },
        { path: "src/components/EventCardsSection/drawers/GitHubDrawer.tsx", additions: 210, deletions: 0, status: "added" },
      ],
    },
    timeline: [
      { time: "2:26 PM", label: "Pull request opened", detail: "#142 by kpatt1011", status: "completed" },
      { time: "2:30 PM", label: "Review requested", detail: "copilot (bot)", status: "pending" },
    ],
  },
  {
    eventType: "push",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/hw-front-door",
    projectName: "HW Front Door",
    clientLogoUrl: HW_LOGO,
    title: "Push to main · 3 commits",
    branch: "main",
    commitCount: 3,
    commitMessage: "feat: implement hero section with motion system",
    timestamp: "10m ago",
    preview: {
      kind: "commit_list",
      commits: [
        { sha: "a1b2c3d4e5f6", message: "feat: implement hero section with motion system", additions: 280, deletions: 12 },
        { sha: "d4e5f6a7b8c9", message: "fix: mobile nav overlay z-index conflict", additions: 8, deletions: 3 },
        { sha: "b7c8d9e0f1a2", message: "chore: update framer-motion to 11.18.0", additions: 45, deletions: 32 },
      ],
    },
    timeline: [
      { time: "2:26 PM", label: "Push completed", detail: "3 commits to main", status: "success" },
    ],
  },
  {
    eventType: "release",
    action: "published",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    title: "v2.4.0 — Event Card System",
    releaseTag: "v2.4.0",
    timestamp: "1h ago",
    preview: {
      kind: "release_notes",
      notes: "### What's New\n• Event card components for all 5 sources (GitHub, Linear, Cursor, Feedback, Commit)\n• Interactive drawers with Overview, Timeline, and Raw tabs\n• Client logo grid with 9 active clients\n• Device-responsive feed preview\n\n### Bug Fixes\n• Fixed TypeScript error in FeedbackCard icon prop\n• Resolved mobile viewport overflow in drawer overlay",
    },
    timeline: [
      { time: "1:30 PM", label: "Release published", detail: "v2.4.0 — Event Card System", status: "success" },
    ],
  },
  {
    eventType: "deployment_status",
    action: "created",
    senderLogin: "github-actions[bot]",
    repositoryFullName: "black-flag-collective/ncee-interactive-blueprint",
    projectName: "NCEE Blueprint",
    clientLogoUrl: NCEE_LOGO,
    title: "Production deployment succeeded",
    conclusion: "success",
    deployEnvironment: "production",
    deployState: "success",
    timestamp: "3m ago",
    preview: {
      kind: "workflow_steps",
      steps: [
        { name: "Build (vite build)", conclusion: "success", durationMs: 14200 },
        { name: "Push to Replit", conclusion: "success", durationMs: 8400 },
        { name: "Health check (HTTP 200 at /api/health)", conclusion: "success", durationMs: 2100 },
        { name: "Smoke test (Playwright)", conclusion: "success", durationMs: 12600 },
      ],
    },
    timeline: [
      { time: "2:36 PM", label: "Deployment status: success", status: "success" },
    ],
  },
  {
    eventType: "check_run",
    action: "completed",
    senderLogin: "github-actions[bot]",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    title: "TypeScript check passed",
    conclusion: "success",
    checkName: "type-check",
    prNumber: 142,
    timestamp: "9m ago",
    preview: {
      kind: "workflow_steps",
      steps: [
        { name: "npx tsc --noEmit (client)", conclusion: "success", durationMs: 3400 },
        { name: "npx tsc --noEmit (server)", conclusion: "success", durationMs: 2800 },
        { name: "npx tsc --noEmit (drizzle)", conclusion: "success", durationMs: 1200 },
        { name: "ESLint (0 errors, 2 warnings)", conclusion: "success", durationMs: 4600 },
      ],
    },
    timeline: [
      { time: "2:27 PM", label: "Check run completed", detail: "success", status: "success" },
    ],
  },
  {
    eventType: "issues",
    action: "opened",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/totumai-platform",
    projectName: "Totumai Platform",
    clientLogoUrl: TOTUMAI_LOGO,
    title: "#89 Dashboard charts not rendering on mobile viewport",
    issueNumber: 89,
    timestamp: "25m ago",
    preview: {
      kind: "issue_body",
      body: "Chart components fail to render below 768px width. ApexCharts responsive option needs configuration. Tested on iPhone 15 Pro and iPad Mini — charts show blank white area with no console errors. The issue appears to be in the chart container not receiving width from the CSS grid parent when the viewport collapses to single column.",
      labels: [
        { name: "bug", color: "#d73a4a" },
        { name: "mobile", color: "#0075ca" },
        { name: "P2", color: "#fbca04" },
      ],
    },
    timeline: [
      { time: "2:09 PM", label: "Issue opened", detail: "#89 by kpatt1011", status: "completed" },
      { time: "2:10 PM", label: "Assigned to kpatt1011", status: "completed" },
    ],
  },
  {
    eventType: "issue_comment",
    action: "created",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/advisorpedia-tools",
    projectName: "Advisorpedia Tools",
    clientLogoUrl: ADVISORPEDIA_LOGO,
    title: "Comment on #45: Content API rate limiting",
    issueNumber: 45,
    timestamp: "12m ago",
    preview: {
      kind: "review_body",
      body: "Implemented exponential backoff with jitter. Testing with 50 concurrent requests shows 0 failures now.\n\nThe retry config is:\n• Initial delay: 200ms\n• Max delay: 10s\n• Max retries: 5\n• Jitter: ±25%\n\nAlso added a circuit breaker that opens after 3 consecutive 429s. Ready for review — closing after merge.",
      state: "commented",
    },
    timeline: [
      { time: "2:22 PM", label: "Comment created", detail: "on issue #45", status: "completed" },
    ],
  },
  {
    eventType: "dependabot_alert",
    action: "created",
    senderLogin: "dependabot[bot]",
    repositoryFullName: "black-flag-collective/voltage-control-app",
    projectName: "Voltage Control App",
    clientLogoUrl: VOLTAGE_LOGO,
    title: "CVE-2026-1234: Prototype pollution in lodash",
    conclusion: "failure",
    timestamp: "6h ago",
    preview: {
      kind: "vulnerability",
      severity: "High",
      cvss: 7.4,
      package: "lodash@4.17.21",
      fixVersion: "4.17.22",
    },
    timeline: [
      { time: "8:15 AM", label: "Vulnerability detected", detail: "CVE-2026-1234 in lodash@4.17.21", status: "failure" },
      { time: "8:15 AM", label: "Fix available", detail: "Upgrade to lodash@4.17.22", status: "pending" },
    ],
  },
  {
    eventType: "pull_request_review",
    action: "submitted",
    senderLogin: "copilot[bot]",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    title: "Review: Approved #142",
    conclusion: "success",
    prNumber: 142,
    timestamp: "7m ago",
    preview: {
      kind: "review_body",
      body: "LGTM — types are consistent across all 5 card components. The EventCard grid template correctly constrains the 304px height. One minor suggestion: consider memoizing the badge variant lookup in GitHubCard since it runs on every render for 12 event types. Not blocking.",
      state: "approved",
    },
    timeline: [
      { time: "2:29 PM", label: "Review submitted: APPROVED", status: "success" },
    ],
  },
  {
    eventType: "workflow_run",
    action: "completed",
    senderLogin: "github-actions[bot]",
    repositoryFullName: "black-flag-collective/nlm-research-tools",
    projectName: "NLM Research Tools",
    clientLogoUrl: NLM_LOGO,
    title: "CI Pipeline — failure",
    conclusion: "failure",
    branch: "feat/pubmed-search",
    runNumber: 88,
    workflowName: "CI Pipeline",
    timestamp: "15m ago",
    preview: {
      kind: "workflow_steps",
      steps: [
        { name: "Install dependencies", conclusion: "success", durationMs: 4200 },
        { name: "Lint (ruff check)", conclusion: "success", durationMs: 1800 },
        { name: "Type check (mypy)", conclusion: "success", durationMs: 6400 },
        { name: "Run pytest", conclusion: "failure", durationMs: 22300 },
        { name: "Build Docker image", conclusion: "skipped" },
        { name: "Deploy to staging", conclusion: "skipped" },
      ],
    },
    timeline: [
      { time: "2:20 PM", label: "Step: Run pytest", detail: "3 tests FAILED", status: "failure" },
      { time: "2:20 PM", label: "Workflow completed", detail: "failure", status: "failure" },
    ],
  },
  {
    eventType: "pull_request",
    action: "closed",
    senderLogin: "kpatt1011",
    senderAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/hw-front-door",
    projectName: "HW Front Door",
    clientLogoUrl: HW_LOGO,
    title: "fix: resolve CLS shift in above-the-fold hero",
    conclusion: "success",
    branch: "fix/hero-cls",
    prNumber: 87,
    timestamp: "35m ago",
    preview: {
      kind: "file_changes",
      files: [
        { path: "src/components/Hero.tsx", additions: 12, deletions: 8, status: "modified" },
        { path: "src/styles/hero.css", additions: 4, deletions: 2, status: "modified" },
        { path: "tests/hero.test.tsx", additions: 24, deletions: 0, status: "added" },
      ],
    },
    timeline: [
      { time: "1:55 PM", label: "PR merged", detail: "#87 merged into main", status: "success" },
    ],
  },
];

const linearSamples: LinearCardData[] = [
  {
    eventType: "Issue",
    action: "update",
    actorName: "Keith Pattison",
    teamName: "Engineering",
    teamKey: "ENG",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    issueTitle: "Implement event card carousel for style guide",
    issueNumber: 247,
    issueState: "In Progress",
    issuePriority: 2,
    cycleName: "Sprint 12",
    timestamp: "5m ago",
    preview: {
      kind: "issue_description",
      description: "Build the event card showcase section in bfd-style-guide with interactive carousels for all 5 event source types. Each card type needs its own component with drawer detail views.",
      subIssues: [
        { title: "Create shared EventCard shell (304px grid)", state: "Done" },
        { title: "Build GitHubCard with 12 event type variants", state: "Done" },
        { title: "Build LinearCard with issue/comment/cycle/label types", state: "In Progress" },
        { title: "Build CursorSessionCard with turn navigation", state: "Todo" },
        { title: "Build FeedbackCard with 5 feedback kinds", state: "Todo" },
      ],
    },
    timeline: [
      { time: "11:00 AM", label: "Status changed", fromState: "Todo", toState: "In Progress" },
    ],
  },
  {
    eventType: "Comment",
    action: "create",
    actorName: "Keith Pattison",
    teamName: "Engineering",
    teamKey: "ENG",
    projectName: "NCEE Blueprint",
    clientLogoUrl: NCEE_LOGO,
    issueTitle: "Upgrade Replit deployment pipeline",
    issueNumber: 241,
    commentBody: "Replit deployment now uses the new build pipeline. Tested end-to-end: push to staging branch triggers auto-deploy in ~45s.",
    timestamp: "12m ago",
    preview: {
      kind: "comment",
      body: "Replit deployment now uses the new build pipeline. Tested end-to-end: push to staging branch triggers auto-deploy in ~45s.\n\nThe old manual deploy step is gone. New flow:\n1. Push to `staging` branch\n2. GitHub Action builds and pushes\n3. Replit picks up the new build automatically\n4. Health check confirms HTTP 200\n\nNo more SSH-ing into Replit to restart. Closing this one.",
    },
    timeline: [
      { time: "2:22 PM", label: "Comment created", detail: "on ENG-241" },
    ],
  },
  {
    eventType: "Issue",
    action: "update",
    actorName: "Keith Pattison",
    teamName: "Engineering",
    teamKey: "ENG",
    projectName: "Healthspan Wealth",
    clientLogoUrl: HW_LOGO,
    issueTitle: "Hero section motion system implementation",
    issueNumber: 312,
    issueState: "Done",
    issuePriority: 1,
    cycleName: "Sprint 12",
    timestamp: "45m ago",
    preview: {
      kind: "state_change",
      from: "In Progress",
      to: "Done",
      description: "Hero animation complete with Framer Motion. Entrance animations trigger on viewport intersection with staggered children. Parallax scroll background uses useScroll + useTransform for 0.5x rate. Mobile viewport overflow resolved by clamping container height to 100dvh.",
    },
    timeline: [
      { time: "1:25 PM", label: "Status changed", fromState: "In Progress", toState: "Done" },
    ],
  },
  {
    eventType: "Cycle",
    action: "update",
    actorName: "Keith Pattison",
    teamName: "Engineering",
    teamKey: "ENG",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    cycleName: "Sprint 12",
    description: "Sprint 12 progress: 18/24 issues completed (75%). 4 in progress, 2 in backlog. Ends Feb 21.",
    timestamp: "1h ago",
    preview: {
      kind: "cycle_progress",
      completed: 18,
      total: 24,
      inProgress: 4,
      backlog: 2,
      endDate: "Feb 21",
    },
    timeline: [
      { time: "1:30 PM", label: "Cycle updated", detail: "Sprint 12 — 75% complete" },
    ],
  },
  {
    eventType: "Label",
    action: "create",
    actorName: "Keith Pattison",
    teamName: "Engineering",
    teamKey: "ENG",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    labelName: "brand-system",
    labelColor: "#6366f1",
    description: "New label for Brand System v2 related issues.",
    timestamp: "2h ago",
    preview: {
      kind: "label_info",
      labels: [
        { name: "brand-system", color: "#6366f1" },
        { name: "design-tokens", color: "#06b6d4" },
        { name: "style-guide", color: "#f59e0b" },
        { name: "component-library", color: "#10b981" },
      ],
    },
    timeline: [
      { time: "12:34 PM", label: "Label created", detail: "'brand-system' #6366f1" },
    ],
  },
  {
    eventType: "Issue",
    action: "update",
    actorName: "Keith Pattison",
    teamName: "Client Success",
    teamKey: "CS",
    projectName: "Totumai Platform",
    clientLogoUrl: TOTUMAI_LOGO,
    issueTitle: "Client onboarding flow missing email verification step",
    issueNumber: 56,
    issueState: "In Progress",
    issuePriority: 2,
    cycleName: "Sprint 12",
    timestamp: "20m ago",
    preview: {
      kind: "issue_description",
      description: "New clients can complete onboarding without verifying their email address. The verification step was removed during the auth refactor (ENG-312). Need to re-add it after the Clerk SSO redirect but before the workspace creation step. This affects all new signups — existing users are already verified.",
    },
    timeline: [
      { time: "2:14 PM", label: "Status changed", fromState: "Todo", toState: "In Progress" },
    ],
  },
  {
    eventType: "Issue",
    action: "create",
    actorName: "Keith Pattison",
    teamName: "Engineering",
    teamKey: "ENG",
    projectName: "NLM Research Tools",
    clientLogoUrl: NLM_LOGO,
    issueTitle: "PubMed search API returning stale cached results",
    issueNumber: 178,
    issueState: "Backlog",
    issuePriority: 3,
    timestamp: "3h ago",
    preview: {
      kind: "issue_description",
      description: "PubMed search results are cached for 24 hours by the CDN but the NCBI API returns different results for the same query within minutes. Our users are seeing outdated paper counts and missing recent publications. Need to either reduce cache TTL or implement cache invalidation based on PubMed's Last-Modified header.",
    },
    timeline: [
      { time: "11:15 AM", label: "Issue created", detail: "ENG-178" },
    ],
  },
];

const cursorSamples: CursorSessionData[] = [
  {
    userName: "Keith Pattison",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    branch: "main",
    model: "claude-4-opus",
    stateLabel: "Responding",
    isActive: true,
    cost: "$0.42",
    duration: "4m 12s",
    eventCount: 38,
    subagentCount: 2,
    firstPrompt: "I need you to identify all the types of events that are happening or are possible in the admin-app-convex project and give me a detailed plan...",
    agentOutputs: [
      "Subagent: explore admin-app-convex event types",
      "Subagent: explore bfd-style-guide structure",
      "Read: UnifiedEventCard.tsx",
      "Read: event-card-constants.ts",
    ],
    activity: { prompts: 3, edits: 12, shells: 4, reads: 22 },
    timestamp: "just now",
    timeline: [
      { type: "session_start", model: "claude-4-opus", composerMode: "agent", gitBranch: "main", time: "0:00" },
      { type: "user_prompt", text: "I need you to identify all the types of events that are happening or are possible in the admin-app-convex project and give me a detailed plan for how we can add carousels of new designs in the new brand system...", time: "0:00" },
      { type: "agent_thought", text: "The user wants me to explore all event types in admin-app-convex and plan new card designs. I need to understand the data shapes for GitHub, Linear, Cursor, Feedback, and Commit events.", durationMs: 2100, time: "0:02" },
      { type: "file_read", filePath: "src/apps/admin/components/events/types.ts", totalLines: 89, time: "0:03" },
      { type: "file_read", filePath: "src/apps/admin/components/events/UnifiedEventCard.tsx", lineRange: "1-45", totalLines: 312, time: "0:04" },
      { type: "grep_search", pattern: "eventType.*=", filesMatched: 8, matchCount: 23, time: "0:05" },
      { type: "glob_search", pattern: "**/events/**/*.tsx", filesFound: 24, time: "0:06" },
      { type: "semantic_search", query: "How are cursor session events structured and rendered?", targetDir: "src/apps/admin/components/events/", resultsCount: 12, time: "0:07" },
      { type: "subagent_launch", description: "Explore all event types in admin-app-convex", subagentType: "explore", model: "fast", time: "0:08" },
      { type: "file_read", filePath: "app/convex/schema.ts", lineRange: "502-594", totalLines: 642, time: "0:09" },
      { type: "file_read", filePath: "src/apps/admin/components/events/cursor-drawer/chat-helpers.ts", totalLines: 156, time: "0:10" },
      { type: "subagent_result", description: "Found 5 event sources with 20+ GitHub types, 16 Linear types, 9 cursor categories", durationMs: 18200, time: "0:26" },
      { type: "subagent_launch", description: "Explore bfd-style-guide architecture", subagentType: "explore", model: "fast", time: "0:27" },
      { type: "subagent_result", description: "Astro 5 + React, Tailwind v4 @theme tokens, Framer Motion", durationMs: 12400, time: "0:39" },
      { type: "todo_write", tasksCount: 10, taskPreview: "Create shared EventCard shell with 4-zone grid", time: "0:40" },
      { type: "agent_response", durationMs: 3200, time: "0:43" },
      { type: "user_prompt", text: "Implement the plan as specified. Don't stop until you have completed all the to-dos.", time: "0:44" },
      { type: "file_write", filePath: "src/components/sections/EventCardsSection/shared/EventCard.tsx", contentPreview: "export function EventCard({ source, avatarUrl, ...}: EventCardProps) {\n  return <motion.div className={`group relative grid h-[304px]...`}", time: "0:50" },
      { type: "file_write", filePath: "src/components/sections/EventCardsSection/shared/EventBadge.tsx", time: "0:52" },
      { type: "file_write", filePath: "src/components/sections/EventCardsSection/cards/GitHubCard.tsx", contentPreview: "const eventBadgeVariant: Record<string, BadgeVariant> = {\n  workflow_run: 'github-cicd',\n  pull_request: 'github-code',...}", time: "1:00" },
      { type: "file_write", filePath: "src/components/sections/EventCardsSection/cards/CursorSessionCard.tsx", time: "1:10" },
      { type: "shell_command", command: "npx astro check", exitCode: 1, durationMs: 7800, output: "FeedbackCard.tsx:17 - error TS2322: Type 'ForwardRefExoticComponent<...>' not assignable", time: "1:20" },
      { type: "file_edit", filePath: "src/components/sections/EventCardsSection/cards/FeedbackCard.tsx", oldString: "icon: React.FC<{ size?: number }>", newString: "variant: BadgeVariant; gradient: string", time: "1:22" },
      { type: "read_lints", filePath: "src/components/sections/EventCardsSection/cards/FeedbackCard.tsx", errorCount: 0, warningCount: 0, time: "1:24" },
      { type: "shell_command", command: "npx astro check", exitCode: 0, durationMs: 8400, output: "Result (76 files): 0 errors, 0 warnings, 11 hints", time: "3:50" },
      { type: "file_edit", filePath: "src/App.tsx", oldString: "<VoiceSection />", newString: "<VoiceSection />\n          <EventCardsSection />", time: "3:55" },
      { type: "agent_response", durationMs: 1800, time: "4:00" },
      { type: "session_end", totalDurationMs: 252000, totalEvents: 38, time: "4:12" },
    ],
  },
  {
    userName: "Keith Pattison",
    projectName: "Healthspan Wealth",
    clientLogoUrl: HW_LOGO,
    branch: "feat/hero-motion",
    model: "claude-4-opus",
    stateLabel: "Completed",
    isActive: false,
    cost: "$1.87",
    duration: "18m 45s",
    eventCount: 64,
    subagentCount: 4,
    firstPrompt: "Implement the hero section with the motion system. Use Framer Motion for entrance animations and the parallax scroll background.",
    lastPrompt: "Fix the mobile viewport overflow and verify build",
    agentOutputs: [
      "Write: Hero.tsx (above-the-fold section)",
      "Write: ScrollBackground.tsx (parallax)",
      "Shell: npm run dev — build successful",
      "Edit: tailwind.config.ts — add brand tokens",
    ],
    activity: { prompts: 8, edits: 34, shells: 12, reads: 45 },
    timestamp: "22m ago",
    timeline: [
      { type: "session_start", model: "claude-4-opus", composerMode: "agent", gitBranch: "feat/hero-motion", time: "0:00" },
      { type: "user_prompt", text: "Implement the hero section with the motion system. Use Framer Motion for entrance animations and the parallax scroll background.", time: "0:00" },
      { type: "file_read", filePath: "src/styles/brand-tokens.css", totalLines: 84, time: "0:03" },
      { type: "file_read", filePath: "tailwind.config.ts", totalLines: 120, time: "0:04" },
      { type: "web_search", searchTerm: "framer motion parallax scroll background react 2026", time: "0:08" },
      { type: "file_write", filePath: "src/components/Hero.tsx", contentPreview: "export function Hero() {\n  return (\n    <section className='relative min-h-screen'>\n      <motion.div initial={{ opacity: 0, y: 60 }}...", time: "0:30" },
      { type: "file_write", filePath: "src/components/ScrollBackground.tsx", time: "0:45" },
      { type: "shell_command", command: "npm run dev", exitCode: 0, durationMs: 3200, time: "1:00" },
      { type: "mcp_tool", serverName: "cursor-ide-browser", toolName: "browser_navigate", filePath: "http://localhost:4321", time: "1:05" },
      { type: "mcp_tool", serverName: "cursor-ide-browser", toolName: "browser_take_screenshot", time: "1:10" },
      { type: "agent_response", durationMs: 2400, time: "1:15" },
      { type: "session_end", totalDurationMs: 1125000, totalEvents: 64, time: "18:45" },
    ],
  },
  {
    userName: "Keith Pattison",
    projectName: "BFD Admin Apps",
    clientLogoUrl: BF_LOGO,
    branch: "main",
    model: "claude-4-opus",
    stateLabel: "Completed",
    isActive: false,
    isSubagent: true,
    cost: "$0.08",
    duration: "45s",
    eventCount: 12,
    firstPrompt: "Explore all event types in the admin-app-convex project. Look at schema, types, and component files.",
    agentOutputs: [
      "Glob: **/events/**",
      "Read: schema.ts (lines 502-594)",
      "Read: types.ts",
      "Grep: EventSource",
    ],
    activity: { prompts: 1, edits: 0, shells: 0, reads: 8 },
    timestamp: "24m ago",
    timeline: [
      { type: "session_start", model: "fast", composerMode: "explore", gitBranch: "main", time: "0:00" },
      { type: "user_prompt", text: "Explore all event types in the admin-app-convex project.", time: "0:00" },
      { type: "glob_search", pattern: "**/events/**/*.{ts,tsx}", filesFound: 32, time: "0:02" },
      { type: "file_read", filePath: "app/src/apps/admin/components/events/types.ts", totalLines: 89, time: "0:04" },
      { type: "grep_search", pattern: "EventSource|eventType", filesMatched: 14, matchCount: 47, time: "0:06" },
      { type: "file_read", filePath: "app/convex/schema.ts", lineRange: "502-594", totalLines: 642, time: "0:08" },
      { type: "file_read", filePath: "app/convex/cursorTelemetry/cardSummary.ts", totalLines: 92, time: "0:10" },
      { type: "file_read", filePath: "app/convex/linearWebhooks/helpers.ts", lineRange: "1-40", totalLines: 87, time: "0:16" },
      { type: "agent_response", durationMs: 800, time: "0:45" },
    ],
  },
];

const feedbackSamples: FeedbackCardData[] = [
  {
    kind: "text",
    userName: "Sarah Chen",
    userEmail: "sarah.chen@ncee.org",
    projectName: "NCEE Blueprint",
    clientLogoUrl: NCEE_LOGO,
    text: "The sidebar navigation contrast in dark mode is too low. Active state indicator barely visible against the dark surface background.",
    status: "Backlog",
    severity: "minor",
    url: "https://ncee-blueprint.replit.app/admin/events",
    viewport: "1920×1080",
    userAgent: "Chrome 121, macOS Sonoma",
    timestamp: "15m ago",
    timeline: [
      { time: "2:19 PM", label: "Feedback submitted", detail: "Text feedback via widget" },
      { time: "2:19 PM", label: "Page captured", detail: "ncee-blueprint.replit.app/admin/events" },
      { time: "2:19 PM", label: "Environment recorded", detail: "1920×1080, Chrome 121, macOS" },
      { time: "2:19 PM", label: "Severity assessed: minor" },
      { time: "2:19 PM", label: "Received by Black Flag" },
    ],
  },
  {
    kind: "voice",
    userName: "Marcus Johnson",
    userEmail: "marcus@healthspanwealth.com",
    projectName: "HW Front Door",
    clientLogoUrl: HW_LOGO,
    text: "Audio transcript: The event feed loads slowly when filtering by Cursor events. Hangs for 3 seconds with ~200 events on the All tab.",
    transcript: "The event feed loads slowly when filtering by Cursor events. Hangs for 3 seconds with about 200 events on the All tab.",
    transcriptionStatus: "completed",
    status: "In Progress",
    severity: "major",
    url: "https://staging.healthspanwealth.com/dashboard",
    timestamp: "1h ago",
    timeline: [
      { time: "1:34 PM", label: "Feedback submitted", detail: "Voice recording via widget" },
      { time: "1:34 PM", label: "Audio uploaded", detail: "12.4s recording, 148KB" },
      { time: "1:35 PM", label: "Transcription completed", detail: "Whisper API, 1.2s" },
      { time: "1:35 PM", label: "Severity assessed: major" },
      { time: "2:00 PM", label: "Status changed to In Progress" },
      { time: "2:00 PM", label: "Received by Black Flag" },
    ],
  },
  {
    kind: "element",
    userName: "Emily Rodriguez",
    userEmail: "emily.r@totumai.net",
    projectName: "Totumai Platform",
    clientLogoUrl: TOTUMAI_LOGO,
    text: "Save button hover state uses wrong blue. Should be the brand palette color, not the default browser focus blue.",
    status: "Todo",
    severity: "minor",
    url: "https://app.totumai.net/clients",
    selector: "button.btn-primary[data-action='save-client']",
    viewport: "1440×900",
    userAgent: "Safari 17.2.1, macOS",
    timestamp: "3h ago",
    timeline: [
      { time: "11:24 AM", label: "Feedback submitted", detail: "Element annotation via widget" },
      { time: "11:24 AM", label: "Element captured", detail: "button.btn-primary[data-action='save-client']" },
      { time: "11:24 AM", label: "Screenshots taken", detail: "Full page + element crop" },
      { time: "11:24 AM", label: "Severity assessed: minor" },
      { time: "11:24 AM", label: "Received by Black Flag" },
    ],
  },
  {
    kind: "location",
    userName: "Alex Turner",
    userEmail: "alex@advisorpedia.com",
    projectName: "Advisorpedia Tools",
    clientLogoUrl: ADVISORPEDIA_LOGO,
    text: "The analytics map not centering on initial load. Shows default world view instead of user's last viewed region.",
    status: "Backlog",
    severity: "minor",
    url: "https://tools.advisorpedia.com/analytics/geo",
    viewport: "2560×1440",
    timestamp: "5h ago",
    timeline: [
      { time: "9:18 AM", label: "Feedback submitted", detail: "Location feedback via widget" },
      { time: "9:18 AM", label: "Location recorded", detail: "Geo coordinates captured" },
      { time: "9:18 AM", label: "Severity assessed: minor" },
      { time: "9:18 AM", label: "Received by Black Flag" },
    ],
  },
  {
    kind: "document",
    userName: "Jordan Lee",
    userEmail: "jordan.lee@nlm.nih.gov",
    projectName: "NLM Research Tools",
    clientLogoUrl: NLM_LOGO,
    text: "PDF export missing header logo and page numbers overlap footer on pages 3-5. Tested with Chrome print preview.",
    status: "In Progress",
    severity: "major",
    url: "https://research.nlm.nih.gov/reports/export",
    viewport: "1920×1080",
    timestamp: "2h ago",
    timeline: [
      { time: "12:45 PM", label: "Feedback submitted", detail: "Document annotation via widget" },
      { time: "12:45 PM", label: "Document reference captured" },
      { time: "12:45 PM", label: "Severity assessed: major" },
      { time: "1:15 PM", label: "Status changed to In Progress" },
      { time: "1:15 PM", label: "Received by Black Flag" },
    ],
  },
];

const commitSamples: CommitCardData[] = [
  {
    sha: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    message: "feat: add event card showcase to brand style guide\n\nAdds EventCardsSection with card and drawer components\nfor all 5 event sources. Interactive drawers with tabs.",
    authorName: "Keith Pattison",
    authorLogin: "kpatt1011",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Style Guide",
    clientLogoUrl: BF_LOGO,
    branch: "main",
    additions: 1840,
    deletions: 12,
    changedFiles: 18,
    htmlUrl: "https://github.com/black-flag-collective/bfd-admin-apps/commit/a1b2c3d",
    linkedPr: { number: 142, title: "feat: add event card showcase to brand style guide" },
    files: [
      { path: "src/components/sections/EventCardsSection/shared/EventCard.tsx", additions: 142, deletions: 0, status: "added" },
      { path: "src/components/sections/EventCardsSection/shared/EventBadge.tsx", additions: 68, deletions: 0, status: "added" },
      { path: "src/components/sections/EventCardsSection/shared/SourcePip.tsx", additions: 95, deletions: 0, status: "added" },
      { path: "src/components/sections/EventCardsSection/cards/GitHubCard.tsx", additions: 127, deletions: 0, status: "added" },
      { path: "src/components/sections/EventCardsSection/cards/CursorSessionCard.tsx", additions: 147, deletions: 0, status: "added" },
      { path: "src/App.tsx", additions: 3, deletions: 1, status: "modified" },
    ],
    timestamp: "5m ago",
  },
  {
    sha: "f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0",
    message: "fix: resolve TypeScript error in FeedbackCard icon type\n\nRemoved unused LucideProps icon property from kindConfig.",
    authorName: "Keith Pattison",
    authorLogin: "kpatt1011",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/bfd-admin-apps",
    projectName: "BFD Style Guide",
    clientLogoUrl: BF_LOGO,
    branch: "feat/event-cards",
    additions: 4,
    deletions: 12,
    changedFiles: 1,
    files: [
      { path: "src/components/sections/EventCardsSection/cards/FeedbackCard.tsx", additions: 4, deletions: 12, status: "modified" },
    ],
    timestamp: "22m ago",
  },
  {
    sha: "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    message: "feat: implement motion system for Healthspan Wealth hero\n\nAdds Framer Motion entrance animations, parallax scroll,\nand responsive viewport handling.",
    authorName: "Keith Pattison",
    authorLogin: "kpatt1011",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    repositoryFullName: "black-flag-collective/hw-front-door",
    projectName: "HW Front Door",
    clientLogoUrl: HW_LOGO,
    branch: "main",
    additions: 342,
    deletions: 28,
    changedFiles: 6,
    files: [
      { path: "src/components/Hero.tsx", additions: 180, deletions: 0, status: "added" },
      { path: "src/components/ScrollBackground.tsx", additions: 95, deletions: 0, status: "added" },
      { path: "src/styles/brand-tokens.css", additions: 24, deletions: 8, status: "modified" },
      { path: "tailwind.config.ts", additions: 18, deletions: 12, status: "modified" },
      { path: "src/App.tsx", additions: 8, deletions: 4, status: "modified" },
      { path: "src/components/OldHero.tsx", additions: 0, deletions: 4, status: "removed" },
    ],
    timestamp: "50m ago",
  },
];

/* ═══════════════════════════════════ */

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true }}
      className="mb-14"
    >
      <h3 className="text-sm font-medium mb-5 uppercase tracking-wider" style={{ color: "var(--bf-text)" }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function CardRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

type DrawerState =
  | { source: "github"; index: number }
  | { source: "linear"; index: number }
  | { source: "cursor"; index: number }
  | { source: "feedback"; index: number }
  | { source: "commit"; index: number }
  | null;

export function EventCardsSection() {
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const closeDrawer = () => setDrawer(null);

  return (
    <section id="event-cards" className="relative bg-white border-t-4 border-bf-gold py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            number="14"
            title="Event Cards"
            description="Card and drawer patterns for multi-source event feeds. Each source has distinct visual identity within a unified card shell. Click any card to open its detail drawer."
          />

          {/* ── Clients Grid ── */}
          <SubSection title="Clients">
            <ClientGrid />
          </SubSection>

          {/* ── Card Shell Anatomy ── */}
          <SubSection title="Card Shell Anatomy">
            <div className="rounded-xl border-2 border-bf-border p-5 mb-4" style={{ backgroundColor: "var(--bf-paper)" }}>
              <div
                className="rounded-lg border-2 border-dashed border-bf-muted/30 h-[304px] grid overflow-hidden"
                style={{ gridTemplateColumns: "56px 1fr", gridTemplateRows: "auto 1fr auto" }}
              >
                <div className="row-span-3 flex flex-col items-center justify-center border-r border-dashed border-bf-muted/30">
                  <span className="text-[10px] font-mono text-bf-teal">A</span>
                  <span className="text-[9px] text-bf-muted mt-1">Avatar</span>
                  <span className="text-[8px] text-bf-muted">+ client logo</span>
                </div>
                <div className="flex items-center justify-center border-b border-dashed border-bf-muted/30 py-3">
                  <span className="text-[10px] font-mono text-bf-cobalt">B</span>
                  <span className="text-[9px] text-bf-muted ml-1">actor name · project name</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[10px] font-mono text-bf-amber">C</span>
                  <span className="text-[9px] text-bf-muted ml-1">Body — title + description</span>
                </div>
                <div className="flex items-center justify-center border-t border-dashed border-bf-muted/30 py-3">
                  <span className="text-[10px] font-mono text-bf-mint">D</span>
                  <span className="text-[9px] text-bf-muted ml-1">tags + timestamp + watermark</span>
                </div>
              </div>
            </div>
            <div className="bg-bf-paper border border-bf-border rounded-lg p-5">
              <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Card Shell Spec</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-muted)" }}>
                <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>304px</span> fixed height</div>
                <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>56px</span> identity rail</div>
                <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>16×16px</span> client logo on avatar</div>
                <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>vendor watermark</span> in footer</div>
              </div>
            </div>
          </SubSection>

          {/* ── Responsive Feed Preview ── */}
          <SubSection title="Responsive Feed Preview">
            <p className="text-sm text-bf-muted mb-4 max-w-xl">
              How the event card feed adapts across desktop, tablet, and mobile
              breakpoints. Cards remain full-width single-column at every size.
            </p>
            <DeviceFrame desktopHeight={380} tabletHeight={380} mobileHeight={380}>
              {({ device }) => (
                <div style={{ height: "100%", overflowY: "auto", padding: device === "mobile" ? 8 : 16, background: "#FAFAFA" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: device === "mobile" ? 8 : 12 }}>
                    <GitHubCard data={githubSamples[0]} selected={false} onClick={() => {}} />
                    <LinearCard data={linearSamples[0]} selected={false} onClick={() => {}} />
                    <FeedbackCard data={feedbackSamples[0]} selected={false} onClick={() => {}} />
                  </div>
                </div>
              )}
            </DeviceFrame>
          </SubSection>

          {/* ── GitHub Events ── */}
          <SubSection title={`GitHub Events — ${githubSamples.length} types`}>
            <CardRow>
              {githubSamples.map((data, i) => (
                <GitHubCard key={i} data={data} selected={drawer?.source === "github" && drawer.index === i} onClick={() => setDrawer({ source: "github", index: i })} />
              ))}
            </CardRow>
          </SubSection>

          {/* ── Linear Events ── */}
          <SubSection title={`Linear Events — ${linearSamples.length} types`}>
            <CardRow>
              {linearSamples.map((data, i) => (
                <LinearCard key={i} data={data} selected={drawer?.source === "linear" && drawer.index === i} onClick={() => setDrawer({ source: "linear", index: i })} />
              ))}
            </CardRow>
          </SubSection>

          {/* ── Cursor Sessions ── */}
          <SubSection title={`Cursor Sessions — ${cursorSamples.length} examples`}>
            <CardRow>
              {cursorSamples.map((data, i) => (
                <CursorSessionCard key={i} data={data} selected={drawer?.source === "cursor" && drawer.index === i} onClick={() => setDrawer({ source: "cursor", index: i })} />
              ))}
            </CardRow>
          </SubSection>

          {/* ── Feedback ── */}
          <SubSection title={`Feedback — ${feedbackSamples.length} kinds`}>
            <CardRow>
              {feedbackSamples.map((data, i) => (
                <FeedbackCard key={i} data={data} selected={drawer?.source === "feedback" && drawer.index === i} onClick={() => setDrawer({ source: "feedback", index: i })} />
              ))}
            </CardRow>
          </SubSection>

          {/* ── Commits ── */}
          <SubSection title={`Commits — ${commitSamples.length} examples`}>
            <CardRow>
              {commitSamples.map((data, i) => (
                <CommitCard key={i} data={data} selected={drawer?.source === "commit" && drawer.index === i} onClick={() => setDrawer({ source: "commit", index: i })} />
              ))}
            </CardRow>
          </SubSection>

          {/* ── Spec Table ── */}
          <div className="bg-bf-paper border border-bf-border rounded-lg p-5">
            <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: "var(--bf-text)" }}>Rendering Spec</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" style={{ color: "var(--bf-muted)" }}>
              <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>clientLogoUrl</span> from clients table</div>
              <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>projectName</span> from projects table</div>
              <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>opacity-50</span> logo in header</div>
              <div><span className="font-mono" style={{ color: "var(--bf-text)" }}>opacity-40</span> logo in rail</div>
            </div>
          </div>
        </div>
      </div>

      {drawer?.source === "github" && <GitHubDrawer open={true} onClose={closeDrawer} data={githubSamples[drawer.index]} />}
      {drawer?.source === "linear" && <LinearDrawer open={true} onClose={closeDrawer} data={linearSamples[drawer.index]} />}
      {drawer?.source === "cursor" && <CursorDrawer open={true} onClose={closeDrawer} data={cursorSamples[drawer.index]} />}
      {drawer?.source === "feedback" && <FeedbackDrawer open={true} onClose={closeDrawer} data={feedbackSamples[drawer.index]} />}
      {drawer?.source === "commit" && <CommitDrawer open={true} onClose={closeDrawer} data={commitSamples[drawer.index]} />}
    </section>
  );
}
