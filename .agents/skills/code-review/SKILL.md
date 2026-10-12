---
name: code-review
description: Review the changes since a fixed point along two axes: Standards (CODING_STANDARDS.md + AGENTS.md + smells) and Spec (originating issue/spec). Use when reviewing a branch, PR, or work since a commit.
---

Two-axis review of the diff between `HEAD` and a fixed point the user supplies:

- **Standards**: does the code conform to `CODING_STANDARDS.md`, `AGENTS.md`, and good design?
- **Spec**: does the code faithfully implement the originating issue / spec?

## Process

1. Pin the fixed point (`git diff <fixed-point>...HEAD`).
2. Find the spec (issue, docs/, or ask).
3. Standards sources: `CODING_STANDARDS.md`, `AGENTS.md`, `GLOSSARY.md`, plus Fowler smells (Mysterious Name, Duplicated Code, Feature Envy, Shotgun Surgery, etc.).
4. Report Standards and Spec separately. Do not merge them into one score.

End with the worst issue per axis.

On this platform, pay special attention to:
- Payment / settlement / digital warehouse grant paths
- KYC and admin-only routes
- Prisma schema changes without migration
- Secrets or .env handling
