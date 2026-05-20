import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { ApiError } from '@/components/ApiError';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { TrafficChart } from '@/components/charts/TrafficChart';
import { api } from '@/lib/api';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/format';
import {
  DollarSign,
  Users,
  Activity,
  Wallet,
  ShoppingCart,
  Eye,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  try {
    const [sales, analytics, finance, monitoring, revenue, traffic] =
      await Promise.all([
        api.sales.summary(),
        api.analytics.summary(),
        api.finance.summary(),
        api.monitoring.summary(),
        api.sales.revenue(),
        api.analytics.traffic(),
      ]);

    return (
      <>
        <PageHeader
          title="Visão Geral"
          description="Painel executivo com métricas consolidadas de vendas, analytics, finanças e infraestrutura"
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Receita Total"
            value={formatCurrency(sales.totalRevenue)}
            subtitle={sales.period}
            change={sales.growthPercent}
            icon={DollarSign}
            iconColor="text-accent-green"
          />
          <StatCard
            title="Visitantes Únicos"
            value={formatNumber(analytics.uniqueVisitors)}
            subtitle={analytics.period}
            icon={Users}
            iconColor="text-accent-light"
          />
          <StatCard
            title="Uptime APIs"
            value={formatPercent(monitoring.uptimePercent)}
            subtitle={monitoring.period}
            icon={Activity}
            iconColor="text-accent-purple"
          />
          <StatCard
            title="Saldo Total"
            value={formatCurrency(finance.totalBalance)}
            subtitle={finance.period}
            icon={Wallet}
            iconColor="text-accent-amber"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Receita Mensal" subtitle="Evolução de vendas no ano">
            <RevenueChart data={revenue} />
          </ChartCard>
          <ChartCard title="Tráfego Web" subtitle="Page views e visitantes (7 dias)">
            <TrafficChart data={traffic} />
          </ChartCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat label="Pedidos" value={formatNumber(sales.totalOrders)} icon={ShoppingCart} />
          <MiniStat label="Page Views" value={formatNumber(analytics.pageViews)} icon={Eye} />
          <MiniStat label="Lucro Mensal" value={formatCurrency(finance.netProfit)} icon={Wallet} />
          <MiniStat
            label="Req/min"
            value={formatNumber(monitoring.requestsPerMinute)}
            icon={Activity}
          />
        </div>
      </>
    );
  } catch (e) {
    return (
      <>
        <PageHeader title="Visão Geral" description="Painel executivo" />
        <ApiError message={e instanceof Error ? e.message : 'Falha na conexão'} />
      </>
    );
  }
}

function MiniStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="glass-card flex items-center gap-4 p-4">
      <Icon className="h-8 w-8 text-accent-light opacity-80" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
