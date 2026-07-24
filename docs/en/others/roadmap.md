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

## Phase 1 — Foundation & Governance (P0)

> ~~4 TODOs → 2 completed, 2 items (App capability, Schedule import Issue #23) moved to a separate APP project.~~

Establish rules first, then build content. These tasks provide standards and processes for all subsequent contributions.

### 1.1 Documentation Compilation Standards

- **Source**: `docs/others/contributing.md` (Line 174)
- **Task**: Add guidelines for file naming, source attribution, external links, time-sensitive markers, translation sync rules, and citing official information.

### 1.2 Annual Update Process

- **Source**: `docs/others/contributing.md` (Line 176)
- **Task**: Establish an annual review cycle for time-sensitive pages (onboarding, bus schedules, maps, transfer policies, health services, nearby info).

---

## Phase 2 — Freshman Essentials (P0)

> Highest time-sensitivity — content needed before and during freshman orientation.

### 2.1 Freshman Onboarding Guide

- **Source**: `docs/get-started.md` (Line 99)
- **Task**: Rewrite the 2025 edition of the freshman onboarding guide with up-to-date information.

### 2.2 Safety & Mental Health

- **Source**: `docs/health/alive_first.md` (Line 11)
- **Task**: Add daily safety (traffic, anti-fraud), mental health support, and disaster emergency guides.

### 2.3 University Hospital Guide

- **Source**: `docs/health/medical_care.md` (Line 106)
- **Task**: Add clinic visit guides for General Practice, Dentistry, Dermatology, and TCM with doctor recommendations.

### 2.4 Emergency Experience

- **Source**: `docs/health/medical_care.md` (Line 110)
- **Task**: Document emergency procedures, including off-campus ER visits and reimbursement processes.

---

## Phase 3 — Campus Facilities (P1)

> Essential info for freshmen exploring the campus.

| #   | File                     | Task                                             |
| --- | ------------------------ | ------------------------------------------------ |
| 3.1 | `infra/gzic/map.md`      | GZIC facility locations, hours, and usage guides |
| 3.2 | `infra/gzic/nearby.md`   | GZIC nearby transportation and daily life        |
| 3.3 | `infra/hemc/nearby.md`   | HEMC area surroundings guide                     |
| 3.4 | `infra/hemc/suishi.md`   | Suishi village living guide                      |
| 3.5 | `infra/wushan/map.md`    | Wushan campus facility map                       |
| 3.6 | `infra/wushan/nearby.md` | Wushan campus nearby guide                       |

---

## Phase 4 — Academic Guides (P1)

> Coursework content covering common courses, majors, and exams.

| #       | File                                       | Task                                                                             |
| ------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| 4.1-4.3 | `learn/curricular/common_basic_lessons.md` | Improve Linear Algebra, Probability Theory, Complex Analysis course descriptions |
| 4.4     | `learn/curricular/exam.md`                 | Add exam regulations and study tips                                              |
| 4.5     | `learn/curricular/majors.md`               | Add major-specific study guides and open-source resources                        |

---

## Phase 5 — Life & Fun (P2)

| #   | File                              | Task                          |
| --- | --------------------------------- | ----------------------------- |
| 5.1 | `life/eat/gzic.md`                | GZIC food guide               |
| 5.2 | `life/entertainment/hemc_gzic.md` | HEMC/GZIC entertainment guide |
| 5.3 | `life/entertainment/wushan.md`    | Wushan entertainment guide    |

---

## Phase 6 — Beyond SCUT (P2)

| #   | File                                    | Task                               |
| --- | --------------------------------------- | ---------------------------------- |
| 6.1 | `beyond/abroad/phd.md`                  | Overseas PhD application guide     |
| 6.2 | `beyond/mainland/phd.md`                | Domestic PhD application guide     |
| 6.3 | `beyond/mainland/recommend_graduate.md` | Graduate recommendation full guide |
| 6.4 | `beyond/mainland/unified_admission.md`  | Graduate entrance exam guide       |

---

## Phase 7 — Contest Deepening (P3)

| #   | File                     | Task                                                                              |
| --- | ------------------------ | --------------------------------------------------------------------------------- |
| 7.1 | `learn/extra/contest.md` | Add contest participation guides (Internet+/Challenge Cup, Blue Bridge Cup, etc.) |
| 7.2 | `learn/extra/contest.md` | Restructure contest directory into 3 entry types                                  |
| 7.3 | `learn/extra/contest.md` | Add more contest content and guidance                                             |

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
5. **Pre-merge**: Ensure `npm run docs:build` passes

---

## Progress Tracking

Mark each phase as completed upon finishing. See [TODO Summary](./todo) for detailed item status.
