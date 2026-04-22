import { areaClusters } from "@/data/areas";
import { mockSchools, mockTutors } from "@/data/mock";

export interface BoardFaqItem {
  question: string;
  answer: string;
}

export interface SchoolReference {
  slug: string;
  note: string;
}

export interface AreaReference {
  slug: string;
  note: string;
}

export interface SubjectConfig {
  slug: string;
  label: string;
  shortLabel: string;
  subjectMatches: string[];
  heroTitle: string;
  heroDescription: string;
  whyHard: string[];
  forStudents: string[];
  boardProblems: string[];
  tutoringFormat: string[];
  trustPoints: string[];
  faq: BoardFaqItem[];
  relatedSchoolSlugs: string[];
  relatedAreaSlugs: string[];
}

export interface ClassConfig {
  slug: string;
  label: string;
  shortLabel: string;
  heroDescription: string;
  painPoints: string[];
  examContext: string[];
  revisionSupport: string[];
  samplePaperHelp: string[];
  faq: BoardFaqItem[];
  subjects: SubjectConfig[];
}

export interface BoardConfig {
  slug: string;
  name: string;
  aliases: string[];
  shortDescription: string;
  cardDescription: string;
  classRelevance: string;
  subjectRelevance: string;
  heroDescription: string;
  selectorCopy: string;
  supportPoints: string[];
  painPoints: string[];
  faq: BoardFaqItem[];
  schoolReferences: SchoolReference[];
  areaReferences: AreaReference[];
  classes: ClassConfig[];
}

const makeSchoolRefs = (...items: SchoolReference[]) => items;
const makeAreaRefs = (...items: AreaReference[]) => items;

export const boardHubConfigs: BoardConfig[] = [
  {
    slug: "cbse",
    name: "CBSE",
    aliases: ["CBSE"],
    shortDescription: "Premium one-to-one support for Class 10 and Class 12 CBSE families in Gurgaon.",
    cardDescription:
      "Strong for parents who want syllabus control, pre-board discipline, and subject-wise revision in a school-aware home format.",
    classRelevance: "Best suited to Class 10 and Class 12 board cycles.",
    subjectRelevance: "High demand for Maths, Science, Physics, Chemistry, Biology, Economics, Accountancy, and Computer Science.",
    heroDescription:
      "BoardPeFocus supports CBSE families across Gurugram with premium one-to-one home tutoring built around school pace, pre-board readiness, answer-writing discipline, and calm exam execution.",
    selectorCopy: "Choose CBSE if your child needs strong syllabus coverage, revision structure, and board-paper familiarity.",
    supportPoints: [
      "Chapter-wise syllabus control with a realistic school calendar.",
      "Pre-board preparation that sharpens answer presentation and timing.",
      "Board-aware revision plans for Class 10 and Class 12 pressure points.",
    ],
    painPoints: [
      "Students often know the content but lose marks on structure, steps, or presentation.",
      "School pace can feel fast in some chapters and slow in others, leaving revision uneven.",
      "Pre-board confidence dips when answers are not written in the way CBSE expects.",
    ],
    faq: [
      {
        question: "Do you mainly support CBSE Class 10 and 12 students in Gurgaon?",
        answer:
          "Yes. Most CBSE enquiries are for Class 10 and Class 12 because parents usually want board-focused revision, answer-writing improvement, and school-aware pacing at home.",
      },
      {
        question: "Can you match tutors for CBSE Maths and Science separately?",
        answer:
          "Yes. We can match board-specific tutors by subject, class, area, and preferred schedule so the support feels practical rather than generic.",
      },
      {
        question: "Is the service Gurgaon-only?",
        answer:
          "Yes. BoardPeFocus is positioned for Gurugram families who want premium home tutoring with local school and area relevance.",
      },
    ],
    schoolReferences: makeSchoolRefs(
      { slug: "the-heritage-school", note: "Commonly requested by CBSE parents who want disciplined board prep aligned with school pace." },
      { slug: "shiv-nadar-school", note: "Relevant for families who want strong subject depth with board-exam structure." },
      { slug: "dps-sector-45", note: "Often useful for Class 10 and 12 CBSE families seeking one-to-one revision support." },
      { slug: "amity-international-sector-46", note: "Useful where parents want home support tied to school workload and board pressure." },
    ),
    areaReferences: makeAreaRefs(
      { slug: "golf-course-extension-road", note: "Strong CBSE demand from premium family neighborhoods." },
      { slug: "sohna-road", note: "Popular for Class 10 and 12 board support in home format." },
      { slug: "south-city-sushant-lok", note: "Useful for central Gurgaon school corridors and evening tutor availability." },
    ),
    classes: [
      {
        slug: "class-10",
        label: "Class 10",
        shortLabel: "10",
        heroDescription:
          "Focused support for Class 10 CBSE students who need tight chapter coverage, board-format practice, and calm revision planning before pre-boards and finals.",
        painPoints: [
          "Science and Maths often need structured repetition rather than last-minute cramming.",
          "English answers and long-form responses can lose marks without format discipline.",
          "Parents usually want clarity on what to finish first, revise next, and test regularly.",
        ],
        examContext: [
          "Built around board-pattern familiarity and school-preboard expectations.",
          "Useful for students who need a more organized weekly revision rhythm.",
          "Especially relevant when confidence is dropping despite regular study hours.",
        ],
        revisionSupport: [
          "Chapter sequencing and backlog clean-up before the board window gets crowded.",
          "Revision blocks focused on weak chapters, numericals, and written accuracy.",
          "One-to-one practice sessions that keep momentum steady instead of rushed.",
        ],
        samplePaperHelp: [
          "Paper simulation support with emphasis on time management and answer structure.",
          "Targeted review of repeated mistakes in steps, diagrams, and long answers.",
          "Board-style paper selection based on current readiness rather than overload.",
        ],
        faq: [
          {
            question: "Is Class 10 one of your main focus areas?",
            answer:
              "Yes. Class 10 is a core focus, especially for Gurgaon families seeking premium one-to-one support in Maths, Science, and English.",
          },
          {
            question: "Can a Class 10 student get subject-wise support only?",
            answer:
              "Yes. We can structure support around a single subject like Maths or Science, or around a broader board-prep plan.",
          },
          {
            question: "Do you help with pre-boards as well?",
            answer:
              "Yes. Many Class 10 parents come to us specifically for pre-board readiness, revision control, and answer-writing confidence.",
          },
        ],
        subjects: [
          {
            slug: "maths-home-tutor-gurgaon",
            label: "Maths Home Tutor Gurgaon",
            shortLabel: "Maths",
            subjectMatches: ["Mathematics", "Maths"],
            heroTitle: "CBSE Class 10 Maths Home Tutor in Gurgaon",
            heroDescription:
              "Premium one-to-one Maths tutoring for Class 10 students who need concept clarity, step-mark discipline, and stronger paper confidence before boards.",
            whyHard: [
              "Small conceptual gaps become big errors under board time pressure.",
              "Students often understand a method but still lose marks on steps and accuracy.",
              "Weak revision sequencing makes Algebra, Geometry, and applications pile up together.",
            ],
            forStudents: [
              "Students aiming to convert decent chapter understanding into board-level confidence.",
              "Families who want cleaner revision planning before school pre-boards.",
              "Students who need weekly one-to-one correction rather than generic batch teaching.",
            ],
            boardProblems: [
              "Inconsistent step presentation that affects scoring even when the final answer is correct.",
              "Difficulty moving from textbook familiarity to board-paper execution.",
              "Uneven confidence across Algebra, Coordinate Geometry, and Trigonometry.",
            ],
            tutoringFormat: [
              "Chapter sequencing based on current level and school pace.",
              "Board-style worksheets with correction on steps, method, and time use.",
              "Revision cycles that return to weak question families until they feel stable.",
            ],
            trustPoints: [
              "Board-focused one-to-one support for Gurgaon families only.",
              "Useful where parents want home sessions that feel structured and calm.",
              "Designed around subject expertise, revision discipline, and school awareness.",
            ],
            faq: [
              {
                question: "Do you support only weak students in Class 10 Maths?",
                answer:
                  "No. We work with both improving and high-performing students who want stronger board execution and better final consistency.",
              },
              {
                question: "Can tutoring focus only on selected chapters first?",
                answer:
                  "Yes. We can start with the chapters currently creating the most pressure and then expand into a wider revision plan.",
              },
              {
                question: "Is this only for Gurgaon home visits?",
                answer:
                  "Yes. The page is positioned for premium Gurgaon families looking for one-to-one home tutoring.",
              },
            ],
            relatedSchoolSlugs: ["dps-sector-45", "the-heritage-school", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "south-city-sushant-lok"],
          },
          {
            slug: "science-home-tutor-gurgaon",
            label: "Science Home Tutor Gurgaon",
            shortLabel: "Science",
            subjectMatches: ["Science", "Physics", "Chemistry", "Biology"],
            heroTitle: "CBSE Class 10 Science Home Tutor in Gurgaon",
            heroDescription:
              "Focused Class 10 Science tutoring for students who need better concept retention, cleaner answers, and stronger board readiness across Physics, Chemistry, and Biology.",
            whyHard: [
              "Students often revise chapters separately but struggle to retain them together.",
              "Board marks can slip on diagrams, definitions, and explanation structure.",
              "School tests may not always reveal where board-style writing is still weak.",
            ],
            forStudents: [
              "Students who need integrated Science support instead of fragmented chapter help.",
              "Families who want a single tutor to bring order to revision and practice.",
              "Students whose confidence drops when theory and numericals collide near exams.",
            ],
            boardProblems: [
              "Weak explanation framing in Biology and Chemistry theory answers.",
              "Inconsistent diagram labeling and method steps in Physics-style questions.",
              "Difficulty balancing NCERT familiarity with board-paper readiness.",
            ],
            tutoringFormat: [
              "Topic blocks across Physics, Chemistry, and Biology with weekly revision loops.",
              "Board-style written practice with review of explanation quality and recall gaps.",
              "Short tests that keep Science active throughout the pre-board phase.",
            ],
            trustPoints: [
              "Designed for Gurgaon families who want Science handled with more structure.",
              "Useful when school pace is not enough for confidence building at home.",
              "Built around one-to-one correction and revision discipline, not batch repetition.",
            ],
            faq: [
              {
                question: "Can the same tutor cover full Class 10 Science?",
                answer:
                  "Yes, where the tutor fit is right. Many families prefer a single Science plan that keeps revision structured across all three branches.",
              },
              {
                question: "Do you help with written answers and diagrams?",
                answer:
                  "Yes. That is a major part of board-oriented Science tutoring because presentation quality matters alongside conceptual understanding.",
              },
              {
                question: "Do you support Gurgaon sectors and societies too?",
                answer:
                  "Yes. The tutoring flow is designed around Gurgaon localities, school corridors, and home-visit practicality.",
              },
            ],
            relatedSchoolSlugs: ["dps-sector-45", "amity-international-sector-46", "the-heritage-school"],
            relatedAreaSlugs: ["sohna-road", "dlf-phases", "new-gurgaon"],
          },
          {
            slug: "english-home-tutor-gurgaon",
            label: "English Home Tutor Gurgaon",
            shortLabel: "English",
            subjectMatches: ["English"],
            heroTitle: "CBSE Class 10 English Home Tutor in Gurgaon",
            heroDescription:
              "Structured English support for Class 10 students who need stronger writing clarity, reading accuracy, and more confident board answers.",
            whyHard: [
              "Students often underestimate English until answer quality starts affecting marks.",
              "Writing sections need structure, clarity, and board-aware presentation.",
              "Reading and literature responses can feel subjective without disciplined practice.",
            ],
            forStudents: [
              "Students who want better written expression before pre-boards.",
              "Families seeking a calmer, confidence-building subject strategy.",
              "Students whose content is decent but scoring stays inconsistent.",
            ],
            boardProblems: [
              "Answers that are correct in idea but weak in structure and polish.",
              "Inconsistent performance in literature responses and formal writing formats.",
              "Limited revision discipline because English is often pushed behind Maths and Science.",
            ],
            tutoringFormat: [
              "Focused writing practice with direct correction on clarity and structure.",
              "Reading and literature discussion shaped around board expectations.",
              "Revision routines that keep English active without overwhelming the student.",
            ],
            trustPoints: [
              "Useful for Gurgaon parents who want English treated as a scoring subject, not an afterthought.",
              "Built around one-to-one feedback and written correction.",
              "Designed for premium, home-first board support.",
            ],
            faq: [
              {
                question: "Can English tutoring help scoring students as well?",
                answer:
                  "Yes. High-potential students often benefit from more refined answer quality and stronger consistency in written sections.",
              },
              {
                question: "Is English included in board-focused revision planning?",
                answer:
                  "Yes. We encourage families to keep English in the revision calendar so it does not become neglected near boards.",
              },
              {
                question: "Do you support only Gurgaon families?",
                answer:
                  "Yes. BoardPeFocus is built for Gurugram families seeking premium one-to-one home tutoring.",
              },
            ],
            relatedSchoolSlugs: ["shiv-nadar-school", "the-heritage-school", "dps-sushant-lok"],
            relatedAreaSlugs: ["south-city-sushant-lok", "golf-course-extension-road", "palam-vihar"],
          },
        ],
      },
      {
        slug: "class-12",
        label: "Class 12",
        shortLabel: "12",
        heroDescription:
          "Premium Class 12 CBSE tutoring for families who want strong subject specialization, structured revision, and calmer board preparation through the most demanding months.",
        painPoints: [
          "Board pressure rises sharply when school submissions, practicals, and revision start colliding.",
          "Students often need different support styles across numericals, theory, and long-form answers.",
          "Parents want subject experts, not generic tuition, once boards start feeling real.",
        ],
        examContext: [
          "Useful when pre-board results are below expectation or confidence feels unstable.",
          "Built for subject-wise depth with board-paper familiarity and answer strategy.",
          "Supports home scheduling for busy Gurgaon families juggling school and competitive prep.",
        ],
        revisionSupport: [
          "Structured revision calendars that prioritise the highest-pressure subjects first.",
          "Weak-topic rebuilding without losing control of the broader board timeline.",
          "One-to-one subject depth for Maths, Science, Commerce, and Computer Science combinations.",
        ],
        samplePaperHelp: [
          "Board-paper selection based on readiness and chapter coverage.",
          "Timed practice supported by post-paper error review rather than random test volume.",
          "Answer framing support for theory-heavy subjects where marks depend on precision.",
        ],
        faq: [
          {
            question: "Is Class 12 a core focus for BoardPeFocus?",
            answer:
              "Yes. Class 12 is one of our strongest focus areas because families typically want premium, subject-expert, board-specific support at home.",
          },
          {
            question: "Can you match separate tutors for different Class 12 subjects?",
            answer:
              "Yes. We often help families match separate subject specialists where that structure is more useful than a single general tutor.",
          },
          {
            question: "Do you help with board confidence as well as syllabus coverage?",
            answer:
              "Yes. Structured revision and calmer exam execution are a big part of how we position Class 12 tutoring.",
          },
        ],
        subjects: [
          {
            slug: "maths-home-tutor-gurgaon",
            label: "Maths Home Tutor Gurgaon",
            shortLabel: "Maths",
            subjectMatches: ["Mathematics", "Maths"],
            heroTitle: "CBSE Class 12 Maths Home Tutor in Gurgaon",
            heroDescription:
              "Premium one-to-one Maths tutoring for Class 12 students who need cleaner methods, stronger confidence, and disciplined revision across high-weightage chapters.",
            whyHard: [
              "Methods can feel clear in class but collapse under paper pressure if not repeated properly.",
              "Small errors in steps, substitutions, or notation can reduce marks quickly.",
              "Students often neglect sustained revision because Class 12 workload is crowded.",
            ],
            forStudents: [
              "Students targeting stronger board performance in a high-weightage subject.",
              "Families who want topic-wise control rather than vague full-syllabus promises.",
              "Students who need calmer practice before pre-boards and final papers.",
            ],
            boardProblems: [
              "Inconsistent performance across Calculus, Probability, and Application-heavy chapters.",
              "Loss of marks due to method presentation, not only conceptual gaps.",
              "Weak paper stamina when full-length practice starts too late.",
            ],
            tutoringFormat: [
              "Topic blocks with repeated return to weak patterns.",
              "Timed question practice with correction on working, accuracy, and speed.",
              "Revision sequencing that keeps strong chapters intact while repairing weak ones.",
            ],
            trustPoints: [
              "Built for Gurgaon families who want premium subject-expert Maths support.",
              "One-to-one structure helps correct mistakes earlier and more calmly.",
              "Useful where parents want revision discipline without generic coaching clutter.",
            ],
            faq: [
              {
                question: "Can tutoring focus on selected Class 12 Maths chapters first?",
                answer:
                  "Yes. We often prioritise high-pressure or weak chapters first, then widen the plan into full-board revision.",
              },
              {
                question: "Do you help with paper timing too?",
                answer:
                  "Yes. Timing, method accuracy, and sequence discipline are central to board-oriented Maths preparation.",
              },
              {
                question: "Is this available across Gurgaon areas?",
                answer:
                  "Yes. We support Gurgaon localities where premium one-to-one home tutoring is practical and relevant.",
              },
            ],
            relatedSchoolSlugs: ["the-heritage-school", "shiv-nadar-school", "amity-international-sector-46"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "new-gurgaon"],
          },
          {
            slug: "physics-home-tutor-gurgaon",
            label: "Physics Home Tutor Gurgaon",
            shortLabel: "Physics",
            subjectMatches: ["Physics"],
            heroTitle: "CBSE Class 12 Physics Home Tutor in Gurgaon",
            heroDescription:
              "One-to-one Class 12 Physics tutoring for students who need concept control, derivation clarity, and better board-paper confidence in Gurgaon.",
            whyHard: [
              "Physics can feel manageable chapter by chapter but unstable in full-paper conditions.",
              "Students often struggle to balance theory, derivations, and numericals together.",
              "Weak revision loops make formulas familiar but not reliably usable.",
            ],
            forStudents: [
              "Students whose conceptual understanding is decent but marks remain inconsistent.",
              "Families seeking a subject-expert approach instead of general board tuition.",
              "Students who need repeated correction on derivations and written logic.",
            ],
            boardProblems: [
              "Derivations and theory answers lose marks when logic steps are not written clearly.",
              "Numericals break down under pressure even when the concept is understood.",
              "Chapter recall fades when Physics is revised too late compared with other subjects.",
            ],
            tutoringFormat: [
              "Topic-by-topic rebuilding with formula application and written explanation together.",
              "Board-style practice across derivations, definitions, and numericals.",
              "Revision cycles that keep older chapters active while new ones are strengthened.",
            ],
            trustPoints: [
              "Designed for Gurgaon families who want Physics handled with more subject depth.",
              "Useful for students facing pre-board stress or theory-numerical imbalance.",
              "Built around one-to-one correction and calmer execution.",
            ],
            faq: [
              {
                question: "Do you support Class 12 Physics as a standalone subject plan?",
                answer:
                  "Yes. Many Gurgaon families request standalone Physics support because the subject often needs a more specialist approach.",
              },
              {
                question: "Can tutoring improve derivations and written theory too?",
                answer:
                  "Yes. Physics board performance depends on both conceptual understanding and how clearly the student writes it out.",
              },
              {
                question: "Is the service Gurgaon-only?",
                answer:
                  "Yes. This page is positioned for Gurugram families seeking premium home tutoring support.",
              },
            ],
            relatedSchoolSlugs: ["the-heritage-school", "shiv-nadar-school", "dps-sector-45"],
            relatedAreaSlugs: ["dlf-phases", "golf-course-extension-road", "sohna-road"],
          },
          {
            slug: "chemistry-home-tutor-gurgaon",
            label: "Chemistry Home Tutor Gurgaon",
            shortLabel: "Chemistry",
            subjectMatches: ["Chemistry"],
            heroTitle: "CBSE Class 12 Chemistry Home Tutor in Gurgaon",
            heroDescription:
              "Premium Class 12 Chemistry tutoring for students who need cleaner conceptual linking, stronger recall, and more reliable board-paper execution.",
            whyHard: [
              "Physical, Organic, and Inorganic revision often becomes uneven.",
              "Students can understand reactions or concepts but still forget them in the paper.",
              "Chemistry needs both memory discipline and answer-structure accuracy.",
            ],
            forStudents: [
              "Students needing a more organised full-subject revision plan.",
              "Families who want board-focused support beyond textbook repetition.",
              "Students who need help balancing Chemistry with Maths or Biology pressure.",
            ],
            boardProblems: [
              "Weak retention across reaction patterns and named processes.",
              "Inorganic revision often feels scattered without a disciplined plan.",
              "Answers lose marks when students know the point but cannot frame it sharply.",
            ],
            tutoringFormat: [
              "Topic clusters built around recall, explanation, and written precision.",
              "Revision loops that keep all three branches active instead of isolated.",
              "Board-style written practice with focus on recurring error patterns.",
            ],
            trustPoints: [
              "Useful where Gurgaon parents want Chemistry taught with more structure.",
              "Built for premium one-to-one home tutoring rather than batch-style overload.",
              "Designed around revision control and exam confidence.",
            ],
            faq: [
              {
                question: "Can Chemistry tutoring focus more on Organic or Inorganic first?",
                answer:
                  "Yes. We can prioritise whichever branch is currently creating the most pressure and then expand into a balanced revision plan.",
              },
              {
                question: "Do you help with recall-heavy board preparation?",
                answer:
                  "Yes. Chemistry often needs smarter recall design, not just more reading, and that is part of the one-to-one support.",
              },
              {
                question: "Is this for Gurgaon home tutoring only?",
                answer:
                  "Yes. BoardPeFocus is focused on premium Gurgaon / Gurugram families.",
              },
            ],
            relatedSchoolSlugs: ["dps-sector-45", "the-heritage-school", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "sohna-road", "new-gurgaon"],
          },
          {
            slug: "biology-home-tutor-gurgaon",
            label: "Biology Home Tutor Gurgaon",
            shortLabel: "Biology",
            subjectMatches: ["Biology"],
            heroTitle: "CBSE Class 12 Biology Home Tutor in Gurgaon",
            heroDescription:
              "Premium Biology tutoring for Class 12 students who need stronger recall, cleaner diagrams, and better writing accuracy for board exams.",
            whyHard: [
              "Biology revision can look complete but still feel unstable under exam conditions.",
              "Diagrams, terminology, and structured explanations need steady repetition.",
              "Students often underestimate how much written accuracy matters for scoring.",
            ],
            forStudents: [
              "Students who need more organised recall and response quality.",
              "Families seeking board-focused help in a theory-heavy subject.",
              "Students who want stronger control before pre-boards and finals.",
            ],
            boardProblems: [
              "Answers become too vague or too long, reducing scoring quality.",
              "Diagram labeling and terminology usage may remain inconsistent.",
              "Revision becomes memory-heavy without enough written recall checks.",
            ],
            tutoringFormat: [
              "Chapter revision with active recall and board-style written response review.",
              "Diagram and terminology correction in one-to-one sessions.",
              "Recurring test loops to keep older Biology chapters from fading.",
            ],
            trustPoints: [
              "Designed for Gurgaon families wanting Biology handled with calm structure.",
              "Useful where written quality and recall need equal attention.",
              "Built around premium one-to-one support and school-aware revision pacing.",
            ],
            faq: [
              {
                question: "Can Biology tutoring improve written answers as well as recall?",
                answer:
                  "Yes. Biology scoring improves when recall, terminology, diagrams, and answer structure all work together.",
              },
              {
                question: "Is this suited for high-performing students too?",
                answer:
                  "Yes. Strong students often use one-to-one Biology support to improve consistency and reduce avoidable errors.",
              },
              {
                question: "Do you support Gurgaon areas only?",
                answer:
                  "Yes. The service is designed around premium home tutoring across Gurugram areas.",
              },
            ],
            relatedSchoolSlugs: ["the-heritage-school", "dps-sector-45", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-extension-road", "dlf-phases", "south-city-sushant-lok"],
          },
          {
            slug: "economics-home-tutor-gurgaon",
            label: "Economics Home Tutor Gurgaon",
            shortLabel: "Economics",
            subjectMatches: ["Economics"],
            heroTitle: "CBSE Class 12 Economics Home Tutor in Gurgaon",
            heroDescription:
              "Structured Economics tutoring for Class 12 students who need clearer concepts, tighter answer quality, and stronger exam confidence.",
            whyHard: [
              "Economics needs conceptual clarity and answer framing together.",
              "Students often know the idea but write vague or underdeveloped responses.",
              "Numerical or graph-based sections can become weak if revision is not balanced.",
            ],
            forStudents: [
              "Students who want better consistency in both Micro and Macro sections.",
              "Families seeking subject-aware board support instead of general tuition.",
              "Students who need writing clarity before pre-boards and boards.",
            ],
            boardProblems: [
              "Answers are often too broad and miss the exact scoring angle.",
              "Graphs and applied reasoning may remain under-practised.",
              "Revision becomes uneven across theory and data-based parts.",
            ],
            tutoringFormat: [
              "Topic explanation with board-style written answer review.",
              "Graphs, caselets, and structured response correction in one-to-one format.",
              "Revision sequencing that keeps important recurring themes active.",
            ],
            trustPoints: [
              "Useful for Gurgaon commerce families who want more refined written support.",
              "Designed around subject clarity, answer quality, and calmer board preparation.",
              "Premium one-to-one tutoring with school-aware pacing.",
            ],
            faq: [
              {
                question: "Can Economics tutoring focus on answer-writing quality?",
                answer:
                  "Yes. Written structure is a major part of Economics scoring, so answer quality is built into the tutoring plan.",
              },
              {
                question: "Do you support only Class 12 boards?",
                answer:
                  "This page is focused on Class 12 board preparation because that is where most premium Economics enquiries come from.",
              },
              {
                question: "Is Gurgaon locality support available too?",
                answer:
                  "Yes. The tutoring flow is aligned to Gurgaon localities and practical home scheduling.",
              },
            ],
            relatedSchoolSlugs: ["amity-international-sector-46", "the-heritage-school", "dps-sushant-lok"],
            relatedAreaSlugs: ["south-city-sushant-lok", "sohna-road", "golf-course-road"],
          },
          {
            slug: "accountancy-home-tutor-gurgaon",
            label: "Accountancy Home Tutor Gurgaon",
            shortLabel: "Accountancy",
            subjectMatches: ["Accountancy"],
            heroTitle: "CBSE Class 12 Accountancy Home Tutor in Gurgaon",
            heroDescription:
              "One-to-one Accountancy tutoring for Gurgaon families who want cleaner formats, stronger chapter command, and more stable Class 12 board preparation.",
            whyHard: [
              "Accuracy drops quickly when formats and adjustments are not revised consistently.",
              "Students may know concepts but still lose marks on layout and sequencing.",
              "Commerce board stress rises when Accountancy and Economics both need deep revision.",
            ],
            forStudents: [
              "Students who need format discipline and chapter-wise clarity.",
              "Families looking for a premium one-to-one commerce specialist.",
              "Students who want steadier confidence before pre-boards and finals.",
            ],
            boardProblems: [
              "Errors in formats, treatment, and adjustment logic reduce scoring confidence.",
              "Revision often feels fragmented between theory-backed chapters and practical ones.",
              "Students need more direct correction than batch teaching usually offers.",
            ],
            tutoringFormat: [
              "Question practice with close correction on presentation and treatment accuracy.",
              "Chapter sequencing designed around the student's current weak patterns.",
              "Revision loops that keep high-weightage sections active throughout the season.",
            ],
            trustPoints: [
              "Useful for premium Gurgaon commerce families seeking board-focused support.",
              "Built around one-to-one correction, not just extra worksheets.",
              "Designed to improve both chapter control and exam confidence.",
            ],
            faq: [
              {
                question: "Can tutoring focus on only the weakest Accountancy chapters first?",
                answer:
                  "Yes. We can prioritise the most stressful sections and then build toward a more complete revision structure.",
              },
              {
                question: "Do you help with presentation and format as well?",
                answer:
                  "Yes. Format discipline and answer clarity are a major part of scoring in Accountancy boards.",
              },
              {
                question: "Is this available only in Gurgaon?",
                answer:
                  "Yes. BoardPeFocus is positioned as a Gurgaon-only premium home tutoring platform.",
              },
            ],
            relatedSchoolSlugs: ["dps-sushant-lok", "amity-international-sector-46", "the-heritage-school"],
            relatedAreaSlugs: ["sohna-road", "south-city-sushant-lok", "new-gurgaon"],
          },
          {
            slug: "computer-science-home-tutor-gurgaon",
            label: "Computer Science Home Tutor Gurgaon",
            shortLabel: "Computer Science",
            subjectMatches: ["Computer Science"],
            heroTitle: "CBSE Class 12 Computer Science Home Tutor in Gurgaon",
            heroDescription:
              "Premium Computer Science support for Class 12 students who want stronger logic, cleaner coding confidence, and board-ready theory plus practical alignment.",
            whyHard: [
              "Students often revise theory and coding separately, which weakens board readiness.",
              "Confidence slips when logic is understood but implementation is not fluent.",
              "School practical expectations and board-paper patterns can feel disconnected.",
            ],
            forStudents: [
              "Students needing subject-expert one-to-one support before boards.",
              "Families who want Computer Science handled with more precision than a generic tutor offers.",
              "Students who need help balancing coding comfort and written theory.",
            ],
            boardProblems: [
              "Weakness in applying logic under exam pressure.",
              "Inconsistent comfort with programs, output tracing, and theoretical answers.",
              "Revision becomes scattered without a clear structure.",
            ],
            tutoringFormat: [
              "Concept and coding blocks built around board-paper expectations.",
              "Practical logic correction in one-to-one sessions.",
              "Revision support that keeps theory, tracing, and coding active together.",
            ],
            trustPoints: [
              "Useful for Gurgaon families seeking subject-expert Class 12 support.",
              "Premium one-to-one tutoring designed around board confidence, not only practice volume.",
              "School-aware and revision-focused for the final stretch.",
            ],
            faq: [
              {
                question: "Can Computer Science tutoring support both coding and theory?",
                answer:
                  "Yes. We structure tutoring to keep logic, programs, and written board answers aligned rather than treated separately.",
              },
              {
                question: "Is the tutoring board-specific?",
                answer:
                  "Yes. The support is framed around board expectations, school practical pace, and exam confidence.",
              },
              {
                question: "Do you offer this across Gurgaon areas?",
                answer:
                  "Yes. We position the service for Gurgaon families who want premium one-to-one home tutoring.",
              },
            ],
            relatedSchoolSlugs: ["shiv-nadar-school", "the-heritage-school", "amity-international-sector-46"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "dwarka-expressway"],
          },
        ],
      },
    ],
  },
  {
    slug: "icse",
    name: "ICSE",
    aliases: ["ICSE"],
    shortDescription: "Premium Class 10 ICSE home tutoring in Gurgaon for detail-heavy subjects and stronger written quality.",
    cardDescription:
      "Useful for ICSE families who want chapter control, polished English and Science support, and school-aware pacing in a premium one-to-one format.",
    classRelevance: "Mainly Class 10 ICSE board support.",
    subjectRelevance: "Strong demand for Maths, Science, and English.",
    heroDescription:
      "BoardPeFocus supports ICSE families in Gurugram with premium one-to-one home tutoring built around detail, written accuracy, revision structure, and calmer board preparation.",
    selectorCopy: "Choose ICSE if your child needs stronger detail control, written precision, and cleaner revision planning.",
    supportPoints: [
      "Useful where written answers, explanation depth, and chapter detail all matter together.",
      "Supports Class 10 ICSE students with a calmer, more structured revision rhythm.",
      "Designed for Gurgaon families who want one-to-one subject depth at home.",
    ],
    painPoints: [
      "ICSE students can understand the content yet still feel underprepared for written depth.",
      "Revision becomes heavy when English, Maths, and Science all need equal attention.",
      "Parents often want a tutor who can balance school pace with board-focused written discipline.",
    ],
    faq: [
      {
        question: "Do you mainly support ICSE Class 10 students?",
        answer:
          "Yes. Our ICSE support is mainly built for Class 10 students because that is where board-exam pressure and subject depth converge most strongly.",
      },
      {
        question: "Can tutoring focus on one ICSE subject only?",
        answer:
          "Yes. We can structure support around a single subject like Maths or Science, or build a wider board plan if needed.",
      },
      {
        question: "Is ICSE home tutoring available across Gurgaon areas?",
        answer:
          "Yes. BoardPeFocus is built around Gurugram localities and premium one-to-one home tutoring needs.",
      },
    ],
    schoolReferences: makeSchoolRefs(
      { slug: "dps-sushant-lok", note: "Useful for families seeking structured home support from established central Gurgaon school corridors." },
      { slug: "scottish-high-international-school", note: "Relevant for parents who prefer detail-oriented written support." },
      { slug: "lancers-international", note: "Helpful where families want premium one-to-one subject support at home." },
    ),
    areaReferences: makeAreaRefs(
      { slug: "dlf-phases", note: "A practical premium corridor for ICSE home support." },
      { slug: "south-city-sushant-lok", note: "Useful for central school corridors and Class 10 tutor matching." },
      { slug: "palam-vihar", note: "Relevant for families preferring steady home-visit tutoring." },
    ),
    classes: [
      {
        slug: "class-10",
        label: "Class 10",
        shortLabel: "10",
        heroDescription:
          "Premium Class 10 ICSE tutoring for Gurgaon families who want stronger written quality, disciplined revision, and subject-wise clarity before boards.",
        painPoints: [
          "ICSE students often need deeper written control, not just chapter completion.",
          "English and Science can both demand more detail than students expect.",
          "Parents want a premium tutor who can bring order to revision without making it feel crowded.",
        ],
        examContext: [
          "Useful when written quality is not matching the student's actual understanding.",
          "Helps families move from vague revision to a more disciplined weekly structure.",
          "Designed for Class 10 board preparation in a premium one-to-one home format.",
        ],
        revisionSupport: [
          "Topic prioritisation across high-pressure subjects.",
          "Written-response correction alongside concept reinforcement.",
          "Revision blocks that are realistic for school-heavy weeks.",
        ],
        samplePaperHelp: [
          "Sample-paper support with emphasis on structure and answer depth.",
          "Correction loops focused on where marks are likely to slip.",
          "Paper practice that supports calm execution instead of panic revision.",
        ],
        faq: [
          {
            question: "Is ICSE Class 10 one of your supported pathways?",
            answer:
              "Yes. ICSE Class 10 is one of the clear board-specific pathways we support for Gurgaon families seeking premium home tutoring.",
          },
          {
            question: "Can a parent choose only Maths or Science support?",
            answer:
              "Yes. The plan can be built around one subject or expanded into a broader Class 10 revision structure.",
          },
          {
            question: "Do you support premium societies and sectors too?",
            answer:
              "Yes. The platform is positioned around Gurgaon areas, school corridors, and home-visit practicality.",
          },
        ],
        subjects: [
          {
            slug: "maths-home-tutor-gurgaon",
            label: "Maths Home Tutor Gurgaon",
            shortLabel: "Maths",
            subjectMatches: ["Mathematics", "Maths"],
            heroTitle: "ICSE Class 10 Maths Home Tutor in Gurgaon",
            heroDescription:
              "Premium Maths tutoring for ICSE students who need stronger problem-solving confidence, method clarity, and more stable Class 10 performance.",
            whyHard: [
              "ICSE Maths can feel dense when chapter transitions are not handled carefully.",
              "Students may solve familiar formats but slow down on less direct questions.",
              "Revision quality drops if the subject is practised without enough correction.",
            ],
            forStudents: [
              "Students needing stronger method clarity and written confidence.",
              "Parents who want a more polished Class 10 Maths plan at home.",
              "Students aiming to reduce avoidable errors before boards.",
            ],
            boardProblems: [
              "Inconsistent method presentation across question types.",
              "Difficulty sustaining confidence in applied or less direct problems.",
              "Weak revision discipline across multiple high-pressure chapters.",
            ],
            tutoringFormat: [
              "One-to-one chapter sequencing with method correction.",
              "Practice built around question families instead of random overload.",
              "Revision loops that keep weak chapters active until they stabilise.",
            ],
            trustPoints: [
              "Useful for Gurgaon families seeking premium ICSE Maths support.",
              "Built around one-to-one correction and board-exam calmness.",
              "Focused on detail, structure, and steady improvement.",
            ],
            faq: [
              {
                question: "Do you support only weak students in ICSE Maths?",
                answer:
                  "No. We support students across levels, including those who are already doing fairly well but want more consistent board performance.",
              },
              {
                question: "Can we start with selected weak chapters?",
                answer:
                  "Yes. That is often the most practical starting point before expanding into a broader revision plan.",
              },
              {
                question: "Is the service Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus is built for Gurugram families seeking premium home tutoring.",
              },
            ],
            relatedSchoolSlugs: ["scottish-high-international-school", "dps-sushant-lok", "lancers-international"],
            relatedAreaSlugs: ["dlf-phases", "south-city-sushant-lok", "palam-vihar"],
          },
          {
            slug: "science-home-tutor-gurgaon",
            label: "Science Home Tutor Gurgaon",
            shortLabel: "Science",
            subjectMatches: ["Science", "Physics", "Chemistry", "Biology"],
            heroTitle: "ICSE Class 10 Science Home Tutor in Gurgaon",
            heroDescription:
              "Premium ICSE Science tutoring for students who need stronger conceptual depth, better written structure, and calmer Class 10 board preparation.",
            whyHard: [
              "ICSE Science often demands more detail and explanation quality than students expect.",
              "Students can study regularly but still struggle with polished written responses.",
              "Balancing all three branches in revision can become difficult close to boards.",
            ],
            forStudents: [
              "Students who need more structure across Physics, Chemistry, and Biology.",
              "Families wanting a single premium Science plan rather than fragmented support.",
              "Students who want written confidence, not just theoretical familiarity.",
            ],
            boardProblems: [
              "Weak written detail in theory-heavy responses.",
              "Uneven chapter control across the three branches of Science.",
              "Revision overload caused by trying to cover too much at once.",
            ],
            tutoringFormat: [
              "Subject blocks that connect concept clarity and written response quality.",
              "Board-style practice with correction on diagrams, explanation, and sequencing.",
              "Calmer revision planning built for the Gurgaon school rhythm.",
            ],
            trustPoints: [
              "Useful for ICSE parents who want more polished board readiness at home.",
              "Built around one-to-one correction and written quality improvement.",
              "Premium Gurgaon-only support with strong locality relevance.",
            ],
            faq: [
              {
                question: "Can one tutor cover the full ICSE Science flow?",
                answer:
                  "Yes, where the fit is right. Many families prefer integrated Science support to keep revision more organised.",
              },
              {
                question: "Do you focus on answer writing too?",
                answer:
                  "Yes. Written quality is essential to board scoring, so it is part of the tutoring approach.",
              },
              {
                question: "Is this available in Gurgaon societies too?",
                answer:
                  "Yes. The service is built for Gurgaon sectors, societies, and school-linked family schedules.",
              },
            ],
            relatedSchoolSlugs: ["dps-sushant-lok", "scottish-high-international-school", "lancers-international"],
            relatedAreaSlugs: ["golf-course-road", "south-city-sushant-lok", "palam-vihar"],
          },
          {
            slug: "english-home-tutor-gurgaon",
            label: "English Home Tutor Gurgaon",
            shortLabel: "English",
            subjectMatches: ["English"],
            heroTitle: "ICSE Class 10 English Home Tutor in Gurgaon",
            heroDescription:
              "Premium ICSE English tutoring for students who need better written polish, stronger comprehension confidence, and more controlled board responses.",
            whyHard: [
              "ICSE English often demands more written maturity than students expect.",
              "Students may understand texts but still write weak or underdeveloped answers.",
              "English revision gets pushed back when Maths and Science feel more urgent.",
            ],
            forStudents: [
              "Students who want stronger written control and clearer responses.",
              "Families looking for calmer confidence-building in a detail-sensitive subject.",
              "Students whose English marks stay inconsistent despite effort.",
            ],
            boardProblems: [
              "Weak structure in literature and comprehension responses.",
              "Answers that feel correct in idea but not refined enough in execution.",
              "Under-revised writing formats before boards.",
            ],
            tutoringFormat: [
              "Writing correction and literature explanation in one-to-one sessions.",
              "Board-aware response building for prose, poetry, and composition tasks.",
              "Revision support that keeps English active without creating overload.",
            ],
            trustPoints: [
              "Useful for Gurgaon ICSE parents who want English treated seriously.",
              "Built around polished written feedback rather than generic tuition.",
              "Premium, one-to-one, home-first support.",
            ],
            faq: [
              {
                question: "Can English tutoring help a student who is already average or above average?",
                answer:
                  "Yes. A lot of improvement in ICSE English comes from more refined written execution, not only from fixing obvious weaknesses.",
              },
              {
                question: "Do you help with composition and literature both?",
                answer:
                  "Yes. The support is designed to improve both written format confidence and text-based answer quality.",
              },
              {
                question: "Is the service only for Gurgaon families?",
                answer:
                  "Yes. BoardPeFocus is positioned around premium Gurugram home tutoring.",
              },
            ],
            relatedSchoolSlugs: ["scottish-high-international-school", "dps-sushant-lok", "lancers-international"],
            relatedAreaSlugs: ["dlf-phases", "palam-vihar", "south-city-sushant-lok"],
          },
        ],
      },
    ],
  },
  {
    slug: "isc",
    name: "ISC",
    aliases: ["ISC"],
    shortDescription: "Premium ISC Class 12 tutoring in Gurgaon for students who need subject depth, answer quality, and calmer revision control.",
    cardDescription:
      "Built for ISC Class 12 families who want subject specialists, better writing clarity, and premium one-to-one support before boards.",
    classRelevance: "Mainly Class 12 ISC support.",
    subjectRelevance: "Common demand across Maths, Physics, Chemistry, Biology, Economics, and Accountancy.",
    heroDescription:
      "BoardPeFocus supports ISC Class 12 families in Gurgaon with premium one-to-one tutoring designed around subject depth, structured revision, school-aware pacing, and better final-paper confidence.",
    selectorCopy: "Choose ISC when Class 12 subject depth and answer quality need more specialist one-to-one support.",
    supportPoints: [
      "Subject-expert one-to-one home tutoring for high-pressure ISC Class 12 workloads.",
      "Useful where written clarity and conceptual depth both matter to results.",
      "Designed for premium Gurgaon families who want more structure before boards.",
    ],
    painPoints: [
      "Students may understand the subject but still feel shaky on written precision.",
      "Revision becomes uneven when heavy theory and numericals compete for time.",
      "Parents want confidence-building support without generic coaching clutter.",
    ],
    faq: [
      {
        question: "Do you support ISC mainly for Class 12?",
        answer:
          "Yes. ISC support is primarily focused on Class 12 because that is where the premium board-exam need is most relevant.",
      },
      {
        question: "Can tutoring be arranged subject-wise for ISC?",
        answer:
          "Yes. We can match subject-wise specialists based on board, area, and schedule preferences.",
      },
      {
        question: "Is this Gurgaon-only?",
        answer:
          "Yes. BoardPeFocus is positioned for Gurgaon / Gurugram families only.",
      },
    ],
    schoolReferences: makeSchoolRefs(
      { slug: "scottish-high-international-school", note: "Relevant for families looking for stronger written quality and subject depth." },
      { slug: "lancers-international", note: "Useful where parents want premium home support with calm board planning." },
      { slug: "dps-sushant-lok", note: "A practical central Gurgaon relevance point for Class 12 support." },
    ),
    areaReferences: makeAreaRefs(
      { slug: "dlf-phases", note: "Good fit for premium subject-wise home tutoring." },
      { slug: "golf-course-road", note: "Useful for one-to-one Class 12 specialist matching." },
      { slug: "south-city-sushant-lok", note: "Commonly relevant for central Gurgaon families." },
    ),
    classes: [
      {
        slug: "class-12",
        label: "Class 12",
        shortLabel: "12",
        heroDescription:
          "Premium ISC Class 12 tutoring for families who want specialist subject support, stronger written discipline, and more stable board preparation at home.",
        painPoints: [
          "Theory-heavy subjects and numericals can compete for the same revision time.",
          "Students often need better answer quality, not just more study hours.",
          "Parents want subject specialists who can work calmly within the school schedule.",
        ],
        examContext: [
          "Useful where written clarity, revision structure, and subject depth all matter.",
          "Designed to reduce pressure by making revision more controlled and visible.",
          "Built for premium one-to-one home tutoring in Gurgaon.",
        ],
        revisionSupport: [
          "Subject-wise sequencing that respects the student's current pressure points.",
          "Written correction and concept rebuilding without wasting revision weeks.",
          "Steadier board preparation across theory-heavy and practical chapters.",
        ],
        samplePaperHelp: [
          "ISC-style paper practice with review on structure and precision.",
          "Error patterns analysed so paper attempts become more useful over time.",
          "Support for full-length papers when readiness makes sense, not too early or too late.",
        ],
        faq: [
          {
            question: "Is ISC support mainly subject-specific?",
            answer:
              "Yes. Most ISC families need sharper subject expertise for Class 12 rather than a broad generalist tuition model.",
          },
          {
            question: "Can parents choose only Commerce or Science subjects?",
            answer:
              "Yes. We can shape the tutoring plan around only the subjects that need support.",
          },
          {
            question: "Is home tutoring available across Gurgaon localities?",
            answer:
              "Yes. The platform is designed around premium Gurgaon home tutoring routes and area relevance.",
          },
        ],
        subjects: [
          {
            slug: "maths-home-tutor-gurgaon",
            label: "Maths Home Tutor Gurgaon",
            shortLabel: "Maths",
            subjectMatches: ["Mathematics", "Maths"],
            heroTitle: "ISC Class 12 Maths Home Tutor in Gurgaon",
            heroDescription:
              "Premium ISC Maths tutoring for Class 12 students who need stronger method clarity, steady revision, and calmer board-paper execution.",
            whyHard: [
              "Maths confidence can drop quickly when revision gaps stay hidden for too long.",
              "Students often need more direct correction on method and pace.",
              "Paper pressure exposes small conceptual gaps more than regular practice sets do.",
            ],
            forStudents: [
              "Students who need one-to-one specialist support for Class 12 Maths.",
              "Families who want a more structured home strategy before boards.",
              "Students aiming for greater stability across high-weightage chapters.",
            ],
            boardProblems: [
              "Method errors and timing issues affect otherwise capable students.",
              "Weak transitions between chapters reduce paper confidence.",
              "Revision can feel broad but not exam-ready.",
            ],
            tutoringFormat: [
              "Topic sequencing based on chapter pressure and current readiness.",
              "Board-style practice with step review and pace correction.",
              "Revision loops that revisit weak methods until they hold under pressure.",
            ],
            trustPoints: [
              "Useful for Gurgaon ISC families seeking specialist Maths support.",
              "Built around one-to-one correction and premium home tutoring expectations.",
              "Designed to improve both structure and confidence.",
            ],
            faq: [
              {
                question: "Can Maths tutoring start with the weakest units only?",
                answer:
                  "Yes. We often begin with the chapters causing the most pressure and then widen the plan.",
              },
              {
                question: "Do you help with exam timing as well?",
                answer:
                  "Yes. Timing and method control are important parts of board-prep tutoring.",
              },
              {
                question: "Is this Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus is built for Gurugram families and premium home tutoring needs.",
              },
            ],
            relatedSchoolSlugs: ["scottish-high-international-school", "lancers-international", "dps-sushant-lok"],
            relatedAreaSlugs: ["dlf-phases", "golf-course-road", "south-city-sushant-lok"],
          },
          {
            slug: "physics-home-tutor-gurgaon",
            label: "Physics Home Tutor Gurgaon",
            shortLabel: "Physics",
            subjectMatches: ["Physics"],
            heroTitle: "ISC Class 12 Physics Home Tutor in Gurgaon",
            heroDescription:
              "Premium one-to-one Physics support for ISC students who need more stability across theory, numericals, and written reasoning.",
            whyHard: [
              "Physics often becomes unstable when derivations and numericals are revised separately.",
              "Students may understand ideas but still write weak board answers.",
              "Revision pressure increases when other heavy subjects compete for time.",
            ],
            forStudents: [
              "Students needing more specialist Physics support before boards.",
              "Families who want direct one-to-one correction and not a crowded coaching style.",
              "Students looking for stronger confidence in full-paper execution.",
            ],
            boardProblems: [
              "Theory logic and numerical application do not always stay aligned.",
              "Derivations can remain weak without repeated written practice.",
              "Students need more organised revision than a typical school schedule provides.",
            ],
            tutoringFormat: [
              "Topic rebuilding with derivations, theory, and numericals kept connected.",
              "Board-style written practice with direct correction.",
              "Revision planning that protects Physics from being left too late.",
            ],
            trustPoints: [
              "Useful for premium Gurgaon ISC families needing subject depth.",
              "Built around one-to-one correction and calmer confidence-building.",
              "School-aware and board-focused without sounding generic.",
            ],
            faq: [
              {
                question: "Can tutoring focus only on derivations and written theory first?",
                answer:
                  "Yes. We can prioritise the most fragile parts of the subject and then widen the revision flow.",
              },
              {
                question: "Is the support really one-to-one?",
                answer:
                  "Yes. The page is built around premium one-to-one tutoring, not a batch format.",
              },
              {
                question: "Do you serve Gurgaon sectors and societies too?",
                answer:
                  "Yes. We support premium home tutoring across Gurugram localities.",
              },
            ],
            relatedSchoolSlugs: ["scottish-high-international-school", "lancers-international", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "dlf-phases"],
          },
          {
            slug: "chemistry-home-tutor-gurgaon",
            label: "Chemistry Home Tutor Gurgaon",
            shortLabel: "Chemistry",
            subjectMatches: ["Chemistry"],
            heroTitle: "ISC Class 12 Chemistry Home Tutor in Gurgaon",
            heroDescription:
              "Premium Chemistry tutoring for ISC students who need stronger revision balance, recall, and written clarity before boards.",
            whyHard: [
              "Chemistry revision can become unbalanced across branches.",
              "Students know chapters in isolation but struggle to hold them together near exams.",
              "Written precision matters more than many students realise until pre-boards.",
            ],
            forStudents: [
              "Students who need more structure across Organic, Inorganic, and Physical Chemistry.",
              "Families wanting subject-expert one-to-one board support.",
              "Students who want calmer revision before paper pressure peaks.",
            ],
            boardProblems: [
              "Recall and written structure often weaken together under pressure.",
              "Inorganic content can feel fragile if not revisited systematically.",
              "Practice can become repetitive without enough direct correction.",
            ],
            tutoringFormat: [
              "Branch-wise revision loops with integrated board-style practice.",
              "Written response correction and recall support in one-to-one sessions.",
              "Pacing that keeps Chemistry active alongside other heavy Class 12 subjects.",
            ],
            trustPoints: [
              "Useful for Gurgaon families wanting Chemistry handled with more discipline.",
              "Premium one-to-one home tutoring aligned to board pressure points.",
              "Built around revision structure, not generic volume.",
            ],
            faq: [
              {
                question: "Can Chemistry tutoring start branch-wise?",
                answer:
                  "Yes. We can begin with the branch that currently feels least stable and then integrate the wider subject.",
              },
              {
                question: "Do you focus on written answers too?",
                answer:
                  "Yes. Written precision is part of board preparation, not a separate extra.",
              },
              {
                question: "Is the service available across Gurgaon?",
                answer:
                  "Yes. BoardPeFocus is designed for Gurgaon / Gurugram localities.",
              },
            ],
            relatedSchoolSlugs: ["scottish-high-international-school", "lancers-international", "dps-sushant-lok"],
            relatedAreaSlugs: ["dlf-phases", "sohna-road", "golf-course-extension-road"],
          },
          {
            slug: "biology-home-tutor-gurgaon",
            label: "Biology Home Tutor Gurgaon",
            shortLabel: "Biology",
            subjectMatches: ["Biology"],
            heroTitle: "ISC Class 12 Biology Home Tutor in Gurgaon",
            heroDescription:
              "Premium ISC Biology tutoring for students who want stronger recall, clearer written quality, and more stable final-paper confidence.",
            whyHard: [
              "Biology can appear complete in revision while still feeling fragile in the exam hall.",
              "Terminology and written structure matter heavily to final performance.",
              "Students often need more active recall and answer correction than they are getting.",
            ],
            forStudents: [
              "Students who need one-to-one support in a theory-heavy subject.",
              "Families seeking cleaner written execution and calmer revision structure.",
              "Students wanting higher confidence before pre-boards and finals.",
            ],
            boardProblems: [
              "Written answers become vague or overlong under board pressure.",
              "Recall fades without enough active review and testing.",
              "Diagram or terminology consistency may remain weaker than expected.",
            ],
            tutoringFormat: [
              "Topic revision with active recall and written response correction.",
              "Targeted practice on diagrams, terminology, and answer structure.",
              "Revision support designed for home-based premium tutoring.",
            ],
            trustPoints: [
              "Useful for Gurgaon ISC families wanting Biology handled with more calm structure.",
              "Built around premium one-to-one tutoring and school-aware pacing.",
              "Designed to improve both recall and written scoring quality.",
            ],
            faq: [
              {
                question: "Can Biology tutoring help with written quality too?",
                answer:
                  "Yes. Biology scoring depends not just on recall but also on how clearly and precisely answers are written.",
              },
              {
                question: "Is this only for Gurgaon students?",
                answer:
                  "Yes. This page is positioned for Gurgaon / Gurugram families only.",
              },
              {
                question: "Can you support premium societies too?",
                answer:
                  "Yes. We work within Gurgaon's premium residential and school-linked pockets.",
              },
            ],
            relatedSchoolSlugs: ["scottish-high-international-school", "lancers-international", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "dlf-phases", "south-city-sushant-lok"],
          },
          {
            slug: "economics-home-tutor-gurgaon",
            label: "Economics Home Tutor Gurgaon",
            shortLabel: "Economics",
            subjectMatches: ["Economics"],
            heroTitle: "ISC Class 12 Economics Home Tutor in Gurgaon",
            heroDescription:
              "Premium Economics tutoring for ISC Class 12 students who need stronger answer quality, clearer conceptual links, and better board confidence.",
            whyHard: [
              "Economics answers need both conceptual clarity and precise written structure.",
              "Students may know the material but still not score as expected.",
              "Revision becomes uneven when theory and applied sections are not balanced carefully.",
            ],
            forStudents: [
              "Students who need sharper written answers and stronger conceptual flow.",
              "Families wanting a premium one-to-one subject specialist at home.",
              "Students trying to improve performance before pre-boards and final papers.",
            ],
            boardProblems: [
              "Answers can become too broad and miss the actual scoring angle.",
              "Applied and graph-linked sections may remain under-practised.",
              "Revision may be broad but not board-oriented enough.",
            ],
            tutoringFormat: [
              "Topic explanation and written answer correction in the same support flow.",
              "Applied question work and structured response building.",
              "Board revision pacing that stays realistic for Gurgaon school weeks.",
            ],
            trustPoints: [
              "Useful for premium Gurgaon commerce families wanting more refinement.",
              "Built around one-to-one written correction and calmer board planning.",
              "Designed to improve answer quality, not just content volume.",
            ],
            faq: [
              {
                question: "Can Economics tutoring focus on answer-writing?",
                answer:
                  "Yes. Written answer quality is one of the main reasons families seek board-specific one-to-one Economics support.",
              },
              {
                question: "Is this mainly for Class 12?",
                answer:
                  "Yes. The page is built specifically around Class 12 board preparation.",
              },
              {
                question: "Is the service Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus focuses only on Gurgaon / Gurugram families.",
              },
            ],
            relatedSchoolSlugs: ["dps-sushant-lok", "scottish-high-international-school", "lancers-international"],
            relatedAreaSlugs: ["south-city-sushant-lok", "sohna-road", "dlf-phases"],
          },
          {
            slug: "accountancy-home-tutor-gurgaon",
            label: "Accountancy Home Tutor Gurgaon",
            shortLabel: "Accountancy",
            subjectMatches: ["Accountancy"],
            heroTitle: "ISC Class 12 Accountancy Home Tutor in Gurgaon",
            heroDescription:
              "Premium ISC Accountancy tutoring for Gurgaon families who want stronger format discipline, chapter control, and more reliable Class 12 board preparation.",
            whyHard: [
              "Presentation, format, and treatment consistency are essential for scoring.",
              "Students can know the chapter and still lose marks in execution.",
              "Revision gets crowded when Commerce subjects all need depth at once.",
            ],
            forStudents: [
              "Students needing chapter-wise format and treatment correction.",
              "Families who want one-to-one Commerce specialist support.",
              "Students who need steadier board confidence before final papers.",
            ],
            boardProblems: [
              "Marks slip on format and adjustment errors rather than total misunderstanding.",
              "Weak chapters remain fragile if revision is not structured carefully.",
              "Students often need more close correction than generic tuition offers.",
            ],
            tutoringFormat: [
              "One-to-one chapter work with direct correction on structure and accuracy.",
              "Revision blocks prioritised by scoring risk and confidence level.",
              "Board-focused practice that keeps important treatment patterns active.",
            ],
            trustPoints: [
              "Useful for Gurgaon families wanting premium, board-focused Accountancy support.",
              "Built around one-to-one correction and clearer scoring discipline.",
              "Designed for premium home tutoring, not a directory-style experience.",
            ],
            faq: [
              {
                question: "Can tutoring start with the chapters causing the most stress?",
                answer:
                  "Yes. We can prioritise the highest-pressure sections first and then widen the revision plan.",
              },
              {
                question: "Do you help with format and presentation too?",
                answer:
                  "Yes. Format discipline is central to how Accountancy support is structured.",
              },
              {
                question: "Is this only for Gurugram families?",
                answer:
                  "Yes. BoardPeFocus is positioned as a Gurgaon-only premium home tutoring platform.",
              },
            ],
            relatedSchoolSlugs: ["dps-sushant-lok", "scottish-high-international-school", "lancers-international"],
            relatedAreaSlugs: ["sohna-road", "south-city-sushant-lok", "new-gurgaon"],
          },
        ],
      },
    ],
  },
  {
    slug: "igcse",
    name: "IGCSE",
    aliases: ["IGCSE", "Cambridge"],
    shortDescription: "Premium IGCSE home tutoring in Gurgaon for concept-heavy, internationally-paced subject preparation.",
    cardDescription:
      "Useful for IGCSE families who want stronger subject clarity, cleaner exam technique, and school-aware one-to-one tutoring at home.",
    classRelevance: "Most relevant to Year 10 / equivalent Class 10 pathways.",
    subjectRelevance: "Strong enquiries for Maths, Physics, Chemistry, Biology, and English.",
    heroDescription:
      "BoardPeFocus supports IGCSE families in Gurgaon with premium one-to-one tutoring designed around subject depth, internationally paced school expectations, and confident exam preparation.",
    selectorCopy: "Choose IGCSE when your child needs a premium one-to-one subject expert who can support concept depth and exam technique together.",
    supportPoints: [
      "Useful for international-school families who want more structured home support.",
      "Designed around subject clarity, exam confidence, and realistic revision planning.",
      "Built for premium Gurgaon families and school-aware scheduling.",
    ],
    painPoints: [
      "IGCSE students often need depth and application, not just chapter completion.",
      "Families want tutors who can work comfortably with international-school expectations.",
      "Revision can become fragmented when each subject feels demanding in a different way.",
    ],
    faq: [
      {
        question: "Do you support IGCSE students in Gurgaon?",
        answer:
          "Yes. We support Gurgaon / Gurugram families looking for premium one-to-one IGCSE tutoring with school-aware scheduling and subject depth.",
      },
      {
        question: "Is this mainly for equivalent Class 10 / Year 10 pathways?",
        answer:
          "Yes. Most IGCSE enquiries align with the equivalent of a Class 10 board-preparation stage, especially in Maths and Sciences.",
      },
      {
        question: "Can tutoring be arranged subject-wise?",
        answer:
          "Yes. Subject-wise matching is often the most useful way to support IGCSE families.",
      },
    ],
    schoolReferences: makeSchoolRefs(
      { slug: "pathways-world-school", note: "Commonly relevant for parents seeking premium international-board support." },
      { slug: "scottish-high-international-school", note: "Useful where families want stronger IGCSE subject confidence at home." },
      { slug: "lancers-international", note: "Relevant for premium one-to-one subject support in Gurgaon." },
      { slug: "shiv-nadar-school", note: "Helpful for families seeking school-aware international-board tutoring." },
    ),
    areaReferences: makeAreaRefs(
      { slug: "golf-course-road", note: "A strong corridor for premium international-board support." },
      { slug: "golf-course-extension-road", note: "Useful for international-school family schedules." },
      { slug: "dlf-phases", note: "Good fit for premium one-to-one subject tutoring." },
    ),
    classes: [
      {
        slug: "class-10",
        label: "Class 10 / Year 10",
        shortLabel: "Year 10",
        heroDescription:
          "Premium IGCSE support for students in the equivalent of a Class 10 board stage who need stronger subject clarity, exam confidence, and cleaner revision structure.",
        painPoints: [
          "Application-based questions can feel difficult without enough guided correction.",
          "Students often need subject experts who can teach concept depth calmly.",
          "Revision becomes difficult when every subject needs a slightly different style of preparation.",
        ],
        examContext: [
          "Useful for families in premium Gurgaon school corridors seeking international-board support.",
          "Built for one-to-one subject depth and better exam technique at home.",
          "Designed to keep the page useful, clear, and commercially relevant for parents.",
        ],
        revisionSupport: [
          "Topic planning built around the student's actual readiness.",
          "Revision structure that keeps high-pressure subjects from becoming chaotic.",
          "One-to-one correction that improves confidence as well as accuracy.",
        ],
        samplePaperHelp: [
          "Exam-style practice with review on method, explanation, and structure.",
          "Support for moving from classroom familiarity to exam execution.",
          "Paper practice kept thoughtful and selective rather than excessive.",
        ],
        faq: [
          {
            question: "Do you support IGCSE Maths and Sciences in Gurgaon?",
            answer:
              "Yes. Those are among the most common premium IGCSE subject enquiries we see from Gurgaon families.",
          },
          {
            question: "Can tutoring be fully one-to-one at home?",
            answer:
              "Yes. BoardPeFocus is positioned around premium one-to-one home tutoring.",
          },
          {
            question: "Is this for Gurgaon families only?",
            answer:
              "Yes. The service is Gurgaon / Gurugram only.",
          },
        ],
        subjects: [
          {
            slug: "maths-home-tutor-gurgaon",
            label: "Maths Home Tutor Gurgaon",
            shortLabel: "Maths",
            subjectMatches: ["Mathematics", "Maths"],
            heroTitle: "IGCSE Maths Home Tutor in Gurgaon",
            heroDescription:
              "Premium IGCSE Maths tutoring for Gurgaon families who want stronger concept depth, cleaner exam technique, and steadier confidence at home.",
            whyHard: [
              "IGCSE Maths often requires more application confidence than students expect.",
              "Students may know the concept but still struggle in unfamiliar question styles.",
              "Revision can remain broad without enough question-family practice.",
            ],
            forStudents: [
              "Students who need sharper one-to-one correction in Maths.",
              "Families wanting a premium international-board subject specialist.",
              "Students who want better exam composure and consistency.",
            ],
            boardProblems: [
              "Difficulty handling less direct or multi-step applications.",
              "Weakness in converting concept familiarity into exam performance.",
              "Confidence drops when mistakes repeat under timed practice.",
            ],
            tutoringFormat: [
              "Concept rebuilding with strong emphasis on application and method.",
              "Exam-style practice selected for relevance, not bulk.",
              "Revision loops that target recurring error families.",
            ],
            trustPoints: [
              "Useful for Gurgaon IGCSE families seeking premium one-to-one support.",
              "Built around subject expertise, exam technique, and calmer confidence.",
              "School-aware and locally relevant to international-school corridors.",
            ],
            faq: [
              {
                question: "Can Maths tutoring help with application-style questions?",
                answer:
                  "Yes. That is a key part of how the support is structured for IGCSE students.",
              },
              {
                question: "Is this suitable for strong students too?",
                answer:
                  "Yes. Even strong students often want one-to-one refinement on exam technique and consistency.",
              },
              {
                question: "Is it only for Gurgaon families?",
                answer:
                  "Yes. BoardPeFocus focuses on premium Gurgaon / Gurugram home tutoring.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "scottish-high-international-school", "lancers-international"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "dlf-phases"],
          },
          {
            slug: "physics-home-tutor-gurgaon",
            label: "Physics Home Tutor Gurgaon",
            shortLabel: "Physics",
            subjectMatches: ["Physics"],
            heroTitle: "IGCSE Physics Home Tutor in Gurgaon",
            heroDescription:
              "Premium IGCSE Physics tutoring for students who need concept depth, better application confidence, and calmer exam execution.",
            whyHard: [
              "Physics application often feels unstable without repeated guided practice.",
              "Students may understand concepts but struggle with structured explanations.",
              "Revision gaps appear only once exam-style problems become more mixed.",
            ],
            forStudents: [
              "Students who need stronger confidence in application-heavy Physics.",
              "Families wanting premium one-to-one support aligned to international-school expectations.",
              "Students who benefit from closer correction and more thoughtful pacing.",
            ],
            boardProblems: [
              "Theory understanding does not always convert into dependable written and applied answers.",
              "Students can become hesitant in problem-solving without enough targeted correction.",
              "Exam confidence dips when older topics are not revisited properly.",
            ],
            tutoringFormat: [
              "Concept and application work designed together.",
              "Exam-style problem review with direct feedback on reasoning and structure.",
              "Revision planning that prevents subject drift across school weeks.",
            ],
            trustPoints: [
              "Useful for Gurgaon families wanting subject depth in a premium home format.",
              "Built for one-to-one, school-aware, international-board support.",
              "Designed to improve execution and confidence, not just coverage.",
            ],
            faq: [
              {
                question: "Can Physics tutoring focus on application and explanations together?",
                answer:
                  "Yes. That combined focus is important for building stronger IGCSE exam performance.",
              },
              {
                question: "Do you support premium Gurgaon localities too?",
                answer:
                  "Yes. The platform is designed around Gurgaon sectors, school corridors, and practical home scheduling.",
              },
              {
                question: "Is this for one-to-one home tutoring only?",
                answer:
                  "Yes. The page is positioned around premium one-to-one support.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "scottish-high-international-school", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "dlf-phases"],
          },
          {
            slug: "chemistry-home-tutor-gurgaon",
            label: "Chemistry Home Tutor Gurgaon",
            shortLabel: "Chemistry",
            subjectMatches: ["Chemistry"],
            heroTitle: "IGCSE Chemistry Home Tutor in Gurgaon",
            heroDescription:
              "Premium IGCSE Chemistry tutoring for families who want stronger concept linking, cleaner recall, and steadier exam confidence.",
            whyHard: [
              "Chemistry demands both conceptual understanding and controlled recall.",
              "Students often revise content without enough structure to retain it under pressure.",
              "Application and explanation can both weaken if practice is not balanced carefully.",
            ],
            forStudents: [
              "Students who want more organised subject revision.",
              "Families seeking a premium one-to-one Chemistry specialist in Gurgaon.",
              "Students who want stronger exam confidence before final assessments.",
            ],
            boardProblems: [
              "Weak retention in content-heavy or reaction-linked areas.",
              "Answers that feel familiar in revision but unreliable in the paper.",
              "Revision plans that are too broad and not exam-focused enough.",
            ],
            tutoringFormat: [
              "Concept explanation, active recall, and exam-style written practice together.",
              "Targeted correction on where recall and explanation break down.",
              "Revision sequencing built for school weeks and premium home tutoring schedules.",
            ],
            trustPoints: [
              "Useful for Gurgaon IGCSE families wanting a calmer, more premium subject approach.",
              "Built around one-to-one correction and clearer revision structure.",
              "School-aware and locally relevant to international-board families.",
            ],
            faq: [
              {
                question: "Can Chemistry tutoring help both recall and understanding?",
                answer:
                  "Yes. The support is structured to improve both at the same time because that is what stronger exam confidence usually needs.",
              },
              {
                question: "Is Gurgaon locality support available?",
                answer:
                  "Yes. We support Gurgaon families and premium residential corridors where one-to-one tutoring is practical.",
              },
              {
                question: "Is this an international-board-specific plan?",
                answer:
                  "Yes. The page is designed around IGCSE-specific needs, not generic tutoring language.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "scottish-high-international-school", "lancers-international"],
            relatedAreaSlugs: ["golf-course-extension-road", "dlf-phases", "golf-course-road"],
          },
          {
            slug: "biology-home-tutor-gurgaon",
            label: "Biology Home Tutor Gurgaon",
            shortLabel: "Biology",
            subjectMatches: ["Biology"],
            heroTitle: "IGCSE Biology Home Tutor in Gurgaon",
            heroDescription:
              "Premium IGCSE Biology support for students who need stronger written clarity, better recall, and steadier one-to-one exam preparation at home.",
            whyHard: [
              "Biology often feels comfortable until students have to reproduce answers precisely.",
              "Terminology, diagrams, and structured explanations all need active control.",
              "Revision can become memory-heavy without enough guided response practice.",
            ],
            forStudents: [
              "Students who want a calmer, more structured Biology plan.",
              "Families seeking premium one-to-one international-board support.",
              "Students who want better consistency in theory-heavy assessments.",
            ],
            boardProblems: [
              "Weak answer structure despite decent topic familiarity.",
              "Diagram and terminology confidence can stay unstable late into revision.",
              "Students often need more active recall than passive reading provides.",
            ],
            tutoringFormat: [
              "Recall and written practice combined in one-to-one sessions.",
              "Diagram and terminology support built into the revision flow.",
              "Exam-style checks that keep older topics from fading.",
            ],
            trustPoints: [
              "Useful for Gurgaon IGCSE families wanting premium Biology support.",
              "Built around written precision, recall, and calmer confidence-building.",
              "Aligned with international-school expectations and home-first convenience.",
            ],
            faq: [
              {
                question: "Can Biology tutoring improve written response quality?",
                answer:
                  "Yes. Biology performance often improves when recall and written response quality are strengthened together.",
              },
              {
                question: "Is this suited to Gurgaon international-school families?",
                answer:
                  "Yes. The page is explicitly designed for Gurgaon families studying in international-school environments.",
              },
              {
                question: "Is this only for one-to-one home tutoring?",
                answer:
                  "Yes. The positioning is premium, one-to-one, and home focused.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "scottish-high-international-school", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "dlf-phases", "golf-course-extension-road"],
          },
          {
            slug: "english-home-tutor-gurgaon",
            label: "English Home Tutor Gurgaon",
            shortLabel: "English",
            subjectMatches: ["English"],
            heroTitle: "IGCSE English Home Tutor in Gurgaon",
            heroDescription:
              "Premium IGCSE English tutoring for students who need better written expression, sharper comprehension confidence, and calmer exam preparation.",
            whyHard: [
              "English scoring often depends on nuance, structure, and polished expression.",
              "Students may read well but still write underdeveloped or rushed answers.",
              "Revision is easy to postpone until the subject starts affecting confidence.",
            ],
            forStudents: [
              "Students who want stronger written polish in English.",
              "Families seeking premium one-to-one language support in Gurgaon.",
              "Students aiming for more consistency in comprehension and composition.",
            ],
            boardProblems: [
              "Weak answer polish even when the core idea is correct.",
              "Under-developed response structure in literature or writing tasks.",
              "Insufficient active practice before assessments.",
            ],
            tutoringFormat: [
              "Writing correction and text analysis in premium one-to-one sessions.",
              "Exam-style response building with direct feedback on clarity and structure.",
              "Revision support that keeps English visible through the wider exam cycle.",
            ],
            trustPoints: [
              "Useful for Gurgaon parents who want English treated as a serious scoring subject.",
              "Built around written polish, calmer confidence, and international-board relevance.",
              "Premium one-to-one home tutoring only.",
            ],
            faq: [
              {
                question: "Can tutoring improve writing and comprehension together?",
                answer:
                  "Yes. IGCSE English support is most useful when both are strengthened together rather than in isolation.",
              },
              {
                question: "Is the support Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus focuses exclusively on Gurugram families.",
              },
              {
                question: "Do you serve premium school corridors too?",
                answer:
                  "Yes. The service is designed around Gurgaon school corridors and home tutoring convenience.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "scottish-high-international-school", "lancers-international"],
            relatedAreaSlugs: ["dlf-phases", "golf-course-road", "golf-course-extension-road"],
          },
        ],
      },
    ],
  },
  {
    slug: "ib",
    name: "IB",
    aliases: ["IB", "IBDP", "IB DP"],
    shortDescription: "Premium IB home tutoring in Gurgaon for subject depth, school-aware pacing, and calmer IBDP support.",
    cardDescription:
      "Useful for IB families who want subject-expert, one-to-one support in Gurgaon with stronger structure around workload, pacing, and confidence.",
    classRelevance: "Best aligned to IBDP pathways and senior-school board-style support.",
    subjectRelevance: "Strong demand for Maths, Physics, Chemistry, Biology, and Economics.",
    heroDescription:
      "BoardPeFocus supports IB families in Gurugram with premium one-to-one home tutoring that respects subject depth, school pace, internal assessment pressure, and calmer academic planning.",
    selectorCopy: "Choose IB when your child needs premium subject expertise, school-aware pacing, and one-to-one clarity through a demanding curriculum.",
    supportPoints: [
      "Useful for premium IB families who need pace-aware subject support at home.",
      "Designed around depth, confidence, and a calmer weekly academic rhythm.",
      "School-aware and Gurgaon-only, with one-to-one premium positioning.",
    ],
    painPoints: [
      "IB students often need subject depth and pacing support at the same time.",
      "Families want a tutor who can respect school intensity without creating more clutter.",
      "Confidence drops when heavy subjects are not revised with enough structure.",
    ],
    faq: [
      {
        question: "Do you support IB students in Gurgaon?",
        answer:
          "Yes. BoardPeFocus supports Gurgaon IB families who want premium one-to-one home tutoring with strong subject depth and school-aware pacing.",
      },
      {
        question: "Is the focus mainly on IBDP subjects?",
        answer:
          "Yes. Most enquiries are around IBDP subjects because families typically need more specialist support at that stage.",
      },
      {
        question: "Can you match tutors by subject rather than by board only?",
        answer:
          "Yes. That is often the most useful way to support IB families, especially in senior-school subjects.",
      },
    ],
    schoolReferences: makeSchoolRefs(
      { slug: "pathways-world-school", note: "Commonly requested by IB families seeking premium subject support." },
      { slug: "lancers-international", note: "Relevant where parents want subject depth and calmer pacing." },
      { slug: "scottish-high-international-school", note: "Useful for families who want one-to-one support with international-school relevance." },
      { slug: "shiv-nadar-school", note: "Helpful for Gurgaon families who want strong academic structure at home." },
    ),
    areaReferences: makeAreaRefs(
      { slug: "golf-course-road", note: "Strong fit for premium IB family schedules and home tutoring." },
      { slug: "golf-course-extension-road", note: "Useful for international-school corridors and one-to-one support." },
      { slug: "dlf-phases", note: "Relevant for premium subject-expert tutoring near major school routes." },
    ),
    classes: [
      {
        slug: "ibdp",
        label: "IBDP",
        shortLabel: "IBDP",
        heroDescription:
          "Premium IBDP tutoring for Gurgaon families who need subject depth, calmer pacing, and one-to-one support that respects a demanding school workload.",
        painPoints: [
          "Students often need specialist subject support without losing control of the wider workload.",
          "Families want tutors who understand the intensity of international-school pacing.",
          "Confidence drops when heavy subjects are not revised with enough structure and calmness.",
        ],
        examContext: [
          "Useful for premium Gurgaon families seeking subject-expert support close to home.",
          "Designed to support deeper learning, clearer pacing, and stronger exam confidence.",
          "Built around one-to-one, school-aware tutoring rather than generic academic help.",
        ],
        revisionSupport: [
          "Subject-wise planning tied to the student's pressure points and weekly reality.",
          "Calmer revision structure for heavy subjects that can otherwise feel unstable.",
          "One-to-one correction that improves clarity without adding clutter.",
        ],
        samplePaperHelp: [
          "Selective exam-style practice aligned to readiness and confidence levels.",
          "Review on structure, precision, and recurring error patterns.",
          "Useful where students need sharper execution without being overloaded.",
        ],
        faq: [
          {
            question: "Is IB support mainly subject-specific?",
            answer:
              "Yes. Most IB families need sharper subject depth in one or two demanding areas rather than generic tutoring.",
          },
          {
            question: "Can tutoring be matched around school pace and location?",
            answer:
              "Yes. We consider both the academic requirement and the Gurgaon locality context when suggesting support.",
          },
          {
            question: "Is this Gurgaon-only?",
            answer:
              "Yes. BoardPeFocus is built specifically for Gurgaon / Gurugram families.",
          },
        ],
        subjects: [
          {
            slug: "maths-aa-home-tutor-gurgaon",
            label: "Maths AA Home Tutor Gurgaon",
            shortLabel: "IB Maths",
            subjectMatches: ["Mathematics", "Maths"],
            heroTitle: "IB Maths Home Tutor in Gurgaon",
            heroDescription:
              "Premium IB Maths tutoring for Gurgaon families who want deeper conceptual support, stronger application confidence, and calmer one-to-one subject guidance.",
            whyHard: [
              "IB Maths can feel conceptually heavy and application-intensive at the same time.",
              "Students may understand core ideas but struggle to execute under pressure.",
              "Heavy workloads make it difficult to revisit weak topics consistently.",
            ],
            forStudents: [
              "Students who need a premium one-to-one Maths specialist in Gurgaon.",
              "Families wanting subject depth without generic coaching clutter.",
              "Students who want calmer confidence in application-heavy work.",
            ],
            boardProblems: [
              "Weakness in applying concepts across unfamiliar problem structures.",
              "Confidence drops when revision is too broad and not targeted enough.",
              "Students often need closer correction on thought process and precision.",
            ],
            tutoringFormat: [
              "Concept depth with application-focused guided practice.",
              "One-to-one review of reasoning, method, and recurring error patterns.",
              "Revision planning built around heavy school workloads.",
            ],
            trustPoints: [
              "Useful for Gurgaon IB families seeking subject depth and premium one-to-one support.",
              "School-aware, calm, and focused on stronger academic control.",
              "Built around home tutoring convenience in premium localities.",
            ],
            faq: [
              {
                question: "Is IB Maths tutoring mainly one-to-one?",
                answer:
                  "Yes. The page is positioned around premium one-to-one support because that is usually the most useful format for demanding IB Maths work.",
              },
              {
                question: "Can tutoring focus on the hardest topics first?",
                answer:
                  "Yes. We often prioritise the topics causing the most pressure and then widen the support carefully.",
              },
              {
                question: "Is this Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus focuses only on Gurgaon / Gurugram families.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "lancers-international", "scottish-high-international-school"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "dlf-phases"],
          },
          {
            slug: "physics-hl-home-tutor-gurgaon",
            label: "Physics HL Home Tutor Gurgaon",
            shortLabel: "IB Physics",
            subjectMatches: ["Physics"],
            heroTitle: "IB Physics Home Tutor in Gurgaon",
            heroDescription:
              "Premium IB Physics tutoring for students who need deeper concept control, better application confidence, and calmer subject pacing at home.",
            whyHard: [
              "Physics feels demanding when conceptual depth and application both stay high.",
              "Students can understand ideas yet still feel unstable in exam-style work.",
              "Heavy school pace leaves little room to rebuild weak foundations without help.",
            ],
            forStudents: [
              "Students who need subject-expert one-to-one IB Physics support.",
              "Families seeking premium academic guidance close to home in Gurgaon.",
              "Students who want clearer pacing and more confidence in difficult topics.",
            ],
            boardProblems: [
              "Weak transfer from conceptual familiarity to confident problem solving.",
              "Derivations, explanations, and application can all feel unstable at once.",
              "Students need more structured revision than school workload alone allows.",
            ],
            tutoringFormat: [
              "Concept rebuilding with application and written explanation combined.",
              "One-to-one correction on reasoning, structure, and pressure points.",
              "Revision planning built to reduce chaos rather than add to it.",
            ],
            trustPoints: [
              "Useful for Gurgaon IB families wanting premium Physics support.",
              "Built around one-to-one subject expertise and school-aware pacing.",
              "Designed to improve confidence without making the workload feel heavier.",
            ],
            faq: [
              {
                question: "Can IB Physics tutoring help with confidence as well as content?",
                answer:
                  "Yes. Confidence building is part of the support because subject pressure and execution are closely linked in Physics.",
              },
              {
                question: "Is this suitable for premium school corridors in Gurgaon?",
                answer:
                  "Yes. The page is built around Gurgaon international-school corridors and home tutoring convenience.",
              },
              {
                question: "Is the support one-to-one only?",
                answer:
                  "Yes. The positioning is premium one-to-one support.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "lancers-international", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "golf-course-extension-road", "dlf-phases"],
          },
          {
            slug: "chemistry-hl-home-tutor-gurgaon",
            label: "Chemistry HL Home Tutor Gurgaon",
            shortLabel: "IB Chemistry",
            subjectMatches: ["Chemistry"],
            heroTitle: "IB Chemistry Home Tutor in Gurgaon",
            heroDescription:
              "Premium IB Chemistry support for students who need stronger conceptual links, cleaner recall, and calmer one-to-one pacing in Gurgaon.",
            whyHard: [
              "Chemistry can feel dense when concepts and recall both stay demanding.",
              "Students often need sharper structure to keep the subject stable through school pressure.",
              "Confidence drops when revision feels wide but not secure enough.",
            ],
            forStudents: [
              "Students who need premium one-to-one Chemistry support in Gurgaon.",
              "Families wanting more thoughtful, school-aware subject pacing.",
              "Students who want clearer revision structure in a demanding academic cycle.",
            ],
            boardProblems: [
              "Retention and explanation can both weaken under pressure.",
              "Students need a better way to revisit weak topics without getting overloaded.",
              "Concepts may feel understood but not stable enough in assessment mode.",
            ],
            tutoringFormat: [
              "Concept linking, recall, and written precision built into one tutoring flow.",
              "Targeted one-to-one correction on recurring weak patterns.",
              "Revision planning that respects overall IBDP workload.",
            ],
            trustPoints: [
              "Useful for Gurgaon IB families wanting subject depth and calmer control.",
              "Built around premium one-to-one tutoring and school-aware pacing.",
              "Designed for strong academic support without design drift or clutter.",
            ],
            faq: [
              {
                question: "Can tutoring start with the least stable Chemistry topics?",
                answer:
                  "Yes. We can prioritise the topics causing the most pressure and then build toward more complete confidence.",
              },
              {
                question: "Is this Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus is focused only on Gurgaon / Gurugram families.",
              },
              {
                question: "Do you support international-school families specifically?",
                answer:
                  "Yes. The page is written for families studying in Gurgaon international-school environments.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "lancers-international", "scottish-high-international-school"],
            relatedAreaSlugs: ["golf-course-extension-road", "dlf-phases", "golf-course-road"],
          },
          {
            slug: "biology-hl-home-tutor-gurgaon",
            label: "Biology HL Home Tutor Gurgaon",
            shortLabel: "IB Biology",
            subjectMatches: ["Biology"],
            heroTitle: "IB Biology Home Tutor in Gurgaon",
            heroDescription:
              "Premium IB Biology tutoring for students who need stronger recall, sharper written clarity, and calmer premium one-to-one support at home.",
            whyHard: [
              "Biology often requires high recall without sacrificing written quality.",
              "Students can feel prepared but still lose confidence in assessment conditions.",
              "Heavy school pace leaves little room for slower, more thoughtful revision.",
            ],
            forStudents: [
              "Students who want more reliable revision and better written precision.",
              "Families seeking premium one-to-one Biology support in Gurgaon.",
              "Students who need a calmer approach to a heavy subject load.",
            ],
            boardProblems: [
              "Recall and written response quality can weaken together under pressure.",
              "Students need more active subject control than passive revision provides.",
              "Confidence drops when topics have not been revisited strategically.",
            ],
            tutoringFormat: [
              "One-to-one topic revision with active recall and explanation support.",
              "Written answer refinement built into the subject flow.",
              "Revision pacing aligned to demanding school calendars.",
            ],
            trustPoints: [
              "Useful for Gurgaon IB families seeking premium Biology support.",
              "Built around one-to-one correction and calmer academic pacing.",
              "Designed for school-aware, premium home tutoring.",
            ],
            faq: [
              {
                question: "Can Biology tutoring improve recall and answer quality together?",
                answer:
                  "Yes. That combined improvement is central to how one-to-one Biology support is structured.",
              },
              {
                question: "Is this for Gurgaon families only?",
                answer:
                  "Yes. BoardPeFocus is focused only on Gurugram families.",
              },
              {
                question: "Do you support premium residential corridors too?",
                answer:
                  "Yes. The service is aligned to Gurgaon school and area corridors where home tutoring is practical.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "lancers-international", "shiv-nadar-school"],
            relatedAreaSlugs: ["golf-course-road", "dlf-phases", "golf-course-extension-road"],
          },
          {
            slug: "economics-hl-home-tutor-gurgaon",
            label: "Economics HL Home Tutor Gurgaon",
            shortLabel: "IB Economics",
            subjectMatches: ["Economics"],
            heroTitle: "IB Economics Home Tutor in Gurgaon",
            heroDescription:
              "Premium IB Economics tutoring for Gurgaon families who want clearer argument quality, stronger conceptual structure, and more stable one-to-one support.",
            whyHard: [
              "Economics answers need structured thinking, not just topic familiarity.",
              "Students may understand the concept but still write weak or loose responses.",
              "Heavy workload makes subject refinement difficult without specialist help.",
            ],
            forStudents: [
              "Students who want stronger written discipline in Economics.",
              "Families seeking premium one-to-one international-board support.",
              "Students who need more confidence in high-pressure written assessments.",
            ],
            boardProblems: [
              "Answers may miss structure and precision even when the content is known.",
              "Applied reasoning can feel under-practised under assessment conditions.",
              "Revision may feel active but not refined enough for stronger performance.",
            ],
            tutoringFormat: [
              "Concept explanation and written-argument correction together.",
              "One-to-one support for response quality, structure, and confidence.",
              "Revision planning that fits within premium-school workload patterns.",
            ],
            trustPoints: [
              "Useful for Gurgaon IB families wanting premium subject refinement at home.",
              "Built around one-to-one written correction and calmer planning.",
              "School-aware, premium, and tightly focused on real board-family needs.",
            ],
            faq: [
              {
                question: "Can Economics tutoring focus on written structure?",
                answer:
                  "Yes. That is one of the most commercially useful reasons families seek one-to-one Economics support.",
              },
              {
                question: "Is the support Gurgaon-only?",
                answer:
                  "Yes. BoardPeFocus is positioned for Gurgaon / Gurugram families only.",
              },
              {
                question: "Do you support subject-specific one-to-one tutoring?",
                answer:
                  "Yes. Subject-specific support is usually the most useful model for IB families.",
              },
            ],
            relatedSchoolSlugs: ["pathways-world-school", "lancers-international", "scottish-high-international-school"],
            relatedAreaSlugs: ["golf-course-road", "dlf-phases", "golf-course-extension-road"],
          },
        ],
      },
    ],
  },
];

export const subjectClusterHighlights = [
  { label: "Maths", href: "/boards/cbse/class-10/maths-home-tutor-gurgaon" },
  { label: "Physics", href: "/boards/cbse/class-12/physics-home-tutor-gurgaon" },
  { label: "Chemistry", href: "/boards/cbse/class-12/chemistry-home-tutor-gurgaon" },
  { label: "Biology", href: "/boards/cbse/class-12/biology-home-tutor-gurgaon" },
  { label: "Class 10 Science", href: "/boards/cbse/class-10/science-home-tutor-gurgaon" },
  { label: "English", href: "/boards/icse/class-10/english-home-tutor-gurgaon" },
  { label: "Economics", href: "/boards/isc/class-12/economics-home-tutor-gurgaon" },
  { label: "Accountancy", href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon" },
  { label: "Computer Science", href: "/boards/cbse/class-12/computer-science-home-tutor-gurgaon" },
];

export const boardsHubFaqs: BoardFaqItem[] = [
  {
    question: "Which boards do you support in Gurgaon?",
    answer:
      "We support premium home tutoring for CBSE, ICSE, ISC, IGCSE, and IB families in Gurgaon / Gurugram.",
  },
  {
    question: "Are Class 10 and Class 12 the main focus?",
    answer:
      "Yes. The strongest board-exam demand comes from Class 10 and Class 12 families, so the Boards section is built around those decision paths.",
  },
  {
    question: "Do you match board-specific tutors across Gurgaon areas?",
    answer:
      "Yes. We look at board, subject, school context, and Gurgaon locality so the match feels practical as well as academically strong.",
  },
  {
    question: "Is this one-to-one home tutoring only?",
    answer:
      "The positioning of BoardPeFocus is premium, one-to-one, and home-first for Gurgaon families.",
  },
];

export const boardsHubRelatedPages = [
  {
    title: "Gurgaon Areas Hub",
    href: "/gurgaon-area",
    description: "Browse locality-led tutoring discovery across corridors, sectors, and societies.",
  },
  {
    title: "Schools Hub",
    href: "/schools",
    description: "Move into school-aware pages that help parents shortlist tutoring more intelligently.",
  },
  {
    title: "Browse Tutors",
    href: "/search",
    description: "Continue from boards into tutor discovery once the board and subject are clear.",
  },
  {
    title: "Contact BoardPeFocus",
    href: "/contact",
    description: "Talk to the team for a callback, WhatsApp discussion, or a board-specific match.",
  },
];

export function getBoardConfig(boardSlug: string) {
  return boardHubConfigs.find((board) => board.slug === boardSlug);
}

export function getBoardClassConfig(boardSlug: string, classSlug: string) {
  return getBoardConfig(boardSlug)?.classes.find((classConfig) => classConfig.slug === classSlug);
}

export function getBoardSubjectConfig(boardSlug: string, classSlug: string, subjectSlug: string) {
  return getBoardClassConfig(boardSlug, classSlug)?.subjects.find((subject) => subject.slug === subjectSlug);
}

export function getAllBoardParams() {
  return boardHubConfigs.map((board) => ({ board: board.slug }));
}

export function getAllClassParams() {
  return boardHubConfigs.flatMap((board) =>
    board.classes.map((classConfig) => ({
      board: board.slug,
      classLevel: classConfig.slug,
    })),
  );
}

export function getAllSubjectParams() {
  return boardHubConfigs.flatMap((board) =>
    board.classes.flatMap((classConfig) =>
      classConfig.subjects.map((subject) => ({
        board: board.slug,
        classLevel: classConfig.slug,
        subjectSlug: subject.slug,
      })),
    ),
  );
}

export function getBoardPath(boardSlug: string) {
  return `/boards/${boardSlug}`;
}

export function getBoardClassPath(boardSlug: string, classSlug: string) {
  return `${getBoardPath(boardSlug)}/${classSlug}`;
}

export function getBoardSubjectPath(boardSlug: string, classSlug: string, subjectSlug: string) {
  return `${getBoardClassPath(boardSlug, classSlug)}/${subjectSlug}`;
}

export function getBoardSubjectCards() {
  return subjectClusterHighlights;
}

export function getSchoolDetails(slugs: string[]) {
  return slugs
    .map((slug) => mockSchools.find((school) => school.slug === slug))
    .filter((school): school is (typeof mockSchools)[number] => Boolean(school));
}

export function getAreaDetails(slugs: string[]) {
  return slugs
    .map((slug) => areaClusters.find((cluster) => cluster.slug === slug))
    .filter((cluster): cluster is (typeof areaClusters)[number] => Boolean(cluster));
}

export function getBoardTutors(board: BoardConfig) {
  return mockTutors.filter((tutor) =>
    tutor.boards.some((tutorBoard) =>
      board.aliases.some((alias) => tutorBoard.toLowerCase() === alias.toLowerCase()),
    ),
  );
}

export function getSubjectTutors(board: BoardConfig, subject: SubjectConfig) {
  return mockTutors.filter(
    (tutor) =>
      tutor.boards.some((tutorBoard) =>
        board.aliases.some((alias) => tutorBoard.toLowerCase() === alias.toLowerCase()),
      ) &&
      tutor.subjects.some((tutorSubject) =>
        subject.subjectMatches.some((match) => tutorSubject.toLowerCase() === match.toLowerCase()),
      ),
  );
}
