import type { Metadata } from 'next';
import './globals.css';
import { DashboardLayout } from '@/components/DashboardLayout';

export const metadata: Metadata = {
  title: 'TechDash — Business Intelligence',
  description:
    'Dashboard de vendas, analytics, monitoramento, financeiro e dados públicos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
