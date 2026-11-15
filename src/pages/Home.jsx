import React from 'react'
import { Link } from 'react-router-dom'
import { Section, Button } from '../components/ui.jsx'

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center pt-6">
        <h1 className="text-2xl font-semibold tracking-tight">One connection. Zernio runs every channel.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Connect your accounts, then publish, schedule and automate from one dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold">Connect your accounts</span>
            <img src="/assets/img/images/pointinghand.svg" alt="" className="size-4" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">Link Instagram, TikTok, YouTube, X, LinkedIn, Facebook, Threads and more. Each connected account unlocks publishing, analytics and inbox.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {['instagram', 'tiktok', 'meta', 'x', 'linkedin', 'whatsapp'].map(p => (
              <img key={p} src={`/assets/img/platform-logos/${p}-icon.png`} alt={p} className="size-8 rounded-md border border-border bg-white p-1" />
            ))}
          </div>
          <Link to="/dashboard/connections"><Button>Connect a platform</Button></Link>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <span className="text-sm font-semibold">Quickstart — MCP</span>
          <div className="mt-3 rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-zinc-300">
            <div><span className="text-zinc-500">$</span> npx -y zernio-mcp@latest</div>
            <div className="text-zinc-500"># then connect Claude, Cursor, Codex…</div>
            <div><span className="text-zinc-500">›</span> endpoint: mcp.zernio.com/mcp</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Or use the REST API with a Bearer key from API Keys.</p>
          <div className="mt-4 flex gap-2">
            <Link to="/dashboard/api-keys"><Button variant="outline">Create API key</Button></Link>
            <Link to="/dashboard/automations"><Button variant="ghost">Explore automations</Button></Link>
          </div>
        </div>
      </div>

      <Section title="Getting started">
        <div className="grid gap-3 p-2 sm:grid-cols-3">
          {[
            { n: 1, t: 'Create a profile', d: 'Organize accounts into brands or projects.', to: '/dashboard/connections' },
            { n: 2, t: 'Schedule your first post', d: 'One POST /v1/posts publishes everywhere.', to: '/dashboard/posts-all' },
            { n: 3, t: 'Automate engagement', d: 'Workflows on DMs, comments and events.', to: '/dashboard/automations' },
          ].map(s => (
            <Link key={s.n} to={s.to} className="group rounded-md border border-border p-3 hover:bg-accent/50">
              <div className="mb-1 inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{s.n}</div>
              <div className="text-sm font-medium">{s.t}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.d}</div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}
