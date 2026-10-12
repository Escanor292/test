---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests. Especially for payment, KYC, digital warehouse, membership flows.
---

# Test-Driven Development

TDD is the red → green loop. This skill is the reference that makes that loop produce tests worth keeping.

When exploring the codebase, read `GLOSSARY.md` so test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching. Also follow `CODING_STANDARDS.md`.

## What a good test is

Tests verify behavior through public interfaces, not implementation details.

## Seams: where tests go

A **seam** is the public boundary you test at. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, write down the seams under test and confirm them with the user.

Critical seams on this platform:
- Pledge creation + payment method selection (ONLINE vs COD)
- Settlement success → digital warehouse grant / certificate / membership activation
- Refund → revoke asset
- KYC submit / confirm

## Anti-patterns

- Implementation-coupled tests
- Tautological assertions
- Horizontal slicing (all tests then all code)

## Rules of the loop

- Red before green.
- One slice at a time.
- Refactoring belongs to the review stage (`code-review`), not the red-green cycle.
