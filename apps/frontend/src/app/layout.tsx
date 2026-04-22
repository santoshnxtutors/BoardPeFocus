import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScroll } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { StickyCTA } from "@/components/cta/StickyCTA";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/common/whatsapp-float";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-background`}
      >
        <GoogleAnalytics />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Global Floating Actions */}
          <StickyCTA />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
