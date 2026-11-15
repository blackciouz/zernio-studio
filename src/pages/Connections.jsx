import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, DataTable, Button, StatusBadge, fmtDate } from '../components/ui.jsx'
import { accounts, platforms } from '../data/db.js'
import { useToast } from '../hooks/useToast'

const ICONS = { instagram: 'instagram', tiktok: 'tiktok', meta: 'meta', twitter: 'x', linkedin: 'linkedin', whatsapp: 'whatsapp' }

export default function Connections() {
  const notify = useToast()
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Connections" />

      <Section title="Connected">
        <DataTable
          columns={[
            { key: 'platform', label: 'Account', render: a => (
              <div className="flex items-center gap-2">
                {ICONS[a.platform] && <img src={`/assets/img/platform-logos/${ICONS[a.platform]}-icon.png`} className="size-5" alt={a.platform} />}
                <span className="font-medium">@{a.username}</span>
              </div>
            ) },
            { key: 'platform', label: 'Platform', render: a => <span className="capitalize">{a.platform}</span> },
            { key: 'health', label: 'Status', render: a => <StatusBadge status={a.health === 'healthy' ? 'connected' : a.health} /> },
            { key: 'connectedAt', label: 'Connected', render: a => <span className="text-muted-foreground">{fmtDate(a.connectedAt)}</span> },
          ]}
          rows={accounts}
        />
      </Section>

      <Section title="Connect a platform">
        <DataTable
          columns={[
            { key: 'name', label: 'Platform', render: p => <span className="font-medium">{p.name}</span> },
            { key: 'capabilities', label: 'Capabilities', render: p => <span className="text-muted-foreground">{p.capabilities.join(' · ')}</span> },
            { key: 'connect', label: '', className: 'w-28 text-right', render: p => <Button size="sm" onClick={() => notify(`OAuth connect ${p.name} (simulation)`)}>Connect</Button> },
          ]}
          rows={platforms}
        />
      </Section>

      <div className="flex justify-end">
        <Link to="/dashboard/posts-all" className="text-sm text-muted-foreground hover:text-foreground">Next: schedule a post →</Link>
      </div>
    </div>
  )
}
