'use client';

import Image from 'next/image';

export function MockupDashboard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-background/50 shadow-2xl ring-1 ring-white/10 ${className}`}
    >
      <Image
        src="/hero-dashboard.png"
        alt="Uptrade Dashboard"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 896px"
        quality={100}
        priority
      />
      {/* Overlay gradient for better integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
    </div>
  );
}
