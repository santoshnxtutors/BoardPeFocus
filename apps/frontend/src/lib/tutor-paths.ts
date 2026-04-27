export function getTutorPath(tutorSlug: string) {
  return `/tutors/${tutorSlug}/home-tutors`;
}

export function getLegacyTutorPath(tutorSlug: string) {
  return `/tutors/${tutorSlug}`;
}
