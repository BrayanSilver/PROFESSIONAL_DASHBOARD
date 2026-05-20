const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  sales: {
    all: () => fetchApi<SalesData>('/sales'),
    summary: () => fetchApi<SalesSummary>('/sales/summary'),
    revenue: () => fetchApi<MonthlyRevenue[]>('/sales/revenue'),
    products: () => fetchApi<TopProduct[]>('/sales/products'),
    orders: () => fetchApi<RecentOrder[]>('/sales/orders'),
  },
  analytics: {
    all: () => fetchApi<AnalyticsData>('/analytics'),
    summary: () => fetchApi<AnalyticsSummary>('/analytics/summary'),
    traffic: () => fetchApi<TrafficDay[]>('/analytics/traffic'),
    sources: () => fetchApi<TrafficSource[]>('/analytics/sources'),
    funnel: () => fetchApi<FunnelStage[]>('/analytics/funnel'),
  },
  finance: {
    all: () => fetchApi<FinanceData>('/finance'),
    summary: () => fetchApi<FinanceSummary>('/finance/summary'),
    cashflow: () => fetchApi<CashFlowMonth[]>('/finance/cashflow'),
    transactions: () => fetchApi<Transaction[]>('/finance/transactions'),
    kpis: () => fetchApi<FinanceKpi[]>('/finance/kpis'),
  },
  monitoring: {
    all: () => fetchApi<MonitoringData>('/monitoring'),
    summary: () => fetchApi<MonitoringSummary>('/monitoring/summary'),
    services: () => fetchApi<ServiceHealth[]>('/monitoring/services'),
    endpoints: () => fetchApi<ApiEndpoint[]>('/monitoring/endpoints'),
    alerts: () => fetchApi<Alert[]>('/monitoring/alerts'),
    latency: () => fetchApi<LatencyPoint[]>('/monitoring/latency'),
  },
  publicData: {
    all: () => fetchApi<PublicStats>('/public-data'),
    exchangeRates: () => fetchApi<ExchangeRate[]>('/public-data/exchange-rates'),
    crypto: () => fetchApi<CryptoPrice[]>('/public-data/crypto'),
    population: () => fetchApi<number>('/public-data/population'),
  },
};

// Types
export interface SalesSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  growthPercent: number;
  period: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  units: number;
  growth: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export interface SalesData {
  summary: SalesSummary;
  monthlyRevenue: MonthlyRevenue[];
  topProducts: TopProduct[];
  salesByRegion: { region: string; revenue: number; share: number }[];
  recentOrders: RecentOrder[];
}

export interface AnalyticsSummary {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  newUsersPercent: number;
  period: string;
}

export interface TrafficDay {
  date: string;
  pageViews: number;
  visitors: number;
  sessions: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  share: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  rate: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  trafficByDay: TrafficDay[];
  trafficSources: TrafficSource[];
  topPages: { path: string; views: number; avgTime: number }[];
  deviceBreakdown: { device: string; share: number }[];
  conversionFunnel: FunnelStage[];
}

export interface FinanceSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netProfit: number;
  cashFlow: number;
  profitMargin: number;
  currency: string;
  period: string;
}

export interface CashFlowMonth {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string;
}

export interface FinanceKpi {
  name: string;
  value: number;
  target: number;
  unit: string;
}

export interface FinanceData {
  summary: FinanceSummary;
  cashFlowHistory: CashFlowMonth[];
  expenseCategories: { category: string; amount: number; share: number }[];
  accounts: { id: string; name: string; balance: number; type: string }[];
  recentTransactions: Transaction[];
  kpis: FinanceKpi[];
}

export interface MonitoringSummary {
  overallHealth: string;
  uptimePercent: number;
  avgResponseTime: number;
  errorRate: number;
  requestsPerMinute: number;
  activeAlerts: number;
  period: string;
}

export interface ServiceHealth {
  name: string;
  status: string;
  uptime: number;
  avgLatency: number;
  requests: number;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  calls: number;
  avgMs: number;
  errorRate: number;
}

export interface Alert {
  id: string;
  severity: string;
  message: string;
  service: string;
  time: string;
}

export interface LatencyPoint {
  time: string;
  p50: number;
  p95: number;
  p99: number;
}

export interface MonitoringData {
  summary: MonitoringSummary;
  services: ServiceHealth[];
  latencyHistory: LatencyPoint[];
  endpoints: ApiEndpoint[];
  alerts: Alert[];
  statusCodes: { code: number; count: number; share: number }[];
}

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
