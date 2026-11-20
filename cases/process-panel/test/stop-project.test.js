const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { startPanel } = require('../src/server');
const { tmpDir, startThrowawayServer, stopChild, portIsFree } = require('./helpers');

async function withPanel(projectNames, fn) {
  const dir = tmpDir();
  const folders = projectNames.map((n) => {
    const f = path.join(dir, n);
    fs.mkdirSync(f);
    return f;
  });
  const configPath = path.join(dir, 'projects.json');
  fs.writeFileSync(configPath, JSON.stringify({ projects: [folders[0]] }));
  const panel = await startPanel({ configPath, port: 0 });
  const base = `http://127.0.0.1:${panel.port}`;
  const list = async () => (await (await fetch(`${base}/api/projects`)).json()).projects;
  const stop = (name) => fetch(`${base}/api/projects/${encodeURIComponent(name)}/stop`, { method: 'POST' });
  try {
    await fn({ folders, list, stop });
  } finally {
    await panel.close();
  }
}

test('Stop ends the dev process with its child and frees the port', async () => {
  await withPanel(['alpha'], async ({ folders, list, stop }) => {
    const { child, port } = await startThrowawayServer(folders[0], { viaParent: true });
    try {
      assert.strictEqual((await list())[0].state, 'Работает');
      const res = await stop('alpha');
      assert.strictEqual(res.status, 200);
      assert.strictEqual((await res.json()).result, 'stopped');
      assert.strictEqual(await portIsFree(port), true);
      assert.strictEqual((await list())[0].state, 'Остановлен');
    } finally {
      await stopChild(child);
    }
  });
});

test('Stop works when the dev process shares the panel\'s process group, and the panel survives', async () => {
  await withPanel(['alpha'], async ({ folders, list, stop }) => {
    const { child, port } = await startThrowawayServer(folders[0], { viaParent: true, sameGroup: true });
    try {
      const res = await stop('alpha');
      assert.strictEqual((await res.json()).result, 'stopped');
      assert.strictEqual(await portIsFree(port), true);
      assert.strictEqual((await list())[0].state, 'Остановлен'); // the panel still answers
    } finally {
      await stopChild(child);
    }
  });
});

test('Stop on a stopped project changes nothing and answers clearly', async () => {
  await withPanel(['alpha'], async ({ list, stop }) => {
    const res = await stop('alpha');
    assert.strictEqual(res.status, 200);
    assert.strictEqual((await res.json()).result, 'not-running');
    assert.strictEqual((await list())[0].state, 'Остановлен');
  });
});

test('Stop on a name that is not listed leaves other processes alone', async () => {
  await withPanel(['alpha', 'unlisted'], async ({ folders, stop }) => {
    const { child, port } = await startThrowawayServer(folders[1]);
    try {
      const res = await stop('unlisted');
      assert.strictEqual(res.status, 404);
      assert.ok((await res.json()).error);
      assert.strictEqual(await portIsFree(port), false);
    } finally {
      await stopChild(child);
    }
  });
});

test('the page has a Stop button', async () => {
  await withPanel(['alpha'], async () => {});
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert.match(html, /Остановить/);
});
