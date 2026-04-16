"use client";

import { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompanyHeader } from "@/components/companies/CompanyHeader";
import { JobCard } from "@/components/jobs/JobCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompany } from "@/hooks/useCompanies";
import { useJobs } from "@/hooks/useJobs";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: company, isLoading: companyLoading } = useCompany(Number(id));
  const { data: jobsData, isLoading: jobsLoading } = useJobs({ company: Number(id) });

  if (companyLoading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-10">
          <Skeleton className="h-20 w-20 rounded-2xl mb-4" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </main>
      </>
    );
  }

  if (!company) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <Link href="/companies">
            <Button>Browse Companies</Button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-10">
          <div className="container mx-auto px-4">
            <CompanyHeader company={company} />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">
            Open Positions {jobsData && `(${jobsData.count})`}
          </h2>

          {jobsLoading ? (
            <LoadingSpinner text="Loading jobs..." />
          ) : jobsData?.results?.length ? (
            <div className="grid md:grid-cols-2 gap-4">
              {jobsData.results.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No open positions at this company right now.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
