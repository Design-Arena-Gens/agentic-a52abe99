'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, Gauge, Activity, BarChart3, Brain } from 'lucide-react';

type Metric = {
  label: string;
  value: string;
  sublabel: string;
  icon: React.ReactNode;
};

export function MetricGrid({
  stats
}: {
  stats: {
    totalProfit: number;
    avgHitRate: number;
    medianLeverage: number;
    totalVolume: number;
    avgSharpe: number;
    sentimentScore: number;
  };
}) {
  const metrics: Metric[] = [
    {
      label: 'Total Compounded ROI',
      value: `${stats.totalProfit.toFixed(0)}x`,
      sublabel: 'Aggregated across top 20 signals',
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />
    },
    {
      label: 'Average Win Ratio',
      value: `${(stats.avgHitRate * 100).toFixed(1)}%`,
      sublabel: 'Probability of profitable execution',
      icon: <Target className="h-5 w-5 text-cyan-400" />
    },
    {
      label: 'Median Leverage',
      value: `${stats.medianLeverage.toFixed(0)}×`,
      sublabel: 'Balanced risk amplification',
      icon: <Gauge className="h-5 w-5 text-purple-400" />
    },
    {
      label: 'Capital Turnover',
      value: `${stats.totalVolume.toFixed(1)}M`,
      sublabel: 'Notional exposure in last 7 days',
      icon: <Activity className="h-5 w-5 text-sky-400" />
    },
    {
      label: 'Mean Sharpe',
      value: stats.avgSharpe.toFixed(2),
      sublabel: 'Risk adjusted performance',
      icon: <BarChart3 className="h-5 w-5 text-fuchsia-400" />
    },
    {
      label: 'Signal Sentiment',
      value: `${stats.sentimentScore.toFixed(0)} / 100`,
      sublabel: 'Aggregate on-chain + social scoring',
      icon: <Brain className="h-5 w-5 text-rose-400" />
    }
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
        >
          <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-accent/10 blur-3xl" />
          <div className="flex items-center justify-between">
            <div className="rounded-full border border-white/5 bg-slate-900/80 p-3">{metric.icon}</div>
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
            <p className="text-3xl font-semibold text-white">{metric.value}</p>
            <p className="text-sm text-slate-400">{metric.sublabel}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
