const { spawn } = require('node:child_process');
const net = require('node:net');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'panel-test-'));
}

const SERVER = "require('http').createServer().listen(0,'127.0.0.1',function(){console.log(this.address().port)})";
// The same server started by a parent Node process, like `npm run dev` starts a server through npm.
const SERVER_VIA_PARENT = `require('child_process').spawn(process.execPath,['-e',${JSON.stringify(SERVER)}],{stdio:['ignore','inherit','inherit']});setInterval(function(){},1000)`;

// Starts a throwaway Node server whose working folder is `cwd`, in its own process group
// (or in the group of the test runner with `sameGroup`).
// Resolves with { child, port }. With `viaParent` the port is held by a child of the process we started.
function startThrowawayServer(cwd, { viaParent = false, sameGroup = false } = {}) {
  const child = spawn(process.execPath, ['-e', viaParent ? SERVER_VIA_PARENT : SERVER], {
    cwd,
    detached: !sameGroup,
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.stdout.once('data', (d) => resolve({ child, port: Number(String(d).trim()) }));
  });
}

// Ends the whole process group of a throwaway server (safe to call when it is already gone).
function stopChild(child) {
  for (const target of [-child.pid, child.pid]) {
    try {
      process.kill(target, 'SIGTERM');
    } catch (e) {
      // already gone, or not a group leader
    }
  }
  return new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) return resolve();
    child.once('exit', resolve);
  });
}

// Resolves true when nothing listens on the port.
function portIsFree(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' });
    socket.once('connect', () => { socket.destroy(); resolve(false); });
    socket.once('error', () => resolve(true));
  });
}

module.exports = { tmpDir, startThrowawayServer, stopChild, portIsFree };
