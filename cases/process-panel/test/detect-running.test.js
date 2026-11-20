const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { startPanel } = require('../src/server');
const { tmpDir, startThrowawayServer, stopChild } = require('./helpers');

function setup(projectNames) {
  const dir = tmpDir();
  const folders = projectNames.map((n) => {
    const f = path.join(dir, n);
    fs.mkdirSync(f);
    return f;
  });
  const configPath = path.join(dir, 'projects.json');
  return { dir, folders, configPath, writeConfig: (list) => fs.writeFileSync(configPath, JSON.stringify({ projects: list })) };
}

async function listProjects(configPath) {
  const panel = await startPanel({ configPath, port: 0 });
  try {
    return (await (await fetch(`http://127.0.0.1:${panel.port}/api/projects`)).json()).projects;
  } finally {
    await panel.close();
  }
}

test('a running project shows its port, then Остановлен after the process ends', async () => {
  const s = setup(['alpha']);
  s.writeConfig(s.folders);
  const { child, port } = await startThrowawayServer(s.folders[0]);
  try {
    const running = await listProjects(s.configPath);
    assert.deepStrictEqual([running[0].state, running[0].port], ['Работает', port]);
  } finally {
    await stopChild(child);
  }
  const stopped = await listProjects(s.configPath);
  assert.deepStrictEqual([stopped[0].state, stopped[0].port], ['Остановлен', null]);
});

test('a process in a subfolder of the project belongs to the project', async () => {
  const s = setup(['alpha']);
  s.writeConfig(s.folders);
  const sub = path.join(s.folders[0], 'server');
  fs.mkdirSync(sub);
  const { child, port } = await startThrowawayServer(sub);
  try {
    const projects = await listProjects(s.configPath);
    assert.deepStrictEqual([projects[0].state, projects[0].port], ['Работает', port]);
  } finally {
    await stopChild(child);
  }
});

test('a process in a folder that is not listed is not in the list', async () => {
  const s = setup(['alpha', 'unlisted']);
  s.writeConfig([s.folders[0]]);
  const { child } = await startThrowawayServer(s.folders[1]);
  try {
    const projects = await listProjects(s.configPath);
    assert.deepStrictEqual(projects.map((p) => [p.name, p.state]), [['alpha', 'Остановлен']]);
  } finally {
    await stopChild(child);
  }
});
