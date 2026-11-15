import React, { useState } from 'react'
import { PageHeader, Section, DataTable, Button, SearchInput, StatusBadge, Modal } from '../components/ui.jsx'
import { automations } from '../data/db.js'

export default function Automations() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [list, setList] = useState(automations)
  const [toast, setToast] = useState(null)

  const rows = list.filter(a =>
    a.name.toLowerCase().includes(q.toLowerCase()) &&
    (status === 'All statuses' || a.status.toLowerCase() === status.toLowerCase()))

  const notify = (m) => { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Automations">
        <Button onClick={() => setCreating(true)}>+ New automation</Button>
      </PageHeader>

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput value={q} onChange={setQ} placeholder="Search automations..." />
        <Button variant="outline" size="sm" onClick={() => setStatus('All statuses')}>All areas ⌄</Button>
        <select value={status} onChange={e => setStatus(e.target.value)}
          className="h-7 rounded-md border border-border bg-card px-2 text-xs">
          {['All statuses', 'Published', 'Paused'].map(s => <option key={s}>{s}</option>)}
        </select>
        {q && <Button variant="ghost" size="sm" onClick={() => setQ('')}>Clear</Button>}
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name', render: a => <span className="font-medium">{a.name}</span> },
          { key: 'area', label: 'Area', render: a => <span className="capitalize text-muted-foreground">{a.area}</span> },
          { key: 'trigger', label: 'Trigger' },
          { key: 'action', label: 'Action' },
          { key: 'runs', label: 'Activity', render: a => <span className="text-muted-foreground">{a.runs.toLocaleString()} runs</span> },
          { key: 'status', label: 'Status', render: a => <StatusBadge status={a.status} /> },
          {
            key: 'actions', label: '', className: 'w-24 text-right',
            render: a => (
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="sm" onClick={() => notify(`Édition simulée : ${a.name}`)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => { setList(l => l.map(x => x._id === a._id ? { ...x, status: x.status === 'paused' ? 'published' : 'paused' } : x)); notify(a.status === 'paused' ? 'Automation réactivée' : 'Automation en pause') }}>
                  {a.status === 'paused' ? '▶' : '⏸'}
                </Button>
              </div>
            ),
          },
        ]}
        rows={rows}
        empty="No automations yet — create your first one."
      />

      <Modal open={creating} onClose={() => setCreating(false)} title="New automation"
        footer={<>
          <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
          <Button onClick={() => { if (!name.trim()) return; setList(l => [{ _id: 'a_' + Date.now(), name, area: 'messages', trigger: 'Manual', action: 'TBD', status: 'paused', runs: 0, updatedAt: new Date().toISOString() }, ...l]); setCreating(false); setName(''); notify('Automation créée (simulation)') }}>Create</Button>
        </>}>
        <label className="block mb-1 text-xs text-muted-foreground">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Welcome DM — nouveaux followers"
          className="w-full h-9 rounded-md border border-border bg-background px-3 outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />
        <p className="mt-2 text-xs text-muted-foreground">Trigger et action configurables après création (simulation).</p>
      </Modal>

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-lg border border-border bg-card px-4 py-2.5 text-sm shadow-xl">{toast}</div>
      )}
    </div>
  )
}
