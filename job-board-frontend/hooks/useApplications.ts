"use client";

import { useQuery } from "@tanstack/react-query";
import { applicationsAPI } from "@/lib/api";

export function useApplications(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ["applications", params],
    queryFn: async () => {
      const { data } = await applicationsAPI.getAll(params);
      return data;
    },
  });
}
