# Testing rules

Apply to every case. Case-specific commands live in the case's `AGENTS.md`.

## Where tests go

- Test through the public interface of the thing (for the process panel: its HTTP interface), with real processes and files in a temp folder. A test checks what the owner can observe, so it survives refactors.
- Use `tdd`. Write the failing test first. When a test passes at once, break the code on purpose and watch the test fail, then restore it.
- Cover each kind below once the case has the thing it checks:
  - **Interface tests**: one per behaviour in a ticket's acceptance criteria.
  - **End-to-end test**: the real program started the way the owner starts it, driven through its interface, for the main scenario of the spec.
  - **Unit tests**: only for pure logic with many edge cases (parsers).

## Page behaviour

The process panel has no browser test (a browser would be a dependency, ADR 0002). A change that only affects the page gets a manual check from the owner, written in the pull request; extract logic into a module and test it when the page logic grows beyond a few lines.

## Every test cleans up

A test stops the processes it started, by PID or process group, and leaves no port open. Kills by process name are not allowed.

## CI

`.github/workflows/test.yml` runs `npm test` of the case on every pull request and on `main`, on Linux and macOS. A pull request merges only when this check is green; `main` accepts changes only through a pull request.

## Before a pull request

Run the case's test command locally and quote the result in the pull request body.
