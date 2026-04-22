const supportedSchoolSlugs = new Set([
  "the-shri-ram-school-aravali",
  "the-shri-ram-school-moulsari",
  "the-heritage-school",
  "pathways-school-gurgaon",
  "pathways-world-school",
  "gd-goenka-world-school",
  "dps-international-gurugram",
  "scottish-high-international-school",
  "lancers-international",
  "shiv-nadar-school",
]);

export function getSchoolHubLink(schoolSlug: string) {
  return supportedSchoolSlugs.has(schoolSlug) ? `/schools/${schoolSlug}` : `/gurugram/schools/${schoolSlug}`;
}
