import Link from "next/link";
import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { AreaCluster, getSectorDetail } from "@/data/areas";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AreaCard({ area }: { area: AreaCluster }) {
  return (
    <Link href={`/gurgaon-area/${area.slug}`} className="block h-full">
      <Card className="h-full rounded-[2rem] border-border/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="flex h-full flex-col p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-primary">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              Gurgaon Corridor
            </Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Premium Locality
            </span>
          </div>

          <h3 className="text-2xl font-bold text-primary">{area.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.shortDescription}</p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Key Sectors</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {area.sectorSlugs.slice(0, 3).map((sectorSlug) => (
                  <Badge key={sectorSlug} variant="outline" className="rounded-full border-border/80 bg-muted/40 px-3 py-1 text-foreground">
                    {getSectorDetail(sectorSlug)?.name ?? sectorSlug}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Premium Societies</p>
              <p className="mt-2 text-sm text-foreground">{area.featuredSocieties.slice(0, 3).join(" • ")}</p>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <GraduationCap className="h-4 w-4 text-accent" />
                Nearby school relevance
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {area.schoolRelevance[0]?.name} and nearby premium school corridors often shape tutor demand here.
              </p>
            </div>
          </div>

          <div className="mt-auto pt-6 text-sm font-semibold text-primary">
            Explore Area <ArrowRight className="ml-1 inline h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
