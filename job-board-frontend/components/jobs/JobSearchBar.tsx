"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchBarProps {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
}

export function JobSearchBar({
  search, location, onSearchChange, onLocationChange, onSubmit,
}: JobSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 bg-card p-2 rounded-xl shadow-lg border border-border">
      <div className="flex-1 flex items-center gap-2 bg-background rounded-lg px-3">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <Input
          placeholder="Job title, keywords, or company"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="flex-1 flex items-center gap-2 bg-background rounded-lg px-3">
        <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
        <Input
          placeholder="City or state"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="border-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <Button onClick={onSubmit} size="lg" className="px-8">
        Search Jobs
      </Button>
    </div>
  );
}
