import { Injectable } from '@nestjs/common';

export interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
}

export interface PublicStats {
  exchangeRates: ExchangeRate[];
  cryptoPrices: CryptoPrice[];
  worldPopulation?: number;
  fetchedAt: string;
  source: string;
}

@Injectable()
export class PublicDataService {
  async getExchangeRates(): Promise<ExchangeRate[]> {
    try {
      const res = await fetch(
        'https://api.exchangerate-api.com/v4/latest/USD',
      );
      if (!res.ok) throw new Error('Exchange API failed');
      const data = (await res.json()) as { rates: Record<string, number> };
      const targets = [
        { code: 'BRL', name: 'Real Brasileiro' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'Libra Esterlina' },
        { code: 'JPY', name: 'Iene Japonês' },
        { code: 'ARS', name: 'Peso Argentino' },
      ];
      return targets.map((t) => ({
        code: t.code,
        name: t.name,
        rate: data.rates[t.code] ?? 0,
      }));
    } catch {
      return [
        { code: 'BRL', name: 'Real Brasileiro', rate: 5.12 },
        { code: 'EUR', name: 'Euro', rate: 0.92 },
        { code: 'GBP', name: 'Libra Esterlina', rate: 0.79 },
        { code: 'JPY', name: 'Iene Japonês', rate: 156.4 },
        { code: 'ARS', name: 'Peso Argentino', rate: 890.5 },
      ];
    }
  }

  async getCryptoPrices(): Promise<CryptoPrice[]> {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=usd&include_24hr_change=true',
      );
      if (!res.ok) throw new Error('CoinGecko API failed');
      const data = (await res.json()) as Record<
        string,
        { usd: number; usd_24h_change: number }
      >;
      const map: Record<string, { symbol: string; name: string }> = {
        bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
        ethereum: { symbol: 'ETH', name: 'Ethereum' },
        solana: { symbol: 'SOL', name: 'Solana' },
        cardano: { symbol: 'ADA', name: 'Cardano' },
        polkadot: { symbol: 'DOT', name: 'Polkadot' },
      };
      return Object.entries(map).map(([id, meta]) => ({
        id,
        symbol: meta.symbol,
        name: meta.name,
        priceUsd: data[id]?.usd ?? 0,
        change24h: data[id]?.usd_24h_change ?? 0,
      }));
    } catch {
      return [
        { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', priceUsd: 67500, change24h: 2.4 },
        { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', priceUsd: 3420, change24h: -1.2 },
        { id: 'solana', symbol: 'SOL', name: 'Solana', priceUsd: 168, change24h: 5.8 },
        { id: 'cardano', symbol: 'ADA', name: 'Cardano', priceUsd: 0.62, change24h: 0.9 },
        { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', priceUsd: 8.45, change24h: -0.5 },
      ];
    }
  }

  async getWorldPopulation(): Promise<number> {
    try {
      const res = await fetch(
        'https://restcountries.com/v3.1/all?fields=population',
      );
      if (!res.ok) throw new Error('Countries API failed');
      const countries = (await res.json()) as { population?: number }[];
      return countries.reduce((sum, c) => sum + (c.population ?? 0), 0);
    } catch {
      return 8100000000;
    }
  }

  async getAll(): Promise<PublicStats> {
    const [exchangeRates, cryptoPrices, worldPopulation] = await Promise.all([
      this.getExchangeRates(),
      this.getCryptoPrices(),
      this.getWorldPopulation(),
    ]);
    return {
      exchangeRates,
      cryptoPrices,
      worldPopulation,
      fetchedAt: new Date().toISOString(),
      source: 'APIs públicas (exchangerate-api, CoinGecko, REST Countries)',
    };
  }
}
