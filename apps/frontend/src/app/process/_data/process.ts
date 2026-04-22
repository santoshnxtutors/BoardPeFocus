export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessFaqItem {
  question: string;
  answer: string;
}

export interface ProcessRelatedLink {
  title: string;
  href: string;
  description: string;
}

export interface ProcessPageConfig {
  slug: string;
  label: string;
  shortLabel: string;
  audience: string;
  heroTitle: string;
  heroDescription: string;
  summary: string;
  steps: ProcessStep[];
  reassurancePoints: string[];
  faq: ProcessFaqItem[];
  relatedLinks: ProcessRelatedLink[];
  ctaTitle: string;
  ctaDescription: string;
}

export const processPages: ProcessPageConfig[] = [
  {
    slug: "consultation",
    label: "Consultation",
    shortLabel: "Consult",
    audience: "Best for families clarifying board, class, school, and locality needs before matching begins.",
    heroTitle: "Academic consultation for Gurgaon families who want a cleaner tutoring brief",
    heroDescription:
      "The consultation stage turns a broad tutoring enquiry into a sharper board, class, subject, school, and Gurgaon-area requirement so matching can stay premium and efficient.",
    summary:
      "This stage is designed to reduce confusion before the family commits time to demos, trial sessions, or tutor comparisons.",
    steps: [
      {
        title: "Understand the academic context",
        description:
          "We start with board, class, subject pressure, school context, and whether the enquiry is revision-led, concept-led, or board-season urgent.",
      },
      {
        title: "Clarify the home-tutoring fit",
        description:
          "The family’s sector, society, preferred mode, and timing are narrowed down so we can avoid poor-fit suggestions later.",
      },
      {
        title: "Define the tutor brief",
        description:
          "The outcome is a tighter brief covering subject depth, expected session style, and the type of tutor who is most likely to work.",
      },
    ],
    reassurancePoints: [
      "Useful for parents who want school-aware and board-aware guidance before committing.",
      "Keeps the service premium by reducing generic tutor shortlists.",
      "Helps families reach the right next step faster: matching, demo, or direct onboarding.",
    ],
    faq: [
      {
        question: "What should we keep ready before the consultation?",
        answer:
          "The board, class, subject concern, school name, area, and any timing constraints are enough to start the conversation well.",
      },
      {
        question: "Is consultation only for Class 10 and Class 12 families?",
        answer:
          "Those are the strongest use cases, especially for board preparation, but the consultation can also clarify adjacent senior-school support needs.",
      },
      {
        question: "Does consultation include tutor names immediately?",
        answer:
          "Not always. The first goal is to refine the brief so the next tutor options feel more relevant and less generic.",
      },
    ],
    relatedLinks: [
      {
        title: "Boards hub",
        href: "/boards",
        description: "Compare board-specific support before moving into a tutor shortlist.",
      },
      {
        title: "Class hubs",
        href: "/classes",
        description: "Use the class layer when the key pressure is tied to Class 10 or Class 12 timing.",
      },
      {
        title: "Service FAQs",
        href: "/faqs/service",
        description: "Read the most practical questions families ask about matching, demos, and progress flow.",
      },
    ],
    ctaTitle: "Want to start with the right tutoring brief?",
    ctaDescription:
      "Tell us the board, class, school, subject, and Gurgaon area so we can help shape the most relevant next step.",
  },
  {
    slug: "tutor-matching",
    label: "Tutor Matching",
    shortLabel: "Match",
    audience: "Best for families who already know the problem and want the most relevant tutor shortlist.",
    heroTitle: "Tutor matching designed for board fit, school context, and Gurgaon practicality",
    heroDescription:
      "BoardPeFocus matches families with tutors by board, class, subject, school rhythm, and location convenience instead of treating the process like a generic directory search.",
    summary:
      "The matching stage is where board fit, subject strength, availability, and locality start working together as one decision.",
    steps: [
      {
        title: "Board and subject fit first",
        description:
          "Matching starts with the board pattern, subject difficulty, and the academic expectations the family actually needs solved.",
      },
      {
        title: "School and schedule relevance",
        description:
          "School workload, revision timing, and the family’s preferred slots are used to keep the shortlist practical.",
      },
      {
        title: "Premium shortlist, not a marketplace wall",
        description:
          "Families are guided into a smaller, more thoughtful set of tutor options rather than a noisy list of profiles.",
      },
    ],
    reassurancePoints: [
      "One-to-one tutor matching keeps the process cleaner for premium families.",
      "Area and timing still matter because home tutoring needs to remain workable week after week.",
      "The goal is a strong long-term fit, not a rushed one-call conversion.",
    ],
    faq: [
      {
        question: "How quickly can tutor matching happen?",
        answer:
          "It depends on subject, board, and area, but the aim is to move quickly without compromising fit or relevance.",
      },
      {
        question: "Do you match by school context too?",
        answer:
          "Yes. School-aware matching matters because workload, exam rhythm, and family expectations often vary by school cluster.",
      },
      {
        question: "Can we ask for a different match later?",
        answer:
          "Yes. If the fit is not working, the next step is to review progress and rematch carefully rather than forcing continuity.",
      },
    ],
    relatedLinks: [
      {
        title: "Browse tutors",
        href: "/search",
        description: "See the type of tutor profiles the matching flow can lead into.",
      },
      {
        title: "Results hub",
        href: "/result",
        description: "Use the results layer when the family wants more trust context before choosing a tutor.",
      },
      {
        title: "Schools hub",
        href: "/schools",
        description: "Move through the school-aware layer if the enquiry starts with school context first.",
      },
    ],
    ctaTitle: "Need help with a cleaner tutor shortlist?",
    ctaDescription:
      "We can help narrow the board, class, subject, school, and area inputs into a more premium match path.",
  },
  {
    slug: "demo-class",
    label: "Demo Class",
    shortLabel: "Demo",
    audience: "Best for families who want to evaluate teaching fit before committing to a longer tutoring journey.",
    heroTitle: "A demo class that helps families judge fit, clarity, and teaching rhythm",
    heroDescription:
      "The demo class is meant to help parents and students understand whether the tutor’s pace, explanation style, and subject handling match the academic requirement.",
    summary:
      "A good demo should reveal fit, not just create a quick first impression.",
    steps: [
      {
        title: "Set a real topic context",
        description:
          "The demo works best when the chosen topic reflects a real subject concern rather than a random chapter.",
      },
      {
        title: "Review pace and explanation quality",
        description:
          "Families should watch for conceptual clarity, written approach, and whether the tutor can adjust to the student without overloading them.",
      },
      {
        title: "Decide the next step clearly",
        description:
          "The follow-up should answer whether to continue, refine the plan, or request a different tutor direction.",
      },
    ],
    reassurancePoints: [
      "A demo is useful when it reflects the actual board or subject concern.",
      "It should reduce anxiety for the family, not add decision clutter.",
      "The goal is an informed start, not pressure to commit instantly.",
    ],
    faq: [
      {
        question: "What should students do before the demo class?",
        answer:
          "It helps to share the board, class, subject issue, and one or two recent weak areas so the session can be more realistic.",
      },
      {
        question: "Can the demo be used to test board-specific teaching style?",
        answer:
          "Yes. Families can observe whether the tutor naturally brings in board pattern, answer structure, and revision discipline.",
      },
      {
        question: "What if the demo does not feel right?",
        answer:
          "The next step is to review what felt off and use that insight to improve the next matching decision.",
      },
    ],
    relatedLinks: [
      {
        title: "Tutor matching",
        href: "/process/tutor-matching",
        description: "Go back to the matching stage if the family wants to re-evaluate fit before another demo.",
      },
      {
        title: "Tutor FAQs",
        href: "/faqs/tutors",
        description: "Read the common questions parents ask about fit, sessions, and tutor selection.",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Reach out directly if the family wants to book or discuss the next demo step.",
      },
    ],
    ctaTitle: "Want a demo that reflects the real academic need?",
    ctaDescription:
      "Share the board, class, subject, school, and location so the session is shaped around the right concern from the beginning.",
  },
  {
    slug: "getting-started",
    label: "Getting Started",
    shortLabel: "Start",
    audience: "Best for families moving from trial to a structured tutoring plan.",
    heroTitle: "Getting started with a clean one-to-one tutoring structure in Gurgaon",
    heroDescription:
      "Once the tutor fit is clear, the first few weeks should establish revision rhythm, communication clarity, and the most urgent academic priorities without overwhelming the student.",
    summary:
      "The start of the relationship matters because it shapes momentum, expectations, and the discipline of the weeks ahead.",
    steps: [
      {
        title: "Set the first four-week goal",
        description:
          "The tutoring plan should begin with a short, realistic target covering concepts, revision, tests, or board confidence.",
      },
      {
        title: "Define communication and schedule",
        description:
          "Families should know session timing, review rhythm, and how feedback will be shared early in the journey.",
      },
      {
        title: "Start with measurable academic control",
        description:
          "The opening phase should build structure: topic sequencing, doubt handling, and a clear sense of progress.",
      },
    ],
    reassurancePoints: [
      "A calmer start usually leads to better consistency later in the season.",
      "The student does not need to fix everything at once for the plan to work.",
      "Premium tutoring should feel structured from the first few sessions onward.",
    ],
    faq: [
      {
        question: "How soon should we expect academic clarity after starting?",
        answer:
          "Families often look first for better structure, clarity, and consistency before expecting larger exam outcomes.",
      },
      {
        question: "Should the first month focus on concepts or tests?",
        answer:
          "That depends on backlog, board timing, and the student’s confidence. The right answer is usually a structured mix, not one extreme.",
      },
      {
        question: "Is the starting plan different for Class 10 and Class 12?",
        answer:
          "Yes. Class 12 often needs stronger stream-specific planning, while Class 10 usually needs disciplined cross-subject structure.",
      },
    ],
    relatedLinks: [
      {
        title: "Class 10 hub",
        href: "/classes/class-10",
        description: "Use the Class 10 hub if the start plan needs to stay board-foundation focused.",
      },
      {
        title: "Class 12 hub",
        href: "/classes/class-12",
        description: "Use the Class 12 hub when stream complexity is shaping the plan.",
      },
      {
        title: "Parent FAQs",
        href: "/faqs/parents",
        description: "See how families usually plan session frequency and progress expectations.",
      },
    ],
    ctaTitle: "Ready to start with a clearer first-month tutoring plan?",
    ctaDescription:
      "We can help you shape the right board, class, subject, and scheduling structure before sessions begin in earnest.",
  },
  {
    slug: "progress-and-feedback",
    label: "Progress & Feedback",
    shortLabel: "Progress",
    audience: "Best for families who want visibility on whether tutoring is actually moving in the right direction.",
    heroTitle: "Progress tracking and feedback that stays useful for parents and students",
    heroDescription:
      "Progress review should help the family understand what is improving, what still needs attention, and whether the tutoring plan should be adjusted before exam pressure rises.",
    summary:
      "The strongest progress systems combine academic observation with practical decisions about pace, revision, and tutor fit.",
    steps: [
      {
        title: "Review concept control",
        description:
          "Check whether the student is actually understanding more cleanly, not just attending sessions regularly.",
      },
      {
        title: "Track revision and writing quality",
        description:
          "For board years, progress should also show up in written answers, test confidence, and revision discipline.",
      },
      {
        title: "Adjust when needed",
        description:
          "If the plan or fit needs refinement, it is better to make the change early than to wait for pre-board stress.",
      },
    ],
    reassurancePoints: [
      "Progress should feel visible without turning the process into constant reporting.",
      "Good feedback helps parents stay informed while protecting student confidence.",
      "Structured one-to-one tutoring should become more efficient as progress becomes clearer.",
    ],
    faq: [
      {
        question: "What counts as real tutoring progress early on?",
        answer:
          "Clearer topic understanding, more organized revision, and better written or spoken confidence are often the earliest signs.",
      },
      {
        question: "How often should parents review progress?",
        answer:
          "It depends on the intensity of the plan, but a light recurring review is usually more helpful than waiting too long.",
      },
      {
        question: "Can progress feedback help decide whether to rematch?",
        answer:
          "Yes. Good feedback makes it easier to see whether the issue is pace, subject handling, or tutor fit itself.",
      },
    ],
    relatedLinks: [
      {
        title: "Results hub",
        href: "/result",
        description: "Use the results layer when the family wants trust and progress context without relying on fake proof.",
      },
      {
        title: "Support",
        href: "/support",
        description: "Use the support page for the best next step across contact, FAQs, process, and matching.",
      },
      {
        title: "Resources hub",
        href: "/resources",
        description: "Move into revision and exam-strategy guides when the next problem is academic structure, not fit.",
      },
    ],
    ctaTitle: "Need a clearer view of progress and the next academic step?",
    ctaDescription:
      "We can help you align tutor fit, revision goals, and board-season priorities so the family sees more useful momentum.",
  },
  {
    slug: "replacement-policy",
    label: "Replacement Policy",
    shortLabel: "Replace",
    audience: "Best for families who need a clean next step when a tutor fit is not working well enough.",
    heroTitle: "Tutor replacement policy support when the fit needs to improve",
    heroDescription:
      "If the tutoring relationship is not moving in the right direction, the replacement flow should stay calm, specific, and focused on fixing the real problem rather than restarting from zero.",
    summary:
      "Replacement works best when the family can clearly describe what is missing: pace, subject depth, communication, board fit, or scheduling reliability.",
    steps: [
      {
        title: "Review the problem honestly",
        description:
          "The first step is identifying whether the concern is academic fit, communication style, consistency, or session practicality.",
      },
      {
        title: "Refine the next tutor brief",
        description:
          "A better replacement happens when the new shortlist reflects what the family learned from the first attempt.",
      },
      {
        title: "Restart with less friction",
        description:
          "The replacement flow should carry forward context so the student does not feel like the process has reset completely.",
      },
    ],
    reassurancePoints: [
      "Replacement is sometimes the right quality decision, not a failure of the family.",
      "A premium service should make this step feel supported, not awkward.",
      "The new match should benefit from what the family has already learned.",
    ],
    faq: [
      {
        question: "When should a family consider replacement seriously?",
        answer:
          "Usually when there is repeated mismatch in pace, communication, subject handling, or scheduling and the issue is not improving with clarity.",
      },
      {
        question: "Do we need to start the full process again?",
        answer:
          "No. The aim is to carry context forward and use the previous experience to improve the next fit.",
      },
      {
        question: "Can replacement still happen during board season?",
        answer:
          "Yes, but the decision should stay focused and practical because late-season transitions need careful handling.",
      },
    ],
    relatedLinks: [
      {
        title: "Tutor matching",
        href: "/process/tutor-matching",
        description: "Go back to the matching logic with a sharper understanding of what the family needs next.",
      },
      {
        title: "Service FAQs",
        href: "/faqs/service",
        description: "Review the most relevant support questions around demos, rematching, and process expectations.",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Talk directly to the team if the family needs to discuss fit and the next replacement step.",
      },
    ],
    ctaTitle: "Need help improving tutor fit without adding more confusion?",
    ctaDescription:
      "We can help you review what is not working and shape a cleaner next match for the student.",
  },
  {
    slug: "board-season-support",
    label: "Board Season Support",
    shortLabel: "Board Season",
    audience: "Best for families moving from concept-building into high-stakes revision, tests, and pre-board pressure.",
    heroTitle: "Board-season support for Gurgaon families when revision pressure peaks",
    heroDescription:
      "Board season changes what the tutoring plan needs to do. At this stage, revision structure, test strategy, answer quality, and confidence usually matter more than broad syllabus coverage alone.",
    summary:
      "The board-season flow should feel tighter, calmer, and more strategic rather than louder or more overloaded.",
    steps: [
      {
        title: "Shift into revision architecture",
        description:
          "The student needs a controlled plan for priority chapters, weak areas, and repeated test loops across the remaining weeks.",
      },
      {
        title: "Increase board-pattern realism",
        description:
          "Sessions should lean more into answer-writing, sample papers, timing discipline, and common exam mistakes.",
      },
      {
        title: "Protect confidence while raising intensity",
        description:
          "The tutor should help increase output without letting pressure spiral into panic or inconsistent study.",
      },
    ],
    reassurancePoints: [
      "Board-season tutoring should feel more structured, not more chaotic.",
      "This stage is often where school-aware pacing becomes especially important.",
      "A premium one-to-one approach is useful when the family wants adaptation rather than mass coaching templates.",
    ],
    faq: [
      {
        question: "When should we switch into board-season mode?",
        answer:
          "Usually when school tests, pre-boards, and revision pressure begin converging enough that the plan needs more exam realism and less open-ended coverage.",
      },
      {
        question: "Does board-season support differ by board?",
        answer:
          "Yes. Board pattern, written expectations, internal school pace, and subject priorities can differ meaningfully across boards.",
      },
      {
        question: "Can this help students who are already doing okay?",
        answer:
          "Yes. Board-season support is often useful for strong students who want better execution, not just rescue support.",
      },
    ],
    relatedLinks: [
      {
        title: "Class 10 revision guides",
        href: "/resources/class-10-revision-plans",
        description: "Useful when the family wants revision-first reading before making the next tutoring move.",
      },
      {
        title: "Class 12 preparation blueprints",
        href: "/resources/class-12-preparation-blueprints",
        description: "Useful for stream-heavy Class 12 pressure across PCM, PCB, and commerce.",
      },
      {
        title: "Results hub",
        href: "/result",
        description: "Keep late-season trust and tutor-fit pathways connected to the broader proof layer.",
      },
    ],
    ctaTitle: "Need calmer board-season execution support?",
    ctaDescription:
      "Tell us the board, class, subject, school, and locality so we can help shape a tighter revision and exam-strategy path.",
  },
];

export const processHubFaqs: ProcessFaqItem[] = [
  {
    question: "What is the first step after a family reaches out?",
    answer:
      "The first step is usually an academic consultation so the enquiry becomes clearer before matching or demos begin.",
  },
  {
    question: "Can the process adapt to school and locality context?",
    answer:
      "Yes. Board, school, sector, society, timing, and preferred tutoring mode are all part of shaping the right path.",
  },
  {
    question: "Do process pages replace the contact page?",
    answer:
      "No. They explain how the service journey works, while the contact page and support routes still handle direct enquiries and next steps.",
  },
];

export function getProcessPage(slug: string) {
  return processPages.find((page) => page.slug === slug);
}

export function getAllProcessParams() {
  return processPages.map((page) => ({ slug: page.slug }));
}
