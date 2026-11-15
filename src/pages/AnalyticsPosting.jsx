import React, { useState } from 'react'
import { PageHeader, FilterSelect } from '../components/ui.jsx'
import { posts } from '../data/db.js'

export default function AnalyticsPosting() {
  const [range, setRange] = useState('Last 7 days')
  const published = posts.filter(p => p.analytics)
  const totals = published.reduce((a, p) => ({
    impressions: a.impressions + p.analytics.impressions, likes: a.likes + p.analytics.likes,
    comments: a.comments + p.analytics.comments, shares: a.shares + p.analytics.shares,
  }), { impressions: 0, likes: 0, comments: 0, shares: 0 })
  const series = [12, 18, 9, 24, 30, 22, 38]
  const max = Math.max(...series)
  const bars = range === 'Last 28 days' ? series.flatMap(v => [v, v * 0.8 + 4]) : series

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Analytics — Posting">
        <FilterSelect label="Range" options={['Last 7 days', 'Last 28 days', 'Last 90 days']} value={range} onChange={setRange} />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'Impressions', v: totals.impressions.toLocaleString(), d: '+12%' },
          { label: 'Likes', v: totals.likes.toLocaleString(), d: '+8%' },
          { label: 'Comments', v: totals.comments.toLocaleString(), d: '+21%' },
          { label: 'Shares', v: totals.shares.toLocaleString(), d: '+15%' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <div className="type-eyebrow">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold">{s.v}</div>
            <div className="mt-1 text-xs text-emerald-600">{s.d} vs prior period</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="type-eyebrow mb-3">Impressions over time</div>
        <div className="flex h-44 items-end gap-2">
          {bars.map((v, i) => (
            <div key={i} className="group relative flex-1">
              <div className="rounded-t bg-primary/80 group-hover:bg-primary transition-colors" style={{ height: `${(v / max) * 160}px` }} />
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100">{v}k</div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="type-eyebrow mb-2">Top posts</div>
        {published.map(p => (
          <div key={p._id} className="flex items-center justify-between border-b border-border py-2 text-sm last:border-b-0">
            <span className="truncate max-w-md">{p.content}</span>
            <span className="text-muted-foreground">{p.analytics.impressions.toLocaleString()} impressions</span>
          </div>
        ))}
      </div>
    </div>
  )
}
