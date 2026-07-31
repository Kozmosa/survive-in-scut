---
lang: en-US
title: Contributing
description: Guide to contributing to the SCUT Survival Manual
llm_translated: true
---

# Contribution Guide

You can join our editorial team to submit contributions, or directly submit a PR to this project to contribute content! Before getting started, we recommend reading the [Maintenance Roadmap](/en/others/roadmap.html) and [TODO Summary](/en/others/todo.html) first, so you can direct your contributions to high-priority gaps.

## Acknowledgments

<ContributorsList />

## Minimal Markdown Quickstart Guide

If you don't want to read a long article, you can scroll to the bottom of this page and use the WYSIWYG editor to try out Markdown syntax and learn by doing!

### Introduction

As a markup language, Markdown's learning curve is actually not much steeper than Word's. Once you're familiar with a few key symbols, you can start editing Markdown documents right away.

We only use a subset of the syntax described below — in fact, this is a very small subset of Markdown syntax that meets the editing and formatting needs of this manual:

- H1 / H2 / H3 headings
- Body text
- Bold
- Italic
- Hyperlinks
- Basic tables
- Images
- Math formulas

Below we'll demonstrate some simple examples:

### Multi-level Headings

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4
```

### Body Text

Text without any special formatting symbols is body text. If body text contains special formatting symbols like `#`, `$`, `^`, `*`, etc., add a backslash `\` before them.

Example:

```markdown
This is normal body text, using \*asterisks\* won't be parsed as italic
```

Result:

This is normal body text, using \*asterisks\* won't be parsed as italic

### Bold

Wrap text with two asterisks:

```markdown
**This is bold text**
```

Result: **This is bold text**

### Italic

Wrap text with one asterisk:

```markdown
_This is italic text_
```

Result: _This is italic text_

### Hyperlinks

Put text in square brackets and the URL in parentheses:

```markdown
[SCUT Manual Website](https://manual.华南原神大学.com)
```

Result: [SCUT Manual Website](https://manual.华南原神大学.com)

### Tables

Separate columns with pipes, and define the header with hyphens on the second row:

```markdown
| Course                      | Credits |
| --------------------------- | ------- |
| Calculus (II) (Part 1)      | 5       |
| Engineering Math Analysis 2 | 5       |
| Engineering Math Analysis 2 | 5       |
```

Result:

| Course                      | Credits |
| --------------------------- | ------- |
| Calculus (II) (Part 1)      | 5       |
| Engineering Math Analysis 2 | 5       |
| Engineering Math Analysis 2 | 5       |

> Tip: The number of hyphens `-` in the second row is arbitrary; three is just for aesthetics.

### Blockquotes

A less-than sign (half-width) followed by a space, then the quoted content.

Syntax:

`> This is quoted content`

Result:

> This is quoted content

### Images

Start with an exclamation mark, put alt text in square brackets (displayed when the image fails to load, sometimes interpreted as a caption), and the image path in parentheses.

Syntax:

```markdown
![SCUT Starry Night](https://www.scut.edu.cn/_upload/article/images/ed/e5/23bf2d62495b8528c27cb904af4b/f4f3d2a4-8653-48e4-9a33-adadb68a55d2.jpg)
```

Result:

![SCUT Starry Night](https://www.scut.edu.cn/_upload/article/images/ed/e5/23bf2d62495b8528c27cb904af4b/f4f3d2a4-8653-48e4-9a33-adadb68a55d2.jpg)

### Math Formulas (Advanced)

Wrap LaTeX formulas with dollar signs:

> If you're not familiar with LaTeX syntax, you can use the visual editor [Online LaTeX Equation Editor](https://www.latexlive.com/) to compose formulas, then click “Output Code > LaTeX” below the output area to copy the LaTeX code, and paste it between the double dollar signs.

```markdown
(Single dollar sign) Inline formula: $ E=mc^2 $

(Double dollar sign) Display formula block:

$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$
```

Result:

Inline formula: $ E=mc^2 $

Display formula block:

$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$

### Closing Remarks

Mastering the basic syntax above will let you handle 90% of your document formatting needs. Start your writing journey now!

## Start Markdown Now

<MarkdownEditor />

## Documentation Guidelines

### 1. File Naming Conventions

Asset files go under `docs/public/`, organized by category or campus.

- **Language**: Use English filenames
- **Separator priority**: underscore `_` > hyphen `-` > dot `.`
- **Examples**:
  - `campus_map_hemc_2026.pdf` — HEMC campus map
  - `bus_schedule_autumn_2026.pdf` — campus bus schedule
  - `logo.scut_cat.1.png` — logo icon

### 2. Source Attribution

#### Citing official information

Use Markdown footnotes:

```markdown
According to university regulations, transfer applications must be submitted by the end of the first academic year[^1].

[^1]: SCUT Undergraduate Transfer Administration Guidelines, https://www.scut.edu.cn/...
```

#### Republishing and curation

- Republished or curated information should cite sources where possible.
- For intranet or non-archivable links, note the source in plain text (e.g., "Data sourced from the university's internal academic affairs system").
- **Disclaimer**: Pages containing republished/curated content should set `disclaimer: true` in frontmatter. The system will automatically inject a unified disclaimer banner, avoiding inconsistencies from per-page manual notes.

#### Ephemeral resources

- If the contributor holds original files (PDFs, screenshots), archive them under the appropriate subdirectory of `docs/public/`.
- If no original file is available, footnote the source as described above.

### 3. External Link Standards

- **Internal links**: Use root-relative paths (e.g., `/learn/curricular/exam`) to avoid breakage on page moves.
- **External links**: Use full URLs with `https://` prefix.
- **Source preference**: Official and authoritative sources are encouraged; no hard requirement for contributors.
- **Dead links**: Fix on sight during maintenance. Unfixable external dead links should be marked with `(this link is no longer available)` after the original URL.

### 4. Time-Sensitive Information

- **Unified annotation**: Time-sensitive pages should note at the top: `This page was last verified in July 2026`.
- **Replace-on-sight content**: Completely outdated info like freshman guides and bus schedules should be overwritten in place; old versions are preserved in Git history.
- **Accumulated content**: Historically useful content like past transfer experience posts should be kept across years, with the year noted in the title or summary; index pages (e.g., the transfer overview) should be overwritten.

### 5. Translation Sync Rules

Once Chinese content is finalized, an English version should be generated via LLM translation promptly, or the Chinese content copied as a placeholder for the English page section.

## Annual Update Process

Time-sensitive pages should be reviewed at least once per academic year.

- **Update window**: Every summer (July–August).
- **Responsibility**: Project maintainers ensure the annual review is completed. Any contributor who finds outdated information may file an Issue and submit a PR to update it.
- **Tracking**: Use the checklist below to track progress.

### Annual Update Checklist

#### 2026

- [ ] Freshman Guide — `get-started.md`
- [ ] Campus Bus Schedule — `life/time/bus.md`
- [ ] HEMC Campus Map — `infra/hemc/map.md`
- [ ] Wushan Campus Map — `infra/wushan/map.md`
- [ ] GZIC Campus Map — `infra/gzic/map.md`
- [ ] HEMC Campus & Surroundings — `infra/hemc/nearby.md`
- [ ] Suishi Village Info — `infra/hemc/suishi.md`
- [ ] Wushan Campus & Surroundings — `infra/wushan/nearby.md`
- [ ] GZIC Campus & Surroundings — `infra/gzic/nearby.md`
- [ ] University Hospital Guide — `health/medical_care.md`
- [ ] Transfer Major Policy — `learn/curricular/transfer_major.md`

> At the start of each summer, maintainers should copy the previous year's checklist, create a new entry, and review each item.
