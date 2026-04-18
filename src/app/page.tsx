import { LandingHeader } from '@/features/marketing/components/landing-header';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { FeaturesGrid } from '@/features/marketing/components/features-grid';
import { DashboardShowcase } from '@/features/marketing/components/dashboard-showcase';
import { JournalShowcase } from '@/features/marketing/components/journal-showcase';
import { AcademyShowcase } from '@/features/marketing/components/academy-showcase';
import { StatsBar } from '@/features/marketing/components/stats-bar';
import { CtaSection } from '@/features/marketing/components/cta-section';
import { LandingFooter } from '@/features/marketing/components/landing-footer';

export default function HomePage() {
  return (
    <main id="main-content">
      <LandingHeader />
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <DashboardShowcase />
      <JournalShowcase />
      <AcademyShowcase />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}
