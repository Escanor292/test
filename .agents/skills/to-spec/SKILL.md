---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

Synthesize a spec from the current conversation. Do NOT interview. Use `GLOSSARY.md` vocabulary and respect ADRs.

1. Explore the repo if needed.
2. Sketch test seams (prefer existing high seams). Confirm with user.
3. Write the spec with: Problem Statement, Solution, User Stories (long numbered list), Implementation Decisions, Testing Decisions, Out of Scope, Further Notes.
4. Publish to the issue tracker (or save under docs/ if no tracker configured).

Do not include specific file paths or code snippets unless from a prototype that encodes a decision.
