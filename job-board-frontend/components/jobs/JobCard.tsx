"use client";

import Link from "next/link";
import { MapPin, Clock, Building2, Banknote } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { formatSalary, formatJobType } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

const jobTypeColors: Record<string, string> = {
  full_time: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  part_time: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  contract: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  internship: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
};

export function JobCard({ job }: JobCardProps) {
  const timeAgo = formatDistanceToNow(new Date(job.created_at), { addSuffix: true });

  return (
    <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <Link href={`/jobs/${job.id}`}>
              <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1 cursor-pointer">
                {job.title}
              </h3>
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-muted-foreground">
              <span className="flex items-center gap-1 text-sm">
                <Building2 className="h-3.5 w-3.5" />
                {job.company_name || "Company"}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Clock className="h-3.5 w-3.5" />
                {timeAgo}
              </span>
            </div>
          </div>
          {job.is_remote && (
            <Badge variant="outline" className="shrink-0 border-primary/40 text-primary">
              Remote
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <Banknote className="h-3.5 w-3.5" />
            {job.salary ? formatSalary(job.salary) : "Negotiable"}
          </span>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
