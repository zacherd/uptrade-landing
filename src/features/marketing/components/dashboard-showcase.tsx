'use client';

import { ScrollReveal } from './scroll-reveal';
import { ParallaxLayer } from './parallax-layer';
import { MockupDashboard } from './mockup-dashboard';
import { MouseTiltCard } from './mouse-tilt-card';
import { useTranslation } from '../i18n/language-context';

export function DashboardShowcase() {
  const { t } = useTranslation();

  return (
    <section id="dashboard" className="relative py-32 px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Text side */}
        <ScrollReveal>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/80">
              {t.dashboard.label}
            </p>
            <h2 className="text-4xl font-extrabold text-foreground">
              {t.dashboard.title}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t.dashboard.description}
            </p>
            <ul className="mt-8 space-y-4">
              {t.dashboard.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-3 w-3 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Mockup side */}
        <ParallaxLayer speed={0.15}>
          <ScrollReveal direction="right" delay={0.2}>
            <MouseTiltCard intensity={0.7} enableGlare>
              <MockupDashboard className="shadow-2xl shadow-black/20" />
            </MouseTiltCard>
          </ScrollReveal>
        </ParallaxLayer>
      </div>
    </section>
  );
}
