import React, { useState } from 'react'
import { PageHeader, Section, Button } from '../components/ui.jsx'
import { user } from '../data/db.js'
import { useToast } from '../hooks/useToast'

function Field({ label, value, onSave }) {
  const [v, setV] = useState(value)
  const [saved, setSaved] = useState(false)
  return (
    <div className="flex items-center justify-between gap-3 p-2">
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <input value={v} onChange={e => setV(e.target.value)}
          className="mt-0.5 h-8 w-full max-w-sm rounded-md border border-border bg-background px-2.5 text-sm outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      <Button size="sm" onClick={() => { onSave?.(v); setSaved(true); setTimeout(() => setSaved(false), 1500) }}>{saved ? 'Saved ✓' : 'Save'}</Button>
    </div>
  )
}

export default function Settings() {
  const [dark, setDark] = useState(false)
  const [prefs, setPrefs] = useState({ usageAlerts: true, postFailures: true, accountIssues: true, paymentAlerts: true, marketingEmails: false })
  const notify = useToast()
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <PageHeader title="Settings" />

      <Section title="Profile">
        <Field label="Display name" value="Mikki" />
        <Field label="Email" value={user.email} onSave={() => {}} />
        <Field label="Timezone" value="Africa/Porto-Novo (GMT+1)" />
      </Section>

      <Section title="Appearance">
        <div className="flex items-center justify-between p-2">
          <div>
            <div className="text-sm font-medium">Dark theme</div>
            <div className="text-xs text-muted-foreground">Apply a dark look to the dashboard</div>
          </div>
          <button onClick={() => setDark(!dark)} className={`h-6 w-10 rounded-full p-0.5 transition-colors ${dark ? 'bg-primary' : 'bg-muted border border-border'}`}>
            <span className={`block size-5 rounded-full bg-white shadow transition-transform ${dark ? 'translate-x-4' : ''}`} />
          </button>
        </div>
      </Section>

      <Section title="Notifications">
        <div className="flex flex-col">
          {Object.entries(prefs).map(([k, v]) => (
            <label key={k} className="flex cursor-pointer items-center justify-between border-b border-border px-2 py-2 last:border-b-0">
              <span className="text-sm capitalize">{k.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
              <input type="checkbox" checked={v} onChange={() => setPrefs(p => ({ ...p, [k]: !p[k] }))} className="size-4 accent-[var(--primary)]" />
            </label>
          ))}
        </div>
      </Section>

      <Section title="Plan">
        <div className="flex items-center justify-between p-2">
          <div>
            <div className="text-sm font-medium">{user.planName} · {user.billingPeriod}</div>
            <div className="text-xs text-muted-foreground">First 2 connected accounts free · $6/account 3-10 · $3/account 11-100 · $1/account 101+</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => notify('Upgrade (simulation)')}>Manage billing</Button>
        </div>
      </Section>
    </div>
  )
}
