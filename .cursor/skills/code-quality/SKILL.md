---
name: code-quality
description: bfd-style-guide compliance snapshot for v3.1. Astro static site. Iter-7 minimum-viable adoption.
---

# Code Quality: bfd-style-guide

Astro static site. Iteration 7 in the v3.1 rollout — minimum-viable adoption.

## Gated today
- TypeScript via `npm run check:pipeline` (= `astro check`)
- Wall-time budget (A1)
- Daily code-quality report (cron 12:00 UTC)

## Compliance gaps
ESLint, husky hooks, fallow, Wallace, alex prose, audit baseline, coverage, theme tokens, contrast, visual regression. The repo has an in-flight `rebuild-from-eli-bfd` branch that may obviate some of these — coordinate adoption with the rebuild.

## Doctrine
Tighter is free. Loosening a threshold requires a commit-message justification.
