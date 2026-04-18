'use client';

import { TrendingUp, BookOpen, Shield } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { useTranslation } from '../i18n/language-context';

const uspIcons = [TrendingUp, BookOpen, Shield];

export function FeaturesGrid() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-20 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/80">
              {t.features.label}
            </p>
            <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl">
              {t.features.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t.features.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Three typographic pillars */}
        <div className="grid lg:grid-cols-3">
          {t.features.items.map((usp, i) => {
            const Icon = uspIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div
                  className={`
                    relative px-8 py-10
                    ${i < 2 ? 'lg:border-r border-border dark:border-white/[0.06]' : ''}
                    ${i > 0 ? 'border-t border-border dark:border-white/[0.06] lg:border-t-0' : ''}
                  `}
                >
                  {/* Watermark number */}
                  <span className="pointer-events-none absolute right-8 top-8 select-none font-mono text-7xl font-extrabold leading-none tabular-nums text-foreground/[0.04]">
                    0{i + 1}
                  </span>

                  {/* Monochromatic icon */}
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>

                  {/* Headline */}
                  <h3 className="mb-3 text-xl font-extrabold text-foreground">
                    {usp.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {usp.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {usp.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
