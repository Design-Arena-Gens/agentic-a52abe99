'use client';

import { bucketCumulativePath } from '@/lib/metrics';
import type { Signal } from '@/lib/signals';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function PerformanceArea({ signals }: { signals: Signal[] }) {
  const data = bucketCumulativePath(signals);
  return (
    <div className="h-80 w-full overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">7-Day Compounding Curve</h2>
          <p className="text-sm text-slate-400">Portfolio-level cumulative ROI trajectory</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          Stable acceleration
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '5 5' }}
            contentStyle={{
              background: '#020617',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e2e8f0'
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#colorPnl)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
