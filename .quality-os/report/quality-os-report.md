# Quality OS Report

- Repo: `/Users/keith/Documents/black-flag/Black Flag/bfd-style-guide`
- Profile: `node-cli`
- Maturity: `adopting`
- Status: `Pass`
- V0 decision: `ready`
- Required: 5 passed, 0 failed
- Optional: 1 passed, 11 failed


## Source And Fix Path

- Plugin/docs: https://github.com/black-flag-collective/bfd-plugins/tree/main/plugins/quality-os
- CLI source: https://github.com/black-flag-collective/quality-os-cli
- Submit plugin PR: https://github.com/black-flag-collective/bfd-plugins/compare
- Submit CLI PR: https://github.com/black-flag-collective/quality-os-cli/compare


## Next Actions

- `optional.knip` [optional]: Add Knip when the team can act on dead-code findings; keep it optional until then. Evidence: no Knip signal found Human: Add Knip when the team can act on dead-code findings; keep it optional until then. If the finding is wrong, inspect the Quality OS source and open a PR with a focused fixture or real-repo evidence. Agent: Use the JSON fields for `optional.knip` as source of truth. Do not bypass the gate. Apply the smallest repo-local fix, rerun `quality-os doctor --json`, and submit code changes in the target repo. If the Quality OS engine is wrong, submit a PR to the CLI source repo.
- `optional.coverage` [optional]: Add coverage reporting first; promote thresholds to required gates only after the baseline is understood. Evidence: no coverage script found Human: Add coverage reporting first; promote thresholds to required gates only after the baseline is understood. If the finding is wrong, inspect the Quality OS source and open a PR with a focused fixture or real-repo evidence. Agent: Use the JSON fields for `optional.coverage` as source of truth. Do not bypass the gate. Apply the smallest repo-local fix, rerun `quality-os doctor --json`, and submit code changes in the target repo. If the Quality OS engine is wrong, submit a PR to the CLI source repo.
- `optional.fallow` [optional]: Add fallow with baselines under `.fallow/` when the repo is ready for dead-code, health, and dupe audits. Evidence: no Fallow signal found Human: Add fallow with baselines under `.fallow/` when the repo is ready for dead-code, health, and dupe audits. If the finding is wrong, inspect the Quality OS source and open a PR with a focused fixture or real-repo evidence. Agent: Use the JSON fields for `optional.fallow` as source of truth. Do not bypass the gate. Apply the smallest repo-local fix, rerun `quality-os doctor --json`, and submit code changes in the target repo. If the Quality OS engine is wrong, submit a PR to the CLI source repo.


| Status | Required | Check | Actual | Remediation |
| --- | --- | --- | --- | --- |
| Pass | true | `quality-os.config` | found quality-os.config.json | No action. |
| Pass | false | `package-json.present` | package.json not found; native commands are declared in quality-os.config.json | No action. |
| Pass | true | `husky.pre-commit` | found .githooks/pre-commit and core.hooksPath is .githooks | No action. |
| Pass | true | `husky.pre-push` | found .githooks/pre-push and core.hooksPath is .githooks | No action. |
| Pass | true | `ci.github-actions` | found PR workflow running quality-os run for the pull-request gate | No action. |
| Pass | true | `unit-tests.colocated` | found focused test files | No action. |
| Fail | false | `optional.knip` | no Knip signal found | Add Knip when the team can act on dead-code findings; keep it optional until then. |
| Fail | false | `optional.coverage` | no coverage script found | Add coverage reporting first; promote thresholds to required gates only after the baseline is understood. |
| Fail | false | `optional.fallow` | no Fallow signal found | Add fallow with baselines under `.fallow/` when the repo is ready for dead-code, health, and dupe audits. |
| Fail | false | `optional.fallowBeacon` | no Fallow beacon signal found | Add the Fallow Cloud beacon when runtime coverage should roll up to the shared workspace. |
| Fail | false | `optional.wallace` | no Wallace signal found | Add Project Wallace thresholds when CSS bundle hygiene should be visible before promotion to required gates. |
| Fail | false | `optional.visualRegression` | no visual-regression signal found | Add Playwright snapshots or a visual-regression service after smoke tests are stable. |
| Fail | false | `optional.sonarqube` | no SonarQube config, script, pull-request workflow, or pullRequest gate found | Run SonarQube from pull-request CI against the shared Black Flag server; promote it to `gates.pullRequest` only after the baseline is owned. |
| Fail | false | `optional.agentEvals` | no agent-eval signal found | Add agent eval scripts when AI-assisted flows need regression coverage beyond unit tests. |
| Fail | false | `optional.alex` | no alex signal found | Add alex when markdown or JSX prose should be linted for inclusive language. |
| Fail | false | `optional.bundleBudget` | no bundle-budget signal found | Add size-limit or bundlewatch when client bundle regressions should be tracked. |
| Fail | false | `optional.scheduledReport` | no scheduled Quality OS report workflow found | Add a weekly `quality-os report` GitHub Actions job when the team wants trend visibility without blocking PRs. |
