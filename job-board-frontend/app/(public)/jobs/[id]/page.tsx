"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useJob } from "@/hooks/useJobs";
import { useAuth } from "@/contexts/AuthContext";
import { formatSalary } from "@/lib/utils";
import {
  MapPin, Building2, Clock, Banknote, Globe, ArrowLeft, Share2, Bookmark,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, isJobSeeker } = useAuth();
  const { data: job, isLoading } = useJob(Number(id));
  const [applyOpen, setApplyOpen] = useState(false);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-10">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-5 w-96 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </main>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">This job listing may have been removed.</p>
          <Link href="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(job.created_at), { addSuffix: true });

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-10">
          <div className="container mx-auto px-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to jobs
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-3">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {job.company_name || "Company"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {timeAgo}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Banknote className="h-4 w-4" />
                    {job.salary ? formatSalary(job.salary) : "Negotiable"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.is_remote && (
                    <Badge variant="outline" className="border-primary/40 text-primary">
                      <Globe className="h-3 w-3 mr-1" />
                      Remote
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-3 shrink-0">
                {isJobSeeker && (
                  <Button size="lg" onClick={() => setApplyOpen(true)} className="px-8">
                    Apply Now
                  </Button>
                )}
                {!isAuthenticated && (
                  <Link href="/login">
                    <Button size="lg" className="px-8">
                      Login to Apply
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">Job Overview</h3>
                  <Separator />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company</span>
                      <span className="font-medium">{job.company_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary</span>
                      <span className="font-medium">{job.salary ? formatSalary(job.salary) : "Negotiable"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remote</span>
                      <span className="font-medium">{job.is_remote ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posted</span>
                      <span className="font-medium">{timeAgo}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Company</h3>
                  <Link href={`/companies/${job.company}`} className="text-primary hover:underline font-medium">
                    {job.company_name || "View Company"}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {isJobSeeker && (
        <ApplyModal
          jobId={job.id}
          jobTitle={job.title}
          open={applyOpen}
          onOpenChange={setApplyOpen}
        />
      )}
    </>
  );
}
