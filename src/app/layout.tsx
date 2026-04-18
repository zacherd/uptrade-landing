import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Uptrade - Trade Smarter. Track Everything.',
  description:
    'The all-in-one trading journal with real-time analytics, P&L calendars, and a built-in academy to help you become a consistently profitable trader.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans`}>
        <Providers>
          <div className="dark min-h-screen bg-background text-foreground">
            {/* Ambient background orbs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <div
                className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
                style={{
                  background: 'oklch(0.72 0.18 55 / 0.3)',
                  animation: 'ambient-drift 20s ease-in-out infinite',
                }}
              />
              <div
                className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full opacity-15 blur-[100px]"
                style={{
                  background: 'oklch(0.72 0.18 55 / 0.2)',
                  animation: 'ambient-drift 25s ease-in-out infinite reverse',
                }}
              />
              <div
                className="absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full opacity-10 blur-[80px]"
                style={{
                  background: 'oklch(0.72 0.18 55 / 0.25)',
                  animation: 'ambient-drift 30s ease-in-out infinite',
                }}
              />
            </div>
            <div className="relative z-10">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
