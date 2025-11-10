'use client';

import { categoryTotals, timeframeDistribution } from '@/lib/metrics';
import type { Signal } from '@/lib/signals';
import { Bar, BarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function CategoryBreakdown({ signals }: { signals: Signal[] }) {
  const categories = categoryTotals(signals);
  const timeframes = timeframeDistribution(signals);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="h-80 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Strategy Buckets</h3>
            <p className="text-sm text-slate-400">Profit vs trade frequency by edge archetype</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categories}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="category" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: '#020617',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e2e8f0'
              }}
            />
            <Bar dataKey="profit" fill="url(#profitGradient)" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Timeframe Dynamics</h3>
            <p className="text-sm text-slate-400">Signal density & output per holding window</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={timeframes} outerRadius="80%">
            <PolarGrid stroke="rgba(148, 163, 184, 0.2)" polarRadius={[20, 40, 60, 80, 100]} />
            <PolarAngleAxis dataKey="timeframe" tick={{ fill: '#cbd5f5', fontSize: 12 }} />
            <PolarRadiusAxis angle={45} stroke="#94a3b8" tickFormatter={(value) => `${value}`} />
            <Radar
              name="Signal Count"
              dataKey="count"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.4}
            />
            <Radar
              name="Total Profit"
              dataKey="profit"
              stroke="#7c3aed"
              fill="#7c3aed"
              fillOpacity={0.25}
            />
            <Tooltip
              wrapperStyle={{ outline: 'none' }}
              contentStyle={{
                background: '#020617',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e2e8f0'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
