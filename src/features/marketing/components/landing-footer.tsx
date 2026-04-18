'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../i18n/language-context';

const columnHrefs = [
  [
    { href: '#dashboard' },
    { href: '#journal' },
    { href: '#' },
  ],
  [
    { href: '#' },
    { href: '#' },
    { href: '#' },
    { href: '#' },
  ],
  [
    { href: '#' },
    { href: '#' },
    { href: '#' },
  ],
  [
    { href: '#' },
    { href: '#' },
  ],
];

export function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/[0.06] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Logo & tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/logo-icon.png"
                alt=""
                width={120}
                height={90}
                className="h-8 w-auto"
              />
              <Image
                src="/logo-text.png"
                alt="Uptrade"
                width={300}
                height={80}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          {/* Link columns */}
          {t.footer.columns.map((col, colIdx) => (
            <div key={colIdx}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((label, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={columnHrefs[colIdx]?.[linkIdx]?.href ?? '#'}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/[0.06] pt-6">
          <p className="text-center text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
