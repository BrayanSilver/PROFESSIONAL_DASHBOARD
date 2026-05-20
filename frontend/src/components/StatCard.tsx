import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  iconColor = 'text-accent-light',
}: StatCardProps) {
  const positive = change !== undefined && change >= 0;

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className={`rounded-lg bg-surface-hover p-2.5 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1 text-sm">
          {positive ? (
            <TrendingUp className="h-4 w-4 text-accent-green" />
          ) : (
            <TrendingDown className="h-4 w-4 text-accent-red" />
          )}
          <span className={positive ? 'text-accent-green' : 'text-accent-red'}>
            {positive ? '+' : ''}
            {change.toFixed(1)}%
          </span>
          <span className="text-slate-500">vs período anterior</span>
        </div>
      )}
    </div>
  );
}
