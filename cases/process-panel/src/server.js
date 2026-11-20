const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { loadProjects } = require('./config');
const { findRunning } = require('./detect');

const PAGE = path.join(__dirname, '..', 'public', 'index.html');

function listProjects(configPath) {
  const projects = loadProjects(configPath);
  const running = findRunning(projects.filter((p) => p.exists).map((p) => p.folder));
  return projects.map((p) => {
    const devProcess = running.get(p.folder);
    const item = devProcess
      ? { name: p.name, state: 'Работает', port: devProcess.port }
      : { name: p.name, state: 'Остановлен', port: null };
    if (!p.exists) item.problem = `Папка не найдена: ${p.folder}`;
    return item;
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function handler(options) {
  return (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (req.method === 'GET' && pathname === '/api/projects') {
      try {
        sendJson(res, 200, { projects: listProjects(options.configPath) });
      } catch (e) {
        sendJson(res, 500, { error: e.message });
      }
      return;
    }
    if (req.method === 'GET' && pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(PAGE));
      return;
    }
    sendJson(res, 404, { error: 'Не найдено' });
  };
}

function startPanel({ configPath, port }) {
  const server = http.createServer(handler({ configPath }));
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({
        port: server.address().port,
        close: () => new Promise((done) => server.close(done)),
      });
    });
  });
}

module.exports = { startPanel };
