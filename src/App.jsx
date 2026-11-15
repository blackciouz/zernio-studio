import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import CommandK from './components/CommandK.jsx'

import Home from './pages/Home.jsx'
import Connections from './pages/Connections.jsx'
import PostsAll from './pages/PostsAll.jsx'
import InboxMessages from './pages/InboxMessages.jsx'
import AnalyticsPosting from './pages/AnalyticsPosting.jsx'
import Automations from './pages/Automations.jsx'
import ApiKeys from './pages/ApiKeys.jsx'
import Webhooks from './pages/Webhooks.jsx'
import Settings from './pages/Settings.jsx'

const TITLES = {
  home: ['Home', '/dashboard/home'], connections: ['Connections', '/dashboard/connections'],
  'posts-all': ['Posts', '/dashboard/posts-all'], 'inbox-messages': ['Inbox', '/dashboard/inbox-messages'],
  'analytics-posting': ['Analytics', '/dashboard/analytics-posting'], automations: ['Automations', '/dashboard/automations'],
  'api-keys': ['API Keys', '/dashboard/api-keys'], webhooks: ['Webhooks', '/dashboard/webhooks'],
  settings: ['Settings', '/dashboard/settings'],
}

function Topbar({ onOpenSearch }) {
  const loc = useLocation()
  const nav = useNavigate()
  const seg = loc.pathname.split('/').filter(Boolean).slice(1).join(' / ') || 'home'
  return (
    <header className="flex h-(--size-shell-bar) shrink-0 items-center gap-2 border-b border-border bg-background px-3">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground min-w-0">
        <button onClick={() => nav('/dashboard/home')} className="hover:text-foreground truncate">Studio</button>
        <span className="opacity-50">/</span>
        <span className="text-foreground font-medium truncate">{TITLES[seg] ? TITLES[seg][0] : seg}</span>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button onClick={onOpenSearch}
          className="flex h-8 w-56 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-sm text-muted-foreground hover:bg-accent">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          Search...
          <kbd className="ml-auto rounded border border-border bg-muted px-1.5 text-[10px]">⌘K</kbd>
        </button>
        <a href="#" className="h-8 px-2.5 inline-flex items-center rounded-md text-sm hover:bg-accent">Docs</a>
        <a href="#" className="h-8 px-2.5 inline-flex items-center rounded-md text-sm hover:bg-accent">Support</a>
      </div>
    </header>
  )
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(v => !v) } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])
  return (
    <div className="flex w-full h-[100dvh] min-h-0 overflow-hidden bg-background text-foreground" data-surface="dashboard" style={{ '--sidebar-width': '16rem' }}>
      <Sidebar />
      <main className="relative flex w-full min-w-0 flex-1 flex-col bg-background">
        <Topbar onOpenSearch={() => setSearchOpen(true)} />
        <div className="scrollbar-subtle flex min-h-0 flex-1 flex-col overflow-y-auto p-(--size-page-gutter)">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/home" element={<Home />} />
            <Route path="/dashboard/connections" element={<Connections />} />
            <Route path="/dashboard/posts-all" element={<PostsAll />} />
            <Route path="/dashboard/inbox-messages" element={<InboxMessages />} />
            <Route path="/dashboard/analytics-posting" element={<AnalyticsPosting />} />
            <Route path="/dashboard/automations" element={<Automations />} />
            <Route path="/dashboard/api-keys" element={<ApiKeys />} />
            <Route path="/dashboard/webhooks" element={<Webhooks />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      <CommandK open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
