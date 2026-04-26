import { SearchPageClient } from "@/components/pages/SearchPageClient";
import { constructMetadata } from "@/lib/seo";
import { getPublicTutorCards } from "@/lib/tutors";

export const metadata = constructMetadata({
  title: "Tutor Search | BoardPeFocus",
  description: "Search BoardPeFocus tutor profiles by board and subject to find the right Gurugram home tutor.",
  pathname: "/search",
  noIndex: true,
});

export default async function SearchPage() {
  const tutors = await getPublicTutorCards();

  return <SearchPageClient tutors={tutors} />;
}
