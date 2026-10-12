---
name: improve-codebase-architecture
description: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
disable-model-invocation: true
---

Surface architectural friction and propose deepening opportunities (shallow → deep modules).

Use vocabulary from the `codebase-design` skill (module, interface, depth, seam, adapter, leverage, locality). Use domain terms from `GLOSSARY.md`. Do not re-litigate existing ADRs unless friction is real.

Process:
1. Scope to hot spots (recent commits) or user-named area.
2. Explore for shallow modules, low locality, hard-to-test seams.
3. Write a self-contained HTML report (temp dir) with before/after visuals.
4. User picks one → call grilling + domain-modeling as decisions crystallize.
