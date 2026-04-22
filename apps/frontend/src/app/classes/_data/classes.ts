import { areaClusters } from "@/data/areas";
import { mockSchools } from "@/data/mock";

export interface ClassFaqItem {
  question: string;
  answer: string;
}

export interface BoardPathway {
  board: string;
  href: string;
  description: string;
  keySubjects: string[];
}

export interface SubjectCard {
  title: string;
  href: string;
  description: string;
  boards: string[];
}

export interface MappingCard {
  title: string;
  description: string;
  items: {
    subject: string;
    boards: string[];
    href: string;
  }[];
}

export interface SchoolReference {
  slug: string;
  note: string;
}

export interface AreaReference {
  slug: string;
  note: string;
}

export interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

export interface ClassHubConfig {
  slug: string;
  label: string;
  heroTitle: string;
  heroDescription: string;
  identityPoints: string[];
  boardPathways: BoardPathway[];
  subjectCards: SubjectCard[];
  painPoints: string[];
  examSupport: string[];
  mappingCards: MappingCard[];
  schoolReferences: SchoolReference[];
  areaReferences: AreaReference[];
  faq: ClassFaqItem[];
  relatedLinks: RelatedLink[];
  ctaTitle: string;
  ctaDescription: string;
}

export const classHubConfigs: ClassHubConfig[] = [
  {
    slug: "class-10",
    label: "Class 10",
    heroTitle: "Class 10 Home Tutors in Gurgaon for Board-Focused Preparation",
    heroDescription:
      "Premium one-to-one Class 10 tutoring in Gurgaon for families who want stronger Maths, Science, English, revision discipline, and calmer board confidence across CBSE, ICSE, and IGCSE pathways.",
    identityPoints: [
      "Class 10 is the first serious board year for many families, so structure matters as much as raw effort.",
      "Maths, Science, and English often need a tighter weekly revision rhythm than school timetables can provide.",
      "Parents usually want board confidence, cleaner writing discipline, and better chapter sequencing before pre-boards.",
      "One-to-one support is most useful when confidence dips even though the student is already studying regularly.",
    ],
    boardPathways: [
      {
        board: "CBSE Class 10",
        href: "/boards/cbse/class-10",
        description:
          "Useful for Gurgaon families who want NCERT discipline, better Science and Maths structure, and steadier pre-board preparation.",
        keySubjects: ["Maths", "Science", "English"],
      },
      {
        board: "ICSE Class 10",
        href: "/boards/icse/class-10",
        description:
          "Useful when families want sharper written quality, stronger conceptual depth, and school-aware one-to-one support at home.",
        keySubjects: ["Maths", "Science", "English"],
      },
      {
        board: "IGCSE Year 10",
        href: "/boards/igcse/class-10",
        description:
          "Best suited to internationally paced subject support where concept depth and exam technique both need closer attention.",
        keySubjects: ["Maths", "Physics", "Chemistry", "Biology", "English"],
      },
    ],
    subjectCards: [
      {
        title: "Maths",
        href: "/boards/cbse/class-10/maths-home-tutor-gurgaon",
        description: "For students who need stronger methods, cleaner steps, and calmer paper confidence.",
        boards: ["CBSE", "ICSE", "IGCSE"],
      },
      {
        title: "Science",
        href: "/boards/cbse/class-10/science-home-tutor-gurgaon",
        description: "Useful when Physics, Chemistry, and Biology revision feels crowded or inconsistent.",
        boards: ["CBSE", "ICSE"],
      },
      {
        title: "English",
        href: "/boards/icse/class-10/english-home-tutor-gurgaon",
        description: "Focused on stronger writing clarity, literature confidence, and answer quality.",
        boards: ["ICSE", "IGCSE", "CBSE relevance"],
      },
      {
        title: "IGCSE Maths",
        href: "/boards/igcse/class-10/maths-home-tutor-gurgaon",
        description: "For families who want concept depth and application confidence in a premium one-to-one format.",
        boards: ["IGCSE"],
      },
    ],
    painPoints: [
      "Syllabus pressure rises quickly when backlog clean-up and pre-board revision start colliding.",
      "Maths and Science can feel manageable in class but unstable once timed written practice begins.",
      "Students often know the concept yet still lose marks on steps, explanation structure, or presentation.",
      "School pace can move too quickly in weak chapters and too slowly in strong ones, leaving revision uneven.",
      "Parents usually want a calmer system for weekly revision instead of last-minute chapter chasing.",
      "Confidence dips sharply when pre-board scores do not reflect the effort already going in.",
    ],
    examSupport: [
      "Board-pattern familiarity so students know what good answers actually look like in Class 10.",
      "Structured revision plans that keep Maths, Science, and English active without creating clutter.",
      "Sample-paper practice with correction on writing quality, steps, and time use.",
      "A smoother pre-board-to-board transition that reduces panic and improves consistency.",
      "Doubt solving in a one-to-one format so gaps get fixed before they become revision bottlenecks.",
      "Answer-writing support that helps students convert knowledge into better scoring execution.",
    ],
    mappingCards: [
      {
        title: "Core scoring subjects",
        description: "These are the most commercially important Class 10 subject pathways across supported boards.",
        items: [
          { subject: "Maths", boards: ["CBSE", "ICSE", "IGCSE"], href: "/boards/cbse/class-10/maths-home-tutor-gurgaon" },
          { subject: "Science", boards: ["CBSE", "ICSE"], href: "/boards/cbse/class-10/science-home-tutor-gurgaon" },
          { subject: "English", boards: ["ICSE", "IGCSE"], href: "/boards/icse/class-10/english-home-tutor-gurgaon" },
        ],
      },
      {
        title: "Board-confidence pathways",
        description: "Where Class 10 tutoring usually matters most is in revision quality, writing discipline, and pre-board calm.",
        items: [
          { subject: "CBSE revision flow", boards: ["CBSE"], href: "/boards/cbse/class-10" },
          { subject: "ICSE written precision", boards: ["ICSE"], href: "/boards/icse/class-10" },
          { subject: "IGCSE concept depth", boards: ["IGCSE"], href: "/boards/igcse/class-10" },
        ],
      },
    ],
    schoolReferences: [
      {
        slug: "dps-sector-45",
        note: "Commonly requested by parents who want stronger Class 10 revision discipline before pre-boards.",
      },
      {
        slug: "the-heritage-school",
        note: "Useful for families seeking premium one-to-one support tied to school pace and written quality.",
      },
      {
        slug: "shiv-nadar-school",
        note: "Relevant where parents want subject confidence and steadier Class 10 board preparation at home.",
      },
      {
        slug: "scottish-high-international-school",
        note: "Often relevant for international-board-style Class 10 subject support in Gurgaon corridors.",
      },
    ],
    areaReferences: [
      { slug: "south-city-sushant-lok", note: "Strong Class 10 demand from central Gurgaon school corridors and family neighborhoods." },
      { slug: "sohna-road", note: "Useful for home tutoring schedules where revision discipline matters most." },
      { slug: "dlf-phases", note: "Popular for premium one-to-one Class 10 tutoring across strong school-linked localities." },
      { slug: "golf-course-extension-road", note: "Relevant for parents who want school-aware tutor matching with smoother home scheduling." },
    ],
    faq: [
      {
        question: "Is Class 10 one of the main focus areas for BoardPeFocus?",
        answer:
          "Yes. Class 10 is a major focus because parents usually want premium one-to-one support in Maths, Science, English, revision planning, and board confidence.",
      },
      {
        question: "Can I choose the right board pathway from the Class 10 hub?",
        answer:
          "Yes. The Class 10 hub is designed to help parents move cleanly into CBSE, ICSE, or IGCSE pathways and then into the right subject page.",
      },
      {
        question: "Do you support Class 10 home tutoring across Gurgaon areas?",
        answer:
          "Yes. The service is positioned for Gurgaon / Gurugram families and links naturally into local area and school relevance.",
      },
      {
        question: "Is Class 10 support mainly one-to-one?",
        answer:
          "Yes. The positioning is premium, one-to-one, and home-first so the support can stay focused and parent-friendly.",
      },
    ],
    relatedLinks: [
      {
        title: "Classes Hub",
        href: "/classes",
        description: "Move back to the main classes page to compare Class 10 and Class 12 pathways more clearly.",
      },
      {
        title: "Boards Hub",
        href: "/boards",
        description: "Compare board pathways before choosing the Class 10 route that fits your child best.",
      },
      {
        title: "CBSE Class 10",
        href: "/boards/cbse/class-10",
        description: "Move into the CBSE-specific Class 10 page for subject and revision pathways.",
      },
      {
        title: "ICSE Class 10",
        href: "/boards/icse/class-10",
        description: "Explore the ICSE route for written precision, subject depth, and school-aware support.",
      },
      {
        title: "Gurgaon Areas Hub",
        href: "/gurgaon-area",
        description: "Connect the class journey with Gurgaon corridors, sectors, and premium residential areas.",
      },
    ],
    ctaTitle: "Need a cleaner Class 10 tutoring plan for boards?",
    ctaDescription:
      "Tell us the board, subject, school, and Gurgaon area, and we will help you move into the right Class 10 tutor match without creating more noise.",
  },
  {
    slug: "class-12",
    label: "Class 12",
    heroTitle: "Class 12 Home Tutors in Gurgaon for High-Stakes Board Preparation",
    heroDescription:
      "Premium one-to-one Class 12 tutoring in Gurgaon for families who need subject-expert support across PCM, PCB, Commerce, and senior international-board pathways with stronger revision control and calmer board confidence.",
    identityPoints: [
      "Class 12 is a high-stakes year where school submissions, board pressure, and subject complexity all hit together.",
      "PCM, PCB, and Commerce students usually need different tutor fits and a more deliberate revision order.",
      "Parents often want board specialists rather than generic tuition once subjects start feeling academically expensive.",
      "One-to-one support is especially useful when the student needs subject depth without losing control of the larger board calendar.",
    ],
    boardPathways: [
      {
        board: "CBSE Class 12",
        href: "/boards/cbse/class-12",
        description:
          "Useful for Gurgaon families seeking subject-wise depth in Maths, Physics, Chemistry, Biology, Economics, Accountancy, and Computer Science.",
        keySubjects: ["Maths", "Physics", "Chemistry", "Biology", "Commerce"],
      },
      {
        board: "ISC Class 12",
        href: "/boards/isc/class-12",
        description:
          "Useful where written quality, concept control, and calmer board execution matter across Science and Commerce subjects.",
        keySubjects: ["Maths", "Physics", "Chemistry", "Biology", "Economics"],
      },
      {
        board: "IBDP",
        href: "/boards/ib/ibdp",
        description:
          "Best suited to premium Gurgaon families who need deeper one-to-one senior-subject support in a demanding international-school environment.",
        keySubjects: ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology", "IB Economics"],
      },
    ],
    subjectCards: [
      {
        title: "Maths",
        href: "/boards/cbse/class-12/maths-home-tutor-gurgaon",
        description: "For students who need more stable methods, better accuracy, and stronger paper confidence.",
        boards: ["CBSE", "ISC", "IB relevance"],
      },
      {
        title: "Physics",
        href: "/boards/cbse/class-12/physics-home-tutor-gurgaon",
        description: "Useful when concept clarity and problem-solving confidence both need deeper correction.",
        boards: ["CBSE", "ISC", "IB"],
      },
      {
        title: "Chemistry",
        href: "/boards/cbse/class-12/chemistry-home-tutor-gurgaon",
        description: "For students who need stronger concept linking, recall, and steadier board execution.",
        boards: ["CBSE", "ISC", "IB"],
      },
      {
        title: "Biology",
        href: "/boards/cbse/class-12/biology-home-tutor-gurgaon",
        description: "Useful when recall pressure, written quality, and revision sequencing all need work.",
        boards: ["CBSE", "ISC", "IB"],
      },
      {
        title: "Economics",
        href: "/boards/isc/class-12/economics-home-tutor-gurgaon",
        description: "For students who want stronger written structure, concept clarity, and calmer answer quality.",
        boards: ["ISC", "CBSE"],
      },
      {
        title: "Accountancy",
        href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon",
        description: "Useful for Commerce families who need more disciplined written work and problem accuracy.",
        boards: ["CBSE", "ISC relevance"],
      },
      {
        title: "Computer Science",
        href: "/boards/cbse/class-12/computer-science-home-tutor-gurgaon",
        description: "For students who need better logic flow, stronger syntax control, and board-pattern support.",
        boards: ["CBSE"],
      },
    ],
    painPoints: [
      "Class 12 workload becomes hard to control once school tests, practicals, and revision all overlap.",
      "Students often need different support strategies across numericals, theory-heavy answers, and applied writing.",
      "Weak chapters stay hidden until pre-boards expose how unstable real exam execution still feels.",
      "School pace may not leave enough room to revisit high-weightage topics in a calm and disciplined way.",
      "Parents want subject experts who understand board pattern, answer-writing quality, and premium-school scheduling realities.",
      "Confidence can drop quickly when even serious effort is not translating into cleaner results.",
    ],
    examSupport: [
      "Board-pattern familiarity so the student understands what stronger Class 12 answers actually require.",
      "Structured revision plans built around stream pressure, school calendars, and realistic subject sequencing.",
      "Sample-paper practice with targeted review of steps, method, written quality, and timing.",
      "Support through the pre-board-to-board transition when families need stronger calm and clearer execution.",
      "Doubt-solving that respects subject complexity instead of turning into generic batch-style teaching.",
      "One-to-one support that helps students move from content familiarity to exam confidence more smoothly.",
    ],
    mappingCards: [
      {
        title: "PCM and Science pathways",
        description: "These are the highest-pressure Class 12 subject clusters for Science students across supported boards.",
        items: [
          { subject: "Maths", boards: ["CBSE", "ISC", "IB relevance"], href: "/boards/cbse/class-12/maths-home-tutor-gurgaon" },
          { subject: "Physics", boards: ["CBSE", "ISC", "IB"], href: "/boards/cbse/class-12/physics-home-tutor-gurgaon" },
          { subject: "Chemistry", boards: ["CBSE", "ISC", "IB"], href: "/boards/cbse/class-12/chemistry-home-tutor-gurgaon" },
          { subject: "Biology", boards: ["CBSE", "ISC", "IB"], href: "/boards/cbse/class-12/biology-home-tutor-gurgaon" },
        ],
      },
      {
        title: "Commerce and senior-subject pathways",
        description: "Commerce families usually want subject specialists and clearer written-answer discipline in Class 12.",
        items: [
          { subject: "Economics", boards: ["ISC", "CBSE relevance", "IB relevance"], href: "/boards/isc/class-12/economics-home-tutor-gurgaon" },
          { subject: "Accountancy", boards: ["CBSE", "ISC relevance"], href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon" },
          { subject: "Computer Science", boards: ["CBSE"], href: "/boards/cbse/class-12/computer-science-home-tutor-gurgaon" },
        ],
      },
    ],
    schoolReferences: [
      {
        slug: "the-heritage-school",
        note: "Commonly relevant for parents who want stronger Class 12 subject discipline and calmer board preparation.",
      },
      {
        slug: "shiv-nadar-school",
        note: "Useful where families want subject-expert support tied to school pace and premium scheduling needs.",
      },
      {
        slug: "pathways-world-school",
        note: "Often relevant for senior international-board subject support in premium Gurgaon corridors.",
      },
      {
        slug: "lancers-international",
        note: "Useful for senior-school families who want deeper one-to-one subject support at home.",
      },
    ],
    areaReferences: [
      { slug: "golf-course-road", note: "Strong Class 12 demand from premium school-linked and high-schedule corridors." },
      { slug: "golf-course-extension-road", note: "Useful for one-to-one home tutoring where stream pressure needs more structure." },
      { slug: "dlf-phases", note: "Popular for premium senior-school tutoring across established Gurgaon neighborhoods." },
      { slug: "new-gurgaon", note: "Relevant for Class 12 families seeking subject experts with cleaner home scheduling." },
    ],
    faq: [
      {
        question: "Is Class 12 one of the strongest focus areas for BoardPeFocus?",
        answer:
          "Yes. Class 12 is a major focus because families usually need subject-expert, board-specific, premium one-to-one support during a high-stakes academic year.",
      },
      {
        question: "Can I use the Class 12 hub to choose between boards and subjects?",
        answer:
          "Yes. The page is designed to help parents move from Class 12 into the right board path and then into the most relevant subject pages.",
      },
      {
        question: "Do you support Class 12 tutoring across Gurgaon localities?",
        answer:
          "Yes. The service is Gurgaon / Gurugram only and connects class discovery with school and area relevance.",
      },
      {
        question: "Is the support one-to-one and home focused?",
        answer:
          "Yes. The positioning is premium one-to-one home tutoring for families who want a calmer and more structured Class 12 journey.",
      },
    ],
    relatedLinks: [
      {
        title: "Classes Hub",
        href: "/classes",
        description: "Move back to the main classes page to compare Class 10 and Class 12 pathways more clearly.",
      },
      {
        title: "Boards Hub",
        href: "/boards",
        description: "Compare senior board pathways before moving deeper into Class 12 subject decisions.",
      },
      {
        title: "CBSE Class 12",
        href: "/boards/cbse/class-12",
        description: "Explore the CBSE Class 12 route for Science and Commerce subject pathways.",
      },
      {
        title: "ISC Class 12",
        href: "/boards/isc/class-12",
        description: "Move into the ISC Class 12 page for board-specific subject and revision support.",
      },
      {
        title: "Gurgaon Areas Hub",
        href: "/gurgaon-area",
        description: "Connect the Class 12 journey with local area relevance and home-tutoring practicality.",
      },
    ],
    ctaTitle: "Need a sharper Class 12 tutoring strategy in Gurgaon?",
    ctaDescription:
      "Tell us the board, stream, subject, school, and Gurgaon area, and we will help you move into a more relevant Class 12 tutor match.",
  },
];

export const classesHubFaqs: ClassFaqItem[] = [
  {
    question: "Do you mainly support Class 10 and Class 12 students in Gurgaon?",
    answer:
      "Yes. The Classes hub is intentionally built around Class 10 and Class 12 because that is where board-exam tutoring demand is strongest for Gurgaon families.",
  },
  {
    question: "Can I choose the right board pathway from the Classes hub?",
    answer:
      "Yes. The Classes hub helps parents move from Class 10 or Class 12 into the right board path and then into the relevant subject page.",
  },
  {
    question: "Do class pages connect to schools and Gurgaon areas too?",
    answer:
      "Yes. The class hub system is designed to stay connected to school-aware pages, Gurgaon area pages, and cleaner tutor discovery.",
  },
  {
    question: "Is this a Gurgaon-only one-to-one service?",
    answer:
      "Yes. BoardPeFocus is positioned for Gurgaon / Gurugram families seeking premium one-to-one home tutoring.",
  },
];

export const classesHubRelatedLinks: RelatedLink[] = [
  {
    title: "Boards Hub",
    href: "/boards",
    description: "Move from class discovery into the full board-specific journey across CBSE, ICSE, ISC, IGCSE, and IB.",
  },
  {
    title: "Gurgaon Areas Hub",
    href: "/gurgaon-area",
    description: "Connect class decisions with locality, corridor, and family scheduling relevance.",
  },
  {
    title: "Browse Tutors",
    href: "/search",
    description: "Continue into tutor discovery once the right class, board, and subject path are clearer.",
  },
  {
    title: "Schools Hub",
    href: "/schools",
    description: "Explore school-aware pathways that support better tutoring decisions for parents.",
  },
];

export function getClassHubConfig(classLevel: string) {
  return classHubConfigs.find((config) => config.slug === classLevel);
}

export function getAllClassHubParams() {
  return classHubConfigs.map((config) => ({ classLevel: config.slug }));
}

export function getClassHubPath(classLevel: string) {
  return `/classes/${classLevel}`;
}

export function getAreaDetails(slugs: string[]) {
  return slugs
    .map((slug) => areaClusters.find((cluster) => cluster.slug === slug))
    .filter((cluster): cluster is (typeof areaClusters)[number] => Boolean(cluster));
}

export function getSchoolDetails(slugs: string[]) {
  return slugs
    .map((slug) => mockSchools.find((school) => school.slug === slug))
    .filter((school): school is (typeof mockSchools)[number] => Boolean(school));
}
