# Agent Kit

Agent Kit is a harness for AI-assisted development: a shared part that serves any project, and cases that apply it. Each case is a practice project with its own skills, decisions and glossary. Good findings from a case move into the shared part.

## Shared part (repo root)

- Skills: `.agents/skills/` (Matt Pocock set; `.claude/skills` links here). Read a skill's `SKILL.md` before using it.
- Working rules and settings: `docs/agents/`. Read the matching file before the work it covers:
  - `issue-tracker.md`: where tasks and specs live and the `gh` commands for them.
  - `triage-labels.md`: the label vocabulary for issue states.
  - `domain.md`: where glossaries and ADRs live and how to read them.
  - `implementation.md`: the brief for implementing a ticket. Read it before any implementation.
  - `testing.md`: testing rules and CI. Read it before writing or changing tests or the CI workflow.
  - `handoff.md`: how a task is handed to a new session: what the owner says, what the session finds itself. Read it when starting any task from a ticket number.
- Glossary locations: `GLOSSARY-MAP.md`.

## Merging

An agent merges a pull request only after the owner's explicit approval, written by the owner as a comment in that pull request. The agent asks for that comment and waits; it posts no approval itself and states no check it did not run. The merge command asks the owner for confirmation (`.claude/settings.json`). Changes reach `main` only through a pull request.

## Cases (`cases/`)

Each case folder holds what applies to that case only: glossary, ADRs, code, tests.

- `cases/process-panel/`: the current case, a panel that shows running processes and stops them. Work happens here now. Before working in it, read `cases/process-panel/AGENTS.md` (run command, address, stack).

## Agent skills

### Issue tracker

Issues live in GitHub Issues of this repo (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five labels: needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix. See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context: one glossary per case folder, listed in `GLOSSARY-MAP.md`. See `docs/agents/domain.md`.
