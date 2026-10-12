---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLOSSARY.md, or recording or editing an ADR.
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. This is the *active* discipline: challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise.

## File structure (this repo)

```
/
├── GLOSSARY.md
├── CODING_STANDARDS.md
├── AGENTS.md
└── docs/
    └── adr/
```

Create files lazily. Use domain terms from `GLOSSARY.md`. Respect `CODING_STANDARDS.md` and `AGENTS.md`.

## During the session

- Challenge terms that conflict with `GLOSSARY.md`.
- Sharpen fuzzy language into canonical terms.
- Stress-test with concrete scenarios (especially payment, KYC, digital warehouse, membership).
- Cross-reference with code; surface contradictions.
- Update `GLOSSARY.md` inline when a term is resolved (no implementation details).
- Offer ADRs only for hard-to-reverse, surprising, trade-off decisions → write to `docs/adr/`.
