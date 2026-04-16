"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useCompanies } from "@/hooks/useCompanies";
import { Building2 } from "lucide-react";

export default function CompaniesPage() {
  const { data, isLoading } = useCompanies();
  const companies = data?.results || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Companies</h1>
            <p className="text-muted-foreground">
              Explore top employers hiring on JobBoard
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="py-20">
              <LoadingSpinner size="lg" text="Loading companies..." />
            </div>
          ) : companies.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2">No companies yet</h3>
              <p className="text-muted-foreground">Companies will appear here once employers register.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
