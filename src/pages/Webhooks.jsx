import React, { useState } from 'react'
import { PageHeader, Section, Button, DataTable } from '../components/ui.jsx'
import { webhooks } from '../data/db.js'
import { useToast } from '../hooks/useToast'

const EVENTS = ['post.published', 'post.failed', 'post.scheduled', 'message.received', 'account.connected', 'account.disconnected']

export default function Webhooks() {
  const [hooks, setHooks] = useState(webhooks)
  const [sel, setSel] = useState(hooks[0]?._id)
  const cur = hooks.find(h => h._id === sel)
  const notify = useToast()
  const toggleEvent = (ev) => {
    setHooks(l => l.map(h => h._id === sel ? { ...h, events: h.events.includes(ev) ? h.events.filter(e => e !== ev) : [...h.events, ev] } : h))
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Webhooks">
        <Button onClick={() => notify('Ajout d\'un endpoint webhook (simulation)')}>+ Add endpoint</Button>
      </PageHeader>

      <Section title="Endpoints">
        <DataTable
          columns={[
            { key: 'url', label: 'URL', render: h => <code className="font-mono text-xs">{h.url}</code> },
            { key: 'events', label: 'Events', render: h => <span className="text-muted-foreground">{h.events.length} subscribed</span> },
            { key: 'status', label: 'Status', render: h => <span className="text-xs font-medium text-emerald-600 capitalize">{h.status}</span> },
            { key: 'successRate', label: 'Success', render: h => <span className="text-muted-foreground">{h.successRate}</span> },
            { key: 'sel', label: '', className: 'w-20 text-right', render: h => (
              <Button size="sm" variant={h._id === sel ? 'secondary' : 'ghost'} onClick={() => setSel(h._id)}>{h._id === sel ? 'Selected' : 'Select'}</Button>
            ) },
          ]}
          rows={hooks}
        />
      </Section>

      {cur && (
        <Section title={`Events — ${cur.url}`}>
          <div className="flex flex-wrap gap-2 p-2">
            {EVENTS.map(ev => (
              <button key={ev} onClick={() => toggleEvent(ev)}
                className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${cur.events.includes(ev) ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:bg-accent'}`}>
                {cur.events.includes(ev) ? '✓ ' : '+ '}{ev}
              </button>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
