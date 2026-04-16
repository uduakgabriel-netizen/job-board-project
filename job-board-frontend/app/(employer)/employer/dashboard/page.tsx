"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplications";
import {
  Briefcase, FileText, PlusCircle, TrendingUp, Users, ArrowRight,
  Eye, Pencil,
} from "lucide-react";

export default function EmployerDashboardPage() {
  const { user } = useAuth();
  const { data: jobsData, isLoading: jobsLoading } = useJobs({});
  const { data: appsData, isLoading: appsLoading } = useApplications();

  const jobs = jobsData?.results || [];
  const applications = appsData?.results || [];

  const stats = [
    { label: "Posted Jobs", value: jobs.length, icon: Briefcase, color: "text-primary bg-primary-light dark:bg-primary/20" },
    { label: "Applications", value: applications.length, icon: FileText, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/50" },
    { label: "Pending Review", value: applications.filter((a) => a.status === "pending").length, icon: Users, color: "text-amber-500 bg-amber-100 dark:bg-amber-900/50" },
    { label: "Accepted", value: applications.filter((a) => a.status === "accepted").length, icon: TrendingUp, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Employer Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, <span className="text-primary font-medium">{user?.username}</span>
              </p>
            </div>
            <Link href="/jobs/create">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Post New Job
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${stat.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {(jobsLoading || appsLoading) ? "—" : stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Your Jobs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Your Job Listings</CardTitle>
              </CardHeader>
              <CardContent>
                {jobsLoading ? (
                  <LoadingSpinner />
                ) : jobs.length ? (
                  <div className="space-y-3">
                    {jobs.slice(0, 5).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.location}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {job.is_live ? (
                            <Badge variant="success">Live</Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No jobs posted yet</p>
                    <Link href="/jobs/create">
                      <Button variant="link" size="sm">Post your first job</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {appsLoading ? (
                  <LoadingSpinner />
                ) : applications.length ? (
                  <div className="space-y-3">
                    {applications.slice(0, 5).map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{app.applicant}</p>
                          <p className="text-sm text-muted-foreground">{app.job_title}</p>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No applications received yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
