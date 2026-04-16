"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postJobSchema, type PostJobFormData } from "@/lib/validations";
import { jobsAPI, categoriesAPI } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateJobPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await categoriesAPI.getAll()).data,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    defaultValues: { is_remote: false },
  });

  const mutation = useMutation({
    mutationFn: (data: PostJobFormData) =>
      jobsAPI.create({
        title: data.title,
        description: data.description,
        location: data.location,
        salary: data.salary ? Number(data.salary) : undefined,
        is_remote: data.is_remote,
        category: data.category,
      }),
    onSuccess: () => {
      toast.success("Job posted! It will be visible once approved.");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      router.push("/employer/dashboard");
    },
    onError: (error: any) => {
      const detail = error.response?.data?.error || error.response?.data?.detail || "Failed to create job";
      toast.error(detail);
    },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Link
            href="/employer/dashboard"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Post a New Job</CardTitle>
              <CardDescription>
                Fill in the details below. Jobs will be live once approved by an admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input id="title" placeholder="e.g. Senior React Developer" {...register("title")} />
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={8}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    {...register("description")}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input id="location" placeholder="e.g. Lagos, Nigeria" {...register("location")} />
                    {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary (₦)</Label>
                    <Input id="salary" type="number" placeholder="e.g. 500000" {...register("salary")} />
                    {errors.salary && <p className="text-sm text-red-500">{errors.salary.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select onValueChange={(v) => setValue("category", Number(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData?.results?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Work Type</Label>
                    <Select
                      onValueChange={(v) => setValue("is_remote", v === "true")}
                      defaultValue="false"
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">On-site</SelectItem>
                        <SelectItem value="true">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" size="lg" disabled={mutation.isPending} className="flex-1">
                    {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Post Job
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
