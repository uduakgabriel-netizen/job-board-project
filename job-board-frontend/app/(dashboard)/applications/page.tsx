"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useApplications } from "@/hooks/useApplications";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  const { data, isLoading } = useApplications();
  const applications = data?.results || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground mb-8">Track the status of all your job applications</p>

          {isLoading ? (
            <div className="py-20">
              <LoadingSpinner size="lg" text="Loading applications..." />
            </div>
          ) : applications.length ? (
            <div className="space-y-3">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <Link href={`/jobs/${app.job}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                            {app.job_title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                          <span>Applied {new Date(app.applied_at).toLocaleDateString()}</span>
                          {app.updated_at !== app.applied_at && (
                            <span>Updated {new Date(app.updated_at).toLocaleDateString()}</span>
                          )}
                        </div>
                        {app.cover_letter && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {app.cover_letter}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={app.status} />
                        {app.resume && (
                          <a
                            href={app.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Resume
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
              <p className="text-muted-foreground mb-4">Start applying to jobs to track them here</p>
              <Link href="/jobs">
                <Button>Browse Jobs</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
