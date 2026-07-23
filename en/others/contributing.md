---
url: /en/others/contributing.md
description: Guide to contributing to the SCUT Survival Manual
---

# Contribution Guide

You can join our editorial team to submit contributions, or directly submit a PR to this project to contribute content! Before getting started, we recommend reading the [Maintenance Roadmap](/en/others/roadmap.html) and [TODO Summary](/en/others/todo.html) first, so you can direct your contributions to high-priority gaps.

## Acknowledgments

## Minimal Markdown Quickstart Guide

If you don't want to read a long article, you can scroll to the bottom of this page and use the WYSIWYG editor to try out Markdown syntax and learn by doing!

### Introduction

As a markup language, Markdown's learning curve is actually not much steeper than Word's. Once you're familiar with a few key symbols, you can start editing Markdown documents right away.

We only use a subset of the syntax described below — in fact, this is a very small subset of Markdown syntax that meets the editing and formatting needs of this manual:

* H1 / H2 / H3 headings
* Body text
* Bold
* Italic
* Hyperlinks
* Basic tables
* Images
* Math formulas

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

Result: *This is italic text*

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
\sum\_{i=1}^n i = \frac{n(n+1)}{2}
$$

### Closing Remarks

Mastering the basic syntax above will let you handle 90% of your document formatting needs. Start your writing journey now!

## Start Markdown Now

TODO: Add documentation compilation guidelines (file naming, source attribution, external link standards, time-sensitive information markers, translation sync rules, writing conventions for citing official information).

TODO: Establish an annual update process (onboarding, campus buses, maps, major transfers, university hospital, nearby info, and other time-sensitive pages should be reviewed at least once per academic year).
