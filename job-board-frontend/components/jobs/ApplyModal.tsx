"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsAPI } from "@/lib/api";
import { applySchema, type ApplyFormData } from "@/lib/validations";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

interface ApplyModalProps {
  jobId: number;
  jobTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplyModal({ jobId, jobTitle, open, onOpenChange }: ApplyModalProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: { job: jobId, cover_letter: "" },
  });

  const mutation = useMutation({
    mutationFn: async (formData: ApplyFormData) => {
      const fd = new FormData();
      fd.append("job", String(formData.job));
      fd.append("cover_letter", formData.cover_letter);
      if (resumeFile) fd.append("resume", resumeFile);
      return applicationsAPI.create(fd);
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      reset();
      setResumeFile(null);
      onOpenChange(false);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.detail || error.response?.data?.non_field_errors?.[0] || "Failed to submit application";
      toast.error(msg);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>Submit your application with a cover letter and optional resume.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="cover_letter">Cover Letter</Label>
            <Textarea
              id="cover_letter"
              rows={6}
              placeholder="Tell the employer why you're the right fit for this role..."
              {...register("cover_letter")}
            />
            {errors.cover_letter && (
              <p className="text-sm text-red-500">{errors.cover_letter.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Resume (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <span className="text-sm text-primary font-medium">Click to upload</span>
                <span className="text-sm text-muted-foreground"> or drag and drop</span>
              </label>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 10MB</p>
              {resumeFile && (
                <p className="text-sm text-primary mt-2 font-medium">{resumeFile.name}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
