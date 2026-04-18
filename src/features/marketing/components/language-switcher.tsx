'use client';

import { useTranslation } from '../i18n/language-context';
import type { Language } from '../i18n/translations';

function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <rect width="640" height="160" fill="#000" />
      <rect y="160" width="640" height="160" fill="#D00" />
      <rect y="320" width="640" height="160" fill="#FFCE00" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <rect width="640" height="480" fill="#012169" />
      <path d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" fill="#fff" />
      <path d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" fill="#C8102E" />
      <path d="M241 0v480h160V0H241zM0 160v160h640V160H0z" fill="#fff" />
      <path d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" fill="#C8102E" />
    </svg>
  );
}

const flags: { lang: Language; icon: React.FC<{ className?: string }>; label: string }[] = [
  { lang: 'de', icon: FlagDE, label: 'Deutsch' },
  { lang: 'en', icon: FlagGB, label: 'English' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-0.5">
      {flags.map((f) => (
        <button
          key={f.lang}
          onClick={() => setLanguage(f.lang)}
          aria-label={f.label}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
            language === f.lang
              ? 'ring-2 ring-primary scale-110 bg-white/[0.06]'
              : 'opacity-50 hover:opacity-80'
          }`}
        >
          <f.icon className="h-4 w-4 rounded-sm" />
        </button>
      ))}
    </div>
  );
}
