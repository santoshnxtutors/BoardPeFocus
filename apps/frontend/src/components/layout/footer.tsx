import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { getBoardPath } from "@/app/boards/_data/boards";
import { getClassHubPath } from "@/app/classes/_data/classes";

const boardLinks = [
  { slug: "cbse", name: "CBSE" },
  { slug: "icse", name: "ICSE" },
  { slug: "isc", name: "ISC" },
  { slug: "igcse", name: "IGCSE" },
  { slug: "ib", name: "IB" },
];

const topLocalityLinks = [
  { href: "/gurugram/sectors/dlf-phase-4", label: "Tutors in DLF Phase 4" },
  { href: "/gurugram/sectors/dlf-phase-5", label: "Tutors in DLF Phase 5" },
  { href: "/gurugram/sectors/sector-53", label: "Tutors in Sector 53" },
  { href: "/gurugram/sectors/sector-54", label: "Tutors in Sector 54" },
  { href: "/gurugram/sectors/sector-57", label: "Tutors in Sector 57" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-6 sm:py-8 border-t border-border/10">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mb-4">
          
          {/* Brand & Contact */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading font-bold text-2xl tracking-tight">
                BoardPe<span className="text-accent">Focus</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Gurugram's most trusted academic advisory firm for Class 10 & 12 board-specific home tutors.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>1st Floor, 497 Housing Board Colony, Sector 51, Gurgaon, Haryana</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+91 87963 67754</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>boardpefocus@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Boards */}
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white">Board Curricula</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              {boardLinks.map((board) => (
                <li key={board.slug}>
                  <Link href={getBoardPath(board.slug)} className="hover:text-accent transition-colors">
                    {board.name} Tutors
                  </Link>
                </li>
              ))}
              <li>
                <Link href={getClassHubPath("class-10")} className="hover:text-accent transition-colors">
                  Class 10 Hub
                </Link>
              </li>
              <li>
                <Link href={getClassHubPath("class-12")} className="hover:text-accent transition-colors">
                  Class 12 Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Localities */}
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white">Top Localities</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              {topLocalityLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/gurgaon-area" className="hover:text-accent transition-colors text-white font-medium">View All &rarr;</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white">Company</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-accent transition-colors">Resources</Link></li>
              <li><Link href="/result" className="hover:text-accent transition-colors">Results</Link></li>
              <li><Link href="/process" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="/faqs" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="/support" className="hover:text-accent transition-colors">Support</Link></li>
              <li><Link href="/site-map" className="hover:text-accent transition-colors">HTML Sitemap</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-primary-foreground/40 font-bold">
          <p>© {currentYear} BoardPeFocus. Gurugram only.</p>
          <p>Designed for academic excellence.</p>
        </div>
      </div>
    </footer>
  );
}
