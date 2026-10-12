---
name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions. Use when the user says diagnose/debug or reports something broken, throwing, failing, or slow.
---

# Diagnosing Bugs

Discipline for hard bugs. Read `GLOSSARY.md` and relevant ADRs first. Redact secrets.

## Phase 1: Build a tight feedback loop (most important)

Construct a pass/fail signal that goes red on *this* bug (failing test, curl, Playwright, replay, harness…). Tighten it (fast, deterministic, sharp). Do not hypothesize until you have a red-capable command.

## Phase 2: Reproduce + minimise

Run the loop. Shrink to the smallest scenario that still fails.

## Phase 3: Hypothesise

3–5 ranked, falsifiable hypotheses. Show the user before testing.

## Phase 4: Instrument

Change one variable at a time. Prefer debugger/REPL, then tagged logs (`[DEBUG-xxxx]`).

## Phase 5: Fix + regression test

Write the failing test at a correct seam first (if one exists), then fix.

## Phase 6: Cleanup

Remove debug instrumentation, confirm original repro is gone, state the correct hypothesis in the commit.
