"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobCard } from "@/components/jobs/JobCard";
import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { JobFilters } from "@/components/jobs/JobFilters";
import { Pagination } from "@/components/common/Pagination";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useJobs } from "@/hooks/useJobs";
import { Briefcase } from "lucide-react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string | undefined>>({
    category: searchParams.get("category") || undefined,
    is_remote: searchParams.get("is_remote") || undefined,
  });

  const queryParams: Record<string, string | number | boolean | undefined> = {
    page,
    search: search || undefined,
    location: location || undefined,
    ...filters,
  };

  const { data, isLoading } = useJobs(queryParams);
  const totalPages = data ? Math.ceil(data.count / 20) : 1;

  const handleSearch = () => {
    setPage(1);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Find Jobs</h1>
            <p className="text-muted-foreground mb-6">
              {data ? `${data.count} jobs found` : "Search thousands of opportunities"}
            </p>
            <JobSearchBar
              search={search}
              location={location}
              onSearchChange={setSearch}
              onLocationChange={setLocation}
              onSubmit={handleSearch}
            />
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 py-8">
          <JobFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={() => setFilters({})}
          />

          {isLoading ? (
            <div className="py-20">
              <LoadingSpinner size="lg" text="Loading jobs..." />
            </div>
          ) : data?.results?.length ? (
            <>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {data.results.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
