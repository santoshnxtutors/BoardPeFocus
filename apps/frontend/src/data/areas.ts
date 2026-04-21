export type AreaCategory = "premium-corridors" | "family-neighborhoods" | "growth-corridors";

export interface SchoolReference {
  slug: string;
  name: string;
  note: string;
}

export interface SocietyDetail {
  slug: string;
  name: string;
  summary: string;
}

export interface SectorDetail {
  slug: string;
  name: string;
  clusterSlug: string;
  microcopy: string;
  positioning: string;
  adjacentSectors: string[];
  nearbySchoolSlugs: string[];
  boardFocus: string[];
  subjectDemand: string[];
  societies: SocietyDetail[];
}

export interface AreaCluster {
  slug: string;
  name: string;
  shortDescription: string;
  positioning: string;
  category: AreaCategory;
  sectorSlugs: string[];
  featuredSocieties: string[];
  schoolRelevance: SchoolReference[];
}

const createSocietySlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export const sectorDetails: SectorDetail[] = [
  {
    slug: "dlf-phase-4",
    name: "DLF Phase 4",
    clusterSlug: "dlf-phases",
    microcopy: "A mature premium pocket with quick school access and reliable tutor travel windows.",
    positioning: "Ideal for families looking for disciplined Class 10 and Class 12 home tutoring close to the DLF core.",
    adjacentSectors: ["DLF Phase 5", "Sector 43", "MG Road belt"],
    nearbySchoolSlugs: ["dps-sushant-lok", "scottish-high-international-school", "shiv-nadar-school"],
    boardFocus: ["CBSE", "ICSE", "IGCSE"],
    subjectDemand: ["Mathematics", "Science", "Accountancy"],
    societies: [
      { slug: createSocietySlug("Hamilton Court"), name: "Hamilton Court", summary: "Fits weekday evening tutoring with smooth in-community access." },
      { slug: createSocietySlug("Regency Park"), name: "Regency Park", summary: "A strong fit for consistent one-to-one board preparation at home." },
      { slug: createSocietySlug("Richmond Park"), name: "Richmond Park", summary: "Useful for structured revision schedules and regular school-week coordination." },
    ],
  },
  {
    slug: "dlf-phase-5",
    name: "DLF Phase 5",
    clusterSlug: "dlf-phases",
    microcopy: "One of Gurugram's strongest premium tutoring micro-markets for board-exam families.",
    positioning: "Well suited for premium home tutoring, flexible scheduling, and school-aware board preparation.",
    adjacentSectors: ["Sector 53", "Sector 54", "Golf Course Road"],
    nearbySchoolSlugs: ["lancers-international", "shiv-nadar-school", "scottish-high-international-school"],
    boardFocus: ["CBSE", "IB DP", "IGCSE"],
    subjectDemand: ["Mathematics", "Physics", "Chemistry"],
    societies: [
      { slug: createSocietySlug("DLF Park Place"), name: "DLF Park Place", summary: "A premium family community where evening and weekend tutor slots matter." },
      { slug: createSocietySlug("DLF Belaire"), name: "DLF Belaire", summary: "Works well for focused Class 12 science and commerce schedules." },
      { slug: createSocietySlug("DLF The Crest"), name: "DLF The Crest", summary: "Suited to premium, home-first academic planning with predictable tutor routing." },
      { slug: createSocietySlug("Palm Springs"), name: "Palm Springs", summary: "Popular for parent-led weekday timetables and in-home board prep." },
    ],
  },
  {
    slug: "sector-53",
    name: "Sector 53",
    clusterSlug: "golf-course-road",
    microcopy: "A prime Golf Course Road sector with strong demand for science and maths tutoring.",
    positioning: "Good for premium families who want low-travel, high-consistency board-exam support.",
    adjacentSectors: ["Sector 54", "Sector 42", "DLF Phase 5"],
    nearbySchoolSlugs: ["lancers-international", "scottish-high-international-school", "the-heritage-school"],
    boardFocus: ["CBSE", "IB DP", "IGCSE"],
    subjectDemand: ["Mathematics", "Physics", "Chemistry"],
    societies: [
      { slug: createSocietySlug("DLF Aralias"), name: "DLF Aralias", summary: "High-demand premium society for discreet, efficient one-to-one tutoring." },
      { slug: createSocietySlug("DLF Magnolias"), name: "DLF Magnolias", summary: "Well suited to senior-board schedules that need consistency and privacy." },
    ],
  },
  {
    slug: "sector-54",
    name: "Sector 54",
    clusterSlug: "golf-course-road",
    microcopy: "A flagship Golf Course Road sector for luxury societies and school-linked tutor demand.",
    positioning: "Works best for premium board prep with carefully matched tutors and predictable access.",
    adjacentSectors: ["Sector 53", "Sector 42", "DLF Phase 5"],
    nearbySchoolSlugs: ["lancers-international", "shiv-nadar-school", "pathways-world-school"],
    boardFocus: ["CBSE", "IB DP", "IGCSE"],
    subjectDemand: ["Mathematics", "Physics", "Economics"],
    societies: [
      { slug: createSocietySlug("DLF Camellias"), name: "DLF Camellias", summary: "A premium home-tutoring fit for highly personalized Class 10 and 12 planning." },
      { slug: createSocietySlug("The Magnolias"), name: "The Magnolias", summary: "Strong fit for disciplined board revision and tutor continuity." },
    ],
  },
  {
    slug: "sector-57",
    name: "Sector 57",
    clusterSlug: "golf-course-extension-road",
    microcopy: "A family-heavy Golf Course Extension node with practical access to premium tutor supply.",
    positioning: "Especially relevant for CBSE and ICSE families balancing school load with home schedules.",
    adjacentSectors: ["Sector 56", "Sector 58", "Sector 65"],
    nearbySchoolSlugs: ["the-heritage-school", "dps-sushant-lok", "amity-international-sector-46"],
    boardFocus: ["CBSE", "ICSE"],
    subjectDemand: ["Mathematics", "Biology", "Accountancy"],
    societies: [
      { slug: createSocietySlug("Sushant Lok 3"), name: "Sushant Lok 3", summary: "Useful for dependable weekday tutoring without long travel buffers." },
      { slug: createSocietySlug("Hong Kong Bazaar Residences"), name: "Hong Kong Bazaar Residences", summary: "Convenient for board-prep schedules that need efficient tutor turnaround." },
    ],
  },
  {
    slug: "sector-62",
    name: "Sector 62",
    clusterSlug: "golf-course-extension-road",
    microcopy: "A Heritage-led pocket where locality-school alignment is especially useful.",
    positioning: "Well matched for premium families seeking school-aware Class 10 and 12 tutoring at home.",
    adjacentSectors: ["Sector 60", "Sector 63", "Sector 65"],
    nearbySchoolSlugs: ["the-heritage-school", "lancers-international", "pathways-world-school"],
    boardFocus: ["CBSE", "IB DP", "IGCSE"],
    subjectDemand: ["Mathematics", "Physics", "Business Studies"],
    societies: [
      { slug: createSocietySlug("Pioneer Park"), name: "Pioneer Park", summary: "A practical base for weekday board tutoring linked to major school corridors." },
      { slug: createSocietySlug("Emaar Digi Homes"), name: "Emaar Digi Homes", summary: "Fits premium in-home tutoring plans with strong science demand." },
    ],
  },
  {
    slug: "sector-65",
    name: "Sector 65",
    clusterSlug: "golf-course-extension-road",
    microcopy: "A fast-growing luxury pocket with strong demand for serious board-exam tutoring.",
    positioning: "Strong for premium families seeking tutor matching by board, subject, and travel efficiency.",
    adjacentSectors: ["Sector 62", "Sector 66", "Sector 57"],
    nearbySchoolSlugs: ["the-heritage-school", "pathways-world-school", "amity-international-sector-46"],
    boardFocus: ["CBSE", "IB DP", "IGCSE"],
    subjectDemand: ["Mathematics", "Physics", "Chemistry"],
    societies: [
      { slug: createSocietySlug("M3M Golfestate"), name: "M3M Golfestate", summary: "Premium society where tutor quality, punctuality, and discretion matter." },
      { slug: createSocietySlug("M3M Latitude"), name: "M3M Latitude", summary: "Well suited to focused senior-board home tutoring with flexible hours." },
      { slug: createSocietySlug("Emaar Marbella"), name: "Emaar Marbella", summary: "Useful for one-to-one schedules built around demanding family calendars." },
      { slug: createSocietySlug("Ireo Victory Valley"), name: "Ireo Victory Valley", summary: "Strong fit for structured board revision and science tutoring at home." },
    ],
  },
  {
    slug: "sector-45",
    name: "Sector 45",
    clusterSlug: "south-city-sushant-lok",
    microcopy: "A central board-prep locality with easy access to major schools and city tutors.",
    positioning: "Reliable for parents who value quick scheduling, school familiarity, and strong CBSE tutor coverage.",
    adjacentSectors: ["Sector 43", "Sector 46", "Sector 44"],
    nearbySchoolSlugs: ["dps-sector-45", "amity-international-sector-46", "dps-sushant-lok"],
    boardFocus: ["CBSE", "ICSE"],
    subjectDemand: ["Mathematics", "Science", "Accountancy"],
    societies: [
      { slug: createSocietySlug("Greenwood City"), name: "Greenwood City", summary: "A natural fit for weekday board tutoring near core school corridors." },
      { slug: createSocietySlug("Unitech Greenwood"), name: "Unitech Greenwood", summary: "Popular for Class 10 and 12 home tutors who need consistent access." },
    ],
  },
  {
    slug: "sector-50",
    name: "Sector 50",
    clusterSlug: "sohna-road",
    microcopy: "A premium family zone with sustained demand for home tutors across boards and subjects.",
    positioning: "Works well for families in Sohna Road and South City 2 catchments seeking dependable in-home support.",
    adjacentSectors: ["Sector 49", "Sector 51", "Sector 46"],
    nearbySchoolSlugs: ["dps-sector-45", "amity-international-sector-46", "the-heritage-school"],
    boardFocus: ["CBSE", "ICSE", "IB DP"],
    subjectDemand: ["Mathematics", "Physics", "Biology"],
    societies: [
      { slug: createSocietySlug("Nirvana Country"), name: "Nirvana Country", summary: "A premium residential cluster ideal for scheduled home tutoring." },
      { slug: createSocietySlug("South City 2"), name: "South City 2", summary: "Practical for tutor matching by subject, board, and evening availability." },
      { slug: createSocietySlug("Rosewood City"), name: "Rosewood City", summary: "Useful for families looking for strong Class 10 and 12 tutor access." },
      { slug: createSocietySlug("Malibu Town"), name: "Malibu Town", summary: "A consistent catchment for science and maths tutors close to Sohna Road." },
    ],
  },
  {
    slug: "sector-2",
    name: "Sector 2",
    clusterSlug: "palam-vihar",
    microcopy: "A practical Palam Vihar-side location for families preferring home visits over commute-heavy options.",
    positioning: "Best for parents prioritizing locality familiarity, punctuality, and steady board-prep routines.",
    adjacentSectors: ["Palam Vihar", "Sector 1", "Sector 23A"],
    nearbySchoolSlugs: ["dps-sushant-lok", "scottish-high-international-school", "dps-sector-45"],
    boardFocus: ["CBSE", "ICSE"],
    subjectDemand: ["Mathematics", "Science", "English"],
    societies: [
      { slug: createSocietySlug("Palam Vihar Residency"), name: "Palam Vihar Residency", summary: "Useful for stable in-home tutoring with low intra-city travel friction." },
    ],
  },
  {
    slug: "sector-23",
    name: "Sector 23",
    clusterSlug: "ambience-nh8-belt",
    microcopy: "An NH-8 side locality where access, timing, and airport-belt convenience matter.",
    positioning: "Suitable for families wanting premium home tutoring near Ambience and the DLF Phase 3 belt.",
    adjacentSectors: ["Sector 24", "DLF Phase 3", "Udyog Vihar"],
    nearbySchoolSlugs: ["shiv-nadar-school", "lancers-international", "dps-sushant-lok"],
    boardFocus: ["CBSE", "IB DP"],
    subjectDemand: ["Mathematics", "Physics", "Economics"],
    societies: [
      { slug: createSocietySlug("Ambience Caitriona"), name: "Ambience Caitriona", summary: "A premium society where high-trust home tutoring is a strong fit." },
      { slug: createSocietySlug("Ambience Lagoon"), name: "Ambience Lagoon", summary: "Well suited to family-led scheduling around school and activity calendars." },
    ],
  },
  {
    slug: "sector-24",
    name: "Sector 24",
    clusterSlug: "ambience-nh8-belt",
    microcopy: "A corporate-belt locality where premium families value efficient tutor access at home.",
    positioning: "Works for board-focused tutoring in the Ambience, NH-8, and DLF Phase 3 catchment.",
    adjacentSectors: ["Sector 23", "DLF Phase 3", "Sector 22"],
    nearbySchoolSlugs: ["shiv-nadar-school", "lancers-international", "pathways-world-school"],
    boardFocus: ["CBSE", "IB DP", "IGCSE"],
    subjectDemand: ["Mathematics", "Chemistry", "Business Studies"],
    societies: [
      { slug: createSocietySlug("DLF City Court"), name: "DLF City Court", summary: "Good for premium one-to-one tutoring with predictable access windows." },
    ],
  },
  {
    slug: "sector-82",
    name: "Sector 82",
    clusterSlug: "new-gurgaon",
    microcopy: "A mature New Gurgaon zone with strong demand for home tutors who can serve gated communities well.",
    positioning: "Useful for premium board-prep families who want reliable tutor continuity closer to home.",
    adjacentSectors: ["Sector 83", "Sector 84", "Sector 85"],
    nearbySchoolSlugs: ["dps-sector-45", "the-heritage-school", "amity-international-sector-46"],
    boardFocus: ["CBSE", "ICSE"],
    subjectDemand: ["Mathematics", "Science", "Accountancy"],
    societies: [
      { slug: createSocietySlug("DLF The Arbour"), name: "DLF The Arbour", summary: "A premium new-launch address suited to planned home tutoring slots." },
      { slug: createSocietySlug("Vatika India Next"), name: "Vatika India Next", summary: "Useful for steady tutor access across New Gurgaon family communities." },
    ],
  },
  {
    slug: "sector-113",
    name: "Sector 113",
    clusterSlug: "dwarka-expressway",
    microcopy: "A Dwarka Expressway growth corridor where premium home tutoring is increasingly locality-led.",
    positioning: "A strong fit for families wanting board-exam support without frequent cross-city commute delays.",
    adjacentSectors: ["Sector 111", "Sector 114", "Bajghera belt"],
    nearbySchoolSlugs: ["dps-sushant-lok", "shiv-nadar-school", "amity-international-sector-46"],
    boardFocus: ["CBSE", "ICSE"],
    subjectDemand: ["Mathematics", "Physics", "Chemistry"],
    societies: [
      { slug: createSocietySlug("Smartworld One DXP"), name: "Smartworld One DXP", summary: "A premium expressway address where efficient tutor access matters." },
    ],
  },
];

export const areaClusters: AreaCluster[] = [
  {
    slug: "dlf-phases",
    name: "DLF Phases",
    shortDescription: "Premium DLF neighborhoods with strong board-exam tutor demand and easy school connectivity.",
    positioning: "Especially relevant for families in DLF Phase 4 and DLF Phase 5 looking for polished, home-first tutoring.",
    category: "premium-corridors",
    sectorSlugs: ["dlf-phase-4", "dlf-phase-5"],
    featuredSocieties: ["DLF Park Place", "DLF Belaire", "DLF The Crest", "Palm Springs"],
    schoolRelevance: [
      { slug: "shiv-nadar-school", name: "Shiv Nadar School", note: "Often relevant for premium families in the DLF core." },
      { slug: "scottish-high-international-school", name: "Scottish High International School", note: "Commonly paired with locality-aware board planning." },
    ],
  },
  {
    slug: "golf-course-road",
    name: "Golf Course Road",
    shortDescription: "Luxury micro-markets with strong demand for discreet, premium home tutoring.",
    positioning: "Best for families who want top-quality board-exam tutor matching close to flagship societies.",
    category: "premium-corridors",
    sectorSlugs: ["sector-53", "sector-54"],
    featuredSocieties: ["DLF Aralias", "DLF Magnolias", "DLF Camellias"],
    schoolRelevance: [
      { slug: "lancers-international", name: "Lancers International School", note: "Relevant for international-board families on the Golf Course belt." },
      { slug: "the-heritage-school", name: "The Heritage School", note: "Frequently considered for nearby science and maths support." },
    ],
  },
  {
    slug: "golf-course-extension-road",
    name: "Golf Course Extension Road",
    shortDescription: "A premium family corridor balancing luxury societies with practical school access.",
    positioning: "Useful for Class 10 and 12 tutoring across Sectors 57, 62, and 65.",
    category: "premium-corridors",
    sectorSlugs: ["sector-57", "sector-62", "sector-65"],
    featuredSocieties: ["M3M Golfestate", "M3M Latitude", "Emaar Marbella", "Ireo Victory Valley"],
    schoolRelevance: [
      { slug: "the-heritage-school", name: "The Heritage School", note: "A key school relevance anchor for this corridor." },
      { slug: "pathways-world-school", name: "Pathways World School", note: "Important for premium international-board families." },
    ],
  },
  {
    slug: "sohna-road",
    name: "Sohna Road",
    shortDescription: "Premium family neighborhoods where home-visit practicality matters as much as tutor quality.",
    positioning: "Useful for families across Sector 50 and nearby societies that prefer dependable in-home support.",
    category: "family-neighborhoods",
    sectorSlugs: ["sector-50"],
    featuredSocieties: ["Nirvana Country", "Malibu Town", "Rosewood City"],
    schoolRelevance: [
      { slug: "dps-sector-45", name: "DPS Sector 45", note: "Often relevant for CBSE board preparation in this catchment." },
      { slug: "amity-international-sector-46", name: "Amity International School", note: "A practical school link for nearby board-focused families." },
    ],
  },
  {
    slug: "south-city-sushant-lok",
    name: "South City & Sushant Lok",
    shortDescription: "Central Gurugram neighborhoods with strong tutor access and school-corridor relevance.",
    positioning: "Well suited to parents who want polished, punctual home tutors close to major central sectors.",
    category: "family-neighborhoods",
    sectorSlugs: ["sector-45"],
    featuredSocieties: ["South City 2", "Greenwood City", "Sushant Lok 3"],
    schoolRelevance: [
      { slug: "dps-sushant-lok", name: "DPS Sushant Lok", note: "A common school anchor for nearby board-exam planning." },
      { slug: "dps-sector-45", name: "DPS Sector 45", note: "High relevance for families prioritizing locality-school alignment." },
    ],
  },
  {
    slug: "palam-vihar",
    name: "Palam Vihar",
    shortDescription: "A mature residential catchment where parents often prefer convenient home visits over longer commute plans.",
    positioning: "Works for families who value stable tutor schedules and easy weekday coordination.",
    category: "family-neighborhoods",
    sectorSlugs: ["sector-2"],
    featuredSocieties: ["Palam Vihar Residency"],
    schoolRelevance: [
      { slug: "dps-sushant-lok", name: "DPS Sushant Lok", note: "Often part of the wider tutor matching conversation here." },
      { slug: "scottish-high-international-school", name: "Scottish High International School", note: "Relevant for premium central-school commute patterns." },
    ],
  },
  {
    slug: "ambience-nh8-belt",
    name: "Ambience & NH-8 Belt",
    shortDescription: "A premium commuter-side corridor where timing and tutor routing matter.",
    positioning: "Useful for premium families in the Ambience and DLF Phase 3 catchment seeking efficient home support.",
    category: "premium-corridors",
    sectorSlugs: ["sector-23", "sector-24"],
    featuredSocieties: ["Ambience Caitriona", "Ambience Lagoon"],
    schoolRelevance: [
      { slug: "shiv-nadar-school", name: "Shiv Nadar School", note: "A common relevance point for premium tutoring in this zone." },
      { slug: "lancers-international", name: "Lancers International School", note: "Useful for international-board tutoring close to the NH-8 belt." },
    ],
  },
  {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    shortDescription: "A fast-rising corridor where home tutoring demand is becoming more micro-location specific.",
    positioning: "Works for families wanting strong board support without depending on central-city commute slots.",
    category: "growth-corridors",
    sectorSlugs: ["sector-113"],
    featuredSocieties: ["Smartworld One DXP"],
    schoolRelevance: [
      { slug: "shiv-nadar-school", name: "Shiv Nadar School", note: "Often used as a school relevance reference from the expressway side." },
      { slug: "dps-sushant-lok", name: "DPS Sushant Lok", note: "Useful for wider central-school linkage planning." },
    ],
  },
  {
    slug: "new-gurgaon",
    name: "New Gurgaon",
    shortDescription: "A large gated-community catchment where tutor continuity and travel reliability are key.",
    positioning: "Useful for premium families in newer sectors who want strong board tutoring closer to home.",
    category: "growth-corridors",
    sectorSlugs: ["sector-82"],
    featuredSocieties: ["DLF The Arbour", "Vatika India Next"],
    schoolRelevance: [
      { slug: "the-heritage-school", name: "The Heritage School", note: "A useful reference for nearby premium school-aware tutoring." },
      { slug: "amity-international-sector-46", name: "Amity International School", note: "Relevant for board-focused families in outer growth sectors." },
    ],
  },
];

export const areaTabs = [
  { slug: "all", label: "All Areas" },
  { slug: "premium-corridors", label: "Premium Corridors" },
  { slug: "family-neighborhoods", label: "Family Neighborhoods" },
  { slug: "growth-corridors", label: "Growth Corridors" },
] as const;

export const featuredSectorSlugs = [
  "sector-53",
  "sector-57",
  "dlf-phase-4",
  "dlf-phase-5",
  "sector-45",
  "sector-50",
  "sector-62",
  "sector-65",
  "sector-82",
  "sector-113",
];

export const featuredSocietyNames = [
  "DLF Aralias",
  "DLF Magnolias",
  "DLF Camellias",
  "DLF Park Place",
  "DLF Belaire",
  "DLF The Crest",
  "Palm Springs",
  "Hamilton Court",
  "Richmond Park",
  "Regency Park",
  "Ambience Caitriona",
  "Ambience Lagoon",
  "M3M Golfestate",
  "M3M Latitude",
  "DLF The Arbour",
  "Emaar Marbella",
  "Ireo Victory Valley",
  "Nirvana Country",
  "South City 2",
  "Malibu Town",
  "Rosewood City",
  "Smartworld One DXP",
];

export const corridorHighlights = [
  {
    title: "DLF Phases & MG Road Belt",
    description: "Best for premium DLF homes that need polished tutor matching, minimal commute friction, and school-aware board prep.",
    clusterSlugs: ["dlf-phases"],
  },
  {
    title: "Golf Course Road",
    description: "High-demand luxury corridor where science, maths, and commerce tutoring often needs strong schedule discipline.",
    clusterSlugs: ["golf-course-road"],
  },
  {
    title: "Golf Course Extension Road",
    description: "A premium family belt with useful school connectivity and strong demand across Class 10 and Class 12 subjects.",
    clusterSlugs: ["golf-course-extension-road"],
  },
  {
    title: "South City & Sohna Road",
    description: "Central and south Gurugram families often prefer locality-first tutor support for better weekday consistency.",
    clusterSlugs: ["south-city-sushant-lok", "sohna-road"],
  },
  {
    title: "Ambience & NH-8 Belt",
    description: "Useful where premium families value timing, efficient tutor routing, and evening availability close to home.",
    clusterSlugs: ["ambience-nh8-belt"],
  },
  {
    title: "Dwarka Expressway & New Gurgaon",
    description: "Growth corridors where home-visit practicality and community-wise tutor matching increasingly matter.",
    clusterSlugs: ["dwarka-expressway", "new-gurgaon"],
  },
];

export const areaFaqs = [
  {
    question: "Do you match home tutors by Gurgaon locality or only by board?",
    answer: "We consider both. For Gurugram families, locality matters because travel time, school corridor relevance, and preferred tuition timings all affect whether a tutor match stays consistent through Class 10 or Class 12 board preparation.",
  },
  {
    question: "Can I request a tutor specifically for my sector or society?",
    answer: "Yes. We can shortlist tutors by sector, society access, preferred timing, and your child's board and subjects so the fit is practical as well as academic.",
  },
  {
    question: "Do some Gurgaon areas naturally connect to certain schools?",
    answer: "Yes, some localities tend to align with specific school corridors, but we do not imply any official relationship or endorsement. We simply use locality familiarity to improve tutor matching and scheduling.",
  },
  {
    question: "Is this page only for premium board-exam tutoring?",
    answer: "Yes. This Gurgaon Areas hub is designed for premium Class 10 and Class 12 home tutoring, especially where parents want polished home visits, strong subject matching, and board-focused planning.",
  },
];

export function getAreaCluster(slug: string) {
  return areaClusters.find((cluster) => cluster.slug === slug);
}

export function getSectorDetail(slug: string) {
  return sectorDetails.find((sector) => sector.slug === slug);
}

export function getSocietyDetail(sectorSlug: string, societySlug: string) {
  const sector = getSectorDetail(sectorSlug);
  if (!sector) return null;

  return sector.societies.find((society) => society.slug === societySlug) ?? null;
}

export function getClusterSectors(clusterSlug: string) {
  return sectorDetails.filter((sector) => sector.clusterSlug === clusterSlug);
}

export function getFeaturedSectors() {
  return featuredSectorSlugs
    .map((slug) => getSectorDetail(slug))
    .filter((sector): sector is SectorDetail => Boolean(sector));
}

export function getFeaturedSocieties() {
  return featuredSocietyNames
    .map((name) => {
      const sector = sectorDetails.find((item) => item.societies.some((society) => society.name === name));
      const society = sector?.societies.find((item) => item.name === name);

      if (!sector || !society) return null;

      return {
        ...society,
        sectorName: sector.name,
        sectorSlug: sector.slug,
      };
    })
    .filter(
      (
        society,
      ): society is SocietyDetail & {
        sectorName: string;
        sectorSlug: string;
      } => Boolean(society),
    );
}
