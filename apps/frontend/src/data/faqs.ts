export interface FaqItem {
  question: string;
  answer: string;
}

export interface CategorizedFaq {
  category: string;
  items: FaqItem[];
}

export const categorizedFaqs: CategorizedFaq[] = [
  {
    category: "General Information",
    items: [
      {
        question: "What is BoardPeFocus?",
        answer:
          "BoardPeFocus is a premium academic advisory and tutoring platform focused on board-specific home tutoring for Class 10 and Class 12 students in Gurugram.",
      },
      {
        question: "How is BoardPeFocus different from a generic tutor bureau?",
        answer:
          "BoardPeFocus is board-specialized, not a general listing marketplace. We look at the student's board, class, subject, school context, location, learning style, and exam timeline before suggesting a tutor.",
      },
      {
        question: "Which students is BoardPeFocus best suited for?",
        answer:
          "The service is best suited for families who want structured one-to-one support for Class 10 or Class 12 board preparation, school tests, revision planning, and subject-specific gaps.",
      },
      {
        question: "Do you only work in Gurugram?",
        answer:
          "Yes. BoardPeFocus is intentionally Gurugram-focused so tutor matching can account for local schools, sectors, societies, travel practicality, and parent expectations.",
      },
      {
        question: "Can we speak to an advisor before choosing a tutor?",
        answer:
          "Yes. A short consultation helps clarify the student's board, current marks, subject challenges, schedule, and target outcome before matching begins.",
      },
      {
        question: "What information should we share in the first enquiry?",
        answer:
          "Share the student's board, class, school, subjects, current marks, weak chapters, preferred days, location, and whether the need is regular support or urgent revision.",
      },
      {
        question: "Is BoardPeFocus a coaching center?",
        answer:
          "No. BoardPeFocus is built around one-to-one tutor matching and academic guidance, so the plan can stay specific to the student's board, subject, and schedule.",
      },
      {
        question: "Can BoardPeFocus help if we are unsure what support we need?",
        answer:
          "Yes. The advisor can help identify whether the priority is concept repair, school-test support, board revision, answer-writing practice, or a better study routine.",
      },
    ],
  },
  {
    category: "For Parents",
    items: [
      {
        question: "How do you select your tutors?",
        answer:
          "Tutors are screened for academic background, subject command, board familiarity, teaching method, communication quality, reliability, and fit for one-to-one board preparation.",
      },
      {
        question: "Is there a demo class available?",
        answer:
          "Yes. We can arrange a demo or initial interaction so parents and students can assess teaching style, pace, clarity, and comfort before continuing.",
      },
      {
        question: "Do you provide help with school internal assessments?",
        answer:
          "Yes. Tutors can support school tests, internal assessments, practical preparation, homework gaps, and board-aligned writing practice when those needs are part of the brief.",
      },
      {
        question: "How do parents know whether tutoring is working?",
        answer:
          "Parents should see clearer study structure, better concept recall, improved test confidence, more consistent practice, and specific feedback on weak chapters or answer-writing gaps.",
      },
      {
        question: "How early should we start before board exams?",
        answer:
          "Earlier is better when there is backlog or low confidence. Many families start before the high-pressure revision window so the tutor can first stabilize concepts and then move into test practice.",
      },
      {
        question: "Can a strong student also benefit from tutoring?",
        answer:
          "Yes. Strong students often use focused tutoring for sharper exam writing, advanced problem practice, consistency, and calmer execution during board season.",
      },
      {
        question: "Can parents stay updated without interrupting every session?",
        answer:
          "Yes. Parents can agree on a simple feedback rhythm with the tutor so updates stay clear without turning every class into a long review call.",
      },
      {
        question: "What should we do if the student is anxious before boards?",
        answer:
          "The tutor can break preparation into smaller targets, rebuild confidence through chapter-wise wins, and shift gradually into timed practice once the basics are stable.",
      },
    ],
  },
  {
    category: "Boards & Curriculum",
    items: [
      {
        question: "Which boards do you cover?",
        answer:
          "We support CBSE Class 10 and 12, ICSE Class 10, ISC Class 12, IGCSE, and IB MYP or DP requirements where the student's need matches an available specialist.",
      },
      {
        question: "Which classes are supported?",
        answer:
          "The strongest focus is Class 10 and Class 12, because those years need board-aware planning, revision discipline, and exam-specific answer practice.",
      },
      {
        question: "Do tutors teach according to board pattern?",
        answer:
          "Yes. Matching considers the board's syllabus, marking scheme, question style, practical expectations, internal assessment needs, and past-paper practice requirements.",
      },
      {
        question: "Do you provide study material?",
        answer:
          "Tutors may use curated notes, school material, NCERT or board textbooks, previous-year papers, sample papers, worksheets, and mock tests depending on the subject and board.",
      },
      {
        question: "Can tutoring focus on board exams and school tests together?",
        answer:
          "Yes. The plan can combine regular school support with board preparation so the student does not treat class tests and final board readiness as separate worlds.",
      },
      {
        question: "Do you support IB and IGCSE differently from CBSE or ICSE?",
        answer:
          "Yes. IB and IGCSE often need different pacing, assessment language, coursework awareness, and answer style, so tutor fit is checked separately for those curricula.",
      },
      {
        question: "Can tutors help with pre-board preparation?",
        answer:
          "Yes. Pre-board support usually includes revision planning, chapter prioritization, mock-paper review, common-error correction, and board-style answer practice.",
      },
      {
        question: "Can the tutor follow my child's school textbook and notes?",
        answer:
          "Yes. Tutors can work with the school's textbook, worksheets, notes, assignments, and test feedback while still keeping the final board pattern in view.",
      },
    ],
  },
  {
    category: "Tutors & Matching",
    items: [
      {
        question: "How does BoardPeFocus tutor matching work?",
        answer:
          "We review the student's board, class, subject, school context, marks, learning style, location, and schedule before shortlisting tutors who fit that exact academic brief.",
      },
      {
        question: "Are tutors verified on BoardPeFocus?",
        answer:
          "Yes. Tutors are checked for subject expertise, teaching ability, board familiarity, reliability, and background details before being recommended to families.",
      },
      {
        question: "Can we book a trial class before committing?",
        answer:
          "Yes. A trial or demo session can be arranged so the family can evaluate explanation quality, pace, and student comfort before moving forward.",
      },
      {
        question: "Can I change the tutor if needed?",
        answer:
          "Yes. If the fit is not working, we review the concern, refine the requirement, and help with a better match where available.",
      },
      {
        question: "Can parents request a specific tutor profile?",
        answer:
          "Parents can share preferences such as board experience, subject depth, teaching style, language comfort, gender preference, and schedule. Final matching depends on availability and fit.",
      },
      {
        question: "How quickly can a tutor start after matching?",
        answer:
          "Timelines depend on subject, board, locality, and schedule fit, but the aim is to share suitable options promptly after the consultation is complete.",
      },
      {
        question: "What makes a tutor suitable for board exams?",
        answer:
          "A suitable board tutor understands the syllabus, marking pattern, common mistakes, paper structure, revision timeline, and how to turn concepts into exam-ready answers.",
      },
      {
        question: "Can one tutor handle multiple subjects?",
        answer:
          "Sometimes for lower subject combinations, but board-year support is often stronger when each high-stakes subject is handled by a tutor with clear subject depth.",
      },
    ],
  },
  {
    category: "Areas & Schools",
    items: [
      {
        question: "Do you provide home tutors across Gurugram?",
        answer:
          "Yes. BoardPeFocus supports key Gurugram sectors, societies, and corridors including Golf Course Road, DLF phases, South City, Nirvana Country, Sohna Road, and nearby areas.",
      },
      {
        question: "Why does locality matter in tutor matching?",
        answer:
          "Locality affects travel time, session consistency, home-visit practicality, and tutor availability, especially during board season when schedules become tighter.",
      },
      {
        question: "Do you work with students from premium Gurugram schools?",
        answer:
          "Yes. Many enquiries come from families in leading Gurugram schools. We stay school-aware without implying any official partnership or affiliation with those schools.",
      },
      {
        question: "Can a tutor align with my child's school pace?",
        answer:
          "Yes. The tutor can account for current school chapters, upcoming tests, assignments, revision deadlines, and the board plan so the student gets practical support.",
      },
      {
        question: "Do you provide online tutoring if a home tutor is not available?",
        answer:
          "Where a strong home-tutor fit is not practical, online support may be discussed if it serves the student's board and subject needs well.",
      },
      {
        question: "Can you match tutors near a specific society or sector?",
        answer:
          "Yes. Locality details such as sector, society, nearest landmark, and preferred time window help make home-tutor shortlisting more practical.",
      },
      {
        question: "Does school distance affect scheduling?",
        answer:
          "It can. School timings, commute fatigue, activities, and homework load all matter when deciding whether weekday, weekend, or mixed scheduling will work.",
      },
      {
        question: "Can area preference be balanced with tutor quality?",
        answer:
          "Yes. The goal is to balance practical travel with academic fit, so location is considered alongside board experience, subject command, and teaching style.",
      },
    ],
  },
  {
    category: "Payments & Scheduling",
    items: [
      {
        question: "What is the fee structure?",
        answer:
          "Fees vary by board, subject, tutor seniority, class level, session frequency, and travel practicality. Parents receive a transparent quote after the requirement is understood.",
      },
      {
        question: "How many sessions per week are recommended?",
        answer:
          "The right frequency depends on the student's gaps, board timeline, subject difficulty, school workload, and whether the focus is concept building or exam practice.",
      },
      {
        question: "Can sessions be rescheduled?",
        answer:
          "Reasonable rescheduling can usually be coordinated between the family and tutor, provided both sides have enough notice and the board-season plan stays on track.",
      },
      {
        question: "Do you support short-term revision plans?",
        answer:
          "Yes. Short-term support may work for revision, sample-paper practice, chapter backlog, or pre-board preparation when the requirement is clear and a suitable tutor is available.",
      },
      {
        question: "Are fees monthly or per session?",
        answer:
          "The payment structure depends on the final tutoring arrangement. The advisor will clarify the billing model, expected frequency, and any relevant terms before sessions begin.",
      },
      {
        question: "Can we pause tutoring during school exams or travel?",
        answer:
          "Pauses can be discussed in advance, but families are encouraged to keep the plan consistent during board season so momentum is not lost.",
      },
      {
        question: "Can we increase sessions close to exams?",
        answer:
          "Yes, if the tutor's schedule allows. Extra sessions are often useful for sample papers, doubt clearing, pre-board review, and final revision blocks.",
      },
      {
        question: "Are weekend sessions possible?",
        answer:
          "Weekend sessions can be discussed during matching. Availability depends on the tutor, subject demand, travel route, and how early the schedule is finalized.",
      },
    ],
  },
];
