---
name: implement
description: Implement a piece of work based on a spec or set of tickets.
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

If a ticket reference is given, fetch it and state its title first.

Call the Skill tool with "tdd" where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with "code-review".

Commit to the current branch. Respect `CODING_STANDARDS.md` and `AGENTS.md` (npm, no debug scripts, push author, etc.).
