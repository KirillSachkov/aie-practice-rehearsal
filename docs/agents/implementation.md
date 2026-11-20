# Implementation brief

Applies to every task from this repo's issue tracker, run through `implement` or `implement-spec`. The owner gives only a ticket number; this file holds the rest.

## Order of work

1. Branch from `main`, one branch per ticket (`implement`) or one integration branch per spec (`implement-spec`).
2. Build with `tdd`. Commit before review: the reviewer sees commits only.
3. Run `code-review` on the commits. Fix every confirmed finding, then review the touched places again.
4. Open a pull request: one per ticket with `implement`, one for the whole spec with `implement-spec`. Write the body with the `pr` skill: what changed, how it was checked, what the review found. Close the ticket from the pull request (`Closes #N`).
5. Wait for the owner's approval comment in the pull request, then merge (rule in `AGENTS.md`). After the merge confirm the tickets are closed in the tracker; close them by hand if not.

## Decisions

If a ticket needs a new significant decision, stop and ask the owner. Record the answer in the Issue, or in an ADR of the case when it is hard to reverse.
