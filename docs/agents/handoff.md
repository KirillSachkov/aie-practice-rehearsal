# Handing a task to a new session

A new session sees no earlier conversation. Everything it needs is in the repository and the tracker, except the two facts only the owner has.

## The owner names

- The ticket number, with the skill: `implement <number>`.
- The base branch: where the work branches from and where the pull request goes (`main`, or a run branch such as `run/2026-11-23-ch1-step6`).
- Approval to merge, as a comment in the pull request.

## The session finds itself

- Purpose, current case, where tasks live: `AGENTS.md`, `docs/agents/issue-tracker.md`.
- Order of work, branch name, pull request, closing: `docs/agents/implementation.md`.
- Run and check the case: `cases/process-panel/AGENTS.md`.
- Terms and decisions: `cases/process-panel/GLOSSARY.md`, `cases/process-panel/docs/adr/`.
- The task: the Issue body, its parent spec, the acceptance criteria.

## Ends with

A pull request into the base branch and its link in the report. The merge follows the owner's approval comment (`AGENTS.md`, Merging).
