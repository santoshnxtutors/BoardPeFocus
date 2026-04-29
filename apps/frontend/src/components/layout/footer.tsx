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
    <footer className="border-t border-border/10 bg-primary py-6 text-primary-foreground sm:py-8">
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="mb-4 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          <h2 className="sr-only">Footer links</h2>

          <div className="col-span-2 space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight">
                BoardPe<span className="text-accent">Focus</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Gurugram&apos;s most trusted academic advisory firm for Class 10 &
              12 board-specific home tutors.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                <span>
                  1st Floor, 497 Housing Board Colony, Sector 51, Gurgaon,
                  Haryana
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <Link
                  href="tel:+918796367754"
                  className="transition-colors hover:text-accent"
                >
                  +91 87963 67754
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <Link
                  href="mailto:boardpefocus@gmail.com"
                  className="transition-colors hover:text-accent"
                >
                  boardpefocus@gmail.com
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              Board Curricula
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              {boardLinks.map((board) => (
                <li key={board.slug}>
                  <Link
                    href={getBoardPath(board.slug)}
                    className="transition-colors hover:text-accent"
                  >
                    {board.name} Tutors
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={getClassHubPath("class-10")}
                  className="transition-colors hover:text-accent"
                >
                  Class 10 Hub
                </Link>
              </li>
              <li>
                <Link
                  href={getClassHubPath("class-12")}
                  className="transition-colors hover:text-accent"
                >
                  Class 12 Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              Top Localities
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              {topLocalityLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/gurgaon-area"
                  className="font-medium text-white transition-colors hover:text-accent"
                >
                  View All &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold text-white">Company</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="transition-colors hover:text-accent">About Us</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-accent">Blog</Link></li>
              <li><Link href="/resources" className="transition-colors hover:text-accent">Resources</Link></li>
              <li><Link href="/result" className="transition-colors hover:text-accent">Results</Link></li>
              <li><Link href="/process" className="transition-colors hover:text-accent">How It Works</Link></li>
              <li><Link href="/faqs" className="transition-colors hover:text-accent">FAQs</Link></li>
              <li><Link href="/support" className="transition-colors hover:text-accent">Support</Link></li>
              <li><Link href="/privacy-policy" className="transition-colors hover:text-accent">Privacy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-accent">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-4 text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60 md:flex-row">
          <p>© {currentYear} BoardPeFocus. Gurugram only.</p>
          <p>Designed for academic excellence.</p>
        </div>
      </div>
    </footer>
  );
}
