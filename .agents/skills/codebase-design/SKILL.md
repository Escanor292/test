---
name: codebase-design
description: Shared vocabulary for designing deep modules. Use when designing or improving a module's interface, finding deepening opportunities, deciding seam placement, or making code more testable / AI-navigable.
---

# Codebase Design

Design **deep modules**: lots of behaviour behind a small interface, at a clean seam, testable through that interface.

Key terms (use exactly these):
- **Module**: anything with an interface + implementation (function, class, package…).
- **Interface**: everything a caller must know (not just type signature).
- **Depth**: leverage at the interface (lots of behaviour behind small interface).
- **Seam**: place where you can alter behaviour without editing there.
- **Adapter**: concrete thing that satisfies an interface at a seam.
- **Leverage** / **Locality**: benefits of depth for callers and maintainers.

Principles:
- Depth is a property of the interface.
- Deletion test: if deleting concentrates complexity elsewhere, it was earning its keep.
- The interface is the test surface.
- One adapter = hypothetical seam; two = real seam.

Prefer accepting dependencies, returning results, and keeping small surface area.
