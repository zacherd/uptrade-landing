'use client';

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

interface MouseTiltCardProps {
  children: ReactNode;
  intensity?: number;
  maxRotation?: number;
  enableGlare?: boolean;
  className?: string;
}

export function MouseTiltCard({
  children,
  intensity = 1,
  maxRotation = 15,
  enableGlare = false,
  className = '',
}: MouseTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    setDisabled(prefersReducedMotion || isTouchOnly);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(
    useTransform(mouseY, [-1, 1], [maxRotation * intensity, -maxRotation * intensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-maxRotation * intensity, maxRotation * intensity]),
    springConfig
  );

  const glareX = useSpring(
    useTransform(mouseX, [-1, 1], [0, 100]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [-1, 1], [0, 100]),
    springConfig
  );

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    },
    [disabled, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovering(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: '1200px' }} className={className}>
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {children}

        {enableGlare && isHovering && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}

export function FloatingChild({
  children,
  className = '',
  depth = 75,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
}) {
  return (
    <div
      style={{ transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </div>
  );
}
