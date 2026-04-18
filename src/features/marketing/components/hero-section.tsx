'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ParallaxLayer } from './parallax-layer';
import { MockupDashboard } from './mockup-dashboard';
import { MouseTiltCard } from './mouse-tilt-card';
import { ScrollPathSVG } from './scroll-path-svg';
import { useTranslation } from '../i18n/language-context';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* SVG scroll path background */}
      <ScrollPathSVG containerRef={sectionRef} />

      {/* Dot grid background */}
      <div className="hero-grid absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] bg-clip-text text-transparent">
            {t.hero.headline1}
          </span>
          <br />
          <span className="text-foreground">{t.hero.headline2}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#waitlist"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            {t.hero.ctaPrimary}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="#features"
            className="glass-button inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-foreground"
          >
            {t.hero.ctaSecondary}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Floating dashboard mockup with 3D tilt */}
      <ParallaxLayer speed={0.3} className="relative z-10 mt-16 w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          <MouseTiltCard intensity={0.15} maxRotation={4} enableGlare>
            <MockupDashboard />
          </MouseTiltCard>

          {/* Floating accent elements for depth */}
          <MouseTiltCard
            intensity={0.9}
            maxRotation={20}
            className="absolute -left-8 top-1/4 z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card glass-noise rounded-xl p-3 shadow-lg shadow-black/10"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l5 5L20 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">{t.hero.winRate}</p>
                  <p className="font-mono text-sm font-bold text-foreground">68.4%</p>
                </div>
              </div>
            </motion.div>
          </MouseTiltCard>

          <MouseTiltCard
            intensity={1.1}
            maxRotation={18}
            className="absolute -right-6 top-1/3 z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="glass-card glass-noise rounded-xl p-3 shadow-lg shadow-black/10"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">{t.hero.todayPnl}</p>
                  <p className="font-mono text-sm font-bold text-green-400">+$1,240</p>
                </div>
              </div>
            </motion.div>
          </MouseTiltCard>

          <MouseTiltCard
            intensity={0.8}
            maxRotation={22}
            className="absolute -bottom-2 left-1/4 z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="glass-card glass-noise rounded-xl p-3 shadow-lg shadow-black/10"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">{t.hero.trades}</p>
                  <p className="font-mono text-sm font-bold text-foreground">{t.hero.tradesToday}</p>
                </div>
              </div>
            </motion.div>
          </MouseTiltCard>
        </motion.div>
      </ParallaxLayer>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
