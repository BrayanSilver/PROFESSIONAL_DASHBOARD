import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ApiError } from '@/components/ApiError';
import { api } from '@/lib/api';
import { formatNumber } from '@/lib/format';
import { Globe, Bitcoin, DollarSign, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DadosPublicosPage() {
  try {
    const data = await api.publicData.all();
    const { exchangeRates, cryptoPrices, worldPopulation, fetchedAt, source } = data;

    return (
      <>
        <PageHeader
          title="Dados Públicos"
          description="Cotações, criptomoedas e estatísticas globais via APIs públicas em tempo real"
        />

        <div className="mb-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm text-accent-light">
            Dados obtidos de APIs públicas reais. Última atualização:{' '}
            {new Date(fetchedAt).toLocaleString('pt-BR')}
          </p>
          <p className="mt-1 text-xs text-slate-500">{source}</p>
        </div>

        {worldPopulation && (
          <div className="mb-8">
            <StatCard
              title="População Mundial (soma países)"
              value={formatNumber(worldPopulation)}
              subtitle="REST Countries API"
              icon={Users}
              iconColor="text-accent-purple"
            />
          </div>
        )}

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-accent-green" />
              <h3 className="font-semibold">Câmbio (USD base)</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-slate-500">
                  <th className="pb-3 font-medium">Moeda</th>
                  <th className="pb-3 font-medium">Nome</th>
                  <th className="pb-3 font-medium text-right">Taxa</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates.map((r) => (
                  <tr key={r.code} className="border-b border-surface-border/50">
                    <td className="py-3 font-mono font-bold">{r.code}</td>
                    <td className="py-3">{r.name}</td>
                    <td className="py-3 text-right font-medium">
                      {r.rate.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Bitcoin className="h-5 w-5 text-accent-amber" />
              <h3 className="font-semibold">Criptomoedas (USD)</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-slate-500">
                  <th className="pb-3 font-medium">Ativo</th>
                  <th className="pb-3 font-medium text-right">Preço</th>
                  <th className="pb-3 font-medium text-right">24h</th>
                </tr>
              </thead>
              <tbody>
                {cryptoPrices.map((c) => (
                  <tr key={c.id} className="border-b border-surface-border/50">
                    <td className="py-3">
                      <span className="font-bold">{c.symbol}</span>
                      <span className="ml-2 text-slate-500">{c.name}</span>
                    </td>
                    <td className="py-3 text-right font-medium">
                      ${c.priceUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`py-3 text-right font-medium ${
                        c.change24h >= 0 ? 'text-accent-green' : 'text-accent-red'
                      }`}
                    >
                      {c.change24h >= 0 ? '+' : ''}
                      {c.change24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4 p-5">
          <Globe className="h-10 w-10 text-accent-light" />
          <div>
            <p className="font-medium">APIs Integradas</p>
            <p className="mt-1 text-sm text-slate-400">
              exchangerate-api.com · CoinGecko · REST Countries — com fallback para dados mock
              quando offline
            </p>
          </div>
        </div>
      </>
    );
  } catch (e) {
    return (
      <>
        <PageHeader title="Dados Públicos" description="APIs públicas" />
        <ApiError message={e instanceof Error ? e.message : 'Falha na conexão'} />
      </>
    );
  }
}
