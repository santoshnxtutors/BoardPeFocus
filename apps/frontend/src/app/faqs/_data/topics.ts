import { getClassHubPath } from "@/app/classes/_data/classes";

export interface FaqTopicLink {
  title: string;
  href: string;
  description: string;
}

export interface FaqTopicConfig {
  slug: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: FaqTopicLink[];
}

export const faqTopics: FaqTopicConfig[] = [
  {
    slug: "boards",
    label: "Board FAQs",
    title: "Board tutoring FAQs for Gurgaon families",
    description:
      "Answers about CBSE, ICSE, ISC, IGCSE, and IB tutoring support for Class 10 and Class 12 students in Gurgaon / Gurugram.",
    intro:
      "Use this topic when the first question is about board fit, board pattern, board-specific tutor selection, or how board support differs across premium Gurgaon families.",
    faqs: [
      {
        question: "Which boards does BoardPeFocus support most strongly?",
        answer:
          "The strongest focus stays on CBSE, ICSE, ISC, IGCSE, and IB routes for Gurgaon families, especially where Class 10 and Class 12 board pressure is highest.",
      },
      {
        question: "Do tutors get matched board by board or just by subject?",
        answer:
          "Board fit matters because answer structure, revision pacing, and school expectations can differ meaningfully across boards even within the same subject.",
      },
      {
        question: "Should families start with the board page or the class page?",
        answer:
          "Start with the board page when curriculum is the main decision. Start with the class page when Class 10 or Class 12 pressure is driving the enquiry more strongly.",
      },
      {
        question: "Does CBSE support differ from ICSE or ISC support?",
        answer:
          "Yes. CBSE usually leans heavily on NCERT control and sample-paper discipline, while ICSE and ISC often need broader writing practice, deeper subject coverage, and sharper paper-specific preparation.",
      },
      {
        question: "Can IB and IGCSE students get board-specific tutors?",
        answer:
          "Yes, when a suitable specialist is available. IB and IGCSE support is matched more carefully because assessment language, coursework awareness, and grading expectations differ from Indian boards.",
      },
      {
        question: "Can tutoring cover school tests and final board preparation together?",
        answer:
          "Yes. A good plan keeps current school chapters, internal tests, pre-boards, and final board preparation connected so the student does not prepare in disconnected tracks.",
      },
      {
        question: "Do board tutors help with past papers and sample papers?",
        answer:
          "Yes. Past papers, sample papers, marking schemes, and timed answer practice are usually part of board-season preparation once concepts are stable enough.",
      },
      {
        question: "Can tutors adjust support when the board pattern changes?",
        answer:
          "Yes. Tutors can update practice around revised sample papers, school instructions, marking rubrics, and board circulars when those changes affect preparation.",
      },
    ],
    relatedLinks: [
      {
        title: "Boards hub",
        href: "/boards",
        description: "Compare the main board pathways before narrowing into class or subject support.",
      },
      {
        title: "Resources: board guides",
        href: "/resources/board-guides",
        description: "Use the editorial board layer if the family wants more answer-first reading first.",
      },
      {
        title: "Results hub",
        href: "/result",
        description: "Move into trust and proof pathways if reassurance is still part of the decision.",
      },
    ],
  },
  {
    slug: "classes",
    label: "Class FAQs",
    title: "Class 10 and Class 12 tutoring FAQs",
    description:
      "Answers for Gurgaon families comparing Class 10 and Class 12 support, revision timing, subject planning, and board-season structure.",
    intro:
      "Use this topic when class stage is shaping the decision more than the board label itself.",
    faqs: [
      {
        question: "Is BoardPeFocus mainly for Class 10 and Class 12 students?",
        answer:
          "Yes. The clearest commercial focus remains premium one-to-one tutoring for Class 10 and Class 12 board preparation in Gurgaon.",
      },
      {
        question: "How does Class 12 support differ from Class 10 support?",
        answer:
          "Class 12 often needs stronger stream-specific planning, while Class 10 usually needs tighter cross-subject structure and revision discipline.",
      },
      {
        question: "Can families start with class hubs before choosing a subject page?",
        answer:
          "Yes. Class hubs are designed to help parents move from class-level pressure into the right subject, board, school, or tutor path.",
      },
      {
        question: "Which subjects are most commonly requested for Class 10?",
        answer:
          "Families commonly ask for Mathematics, Science, English, Social Science, Hindi, and board-specific support where the student needs stronger structure before pre-boards.",
      },
      {
        question: "Which subjects are most commonly requested for Class 12?",
        answer:
          "Class 12 demand is usually stream-specific, including Mathematics, Physics, Chemistry, Biology, Accounts, Economics, Business Studies, English, and selected humanities subjects.",
      },
      {
        question: "Can Class 10 or Class 12 tutoring start mid-session?",
        answer:
          "Yes. Mid-session support can still help if the brief is clear, especially for backlog repair, chapter consolidation, school test preparation, or board revision planning.",
      },
      {
        question: "How often should board-year students take sessions?",
        answer:
          "Session frequency depends on the subject, current marks, backlog, school workload, and time left before exams. Some students need weekly structure while others need more intensive revision blocks.",
      },
      {
        question: "Can a student take different schedules for different subjects?",
        answer:
          "Yes. A difficult subject may need more frequent sessions, while a stronger subject may only need periodic revision, mock-paper review, or doubt-clearing support.",
      },
    ],
    relatedLinks: [
      {
        title: "Classes hub",
        href: "/classes",
        description: "Move into the Class 10 and Class 12 overview layer.",
      },
      {
        title: "Class 10 hub",
        href: getClassHubPath("class-10"),
        description: "Use this route for board-foundation year questions and revision planning.",
      },
      {
        title: "Class 12 hub",
        href: getClassHubPath("class-12"),
        description: "Use this route for stream-heavy board preparation and subject demand.",
      },
    ],
  },
  {
    slug: "schools",
    label: "School FAQs",
    title: "School-aware tutoring FAQs for Gurgaon schools",
    description:
      "Safe, school-aware answers for families exploring support by school cluster, curriculum mix, and nearby Gurgaon locality.",
    intro:
      "Use this topic when the enquiry starts with school context first and the family wants clearer pathways without implying official school affiliation.",
    faqs: [
      {
        question: "Do you work with students from premium Gurgaon schools?",
        answer:
          "Yes, support is commonly requested by families from leading Gurgaon schools, but the wording stays school-aware rather than implying official affiliation.",
      },
      {
        question: "Why does school context matter in tutor selection?",
        answer:
          "School workload, internal expectations, curriculum mix, and revision timing can all shape what kind of tutor fit is most useful.",
      },
      {
        question: "Should families choose a school page or an area page first?",
        answer:
          "Start with a school page when curriculum and school pace are central. Start with an area page when locality convenience and nearby options are driving the enquiry.",
      },
      {
        question: "Is BoardPeFocus officially affiliated with any school?",
        answer:
          "No. School pages are informational and school-aware, not official partnerships. They help families think about curriculum pace, assessment pressure, and local tutoring fit.",
      },
      {
        question: "Can tutors align with a school's test calendar?",
        answer:
          "Yes. Tutors can factor in upcoming unit tests, pre-boards, assignments, practicals, and revision windows when those details are shared by the family.",
      },
      {
        question: "Do school-aware tutors help with internal assessments?",
        answer:
          "Yes, where relevant. Tutors can help students prepare for school tests, internal assessment expectations, practical files, project guidance, and board-aligned answer practice.",
      },
      {
        question: "Can a school page connect to board, subject, and area support?",
        answer:
          "Yes. School context is only one layer. Families can still move into board pages, class pages, subject routes, area pages, or tutor profiles depending on the real need.",
      },
      {
        question: "Can school notes and assignments be used in tutoring?",
        answer:
          "Yes. Tutors can use school notes, worksheets, test feedback, and assignment deadlines while keeping the broader board-exam plan aligned.",
      },
    ],
    relatedLinks: [
      {
        title: "Schools hub",
        href: "/schools",
        description: "Browse the main school-aware discovery hub.",
      },
      {
        title: "Areas hub",
        href: "/gurgaon-area",
        description: "Compare local corridors, sectors, and societies when locality context matters too.",
      },
      {
        title: "Resources: school-season support",
        href: "/resources/school-season-support",
        description: "Read the editorial support layer for school-aware seasonal decision-making.",
      },
    ],
  },
  {
    slug: "areas",
    label: "Area FAQs",
    title: "Gurgaon area and locality tutoring FAQs",
    description:
      "Answers about sectors, societies, corridors, home-visit practicality, and Gurgaon-only tutoring coverage.",
    intro:
      "Use this topic when the family is deciding through locality, sector, corridor, or society context first.",
    faqs: [
      {
        question: "Does BoardPeFocus support all of Gurgaon?",
        answer:
          "The service is Gurgaon / Gurugram focused, with support shaped around high-intent corridors, sectors, societies, and premium residential clusters.",
      },
      {
        question: "Why do sector and society pages matter in a tutoring decision?",
        answer:
          "Locality matters because schedule fit, home-visit practicality, and nearby school context can influence which tutoring paths are most workable.",
      },
      {
        question: "Can area pages still connect to board and subject support?",
        answer:
          "Yes. The area layer is meant to bridge into boards, classes, subjects, schools, and tutor routes rather than stand alone.",
      },
      {
        question: "Which Gurgaon areas does BoardPeFocus commonly support?",
        answer:
          "Common enquiries come from Golf Course Road, DLF phases, South City, Nirvana Country, Sohna Road, Sushant Lok, Palam Vihar, and nearby premium residential clusters.",
      },
      {
        question: "Does locality affect tutor availability?",
        answer:
          "Yes. Locality can affect travel time, available session slots, tutor seniority, and how practical repeated home visits are during board season.",
      },
      {
        question: "Can families use area pages even if they are unsure about the board route?",
        answer:
          "Yes. Area pages are useful when the first filter is locality. From there, families can still narrow into CBSE, ICSE, ISC, IGCSE, IB, Class 10, Class 12, or subject support.",
      },
      {
        question: "Is online tutoring possible when a home tutor is not practical?",
        answer:
          "Sometimes. If home-visit logistics do not work, online support can be discussed when it still gives the student the right subject expertise and board-specific structure.",
      },
      {
        question: "Can families request tutors near a specific sector or society?",
        answer:
          "Yes. Sharing the exact sector, society, landmark, and preferred timings helps shortlist tutors whose travel and schedule fit the family better.",
      },
    ],
    relatedLinks: [
      {
        title: "Gurgaon areas hub",
        href: "/gurgaon-area",
        description: "Browse the main area discovery page first.",
      },
      {
        title: "Golf Course Road",
        href: "/gurgaon-area/golf-course-road",
        description: "One of the strongest premium corridor routes on the site.",
      },
      {
        title: "Search tutors",
        href: "/search",
        description: "Move into tutor browsing once the locality context feels clear enough.",
      },
    ],
  },
  {
    slug: "tutors",
    label: "Tutor FAQs",
    title: "Tutor selection FAQs for BoardPeFocus families",
    description:
      "Answers about tutor fit, subject expertise, board experience, demos, and what families should look for before starting.",
    intro:
      "Use this topic when the family wants more clarity on tutor quality, fit, and what makes one-to-one support actually useful.",
    faqs: [
      {
        question: "What makes a tutor the right fit beyond subject knowledge?",
        answer:
          "The right fit usually combines board familiarity, subject strength, communication style, school-awareness, and schedule practicality.",
      },
      {
        question: "Should strong students also use a tutor?",
        answer:
          "Yes, sometimes. Strong students often use one-to-one tutoring for better consistency, sharper exam writing, and calmer board-season execution.",
      },
      {
        question: "How should parents judge a tutor after the first few sessions?",
        answer:
          "Look for clearer structure, better confidence, stronger explanation quality, and whether the sessions are actually targeting the right academic problem.",
      },
      {
        question: "Are tutors verified before being recommended?",
        answer:
          "Yes. Tutor recommendations are based on subject command, board familiarity, teaching style, reliability, and fit for the student's academic brief.",
      },
      {
        question: "Can families take a demo or trial class first?",
        answer:
          "Yes. A demo or trial interaction helps the family judge explanation quality, pace, student comfort, and whether the tutor understands the board requirement.",
      },
      {
        question: "Can a tutor be changed if the fit is not right?",
        answer:
          "Yes. If the match is not working, the issue can be reviewed and the requirement can be refined before suggesting another tutor where available.",
      },
      {
        question: "Can parents share tutor preferences?",
        answer:
          "Yes. Parents can share preferences around board experience, seniority, teaching style, language comfort, gender, location, and schedule. Availability and academic fit still guide the final recommendation.",
      },
      {
        question: "Can one tutor cover more than one subject?",
        answer:
          "Sometimes, but board-year support is usually strongest when high-stakes subjects are handled by tutors with clear subject depth and board-specific experience.",
      },
    ],
    relatedLinks: [
      {
        title: "Browse tutors",
        href: "/search",
        description: "Review live tutor profiles after reading the core tutor FAQs.",
      },
      {
        title: "Demo class process",
        href: "/process/demo-class",
        description: "Use the demo page when the family wants to evaluate fit more carefully.",
      },
      {
        title: "Results hub",
        href: "/result",
        description: "Use the proof layer if the family still wants broader reassurance before choosing.",
      },
    ],
  },
  {
    slug: "service",
    label: "Service FAQs",
    title: "Service and process FAQs for BoardPeFocus",
    description:
      "Answers about consultation, matching, demos, progress review, replacement, and how the tutoring service journey works.",
    intro:
      "Use this topic when the family wants to understand how the service works before committing to the next step.",
    faqs: [
      {
        question: "Can families move directly from contact into tutor matching?",
        answer:
          "Sometimes, yes. But many enquiries still benefit from a short consultation first so the brief is clean enough for better matching.",
      },
      {
        question: "Is there a demo step in the process?",
        answer:
          "Yes. The demo step is designed to help evaluate fit, pace, and explanation quality before a longer tutoring relationship begins.",
      },
      {
        question: "What happens if the tutor fit needs adjustment later?",
        answer:
          "The service should help review the issue clearly and, if needed, refine the brief and rematch rather than letting the fit drag on unproductively.",
      },
      {
        question: "What happens after a family contacts BoardPeFocus?",
        answer:
          "The usual next step is a requirement discussion covering board, class, subject, school context, current performance, location, preferred schedule, and the result the family wants.",
      },
      {
        question: "How quickly can tutoring start?",
        answer:
          "Start timelines depend on subject, board, locality, schedule fit, and tutor availability. A clearer brief usually makes shortlisting faster and more accurate.",
      },
      {
        question: "Does BoardPeFocus review progress after sessions begin?",
        answer:
          "Progress can be reviewed through parent feedback, student confidence, test performance, chapter completion, and whether the tutor's plan is addressing the original concern.",
      },
      {
        question: "Can urgent board-revision support be arranged?",
        answer:
          "Sometimes. Short-term support can work for revision, sample papers, and backlog triage when the goal is realistic and a suitable tutor is available.",
      },
      {
        question: "Can sessions increase close to exams?",
        answer:
          "Yes, if the tutor's availability allows. Extra sessions can help with sample-paper review, doubt clearing, pre-board correction, and final revision.",
      },
    ],
    relatedLinks: [
      {
        title: "Process hub",
        href: "/process",
        description: "Read the full consultation-to-board-season service journey.",
      },
      {
        title: "Support page",
        href: "/support",
        description: "Use Support for the fastest route into process help, FAQs, and contact paths.",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Reach the team directly when the family wants to talk through a service question.",
      },
    ],
  },
  {
    slug: "parents",
    label: "Parent FAQs",
    title: "Parent planning FAQs for board tutoring in Gurgaon",
    description:
      "Answers about timing, session frequency, revision pressure, school-aware planning, and how families can make calmer tutoring decisions.",
    intro:
      "Use this topic when the key question is not just which tutor, but when to start, how often to meet, and what the overall plan should look like.",
    faqs: [
      {
        question: "How early should we hire a tutor before board pressure rises?",
        answer:
          "The right timing depends on backlog, subject difficulty, and the student's current control, but families usually benefit from acting before pressure becomes urgent.",
      },
      {
        question: "How many sessions per week are ideal?",
        answer:
          "The ideal number depends on the subject, board season, school load, and whether the need is concept building or revision execution.",
      },
      {
        question: "When should tutoring shift from concept building to test practice?",
        answer:
          "That shift usually happens once the student has enough conceptual control to benefit from more board-style writing, sample papers, and timed review.",
      },
      {
        question: "How can parents tell whether a tutor is the right fit?",
        answer:
          "Look for better study structure, clearer explanations, more confident practice, specific feedback, and a plan that connects school tests with board preparation.",
      },
      {
        question: "Should struggling students and high-scoring students use tutoring differently?",
        answer:
          "Yes. Struggling students usually need concept repair and confidence building, while high-scoring students often need exam-writing polish, consistency, and targeted challenge.",
      },
      {
        question: "Can tutoring be paused or rescheduled around school events?",
        answer:
          "Pauses and rescheduling can be discussed in advance, but board-year students should avoid frequent breaks that weaken study rhythm during revision season.",
      },
      {
        question: "What should parents prepare before the first consultation?",
        answer:
          "Useful details include the student's board, class, school, current marks, weak chapters, upcoming tests, preferred schedule, location, and any previous tutoring experience.",
      },
      {
        question: "How involved should parents be after tutoring starts?",
        answer:
          "Parents should stay close enough to track progress and feedback, but the student should still own practice, homework completion, and honest communication about doubts.",
      },
    ],
    relatedLinks: [
      {
        title: "Resources: parent FAQs",
        href: "/resources/parent-faqs",
        description: "Use the editorial parent-help layer for deeper guidance.",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Talk to the team if the family wants help deciding the right timing and tutoring mix.",
      },
      {
        title: "Support",
        href: "/support",
        description: "Use Support to connect FAQs, process, contact, and next commercial pages more quickly.",
      },
    ],
  },
];

export function getFaqTopic(slug: string) {
  return faqTopics.find((topic) => topic.slug === slug);
}

export function getAllFaqTopicParams() {
  return faqTopics.map((topic) => ({ topic: topic.slug }));
}
