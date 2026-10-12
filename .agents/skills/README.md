# AI Agent Skills — Tử Tế Fund

Thư mục này chứa các skill cho AI coding agent (Claude Code, Cursor, Codex, Copilot…).

## Cấu trúc

```
.agents/skills/
├── README.md                 # file này
├── grill-with-docs/         # (cài sau hoặc đã copy)
├── tdd/
├── code-review/
└── ...
```

Mỗi skill là một folder có `SKILL.md` (frontmatter `name` + `description` + hướng dẫn).

## Skill khuyến nghị (từ mattpocock/skills)

Cài bằng:

```bash
npx skills@latest add mattpocock/skills -a <agent>
# chọn: setup-matt-pocock-skills, grill-with-docs, domain-modeling,
# to-spec, to-tickets, implement, tdd, code-review, diagnosing-bugs,
# improve-codebase-architecture, pr, codebase-design
```

Hoặc copy thủ công vào `.agents/skills/<name>/`.

### Ưu tiên cao (nên có)

| Skill | Mục đích |
|-------|--------|
| grill-with-docs | Grill kế hoạch + cập nhật GLOSSARY.md + ADR |
| domain-modeling | Làm sắc thuật ngữ domain |
| to-spec | Biến thảo luận thành spec |
| to-tickets | Tách spec thành tickets có dependency |
| implement | Implement từ spec/tickets + tdd + code-review |
| tdd | Red-green-refactor ở seam đã thống nhất |
| code-review | Review 2 trục: Standards + Spec |
| diagnosing-bugs | Loop debug kỷ luật |
| improve-codebase-architecture | Quét cơ hội deepen module |
| pr | Viết PR body chuẩn |
| codebase-design | Vocabulary deep modules |

### Ưu tiên thấp hơn

- ask-matt, wayfinder, retro, prototype, research, wizard, triage, handoff

## Cách thêm skill mới sau này

1. Tạo folder `.agents/skills/<ten-skill>/`
2. Thêm `SKILL.md` với frontmatter rõ `name` và `description`
3. Cập nhật danh sách trong file này nếu cần
4. Không đổi cấu trúc folder — chỉ thêm vào đây

## Domain docs liên quan

- `GLOSSARY.md` (root)
- `CODING_STANDARDS.md` (root)
- `docs/adr/` (Architecture Decision Records)
- `AGENTS.md` (hợp đồng làm việc)

Skill `grill-with-docs` và `domain-modeling` sẽ cập nhật GLOSSARY và ADR khi chạy.
