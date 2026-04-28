#!/usr/bin/env node
import { spawn } from "node:child_process";
const inCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
const scope = inCI ? "CI" : "local";
const ceiling = inCI ? 300 : 90;
const start = Date.now();
const child = spawn("npm", ["run", "--silent", "check:pipeline"], { stdio: "inherit", env: process.env });
const t = setTimeout(() => { console.error(`\ncheck-budget: ${scope} ceiling ${ceiling}s exceeded by >30s — hard-killing.`); child.kill("SIGKILL"); }, (ceiling + 30) * 1000);
child.on("exit", (code, signal) => {
  clearTimeout(t);
  const e = (Date.now() - start) / 1000;
  console.log(`\n${e <= ceiling ? "✓" : "✗"} check-budget: ${scope.padEnd(5)} wall time ${e.toFixed(1)}s (ceiling ${ceiling}s)`);
  const over = e > ceiling;
  if (!code && over) console.error(`\nBUDGET EXCEEDED: ${scope} took ${e.toFixed(1)}s > ${ceiling}s.`);
  process.exit(code || (over ? 2 : 0) || (signal ? 1 : 0));
});
