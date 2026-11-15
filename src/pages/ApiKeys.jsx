import React, { useState } from 'react'
import { PageHeader, DataTable, Button, Modal } from '../components/ui.jsx'
import { apiKeys } from '../data/db.js'

export default function ApiKeys() {
  const [list, setList] = useState(apiKeys)
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [scope, setScope] = useState('full')
  const [permission, setPermission] = useState('read-write')
  const [newKey, setNewKey] = useState(null)
  const [copied, setCopied] = useState(false)
  const [reveal, setReveal] = useState(false)

  const handleCreate = () => {
    if (!name.trim()) return
    const k = 'sk_' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
    setList(l => [{ _id: 'k_' + Date.now(), name, keyPreview: k.slice(0, 8) + '...' + k.slice(-4), fullKey: k, scope, permission, isActive: true, createdAt: new Date().toISOString() }, ...l])
    setNewKey(k)
    setReveal(true)
    setCreating(false)
    setName('')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="API Keys">
        <Button onClick={() => setCreating(true)}>+ Create API key</Button>
      </PageHeader>

      <DataTable
        columns={[
          { key: 'name', label: 'Name', render: k => <span className="font-medium">{k.name}</span> },
          { key: 'createdAt', label: 'Created', render: k => <span className="text-muted-foreground">{k.createdAt ? new Date(k.createdAt).toLocaleDateString() : '—'}</span> },
          { key: 'scope', label: 'Scope', render: k => <span className="capitalize">{k.scope}</span> },
          { key: 'permission', label: 'Permission', render: k => <span className="capitalize text-muted-foreground">{k.permission}</span> },
          { key: 'isActive', label: 'Status', render: k => <span className={`text-xs font-medium ${k.isActive ? 'text-emerald-600' : 'text-muted-foreground'}`}>{k.isActive ? 'Active' : 'Disabled'}</span> },
          { key: 'actions', label: '', className: 'w-24 text-right', render: k => (
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard?.writeText(k.keyPreview); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? 'Copié ✓' : 'Copy'}</Button>
              <Button variant="ghost" size="sm" onClick={() => { setList(l => l.map(x => x._id === k._id ? { ...x, isActive: !x.isActive } : x)) }}>{k.isActive ? 'Disable' : 'Enable'}</Button>
            </div>
          ) },
        ]}
        rows={list}
      />

      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        Use keys with <code className="rounded bg-muted px-1.5 font-mono text-xs">Authorization: Bearer &lt;key&gt;</code> against <code className="rounded bg-muted px-1.5 font-mono text-xs">https://zernio.com/api/v1</code>.
      </div>

      <Modal open={creating} onClose={() => setCreating(false)} title="Create API key"
        footer={<>
          <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </>}>
        <label className="block mb-1 text-xs text-muted-foreground">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: production-app"
          className="w-full h-9 rounded-md border border-border bg-background px-3 mb-4 outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />
        <label className="block mb-1 text-xs text-muted-foreground">Scope</label>
        <select value={scope} onChange={e => setScope(e.target.value)} className="w-full h-9 rounded-md border border-border bg-background px-3 mb-4">
            <option value="full">Full access</option>
            <option value="specific">Specific profiles</option>
        </select>
        <label className="block mb-1 text-xs text-muted-foreground">Permission</label>
        <select value={permission} onChange={e => setPermission(e.target.value)} className="w-full h-9 rounded-md border border-border bg-background px-3">
            <option value="read-write">Read & write</option>
            <option value="read-only">Read only</option>
        </select>
      </Modal>

      <Modal open={reveal} onClose={() => setReveal(false)} title="Save your API key"
        footer={<Button onClick={() => setReveal(false)}>Done</Button>}>
        <p className="mb-2 text-sm text-muted-foreground">Copy it now — you won't be able to see it again.</p>
        <code className="block break-all rounded-md bg-muted p-3 font-mono text-xs mb-4">{newKey}</code>
        <Button onClick={() => { navigator.clipboard?.writeText(newKey); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? 'Copié ✓' : 'Copy'}</Button>
      </Modal>
    </div>
  )
}
