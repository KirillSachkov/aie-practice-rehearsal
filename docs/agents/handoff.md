# Handing a task to a new session

A new session does not see earlier conversations. Everything it needs is in the repository and the tracker.

## The owner says

- The ticket or Issue number, and the skill to run: `implement <number>` for a ticket, `to-tickets <spec number>` to split a spec.
- For a small change without a spec: the change in own words, to be written as an Issue labelled `ready-for-agent`.
- Approval of a pull request, as a comment in it. Nothing else about the repo.

## The session finds itself

- The repository's purpose, the current case, where tasks live: `AGENTS.md`, `docs/agents/issue-tracker.md`.
- How to implement: `docs/agents/implementation.md` (branch, `tdd`, review, pull request, no merge without approval).
- How to test and what CI needs: `docs/agents/testing.md`, `cases/process-panel/AGENTS.md`.
- Terms and decisions: `cases/process-panel/GLOSSARY.md`, `cases/process-panel/docs/adr/`.
- The task itself: the Issue body, its parent spec and the acceptance scenario.

## The session does without asking

Pushes the branch and opens the pull request. It asks the owner only for a new significant decision or for approval to merge.
