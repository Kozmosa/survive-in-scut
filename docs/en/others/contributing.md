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

## Documentation Standards

### 1. Attachment Naming Rules

All resource files are stored under the `docs/public/` directory and managed in folders by category or campus.

- **Language**: File names use English
- **Separator priority**: Use underscore `_` for the first level, hyphen `-` when a deeper level is needed, then dot `.` when an even deeper level is needed
- **Examples**:
  - `campus_map_hemc_2026.pdf` — University City campus map
  - `bus_schedule_autumn_2026.pdf` — Campus bus schedule
  - `logo.scut_cat.1.png` — Logo icon

### 2. Source Attribution and Citation

#### Citing Official Information

Use Markdown footnotes consistently:

```markdown
According to university regulations, major transfer applications must be submitted by the end of the first academic year[^1].

[^1]: SCUT Undergraduate Major Transfer Management Measures, https://www.scut.edu.cn/...
```

#### Reposts and Compiled Content

- For reposted or compiled information, cite the source whenever possible
- If the source is an intranet page or a link that is inconvenient to archive, state the origin in plain text (e.g., "This data comes from the university's internal academic affairs system")
- **Disclaimer**: Reposted/compiled pages must set `disclaimer: true` in their frontmatter. The system automatically injects a unified disclaimer text at the top of the page, avoiding inconsistencies caused by hand-writing it on each page.

#### Volatile Resources

- If you hold the source files (PDF, screenshots, etc.), archive them in the corresponding directory under `docs/public/`
- If no source files are available, simply mark the source using the footnote format

### 3. External Link Standards

- **Internal links**: Use root-relative paths (e.g., `/learn/curricular/exam`) to avoid broken links after the documentation is migrated
- **External links**: Must use complete URLs with the `https://` protocol prefix
- **Source preference**: Citing authoritative official sources is encouraged; no mandatory requirements are imposed on contributors
- **Dead link handling**: Fix dead links as soon as they are found during maintenance; for external dead links that cannot be fixed, add a note in parentheses after the original link (this link is no longer available)

### 4. Time-Sensitive Information Management

- **Unified labeling**: On pages involving time-sensitive information, add a label at the beginning of the body text: `The information on this page was last verified in July 2026`
- **Overwrite-style content**: Fully outdated information such as orientation guides and campus bus schedules is directly overwritten with updates; old versions are preserved in Git history
- **Accumulative content**: Information that remains useful as a reference across years, such as major transfer experience posts, keeps separate versions by year, with the year noted in the title or summary; main index pages (such as the major transfer overview) are directly overwritten

### 5. Translation Sync Rules

Once Chinese content is finalized, generate the English version immediately via LLM translation, or copy the Chinese content directly as a placeholder for the English section.

## Annual Update Process

Highly time-sensitive pages should be verified at least once per academic year to ensure the information stays accurate.

- **Update timing**: Complete the annual update during the summer break each year (July–August)
- **Owner**: The project maintainers are responsible for checking whether annual updates are completed; any contributor who finds outdated information may file an Issue and submit a PR to update it themselves
- **Tracking**: Mark progress in the checklist below

### Annual Update Checklist

#### 2026

- [ ] Orientation guide — `get-started.md`
- [ ] Campus bus schedule — `life/time/bus.md`
- [ ] University City campus map — `infra/hemc/map.md`
- [ ] Wushan campus map — `infra/wushan/map.md`
- [ ] International Campus (GZIC) map — `infra/gzic/map.md`
- [ ] Around the University City campus — `infra/hemc/nearby.md`
- [ ] Suishi Village information — `infra/hemc/suishi.md`
- [ ] Around the Wushan campus — `infra/wushan/nearby.md`
- [ ] Around the International Campus (GZIC) — `infra/gzic/nearby.md`
- [ ] Campus hospital guide — `health/medical_care.md`
- [ ] Major transfer policy — `learn/curricular/transfer_major.md`

> At the start of each summer break, maintainers should copy the previous year's checklist to create the new year's entry and verify the items one by one.
