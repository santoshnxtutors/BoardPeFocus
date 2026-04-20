import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
  href?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  href,
}: StatsCardProps) {
  const content = (
    <Card className={cn("overflow-hidden transition-all hover:border-primary/50 cursor-pointer group", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold group-hover:text-primary transition-colors">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend && (
              <span className={cn("mr-1 font-bold", trend.isUp ? "text-green-600" : "text-red-600")}>
                {trend.value}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
