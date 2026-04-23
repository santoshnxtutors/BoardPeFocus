export interface ResultFaqItem {
  question: string;
  answer: string;
}

export interface ResultCategory {
  title: string;
  description: string;
  href: string;
}

export interface ResultLinkCard {
  title: string;
  description: string;
  href: string;
}

export const resultCategories: ResultCategory[] = [
  {
    title: "Parent testimonials",
    description: "Parent-first trust signals that connect real decision concerns to the right board, class, and tutor path.",
    href: "/resources/parent-faqs/how-many-months-before-boards-should-we-hire-a-tutor",
  },
  {
    title: "Student progress stories",
    description: "Useful for families who want to understand what improved structure and one-to-one support actually look like in practice.",
    href: "/resources/board-guides/class-10-board-revision-plan-gurgaon",
  },
  {
    title: "Board-wise success paths",
    description: "Move from proof intent into CBSE, ICSE, ISC, IGCSE, and IB authority pages without browsing randomly.",
    href: "/boards",
  },
  {
    title: "Subject support proof",
    description: "Explore Maths, Science, Physics, Chemistry, Biology, Economics, and Accountancy routes where subject outcomes matter most.",
    href: "/classes",
  },
  {
    title: "School and locality context",
    description: "Useful for families who think in school corridor, sector, society, and commute logic before they choose the tutor route.",
    href: "/schools",
  },
  {
    title: "Tutor profile proof",
    description: "Browse tutor profiles, subject fit, and area relevance before moving into callback or WhatsApp.",
    href: "/search",
  },
];

export const resultBoardLinks: ResultLinkCard[] = [
  {
    title: "CBSE support stories",
    description: "See how CBSE journeys connect from board planning into Class 10, Class 12, and subject-specific tutoring paths.",
    href: "/boards/cbse",
  },
  {
    title: "ICSE and ISC proof paths",
    description: "Useful for families who want written-quality support, calmer revision, and senior-board subject depth.",
    href: "/boards/icse",
  },
  {
    title: "IB and IGCSE progress routes",
    description: "Explore international-board pages, school-aware pathways, and premium one-to-one subject support.",
    href: "/boards/ib",
  },
];

export const resultSubjectLinks: ResultLinkCard[] = [
  {
    title: "Maths support proof",
    description: "Good for families who want subject-led trust before choosing the tutor route.",
    href: "/boards/cbse/class-10/maths-home-tutor-gurgaon",
  },
  {
    title: "Physics and Chemistry pathways",
    description: "Senior-board science proof flows tied to Class 12 pressure, school context, and tutor matching.",
    href: "/boards/cbse/class-12/physics-home-tutor-gurgaon",
  },
  {
    title: "Biology, Economics, and Accountancy",
    description: "Use these pages when subject clarity matters more than broad board-level browsing.",
    href: "/boards/cbse/class-12/biology-home-tutor-gurgaon",
  },
];

export const resultTutorLinks: ResultLinkCard[] = [
  {
    title: "Dharambir Prasad",
    description: "A strong Class 10 and 12 Mathematics profile for families looking for structured board-focused support across CBSE, ICSE, and IB.",
    href: "/tutors/dharambir-prasad-maths",
  },
  {
    title: "C. K. Gourav",
    description: "Useful for senior-school families who want stronger Mathematics support across board preparation and JEE-oriented problem solving.",
    href: "/tutors/c-k-gourav",
  },
  {
    title: "Priyanka Kumari",
    description: "A practical fit for families looking for Mathematics and Accountancy support with cleaner written structure and calmer board preparation.",
    href: "/tutors/priyanka-kumari",
  },
];

export const resultCaseStudyLinks: ResultLinkCard[] = [
  {
    title: "Class 10 revision plan",
    description: "A resource-led proof path that shows what a calmer board-prep system looks like before tutoring becomes urgent.",
    href: "/resources/board-guides/class-10-board-revision-plan-gurgaon",
  },
  {
    title: "Class 12 PCM blueprint",
    description: "A senior-board strategy guide that shows how structure and subject matching can change the preparation quality.",
    href: "/resources/class-12-preparation-blueprints/class-12-pcm-board-preparation-blueprint-gurgaon",
  },
  {
    title: "Golf Course Road local support guide",
    description: "A locality-aware guide showing how area relevance and school context feed into the final tutor decision.",
    href: "/resources/local-support-guides/board-exam-tutor-support-near-golf-course-road",
  },
];

export const resultRelatedLinks: ResultLinkCard[] = [
  {
    title: "Boards Hub",
    description: "Move from proof-led browsing into the right board-specific authority page.",
    href: "/boards",
  },
  {
    title: "Classes Hub",
    description: "Use Class 10 and Class 12 pages when the exam-stage journey is the next logical step.",
    href: "/classes",
  },
  {
    title: "Schools Hub",
    description: "Keep school-aware proof journeys connected to the right school pages.",
    href: "/schools",
  },
  {
    title: "Gurgaon Areas Hub",
    description: "Add locality, sector, and society context if travel and home scheduling matter in the decision.",
    href: "/gurgaon-area",
  },
  {
    title: "Browse tutors",
    description: "Jump into tutor profiles if the family already knows the board, class, or subject path.",
    href: "/search",
  },
  {
    title: "Request callback",
    description: "Use a direct enquiry path when the family is ready to move from proof into matching.",
    href: "/contact",
  },
];

export const resultsFaqs: ResultFaqItem[] = [
  {
    question: "What kind of proof does the Results page show?",
    answer:
      "This page focuses on truthful proof layers: tutor expertise, subject pathways, case-study style guides, school-aware routes, and parent-relevant decision support rather than fabricated marks or fake testimonials.",
  },
  {
    question: "Does the Results page replace tutor profiles?",
    answer:
      "No. It works as a trust and discovery layer that routes families into tutor profiles, board pages, class hubs, subject pages, and contact paths.",
  },
  {
    question: "Are school names on this page endorsements?",
    answer:
      "No. School references are included only as relevance signals for families studying in or searching around those school contexts.",
  },
];
