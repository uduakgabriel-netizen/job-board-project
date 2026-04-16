"use client";

import Link from "next/link";
import { MapPin, Globe, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 rounded-xl">
              <AvatarFallback className="rounded-xl text-lg">
                {company.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              {company.location && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.location}
                </p>
              )}
              {company.website && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Globe className="h-3.5 w-3.5" />
                  {company.website.replace(/^https?:\/\//, "")}
                </p>
              )}
              {company.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {company.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
