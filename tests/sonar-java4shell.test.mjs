// Run without installing the website: node --test tests/sonar-java4shell.test.mjs
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const flag = '-XX:-UseBASE64Intrinsics';
const workflow = readFileSync(new URL('../.github/workflows/sonar-scan.yml', import.meta.url), 'utf8');

test('every public Sonar scan inherits bootstrap and engine protection, preserving JVM options', () => {
  const setup = workflow.match(/^      - name: Mitigate Java4Shell in scanner JVMs\n        run: \|\n((?:          .*\n|\n)+)/m);
  assert.ok(setup, 'missing trusted scanner JVM mitigation');
  assert.ok(setup.index < workflow.indexOf('      - uses: actions/checkout@'), 'mitigate before checkout');
  const script = setup[1].replace(/^          /gm, '');
  assert.ok(!script.includes('${{'), 'no head-controlled expressions in JVM options');
  const scans = workflow.match(/^      - name: [^\n]+\n        uses: SonarSource\/sonarqube-scan-action@[^\n]+\n(?:        [^\n]*\n|          [^\n]*\n)*/gm);
  assert.equal(scans?.length, 1);
  assert.ok(!scans[0].includes('JAVA_TOOL_OPTIONS:'), 'scan step must not shadow bootstrap protection');
  assert.ok(!scans[0].includes('SONAR_SCANNER_JAVA_OPTS:'), 'scan step must not shadow engine protection');
  assert.match(workflow, /runs-on: ubuntu-latest/);
  assert.match(workflow, /github\.event\.pull_request\.head\.repo\.full_name == github\.repository/);
  assert.match(workflow, /npm ci --ignore-scripts --no-audit --no-fund/);
  for (const original of [{}, { JAVA_TOOL_OPTIONS: '', SONAR_SCANNER_JAVA_OPTS: '' }, {
    JAVA_TOOL_OPTIONS: '-Xmx96m -Dfixture="two words" -XX:+UseBASE64Intrinsics',
    SONAR_SCANNER_JAVA_OPTS: '-Xmx128m -Dfixture.engine=kept -XX:+UseBASE64Intrinsics',
  }]) {
    const directory = mkdtempSync(join(tmpdir(), 'sonar-java4shell-'));
    try {
      const output = join(directory, 'github-env');
      const result = spawnSync('bash', ['-euo', 'pipefail', '-c', script], {
        cwd: directory, env: { PATH: process.env.PATH, ...original, GITHUB_ENV: output }, encoding: 'utf8', timeout: 10000,
      });
      assert.equal(result.status, 0, result.stderr);
      const env = Object.fromEntries(readFileSync(output, 'utf8').trimEnd().split('\n').map(line => {
        const at = line.indexOf('=');
        return [line.slice(0, at), line.slice(at + 1)];
      }));
      assert.deepEqual(Object.keys(env).sort(), ['JAVA_TOOL_OPTIONS', 'SONAR_SCANNER_JAVA_OPTS']);
      for (const name of Object.keys(env)) {
        assert.equal(env[name], (original[name] ? `${original[name]} ` : '') + flag);
        assert.ok(!env[name].includes('UseAVX'));
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }
});
