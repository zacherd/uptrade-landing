'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from './scroll-reveal';
import { useTranslation } from '../i18n/language-context';
import { joinWaitlistAction } from '../actions/waitlist.actions';

export function CtaSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, formAction, isPending] = useActionState(joinWaitlistAction, null);

  const errorMessage =
    state?.success === false
      ? state.error === 'duplicate'
        ? t.cta.errorDuplicate
        : state.error === 'invalid_email'
          ? t.cta.errorInvalid
          : t.cta.errorGeneric
      : null;

  return (
    <section id="waitlist" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
          style={{
            background: 'oklch(0.72 0.18 55 / 0.4)',
            animation: 'ambient-drift 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full opacity-15 blur-[80px]"
          style={{
            background: 'oklch(0.72 0.18 55 / 0.3)',
            animation: 'ambient-drift 22s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl">
            {t.cta.title1}
            <br />
            {t.cta.title2}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            {t.cta.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {state?.success ? (
            <div className="mx-auto mt-10 max-w-md rounded-xl border border-primary/30 bg-primary/10 px-5 py-4 text-sm font-medium text-primary">
              {t.cta.success}
            </div>
          ) : (
            <form action={formAction} className="mx-auto mt-10 max-w-md">
              {/* Email + submit row */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.cta.placeholder}
                  required
                  className="glass-input flex-1 rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <input type="hidden" name="consent" value={consent ? 'true' : 'false'} />
                <button
                  type="submit"
                  disabled={isPending}
                  className="relative overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(110deg, transparent 25%, oklch(1 0 0 / 0.15) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                    animation: isPending ? 'none' : 'shine-sweep 3s ease-in-out infinite',
                  }}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t.cta.button}
                    </span>
                  ) : (
                    t.cta.button
                  )}
                </button>
              </div>

              {/* Consent checkbox row */}
              <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  {t.cta.consentText}{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    {t.cta.consentPrivacy}
                  </Link>
                </span>
              </label>

              {/* Error banner */}
              {errorMessage && (
                <p className="mt-3 text-xs text-destructive">{errorMessage}</p>
              )}
            </form>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-3">
            {/* Avatar stack (decorative) */}
            <div className="flex -space-x-2" aria-hidden="true">
              {[
                'oklch(0.72 0.18 55)',
                'oklch(0.7 0.18 145)',
                'oklch(0.65 0.15 250)',
                'oklch(0.627 0.265 303.9)',
              ].map((color, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-background"
                  style={{ background: color }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {t.cta.socialProofJoin}{' '}
              <span className="font-bold text-foreground">2,000+</span>{' '}
              {t.cta.socialProof} {t.cta.socialProofEnd}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
