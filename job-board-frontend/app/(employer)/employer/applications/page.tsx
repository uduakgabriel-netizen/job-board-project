"use client";

import { use } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplications } from "@/hooks/useApplications";
import { applicationsAPI } from "@/lib/api";
import type { ApplicationStatus } from "@/types";
import { toast } from "sonner";
import { ArrowLeft, FileText, User, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EmployerApplicationsPage() {
  const { data, isLoading } = useApplications();
  const queryClient = useQueryClient();
  const applications = data?.results || [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      applicationsAPI.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Application status updated");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("Failed to update status"),
  });

  const statusActions: { label: string; value: ApplicationStatus; color: string }[] = [
    { label: "Mark Reviewed", value: "reviewed", color: "" },
    { label: "Accept", value: "accepted", color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    { label: "Reject", value: "rejected", color: "bg-red-500 hover:bg-red-600 text-white" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/employer/dashboard"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold mb-2">Manage Applications</h1>
          <p className="text-muted-foreground mb-8">Review and manage applications for your job listings</p>

          {isLoading ? (
            <div className="py-20"><LoadingSpinner size="lg" text="Loading applications..." /></div>
          ) : applications.length ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">{app.applicant}</p>
                            <p className="text-sm text-muted-foreground">Applied for: {app.job_title}</p>
                          </div>
                        </div>

                        {app.cover_letter && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground font-medium mb-1">Cover Letter:</p>
                            <p className="text-sm line-clamp-3">{app.cover_letter}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(app.applied_at).toLocaleDateString()}
                          </span>
                          {app.resume && (
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              View Resume
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <StatusBadge status={app.status} />
                        <div className="flex gap-2">
                          {statusActions.map((action) => (
                            <Button
                              key={action.value}
                              size="sm"
                              variant={action.color ? "default" : "outline"}
                              className={action.color}
                              disabled={app.status === action.value || statusMutation.isPending}
                              onClick={() =>
                                statusMutation.mutate({ id: app.id, status: action.value })
                              }
                            >
                              {statusMutation.isPending && statusMutation.variables?.id === app.id &&
                                statusMutation.variables?.status === action.value && (
                                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                )}
                              {action.label}
                            </Button>
                          ))}
                        </div>
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
              <p className="text-muted-foreground">Applications will appear here once candidates apply to your jobs</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
