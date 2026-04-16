"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, FileText, Building2, User, PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { isEmployer } = useAuth();

  const seekerLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/applications", label: "My Applications", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const employerLinks = [
    { href: "/employer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/jobs/create", label: "Post Job", icon: PlusCircle },
    { href: "/employer/applications", label: "Applications", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const links = isEmployer ? employerLinks : seekerLinks;

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
