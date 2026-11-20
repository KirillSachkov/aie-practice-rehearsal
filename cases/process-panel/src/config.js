const fs = require('node:fs');
const path = require('node:path');

// Reads the config and returns the listed Projects. Throws an Error with a readable message.
function loadProjects(configPath) {
  let raw;
  try {
    raw = fs.readFileSync(configPath, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error(`Не найден файл конфигурации: ${configPath}. Создайте его: {"projects": ["/путь/к/проекту"]}`);
    }
    throw new Error(`Файл конфигурации ${configPath} не открывается: ${e.code}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`Файл конфигурации ${configPath} не читается как JSON`);
  }
  if (!parsed || !Array.isArray(parsed.projects)) {
    throw new Error(`В файле ${configPath} нет списка "projects"`);
  }
  return parsed.projects.map((folder) => ({
    name: path.basename(folder),
    folder,
    exists: fs.existsSync(folder) && fs.statSync(folder).isDirectory(),
  }));
}

module.exports = { loadProjects };
