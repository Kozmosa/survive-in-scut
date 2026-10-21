<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { useLocaleText } from "../composables/useLocaleText";
import {
  academicTerms,
  type AcademicTerm,
  type CalendarEvent,
} from "./academicCalendar/termData";

type WeekColumnKind = "teaching" | "exam" | "vacation";

interface WeekColumn {
  key: string;
  kind: WeekColumnKind;
  weekNumber: number;
  days: Date[];
  dayISOs: string[];
  startISO: string;
  endISO: string;
  monthKey: string;
  monthLabel: string;
  year: number;
}

interface SpanCell {
  key: string;
  count: number;
  label: string;
}

interface WeekHeaderCell {
  key: string;
  colspan: number;
  label: string;
  kind: WeekColumnKind;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAY_ZH = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const WEEKDAY_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

function diffDays(from: Date, to: Date): number {
  return Math.round(
    (startOfDay(from).getTime() - startOfDay(to).getTime()) / DAY_MS,
  );
}

function termStart(term: AcademicTerm): Date {
  return parseISODate(term.firstDay);
}

function termVacationStart(term: AcademicTerm): Date {
  return parseISODate(term.vacation.start);
}

function termVacationEnd(term: AcademicTerm): Date {
  return parseISODate(term.vacation.end);
}

function termLastDay(term: AcademicTerm): Date {
  const weeks = term.teachingWeeks + term.examWeeks;
  return addDays(termStart(term), weeks * 7 - 1);
}

const now = ref<Date | null>(null);
let timer: ReturnType<typeof setInterval> | undefined;

const PROGRESS_STORAGE_KEY = "scut-academic-calendar-progress";
const showProgress = ref(false);

onMounted(() => {
  now.value = new Date();
  try {
    showProgress.value =
      window.localStorage.getItem(PROGRESS_STORAGE_KEY) === "1";
  } catch {
    // localStorage unavailable (private mode etc.) — keep the default state
  }
  timer = setInterval(() => {
    now.value = new Date();
  }, 60_000);
});

onUnmounted(() => {
  if (timer !== undefined) {
    clearInterval(timer);
  }
});

watch(showProgress, (value) => {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, value ? "1" : "0");
  } catch {
    // ignore persistence failures
  }
});

const { localeIndex } = useData();
const isEn = computed(() => localeIndex.value === "en");

function t(zh: string, en: string): string {
  return isEn.value ? en : zh;
}

const weekdayLabels = useLocaleText<string[]>(WEEKDAY_ZH, WEEKDAY_EN);
const notesTitle = useLocaleText("备注", "Notes");

const selectedTermId = ref<string | null>(null);

const activeTerm = computed<AcademicTerm>(() => {
  const selected = academicTerms.find(
    (term) => term.id === selectedTermId.value,
  );
  if (selected) {
    return selected;
  }
  const today = now.value;
  if (today) {
    const day = startOfDay(today);
    const inside = academicTerms.find(
      (term) =>
        diffDays(day, termStart(term)) >= 0 &&
        diffDays(termVacationEnd(term), day) >= 0,
    );
    if (inside) {
      return inside;
    }
    // Outside every term: pick the one starting closest to today.
    return [...academicTerms].sort(
      (a, b) =>
        Math.abs(diffDays(termStart(a), day)) -
        Math.abs(diffDays(termStart(b), day)),
    )[0];
  }
  return academicTerms[0];
});

const columns = computed<WeekColumn[]>(() => {
  const term = activeTerm.value;
  const start = termStart(term);
  const cols: WeekColumn[] = [];
  const totalWeeks = term.teachingWeeks + term.examWeeks;

  for (let week = 1; week <= totalWeeks; week++) {
    const monday = addDays(start, (week - 1) * 7);
    cols.push(
      makeColumn(
        `w${week}`,
        week <= term.teachingWeeks ? "teaching" : "exam",
        week,
        monday,
      ),
    );
  }

  const vacationStart = termVacationStart(term);
  const vacationEnd = termVacationEnd(term);
  const firstVacationMonday = addDays(
    vacationStart,
    -((vacationStart.getDay() + 6) % 7),
  );
  let week = 1;
  for (
    let monday = firstVacationMonday;
    monday <= vacationEnd;
    monday = addDays(monday, 7)
  ) {
    cols.push(makeColumn(`v${week}`, "vacation", week, monday));
    week += 1;
  }
  return cols;

  function makeColumn(
    key: string,
    kind: WeekColumnKind,
    weekNumber: number,
    monday: Date,
  ): WeekColumn {
    const days = Array.from({ length: 7 }, (_, dayIdx) =>
      addDays(monday, dayIdx),
    );
    const dayISOs = days.map(toISODate);
    const thursday = days[3];
    const year = thursday.getFullYear();
    const month = thursday.getMonth() + 1;
    return {
      key,
      kind,
      weekNumber,
      days,
      dayISOs,
      startISO: dayISOs[0],
      endISO: dayISOs[6],
      monthKey: `${year}-${month}`,
      monthLabel: isEn.value ? MONTH_EN[month - 1] : `${month}月`,
      year,
    };
  }
});

function mergeSpans(
  keyOf: (column: WeekColumn) => string,
  labelOf: (column: WeekColumn) => string,
): SpanCell[] {
  const spans: SpanCell[] = [];
  for (const column of columns.value) {
    const key = keyOf(column);
    const last = spans[spans.length - 1];
    if (last && last.key === key) {
      last.count += 1;
    } else {
      spans.push({ key, count: 1, label: labelOf(column) });
    }
  }
  return spans;
}

const yearSpans = computed(() =>
  mergeSpans(
    (column) => String(column.year),
    (column) => (isEn.value ? String(column.year) : `${column.year}年`),
  ),
);

const monthSpans = computed(() =>
  mergeSpans(
    (column) => column.monthKey,
    (column) => column.monthLabel,
  ),
);

const weekHeaderCells = computed<WeekHeaderCell[]>(() => {
  const cells: WeekHeaderCell[] = columns.value
    .filter((column) => column.kind !== "vacation")
    .map((column) => ({
      key: column.key,
      colspan: 1,
      label: String(column.weekNumber),
      kind: column.kind,
    }));
  const vacationCount = columns.value.filter(
    (column) => column.kind === "vacation",
  ).length;
  if (vacationCount > 0) {
    const term = activeTerm.value;
    cells.push({
      key: "vacation",
      colspan: vacationCount,
      label: isEn.value ? term.vacation.labelEn : term.vacation.label,
      kind: "vacation",
    });
  }
  return cells;
});

const eventByDate = computed(() => {
  const map = new Map<string, CalendarEvent>();
  for (const event of activeTerm.value.events) {
    map.set(event.date, event);
  }
  return map;
});

const todayISO = computed(() => (now.value ? toISODate(now.value) : null));
const todayWeekdayIndex = computed(() =>
  now.value ? (now.value.getDay() + 6) % 7 : null,
);

const currentColumnKey = computed(() => {
  if (!todayISO.value) {
    return null;
  }
  return (
    columns.value.find(
      (column) =>
        todayISO.value >= column.startISO && todayISO.value <= column.endISO,
    )?.key ?? null
  );
});

function eventOf(
  column: WeekColumn,
  dayIdx: number,
): CalendarEvent | undefined {
  return eventByDate.value.get(column.dayISOs[dayIdx]);
}

function isTodayCell(column: WeekColumn, dayIdx: number): boolean {
  return todayISO.value === column.dayISOs[dayIdx];
}

function isCurrentWeek(column: WeekColumn): boolean {
  return (
    todayISO.value !== null &&
    todayISO.value >= column.startISO &&
    todayISO.value <= column.endISO
  );
}

type ProgressKind = "past" | "future" | "exam";

interface ProgressSegment {
  key: ProgressKind;
  label: string;
  days: number;
  pct: number;
  offsetPct: number;
}

function progressLabel(kind: ProgressKind): string {
  if (kind === "past") {
    return t("已过", "Elapsed");
  }
  if (kind === "future") {
    return t("考前剩余", "Until exam");
  }
  return t("考试周", "Exam weeks");
}

const progressInfo = computed(() => {
  const term = activeTerm.value;
  const start = termStart(term);
  const teachDays = term.teachingWeeks * 7;
  const examDays = term.examWeeks * 7;
  const totalDays = teachDays + examDays;
  const dayOffset = now.value ? diffDays(startOfDay(now.value), start) : -1;
  let pastDays = 0;
  let elapsedDays = 0;
  if (dayOffset >= 0 && dayOffset < teachDays) {
    pastDays = dayOffset + 1;
    elapsedDays = dayOffset + 1;
  } else if (dayOffset >= teachDays) {
    pastDays = teachDays;
    elapsedDays = Math.min(dayOffset + 1, totalDays);
  }
  return {
    start,
    teachDays,
    totalDays,
    pastDays,
    futureDays: Math.max(teachDays - pastDays, 0),
    elapsedDays,
  };
});

const progressSegments = computed<ProgressSegment[]>(() => {
  const info = progressInfo.value;
  const parts: Array<[ProgressKind, number]> = [
    ["past", info.pastDays],
    ["future", info.futureDays],
    ["exam", activeTerm.value.examWeeks * 7],
  ];
  let offset = 0;
  return parts
    .filter(([, days]) => days > 0)
    .map(([key, days]) => {
      const pct = (days / info.totalDays) * 100;
      const segment: ProgressSegment = {
        key,
        label: progressLabel(key),
        days,
        pct,
        offsetPct: offset,
      };
      offset += pct;
      return segment;
    });
});

const progressPct = computed(() => {
  const info = progressInfo.value;
  return Math.min(Math.max((info.elapsedDays / info.totalDays) * 100, 0), 100);
});

const hoveredSegment = ref<ProgressKind | null>(null);
const activeSegment = computed(
  () =>
    progressSegments.value.find(
      (segment) => segment.key === hoveredSegment.value,
    ) ?? null,
);
const tipLeftPct = computed(() => {
  const segment = activeSegment.value;
  if (!segment) {
    return 0;
  }
  return Math.min(Math.max(segment.offsetPct + segment.pct / 2, 10), 90);
});
const tipText = computed(() => {
  const segment = activeSegment.value;
  if (!segment) {
    return "";
  }
  const rounded = Math.round(segment.pct * 10) / 10;
  const pctText = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(1);
  return `${segment.label} ${pctText}% · ${segment.days} ${t("天", "days")}`;
});

function progressKindFor(
  column: WeekColumn,
  dayIdx: number,
): ProgressKind | null {
  if (!showProgress.value || !now.value || column.kind === "vacation") {
    return null;
  }
  if (column.kind === "exam") {
    return "exam";
  }
  const info = progressInfo.value;
  const day = column.days[dayIdx];
  if (diffDays(day, info.start) >= info.teachDays) {
    return "exam";
  }
  return diffDays(day, startOfDay(now.value)) <= 0 ? "past" : "future";
}

function cellClasses(
  column: WeekColumn,
  dayIdx: number,
): Record<string, boolean> {
  const event = eventOf(column, dayIdx);
  const progress = progressKindFor(column, dayIdx);
  return {
    "is-vacation": column.kind === "vacation",
    "is-exam": column.kind === "exam",
    "is-current-week": !showProgress.value && isCurrentWeek(column),
    "is-holiday": event?.kind === "holiday" ?? false,
    "is-observance": event?.kind === "observance" ?? false,
    "is-progress-past": progress === "past",
    "is-progress-future": progress === "future",
    "is-progress-exam": progress === "exam",
    "is-today": isTodayCell(column, dayIdx),
  };
}

type PhaseKind = "before" | "teaching" | "exam" | "vacation" | "after";
interface Phase {
  kind: PhaseKind;
  week?: number;
}

const phase = computed<Phase | null>(() => {
  const today = now.value;
  if (!today) {
    return null;
  }
  const term = activeTerm.value;
  const day = startOfDay(today);
  const start = termStart(term);
  const lastDay = termLastDay(term);
  const vacationStart = termVacationStart(term);
  const vacationEnd = termVacationEnd(term);

  if (diffDays(day, start) < 0) {
    return { kind: "before" };
  }
  if (diffDays(lastDay, day) >= 0) {
    const week = Math.floor(diffDays(day, start) / 7) + 1;
    return week <= term.teachingWeeks
      ? { kind: "teaching", week }
      : { kind: "exam", week };
  }
  if (diffDays(vacationEnd, day) >= 0) {
    const week = Math.floor(diffDays(day, vacationStart) / 7) + 1;
    return { kind: "vacation", week };
  }
  return { kind: "after" };
});

const todayText = computed(() => {
  const today = now.value;
  if (!today) {
    return null;
  }
  const weekdayIndex = (today.getDay() + 6) % 7;
  if (isEn.value) {
    return `Today · ${WEEKDAY_EN[weekdayIndex]}, ${MONTH_EN[today.getMonth()]} ${today.getDate()}`;
  }
  const weekday = WEEKDAY_ZH[weekdayIndex].replace("星期", "周");
  return `今天 · ${today.getMonth() + 1}月${today.getDate()}日 ${weekday}`;
});

const phaseText = computed(() => {
  const current = phase.value;
  if (!current || !now.value) {
    return null;
  }
  const term = activeTerm.value;
  switch (current.kind) {
    case "before":
      return t("开学前", "Before semester starts");
    case "teaching":
      return t(`第 ${current.week} 教学周`, `Teaching week ${current.week}`);
    case "exam":
      return t(
        `考试周（第 ${current.week} 周）`,
        `Exam week ${current.week - term.teachingWeeks} of ${term.examWeeks}`,
      );
    case "vacation":
      return t(
        `${term.vacation.label} · 第 ${current.week} 周`,
        `${term.vacation.labelEn} · week ${current.week}`,
      );
    case "after":
      return t("本学期已结束", "Semester ended");
  }
  return null;
});

interface CountdownChip {
  key: string;
  text: string;
}

const countdownChips = computed<CountdownChip[]>(() => {
  const today = now.value;
  if (!today) {
    return [];
  }
  const day = startOfDay(today);
  const term = activeTerm.value;
  const chips: CountdownChip[] = [];

  const nextHoliday = term.events
    .filter((event) => event.kind === "holiday")
    .map((event) => ({ event, date: parseISODate(event.date) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .find(({ date }) => diffDays(date, day) >= 0);
  if (nextHoliday) {
    const days = diffDays(nextHoliday.date, day);
    const label = isEn.value
      ? nextHoliday.event.labelEn
      : nextHoliday.event.label;
    chips.push({
      key: `holiday-${nextHoliday.event.date}`,
      text:
        days === 0
          ? t(`今天 · ${label}`, `Today · ${label}`)
          : t(`距${label} ${days} 天`, `${days} days to ${label}`),
    });
  }

  const current = phase.value;
  if (current?.kind === "before") {
    const days = diffDays(termStart(term), day);
    if (days > 0) {
      chips.push({
        key: "start",
        text: t(`距开学 ${days} 天`, `${days} days to semester start`),
      });
    }
  } else if (current?.kind === "teaching" || current?.kind === "exam") {
    const examStart = addDays(termStart(term), term.teachingWeeks * 7);
    if (current.kind === "teaching") {
      const days = diffDays(examStart, day);
      if (days > 0) {
        chips.push({
          key: "exam",
          text: t(`距考试周 ${days} 天`, `${days} days to exam weeks`),
        });
      }
    }
    const days = diffDays(termVacationStart(term), day);
    if (days > 0) {
      chips.push({
        key: "vacation",
        text: t(
          `距${term.vacation.label} ${days} 天`,
          `${days} days to ${term.vacation.labelEn}`,
        ),
      });
    }
  }
  return chips.slice(0, 2);
});

const legendItems = computed(() => [
  { key: "teaching", label: t("教学周", "Teaching"), cls: "legend-teaching" },
  { key: "exam", label: t("考试周", "Exam"), cls: "legend-exam" },
  { key: "holiday", label: t("节假日", "Holiday"), cls: "legend-holiday" },
  {
    key: "observance",
    label: t("校庆日", "Observance"),
    cls: "legend-observance",
  },
  {
    key: "vacation",
    label: activeTerm.value.vacation.label,
    cls: "legend-vacation",
  },
  ...(showProgress.value
    ? [
        {
          key: "progress-past",
          label: t("已过", "Elapsed"),
          cls: "legend-progress-past",
        },
        {
          key: "progress-future",
          label: t("考前剩余", "Until exam"),
          cls: "legend-progress-future",
        },
      ]
    : []),
  { key: "today", label: t("今天", "Today"), cls: "legend-today" },
]);

const activeNotes = computed(() =>
  isEn.value ? activeTerm.value.notesEn : activeTerm.value.notes,
);

function termLabel(term: AcademicTerm): string {
  return isEn.value ? term.nameEn : term.name;
}
</script>

<template>
  <div class="academic-calendar">
    <div v-if="academicTerms.length > 1" class="ac-tabs">
      <button
        v-for="termItem in academicTerms"
        :key="termItem.id"
        type="button"
        class="ac-tab"
        :class="{ 'is-active': termItem.id === activeTerm.id }"
        @click="selectedTermId = termItem.id"
      >
        {{ termLabel(termItem) }}
      </button>
    </div>

    <div class="ac-banner">
      <div class="ac-banner-main">
        <div class="ac-term-name">{{ termLabel(activeTerm) }}</div>
        <div v-if="todayText" class="ac-today">
          <span class="ac-today-date">{{ todayText }}</span>
          <span
            v-if="phaseText"
            class="ac-phase"
            :class="`is-${phase?.kind}`"
            >{{ phaseText }}</span
          >
        </div>
      </div>
      <div v-if="countdownChips.length" class="ac-countdown">
        <span v-for="chip in countdownChips" :key="chip.key" class="ac-chip">
          {{ chip.text }}
        </span>
      </div>
    </div>

    <div class="ac-controls">
      <div class="ac-legend">
        <span
          v-for="item in legendItems"
          :key="item.key"
          class="ac-legend-item"
        >
          <span class="ac-legend-swatch" :class="item.cls"></span>
          {{ item.label }}
        </span>
      </div>
      <label class="ac-switch">
        <input v-model="showProgress" type="checkbox" class="ac-switch-input" />
        <span class="ac-switch-track">
          <span class="ac-switch-thumb"></span>
        </span>
        <span class="ac-switch-label">{{
          t("显示进度", "Show progress")
        }}</span>
      </label>
    </div>

    <div v-if="showProgress" class="ac-progress">
      <div class="ac-progress-bar">
        <div class="ac-progress-rail">
          <div
            v-for="segment in progressSegments"
            :key="segment.key"
            class="ac-progress-seg"
            :class="`is-${segment.key}`"
            :style="{ left: `${segment.offsetPct}%`, width: `${segment.pct}%` }"
            @mouseenter="hoveredSegment = segment.key"
            @mouseleave="hoveredSegment = null"
            @click="hoveredSegment = segment.key"
          ></div>
          <div
            class="ac-progress-marker"
            :style="{ left: `${progressPct}%` }"
          ></div>
        </div>
        <div
          v-if="activeSegment"
          class="ac-progress-tip"
          :style="{ left: `${tipLeftPct}%` }"
        >
          {{ tipText }}
        </div>
      </div>
      <span class="ac-progress-caption">
        {{ t("学期进度", "Semester progress") }} {{ Math.round(progressPct) }}%
      </span>
    </div>

    <div class="ac-scroll">
      <table class="ac-table">
        <thead>
          <tr class="ac-row-year">
            <th class="ac-corner" rowspan="3">
              <span class="ac-corner-text">{{ t("周次", "Week") }}</span>
            </th>
            <th
              v-for="span in yearSpans"
              :key="`y-${span.key}`"
              class="ac-year"
              :colspan="span.count"
            >
              {{ span.label }}
            </th>
          </tr>
          <tr class="ac-row-month">
            <th
              v-for="span in monthSpans"
              :key="`m-${span.key}`"
              class="ac-month"
              :colspan="span.count"
            >
              {{ span.label }}
            </th>
          </tr>
          <tr class="ac-row-week">
            <th
              v-for="cell in weekHeaderCells"
              :key="cell.key"
              class="ac-weeknum"
              :class="[
                `is-${cell.kind}`,
                { 'is-current': cell.key === currentColumnKey },
              ]"
              :colspan="cell.colspan"
            >
              {{ cell.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, dayIdx) in 7" :key="dayIdx">
            <th
              class="ac-weekday"
              :class="{ 'is-today': todayWeekdayIndex === dayIdx }"
            >
              {{ weekdayLabels[dayIdx] }}
            </th>
            <td
              v-for="column in columns"
              :key="column.key"
              class="ac-cell"
              :class="cellClasses(column, dayIdx)"
            >
              <span class="ac-daynum">{{ column.days[dayIdx].getDate() }}</span>
              <span
                v-if="eventOf(column, dayIdx)"
                class="ac-event"
                :class="`is-${eventOf(column, dayIdx)?.kind}`"
              >
                {{
                  isEn
                    ? eventOf(column, dayIdx)?.labelEn
                    : eventOf(column, dayIdx)?.label
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Details :title="notesTitle">
      <ul class="ac-notes">
        <li v-for="note in activeNotes" :key="note">{{ note }}</li>
      </ul>
    </Details>
  </div>
</template>

<style scoped>
.academic-calendar {
  --ac-holiday-bg: #e8f7ee;
  --ac-holiday-text: #1d7a46;
  --ac-vacation-bg: #fdf1e3;
  --ac-vacation-text: #9a6112;
  --ac-exam-text: #c4383a;
  --ac-observance-text: #4a7dbd;
  --ac-year-text: #b0353a;
  --ac-progress-past-bg: #fdf3d3;
  --ac-progress-future-bg: #e6f9ec;
  --ac-progress-exam-bg: #fde3e3;
  --ac-bar-past: #eccf6f;
  --ac-bar-future: #4fbf7d;
  --ac-bar-exam: #e05d5f;
  margin: 16px 0;
}

.dark .academic-calendar {
  --ac-holiday-bg: rgba(52, 173, 105, 0.16);
  --ac-holiday-text: #7ce3a4;
  --ac-vacation-bg: rgba(230, 149, 60, 0.13);
  --ac-vacation-text: #f2b572;
  --ac-exam-text: #ff9092;
  --ac-observance-text: #7db3e8;
  --ac-year-text: #ff9a9c;
  --ac-progress-past-bg: rgba(235, 196, 105, 0.14);
  --ac-progress-future-bg: rgba(84, 214, 132, 0.12);
  --ac-progress-exam-bg: rgba(226, 100, 102, 0.15);
  --ac-bar-past: #d9b95e;
  --ac-bar-future: #48a86d;
  --ac-bar-exam: #d05a5c;
}

.ac-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.ac-tab {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.ac-tab:hover {
  color: var(--vp-c-brand-1);
}

.ac-tab.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.ac-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
}

.ac-term-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.ac-today {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.ac-today-date {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.ac-phase {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.ac-phase.is-exam {
  background-color: rgba(196, 56, 58, 0.12);
  color: var(--ac-exam-text);
}

.ac-phase.is-vacation {
  background-color: var(--ac-vacation-bg);
  color: var(--ac-vacation-text);
}

.ac-phase.is-after,
.ac-phase.is-before {
  background-color: var(--vp-c-mute);
  color: var(--vp-c-text-2);
}

.ac-countdown {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ac-chip {
  padding: 4px 12px;
  border: 1px dashed var(--vp-c-brand-1);
  border-radius: 999px;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.ac-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin: 12px 2px;
}

.ac-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.ac-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.ac-switch-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.ac-switch-track {
  position: relative;
  flex-shrink: 0;
  width: 34px;
  height: 18px;
  border-radius: 999px;
  background-color: var(--vp-c-mute);
  transition: background-color 0.2s;
}

.ac-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
}

.ac-switch-input:checked ~ .ac-switch-track {
  background-color: var(--vp-c-brand-1);
}

.ac-switch-input:checked ~ .ac-switch-track .ac-switch-thumb {
  transform: translateX(16px);
}

.ac-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2px 2px 14px;
}

.ac-progress-bar {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.ac-progress-rail {
  position: relative;
  height: 12px;
  border-radius: 999px;
  background-color: var(--vp-c-mute);
  overflow: hidden;
}

.ac-progress-seg {
  position: absolute;
  top: 0;
  height: 100%;
  cursor: pointer;
}

.ac-progress-seg.is-past {
  background-color: var(--ac-bar-past);
}

.ac-progress-seg.is-future {
  background-color: var(--ac-bar-future);
}

.ac-progress-seg.is-exam {
  background-color: var(--ac-bar-exam);
}

.ac-progress-marker {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--vp-c-brand-1);
  transform: translateX(-1px);
}

.ac-progress-tip {
  position: absolute;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  pointer-events: none;
  z-index: 5;
}

.ac-progress-caption {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.ac-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ac-legend-swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
}

.ac-legend-swatch.legend-teaching {
  background-color: var(--vp-c-bg-soft);
}

.ac-legend-swatch.legend-exam {
  background-color: currentColor;
  border-color: var(--ac-exam-text);
  color: var(--ac-exam-text);
}

.ac-legend-swatch.legend-holiday {
  background-color: var(--ac-holiday-bg);
  border-color: var(--ac-holiday-text);
}

.ac-legend-swatch.legend-observance {
  background-color: transparent;
  border-color: var(--ac-observance-text);
}

.ac-legend-swatch.legend-vacation {
  background-color: var(--ac-vacation-bg);
  border-color: var(--ac-vacation-text);
}

.ac-legend-swatch.legend-today {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 2px var(--vp-c-brand-1);
}

.ac-legend-swatch.legend-progress-past {
  background-color: var(--ac-progress-past-bg);
  border-color: var(--ac-bar-past);
}

.ac-legend-swatch.legend-progress-future {
  background-color: var(--ac-progress-future-bg);
  border-color: var(--ac-bar-future);
}

.ac-scroll {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg);
}

.ac-table {
  /* Neutralize .vp-doc table { display: block; overflow-x: auto } so the
     table keeps its grid layout and .ac-scroll stays the scroll container. */
  display: table;
  max-width: none;
  overflow: visible;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  line-height: 1.3;
}

.ac-table th,
.ac-table td {
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
  padding: 0;
}

.ac-corner {
  position: sticky;
  left: 0;
  z-index: 3;
  min-width: 52px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 10px;
  font-weight: 500;
}

.ac-corner-text {
  display: block;
  padding: 6px 4px;
}

.ac-year {
  min-width: 40px;
  padding: 6px 2px;
  color: var(--ac-year-text);
  font-size: 12px;
  font-weight: 700;
}

.ac-month {
  min-width: 40px;
  padding: 4px 2px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.ac-weeknum {
  min-width: 40px;
  padding: 6px 2px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.ac-weeknum.is-exam {
  color: var(--ac-exam-text);
}

.ac-weeknum.is-vacation {
  min-width: 64px;
  color: var(--ac-vacation-text);
  background-color: var(--ac-vacation-bg);
}

.ac-weeknum.is-current {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.ac-weeknum.is-vacation.is-current {
  color: var(--ac-vacation-text);
}

.ac-weekday {
  position: sticky;
  left: 0;
  z-index: 2;
  padding: 8px 6px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

.ac-weekday.is-today {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.ac-cell {
  min-width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  color: var(--vp-c-text-1);
}

.ac-cell.is-current-week {
  background-color: var(--vp-c-brand-soft);
}

.ac-cell.is-exam .ac-daynum {
  color: var(--ac-exam-text);
}

.ac-cell.is-vacation {
  background-color: var(--ac-vacation-bg);
}

.ac-cell.is-vacation .ac-daynum {
  color: var(--ac-vacation-text);
}

.ac-cell.is-holiday {
  background-color: var(--ac-holiday-bg);
}

.ac-cell.is-holiday .ac-daynum,
.ac-cell.is-holiday .ac-event {
  color: var(--ac-holiday-text);
}

.ac-cell.is-observance .ac-daynum,
.ac-cell.is-observance .ac-event {
  color: var(--ac-observance-text);
}

.ac-cell.is-progress-past {
  background-color: var(--ac-progress-past-bg);
}

.ac-cell.is-progress-future {
  background-color: var(--ac-progress-future-bg);
}

.ac-cell.is-progress-exam {
  background-color: var(--ac-progress-exam-bg);
}

.ac-cell.is-today {
  background-color: var(--vp-c-bg);
  box-shadow: inset 0 0 0 2px var(--vp-c-brand-1);
}

.ac-cell.is-today .ac-daynum {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.ac-daynum {
  display: block;
  font-size: 12px;
  font-weight: 600;
}

.ac-event {
  display: block;
  max-width: 56px;
  margin: 0 auto;
  overflow: hidden;
  font-size: 9px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ac-cell.is-today .ac-event {
  color: var(--vp-c-brand-1);
}

.ac-notes {
  margin: 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.ac-notes li + li {
  margin-top: 6px;
}
</style>
