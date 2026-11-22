# Agent Kit

Agent Kit is a harness for AI-assisted development: a shared part that serves any project, and cases that apply it. Each case is a practice project with its own skills, decisions and glossary. Good findings from a case move into the shared part.

## Shared part (repo root)

- Skills: `.agents/skills/` (Matt Pocock set; `.claude/skills` links here). Read a skill's `SKILL.md` before using it.
- Working rules and settings: `docs/agents/`. Read the matching file before the work it covers:
  - `issue-tracker.md`: where tasks and specs live and the `gh` commands for them.
  - `triage-labels.md`: the label vocabulary for issue states.
  - `domain.md`: where glossaries and ADRs live and how to read them.
  - `implementation.md`: the brief for implementing a ticket. Read it before any implementation.
  - `handoff.md`: what the owner names when giving a task, and what the session finds itself. Read it when you receive a task by ticket number.
- Glossary locations: `GLOSSARY-MAP.md`.

## Merging

An agent merges a pull request only after the owner's explicit approval, written as a comment in that pull request. The merge command asks the owner for confirmation (`.claude/settings.json`). A session with no terminal cannot answer it: after the approval comment, report the pull request link and the merge as the owner's step.

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
