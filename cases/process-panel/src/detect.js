const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function lsof(args) {
  try {
    return execFileSync('lsof', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    return e.stdout ? String(e.stdout) : ''; // lsof exits 1 when nothing matches
  }
}

// Listening TCP sockets: [{ pid, port }], lowest port first within a process.
function listeningSockets() {
  const out = lsof(['-nP', '-iTCP', '-sTCP:LISTEN', '-Fpn']);
  const sockets = [];
  let pid = null;
  for (const line of out.split('\n')) {
    if (line[0] === 'p') pid = Number(line.slice(1));
    else if (line[0] === 'n' && pid !== null) {
      const port = Number(line.slice(line.lastIndexOf(':') + 1));
      if (Number.isInteger(port)) sockets.push({ pid, port });
    }
  }
  return sockets.sort((a, b) => a.port - b.port);
}

function workingFolder(pid) {
  const out = lsof(['-a', '-p', String(pid), '-d', 'cwd', '-Fn']);
  const line = out.split('\n').find((l) => l[0] === 'n');
  return line ? line.slice(1) : null;
}

function isInside(folder, root) {
  const rel = path.relative(root, folder);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function realOrNull(p) {
  try {
    return fs.realpathSync(p);
  } catch (e) {
    return null;
  }
}

// For each listed project folder returns { pid, port } of its Dev process, or null.
// A process belongs to a Project when its working folder is the Project folder or inside it.
function findRunning(projectFolders) {
  const roots = projectFolders.map(realOrNull);
  const result = new Map(projectFolders.map((f) => [f, null]));
  if (roots.every((r) => r === null)) return result;
  const cwdByPid = new Map();
  for (const { pid, port } of listeningSockets()) {
    if (!cwdByPid.has(pid)) cwdByPid.set(pid, realOrNull(workingFolder(pid) || ''));
    const cwd = cwdByPid.get(pid);
    if (!cwd) continue;
    projectFolders.forEach((folder, i) => {
      if (roots[i] && !result.get(folder) && isInside(cwd, roots[i])) result.set(folder, { pid, port });
    });
  }
  return result;
}

module.exports = { findRunning };
