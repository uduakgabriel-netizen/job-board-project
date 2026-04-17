import { Navbar } from '../../components/feature/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { CategoryGrid } from './components/CategoryGrid';
import { LatestJobs } from './components/LatestJobs';
import { CTASection } from './components/CTASection';
import { Footer } from '../../components/feature/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isAuthenticated={false} />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <CategoryGrid />
        <LatestJobs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
