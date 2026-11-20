# Process panel: working in this case

A local web page that lists the owner's dev projects and stops running ones. Terms: `GLOSSARY.md`. Decisions: `docs/adr/`.

## Run

- Start: `npm start` from this folder.
- Open: `http://localhost:4000`.
- Stop the panel: Ctrl+C in the terminal that runs it.

## Stack

Node.js, built-in `http` module, plain HTML page. No dependencies. Reasons and rejected options: `docs/adr/0002-node-stack-without-framework.md`.
