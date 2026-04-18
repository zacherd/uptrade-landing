'use client';

import Link from 'next/link';
import { ScrollReveal } from './scroll-reveal';
import { useTranslation } from '../i18n/language-context';

const tierPrices = ['$0', '$29', '$79'];
const tierHighlighted = [false, true, false];
const tierHrefs = ['/register', '/register?plan=pro', '/register?plan=premium'];

export function PricingSection() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/80">
              {t.pricing.label}
            </p>
            <h2 className="text-4xl font-extrabold text-foreground">
              {t.pricing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t.pricing.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {t.pricing.tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`glass-card glass-noise relative flex flex-col rounded-2xl p-6 ${
                  tierHighlighted[i]
                    ? 'glass-pricing-highlight ring-2 ring-primary scale-[1.02]'
                    : ''
                }`}
              >
                {tierHighlighted[i] && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                    {t.pricing.mostPopular}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="font-mono text-4xl font-extrabold text-foreground">
                    {tierPrices[i]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tierHrefs[i]}
                  className={`block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    tierHighlighted[i]
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90'
                      : 'glass-button text-foreground'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
