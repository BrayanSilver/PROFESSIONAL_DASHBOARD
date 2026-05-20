import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { ApiError } from '@/components/ApiError';
import { StatusBadge } from '@/components/StatusBadge';
import { CashFlowChart } from '@/components/charts/CashFlowChart';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { api } from '@/lib/api';
import { formatCurrency, formatPercent, formatDate } from '@/lib/format';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FinanceiroPage() {
  try {
    const data = await api.finance.all();
    const { summary, cashFlowHistory, expenseCategories, accounts, recentTransactions, kpis } = data;

    const expensePie = expenseCategories.map((e) => ({
      name: e.category,
      value: e.amount,
    }));

    return (
      <>
        <PageHeader
          title="Painel Financeiro"
          description="Fluxo de caixa, despesas, contas e KPIs financeiros"
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Saldo Total"
            value={formatCurrency(summary.totalBalance)}
            subtitle={summary.period}
            icon={Wallet}
            iconColor="text-accent-green"
          />
          <StatCard
            title="Receita Mensal"
            value={formatCurrency(summary.monthlyIncome)}
            icon={TrendingUp}
            iconColor="text-accent-light"
          />
          <StatCard
            title="Despesas Mensais"
            value={formatCurrency(summary.monthlyExpenses)}
            icon={TrendingDown}
            iconColor="text-accent-red"
          />
          <StatCard
            title="Margem de Lucro"
            value={formatPercent(summary.profitMargin)}
            icon={PieChart}
            iconColor="text-accent-purple"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <ChartCard title="Fluxo de Caixa" className="lg:col-span-2">
            <CashFlowChart data={cashFlowHistory} />
          </ChartCard>
          <ChartCard title="Despesas por Categoria">
            <PieChartCard data={expensePie} />
          </ChartCard>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {accounts.map((acc) => (
            <div key={acc.id} className="glass-card p-5">
              <p className="text-sm text-slate-500">{acc.name}</p>
              <p className="mt-2 text-xl font-bold">{formatCurrency(acc.balance)}</p>
              <p className="mt-1 text-xs capitalize text-slate-500">{acc.type}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const progress = Math.min((kpi.value / kpi.target) * 100, 100);
            return (
              <div key={kpi.name} className="glass-card p-5">
                <p className="text-sm text-slate-500">{kpi.name}</p>
                <p className="mt-1 text-2xl font-bold">
                  {kpi.unit === 'BRL'
                    ? formatCurrency(kpi.value)
                    : kpi.unit === 'ratio'
                      ? kpi.value.toFixed(1)
                      : `${kpi.value} ${kpi.unit}`}
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-hover">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Meta: {kpi.unit === 'BRL' ? formatCurrency(kpi.target) : kpi.target}
                </p>
              </div>
            );
          })}
        </div>

        <div className="glass-card overflow-hidden">
          <div className="border-b border-surface-border p-5">
            <h3 className="font-semibold">Transações Recentes</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border text-left text-slate-500">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Descrição</th>
                <th className="p-4 font-medium">Valor</th>
                <th className="p-4 font-medium">Tipo</th>
                <th className="p-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className="border-b border-surface-border/50">
                  <td className="p-4 font-mono text-xs">{t.id}</td>
                  <td className="p-4">{t.description}</td>
                  <td className={`p-4 font-medium ${t.amount >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {formatCurrency(Math.abs(t.amount))}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={t.type} label={t.type === 'income' ? 'Receita' : 'Despesa'} />
                  </td>
                  <td className="p-4 text-slate-500">{formatDate(t.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } catch (e) {
    return (
      <>
        <PageHeader title="Painel Financeiro" description="Métricas financeiras" />
        <ApiError message={e instanceof Error ? e.message : 'Falha na conexão'} />
      </>
    );
  }
}
