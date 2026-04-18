'use client';

export function MockupMetricCard({
  label,
  value,
  color = 'primary',
  className = '',
}: {
  label: string;
  value: string;
  color?: 'primary' | 'green' | 'red' | 'blue';
  className?: string;
}) {
  const blobColors = {
    primary: 'oklch(0.72 0.18 55 / 0.3)',
    green: 'oklch(0.7 0.18 145 / 0.3)',
    red: 'oklch(0.65 0.2 25 / 0.3)',
    blue: 'oklch(0.65 0.15 250 / 0.3)',
  };

  return (
    <div
      className={`glass-card glass-noise relative overflow-hidden rounded-xl p-4 ${className}`}
    >
      <div
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full blur-[40px]"
        style={{ background: blobColors[color] }}
      />
      <div className="relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
          {label}
        </p>
        <p className="mt-1 font-mono text-2xl font-extrabold tabular-nums text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

export function MockupChartBar({
  height,
  color = 'primary',
}: {
  height: string;
  color?: string;
}) {
  return (
    <div className="flex flex-1 items-end">
      <div
        className="w-full rounded-t-sm"
        style={{
          height,
          background:
            color === 'primary'
              ? 'linear-gradient(to top, oklch(0.72 0.18 55 / 0.6), oklch(0.72 0.18 55 / 0.2))'
              : color === 'green'
                ? 'linear-gradient(to top, oklch(0.7 0.18 145 / 0.6), oklch(0.7 0.18 145 / 0.2))'
                : 'linear-gradient(to top, oklch(0.65 0.2 25 / 0.6), oklch(0.65 0.2 25 / 0.2))',
        }}
      />
    </div>
  );
}

export function MockupTradeRow({
  symbol,
  side,
  pnl,
  date,
}: {
  symbol: string;
  side: 'long' | 'short';
  pnl: string;
  date: string;
}) {
  const isProfit = !pnl.startsWith('-');
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3">
      <span className="rounded-md bg-white/[0.08] px-2 py-1 font-mono text-xs font-bold text-foreground">
        {symbol}
      </span>
      <span
        className={`text-[10px] font-bold uppercase ${side === 'long' ? 'text-green-400' : 'text-red-400'}`}
      >
        {side}
      </span>
      <span className="ml-auto font-mono text-sm font-bold tabular-nums">
        <span className={isProfit ? 'text-green-400' : 'text-red-400'}>
          {pnl}
        </span>
      </span>
      <span className="text-xs text-muted-foreground/50">{date}</span>
    </div>
  );
}

export function MockupCalendarCell({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) {
  const bg =
    value > 0
      ? `oklch(0.7 0.18 145 / ${Math.min(value / 500, 0.8)})`
      : value < 0
        ? `oklch(0.65 0.2 25 / ${Math.min(Math.abs(value) / 500, 0.8)})`
        : 'oklch(1 0 0 / 0.03)';

  return (
    <div
      className="aspect-square rounded-sm transition-all duration-500"
      style={{
        background: bg,
        transitionDelay: `${delay}ms`,
      }}
    />
  );
}

export function MockupProgressBar({
  progress,
  className = '',
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06] ${className}`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
