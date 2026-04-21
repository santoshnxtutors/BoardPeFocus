import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { blogPosts } from "@/data/blogs";
import { BlogCard } from "@/components/cards/BlogCard";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewMore?: boolean;
}

export function BlogSection({
  title = "Insights for board-focused families",
  subtitle = "Editorial guidance for Gurugram parents navigating tutor selection, exam prep, and board-specific decision-making.",
  limit = 3,
  showViewMore = true,
}: BlogSectionProps) {
  const posts = blogPosts.slice(0, limit);

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">{title}</h2>
              <p className="text-muted-foreground text-lg max-w-3xl">{subtitle}</p>
            </div>
            {showViewMore && (
              <Link href="/blog">
                <Button variant="link" className="text-primary hover:text-primary/80 px-0 mt-4 md:mt-0 text-lg group font-bold">
                  View all blogs
                  <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
