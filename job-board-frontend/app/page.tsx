"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, MapPin, Briefcase, Building2, Users, TrendingUp, ArrowRight, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobCard } from "@/components/jobs/JobCard";
import { useJobs } from "@/hooks/useJobs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const { data, isLoading } = useJobs({ page_size: 6 });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const stats = [
    { label: "Active Jobs", value: "2,500+", icon: Briefcase, color: "text-primary" },
    { label: "Companies", value: "300+", icon: Building2, color: "text-blue-500" },
    { label: "Job Seekers", value: "10,000+", icon: Users, color: "text-purple-500" },
    { label: "Placements", value: "1,200+", icon: TrendingUp, color: "text-orange-500" },
  ];

  const categories = [
    { name: "Technology", emoji: "💻", bg: "bg-blue-50 dark:bg-blue-950/50" },
    { name: "Finance", emoji: "💰", bg: "bg-emerald-50 dark:bg-emerald-950/50" },
    { name: "Healthcare", emoji: "🏥", bg: "bg-red-50 dark:bg-red-950/50" },
    { name: "Education", emoji: "📚", bg: "bg-amber-50 dark:bg-amber-950/50" },
    { name: "Marketing", emoji: "📢", bg: "bg-pink-50 dark:bg-pink-950/50" },
    { name: "Sales", emoji: "📈", bg: "bg-purple-50 dark:bg-purple-950/50" },
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                Nigeria&apos;s #1 Job Board
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                Find Your{" "}
                <span className="text-primary relative">
                  Dream Job
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 100 2 150 4C200 6 250 3 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                  </svg>
                </span>
                <br />
                in Nigeria
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals finding exciting opportunities.
                Connect with top employers and take the next step in your career.
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-3 bg-card p-2.5 rounded-2xl shadow-xl border border-border">
                  <div className="flex-1 flex items-center gap-2 bg-background rounded-xl px-4">
                    <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                    <Input
                      placeholder="Job title or keyword"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="border-0 shadow-none focus-visible:ring-0 text-base"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-background rounded-xl px-4">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                    <Input
                      placeholder="City or state"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="border-0 shadow-none focus-visible:ring-0 text-base"
                    />
                  </div>
                  <Button onClick={handleSearch} size="lg" className="px-8 rounded-xl text-base">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────── */}
        <section className="border-y border-border bg-card/50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3 justify-center">
                    <div className={`p-2.5 rounded-xl bg-muted`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Categories ───────────────────────────────────── */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
            <p className="text-muted-foreground">Explore opportunities across various industries</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/jobs?search=${cat.name}`}>
                <Card className="hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-5 text-center">
                    <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                      {cat.emoji}
                    </span>
                    <p className="font-medium text-sm">{cat.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Latest Jobs ──────────────────────────────────── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Job Openings</h2>
                <p className="text-muted-foreground">Fresh opportunities posted recently</p>
              </div>
              <Link href="/jobs">
                <Button variant="outline" className="gap-2">
                  View All Jobs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-52 rounded-xl" />
                ))}
              </div>
            ) : data?.results?.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.results.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No jobs posted yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-10 md:p-16 text-white text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
                Create your free account today and start exploring thousands of opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 text-base">
                    Get Started — It&apos;s Free
                  </Button>
                </Link>
                <Link href="/register/employer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 text-base">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
