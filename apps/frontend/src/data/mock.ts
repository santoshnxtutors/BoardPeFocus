export const mockTutors = [
  {
    id: "dr-sharma-1",
    slug: "dr-sharma-1",
    name: "Dr. Arvind Sharma",
    photoUrl: "/tutors/sharma.jpg", // placeholder
    tagline: "Specialized in CBSE & ICSE Mathematics for Grades 10 and 12",
    boards: ["CBSE", "ICSE"],
    subjects: ["Mathematics", "Physics"],
    experienceYrs: 12,
    studentsTaught: 450,
    rating: 4.9,
    reviewsCount: 84,
    about: "Dr. Sharma brings over a decade of dedicated teaching experience in Mathematics and Physics. With a deep understanding of the CBSE and ICSE curricula, he has consistently helped students achieve top percentiles. His methodology focuses on building strong fundamentals before tackling complex problem-solving techniques essential for board exams.",
    methodology: "My approach is simple: understand the 'why' before the 'how'. We start with real-world applications of mathematical concepts, then move to rigorous practice using past 10-year board papers. Every student gets a customized study plan based on their baseline assessment.",
    schools: ["DPS Sector 45", "The Heritage School", "Shiv Nadar School"],
    locations: ["Sector 45", "Sector 50", "Golf Course Road"],
  },
  {
    id: "ms-gupta-2",
    slug: "ms-gupta-2",
    name: "Ms. Anjali Gupta",
    photoUrl: "/tutors/gupta.jpg",
    tagline: "Expert IB DP & IGCSE Chemistry Educator",
    boards: ["IBDP", "IGCSE", "Cambridge"],
    subjects: ["Chemistry", "Biology"],
    experienceYrs: 8,
    studentsTaught: 210,
    rating: 4.8,
    reviewsCount: 56,
    about: "Ms. Gupta specializes in international boards, guiding students through the rigorous requirements of IB and IGCSE sciences. Her focus on conceptual clarity and extensive past-paper practice ensures her students are exceptionally well-prepared for their final assessments.",
    methodology: "I believe in interactive learning. Chemistry isn't just about memorizing the periodic table; it's about understanding the fundamental laws governing matter. I use digital simulations alongside rigorous textbook problems to solidify understanding.",
    schools: ["Pathways World School", "GD Goenka World School", "Lancers International"],
    locations: ["DLF Phase 5", "Golf Course Ext Road", "Sector 56"],
  },
  {
    id: "mr-verma-3",
    slug: "mr-verma-3",
    name: "Mr. Rajesh Verma",
    photoUrl: "/tutors/verma.jpg",
    tagline: "Senior Commerce Faculty for CBSE Class 12",
    boards: ["CBSE", "ISC"],
    subjects: ["Accountancy", "Economics", "Business Studies"],
    experienceYrs: 15,
    studentsTaught: 800,
    rating: 5.0,
    reviewsCount: 112,
    about: "With 15 years of experience exclusively teaching Commerce subjects to board students, Mr. Verma is a recognized expert in Accountancy and Economics. His students consistently score above 95%, thanks to his structured revision techniques.",
    methodology: "Commerce requires both logical understanding and meticulous practice. We focus heavily on structuring answers according to the official marking schemes, ensuring no marks are lost due to poor presentation.",
    schools: ["Amity International", "Shikshantar", "DPS Sushant Lok"],
    locations: ["Sushant Lok", "Sector 43", "South City"],
  }
];

export const mockBoards = [
  { slug: "cbse", name: "CBSE", description: "Central Board of Secondary Education", popularity: "High" },
  { slug: "icse", name: "ICSE", description: "Indian Certificate of Secondary Education", popularity: "High" },
  { slug: "isc", name: "ISC", description: "Indian School Certificate (Class 12)", popularity: "Medium" },
  { slug: "ibdp", name: "IB DP", description: "International Baccalaureate Diploma Programme", popularity: "Premium" },
  { slug: "igcse", name: "IGCSE", description: "International General Certificate of Secondary Education", popularity: "Premium" }
];

export const mockSubjects = [
  { slug: "mathematics", name: "Mathematics" },
  { slug: "physics", name: "Physics" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "biology", name: "Biology" },
  { slug: "accountancy", name: "Accountancy" },
  { slug: "economics", name: "Economics" }
];

export const mockSchools = [
  { slug: "dps-sector-45", name: "DPS Sector 45", boards: ["CBSE"], location: "Sector 45" },
  { slug: "the-heritage-school", name: "The Heritage School", boards: ["CBSE", "IBDP", "IGCSE"], location: "Sector 62" },
  { slug: "shiv-nadar-school", name: "Shiv Nadar School", boards: ["CBSE", "IBDP", "IGCSE"], location: "DLF Phase 1" },
  { slug: "pathways-world-school", name: "Pathways World School", boards: ["IBDP", "IGCSE"], location: "Aravali Retreat" }
];

export const mockSectors = [
  { slug: "sector-45", name: "Sector 45", societies: ["Greenwood City", "Unitech Cyber Park"] },
  { slug: "sector-50", name: "Sector 50", societies: ["Nirvana Country", "South City 2"] },
  { slug: "golf-course-road", name: "Golf Course Road", societies: ["DLF Phase 5", "The Magnolias", "The Aralias"] }
];
