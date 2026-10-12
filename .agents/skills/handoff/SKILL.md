---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
disable-model-invocation: true
---

Write a handoff document summarising the conversation so a fresh agent can continue. Save to OS temp dir (`$TMPDIR` / `/tmp`), not the workspace.

Include a "suggested skills" section naming which skills the next agent should use.

Do not duplicate content already in specs, ADRs, issues, commits — reference by path.

Redact secrets and PII.
