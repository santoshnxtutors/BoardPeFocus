import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms of Service | BoardPeFocus",
});

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold text-primary mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg text-muted-foreground">
          <p className="mb-6">Last updated: April 2026</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">By accessing our website and utilizing our academic advisory and tutor matching services, you agree to be bound by these Terms of Service.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Service Description</h2>
          <p className="mb-4">BoardPeFocus provides a premium matching service connecting parents and students in Gurugram with highly vetted, board-specialized home tutors. We act as an advisory and matching platform.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. No Guaranteed Outcomes</h2>
          <p className="mb-4">While we exclusively onboard top-tier educators and aim to help students target 95%+ percentiles, BoardPeFocus does not guarantee specific scores, grades, or admission results. Academic performance depends on multiple factors including the student's effort and baseline capability.</p>
        </div>
      </div>
    </div>
  );
}
