---
name: implement-spec
description: Implement a whole spec on one integration branch. Works tickets as a task graph with parallel implementer subagents across the ready frontier, then closes with code-review.
disable-model-invocation: true
---

Implement an entire spec by treating tickets as a task graph.

Run implementer subagents on the ready frontier (tickets whose blockers are done) for concurrency. Land everything on one integration branch. Finish with code-review.

Respect platform rules in AGENTS.md and CODING_STANDARDS.md.
