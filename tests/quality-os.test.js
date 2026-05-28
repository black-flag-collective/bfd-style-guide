const assert = require("node:assert/strict");
const { existsSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");

const root = join(__dirname, "..");

test("style guide preview app is wired for Quality OS", () => {
  assert.equal(existsSync(join(root, "preview-app", "package.json")), true);
  assert.equal(existsSync(join(root, "quality-os.config.json")), true);
});
