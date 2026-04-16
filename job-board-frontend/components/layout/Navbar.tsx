"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase, Building2, LogOut, Settings, LayoutDashboard,
  Menu, X, PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isEmployer, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/companies", label: "Companies", icon: Building2 },
  ];

  const getDashboardLink = () => (isEmployer ? "/employer/dashboard" : "/dashboard");
  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-transform group-hover:scale-105">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Job<span className="text-primary">Board</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-1.5"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              {isEmployer && (
                <Link href="/jobs/create" className="hidden md:inline-flex">
                  <Button size="sm" className="gap-1.5">
                    <PlusCircle className="h-4 w-4" />
                    Post Job
                  </Button>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.username}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace("_", " ")}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
          {isEmployer && (
            <Link href="/jobs/create" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gap-2 mt-2">
                <PlusCircle className="h-4 w-4" />
                Post a Job
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
