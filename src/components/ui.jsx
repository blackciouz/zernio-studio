import React, { useState } from 'react'

export function Button({ children, variant = 'default', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50'
  const v = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-border bg-card hover:bg-accent',
    ghost: 'hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  }[variant]
  const s = { sm: 'h-7 px-2.5 text-xs', md: 'h-8 px-3 text-sm', lg: 'h-9 px-4 text-sm' }[size]
  return <button className={`${base} ${v} ${s} ${className}`} {...props}>{children}</button>
}

export function PageHeader({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  )
}

export function Section({ title, actions, children, className = '' }) {
  return (
    <section data-slot="section" className={`rounded-lg border border-border bg-card ${className}`}>
      <div data-slot="section-bar" className="flex h-(--size-control-md) items-center justify-between gap-3 border-b border-border bg-muted/60 px-3">
        <h2 className="type-eyebrow truncate">{title}</h2>
        {actions && <div className="flex items-center gap-1.5">{actions}</div>}
      </div>
      <div className="p-2">{children}</div>
    </section>
  )
}

const STATUS_COLORS = {
  published: 'text-emerald-600 bg-emerald-500/10',
  connected: 'text-emerald-600 bg-emerald-500/10',
  active: 'text-emerald-600 bg-emerald-500/10',
  healthy: 'text-emerald-600 bg-emerald-500/10',
  scheduled: 'text-blue-600 bg-blue-500/10',
  draft: 'text-muted-foreground bg-muted',
  paused: 'text-amber-600 bg-amber-500/10',
  expired: 'text-amber-600 bg-amber-500/10',
  failed: 'text-red-600 bg-red-500/10',
  needs_reauth: 'text-amber-600 bg-amber-500/10',
}

export function StatusBadge({ status }) {
  const color = STATUS_COLORS[(status || '').toLowerCase()] || 'text-muted-foreground bg-muted'
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium capitalize ${color}`}>{status}</span>
}

export function DataTable({ columns, rows, empty = 'Nothing here yet.' }) {
  if (!rows.length) return <div className="py-10 text-center text-sm text-muted-foreground">{empty}</div>
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map(c => <th key={c.key} className={`px-3 py-2 type-eyebrow ${c.className || ''}`}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r._id || i} className="border-b border-border last:border-b-0 hover:bg-accent/50">
              {columns.map(c => <td key={c.key} className={`px-3 py-2 ${c.className || ''}`}>{c.render ? c.render(r, i) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-64">
      <svg viewBox="0 0 24 24" className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <input value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}
        className="h-8 w-full rounded-md border border-border bg-card pl-7 pr-2 text-sm outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />
    </div>
  )
}

export function FilterSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-sm hover:bg-accent">
        {label}: <span className="text-muted-foreground">{value}</span>
        <svg viewBox="0 0 24 24" className="size-3 text-muted-foreground" fill="currentColor"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-1 min-w-36 rounded-md border border-border bg-popover p-1 shadow-lg">
            {options.map(o => (
              <button key={o} onClick={() => { onChange?.(o); setOpen(false) }}
                className={`flex w-full items-center rounded px-2 py-1.5 text-left text-sm hover:bg-accent ${o === value ? 'font-medium' : ''}`}>{o}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-accent text-muted-foreground">✕</button>
        </div>
        <div className="text-sm">{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}

export function fmtDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
