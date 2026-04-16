"use client";

import { MapPin, Globe, Building2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Company } from "@/types";

interface CompanyHeaderProps {
  company: Company;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
      <Avatar className="h-20 w-20 rounded-2xl">
        <AvatarFallback className="rounded-2xl text-2xl">
          {company.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
          {company.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {company.location}
            </span>
          )}
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
        </div>
        {company.description && (
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            {company.description}
          </p>
        )}
      </div>
    </div>
  );
}
