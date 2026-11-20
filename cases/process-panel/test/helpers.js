const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'panel-test-'));
}

// Starts a throwaway Node server whose working folder is `cwd`. Resolves with { child, port }.
function startThrowawayServer(cwd) {
  const code = "require('http').createServer().listen(0,'127.0.0.1',function(){console.log(this.address().port)})";
  const child = spawn(process.execPath, ['-e', code], { cwd, stdio: ['ignore', 'pipe', 'inherit'] });
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.stdout.once('data', (d) => resolve({ child, port: Number(String(d).trim()) }));
  });
}

function stopChild(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) return resolve();
    child.once('exit', resolve);
    child.kill('SIGTERM');
  });
}

module.exports = { tmpDir, startThrowawayServer, stopChild };
