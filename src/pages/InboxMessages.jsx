import React, { useState } from 'react'
import { PageHeader, SearchInput, Button, fmtDate } from '../components/ui.jsx'
import { conversations } from '../data/db.js'

export default function InboxMessages() {
  const [sel, setSel] = useState(conversations[0]?._id)
  const [q, setQ] = useState('')
  const [reply, setReply] = useState('')
  const [threads, setThreads] = useState(Object.fromEntries(conversations.map(c => [c._id, [c.lastMessage]])))
  const cur = conversations.find(c => c._id === sel)
  const list = conversations.filter(c => (c.contact + c.lastMessage).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeader title="Inbox — Messages" />
      <div className="flex min-h-96 flex-1 gap-3">
        {/* liste conversations */}
        <div className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-card">
          <div className="border-b border-border p-2"><SearchInput value={q} onChange={setQ} placeholder="Search conversations..." /></div>
          <div className="flex-1 overflow-auto">
            {list.map(c => (
              <button key={c._id} onClick={() => setSel(c._id)}
                className={`flex w-full flex-col gap-0.5 border-b border-border px-3 py-2.5 text-left hover:bg-accent/50 ${c._id === sel ? 'bg-accent' : ''}`}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.contact}</span>
                  {c.unread && <span className="size-2 rounded-full bg-primary" />}
                </div>
                <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
                <div className="text-[10px] text-muted-foreground">{fmtDate(c.at)}</div>
              </button>
            ))}
            {list.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No conversations.</div>}
          </div>
        </div>
        {/* panneau thread */}
        <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-border bg-card">
          {!cur ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Select a conversation</div>
          ) : (
            <>
              <div className="flex h-(--size-control-md) items-center gap-2 border-b border-border bg-muted/60 px-3">
                <span className="text-sm font-medium">{cur.contact}</span>
                <span className="text-xs text-muted-foreground">· {cur.account}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 overflow-auto p-3">
                {(threads[cur._id] || []).map((m, i) => (
                  <div key={i} className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${i % 2 === 0 ? 'self-end bg-primary text-primary-foreground' : 'self-start bg-muted'}`}>{m}</div>
                ))}
              </div>
              <div className="flex gap-2 border-t border-border p-2">
                <input value={reply} onChange={e => setReply(e.target.value)} placeholder="Reply..."
                  onKeyDown={e => { if (e.key === 'Enter' && reply.trim()) { setThreads(t => ({ ...t, [cur._id]: [...(t[cur._id] || []), reply] })); setReply('') } }}
                  className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />
                <Button onClick={() => { if (reply.trim()) { setThreads(t => ({ ...t, [cur._id]: [...(t[cur._id] || []), reply] })); setReply('') } }}>Send</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
