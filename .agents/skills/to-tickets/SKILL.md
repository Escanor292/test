---
name: to-tickets
description: Break a plan, spec, or conversation into tracer-bullet tickets, each declaring its blocking edges.
disable-model-invocation: true
---

Break work into vertical-slice tracer-bullet tickets.

Rules:
- Each slice is a complete path (schema/API/UI/tests where relevant), demoable alone.
- Sized for one context window.
- Declare blocking edges.
- Prefactor first when helpful.

Process: gather context → explore if needed → draft slices → quiz user → publish (local `.scratch/` files or GitHub issues).

Use `GLOSSARY.md` language. For local tickets use one file per ticket under `.scratch/<feature>/issues/`.
