# Implementation brief

Applies to every task from this repo's issue tracker, run through `implement` or `implement-spec`. The owner gives only a ticket number; this file holds the rest.

## Order of work

1. Branch from `main`, one branch per ticket (`implement`) or one integration branch per spec (`implement-spec`).
2. Build with `tdd`. Commit before review: the reviewer sees commits only.
3. Run `code-review` on the commits. Fix every confirmed finding, then review the touched places again.
4. Push the branch and open a pull request without asking for permission: one per ticket with `implement`, one for the whole spec with `implement-spec`. Write the body with the `pr` skill: what changed, how it was checked, what the review found. Close the ticket from the pull request (`Closes #N`).
5. Report the pull request link and what the owner must check (the Issue's «how to check»; the agent does not run the owner's acceptance for them, and states only checks it ran). Wait for the owner's approval comment in the pull request, then merge (rule in `AGENTS.md`). After the merge confirm the tickets are closed in the tracker; close them by hand if not.

## Behaviour that tests cannot reach

Case tests run through the HTTP interface. For behaviour in a page (timers, buttons) that no test reaches, say so in the pull request body under the review findings and list the owner's manual check; the owner decides whether it needs a browser test.

## Decisions

If a ticket needs a new significant decision, stop and ask the owner. Record the answer in the Issue, or in an ADR of the case when it is hard to reverse.
