"use client";

import { useQuery } from "@tanstack/react-query";
import { companiesAPI } from "@/lib/api";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await companiesAPI.getAll();
      return data;
    },
  });
}

export function useCompany(id: number) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const { data } = await companiesAPI.getById(id);
      return data;
    },
    enabled: !!id,
  });
}
