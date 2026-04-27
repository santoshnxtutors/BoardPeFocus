import { areaClusters } from "@/data/areas";
import { mockTutors } from "@/data/mock";
import { Tutor } from "@/types";
import { getBoardPath } from "@/app/boards/_data/boards";
import { getClassHubPath } from "@/app/classes/_data/classes";

export interface SchoolFaqItem {
  question: string;
  answer: string;
}

export interface SchoolBoardSupport {
  slug: string;
  label: string;
  href: string;
  description: string;
  keySubjects: string[];
  schoolFit: string;
}

export interface SchoolSubjectSupport {
  slug: string;
  label: string;
  href: string;
  description: string;
  boardFit: string[];
  classFit: string[];
  schoolNeed: string;
}

export interface SchoolClassSupport {
  slug: string;
  label: string;
  href: string;
  description: string;
  focus: string;
}

export interface SchoolAreaSupport {
  slug: string;
  name: string;
  href: string;
  description: string;
  nearbySectors: string[];
  nearbySocieties: string[];
}

export interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

export interface SchoolConfig {
  slug: string;
  name: string;
  shortLabel: string;
  locationCue: string;
  localityCue: string;
  curricula: string[];
  cardDescription: string;
  heroDescription: string;
  overviewSummary: string;
  positioningPoints: string[];
  boardSupport: SchoolBoardSupport[];
  subjectSupport: SchoolSubjectSupport[];
  classSupport: SchoolClassSupport[];
  areaSupport: SchoolAreaSupport[];
  parentQueries: string[];
  trustPoints: string[];
  faq: SchoolFaqItem[];
  relatedTutorSlugs: string[];
}

const boardHrefMap = {
  cbse: getBoardPath("cbse"),
  icse: getBoardPath("icse"),
  isc: getBoardPath("isc"),
  igcse: getBoardPath("igcse"),
  ib: getBoardPath("ib"),
} as const;

const classHrefMap = {
  "class-10": getClassHubPath("class-10"),
  "class-12": getClassHubPath("class-12"),
} as const;

function makeBoardSupport(
  slug: keyof typeof boardHrefMap,
  label: string,
  description: string,
  keySubjects: string[],
  schoolFit: string,
): SchoolBoardSupport {
  return {
    slug,
    label,
    href: boardHrefMap[slug],
    description,
    keySubjects,
    schoolFit,
  };
}

function makeClassSupport(
  slug: keyof typeof classHrefMap,
  label: string,
  description: string,
  focus: string,
): SchoolClassSupport {
  return {
    slug,
    label,
    href: classHrefMap[slug],
    description,
    focus,
  };
}

function makeAreaSupport(
  slug: string,
  name: string,
  description: string,
  nearbySectors: string[],
  nearbySocieties: string[],
): SchoolAreaSupport {
  return {
    slug,
    name,
    href: `/gurgaon-area/${slug}`,
    description,
    nearbySectors,
    nearbySocieties,
  };
}

function makeSubjectSupport(
  slug: string,
  label: string,
  href: string,
  description: string,
  boardFit: string[],
  classFit: string[],
  schoolNeed: string,
): SchoolSubjectSupport {
  return {
    slug,
    label,
    href,
    description,
    boardFit,
    classFit,
    schoolNeed,
  };
}

export const schoolConfigs: SchoolConfig[] = [
  {
    slug: "the-shri-ram-school-aravali",
    name: "The Shri Ram School Aravali",
    shortLabel: "TSRS Aravali",
    locationCue: "DLF Phase 4",
    localityCue: "Best aligned with central DLF and Golf Course belt families who want school-aware board support.",
    curricula: ["ICSE", "ISC"],
    cardDescription:
      "Premium school-aware tutoring for families commonly looking for ICSE and ISC support with stronger revision discipline and written quality.",
    heroDescription:
      "BoardPeFocus supports families studying in The Shri Ram School Aravali with premium one-to-one tutoring built around ICSE and ISC subject pressure, revision structure, and Gurgaon home scheduling.",
    overviewSummary:
      "This school usually calls for calm, curriculum-sensitive tutoring where written quality, Science depth, and senior-board subject execution matter more than generic tuition volume.",
    positioningPoints: [
      "ICSE and ISC support usually needs more subject-specific pacing than broad tuition plans can provide.",
      "Parents commonly want Maths, Science, Physics, and Chemistry handled with tighter revision discipline.",
      "The school-aware angle matters most when families want support that respects internal pace without implying any official association.",
    ],
    boardSupport: [
      makeBoardSupport(
        "icse",
        "ICSE support",
        "Useful when parents want stronger Class 10 Maths, Science, English, and pre-board structure in a more polished one-to-one format.",
        ["Maths", "Science", "English"],
        "A strong fit for Aravali families who want revision discipline and better written precision.",
      ),
      makeBoardSupport(
        "isc",
        "ISC support",
        "Relevant for senior-school Physics, Chemistry, Maths, and Economics support where subject expertise matters more than batch teaching.",
        ["Physics", "Chemistry", "Maths", "Economics"],
        "Especially useful when families want calmer Class 12 board execution and school-sensitive pacing.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "ICSE Maths",
        "/boards/icse/class-10/maths-home-tutor-gurgaon",
        "For students who need stronger method clarity, cleaner steps, and more stable paper confidence.",
        ["ICSE"],
        ["Class 10"],
        "Often requested when strong effort is not yet translating into cleaner scoring.",
      ),
      makeSubjectSupport(
        "science",
        "ICSE Science",
        "/boards/icse/class-10/science-home-tutor-gurgaon",
        "Useful when Physics, Chemistry, and Biology revision needs tighter integration.",
        ["ICSE"],
        ["Class 10"],
        "Commonly relevant for families who want more organized Science revision before the board window.",
      ),
      makeSubjectSupport(
        "physics",
        "ISC Physics",
        "/boards/isc/class-12/physics-home-tutor-gurgaon",
        "For senior students who need concept depth and better application confidence.",
        ["ISC"],
        ["Class 12"],
        "Often requested when Class 12 subject pressure rises and written execution feels unstable.",
      ),
      makeSubjectSupport(
        "chemistry",
        "ISC Chemistry",
        "/boards/isc/class-12/chemistry-home-tutor-gurgaon",
        "Useful for stronger concept linking, recall, and calmer board preparation.",
        ["ISC"],
        ["Class 12"],
        "A good fit when Chemistry needs closer one-to-one revision rather than broad classroom repetition.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Class 10 support",
        "Useful for board-foundation planning, Science and Maths discipline, and calmer revision sequencing.",
        "Best when the family wants cleaner Class 10 structure before pre-boards and finals.",
      ),
      makeClassSupport(
        "class-12",
        "Class 12 support",
        "Useful for subject-expert senior support across ISC Science and other high-pressure board pathways.",
        "Best when school pace, revision, and final execution all need tighter control.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "dlf-phases",
        "DLF Phases",
        "A natural fit for Aravali-linked families who want polished, home-first tutoring close to premium residential clusters.",
        ["DLF Phase 4", "DLF Phase 5"],
        ["Hamilton Court", "Richmond Park", "Regency Park"],
      ),
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "Relevant when the school journey overlaps with premium central Gurgaon schedules and short commute expectations.",
        ["Sector 53", "Sector 54"],
        ["DLF Aralias", "DLF Magnolias"],
      ),
    ],
    parentQueries: [
      "Will the tutor understand the difference between school workload and final board expectations?",
      "Can support focus first on Maths and Science before widening into broader revision?",
      "How do we keep one-to-one sessions aligned with the school pace without adding clutter?",
    ],
    trustPoints: [
      "Curriculum-aware subject support rather than generic tutoring language.",
      "One-to-one revision planning built for Gurgaon family schedules and home visits.",
      "Useful for parents who want calmer matching around board pattern, subject depth, and school pace.",
    ],
    faq: [
      {
        question: "Do you support The Shri Ram School Aravali students by curriculum and subject?",
        answer:
          "Yes. We support families studying in The Shri Ram School Aravali with school-aware ICSE and ISC tutoring across the most commercially important board subjects.",
      },
      {
        question: "Is Class 10 and Class 12 the core focus here as well?",
        answer:
          "Yes. The strongest demand is usually around Class 10 and Class 12 because parents want revision structure, subject expertise, and cleaner board preparation.",
      },
      {
        question: "Do you cover nearby DLF localities too?",
        answer:
          "Yes. The page is designed around Gurgaon home tutoring convenience and nearby premium residential corridors.",
      },
    ],
    relatedTutorSlugs: ["dharambir-prasad-maths", "priyanka-kumari"],
  },
  {
    slug: "the-shri-ram-school-moulsari",
    name: "The Shri Ram School Moulsari",
    shortLabel: "TSRS Moulsari",
    locationCue: "DLF Phase 3",
    localityCue: "Well suited to DLF and Golf Course belt families who want premium-school exam support without generic tutoring clutter.",
    curricula: ["ICSE", "ISC", "IGCSE", "IB"],
    cardDescription:
      "A premium-school support page for families who need school-aware tutoring across ICSE, ISC, IGCSE, and IB-style subject pathways.",
    heroDescription:
      "BoardPeFocus supports families studying in The Shri Ram School Moulsari with one-to-one tutoring that respects curriculum mix, subject complexity, and the premium-school pace common in central Gurgaon.",
    overviewSummary:
      "This school often calls for a more nuanced tutoring plan because curriculum needs can vary sharply across ICSE, ISC, IGCSE, and IB pathways.",
    positioningPoints: [
      "Parents often need curriculum clarity first, then the right subject specialist rather than a generic tutor.",
      "Maths, Science, and senior-board subjects usually need deeper one-to-one correction at this school stage.",
      "School-sensitive pacing matters because premium-school workloads can feel broad even before the final exam window.",
    ],
    boardSupport: [
      makeBoardSupport(
        "icse",
        "ICSE support",
        "Useful for Class 10 families who want stronger Maths, Science, and English discipline with better board confidence.",
        ["Maths", "Science", "English"],
        "A strong fit where the family wants written quality and chapter control improved together.",
      ),
      makeBoardSupport(
        "isc",
        "ISC support",
        "Relevant for senior students who need Physics, Chemistry, Maths, or Economics support in a more premium one-to-one format.",
        ["Physics", "Chemistry", "Maths", "Economics"],
        "Useful for Class 12 planning where subject depth matters more than generic coverage.",
      ),
      makeBoardSupport(
        "igcse",
        "IGCSE support",
        "Useful when internationally paced subject support and exam technique both need closer guidance.",
        ["Maths", "Physics", "Chemistry", "Biology"],
        "A strong fit for families who want subject depth handled more carefully at home.",
      ),
      makeBoardSupport(
        "ib",
        "IB support",
        "Relevant when premium one-to-one support is needed for demanding IB subject pathways and a heavier academic rhythm.",
        ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology"],
        "Useful for senior-school families who want calmer subject control across a demanding curriculum mix.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "Maths support",
        "/boards/igcse/class-10/maths-home-tutor-gurgaon",
        "Useful for students who need stronger concept depth, method control, and exam confidence.",
        ["ICSE", "IGCSE", "IB"],
        ["Class 10", "Class 12"],
        "Often requested because Maths pressure appears across multiple curriculum pathways here.",
      ),
      makeSubjectSupport(
        "science",
        "Science support",
        "/boards/icse/class-10/science-home-tutor-gurgaon",
        "For integrated Science revision when Physics, Chemistry, and Biology are starting to crowd each other.",
        ["ICSE", "IGCSE"],
        ["Class 10"],
        "Useful when families want a more organized Science plan rather than subject-by-subject firefighting.",
      ),
      makeSubjectSupport(
        "physics",
        "Physics support",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "For students who need deeper concept control and more stable application confidence.",
        ["ISC", "IB", "IGCSE"],
        ["Class 12"],
        "A common need when senior students want subject-expert support without leaving the school rhythm behind.",
      ),
      makeSubjectSupport(
        "chemistry",
        "Chemistry support",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "Useful for stronger concept linking, recall, and calmer subject planning at home.",
        ["ISC", "IB", "IGCSE"],
        ["Class 12"],
        "Often relevant when Chemistry understanding feels decent in class but unstable in exam practice.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Class 10 support",
        "Useful for ICSE and IGCSE-style board preparation with stronger revision discipline and subject confidence.",
        "Best when parents want a cleaner Class 10 path across more than one curriculum possibility.",
      ),
      makeClassSupport(
        "class-12",
        "Class 12 support",
        "Useful for ISC and IB senior-subject planning when subject specialization becomes the main priority.",
        "Best when the family wants subject-wise matching and calmer board execution.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "dlf-phases",
        "DLF Phases",
        "A natural match for Moulsari-linked families who prefer premium one-to-one home tutoring near central DLF neighborhoods.",
        ["DLF Phase 3", "DLF Phase 4", "DLF Phase 5"],
        ["DLF Park Place", "DLF Belaire", "Palm Springs"],
      ),
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "Useful when school and home schedules overlap with luxury central Gurgaon corridors.",
        ["Sector 53", "Sector 54"],
        ["DLF Camellias", "DLF Magnolias"],
      ),
    ],
    parentQueries: [
      "Which curriculum pathway should tutoring follow first if the school context feels mixed?",
      "Can one-to-one support stay premium and school-aware without turning into over-scheduling?",
      "How do we choose between a board specialist and a subject specialist here?",
    ],
    trustPoints: [
      "Built for premium-school families who want more intelligent tutor matching by curriculum and subject.",
      "Useful when school pace, board pressure, and home scheduling all need to stay aligned.",
      "One-to-one, Gurgaon-only, and structured around academic clarity instead of directory noise.",
    ],
    faq: [
      {
        question: "Do you support The Shri Ram School Moulsari students across multiple curricula?",
        answer:
          "Yes. The page is designed for families studying in The Shri Ram School Moulsari who may need ICSE, ISC, IGCSE, or IB-aware subject support.",
      },
      {
        question: "Can tutoring be matched by school, board, and subject together?",
        answer:
          "Yes. That is usually the most useful route for premium-school families, especially when subject demand differs by curriculum.",
      },
      {
        question: "Do you cover the nearby DLF and Golf Course belt too?",
        answer:
          "Yes. The school flow is connected to nearby Gurgaon corridors where home tutoring is practical and commercially relevant.",
      },
    ],
    relatedTutorSlugs: ["dharambir-prasad-maths", "c-k-gourav"],
  },
  {
    slug: "the-heritage-school",
    name: "Heritage Xperiential Learning School",
    shortLabel: "Heritage",
    locationCue: "Sector 62 / 64",
    localityCue: "Especially relevant for Golf Course Extension and Sector 62 / 64 families who want stronger CBSE support.",
    curricula: ["CBSE"],
    cardDescription:
      "A premium school-aware page for families who want stronger CBSE support across Class 10 Science, Class 12 PCM / PCB, and English.",
    heroDescription:
      "BoardPeFocus supports families studying in Heritage Xperiential Learning School with premium one-to-one tutoring shaped around CBSE pacing, subject pressure, and Gurgaon home-tutoring practicality.",
    overviewSummary:
      "This school most often drives demand for polished CBSE support where Class 10 Science, senior Science streams, and written confidence all need cleaner structure.",
    positioningPoints: [
      "Class 10 Science and Class 12 Science streams are usually the main pressure points for Heritage-linked families.",
      "CBSE support often needs revision planning and school-sensitive pacing more than broad chapter completion.",
      "Parents usually want a tutor who can reduce noise and bring subject order back into the school schedule.",
    ],
    boardSupport: [
      makeBoardSupport(
        "cbse",
        "CBSE support",
        "Useful for families who want stronger syllabus control, better revision structure, and more stable answer-writing confidence at home.",
        ["Science", "Maths", "Physics", "Chemistry", "Biology", "English"],
        "A strong fit for Heritage-linked Class 10 and Class 12 board preparation in Gurgaon.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "science",
        "Class 10 Science",
        "/boards/cbse/class-10/science-home-tutor-gurgaon",
        "Useful when Science revision needs better organization across Physics, Chemistry, and Biology.",
        ["CBSE"],
        ["Class 10"],
        "One of the most common support angles for Heritage families during the board year.",
      ),
      makeSubjectSupport(
        "maths",
        "Class 10 / 12 Maths",
        "/boards/cbse/class-12/maths-home-tutor-gurgaon",
        "For students who need stronger accuracy, method, and confidence under paper pressure.",
        ["CBSE"],
        ["Class 10", "Class 12"],
        "Useful when Maths effort is high but scoring stability still feels uneven.",
      ),
      makeSubjectSupport(
        "physics",
        "Class 12 Physics",
        "/boards/cbse/class-12/physics-home-tutor-gurgaon",
        "Useful for stronger concept control and calmer board execution in Physics.",
        ["CBSE"],
        ["Class 12"],
        "A common need when PCM pressure starts colliding with school testing and revision.",
      ),
      makeSubjectSupport(
        "chemistry",
        "Class 12 Chemistry",
        "/boards/cbse/class-12/chemistry-home-tutor-gurgaon",
        "For students who need stronger recall, concept linking, and steadier board preparation.",
        ["CBSE"],
        ["Class 12"],
        "Often requested when Chemistry feels decent in class but unstable in serious paper practice.",
      ),
      makeSubjectSupport(
        "biology",
        "Class 12 Biology",
        "/boards/cbse/class-12/biology-home-tutor-gurgaon",
        "Useful for recall-heavy revision, clearer written answers, and calmer exam planning.",
        ["CBSE"],
        ["Class 12"],
        "Commonly relevant for PCB students who need stronger structure at home.",
      ),
      makeSubjectSupport(
        "english",
        "English support",
        "/boards/cbse/class-10/english-home-tutor-gurgaon",
        "For written clarity, stronger response framing, and more confidence in scoring through English.",
        ["CBSE"],
        ["Class 10", "Class 12"],
        "Useful when families want English treated as a real scoring subject instead of an afterthought.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Class 10 support",
        "Useful for Science, Maths, English, and better revision discipline before pre-boards and finals.",
        "Best when parents want the Class 10 board year to feel more organized and less rushed.",
      ),
      makeClassSupport(
        "class-12",
        "Class 12 support",
        "Useful for PCM, PCB, and Commerce-adjacent board pressure when subject-specific help matters most.",
        "Best when Class 12 needs stronger subject experts rather than broad tuition.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "golf-course-extension-road",
        "Golf Course Extension Road",
        "A very practical fit for Heritage-linked families who want school-aware tutoring close to Sector 62 / 64 and nearby premium corridors.",
        ["Sector 57", "Sector 62", "Sector 64"],
        ["Pioneer Park", "Emaar Digi Homes"],
      ),
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "Useful when school travel and home tutoring still revolve around central premium Gurgaon corridors.",
        ["Sector 53", "Sector 54"],
        ["DLF Aralias", "DLF Camellias"],
      ),
    ],
    parentQueries: [
      "Can tutoring focus on Class 10 Science first and then widen out to Maths or English?",
      "How do we build a realistic Class 12 plan when PCM or PCB workload already feels heavy?",
      "Can the tutor stay aligned with school pace without turning the week into over-tuition?",
    ],
    trustPoints: [
      "Built around school-sensitive CBSE support rather than generic tuition wording.",
      "Useful for premium Gurgaon families who want calmer revision planning and stronger subject depth.",
      "One-to-one and locally aware, with clear paths into boards, classes, subjects, and areas.",
    ],
    faq: [
      {
        question: "Do you support Heritage Xperiential Learning School students mainly through CBSE pathways?",
        answer:
          "Yes. The strongest demand from Heritage-linked families is usually CBSE support across Class 10 and Class 12 subject pathways.",
      },
      {
        question: "Can tutoring be matched separately for Class 10 Science or Class 12 PCM / PCB?",
        answer:
          "Yes. Subject-specific matching is often the most useful approach for Heritage families because the pressure points differ by class and stream.",
      },
      {
        question: "Do you cover nearby Sector 62 / 64 and Golf Course Extension localities?",
        answer:
          "Yes. The page is intentionally connected to nearby Gurgaon corridors where home tutoring is practical and commercially relevant.",
      },
    ],
    relatedTutorSlugs: ["dharambir-prasad-maths", "c-k-gourav"],
  },
  {
    slug: "pathways-school-gurgaon",
    name: "Pathways School Gurgaon",
    shortLabel: "Pathways Gurgaon",
    locationCue: "Gurgaon-Faridabad Road",
    localityCue: "Useful for premium families around Baliawas-side and Golf Course linked corridors seeking IB support.",
    curricula: ["IB", "MYP", "DP", "CP"],
    cardDescription:
      "A premium school support page for families who want IB Maths, IB Physics, IB Chemistry, and IB Biology guidance with calmer one-to-one pacing.",
    heroDescription:
      "BoardPeFocus supports families studying in Pathways School Gurgaon with premium one-to-one tutoring for IB pathways, subject depth, revision structure, and school-aware home scheduling in Gurgaon.",
    overviewSummary:
      "Pathways Gurgaon usually calls for a more thoughtful subject-specialist journey where IB academic rhythm and home scheduling both matter.",
    positioningPoints: [
      "IB support usually needs more depth, correction, and pacing than generic tutoring can provide.",
      "Families often want DP and MYP subject help that stays premium, calm, and school-aware.",
      "Maths and Sciences are typically where parents want the strongest subject specialist fit.",
    ],
    boardSupport: [
      makeBoardSupport(
        "ib",
        "IB support",
        "Useful for MYP, DP, and senior-subject planning where concept depth and written precision both matter.",
        ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology", "IB Economics"],
        "A strong fit for Pathways Gurgaon families who want premium one-to-one subject guidance at home.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "IB Maths",
        "/boards/ib/ibdp/maths-home-tutor-gurgaon",
        "Useful when concept depth, application confidence, and calmer revision all need closer support.",
        ["IB"],
        ["Class 10 equivalent", "Class 12 equivalent"],
        "One of the most commercially important support paths for Pathways Gurgaon families.",
      ),
      makeSubjectSupport(
        "physics",
        "IB Physics",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "For stronger concept control, better application confidence, and more stable subject planning.",
        ["IB"],
        ["Class 12 equivalent"],
        "Often requested when Physics needs a real subject specialist rather than a general tutor.",
      ),
      makeSubjectSupport(
        "chemistry",
        "IB Chemistry",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "Useful for concept linking, recall, and steadier one-to-one support across a demanding school calendar.",
        ["IB"],
        ["Class 12 equivalent"],
        "A common parent need when Chemistry feels conceptually familiar but still unstable in assessments.",
      ),
      makeSubjectSupport(
        "biology",
        "IB Biology",
        "/boards/ib/ibdp/biology-hl-home-tutor-gurgaon",
        "For stronger recall, written quality, and more confidence under assessment conditions.",
        ["IB"],
        ["Class 12 equivalent"],
        "Useful when Biology revision needs more structure than school rhythm alone is providing.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Middle and foundation years",
        "Useful when younger IB-stage students need clearer subject structure before senior pressure builds up.",
        "Best when MYP-style Maths and Science support needs to stay premium and calm.",
      ),
      makeClassSupport(
        "class-12",
        "Senior board stage",
        "Useful for DP-style subject specialization where IB Maths and Sciences need a stronger one-to-one plan.",
        "Best when senior-school subject depth becomes the real pressure point.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "Relevant for premium families whose school route and home-tutoring convenience both connect to central Gurgaon corridors.",
        ["Sector 53", "Sector 54"],
        ["DLF Aralias", "DLF Camellias"],
      ),
      makeAreaSupport(
        "golf-course-extension-road",
        "Golf Course Extension Road",
        "Useful when Pathways-linked families also want a practical home-tutoring plan close to premium residential clusters.",
        ["Sector 57", "Sector 62", "Sector 64"],
        ["M3M Golfestate", "Pioneer Park"],
      ),
    ],
    parentQueries: [
      "Should tutoring start with IB Maths or with the science subject that currently feels most unstable?",
      "Can support stay aligned with the school calendar without becoming over-structured?",
      "How do we keep the tutor match genuinely subject-specific for DP-level pressure?",
    ],
    trustPoints: [
      "Useful for Gurgaon IB families who want school-aware subject support without tuition clutter.",
      "Built around premium one-to-one matching for stronger subject depth and calmer academic control.",
      "Connected to Gurgaon areas, boards, classes, and tutors so the page stays commercially useful.",
    ],
    faq: [
      {
        question: "Do you support Pathways School Gurgaon students mainly through IB pathways?",
        answer:
          "Yes. The strongest relevance here is premium IB subject support for families studying in Pathways School Gurgaon.",
      },
      {
        question: "Can tutoring focus on IB Maths and Sciences specifically?",
        answer:
          "Yes. That is one of the most common routes for Pathways Gurgaon families because subject depth matters more than generic tuition.",
      },
      {
        question: "Do you cover nearby premium Gurgaon corridors too?",
        answer:
          "Yes. The school support path is linked to nearby Gurgaon corridors where premium home tutoring remains practical.",
      },
    ],
    relatedTutorSlugs: ["c-k-gourav"],
  },
  {
    slug: "pathways-world-school",
    name: "Pathways World School Gurgaon",
    shortLabel: "Pathways World",
    locationCue: "Sohna Road / Aravali Retreat",
    localityCue: "Useful for premium families on the Sohna and southern Gurgaon belt who want stronger IB support.",
    curricula: ["IB", "MYP", "DP"],
    cardDescription:
      "A premium school-aware page for Pathways World families seeking IB DP, MYP Maths, MYP Science, and calmer one-to-one subject support.",
    heroDescription:
      "BoardPeFocus supports families studying in Pathways World School Gurgaon with premium one-to-one tutoring for IB subject depth, study discipline, and school-aware academic planning across Gurgaon.",
    overviewSummary:
      "Pathways World most often calls for calm subject-specialist support where IB pacing, home scheduling, and deep conceptual work all matter.",
    positioningPoints: [
      "IB families here often want stronger study discipline and better control over subject-specific pressure.",
      "Maths and Sciences usually drive the most urgent enquiries because they need more concept depth and correction.",
      "School-aware planning matters when travel, workload, and premium family schedules all affect tutoring decisions.",
    ],
    boardSupport: [
      makeBoardSupport(
        "ib",
        "IB support",
        "Useful for MYP and DP families who need subject-specific one-to-one tutoring with stronger structure and calmer execution.",
        ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology"],
        "A strong fit for Pathways World families seeking premium school-aware support in Gurgaon.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "IB Maths",
        "/boards/ib/ibdp/maths-home-tutor-gurgaon",
        "Useful when concept depth and application confidence both need closer attention.",
        ["IB"],
        ["Senior board stage"],
        "A high-priority tutoring path for families who want subject depth without extra noise.",
      ),
      makeSubjectSupport(
        "science",
        "MYP Science / Science support",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "Useful when school-level science pressure needs calmer one-to-one subject guidance.",
        ["IB"],
        ["Middle years", "Senior board stage"],
        "Relevant when the family wants a stronger science-study system at home.",
      ),
      makeSubjectSupport(
        "physics",
        "IB Physics",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "For students who need stronger concept control and better application confidence in Physics.",
        ["IB"],
        ["Senior board stage"],
        "A common need when school pace is high and the student wants more confidence in exam-style work.",
      ),
      makeSubjectSupport(
        "chemistry",
        "IB Chemistry",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "Useful for stronger recall, concept linking, and calmer planning in Chemistry.",
        ["IB"],
        ["Senior board stage"],
        "Often requested when the family wants a more premium and focused subject setup.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Foundation-stage support",
        "Useful when MYP-style pressure is rising and the student needs stronger one-to-one subject discipline.",
        "Best when the family wants a calmer build-up before senior board-stage intensity arrives.",
      ),
      makeClassSupport(
        "class-12",
        "Senior board stage",
        "Useful for DP-style Maths and Science support when subject execution becomes the real pressure point.",
        "Best when the student needs subject specialists with a cleaner revision structure.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "sohna-road",
        "Sohna Road",
        "A very practical fit for Pathways World families who prefer dependable home tutoring close to southern Gurgaon corridors.",
        ["Sector 50", "Sector 48"],
        ["Nirvana Country", "South City 2", "Rosewood City"],
      ),
      makeAreaSupport(
        "golf-course-extension-road",
        "Golf Course Extension Road",
        "Useful when premium residential access and school-linked schedules both matter in tutor planning.",
        ["Sector 57", "Sector 62", "Sector 65"],
        ["M3M Latitude", "Emaar Marbella"],
      ),
    ],
    parentQueries: [
      "Can the tutoring plan support both discipline and depth without overwhelming the school routine?",
      "Should we begin with IB Maths or the Science subject currently causing the most pressure?",
      "How do we keep tutoring genuinely one-to-one and subject-expert at this school stage?",
    ],
    trustPoints: [
      "Built around premium IB support for Gurgaon families rather than broad tutoring claims.",
      "Useful when school-sensitive pacing and home-tutoring practicality both matter.",
      "Connected naturally to boards, class hubs, subject pages, and nearby Gurgaon areas.",
    ],
    faq: [
      {
        question: "Do you support Pathways World School Gurgaon students through IB-focused tutoring?",
        answer:
          "Yes. The strongest demand from Pathways World families is IB-focused subject support, especially for Maths and Sciences.",
      },
      {
        question: "Can tutoring be matched for MYP and DP style needs separately?",
        answer:
          "Yes. The support can be matched more carefully depending on whether the need is foundation-stage subject control or senior board-stage specialization.",
      },
      {
        question: "Do you cover the Sohna and southern Gurgaon belt too?",
        answer:
          "Yes. The page is intentionally connected to southern Gurgaon corridors where premium home tutoring remains practical.",
      },
    ],
    relatedTutorSlugs: ["c-k-gourav"],
  },
  {
    slug: "gd-goenka-world-school",
    name: "GD Goenka World School",
    shortLabel: "GD Goenka World",
    locationCue: "Sohna-Gurgaon Road",
    localityCue: "Useful for premium residential-school families on the Sohna side who want IB and IGCSE subject support.",
    curricula: ["IB", "IGCSE", "IBDP"],
    cardDescription:
      "A premium school support page for families seeking IGCSE and IBDP Maths and Science tutoring with more thoughtful one-to-one planning.",
    heroDescription:
      "BoardPeFocus supports families studying in GD Goenka World School with premium one-to-one tutoring for IGCSE and IB pathways, stronger study structure, and school-aware scheduling in Gurgaon.",
    overviewSummary:
      "This school most often creates demand for international-curriculum tutoring where Maths and Sciences need subject specialists rather than generic support.",
    positioningPoints: [
      "IGCSE and IBDP subject support usually needs deeper conceptual correction and steadier planning.",
      "Families often want home tutoring that respects longer travel patterns and premium residential scheduling.",
      "A school-aware approach matters most when parents want clarity on which curriculum and subject need attention first.",
    ],
    boardSupport: [
      makeBoardSupport(
        "igcse",
        "IGCSE support",
        "Useful for concept-heavy Maths and Science support with stronger exam technique and more organized revision.",
        ["Maths", "Physics", "Chemistry", "Biology"],
        "A strong fit when international-board subject execution is becoming the main challenge.",
      ),
      makeBoardSupport(
        "ib",
        "IB support",
        "Relevant for IBDP-style subject planning when Maths and Sciences need stronger one-to-one guidance.",
        ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology"],
        "Useful for premium families wanting calmer subject control during senior-school pressure.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "IGCSE / IB Maths",
        "/boards/igcse/class-10/maths-home-tutor-gurgaon",
        "Useful for concept depth, application confidence, and steadier exam control.",
        ["IGCSE", "IB"],
        ["Class 10 equivalent", "Class 12 equivalent"],
        "One of the strongest high-intent tutoring paths for this school family.",
      ),
      makeSubjectSupport(
        "science",
        "IGCSE Science",
        "/boards/igcse/class-10/physics-home-tutor-gurgaon",
        "Useful when Science support needs to be more integrated and school-aware.",
        ["IGCSE"],
        ["Class 10 equivalent"],
        "A good fit when Physics, Chemistry, and Biology pressure are all rising together.",
      ),
      makeSubjectSupport(
        "physics",
        "IBDP Physics",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "For stronger concept control, application confidence, and calmer board-stage execution.",
        ["IB"],
        ["Class 12 equivalent"],
        "Often relevant when the family wants a subject specialist with more depth.",
      ),
      makeSubjectSupport(
        "chemistry",
        "IBDP Chemistry",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "Useful for concept linking, recall, and steadier one-to-one pacing in Chemistry.",
        ["IB", "IGCSE"],
        ["Class 10 equivalent", "Class 12 equivalent"],
        "A common need when Chemistry feels broader than the school schedule allows for.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Equivalent to Class 10 board stage",
        "Useful when IGCSE-style Maths and Science support needs clearer structure and more confidence.",
        "Best when the family wants a more disciplined early board-stage setup.",
      ),
      makeClassSupport(
        "class-12",
        "Equivalent to Class 12 board stage",
        "Useful for IBDP-style subject pressure where senior Maths and Sciences need premium one-to-one support.",
        "Best when senior-school subject execution has become the highest-stakes issue.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "sohna-road",
        "Sohna Road",
        "A strong fit for GD Goenka-linked families who want premium home tutoring across southern Gurgaon corridors.",
        ["Sector 50", "Sector 48"],
        ["Nirvana Country", "Malibu Town", "Rosewood City"],
      ),
      makeAreaSupport(
        "new-gurgaon",
        "New Gurgaon",
        "Useful when premium residential families want a more practical tutoring route into central academic hubs.",
        ["Sector 82", "Sector 90"],
        ["DLF Garden City", "Smartworld One DXP"],
      ),
    ],
    parentQueries: [
      "Should tutoring begin with IGCSE support or the IB senior-subject pathway?",
      "Can the tutor match reflect both school load and long-commute practicalities?",
      "How do we choose the right subject specialist when Maths and Sciences are both under pressure?",
    ],
    trustPoints: [
      "Built around premium international-curriculum tutoring without making unsupported school claims.",
      "Useful when families need subject depth, calmer structure, and stronger academic control at home.",
      "Connected to areas, boards, classes, and subjects so the page stays useful rather than thin.",
    ],
    faq: [
      {
        question: "Do you support GD Goenka World School students across IGCSE and IB pathways?",
        answer:
          "Yes. The support here is designed mainly for international-curriculum families who want school-aware, subject-specific one-to-one tutoring.",
      },
      {
        question: "Can tutoring focus on Maths and Science first?",
        answer:
          "Yes. Those are usually the most commercially important and urgent subject pathways for families from this school cluster.",
      },
      {
        question: "Do you cover the Sohna and New Gurgaon side too?",
        answer:
          "Yes. The page is connected to nearby Gurgaon corridors where home tutoring and premium residential scheduling remain practical.",
      },
    ],
    relatedTutorSlugs: ["c-k-gourav"],
  },
  {
    slug: "dps-international-gurugram",
    name: "DPS International Gurugram",
    shortLabel: "DPS International",
    locationCue: "South City II / Sector 50",
    localityCue: "Useful for South City II, Sector 50, and Sohna Road families seeking IB-focused subject support.",
    curricula: ["IB", "PYP", "MYP", "DP", "CP"],
    cardDescription:
      "A premium school-aware page for IB MYP and DP families looking for Maths, Science, and senior-subject tutoring in Gurgaon.",
    heroDescription:
      "BoardPeFocus supports families studying in DPS International Gurugram with premium one-to-one tutoring for IB subject pathways, school-sensitive pacing, and cleaner academic structure at home.",
    overviewSummary:
      "This school usually drives demand for IB-focused tutoring where MYP Maths and Science plus DP-level subject pressure need more targeted support.",
    positioningPoints: [
      "IB families here often want MYP Maths and Science support that feels structured but not heavy-handed.",
      "DP subject support usually needs a true specialist once senior-school pressure becomes more intense.",
      "A school-aware tutoring plan matters because premium family schedules and subject load both affect consistency.",
    ],
    boardSupport: [
      makeBoardSupport(
        "ib",
        "IB support",
        "Useful for MYP and DP subject planning across Maths, Science, Physics, Chemistry, Biology, and Economics.",
        ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology"],
        "A strong fit for DPS International families who want a premium and calmer one-to-one setup.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "IB Maths",
        "/boards/ib/ibdp/maths-home-tutor-gurgaon",
        "Useful for stronger application confidence and more stable one-to-one subject control.",
        ["IB"],
        ["MYP", "DP"],
        "A common fit where Maths pacing and subject confidence both need work.",
      ),
      makeSubjectSupport(
        "science",
        "MYP Science",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "Useful for stronger foundational science support before senior subject pressure rises further.",
        ["IB"],
        ["MYP"],
        "Relevant for families who want a clearer science-study routine at home.",
      ),
      makeSubjectSupport(
        "physics",
        "IB DP Physics",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "For senior students who need concept depth and more stable Physics execution.",
        ["IB"],
        ["DP"],
        "Often requested when the family wants a true subject specialist for DP-level pressure.",
      ),
      makeSubjectSupport(
        "chemistry",
        "IB DP Chemistry",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "Useful for stronger subject control, concept recall, and calmer academic pacing.",
        ["IB"],
        ["DP"],
        "A good fit when Chemistry feels increasingly broad under school and exam pressure.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Foundation and middle years",
        "Useful when MYP-style Maths and Science support needs clearer structure without overloading the week.",
        "Best when parents want more subject confidence in the equivalent of a Class 10 board stage.",
      ),
      makeClassSupport(
        "class-12",
        "Senior board stage",
        "Useful for DP-level subject specialization in Maths and Sciences where execution matters more than coverage alone.",
        "Best when families want a premium subject-specialist path for the equivalent of Class 12 pressure.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "sohna-road",
        "Sohna Road",
        "A practical fit for DPS International families who want stronger tutor continuity close to South City II and Sector 50.",
        ["Sector 50", "Sector 49"],
        ["South City 2", "Nirvana Country", "Rosewood City"],
      ),
      makeAreaSupport(
        "south-city-sushant-lok",
        "South City and Sushant Lok",
        "Useful when central Gurgaon access and school-sensitive planning both matter in tutor matching.",
        ["Sector 45", "Sector 46"],
        ["Greenwood City", "South City 2"],
      ),
    ],
    parentQueries: [
      "Can tutoring stay aligned with MYP and DP needs without becoming too broad?",
      "Should we start with Maths, Science, or the senior subject under the most pressure?",
      "How do we keep a premium one-to-one format practical across South City and Sector 50 schedules?",
    ],
    trustPoints: [
      "Built for IB families seeking school-aware tutoring in Gurgaon without generic directory clutter.",
      "Useful when premium scheduling, academic structure, and subject depth all need to stay aligned.",
      "Connected into boards, classes, subject pages, and areas so the discovery journey stays clean.",
    ],
    faq: [
      {
        question: "Do you support DPS International Gurugram students through IB pathways?",
        answer:
          "Yes. The page is designed for IB families studying in DPS International Gurugram who want more structured one-to-one subject support.",
      },
      {
        question: "Can tutoring cover MYP and DP needs differently?",
        answer:
          "Yes. The support can be matched more carefully based on whether the need is foundational subject confidence or senior subject specialization.",
      },
      {
        question: "Do you cover South City II and Sector 50 nearby areas too?",
        answer:
          "Yes. The page is connected to nearby Gurgaon corridors where home tutoring remains practical and commercially relevant.",
      },
    ],
    relatedTutorSlugs: ["c-k-gourav", "dharambir-prasad-maths"],
  },
  {
    slug: "scottish-high-international-school",
    name: "Scottish High International School",
    shortLabel: "Scottish High",
    locationCue: "Sector 57",
    localityCue: "A natural fit for Golf Course Extension families who want mixed-curriculum tutoring with more structure.",
    curricula: ["IB", "Cambridge", "ICSE", "ISC"],
    cardDescription:
      "A premium school-aware page for mixed-curriculum support across IB, Cambridge, ICSE, and ISC subject pathways.",
    heroDescription:
      "BoardPeFocus supports families studying in Scottish High International School with premium one-to-one tutoring across mixed curriculum pathways, school-sensitive pacing, and Gurgaon home access.",
    overviewSummary:
      "Scottish High often creates more nuanced tutoring demand because families may need different subject strategies depending on whether the route is IB, Cambridge, ICSE, or ISC.",
    positioningPoints: [
      "Families often need curriculum clarity first, then the right subject specialist for the current pressure point.",
      "Maths and Sciences remain central across most curriculum combinations at this school cluster.",
      "A school-aware approach is useful when the academic workload feels broad and mixed rather than single-board predictable.",
    ],
    boardSupport: [
      makeBoardSupport(
        "ib",
        "IB support",
        "Useful for students who need deeper one-to-one subject support in premium international-board pathways.",
        ["IB Maths", "IB Physics", "IB Chemistry"],
        "A strong fit when the family wants subject specialists with calmer school-aware pacing.",
      ),
      makeBoardSupport(
        "igcse",
        "Cambridge / IGCSE support",
        "Useful for concept-heavy Maths and Science support with stronger exam technique.",
        ["Maths", "Physics", "Chemistry", "Biology"],
        "Relevant for families who want international-board clarity without batch-style clutter.",
      ),
      makeBoardSupport(
        "icse",
        "ICSE support",
        "Useful for stronger Class 10 subject discipline, written quality, and board confidence.",
        ["Maths", "Science", "English"],
        "A good fit when parents want more polish in board-stage execution.",
      ),
      makeBoardSupport(
        "isc",
        "ISC support",
        "Useful for Class 12 subject depth across Science and Commerce-adjacent senior pathways.",
        ["Physics", "Chemistry", "Maths", "Economics"],
        "Relevant when senior-board subject execution needs cleaner one-to-one correction.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "Maths support",
        "/boards/igcse/class-10/maths-home-tutor-gurgaon",
        "Useful across ICSE, Cambridge, and IB-linked pathways when Maths pressure needs more structure.",
        ["ICSE", "IGCSE", "IB"],
        ["Class 10", "Class 12"],
        "Usually one of the highest-intent tutoring needs for Scottish High families.",
      ),
      makeSubjectSupport(
        "physics",
        "Physics support",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "Useful for deeper concept control and steadier application confidence in senior pathways.",
        ["ISC", "IB", "IGCSE"],
        ["Class 12"],
        "A common need when Physics requires a genuine subject-specialist match.",
      ),
      makeSubjectSupport(
        "chemistry",
        "Chemistry support",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "For stronger concept linking, recall, and cleaner subject planning at home.",
        ["ISC", "IB", "IGCSE"],
        ["Class 12"],
        "Often relevant when the curriculum mix makes Chemistry revision feel too broad.",
      ),
      makeSubjectSupport(
        "english",
        "English support",
        "/boards/icse/class-10/english-home-tutor-gurgaon",
        "Useful for stronger written clarity, response structure, and scoring confidence.",
        ["ICSE", "IGCSE"],
        ["Class 10"],
        "A good fit when English needs more serious attention as a scoring subject.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Class 10 support",
        "Useful for ICSE and Cambridge-style board-stage subject discipline in Maths, Science, and English.",
        "Best when families want a cleaner Class 10 route across mixed-curriculum possibilities.",
      ),
      makeClassSupport(
        "class-12",
        "Class 12 support",
        "Useful for ISC and IB senior-subject planning where subject specialization matters more than general tuition.",
        "Best when senior students need stronger subject-wise control in high-pressure months.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "golf-course-extension-road",
        "Golf Course Extension Road",
        "A natural fit for Scottish High families because school and home tutoring often sit within the same premium corridor.",
        ["Sector 57", "Sector 62", "Sector 65"],
        ["Sushant Lok 3", "Pioneer Park", "M3M Golfestate"],
      ),
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "Useful when premium central Gurgaon access also matters in tutor matching and home-visit practicality.",
        ["Sector 53", "Sector 54"],
        ["DLF Magnolias", "DLF Camellias"],
      ),
    ],
    parentQueries: [
      "Which curriculum route should we optimize tutoring around first?",
      "Can one tutor cover mixed-curriculum pressure, or should the match stay strictly subject-specific?",
      "How do we keep the plan practical for Sector 57 and nearby premium corridors?",
    ],
    trustPoints: [
      "Built around curriculum-aware tutoring rather than generic international-school claims.",
      "Useful when families want premium one-to-one support that understands mixed-curriculum pressure.",
      "Connected to nearby areas, boards, classes, and subjects for a more useful decision path.",
    ],
    faq: [
      {
        question: "Do you support Scottish High International School students across mixed curriculum pathways?",
        answer:
          "Yes. The page is designed for families studying in Scottish High International School who may need IB, Cambridge, ICSE, or ISC-aware subject support.",
      },
      {
        question: "Can tutoring be matched by curriculum and subject together?",
        answer:
          "Yes. That is usually the most useful route for mixed-curriculum schools because the right subject specialist depends on the current academic path.",
      },
      {
        question: "Do you cover Sector 57 and the Golf Course Extension belt too?",
        answer:
          "Yes. The school page is directly connected to nearby Gurgaon corridors where premium home tutoring is practical.",
      },
    ],
    relatedTutorSlugs: ["c-k-gourav", "dharambir-prasad-maths"],
  },
  {
    slug: "lancers-international",
    name: "Lancers International School",
    shortLabel: "Lancers",
    locationCue: "Sector 53 / DLF Phase 5",
    localityCue: "Especially relevant for Golf Course Road families who want IB and IGCSE subject specialists close to home.",
    curricula: ["IB", "IGCSE"],
    cardDescription:
      "A premium school-aware page for families seeking IB and IGCSE tutoring along the Golf Course Road corridor.",
    heroDescription:
      "BoardPeFocus supports families studying in Lancers International School with premium one-to-one tutoring for IB and IGCSE subject pathways, school-sensitive pacing, and efficient Gurgaon home scheduling.",
    overviewSummary:
      "Lancers usually creates demand for premium international-curriculum tutoring where location convenience and subject depth both matter.",
    positioningPoints: [
      "IB and IGCSE families here often want strong subject experts rather than general academic support.",
      "Maths and Sciences remain the most commercially important routes because they need deeper conceptual correction.",
      "Golf Course Road convenience matters because families usually want premium one-to-one tutoring that fits the local schedule cleanly.",
    ],
    boardSupport: [
      makeBoardSupport(
        "ib",
        "IB support",
        "Useful for premium one-to-one subject support in IB senior and middle-school pathways.",
        ["IB Maths", "IB Physics", "IB Chemistry", "IB Biology"],
        "A strong fit for families who want deeper subject control in a premium corridor.",
      ),
      makeBoardSupport(
        "igcse",
        "IGCSE support",
        "Useful for concept-heavy Maths and Science support with cleaner exam technique.",
        ["Maths", "Physics", "Chemistry", "Biology"],
        "Relevant when international-board subject depth matters as much as convenience.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "Maths support",
        "/boards/igcse/class-10/maths-home-tutor-gurgaon",
        "Useful when concept depth and application confidence both need stronger one-to-one correction.",
        ["IGCSE", "IB"],
        ["Class 10 equivalent", "Class 12 equivalent"],
        "One of the most common premium tutoring paths for Lancers-linked families.",
      ),
      makeSubjectSupport(
        "physics",
        "Physics support",
        "/boards/ib/ibdp/physics-hl-home-tutor-gurgaon",
        "Useful for deeper concept control and steadier subject execution in Physics.",
        ["IGCSE", "IB"],
        ["Class 12 equivalent"],
        "Often relevant when senior students need stronger subject specialists.",
      ),
      makeSubjectSupport(
        "chemistry",
        "Chemistry support",
        "/boards/ib/ibdp/chemistry-hl-home-tutor-gurgaon",
        "For stronger recall, concept linking, and calmer Chemistry planning.",
        ["IGCSE", "IB"],
        ["Class 10 equivalent", "Class 12 equivalent"],
        "A good fit when Chemistry pressure is rising across school and exam demands.",
      ),
      makeSubjectSupport(
        "biology",
        "Biology support",
        "/boards/igcse/class-10/biology-home-tutor-gurgaon",
        "Useful for stronger written clarity, recall, and subject stability in Biology.",
        ["IGCSE", "IB"],
        ["Class 10 equivalent", "Class 12 equivalent"],
        "Often requested where Biology needs more structure and active revision.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Foundation board stage",
        "Useful for IGCSE-style Maths and Science discipline when early board-stage pressure is rising.",
        "Best when the family wants more controlled subject support close to Golf Course Road.",
      ),
      makeClassSupport(
        "class-12",
        "Senior board stage",
        "Useful for IB-style senior subject planning where Maths and Sciences need stronger one-to-one support.",
        "Best when the student needs a premium subject-specialist route for high-stakes work.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "A direct fit for Lancers families who want discreet, premium home tutoring close to school and home.",
        ["Sector 53", "Sector 54"],
        ["DLF Aralias", "DLF Magnolias", "DLF Camellias"],
      ),
      makeAreaSupport(
        "dlf-phases",
        "DLF Phases",
        "Useful when families also want premium DLF access and smoother tutor continuity across central Gurgaon.",
        ["DLF Phase 5"],
        ["DLF Park Place", "DLF Belaire", "Palm Springs"],
      ),
    ],
    parentQueries: [
      "Should we optimize tutoring for IB or IGCSE first if subject needs overlap?",
      "Can the tutoring stay premium and local to the Golf Course Road corridor?",
      "How do we pick the right subject specialist when Maths and Sciences are both priorities?",
    ],
    trustPoints: [
      "Built for premium international-curriculum families on the Golf Course belt.",
      "Useful when subject depth, local convenience, and one-to-one quality all matter together.",
      "Connected to areas, boards, classes, and tutor discovery for a smoother user journey.",
    ],
    faq: [
      {
        question: "Do you support Lancers International School students through IB and IGCSE pathways?",
        answer:
          "Yes. The page is designed for Lancers International School families who want subject-specific IB and IGCSE support in Gurgaon.",
      },
      {
        question: "Can tutoring focus on Golf Course Road convenience too?",
        answer:
          "Yes. The school page is intentionally connected to premium nearby Gurgaon corridors because home-visit practicality matters here.",
      },
      {
        question: "Is support mainly for Maths and Science subjects?",
        answer:
          "Those are among the strongest demand clusters, especially when families want premium one-to-one subject specialists rather than broad tutoring.",
      },
    ],
    relatedTutorSlugs: ["c-k-gourav"],
  },
  {
    slug: "shiv-nadar-school",
    name: "Shiv Nadar School Gurugram",
    shortLabel: "Shiv Nadar",
    locationCue: "DLF Phase 1",
    localityCue: "Useful for DLF and central Gurgaon families who want both CBSE and international-curriculum support.",
    curricula: ["CBSE", "IB", "IGCSE"],
    cardDescription:
      "A premium school-aware page for families needing CBSE, IB, and IGCSE support with stronger subject control and calmer board preparation.",
    heroDescription:
      "BoardPeFocus supports families studying in Shiv Nadar School Gurugram with premium one-to-one tutoring across CBSE and international curriculum pathways, subject depth, and Gurgaon home-tutoring convenience.",
    overviewSummary:
      "This school often creates demand for both CBSE and international-curriculum support, so parents usually need stronger board and subject clarity before choosing a tutor path.",
    positioningPoints: [
      "CBSE demand is strong here, but international-curriculum subject support also matters for many families.",
      "Maths, Science, Physics, Chemistry, and Biology usually drive the most commercially important enquiries.",
      "A school-aware approach is useful when families want better alignment between school pace and home revision.",
    ],
    boardSupport: [
      makeBoardSupport(
        "cbse",
        "CBSE support",
        "Useful for Class 10 and Class 12 families who want stronger syllabus control, revision structure, and calmer board confidence.",
        ["Maths", "Science", "Physics", "Chemistry", "Biology"],
        "A strong fit for families who want school-aware board prep without generic tuition clutter.",
      ),
      makeBoardSupport(
        "ib",
        "IB support",
        "Useful when premium one-to-one subject planning is needed for international pathways and heavier academic rhythm.",
        ["IB Maths", "IB Physics", "IB Chemistry"],
        "Relevant for families who want subject specialists rather than broad tutoring.",
      ),
      makeBoardSupport(
        "igcse",
        "IGCSE support",
        "Useful for concept-heavy Maths and Science support with cleaner exam technique and stronger subject stability.",
        ["Maths", "Physics", "Chemistry", "Biology"],
        "A good fit when international-board subject depth matters alongside premium family scheduling.",
      ),
    ],
    subjectSupport: [
      makeSubjectSupport(
        "maths",
        "Maths support",
        "/boards/cbse/class-12/maths-home-tutor-gurgaon",
        "Useful for stronger method clarity, concept control, and steadier paper confidence across multiple board pathways.",
        ["CBSE", "IGCSE", "IB"],
        ["Class 10", "Class 12"],
        "A high-intent subject path for Shiv Nadar families because Maths pressure appears across streams.",
      ),
      makeSubjectSupport(
        "science",
        "Science support",
        "/boards/cbse/class-10/science-home-tutor-gurgaon",
        "Useful when integrated Science revision needs a more disciplined one-to-one approach.",
        ["CBSE"],
        ["Class 10"],
        "A strong fit when school pace and board preparation need better coordination at home.",
      ),
      makeSubjectSupport(
        "physics",
        "Physics support",
        "/boards/cbse/class-12/physics-home-tutor-gurgaon",
        "For deeper concept control and more confidence in high-pressure Physics pathways.",
        ["CBSE", "IB", "IGCSE"],
        ["Class 12"],
        "Often requested when senior students want a subject specialist rather than general tuition.",
      ),
      makeSubjectSupport(
        "chemistry",
        "Chemistry support",
        "/boards/cbse/class-12/chemistry-home-tutor-gurgaon",
        "Useful for stronger concept linking, recall, and steadier planning in Chemistry.",
        ["CBSE", "IB", "IGCSE"],
        ["Class 12"],
        "A common need when subject complexity is rising faster than revision confidence.",
      ),
    ],
    classSupport: [
      makeClassSupport(
        "class-10",
        "Class 10 support",
        "Useful for CBSE and parallel curriculum families who want stronger Science, Maths, and English discipline.",
        "Best when the board-foundation year needs more structure without visual or academic clutter.",
      ),
      makeClassSupport(
        "class-12",
        "Class 12 support",
        "Useful for subject-expert senior support across Science, Commerce, and international pathways.",
        "Best when the family wants calmer Class 12 board preparation and stronger subject specialists.",
      ),
    ],
    areaSupport: [
      makeAreaSupport(
        "dlf-phases",
        "DLF Phases",
        "A direct fit for Shiv Nadar families who want premium home tutoring close to core DLF neighborhoods.",
        ["DLF Phase 1", "DLF Phase 4", "DLF Phase 5"],
        ["Hamilton Court", "DLF Park Place", "Palm Springs"],
      ),
      makeAreaSupport(
        "golf-course-road",
        "Golf Course Road",
        "Useful when central premium corridors still shape the family's school and home-tutoring plan.",
        ["Sector 53", "Sector 54"],
        ["DLF Aralias", "DLF Camellias"],
      ),
    ],
    parentQueries: [
      "Can tutoring be matched cleanly across CBSE and international-curriculum needs?",
      "Should the plan begin with Class 10 Science, Class 12 Physics, or a more board-wide route?",
      "How do we keep school pace, revision structure, and Gurgaon home scheduling aligned?",
    ],
    trustPoints: [
      "Built for premium Gurgaon families who want school-aware board and subject support.",
      "Useful when the right tutor match needs to consider board, class, subject, and locality together.",
      "One-to-one, structured, and connected to nearby areas, class hubs, and board pathways.",
    ],
    faq: [
      {
        question: "Do you support Shiv Nadar School Gurugram students across CBSE and international pathways?",
        answer:
          "Yes. The page is designed for Shiv Nadar families who may need either CBSE support or international-curriculum subject guidance depending on the student's academic path.",
      },
      {
        question: "Can tutoring focus on Class 10 Science or Class 12 senior subjects separately?",
        answer:
          "Yes. Subject-specific matching is usually the most useful route because the demand often differs by class stage and curriculum.",
      },
      {
        question: "Do you cover the DLF and central Gurgaon belt too?",
        answer:
          "Yes. The page is connected to nearby Gurgaon corridors where premium home tutoring is practical and frequently requested.",
      },
    ],
    relatedTutorSlugs: ["dharambir-prasad-maths", "c-k-gourav"],
  },
];

export const schoolsHubFaqs: SchoolFaqItem[] = [
  {
    question: "Which Gurgaon schools are supported on BoardPeFocus?",
    answer:
      "The Schools hub is built around priority Gurgaon and Gurugram school clusters where parents commonly request board-aware one-to-one tutoring, especially for Class 10 and Class 12 pathways.",
  },
  {
    question: "Can tutoring be matched by school and board together?",
    answer:
      "Yes. The school system is designed to connect school relevance with board, class, subject, and Gurgaon area so the final tutor path feels more practical.",
  },
  {
    question: "Are Class 10 and Class 12 still the core focus on school pages?",
    answer:
      "Yes. Those remain the highest-intent academic stages, even when a school supports multiple curricula or broader year groups.",
  },
  {
    question: "Do nearby Gurgaon areas matter in the school flow?",
    answer:
      "Yes. School pages are intentionally connected to nearby Gurgaon sectors, corridors, and area hubs because locality still affects home-tutoring practicality.",
  },
];

export const schoolsHubRelatedLinks: RelatedLink[] = [
  {
    title: "Boards Hub",
    href: "/boards",
    description: "Move from school discovery into the right board-specific tutoring pathway.",
  },
  {
    title: "Class 10 Hub",
    href: getClassHubPath("class-10"),
    description: "Explore the Class 10 discovery hub for board-stage tutoring decisions.",
  },
  {
    title: "Class 12 Hub",
    href: getClassHubPath("class-12"),
    description: "Explore the Class 12 hub for senior-board subject and revision pathways.",
  },
  {
    title: "Gurgaon Areas Hub",
    href: "/gurgaon-area",
    description: "Connect school relevance with Gurgaon corridors, sectors, and premium residential clusters.",
  },
];

const schoolsBySlug = new Map(schoolConfigs.map((school) => [school.slug, school]));

export function getSchoolConfig(schoolSlug: string) {
  return schoolsBySlug.get(schoolSlug);
}

export function getAllSchoolParams() {
  return schoolConfigs.map((school) => ({ schoolSlug: school.slug }));
}

export function getAllSchoolBoardParams() {
  return schoolConfigs.flatMap((school) =>
    school.boardSupport.map((board) => ({
      schoolSlug: school.slug,
      boardSlug: board.slug,
    })),
  );
}

export function getAllSchoolSubjectParams() {
  return schoolConfigs.flatMap((school) =>
    school.subjectSupport.map((subject) => ({
      schoolSlug: school.slug,
      subjectSlug: subject.slug,
    })),
  );
}

export function getAllSchoolClassParams() {
  return schoolConfigs.flatMap((school) =>
    school.classSupport.map((classItem) => ({
      schoolSlug: school.slug,
      classLevel: classItem.slug,
    })),
  );
}

export function getAllSchoolAreaParams() {
  return schoolConfigs.flatMap((school) =>
    school.areaSupport.map((area) => ({
      schoolSlug: school.slug,
      areaSlug: area.slug,
    })),
  );
}

export function getSchoolBoardSupport(schoolSlug: string, boardSlug: string) {
  return getSchoolConfig(schoolSlug)?.boardSupport.find((item) => item.slug === boardSlug);
}

export function getSchoolSubjectSupport(schoolSlug: string, subjectSlug: string) {
  return getSchoolConfig(schoolSlug)?.subjectSupport.find((item) => item.slug === subjectSlug);
}

export function getSchoolClassSupport(schoolSlug: string, classLevel: string) {
  return getSchoolConfig(schoolSlug)?.classSupport.find((item) => item.slug === classLevel);
}

export function getSchoolAreaSupport(schoolSlug: string, areaSlug: string) {
  return getSchoolConfig(schoolSlug)?.areaSupport.find((item) => item.slug === areaSlug);
}

export function getSchoolRelatedTutors(school: SchoolConfig) {
  return school.relatedTutorSlugs
    .map((slug) => mockTutors.find((tutor) => tutor.slug === slug))
    .filter((tutor): tutor is (typeof mockTutors)[number] => Boolean(tutor));
}

export function getSchoolTutorProfiles(school: SchoolConfig): Tutor[] {
  return getSchoolRelatedTutors(school).map((tutor) => ({
    id: tutor.id,
    slug: tutor.slug,
    name: tutor.name,
    photoUrl: tutor.photoUrl,
    rating: tutor.rating,
    experienceYears: tutor.experienceYrs,
    studentsTaught: tutor.studentsTaught,
    boards: tutor.boards,
    subjects: tutor.subjects,
    about: tutor.about || tutor.tagline,
    areas: tutor.locations,
  }));
}

export function getAreaClusterDetail(areaSlug: string) {
  return areaClusters.find((cluster) => cluster.slug === areaSlug) ?? null;
}
