'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { LatencyPoint } from '@/lib/api';

export function LatencyChart({ data }: { data: LatencyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis unit="ms" />
        <Tooltip
          contentStyle={{
            background: '#1a2332',
            border: '1px solid #2d3a4f',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="p50" name="P50" stroke="#10b981" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="p95" name="P95" stroke="#f59e0b" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="p99" name="P99" stroke="#ef4444" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
