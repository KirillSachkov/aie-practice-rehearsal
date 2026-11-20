# Process panel: summary of the design discussion

Saved so that a new session can continue the discussion (steps: stack, spec).

## Why

The owner runs several local projects with `npm run dev` and forgets some. Forgotten processes hold ports, so the next start fails with "port in use". The owner wants one place that shows which projects are running and a way to stop them.

## First version tracks

- Only Node projects started through `npm run dev` (a project is a folder with `package.json`).
- Only projects listed in a config file in the case folder (folder paths). See ADR 0001.
- Not tracked in version 1: Docker containers, projects without `package.json`, processes the owner did not list.

## What the owner can do

- See each listed project with its state (`Работает` with the port, or `Остановлен`).
- Stop a running project (required). Stop ends the whole dev process and frees the port.
- Refresh the list (a button; no live updates in version 1).
- Not in version 1: start, restart, logs.

## Decisions recorded

- Terms: `GLOSSARY.md` of this case.
- ADR 0001: the panel stops only listed projects.

## Stack and launch (step 3)

- Node.js, built-in `http`, one HTML page, no dependencies. ADR 0002 (with rejected options: FastAPI, Go, Electron/Tauri, Express).
- Detection: `lsof` for listening ports and the process working folder; Stop: SIGTERM to the process group. No prototype: the agent and the owner saw no open fork (the owner uses macOS; `lsof` is built in).
- Run: `npm start`, open `http://localhost:4000`. Written in `cases/process-panel/AGENTS.md`.

## Open for the next steps

- Specification and tickets: acceptance scenario and what version 1 does not do.
