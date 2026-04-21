export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  readTime: string;
  audience: string;
  highlight: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cbse-class-10-study-plan-gurugram",
    category: "CBSE Strategy",
    title: "A realistic Class 10 CBSE study plan for busy Gurugram families",
    excerpt:
      "A board-focused weekly rhythm for students who need structure, revision blocks, and lower exam-season stress without turning every evening into a battle.",
    dateLabel: "April 10, 2026",
    readTime: "6 min read",
    audience: "For Class 10 parents",
    highlight: "Study rhythm",
  },
  {
    slug: "ib-dp-home-tutor-checklist",
    category: "IB",
    title: "How to evaluate an IB DP home tutor before you commit",
    excerpt:
      "The practical checklist we use when matching IB students: rubric fluency, IA support boundaries, pacing discipline, and whether the tutor can actually coach exam writing.",
    dateLabel: "April 6, 2026",
    readTime: "5 min read",
    audience: "For IB DP families",
    highlight: "Tutor checklist",
  },
  {
    slug: "igcse-physics-maths-combo",
    category: "IGCSE",
    title: "When students should combine IGCSE Physics and Maths tutoring",
    excerpt:
      "Some performance gaps are really coordination problems. This piece covers when a combined tutoring plan creates clarity and when separate subject support works better.",
    dateLabel: "March 29, 2026",
    readTime: "4 min read",
    audience: "For IGCSE families",
    highlight: "Subject planning",
  },
  {
    slug: "school-aware-tutoring-gurugram",
    category: "Parent Guide",
    title: "Why school-aware tutoring matters more in Gurugram than parents think",
    excerpt:
      "Internal assessments, project culture, board interpretation, and school tempo all shape outcomes. Here is how local context changes what a strong tutor should do.",
    dateLabel: "March 22, 2026",
    readTime: "7 min read",
    audience: "For Gurugram parents",
    highlight: "Local context",
  },
  {
    slug: "board-exam-revision-mistakes",
    category: "Exam Prep",
    title: "Five revision mistakes that quietly reduce board-exam scores",
    excerpt:
      "Students often work hard but revise in the wrong order. We break down the patterns that create false confidence and how to reset the last eight weeks properly.",
    dateLabel: "March 15, 2026",
    readTime: "5 min read",
    audience: "For Class 10 and 12",
    highlight: "Revision mistakes",
  },
  {
    slug: "free-demo-class-what-to-observe",
    category: "Tutor Matching",
    title: "What parents should actually observe during a free demo class",
    excerpt:
      "A demo is not about chemistry alone. It should reveal diagnostic skill, communication style, pace control, and whether the tutor can build confidence without creating dependence.",
    dateLabel: "March 8, 2026",
    readTime: "4 min read",
    audience: "For first-time inquiries",
    highlight: "Demo class",
  },
];

export const featuredBlogPost = blogPosts[0];
