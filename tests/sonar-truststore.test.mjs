import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const workflow = readFileSync(new URL('../.github/workflows/sonar-scan.yml', import.meta.url), 'utf8');
test('public scanner uses the pinned clean trust store for launcher and engine', () => {
  const install = workflow.indexOf('uses: actions/setup-java@b6effb05e454b25005698d916606bdc6ffcbf961');
  assert.ok(install >= 0, 'missing pinned clean-JDK setup');
  assert.match(workflow, /distribution: temurin\n(?:          #[^\n]*\n)?          java-version: '21\.0\.13\+100000002\.0\.LTS'/);
  const setup = workflow.match(/^      - name: Use a clean scanner trust store\n        run: \|\n((?:          .*\n|\n)+)/m);
  assert.ok(setup, 'missing clean trust-store setup');
  assert.ok(install < setup.index && setup.index < workflow.indexOf('      - uses: actions/checkout@'));
  const script = setup[1].replace(/^          /gm, '');
  assert.ok(!script.includes('${{'));
  const directory = mkdtempSync(join(tmpdir(), 'sonar-trust-'));
  try {
    const home = join(directory, 'jdk with spaces');
    const store = join(home, 'lib/security/cacerts');
    mkdirSync(join(home, 'lib/security'), {recursive: true});
    writeFileSync(store, 'fixture');
    const output = join(directory, 'env');
    const result = spawnSync('bash', ['-euo', 'pipefail', '-c', script], {
      env: {PATH:process.env.PATH, GITHUB_ENV:output, JAVA_HOME:home,
        JAVA_TOOL_OPTIONS:'-Dbootstrap=kept -XX:-UseBASE64Intrinsics',
        SONAR_SCANNER_JAVA_OPTS:'-Dengine=kept -XX:-UseBASE64Intrinsics'},
      encoding:'utf8', timeout:10000,
    });
    assert.equal(result.status, 0, result.stderr);
    const values = Object.fromEntries(readFileSync(output,'utf8').trimEnd().split('\n').map(x => {
      const p = x.indexOf('='); return [x.slice(0,p),x.slice(p+1)];
    }));
    for (const name of ['JAVA_TOOL_OPTIONS','SONAR_SCANNER_JAVA_OPTS']) {
      assert.ok(values[name].includes('-XX:-UseBASE64Intrinsics'));
      assert.ok(values[name].includes(`-Djavax.net.ssl.trustStore="${store}"`));
    }
    assert.ok(values.JAVA_TOOL_OPTIONS.includes('-Dbootstrap=kept'));
    assert.ok(values.SONAR_SCANNER_JAVA_OPTS.includes('-Dengine=kept'));
    assert.equal(values.SONAR_SCANNER_SKIP_JRE_PROVISIONING, 'true');
  } finally { rmSync(directory, {recursive:true,force:true}); }
});
