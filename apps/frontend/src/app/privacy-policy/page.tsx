import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy | BoardPeFocus",
  description: "Our privacy policy explains how we collect, use, and protect your data.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold text-primary mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-muted-foreground">
          <p className="mb-6">Last updated: April 2026</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us when you fill out our contact forms, request a demo, or communicate with us via WhatsApp. This includes your name, phone number, email address, your child's educational details, and Gurugram sector location.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Match you with the most appropriate board-specialized tutor.</li>
            <li>Communicate with you regarding your inquiry.</li>
            <li>Improve our services and website functionality.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">We implement enterprise-grade security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information without your consent.</p>
        </div>
      </div>
    </div>
  );
}
