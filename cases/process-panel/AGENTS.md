# Process panel: working in this case

A local web page that lists the owner's dev projects and stops running ones. Terms: `GLOSSARY.md`. Decisions: `docs/adr/`.

## Run

1. Copy `projects.example.json` to `projects.json` (ignored by git) and list the absolute folders of your projects.
2. Start: `npm start` from this folder.
3. Open: `http://localhost:4000`.
4. Stop the panel: Ctrl+C in the terminal that runs it.

## Test

`npm test` from this folder (Node 24). The tests start real throwaway Node servers, so they need `lsof` (macOS and Linux). They cover the HTTP interface of the panel; `test/e2e-npm-dev.test.js` starts the real panel and a project with `npm run dev` and stops it. CI runs the same command (`.github/workflows/test.yml`).

## Check the panel

Follow the acceptance scenario of the spec (Issue #1) on a real running project:

1. Make a project folder with a `dev` script that starts a server, for example `/tmp/aie-rehearsal-demo`, and list it in `projects.json`.
2. Run `npm run dev` in that folder and `npm start` in this one.
3. Open `http://localhost:4000`: the project shows `Работает` and its port.
4. Press «Остановить»: the project shows `Остановлен` and its address no longer opens. The list refreshes by itself every 5 seconds; «Обновить» reloads it at once.
5. Stop the processes you started, by their PIDs.

## Stack

Node.js, built-in `http` module, plain HTML page. No dependencies. Reasons and rejected options: `docs/adr/0002-node-stack-without-framework.md`.
