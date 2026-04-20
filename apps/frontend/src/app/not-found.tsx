import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Search, Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Page Not Found | BoardPeFocus",
  description: "The page you requested could not be found.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center pt-20 pb-32">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <Search className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-6 text-primary">
          Page Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. But don't worry, Gurugram's best board-focused tutors are still just a click away.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <Home className="w-5 h-5 mr-2" /> Return Home
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/20 hover:bg-primary/5 text-primary rounded-xl">
              <Search className="w-5 h-5 mr-2" /> Search Tutors
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-10 border-t border-border/50 text-sm text-muted-foreground">
          Need immediate assistance? <a href="#" className="text-primary hover:underline font-medium inline-flex items-center"><MessageCircle className="w-4 h-4 mr-1"/> Chat with us on WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
