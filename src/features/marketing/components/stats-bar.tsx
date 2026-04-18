'use client';

import { ScrollReveal } from './scroll-reveal';

const stats = [
  { value: '2,000+', label: 'Traders' },
  { value: '50,000+', label: 'Trades Logged' },
  { value: '98%', label: 'Uptime' },
  { value: '4.9★', label: 'Rating' },
];

export function StatsBar() {
  return (
    <section aria-label="Social proof statistics" className="relative px-6 pb-8 pt-4">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl">
          <div className="glass-card glass-noise rounded-2xl px-8 py-6">
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="order-2 mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-mono text-3xl font-extrabold tabular-nums text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
