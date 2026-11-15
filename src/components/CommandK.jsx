import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { posts, conversations } from '../data/db.js'

export default function CommandK({ open, onClose }) {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); onClose === undefined ? null : null } }
    // ouverture gérée par le parent; ici: Escape ferme
    const esc = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  if (!open) return null
  const routes = [
    { label: 'Home', to: '/dashboard/home', group: 'Navigation' },
    { label: 'Connections', to: '/dashboard/connections', group: 'Navigation' },
    { label: 'All posts', to: '/dashboard/posts-all', group: 'Navigation' },
    { label: 'Automations', to: '/dashboard/automations', group: 'Navigation' },
    { label: 'API Keys', to: '/dashboard/api-keys', group: 'Developers' },
    { label: 'Webhooks', to: '/dashboard/webhooks', group: 'Developers' },
    { label: 'Settings', to: '/dashboard/settings', group: 'Navigation' },
    ...posts.map(p => ({ label: p.content.slice(0, 50), to: '/dashboard/posts-all', group: 'Posts' })),
    ...conversations.map(c => ({ label: `${c.contact} — ${c.lastMessage.slice(0, 30)}`, to: '/dashboard/inbox-messages', group: 'Inbox' })),
  ]
  const results = routes.filter(r => r.label.toLowerCase().includes(q.toLowerCase())).slice(0, 12)
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search or jump to..."
          className="w-full h-12 px-4 bg-transparent outline-none border-b border-border text-sm" />
        <div className="max-h-80 overflow-auto p-1.5">
          {results.length === 0 && <div className="px-3 py-8 text-center text-sm text-muted-foreground">No results found.</div>}
          {results.map((r, i) => (
            <button key={i} onClick={() => { nav(r.to); onClose?.() }}
              className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent text-left">
              <span className="text-xs text-muted-foreground w-20 shrink-0">{r.group}</span>
              <span className="truncate">{r.label}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground flex gap-3">
          <span>↵ to select</span><span>esc to close</span>
        </div>
      </div>
    </div>
  )
}
