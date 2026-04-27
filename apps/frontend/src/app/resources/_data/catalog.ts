import { ResourceCategory, ResourceFaqItem, ResourceLinkCard } from "@/app/resources/_data/types";
import { getBoardPath } from "@/app/boards/_data/boards";
import { getClassHubPath } from "@/app/classes/_data/classes";

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "board-guides",
    title: "Board Guides",
    description: "High-intent board guides that help parents move from board selection into the right commercial tutoring path.",
    audience: "Parents choosing the right board-aware route in Gurgaon.",
    ctaLabel: "Explore Guides",
    heroTitle: "Board guides for Gurgaon families who want cleaner board-specific decisions",
    heroDescription:
      "Use this category to compare board expectations, revision patterns, and the next logical tutoring pages for CBSE, ICSE, ISC, IGCSE, and IB support in Gurgaon.",
  },
  {
    slug: "class-10-revision-plans",
    title: "Class 10 Revision Plans",
    description: "Revision-first guidance for Class 10 students across Maths, Science, English, and board confidence.",
    audience: "Families preparing for the first major board year.",
    ctaLabel: "Explore Guides",
    heroTitle: "Class 10 revision guides for Gurgaon families who want structure before pressure builds",
    heroDescription:
      "These guides help Class 10 families move from vague concern into a clearer revision plan covering subject priorities, test practice, and the right tutoring next step.",
  },
  {
    slug: "class-12-preparation-blueprints",
    title: "Class 12 Preparation Blueprints",
    description: "Stream-specific preparation blueprints for PCM, PCB, and commerce board preparation in Gurgaon.",
    audience: "Parents and students planning senior-board subject strategy.",
    ctaLabel: "Explore Blueprints",
    heroTitle: "Class 12 preparation blueprints for PCM, PCB, and commerce students in Gurgaon",
    heroDescription:
      "This category is built for families who want a calmer, more strategic plan for high-stakes Class 12 preparation across board-specific and stream-specific pressure points.",
  },
  {
    slug: "subject-strategy-guides",
    title: "Subject Strategy Guides",
    description: "Subject-led preparation pages covering Maths, Physics, Chemistry, Biology, English, and exam-pattern strategy.",
    audience: "Students and parents solving for the toughest subject first.",
    ctaLabel: "Explore Guides",
    heroTitle: "Subject strategy guides built for board-exam pressure in Gurgaon",
    heroDescription:
      "Use these pages when you already know the main academic problem is subject-specific and you want a more practical path into tutoring, schools, boards, and area relevance.",
  },
  {
    slug: "pre-board-to-board-transition-guides",
    title: "Pre-board to Board Transition Guides",
    description: "Support for the shift from school tests and pre-boards into calmer, more reliable final-board execution.",
    audience: "Families whose main worry is the final board stretch.",
    ctaLabel: "Explore Guides",
    heroTitle: "Pre-board to board transition guides for families who want cleaner execution",
    heroDescription:
      "These resources focus on the weeks where revision quality, confidence, answer-writing, and school pace all start colliding at once.",
  },
  {
    slug: "parent-faqs",
    title: "Parent FAQs",
    description: "High-trust answers to the questions parents ask most often before hiring a tutor or changing study plans.",
    audience: "Parents making timing, frequency, and strategy decisions.",
    ctaLabel: "Explore FAQs",
    heroTitle: "Parent FAQs for Gurgaon families planning board-exam tutoring",
    heroDescription:
      "These FAQ-style guides answer the practical questions parents ask before committing to tutoring, including timing, session frequency, and when to change the study mix.",
  },
  {
    slug: "school-season-support",
    title: "School-Season Support",
    description: "School-aware content for premium Gurgaon families navigating board pressure around the school calendar.",
    audience: "Families whose decisions are heavily shaped by school workload and seasonality.",
    ctaLabel: "Explore Guides",
    heroTitle: "School-season support guides for premium Gurgaon school families",
    heroDescription:
      "This category helps parents think more clearly about revision timing, school pace, board pattern relevance, and how tutoring should adapt without implying any official affiliation.",
  },
  {
    slug: "sample-paper-and-exam-strategy-guides",
    title: "Sample Paper & Exam Strategy Guides",
    description: "Practical resources about sample papers, answer-writing discipline, and exam strategy that actually helps scoring.",
    audience: "Students close to exams who need better execution, not more clutter.",
    ctaLabel: "Explore Guides",
    heroTitle: "Sample paper and exam strategy guides for Gurgaon board students",
    heroDescription:
      "These pages help students turn preparation into cleaner board execution with better paper selection, time use, and answer presentation.",
  },
  {
    slug: "local-support-guides",
    title: "Local Support Guides",
    description: "Gurgaon-specific guides connecting high-intent areas and school corridors to the right tutoring routes.",
    audience: "Families searching through area, locality, or corridor context first.",
    ctaLabel: "Explore Local Guides",
    heroTitle: "Local support guides for Gurgaon corridors, sectors, and school-linked neighborhoods",
    heroDescription:
      "Use these pages when locality, school commute, or Gurgaon corridor relevance is part of the tutoring decision from the beginning.",
  },
];

export const resourcesHubFaqs: ResourceFaqItem[] = [
  {
    question: "What kind of resources does BoardPeFocus publish?",
    answer:
      "The resource center focuses on board guides, class-specific revision plans, subject strategy pages, parent FAQs, school-season support, and Gurgaon-specific study support guides.",
  },
  {
    question: "Are these resources connected to actual tutoring pages?",
    answer:
      "Yes. The goal is to help parents and students move cleanly from informational reading into the right board, class, subject, school, area, and contact path when needed.",
  },
  {
    question: "Is the resource center Gurgaon-specific?",
    answer:
      "Yes. The commercial positioning stays Gurgaon / Gurugram focused, especially where school context, area relevance, and home-tutoring practicality matter.",
  },
  {
    question: "Do the guides mainly support Class 10 and Class 12?",
    answer:
      "Yes. Most of the guidance is written around Class 10 and Class 12 because that is where the strongest board-exam demand usually sits.",
  },
];

export const resourceBoardsBrowse = [
  { label: "CBSE", href: getBoardPath("cbse") },
  { label: "ICSE", href: getBoardPath("icse") },
  { label: "ISC", href: getBoardPath("isc") },
  { label: "IGCSE", href: getBoardPath("igcse") },
  { label: "IB", href: getBoardPath("ib") },
];

export const resourceClassesBrowse = [
  { label: "Class 10 Hub", href: getClassHubPath("class-10") },
  { label: "Class 12 Hub", href: getClassHubPath("class-12") },
];

export const resourceSubjectsBrowse = [
  { label: "Maths", href: "/boards/cbse/class-10/maths-home-tutor-gurgaon" },
  { label: "Physics", href: "/boards/cbse/class-12/physics-home-tutor-gurgaon" },
  { label: "Chemistry", href: "/boards/cbse/class-12/chemistry-home-tutor-gurgaon" },
  { label: "Biology", href: "/boards/cbse/class-12/biology-home-tutor-gurgaon" },
  { label: "Science", href: "/boards/cbse/class-10/science-home-tutor-gurgaon" },
  { label: "English", href: "/boards/icse/class-10/english-home-tutor-gurgaon" },
  { label: "Economics", href: "/boards/isc/class-12/economics-home-tutor-gurgaon" },
  { label: "Accountancy", href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon" },
  { label: "Computer Science", href: "/boards/cbse/class-12/computer-science-home-tutor-gurgaon" },
];

export const resourceEntryPoints: ResourceLinkCard[] = [
  {
    title: "Pathways World School Gurgaon",
    href: "/schools/pathways-world-school",
    description: "Useful for IB-heavy family journeys where school context shapes revision timing and subject-specialist demand.",
  },
  {
    title: "Scottish High International School",
    href: "/schools/scottish-high-international-school",
    description: "A good fit for mixed-curriculum and premium-school support journeys across Class 10, Class 12, and international-board subject pressure.",
  },
  {
    title: "Golf Course Road",
    href: "/gurgaon-area/golf-course-road",
    description: "A high-intent Gurgaon corridor for families who want local relevance, premium tutoring, and subject-specific support routes.",
  },
  {
    title: "DLF Phases",
    href: "/gurgaon-area/dlf-phases",
    description: "Useful where school linkage, travel efficiency, and premium home tutoring all matter together.",
  },
  {
    title: "Local support guide: Golf Course Road",
    href: "/resources/local-support-guides/board-exam-tutor-support-near-golf-course-road",
    description: "A local guide that shows how area-led journeys can still move naturally into board, class, and subject pages.",
  },
  {
    title: "Schools Hub",
    href: "/schools",
    description: "Browse premium school-aware entry points before narrowing into a board, subject, or area-specific support page.",
  },
];

export const parentHelpLinks: ResourceLinkCard[] = [
  {
    title: "How many months before boards should we hire a tutor?",
    href: "/resources/parent-faqs/how-many-months-before-boards-should-we-hire-a-tutor",
    description: "Timing advice for families who do not want to wait until pressure turns into backlog.",
  },
  {
    title: "How many sessions per week are ideal?",
    href: "/resources/parent-faqs/how-many-sessions-per-week-for-board-prep",
    description: "A practical guide to balancing board pressure, school pace, and family schedule.",
  },
  {
    title: "When should concept-building shift to test practice?",
    href: "/resources/parent-faqs/when-to-shift-from-concepts-to-test-practice",
    description: "Useful when the student is studying regularly but still not converting that effort into board confidence.",
  },
];

export const resourcesHubTrustPoints = [
  "Board-aware tutoring guidance rooted in real Class 10 and Class 12 pressure points.",
  "Subject-specialist orientation so the resource center supports strong money pages, not generic blog content.",
  "School-aware and Gurgaon-specific context where locality, schedule, and school season matter.",
  "A clean bridge from information to action, including board hubs, class hubs, subject pages, schools, areas, and contact routes.",
];

export const resourcesHubRelatedLinks: ResourceLinkCard[] = [
  {
    title: "Boards Hub",
    href: "/boards",
    description: "Move from informational resources into the right board-specific authority page.",
  },
  {
    title: "Classes Hub",
    href: "/classes",
    description: "Use Class 10 and Class 12 hubs when the exam-stage decision matters more than the board label.",
  },
  {
    title: "Schools Hub",
    href: "/schools",
    description: "Keep school-aware decision paths connected to the new resource center.",
  },
  {
    title: "Gurgaon Areas Hub",
    href: "/gurgaon-area",
    description: "Add corridor, sector, and society context where tutoring practicality affects the decision.",
  },
  {
    title: "Contact BoardPeFocus",
    href: "/contact",
    description: "Use this path when the family is ready to move from reading into a matched tutor conversation.",
  },
  {
    title: "Browse Tutors",
    href: "/search",
    description: "See tutor profiles after narrowing the right board, class, or subject route.",
  },
];

export function getResourceCategory(slug: string) {
  return resourceCategories.find((category) => category.slug === slug);
}

export function getAllResourceCategoryParams() {
  return resourceCategories.map((category) => ({ category: category.slug }));
}
