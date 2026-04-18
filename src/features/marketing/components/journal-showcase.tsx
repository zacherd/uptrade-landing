'use client';

import { ScrollReveal } from './scroll-reveal';
import { MockupTradeRow } from './mockup-elements';
import { useTranslation } from '../i18n/language-context';

const trades = [
  { symbol: 'AAPL', side: 'long' as const, pnl: '+$342', date: 'Jan 15' },
  { symbol: 'TSLA', side: 'short' as const, pnl: '-$128', date: 'Jan 15' },
  { symbol: 'NVDA', side: 'long' as const, pnl: '+$567', date: 'Jan 14' },
  { symbol: 'SPY', side: 'long' as const, pnl: '+$89', date: 'Jan 14' },
  { symbol: 'META', side: 'short' as const, pnl: '+$215', date: 'Jan 13' },
];

export function JournalShowcase() {
  const { t } = useTranslation();

  return (
    <section id="journal" className="relative py-32 px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Mockup side */}
        <div className="order-2 lg:order-1">
          <div className="glass-card glass-noise overflow-hidden rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                {t.journal.recentTrades}
              </p>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                {t.journal.tradesCount}
              </span>
            </div>
            <div className="space-y-2">
              {trades.map((trade, i) => (
                <ScrollReveal key={i} direction="right" delay={i * 0.1}>
                  <MockupTradeRow {...trade} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/80">
              {t.journal.label}
            </p>
            <h2 className="text-4xl font-extrabold text-foreground">
              {t.journal.title}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t.journal.description}
            </p>
            <ul className="mt-8 space-y-4">
              {t.journal.bullets.map((item) => (
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
