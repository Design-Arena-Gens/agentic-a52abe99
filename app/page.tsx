import { MetricGrid } from '@/components/MetricGrid';
import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { PerformanceArea } from '@/components/PerformanceArea';
import { SignalHighlights } from '@/components/SignalHighlights';
import { SignalTable } from '@/components/SignalTable';
import { aggregateStats } from '@/lib/metrics';
import { signals } from '@/lib/signals';

export default function Page() {
  const stats = aggregateStats(signals);

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col gap-8 px-4 pb-16 pt-12 sm:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[400px] bg-[radial-gradient(circle_at_top,#3b82f622,transparent_60%)]" />
      <section className="space-y-6">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/10 p-8 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.5em] text-slate-500">Signal Intelligence Suite</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">
                Top 20 High-Leverage Crypto Alpha Streams
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-400">
                Real-time curated signals between 10× and 500× leverage. Track ROI velocity, risk banding, and
                conviction layers calibrated for aggressive yet controlled positioning across major digital assets.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-slate-300">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Signal Sync</span>
              <span className="text-3xl font-semibold text-emerald-400">{(stats.avgHitRate * 100).toFixed(1)}%</span>
              <span>Probability-weighted win rate across monitored executions.</span>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live feed stabilized • 3m latency
              </div>
            </div>
          </div>
          <MetricGrid stats={stats} />
        </div>
        <SignalHighlights signals={signals} />
      </section>
      <section className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <PerformanceArea signals={signals} />
        <CategoryBreakdown signals={signals} />
      </section>
      <section>
        <SignalTable signals={signals} />
      </section>
    </main>
  );
}
