'use client';

import type { Signal } from '@/lib/signals';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useMemo, useState } from 'react';

type SortKey = keyof Pick<Signal, 'profit' | 'leverage' | 'hitRate' | 'sharpe' | 'maxDrawdown' | 'volume'>;

const headers: { label: string; key: SortKey }[] = [
  { label: 'Signal', key: 'profit' },
  { label: 'Leverage', key: 'leverage' },
  { label: 'Hit Rate', key: 'hitRate' },
  { label: 'Sharpe', key: 'sharpe' },
  { label: 'Max DD', key: 'maxDrawdown' },
  { label: 'Volume', key: 'volume' }
];

export function SignalTable({ signals }: { signals: Signal[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('profit');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const sortedSignals = useMemo(() => {
    const multiplier = direction === 'asc' ? 1 : -1;
    return [...signals].sort((a, b) => {
      if (a[sortKey] === b[sortKey]) {
        return b.profit - a.profit;
      }
      return (a[sortKey] > b[sortKey] ? 1 : -1) * multiplier;
    });
  }, [signals, sortKey, direction]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setDirection(key === 'maxDrawdown' ? 'asc' : 'desc');
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-slate-900/60 shadow-lg shadow-accent/10">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Top 20 Signals</h2>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Updated realtime
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Pair
              </th>
              {headers.map(({ label, key }) => {
                const active = key === sortKey;
                return (
                  <th key={key} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    <button
                      type="button"
                      onClick={() => handleSort(key)}
                      className="group inline-flex items-center gap-1 text-slate-300 transition hover:text-white"
                    >
                      {label}
                      {active ? (
                        direction === 'asc' ? (
                          <ArrowDown className="h-3.5 w-3.5 text-accent" />
                        ) : (
                          <ArrowUp className="h-3.5 w-3.5 text-accent" />
                        )
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-slate-600 opacity-60 transition group-hover:bg-accent/60" />
                      )}
                    </button>
                  </th>
                );
              })}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Style
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedSignals.map((signal, index) => (
              <motion.tr
                key={signal.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01, duration: 0.25 }}
                className="group hover:bg-white/5"
              >
                <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{signal.name}</span>
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {signal.symbol} • {signal.timeframe}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-emerald-400">{signal.profit}x</td>
                <td className="px-6 py-4 text-sm text-slate-200">{signal.leverage}×</td>
                <td className="px-6 py-4 text-sm text-slate-200">{(signal.hitRate * 100).toFixed(0)}%</td>
                <td className="px-6 py-4 text-sm text-slate-200">{signal.sharpe.toFixed(1)}</td>
                <td className="px-6 py-4 text-sm text-rose-300">{signal.maxDrawdown}%</td>
                <td className="px-6 py-4 text-sm text-slate-200">{signal.volume.toFixed(1)}M</td>
                <td className="px-6 py-4 text-sm">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent">
                    {signal.category}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
