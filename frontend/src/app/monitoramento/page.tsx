import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { ApiError } from '@/components/ApiError';
import { StatusBadge } from '@/components/StatusBadge';
import { LatencyChart } from '@/components/charts/LatencyChart';
import { api } from '@/lib/api';
import { formatNumber, formatPercent } from '@/lib/format';
import { Server, Zap, AlertTriangle, Gauge } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MonitoramentoPage() {
  try {
    const data = await api.monitoring.all();
    const { summary, services, endpoints, alerts, latencyHistory } = data;

    return (
      <>
        <PageHeader
          title="Monitoramento de APIs"
          description="Saúde dos serviços, latência, endpoints e alertas em tempo real"
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Uptime"
            value={formatPercent(summary.uptimePercent)}
            subtitle={summary.period}
            icon={Server}
            iconColor="text-accent-green"
          />
          <StatCard
            title="Latência Média"
            value={`${summary.avgResponseTime}ms`}
            icon={Zap}
            iconColor="text-accent-light"
          />
          <StatCard
            title="Taxa de Erro"
            value={formatPercent(summary.errorRate)}
            icon={Gauge}
            iconColor="text-accent-amber"
          />
          <StatCard
            title="Alertas Ativos"
            value={String(summary.activeAlerts)}
            subtitle={`${formatNumber(summary.requestsPerMinute)} req/min`}
            icon={AlertTriangle}
            iconColor="text-accent-red"
          />
        </div>

        <div className="mb-8">
          <ChartCard title="Latência (Percentis)" subtitle="P50, P95 e P99 nas últimas 24h">
            <LatencyChart data={latencyHistory} />
          </ChartCard>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="glass-card p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{s.name}</h4>
                <StatusBadge status={s.status} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-slate-500">Uptime</p>
                  <p className="font-semibold">{s.uptime}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Latência</p>
                  <p className="font-semibold">{s.avgLatency}ms</p>
                </div>
                <div>
                  <p className="text-slate-500">Requests</p>
                  <p className="font-semibold">{formatNumber(s.requests)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card overflow-hidden">
            <div className="border-b border-surface-border p-5">
              <h3 className="font-semibold">Métricas por Endpoint</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-slate-500">
                  <th className="p-4 font-medium">Método</th>
                  <th className="p-4 font-medium">Path</th>
                  <th className="p-4 font-medium">Chamadas</th>
                  <th className="p-4 font-medium">Avg</th>
                  <th className="p-4 font-medium">Erros</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep) => (
                  <tr key={`${ep.method}-${ep.path}`} className="border-b border-surface-border/50">
                    <td className="p-4">
                      <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-xs text-accent-light">
                        {ep.method}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">{ep.path}</td>
                    <td className="p-4">{formatNumber(ep.calls)}</td>
                    <td className="p-4">{ep.avgMs}ms</td>
                    <td className="p-4">{formatPercent(ep.errorRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-card p-5">
            <h3 className="mb-4 font-semibold">Alertas Recentes</h3>
            <div className="space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="rounded-lg border border-surface-border bg-surface-hover/30 p-4"
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge status={a.severity} label={a.severity} />
                    <span className="text-xs text-slate-500">
                      {new Date(a.time).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{a.message}</p>
                  <p className="mt-1 text-xs text-slate-500">{a.service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } catch (e) {
    return (
      <>
        <PageHeader title="Monitoramento" description="Métricas de APIs" />
        <ApiError message={e instanceof Error ? e.message : 'Falha na conexão'} />
      </>
    );
  }
}
