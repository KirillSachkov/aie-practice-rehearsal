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

## Open for the next steps

- Stack and how to run the panel.
- How the panel detects "running" (to decide with the stack).
