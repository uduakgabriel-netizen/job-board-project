import Link from "next/link";
import { Briefcase, ExternalLink, Globe, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">
                Job<span className="text-primary">Board</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find your dream job in Nigeria. Connect with top employers and advance your career.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">For Job Seekers</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link href="/companies" className="hover:text-primary transition-colors">Top Companies</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">For Employers</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/register/employer" className="hover:text-primary transition-colors">Post a Job</Link></li>
              <li><Link href="/register/employer" className="hover:text-primary transition-colors">Create Employer Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Mail className="h-4 w-4 text-primary" />
              <span>support@jobboard.com</span>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: "#", label: "Website" },
                { icon: ExternalLink, href: "#", label: "Portfolio" },
                { icon: Mail, href: "mailto:support@jobboard.com", label: "Email" },
              ].map(({ icon: Icon, href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
