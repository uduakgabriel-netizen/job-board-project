import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/types";

const statusConfig: Record<ApplicationStatus, { label: string; variant: "success" | "warning" | "error" | "secondary" }> = {
  pending: { label: "Pending", variant: "warning" },
  reviewed: { label: "Reviewed", variant: "secondary" },
  accepted: { label: "Accepted", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "secondary" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
