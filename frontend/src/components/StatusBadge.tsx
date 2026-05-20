const statusStyles: Record<string, string> = {
  completed: 'bg-accent-green/20 text-accent-green',
  processing: 'bg-accent-amber/20 text-accent-amber',
  pending: 'bg-slate-500/20 text-slate-400',
  healthy: 'bg-accent-green/20 text-accent-green',
  degraded: 'bg-accent-amber/20 text-accent-amber',
  down: 'bg-accent-red/20 text-accent-red',
  warning: 'bg-accent-amber/20 text-accent-amber',
  info: 'bg-accent/20 text-accent-light',
  income: 'text-accent-green',
  expense: 'text-accent-red',
};

export function StatusBadge({
  status,
  label,
}: {
  status: string;
  label?: string;
}) {
  const style = statusStyles[status] ?? 'bg-slate-500/20 text-slate-400';
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}
    >
      {label ?? status}
    </span>
  );
}
