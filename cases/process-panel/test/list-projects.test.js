const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { startPanel } = require('../src/server');
const { tmpDir } = require('./helpers');


async function withPanel(configPath, fn) {
  const panel = await startPanel({ configPath, port: 0 });
  try {
    await fn(`http://127.0.0.1:${panel.port}`);
  } finally {
    await panel.close();
  }
}

test('lists each configured project as stopped', async () => {
  const dir = tmpDir();
  const projectA = path.join(dir, 'alpha');
  const projectB = path.join(dir, 'beta');
  fs.mkdirSync(projectA);
  fs.mkdirSync(projectB);
  const configPath = path.join(dir, 'projects.json');
  fs.writeFileSync(configPath, JSON.stringify({ projects: [projectA, projectB] }));

  await withPanel(configPath, async (base) => {
    const res = await fetch(`${base}/api/projects`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.deepStrictEqual(
      body.projects.map((p) => [p.name, p.state]),
      [['alpha', 'Остановлен'], ['beta', 'Остановлен']],
    );
  });
});

test('a missing config gives a readable message, not a crash', async () => {
  const dir = tmpDir();
  await withPanel(path.join(dir, 'nope.json'), async (base) => {
    const res = await fetch(`${base}/api/projects`);
    assert.strictEqual(res.status, 500);
    const body = await res.json();
    assert.match(body.error, /projects\.json|nope\.json/);
  });
});

test('a missing project folder is reported on that project', async () => {
  const dir = tmpDir();
  const missing = path.join(dir, 'ghost');
  const configPath = path.join(dir, 'projects.json');
  fs.writeFileSync(configPath, JSON.stringify({ projects: [missing] }));

  await withPanel(configPath, async (base) => {
    const body = await (await fetch(`${base}/api/projects`)).json();
    assert.strictEqual(body.projects.length, 1);
    assert.strictEqual(body.projects[0].name, 'ghost');
    assert.match(body.projects[0].problem, /не найдена/);
  });
});

test('serves the page with a refresh button', async () => {
  const dir = tmpDir();
  const configPath = path.join(dir, 'projects.json');
  fs.writeFileSync(configPath, JSON.stringify({ projects: [] }));

  await withPanel(configPath, async (base) => {
    const res = await fetch(`${base}/`);
    assert.strictEqual(res.status, 200);
    assert.match(await res.text(), /Обновить/);
  });
});

test('the list answers a request with a query string', async () => {
  const dir = tmpDir();
  const configPath = path.join(dir, 'projects.json');
  fs.writeFileSync(configPath, JSON.stringify({ projects: [] }));

  await withPanel(configPath, async (base) => {
    const res = await fetch(`${base}/api/projects?t=1`);
    assert.strictEqual(res.status, 200);
  });
});
