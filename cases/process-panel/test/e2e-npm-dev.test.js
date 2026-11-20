// End to end: the real panel process stops a project that is started with `npm run dev`,
// the way the owner starts it (npm -> shell -> node).
const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { tmpDir, portIsFree } = require('./helpers');

const MAIN = path.join(__dirname, '..', 'src', 'main.js');

function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return false;
  }
}

// Starts a command in its own process group and resolves with the first capture of `pattern` in its output.
function startAndWait(command, args, options, pattern) {
  const child = spawn(command, args, { detached: true, stdio: ['ignore', 'pipe', 'inherit'], ...options });
  return new Promise((resolve, reject) => {
    let text = '';
    child.once('error', reject);
    child.stdout.on('data', (d) => {
      text += d;
      const m = text.match(pattern);
      if (m) resolve({ child, value: m[1] });
    });
  });
}

function endGroup(child) {
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch (e) {
    // already gone
  }
}

test('the panel process stops a project started with npm run dev', async () => {
  const dir = tmpDir();
  const project = path.join(dir, 'demo');
  fs.mkdirSync(project);
  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify({ scripts: { dev: 'node server.js' } }));
  fs.writeFileSync(
    path.join(project, 'server.js'),
    "require('http').createServer().listen(0,'127.0.0.1',function(){console.log('listening '+this.address().port)})",
  );
  const configPath = path.join(dir, 'projects.json');
  fs.writeFileSync(configPath, JSON.stringify({ projects: [project] }));

  const dev = await startAndWait('npm', ['run', 'dev'], { cwd: project }, /listening (\d+)/);
  const projectPort = Number(dev.value);
  const panel = await startAndWait(process.execPath, [MAIN], { env: { ...process.env, PORT: '0', PANEL_CONFIG: configPath } }, /localhost:(\d+)/);
  const base = `http://127.0.0.1:${panel.value}`;
  try {
    const before = (await (await fetch(`${base}/api/projects`)).json()).projects[0];
    assert.deepStrictEqual([before.state, before.port], ['Работает', projectPort]);

    const res = await fetch(`${base}/api/projects/demo/stop`, { method: 'POST' });
    assert.strictEqual((await res.json()).result, 'stopped');

    assert.strictEqual(await portIsFree(projectPort), true);
    assert.strictEqual(alive(dev.child.pid), false, 'the npm process is gone too');
    const after = (await (await fetch(`${base}/api/projects`)).json()).projects[0];
    assert.strictEqual(after.state, 'Остановлен');
  } finally {
    endGroup(dev.child);
    endGroup(panel.child);
  }
});
