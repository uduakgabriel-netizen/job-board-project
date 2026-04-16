"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesAPI } from "@/lib/api";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface JobFiltersProps {
  filters: {
    category?: string;
    is_remote?: string;
    location?: string;
  };
  onFilterChange: (key: string, value: string | undefined) => void;
  onClearAll: () => void;
}

export function JobFilters({ filters, onFilterChange, onClearAll }: JobFiltersProps) {
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await categoriesAPI.getAll();
      return data;
    },
  });

  const categories = categoriesData?.results || [];
  const activeFilters = Object.entries(filters).filter(([, v]) => v !== undefined);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        <Select
          value={filters.category || ""}
          onValueChange={(v) => onFilterChange("category", v || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Remote Filter */}
        <Select
          value={filters.is_remote || ""}
          onValueChange={(v) => onFilterChange("is_remote", v || undefined)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Work Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Remote Only</SelectItem>
            <SelectItem value="false">On-site Only</SelectItem>
          </SelectContent>
        </Select>

        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(([key, value]) => (
            <Badge key={key} variant="secondary" className="gap-1.5 pl-2.5">
              {key === "is_remote" ? (value === "true" ? "Remote" : "On-site") : `Category: ${value}`}
              <button
                onClick={() => onFilterChange(key, undefined)}
                className="ml-0.5 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
