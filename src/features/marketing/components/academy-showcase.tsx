'use client';

import { ScrollReveal } from './scroll-reveal';
import { useTranslation } from '../i18n/language-context';
import { AcademyTimeline } from './academy-timeline';

export function AcademyShowcase() {
  const { t } = useTranslation();

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/80">
              {t.academy.label}
            </p>
            <h2 className="text-4xl font-extrabold text-foreground">
              {t.academy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t.academy.description}
            </p>
          </div>
        </ScrollReveal>

        <AcademyTimeline />
      </div>
    </section>
  );
}
