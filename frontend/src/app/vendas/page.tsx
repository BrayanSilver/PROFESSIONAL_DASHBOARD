import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { ApiError } from '@/components/ApiError';
import { StatusBadge } from '@/components/StatusBadge';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { api } from '@/lib/api';
import { formatCurrency, formatNumber, formatPercent, formatDate } from '@/lib/format';
import { DollarSign, ShoppingCart, TrendingUp, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function VendasPage() {
  try {
    const data = await api.sales.all();
    const { summary, monthlyRevenue, topProducts, salesByRegion, recentOrders } = data;

    const regionPie = salesByRegion.map((r) => ({
      name: r.region,
      value: r.revenue,
    }));

    return (
      <>
        <PageHeader
          title="Dashboard de Vendas"
          description="Métricas de receita, produtos, regiões e pedidos recentes"
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Receita Total"
            value={formatCurrency(summary.totalRevenue)}
            subtitle={summary.period}
            change={summary.growthPercent}
            icon={DollarSign}
            iconColor="text-accent-green"
          />
          <StatCard
            title="Total de Pedidos"
            value={formatNumber(summary.totalOrders)}
            subtitle={summary.period}
            icon={ShoppingCart}
          />
          <StatCard
            title="Ticket Médio"
            value={formatCurrency(summary.averageOrderValue)}
            icon={TrendingUp}
            iconColor="text-accent-light"
          />
          <StatCard
            title="Taxa de Conversão"
            value={formatPercent(summary.conversionRate)}
            icon={Target}
            iconColor="text-accent-purple"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <ChartCard title="Receita por Mês" className="lg:col-span-2">
            <RevenueChart data={monthlyRevenue} />
          </ChartCard>
          <ChartCard title="Vendas por Região">
            <PieChartCard data={regionPie} />
          </ChartCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card overflow-hidden">
            <div className="border-b border-surface-border p-5">
              <h3 className="font-semibold">Top Produtos</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-slate-500">
                  <th className="p-4 font-medium">Produto</th>
                  <th className="p-4 font-medium">Receita</th>
                  <th className="p-4 font-medium">Unidades</th>
                  <th className="p-4 font-medium">Crescimento</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.id} className="border-b border-surface-border/50 hover:bg-surface-hover/50">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4">{formatCurrency(p.revenue)}</td>
                    <td className="p-4">{formatNumber(p.units)}</td>
                    <td className="p-4 text-accent-green">+{p.growth}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="border-b border-surface-border p-5">
              <h3 className="font-semibold">Pedidos Recentes</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-slate-500">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Cliente</th>
                  <th className="p-4 font-medium">Valor</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-surface-border/50 hover:bg-surface-hover/50">
                    <td className="p-4 font-mono text-xs">{o.id}</td>
                    <td className="p-4">{o.customer}</td>
                    <td className="p-4">{formatCurrencyDetailed(o.amount)}</td>
                    <td className="p-4">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } catch (e) {
    return (
      <>
        <PageHeader title="Dashboard de Vendas" description="Métricas de vendas" />
        <ApiError message={e instanceof Error ? e.message : 'Falha na conexão'} />
      </>
    );
  }
}

function formatCurrencyDetailed(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
