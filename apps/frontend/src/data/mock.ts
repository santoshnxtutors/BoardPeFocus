import { sectorDetails } from "@/data/areas";

type TutorHighlight = {
  label: string;
  value: string;
};

type TutorCoverage = {
  sectors: string[];
  societies: string[];
};

type MockTutorRecord = {
  id: string;
  slug: string;
  name: string;
  photoUrl: string;
  tagline: string;
  boards: string[];
  subjects: string[];
  experienceYrs: number;
  studentsTaught: number;
  rating: number;
  reviewsCount: number;
  about: string;
  methodology: string;
  teachingPhilosophy: string;
  schools: string[];
  locations: string[];
  results: TutorHighlight[];
  coverage: TutorCoverage;
};

const citywideLocations = [
  "DLF Phases",
  "Golf Course Road",
  "Golf Course Extension",
  "Sohna Road",
  "South City",
  "Sushant Lok",
  "New Gurgaon",
];

export const mockTutors: MockTutorRecord[] = [
  {
    id: "dharambir-prasad-maths",
    slug: "dharambir-prasad-maths",
    name: "Dharambir Prasad",
    photoUrl: "/tutors/tutor%20images/dharambirp.jpg",
    tagline: "Senior Mathematics tutor for Class 10 and 12 students across CBSE, ICSE, and IB in Gurugram.",
    boards: ["CBSE", "ICSE", "IB"],
    subjects: ["Mathematics"],
    experienceYrs: 20,
    studentsTaught: 1800,
    rating: 4.9,
    reviewsCount: 3,
    about:
      "Dharambir Prasad brings two decades of focused Mathematics teaching experience for board-stage students in Gurugram. He works closely with Class 10 and 12 learners who need stronger method clarity, cleaner step marking, and more stable paper confidence across algebra, calculus, coordinate geometry, and application-heavy chapters. Families usually approach him when a student understands the concept but still loses marks in execution, speed, or presentation.",
    methodology:
      "His lesson flow begins with a chapter-level diagnosis, followed by concept rebuilding, guided problem solving, and timed board-style practice. Every revision cycle is designed to reduce repeat mistakes, improve written working, and make high-weightage chapters feel manageable under exam pressure.",
    teachingPhilosophy:
      "Strong Maths performance is built through calm repetition, correct method, and steady confidence under timed conditions.",
    schools: [
      "Amity International School",
      "Scottish High International School",
      "DPS International School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "20 Years" },
      { label: "Core Focus", value: "Class 10 and 12 Maths" },
      { label: "Boards", value: "CBSE, ICSE, IB" },
    ],
    coverage: {
      sectors: ["Sector 46", "Sector 53", "Sector 54", "Sector 56", "Sector 57", "Sector 62"],
      societies: ["DLF Park Place", "Palm Springs", "The Camellias", "Pioneer Park"],
    },
  },
  {
    id: "c-k-gourav",
    slug: "c-k-gourav",
    name: "C. K. Gourav",
    photoUrl: "/tutors/tutor%20images/gourav.jpg",
    tagline: "Mathematics specialist for Class 11, 12, and JEE preparation across CBSE, ISC, IGCSE, and IB pathways.",
    boards: ["CBSE", "ISC", "IGCSE", "IB"],
    subjects: ["Mathematics"],
    experienceYrs: 15,
    studentsTaught: 1200,
    rating: 4.9,
    reviewsCount: 3,
    about:
      "C. K. Gourav supports senior-school Mathematics journeys where board preparation and competitive-exam discipline need to work together. With 15 years of experience, he is especially relevant for Class 11 and 12 students who need sharper problem selection, stronger conceptual command, and a cleaner bridge between school exams, boards, and JEE-style thinking. His profile suits families looking for advanced Maths support without losing structure or consistency.",
    methodology:
      "His sessions combine concept layering, problem buckets by difficulty, and timed paper strategy. Students move from chapter mastery into mixed-sheet practice so that school tests, boards, and entrance-oriented numericals can be handled with a more controlled method.",
    teachingPhilosophy:
      "Advanced Mathematics becomes easier when the student learns how to think through a problem, not just how to repeat one.",
    schools: [
      "Amity International School",
      "Scottish High International School",
      "DPS International School",
      "Manav Rachna International School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "15 Years" },
      { label: "Academic Stage", value: "Class 11, 12 and JEE" },
      { label: "Boards", value: "CBSE, ISC, IGCSE, IB" },
    ],
    coverage: {
      sectors: ["Sector 42", "Sector 43", "Sector 53", "Sector 54", "Sector 57", "Sector 65"],
      societies: ["DLF Aralias", "DLF Magnolias", "M3M Golfestate", "The Belaire"],
    },
  },
  {
    id: "priyanka-kumari",
    slug: "priyanka-kumari",
    name: "Priyanka Kumari",
    photoUrl: "/tutors/tutor%20images/priyanka.jpg",
    tagline: "Board-focused Mathematics and Accountancy tutor for Class 10, 11, and 12 students in Gurugram.",
    boards: ["CBSE", "ICSE", "ISC", "IB"],
    subjects: ["Mathematics", "Accountancy"],
    experienceYrs: 13,
    studentsTaught: 1000,
    rating: 4.8,
    reviewsCount: 3,
    about:
      "Priyanka Kumari handles a combination that many Gurugram families specifically look for: Mathematics support at the Class 10 stage and Accountancy guidance for Classes 11 and 12. Her teaching style is especially helpful for students who need cleaner calculations, better working discipline, and more confidence in structured written answers. She is often a strong fit when parents want one tutor who understands both board pressure and commerce-stream accuracy.",
    methodology:
      "Her classes focus on chapter sequencing, error tracking, and board-pattern drills. In Mathematics, the emphasis stays on method and step scoring. In Accountancy, the focus shifts to format discipline, problem flow, and repeated correction of presentation mistakes.",
    teachingPhilosophy:
      "Students improve fastest when clarity, written structure, and confidence grow together instead of being treated as separate problems.",
    schools: [
      "The Shri Ram School Aravali",
      "Amity International School",
      "Scottish High International School",
      "DPS International School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "13 Years" },
      { label: "Core Focus", value: "Maths and Accountancy" },
      { label: "Boards", value: "CBSE, ICSE, ISC, IB" },
    ],
    coverage: {
      sectors: ["Sector 43", "Sector 46", "Sector 54", "Sector 56", "Sector 57", "Sector 62"],
      societies: ["Hamilton Court", "Palm Springs", "The Camellias", "DLF Park Place"],
    },
  },
  {
    id: "dharmbir-prasad-biology",
    slug: "dharmbir-prasad-biology",
    name: "Dharmbir Prasad",
    photoUrl: "/tutors/tutor%20images/dharmbir.jpg",
    tagline: "Experienced Biology tutor for Class 10 and 12 students across CBSE, ICSE, ISC, and IB boards.",
    boards: ["CBSE", "ICSE", "ISC", "IB"],
    subjects: ["Biology"],
    experienceYrs: 20,
    studentsTaught: 1600,
    rating: 4.9,
    reviewsCount: 3,
    about:
      "Dharmbir Prasad specializes in Biology support for students who need stronger recall, clearer diagrams, and more confident written expression in school and board exams. Over 20 years of teaching, he has worked with learners across Class 10 and Class 12 who often feel Biology is content-heavy but still score below expectation because revision lacks structure. His classes are especially relevant when students need better retention, chapter linking, and answer quality.",
    methodology:
      "He teaches through concept mapping, active recall cycles, labelled-diagram practice, and examiner-style answer framing. Each unit is broken into manageable revision blocks so students can build memory, application, and written precision together.",
    teachingPhilosophy:
      "Biology becomes easier when a student learns how to organize the chapter in the mind before trying to memorize the page.",
    schools: [
      "The Shri Ram School Aravali",
      "Amity International School",
      "Scottish High International School",
      "DPS International School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "20 Years" },
      { label: "Core Focus", value: "Class 10 and 12 Biology" },
      { label: "Boards", value: "CBSE, ICSE, ISC, IB" },
    ],
    coverage: {
      sectors: ["Sector 46", "Sector 53", "Sector 56", "Sector 57", "Sector 62", "Sector 65"],
      societies: ["DLF Belaire", "Palm Springs", "M3M Merlin", "Pioneer Park"],
    },
  },
  {
    id: "pooja-kanwar",
    slug: "pooja-kanwar",
    name: "Pooja Kanwar",
    photoUrl: "/tutors/tutor%20images/pooja.jpg",
    tagline: "Senior English tutor for Class 10 and 12 students preparing across CBSE, ICSE, and IB boards.",
    boards: ["CBSE", "ICSE", "IB"],
    subjects: ["English"],
    experienceYrs: 18,
    studentsTaught: 1400,
    rating: 4.9,
    reviewsCount: 3,
    about:
      "Pooja Kanwar supports students who need stronger English writing, better literature interpretation, and more confident board answers. Her work is especially relevant for Class 10 and 12 learners who know the text but struggle with structure, argument quality, or expression under timed conditions. Families usually prefer her profile when written polish matters as much as subject understanding.",
    methodology:
      "Her sessions balance text comprehension, answer planning, vocabulary refinement, and repeated writing review. Students practice how to build cleaner introductions, stronger evidence, and more precise board-ready responses instead of relying on vague memorized points.",
    teachingPhilosophy:
      "Good English results come from clear thinking on the page, not from decorative language without structure.",
    schools: [
      "Amity International School",
      "Scottish High International School",
      "DPS International School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "18 Years" },
      { label: "Core Focus", value: "Class 10 and 12 English" },
      { label: "Boards", value: "CBSE, ICSE, IB" },
    ],
    coverage: {
      sectors: ["Sector 42", "Sector 46", "Sector 53", "Sector 54", "Sector 57", "Sector 62"],
      societies: ["DLF Aralias", "DLF Magnolias", "The Camellias", "Palm Springs"],
    },
  },
  {
    id: "vikash-kumar-ojha",
    slug: "vikash-kumar-ojha",
    name: "Vikash Kumar Ojha",
    photoUrl: "/tutors/tutor%20images/vikash.jpg",
    tagline: "Mathematics tutor for Class 10 and 12 students across CBSE, ICSE, and IB with home tutoring across Gurugram.",
    boards: ["CBSE", "ICSE", "IB"],
    subjects: ["Mathematics"],
    experienceYrs: 15,
    studentsTaught: 1100,
    rating: 4.8,
    reviewsCount: 3,
    about:
      "Vikash Kumar Ojha teaches Mathematics with a practical, student-friendly style that suits board-stage learners who need stronger chapter control and more confidence in repeated practice. With 15 years of experience, he is a useful fit for families looking for dependable Class 10 and 12 support across CBSE, ICSE, and IB-aligned school contexts. His classes are often chosen when a student needs consistency, patience, and a more systematic revision pace.",
    methodology:
      "He uses chapter mapping, example-led explanation, and gradual movement into board-style worksheets. Sessions are built to improve speed, reduce common calculation errors, and keep revision structured even during busy school weeks.",
    teachingPhilosophy:
      "Students grow in Maths when the process feels repeatable, clear, and calm enough to trust in the exam hall.",
    schools: [
      "The Shri Ram School Aravali",
      "Amity International School",
      "Scottish High International School",
      "DPS International School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "15 Years" },
      { label: "Core Focus", value: "Class 10 and 12 Maths" },
      { label: "Boards", value: "CBSE, ICSE, IB" },
    ],
    coverage: {
      sectors: ["Sector 46", "Sector 53", "Sector 54", "Sector 56", "Sector 62", "Sector 67"],
      societies: ["Park Place", "Palm Springs", "M3M Golfestate", "The Belaire"],
    },
  },
  {
    id: "dimple-sachdeva",
    slug: "dimple-sachdeva",
    name: "Dimple Sachdeva",
    photoUrl: "/tutors/tutor%20images/dimple.jpg",
    tagline: "Hindi specialist for Class 10 students preparing for stronger board writing and language confidence.",
    boards: ["CBSE"],
    subjects: ["Hindi"],
    experienceYrs: 14,
    studentsTaught: 950,
    rating: 4.8,
    reviewsCount: 3,
    about:
      "Dimple Sachdeva focuses on Class 10 Hindi support for students who need stronger grammar control, cleaner written expression, and more confidence in literature-based answers. Her profile is especially useful for families who want Hindi to stop being an unstable scoring subject before board exams. She works with a structured, patient style that helps students become more accurate and expressive without making the subject feel overwhelming.",
    methodology:
      "Her teaching plan combines chapter explanation, grammar reinforcement, written-answer correction, and repeated revision of common board question formats. Students are guided on how to write more clearly, avoid avoidable errors, and build consistency in language papers.",
    teachingPhilosophy:
      "Language scores improve when a student learns how to express clearly, revise regularly, and write with intention.",
    schools: [
      "Amity International School",
      "Gems International School",
      "GD Goenka World School",
    ],
    locations: citywideLocations,
    results: [
      { label: "Experience", value: "14 Years" },
      { label: "Core Focus", value: "Class 10 Hindi" },
      { label: "Board", value: "CBSE" },
    ],
    coverage: {
      sectors: ["Sector 47", "Sector 49", "Sector 56", "Sector 57", "Sector 62", "Sector 65"],
      societies: ["Nirvana Country", "Uppal Southend", "Pioneer Park", "M3M Merlin"],
    },
  },
];

export const mockBoards = [
  { slug: "cbse", name: "CBSE", description: "Central Board of Secondary Education", popularity: "High" },
  { slug: "icse", name: "ICSE", description: "Indian Certificate of Secondary Education", popularity: "High" },
  { slug: "isc", name: "ISC", description: "Indian School Certificate", popularity: "Medium" },
  { slug: "igcse", name: "IGCSE", description: "International General Certificate of Secondary Education", popularity: "Premium" },
  { slug: "ib", name: "IB", description: "International Baccalaureate", popularity: "Premium" },
];

export const mockSubjects = [
  { slug: "mathematics", name: "Mathematics" },
  { slug: "physics", name: "Physics" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "biology", name: "Biology" },
  { slug: "accountancy", name: "Accountancy" },
  { slug: "economics", name: "Economics" },
  { slug: "english", name: "English" },
  { slug: "hindi", name: "Hindi" },
];

export const mockSchools = [
  { slug: "dps-sector-45", name: "DPS Sector 45", boards: ["CBSE"], location: "Sector 45" },
  { slug: "dps-sushant-lok", name: "DPS Sushant Lok", boards: ["CBSE"], location: "Sushant Lok" },
  { slug: "the-shri-ram-school-aravali", name: "The Shri Ram School Aravali", boards: ["ICSE", "ISC"], location: "DLF Phase 4" },
  { slug: "the-shri-ram-school-moulsari", name: "The Shri Ram School Moulsari", boards: ["ICSE", "ISC", "IGCSE", "IB"], location: "DLF Phase 3" },
  { slug: "the-heritage-school", name: "The Heritage School", boards: ["CBSE"], location: "Sector 62" },
  { slug: "shiv-nadar-school", name: "Shiv Nadar School", boards: ["CBSE", "IB", "IGCSE"], location: "DLF Phase 1" },
  { slug: "pathways-world-school", name: "Pathways World School", boards: ["IB", "IGCSE"], location: "Aravali Retreat" },
  { slug: "lancers-international", name: "Lancers International School", boards: ["IB", "IGCSE"], location: "DLF Phase 5" },
  { slug: "scottish-high-international-school", name: "Scottish High International School", boards: ["CBSE", "IB", "IGCSE", "ISC"], location: "DLF Phase 5" },
  { slug: "amity-international-sector-46", name: "Amity International School", boards: ["CBSE"], location: "Sector 46" },
  { slug: "dps-international-school", name: "DPS International School", boards: ["CBSE", "IB"], location: "Sector 50" },
  { slug: "gd-goenka-world-school", name: "GD Goenka World School", boards: ["CBSE", "IB", "IGCSE"], location: "Sohna Road" },
  { slug: "gems-international-school", name: "Gems International School", boards: ["CBSE", "IB"], location: "Sector 49" },
  { slug: "manav-rachna-international-school", name: "Manav Rachna International School", boards: ["CBSE", "IB", "IGCSE"], location: "Sector 46" },
];

export const mockSectors = sectorDetails.map((sector) => ({
  slug: sector.slug,
  name: sector.name,
  societies: sector.societies.map((society) => society.name),
}));
