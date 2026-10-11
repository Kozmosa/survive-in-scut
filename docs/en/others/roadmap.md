---
lang: en-US
title: Maintenance Roadmap
description: Project development plan and priority-based roadmap for all TODO items
llm_translated: true
---

# Maintenance Roadmap

> Last updated: 2026-07-24
> Based on [TODO Summary](./todo) with 32 items (Chinese) + 5 independent English items

This roadmap organizes all current TODOs into **7 phases** by priority and content dependencies.

---

## Phase Overview

| Phase | Name                    | Priority | TODOs | Effort |
| ----- | ----------------------- | -------- | ----- | ------ |
| 1     | Foundation & Governance | P0       | 2     | Medium |
| 2     | Freshman Essentials     | P0       | 4     | Large  |
| 3     | Campus Facilities       | P1       | 6     | Large  |
| 4     | Academic Guides         | P1       | 7     | Large  |
| 5     | Life & Fun              | P2       | 3     | Medium |
| 6     | Beyond SCUT             | P2       | 4     | Large  |
| 7     | Contest Deepening       | P3       | 3     | Medium |

---

## Phase 1 — Foundation & Governance (P0) ✅

> ~~4 TODOs → 2 completed, 2 items (App capability, Schedule import Issue #23) moved to a separate APP project.~~

Establish rules first, then build content. These tasks provide standards and processes for all subsequent contributions.

### 1.1 Documentation Compilation Standards

- **Source**: `docs/others/contributing.md` (Line 174)
- **Task**: Add guidelines for file naming, source attribution, external links, time-sensitive markers, translation sync rules, and citing official information.
- **Depends on**: None
- **Acceptance criteria**: `contributing.md` has a dedicated "Documentation Standards" section that contributors can consult.

### 1.2 Annual Update Process ✅

- **Source**: `docs/others/contributing.md` (Line 176)
- **Task**: Establish an annual review cycle for time-sensitive pages (onboarding, bus schedules, maps, transfer policies, health services, nearby info).
- **Depends on**: 1.1 (time-marker conventions from the standards)
- **Acceptance criteria**: A documented checklist exists.

---

## Phase 2 — Freshman Essentials (P0)

> Highest time-sensitivity — content needed before and during freshman orientation.

### 2.1 Freshman Onboarding Guide

- **Source**: `docs/get-started.md` (Line 99)
- **Task**: Rewrite the 2025 edition of the freshman onboarding guide with up-to-date information.
- **Depends on**: 1.1 (time-sensitive marking rules)
- **Reference**: The existing `get-started.md` structure is largely sound; year information and time-sensitive content need updating.
- **Acceptance criteria**: The guide covers registration procedures, campus card, dormitory arrangements, course selection, military training, etc., and clearly marks the valid year.

### 2.2 Safety & Mental Health

- **Source**: `docs/health/alive_first.md` (Line 11)
- **Task**: Add daily safety (traffic, anti-fraud), mental health support, and disaster emergency guides.
- **Depends on**: None
- **Acceptance criteria**: Response guides covering at least three types of safety scenarios.

### 2.3 University Hospital Guide

- **Source**: `docs/health/medical_care.md` (Line 106)
- **Task**: Add clinic visit guides for General Practice, Dentistry, Dermatology, and TCM with doctor recommendations.
- **Depends on**: None
- **Acceptance criteria**: Each of the four departments has a paragraph describing the visit experience.

### 2.4 Emergency Experience

- **Source**: `docs/health/medical_care.md` (Line 110)
- **Task**: Document emergency procedures, including reimbursement and retroactive referral-slip issuance when going straight to an off-campus top-tier (Grade A) hospital at night for a sudden illness.
- **Depends on**: 2.3 (same page, can be merged)
- **Acceptance criteria**: Complete step-by-step instructions for seeking emergency care are available.

---

## Phase 3 — Campus Facilities (P1)

> Essential info for freshmen exploring the campus.

| #   | File                              | Task                                             |
| --- | --------------------------------- | ------------------------------------------------ |
| 3.1 | `infra/gzic/map.md` (Line 10)     | GZIC facility locations, hours, and usage guides |
| 3.2 | `infra/gzic/nearby.md` (Line 7)   | GZIC nearby transportation and daily life        |
| 3.3 | `infra/hemc/nearby.md` (Line 9)   | HEMC area surroundings guide                     |
| 3.4 | `infra/hemc/suishi.md` (Line 9)   | Suishi village living guide                      |
| 3.5 | `infra/wushan/map.md` (Line 7)    | Wushan campus facility map                       |
| 3.6 | `infra/wushan/nearby.md` (Line 7) | Wushan campus nearby guide                       |

> **Tip**: 3.1 and 3.2, and 3.5 and 3.6, each cover the same campus respectively and can be contributed together.

---

## Phase 4 — Academic Guides (P1)

> Coursework content covering common courses, majors, and exams.

| #       | File                                                           | Task                                                                                                                                       |
| ------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 4.1-4.3 | `learn/curricular/common_basic_lessons.md` (Lines 76, 91, 101) | Improve the Linear Algebra, Probability Theory, and Complex Analysis course descriptions with recommended textbooks and learning resources |
| 4.4     | `learn/curricular/exam.md` (Line 9)                            | Add exam regulations, test-taking advice, and exam-room precautions                                                                        |
| 4.5     | `learn/curricular/majors.md` (Line 11)                         | Add major-specific study guides and open-source resources                                                                                  |

---

## Phase 5 — Life & Fun (P2)

> Eating and fun — content that improves quality of life.

| #   | File                                        | Task                          |
| --- | ------------------------------------------- | ----------------------------- |
| 5.1 | `life/eat/gzic.md` (Line 11)                | GZIC food guide               |
| 5.2 | `life/entertainment/hemc_gzic.md` (Line 11) | HEMC/GZIC entertainment guide |
| 5.3 | `life/entertainment/wushan.md` (Line 11)    | Wushan entertainment guide    |

---

## Phase 6 — Beyond SCUT (P2)

> High-value content on post-graduation paths — a focused audience with high expectations for content density.

| #   | File                                              | Task                                                                                                                        |
| --- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 6.1 | `beyond/abroad/phd.md` (Line 11)                  | Overseas PhD application guide: direct PhD admission, supervisor outreach (套磁), school selection, and personal statements |
| 6.2 | `beyond/mainland/phd.md` (Line 11)                | Domestic PhD application guide                                                                                              |
| 6.3 | `beyond/mainland/recommend_graduate.md` (Line 11) | Graduate recommendation full guide                                                                                          |
| 6.4 | `beyond/mainland/unified_admission.md` (Line 11)  | Graduate entrance exam preparation strategies and notes on applying to SCUT itself                                          |

---

## Phase 7 — Contest Deepening (P3)

> Nice-to-have extension content — highly valuable for specific audiences.

| #   | File                               | Task                                                                                                                                                            |
| --- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7.1 | `learn/extra/contest.md` (Line 26) | Add contest participation guides (Internet+/Challenge Cup, Blue Bridge Cup, etc.)                                                                               |
| 7.2 | `learn/extra/contest.md` (Line 35) | Restructure the contest directory into three entry types: on-campus innovation-credit oriented, academic competition oriented, and employability-skill oriented |
| 7.3 | `learn/extra/contest.md` (Line 37) | Add more contest content and guidance                                                                                                                           |

---

## English Sync Tasks

After completing each Chinese TODO above, update the corresponding English translation. Independent English TODOs:

| TODO                                         | File                 |
| -------------------------------------------- | -------------------- |
| Clarify licensing policy                     | `en/copyrights.md`   |
| Third-party asset attribution                | `en/copyrights.md`   |
| Contribution license defaults                | `en/copyrights.md`   |
| Replace English onboarding with real content | `en/get-started.md`  |
| Rewrite English introduction                 | `en/introduction.md` |

---

## Contribution Guide

1. **Claim**: Comment on the relevant Issue or submit a PR directly
2. **Branch**: One branch per phase or per TODO; prefix PR title with phase number (e.g., `[Phase 2] Rewrite onboarding guide`)
3. **Standards**: Follow the documentation standards from Phase 1.1
4. **Translation**: Update English version within one week of Chinese content finalization
5. **Pre-merge**: Ensure `npm run docs:build` passes with no new `TODO` items (unless intentionally left for a later phase)

---

## Progress Tracking

Mark each phase as completed upon finishing. See [TODO Summary](./todo) for detailed item status.
