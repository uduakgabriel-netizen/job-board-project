"use client";

import { useQuery } from "@tanstack/react-query";
import { jobsAPI } from "@/lib/api";

export function useJobs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: async () => {
      const { data } = await jobsAPI.getAll(params);
      return data;
    },
  });
}

export function useJob(id: number) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await jobsAPI.getById(id);
      return data;
    },
    enabled: !!id,
  });
}
