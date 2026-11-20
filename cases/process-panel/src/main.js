const path = require('node:path');
const { startPanel } = require('./server');

const configPath = process.env.PANEL_CONFIG || path.join(__dirname, '..', 'projects.json');
const port = Number(process.env.PORT || 4000);

startPanel({ configPath, port }).then((panel) => {
  console.log(`Панель процессов: http://localhost:${panel.port}`);
});
