'use client';

import { type RefObject, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollPathSVGProps {
  containerRef: RefObject<HTMLElement | null>;
}

export function ScrollPathSVG({ containerRef }: ScrollPathSVGProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Staggered path drawing: left starts first, center mid, right last
  const pathLength1Raw = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const pathLength2Raw = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const pathLength3Raw = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  const springConfig = { stiffness: 100, damping: 30 };
  const pathLength1 = useSpring(pathLength1Raw, springConfig);
  const pathLength2 = useSpring(pathLength2Raw, springConfig);
  const pathLength3 = useSpring(pathLength3Raw, springConfig);

  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.5], [0, 0.4, 0.4]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.15, 0.6], [0, 0.3, 0.3]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.25, 0.7], [0, 0.35, 0.35]);

  // Glow dot positions along paths
  const dot1Y = useTransform(scrollYProgress, [0, 0.5], [200, 700]);
  const dot2Y = useTransform(scrollYProgress, [0.1, 0.6], [150, 750]);

  if (prefersReducedMotion) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 900"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="pathGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.72 0.18 55)" stopOpacity="0" />
          <stop offset="30%" stopColor="oklch(0.72 0.18 55)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 55)" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="pathGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.72 0.18 55)" stopOpacity="0" />
          <stop offset="40%" stopColor="oklch(0.72 0.18 55)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 55)" stopOpacity="0.2" />
        </linearGradient>
        <filter id="pathGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left organic curve */}
      <motion.path
        d="M 100 100 C 80 250, 150 350, 120 500 S 60 650, 100 800"
        stroke="url(#pathGrad1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength: pathLength1, opacity: opacity1 }}
        filter="url(#pathGlow)"
      />

      {/* Right circuit-board angular line */}
      <motion.path
        d="M 1100 120 L 1100 280 L 1050 320 L 1050 480 L 1100 520 L 1100 700 L 1060 760"
        stroke="url(#pathGrad2)"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ pathLength: pathLength2, opacity: opacity2 }}
        filter="url(#pathGlow)"
      />

      {/* Center flowing S-curve */}
      <motion.path
        d="M 600 50 C 700 200, 500 300, 600 450 S 700 600, 600 800"
        stroke="url(#pathGrad1)"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ pathLength: pathLength3, opacity: opacity3 }}
        filter="url(#pathGlow)"
      />

      {/* Glow dots at path positions */}
      <motion.circle
        cx="100"
        r="3"
        fill="oklch(0.72 0.18 55)"
        style={{ cy: dot1Y, opacity: opacity1 }}
        filter="url(#pathGlow)"
      />
      <motion.circle
        cx="1100"
        r="2.5"
        fill="oklch(0.72 0.18 55)"
        style={{ cy: dot2Y, opacity: opacity2 }}
        filter="url(#pathGlow)"
      />
    </svg>
  );
}
