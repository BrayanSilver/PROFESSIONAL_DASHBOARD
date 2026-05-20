'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Activity,
  Wallet,
  Globe,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Visão Geral', icon: LayoutDashboard },
  { href: '/vendas', label: 'Vendas', icon: TrendingUp },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/monitoramento', label: 'Monitoramento', icon: Activity },
  { href: '/financeiro', label: 'Financeiro', icon: Wallet },
  { href: '/dados-publicos', label: 'Dados Públicos', icon: Globe },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-surface-border bg-surface">
      <div className="flex h-16 items-center gap-3 border-b border-surface-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-purple">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">TechDash</h1>
          <p className="text-xs text-slate-500">Business Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-accent/15 text-accent-light'
                  : 'text-slate-400 hover:bg-surface-hover hover:text-slate-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-accent-light' : ''}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-surface-border p-4">
        <div className="rounded-lg bg-surface-card p-3">
          <p className="text-xs font-medium text-slate-400">Stack</p>
          <p className="mt-1 text-xs text-slate-500">
            Next.js · NestJS · TypeScript
          </p>
        </div>
      </div>
    </aside>
  );
}
