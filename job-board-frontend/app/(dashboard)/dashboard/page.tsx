"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications } from "@/hooks/useApplications";
import { Briefcase, FileText, CheckCircle, Clock, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useApplications();

  const applications = data?.results || [];
  const pending = applications.filter((a) => a.status === "pending").length;
  const reviewed = applications.filter((a) => a.status === "reviewed").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;

  const stats = [
    { label: "Total Applications", value: applications.length, icon: FileText, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/50" },
    { label: "Pending", value: pending, icon: Clock, color: "text-amber-500 bg-amber-100 dark:bg-amber-900/50" },
    { label: "Reviewed", value: reviewed, icon: Briefcase, color: "text-purple-500 bg-purple-100 dark:bg-purple-900/50" },
    { label: "Accepted", value: accepted, icon: CheckCircle, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">
              Welcome back, <span className="text-primary">{user?.username}</span>
            </h1>
            <p className="text-muted-foreground">Here&apos;s an overview of your job search activity</p>
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
                        <p className="text-2xl font-bold">{isLoading ? "—" : stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recent Applications</CardTitle>
              <Link href="/applications">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <LoadingSpinner text="Loading..." />
              ) : applications.length ? (
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{app.job_title}</p>
                        <p className="text-sm text-muted-foreground">
                          Applied {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No applications yet.</p>
                  <Link href="/jobs">
                    <Button variant="link">Browse Jobs</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
