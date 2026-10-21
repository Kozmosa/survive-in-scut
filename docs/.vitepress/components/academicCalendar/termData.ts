export type CalendarEventKind = "holiday" | "observance";

export interface CalendarEvent {
  /** ISO date (YYYY-MM-DD) the event falls on. */
  date: string;
  label: string;
  labelEn: string;
  /** "holiday" = day off (green), "observance" = marked but not a day off. */
  kind: CalendarEventKind;
}

export interface AcademicTerm {
  /** Stable identifier, e.g. "2026-2027-1". */
  id: string;
  name: string;
  nameEn: string;
  /** Monday of teaching week 1, ISO date. */
  firstDay: string;
  teachingWeeks: number;
  examWeeks: number;
  vacation: {
    label: string;
    labelEn: string;
    start: string;
    end: string;
  };
  events: CalendarEvent[];
  notes: string[];
  notesEn: string[];
}

export const academicTerms: AcademicTerm[] = [
  {
    id: "2026-2027-1",
    name: "2026–2027 学年 第一学期",
    nameEn: "2026–2027 Fall Semester",
    firstDay: "2026-08-31",
    teachingWeeks: 18,
    examWeeks: 2,
    vacation: {
      label: "寒假",
      labelEn: "Winter Break",
      start: "2027-01-18",
      end: "2027-02-28",
    },
    events: [
      {
        date: "2026-09-25",
        label: "中秋节",
        labelEn: "Mid-Autumn",
        kind: "holiday",
      },
      {
        date: "2026-10-01",
        label: "国庆节",
        labelEn: "National Day",
        kind: "holiday",
      },
      {
        date: "2026-10-02",
        label: "国庆节",
        labelEn: "National Day",
        kind: "holiday",
      },
      {
        date: "2026-10-03",
        label: "国庆节",
        labelEn: "National Day",
        kind: "holiday",
      },
      {
        date: "2026-11-17",
        label: "校庆日",
        labelEn: "Anniversary",
        kind: "observance",
      },
      {
        date: "2027-01-01",
        label: "元旦",
        labelEn: "New Year",
        kind: "holiday",
      },
      {
        date: "2027-02-05",
        label: "除夕",
        labelEn: "CNY Eve",
        kind: "holiday",
      },
      {
        date: "2027-02-06",
        label: "春节",
        labelEn: "Spring Festival",
        kind: "holiday",
      },
    ],
    notes: [
      "本学期自 2026 年 8 月 31 日起至 2027 年 1 月 17 日止，共 20 周；第 1–18 周为教学周，第 19–20 周为考试周。",
      "9 月 25 日中秋节放假 1 天，10 月 1 日、2 日、3 日国庆节放假 3 天，1 月 1 日元旦放假 1 天，具体放假时间届时以学校通知为准。",
      "11 月 17 日为校庆日。",
      "寒假自 2027 年 1 月 18 日起至 2 月 28 日止，共 6 周；2 月 5 日为除夕，6 日为春节。",
      "2027 年 2 月 26 日、27 日为本科生、研究生下学期报到注册时间。",
    ],
    notesEn: [
      "The semester runs from August 31, 2026 to January 17, 2027 (20 weeks in total). Weeks 1–18 are teaching weeks and weeks 19–20 are exam weeks.",
      "Holidays: Mid-Autumn Festival on September 25 (1 day), National Day on October 1–3 (3 days), New Year's Day on January 1 (1 day). Actual arrangements are subject to university notices.",
      "November 17 is the university's founding anniversary.",
      "Winter break runs from January 18 to February 28, 2027 (6 weeks). February 5 is Chinese New Year's Eve and February 6 is the Spring Festival.",
      "Registration for the next semester takes place on February 26–27, 2027 for undergraduate and graduate students.",
    ],
  },
];
