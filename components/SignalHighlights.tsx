'use client';

import type { Signal } from '@/lib/signals';
import { Trophy, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = [Trophy, Sparkles, ShieldCheck];
const titles = ['Velocity Leader', 'Precision Edge', 'Stability Anchor'];

export function SignalHighlights({ signals }: { signals: Signal[] }) {
  const leaders = [...signals].sort((a, b) => b.profit - a.profit).slice(0, 3);
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {leaders.map((signal, index) => {
        const Icon = iconMap[index] ?? Trophy;
        return (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/10 p-6 shadow-xl shadow-black/30"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7c3aed22,transparent_55%)]" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  <Icon className="h-4 w-4 text-accent" />
                  {titles[index]}
                </div>
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">#{index + 1}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{signal.name}</h3>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  {signal.symbol} • {signal.timeframe}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-200">
                <span>
                  Profitability
                  <br />
                  <span className="text-2xl font-semibold text-emerald-400">{signal.profit}x</span>
                </span>
                <span>
                  Hit Rate
                  <br />
                  <span className="text-2xl font-semibold text-cyan-300">
                    {(signal.hitRate * 100).toFixed(0)}%
                  </span>
                </span>
                <span>
                  Drawdown
                  <br />
                  <span className="text-xl font-semibold text-rose-300">{signal.maxDrawdown}%</span>
                </span>
                <span>
                  Sharpe
                  <br />
                  <span className="text-xl font-semibold text-indigo-300">{signal.sharpe.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
