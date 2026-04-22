import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { mockSectors } from "@/data/mock";

const boardLinks = [
  { slug: "cbse", name: "CBSE" },
  { slug: "icse", name: "ICSE" },
  { slug: "isc", name: "ISC" },
  { slug: "igcse", name: "IGCSE" },
  { slug: "ib", name: "IB" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-6 border-t border-border/10">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
          
          {/* Brand & Contact */}
          <div className="space-y-4">
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
                <span>Sector 44, Gurugram</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+91 95827 06764</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>hello@boardpefocus.com</span>
              </div>
            </div>
          </div>

          {/* Boards */}
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white">Board Curricula</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              {boardLinks.map((board) => (
                <li key={board.slug}>
                  <Link href={`/boards/${board.slug}`} className="hover:text-accent transition-colors">
                    {board.name} Tutors
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/classes/class-10" className="hover:text-accent transition-colors">
                  Class 10 Hub
                </Link>
              </li>
              <li>
                <Link href="/classes/class-12" className="hover:text-accent transition-colors">
                  Class 12 Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Localities */}
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white">Top Localities</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              {mockSectors.slice(0, 5).map((sector) => (
                <li key={sector.slug}>
                  <Link href={`/gurugram/sectors/${sector.slug}`} className="hover:text-accent transition-colors">
                    Tutors in {sector.name}
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
              <li><Link href="/contact" className="hover:text-accent transition-colors">Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-primary-foreground/40 font-bold">
          <p>© {new Date().getFullYear()} BoardPeFocus. Gurugram only.</p>
          <p>Designed for academic excellence.</p>
        </div>
      </div>
    </footer>
  );
}
