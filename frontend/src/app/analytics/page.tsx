import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { ApiError } from '@/components/ApiError';
import { TrafficChart } from '@/components/charts/TrafficChart';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { api } from '@/lib/api';
import { formatNumber, formatPercent, formatDuration } from '@/lib/format';
import { Eye, Users, MousePointer, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  try {
    const data = await api.analytics.all();
    const { summary, trafficByDay, trafficSources, topPages, conversionFunnel } = data;

    const sourcesPie = trafficSources.map((s) => ({
      name: s.source,
      value: s.visitors,
    }));

    return (
      <>
        <PageHeader
          title="Analytics"
          description="Tráfego web, fontes, páginas mais visitadas e funil de conversão"
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Page Views"
            value={formatNumber(summary.pageViews)}
            subtitle={summary.period}
            icon={Eye}
          />
          <StatCard
            title="Visitantes Únicos"
            value={formatNumber(summary.uniqueVisitors)}
            icon={Users}
            iconColor="text-accent-light"
          />
          <StatCard
            title="Taxa de Rejeição"
            value={formatPercent(summary.bounceRate)}
            icon={MousePointer}
            iconColor="text-accent-amber"
          />
          <StatCard
            title="Duração Média"
            value={formatDuration(summary.avgSessionDuration)}
            icon={Clock}
            iconColor="text-accent-purple"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <ChartCard title="Tráfego Diário" className="lg:col-span-2">
            <TrafficChart data={trafficByDay} />
          </ChartCard>
          <ChartCard title="Fontes de Tráfego">
            <PieChartCard data={sourcesPie} />
          </ChartCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card overflow-hidden">
            <div className="border-b border-surface-border p-5">
              <h3 className="font-semibold">Páginas Mais Visitadas</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-slate-500">
                  <th className="p-4 font-medium">Página</th>
                  <th className="p-4 font-medium">Views</th>
                  <th className="p-4 font-medium">Tempo Médio</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.path} className="border-b border-surface-border/50">
                    <td className="p-4 font-mono text-xs">{p.path}</td>
                    <td className="p-4">{formatNumber(p.views)}</td>
                    <td className="p-4">{formatDuration(p.avgTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-card p-5">
            <h3 className="mb-4 font-semibold">Funil de Conversão</h3>
            <div className="space-y-3">
              {conversionFunnel.map((stage, i) => (
                <div key={stage.stage}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{stage.stage}</span>
                    <span className="text-slate-400">
                      {formatNumber(stage.count)} ({stage.rate}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-hover">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-purple"
                      style={{ width: `${Math.max(stage.rate, 1)}%` }}
                    />
                  </div>
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
        <PageHeader title="Analytics" description="Métricas de tráfego" />
        <ApiError message={e instanceof Error ? e.message : 'Falha na conexão'} />
      </>
    );
  }
}
