import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClassesCtaBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-[2.5rem] border border-border/60 bg-primary px-6 py-10 text-white shadow-[0_30px_80px_rgba(21,48,96,0.16)] md:px-10 md:py-12">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] xl:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/60">CTA</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">{description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          <Link
            href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20with%20Class%2010%20or%20Class%2012%20board%20tutoring%20in%20Gurgaon."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="h-12 w-full justify-center rounded-xl bg-white px-4 text-primary hover:bg-white/90">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </Link>
          <Link href="/contact" className="block w-full">
            <Button
              variant="outline"
              className="h-12 w-full justify-center rounded-xl border-white/20 bg-white/10 px-4 text-white hover:bg-white/15 hover:text-white"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Callback
            </Button>
          </Link>
          <Link href="/search" className="block w-full sm:col-span-2 2xl:col-span-1">
            <Button
              variant="outline"
              className="h-12 w-full justify-center rounded-xl border-white/20 bg-white/10 px-4 text-white hover:bg-white/15 hover:text-white"
            >
              Get Matched
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
