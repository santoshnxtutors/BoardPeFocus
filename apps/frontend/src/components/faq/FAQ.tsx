import { ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  showViewMore?: boolean;
  viewMoreHref?: string;
  columns?: 1 | 2;
}

export function FAQ({ 
  items, 
  title = "Frequently asked questions", 
  subtitle,
  showViewMore = false,
  viewMoreHref = "/faqs",
  columns = 1
}: FAQProps) {
  const hasHeader = Boolean(title || subtitle || showViewMore);

  return (
    <div className={cn("w-full mx-auto py-16", columns === 2 ? "max-w-[1400px]" : "max-w-4xl")}>
      {hasHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            {title && (
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-lg md:text-xl font-medium">
                {subtitle}
              </p>
            )}
          </div>
          
          {showViewMore && (
            <ButtonLink
              href={viewMoreHref}
              variant="link"
              className="mt-4 px-0 text-lg font-bold text-primary hover:text-primary/80 md:mt-0"
            >
              View more FAQs
              <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover/button:translate-x-1" />
            </ButtonLink>
          )}
        </div>
      )}
      
      <Accordion 
        className={cn(
          "w-full gap-6",
          columns === 2 ? "grid grid-cols-1 lg:grid-cols-2" : "flex flex-col space-y-4"
        )}
      >
        {items.map((item, index) => (
          <AccordionItem 
            key={item.question} 
            value={`item-${index}`}
            className="border border-border/40 rounded-3xl px-8 py-2 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden h-fit"
          >
            <AccordionTrigger className="text-left font-bold text-lg md:text-xl py-6 hover:no-underline text-primary transition-colors flex justify-between items-center group">
              <span className="flex-1 pr-4">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed border-t border-border/50 pt-6 mt-2">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
