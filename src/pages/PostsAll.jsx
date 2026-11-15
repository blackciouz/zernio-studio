import React, { useState } from 'react'
import { PageHeader, DataTable, Button, SearchInput, StatusBadge, Modal, fmtDate } from '../components/ui.jsx'
import { posts } from '../data/db.js'

const TABS = ['Posts', 'Calendar']

export default function PostsAll() {
  const [tab, setTab] = useState('Posts')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [creating, setCreating] = useState(false)
  const [content, setContent] = useState('')
  const [list, setList] = useState(posts)
  const [toast, setToast] = useState(null)
  const notify = m => { setToast(m); setTimeout(() => setToast(null), 2500) }

  const rows = list.filter(p =>
    p.content.toLowerCase().includes(q.toLowerCase()) &&
    (status === 'All' || p.status === status))

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), i - today.getDay() + 1)
    return { d, inMonth: d.getMonth() === today.getMonth() }
  })

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Posts">
        <Button onClick={() => setCreating(true)}>+ New post</Button>
      </PageHeader>

      <div className="flex items-center gap-4 border-b border-border">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-1 pb-2 text-sm ${tab === t ? 'border-primary font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{t}</button>
        ))}
      </div>

      {tab === 'Posts' ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <SearchInput value={q} onChange={setQ} placeholder="Search posts..." />
            <select value={status} onChange={e => setStatus(e.target.value)} className="h-8 rounded-md border border-border bg-card px-2 text-sm">
              {['All', 'published', 'scheduled', 'draft', 'failed'].map(s => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <DataTable
            columns={[
              { key: 'content', label: 'Content', render: p => <span className="line-clamp-2 max-w-md">{p.content}</span> },
              { key: 'platforms', label: 'Platforms', render: p => <span className="text-muted-foreground capitalize">{p.platforms.join(', ') || '—'}</span> },
              { key: 'scheduledFor', label: 'Schedule', render: p => <span className="text-muted-foreground">{fmtDate(p.publishedAt || p.scheduledFor)}</span> },
              { key: 'analytics', label: 'Impressions', render: p => p.analytics ? p.analytics.impressions.toLocaleString() : '—' },
              { key: 'status', label: 'Status', render: p => <StatusBadge status={p.status} /> },
              { key: 'actions', label: '', className: 'w-20 text-right', render: p => (
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" onClick={() => notify(`Édition simulée : ${p.content.slice(0, 30)}…`)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => { setList(l => l.filter(x => x._id !== p._id)); notify('Post supprimé (simulation)') }}>🗑</Button>
                </div>
              ) },
            ]}
            rows={rows}
          />
        </>
      ) : (
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground mb-1">
            {dayNames.map(d => <div key={d} className="py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map(({ d, inMonth }, i) => {
              const dayPosts = list.filter(p => { if (!p.scheduledFor) return false; const pd = new Date(p.publishedAt || p.scheduledFor); return pd.toDateString() === d.toDateString() })
              return (
                <div key={i} className={`min-h-20 rounded-md border p-1.5 text-xs ${inMonth ? 'border-border bg-background' : 'border-transparent bg-muted/40 text-muted-foreground'}`}>
                  <div className="mb-1 text-muted-foreground">{d.getDate()}</div>
                  {dayPosts.map(p => (
                    <button key={p._id} onClick={() => notify(`Post: ${p.content.slice(0, 40)}…`)}
                      className="mb-1 block w-full truncate rounded bg-primary/10 px-1.5 py-1 text-left text-[11px] text-primary hover:bg-primary/20">{p.content.slice(0, 22)}</button>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="New post"
        footer={<>
          <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
          <Button onClick={() => { if (!content.trim()) return; setList(l => [{ _id: 'p_' + Date.now(), content, status: 'draft', platforms: [], scheduledFor: null, analytics: null }, ...l]); setCreating(false); setContent(''); notify('Brouillon créé (simulation)') }}>Create draft</Button>
        </>}>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="What do you want to publish?"
          className="w-full rounded-md border border-border bg-background p-3 text-sm outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />
      </Modal>

      {toast && <div className="fixed bottom-5 right-5 z-50 rounded-lg border border-border bg-card px-4 py-2.5 text-sm shadow-xl">{toast}</div>}
    </div>
  )
}
