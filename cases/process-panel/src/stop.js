const { execFileSync } = require('node:child_process');
const { findRunning } = require('./detect');

const WAIT_MS = 3000;

function groupOf(pid) {
  try {
    return Number(execFileSync('ps', ['-o', 'pgid=', '-p', String(pid)], { encoding: 'utf8' }).trim());
  } catch (e) {
    return null;
  }
}

function descendantsOf(pid) {
  const rows = execFileSync('ps', ['-A', '-o', 'pid=,ppid='], { encoding: 'utf8' })
    .trim().split('\n').map((l) => l.trim().split(/\s+/).map(Number));
  const found = [];
  const queue = [pid];
  while (queue.length) {
    const parent = queue.shift();
    for (const [child, ppid] of rows) {
      if (ppid === parent) { found.push(child); queue.push(child); }
    }
  }
  return found;
}

function signal(pid, sig) {
  try {
    process.kill(pid, sig);
  } catch (e) {
    // the process is already gone
  }
}

// Sends SIGTERM to the process group of the dev process. When that group is the panel's own
// group, the panel would end itself, so it signals the process and its descendants instead.
function terminate(pid) {
  const group = groupOf(pid);
  if (group && group !== groupOf(process.pid)) {
    signal(-group, 'SIGTERM');
  } else {
    [pid, ...descendantsOf(pid)].forEach((p) => signal(p, 'SIGTERM'));
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Stops the dev process of a listed Project. Returns 'stopped', 'not-running' or 'stuck'.
async function stopProject(folder) {
  const found = findRunning([folder]).get(folder);
  if (!found) return 'not-running';
  terminate(found.pid);
  const deadline = Date.now() + WAIT_MS;
  while (Date.now() < deadline) {
    if (!findRunning([folder]).get(folder)) return 'stopped';
    await sleep(100);
  }
  return 'stuck';
}

module.exports = { stopProject };
