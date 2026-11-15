import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const I = {
  home: <path d="M4 20h16v2H4zm16-10h2v10h-2zM2 10h2v10H2zm2-2h2v2H4zm2-2h2v2H6zm2-2h2v2H8zm2-2h4v2h-4zm4 2h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zM8 14h2v6H8zm2-2h4v2h-4zm4 2h2v6h-2z" />,
  connections: <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6z" />,
  posts: <path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h10v2H4zm0 5h7v2H4z" />,
  analytics: <path d="M4 20V10h3v10zm6.5 0V4h3v16zM17 20v-7h3v7z" />,
  inbox: <path d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm1 3v2h14V7zm14 4h-5a3 3 0 01-4 0H5v7h14z" />,
  ads: <path d="M3 10v4a1 1 0 001 1h3l6 4V5L7 9H4a1 1 0 00-1 1zm14.5-1.1a4 4 0 010 6.2l1.4 1.5a6 6 0 000-9.2z" />,
  automations: <path d="M13 2L4.5 12.5H11L9.5 22 19 10.5h-6.5z" />,
  commerce: <path d="M6 7h12l1.5 12.5a1 1 0 01-1 1.5h-13a1 1 0 01-1-1.5zm3 0a3 3 0 016 0M9 7V6a3 3 0 016 0v1" fill="none" strokeWidth="1.6" stroke="currentColor" />,
  creators: <path d="M12 3l2.5 5.5L20 9l-4 4 1 5.5-5-2.7-5 2.7L8 13 4 9l5.5-.5z" />,
  whatsapp: <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5 13.5c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-2.6-.9-4.3-2.5-5.5-4.7-.4-.7-.9-1.6-.8-2.4.1-.7.5-1.2 1-1.6.2-.2.4-.2.6-.2h.5c.2 0 .4 0 .5.4l.8 1.9c.1.2 0 .4-.1.6l-.4.5c-.1.2-.3.4-.1.7.5 1 1.5 2 2.5 2.5.3.2.5.1.7-.1l.6-.7c.2-.2.4-.2.6-.1l1.9.9c.3.2.4.3.4.5s0 .6-.4 1z" />,
  imessage: <path d="M12 3c5 0 9 3.1 9 7s-4 7-9 7c-.8 0-1.6-.1-2.3-.3C8.2 18.1 6 19.5 4 20c.7-1.2 1.1-2.4 1.2-3.6C3.8 15.2 3 13.7 3 12c0-3.9 4-7 9-7z" />,
  phone: <path d="M6.6 2.7l2.9 2.9c.4.4.4 1 0 1.4L7.9 8.6a1 1 0 00-.2 1.1 12.4 12.4 0 006.6 6.6 1 1 0 001.1-.2l1.6-1.6a1 1 0 011.4 0l2.9 2.9a1 1 0 010 1.4l-1.6 1.6c-1 1-2.5 1.3-3.8.8A17.4 17.4 0 013.8 8.1c-.5-1.3-.2-2.8.8-3.8l1.6-1.6a1 1 0 011.4 0z" />,
  apikeys: <path d="M14 2a6 6 0 00-5.7 7.9L2 16.2V20h3.8l1.2-1.2v-2h2v-2h2l1.3-1.3A6 6 0 1014 2zm2.5 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />,
  users: <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-7 1.7-7 4v3h14v-3c0-2.3-3.7-4-7-4zm8-2a3 3 0 100-6 3 3 0 000 6zm1 2.2c1.8.5 4 1.7 4 3.8v3h-4v-3c0-1.5-.7-2.7-1.7-3.6.6-.1 1.1-.2 1.7-.2z" />,
  webhooks: <path d="M12 3a4 4 0 013.9 3.1l2.5-.4a1 1 0 011.1.7l1 3a1 1 0 01-.5 1.2l-2.2 1.2a6.5 6.5 0 01-.7 1.7l1.4 2.1a1 1 0 01-.2 1.3l-2.3 2a1 1 0 01-1.3 0l-1.9-1.7a6.6 6.6 0 01-1.8 0L9.3 21a1 1 0 01-1.3.2l-2.3-2a1 1 0 01-.2-1.3l1.4-2.1a6.5 6.5 0 01-.7-1.7L4 13a1 1 0 01-.5-1.2l1-3a1 1 0 011.1-.7l2.5.4A4 4 0 0112 3zm0 5.5a3 3 0 100 6 3 3 0 000-6z" />,
  logs: <path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h16v2H4zm0 5h10v2H4z" />,
  settings: <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4a8 8 0 01-.2 1.7l2 1.6-2 3.4-2.4-1a8 8 0 01-2.9 1.7l-.3 2.6h-4l-.3-2.6a8 8 0 01-2.9-1.7l-2.4 1-2-3.4 2-1.6A8 8 0 013 12c0-.6.1-1.1.2-1.7l-2-1.6 2-3.4 2.4 1a8 8 0 012.9-1.7L8.8 2h4l.3 2.6a8 8 0 012.9 1.7l2.4-1 2 3.4-2 1.6c.1.6.2 1.1.2 1.7z" />,
}

function Icon({ d, className = 'size-4 shrink-0' }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" className={className}>{d}</svg>
}

function Chevron({ open }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-3.5 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} fill="currentColor" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const NAV = [
  { label: 'Home', to: '/dashboard/home', icon: I.home },
  { label: 'Connections', to: '/dashboard/connections', icon: I.connections },
  { label: 'Posts', to: '/dashboard/posts-all', icon: I.posts, children: [
    { label: 'All posts', to: '/dashboard/posts-all' },
    { label: 'Queue', to: '/dashboard/queue' },
    { label: 'Drafts', to: '/dashboard/drafts' },
  ] },
  { label: 'Analytics', to: '/dashboard/analytics-posting', icon: I.analytics, children: [
    { label: 'Posting', to: '/dashboard/analytics-posting' },
    { label: 'Audience', to: '/dashboard/analytics-audience' },
  ] },
  { label: 'Inbox', to: '/dashboard/inbox-messages', icon: I.inbox, children: [
    { label: 'Messages', to: '/dashboard/inbox-messages' },
    { label: 'Comments', to: '/dashboard/inbox-comments' },
  ] },
  { label: 'Ads', to: '/dashboard/ads-overview', icon: I.ads, children: [
    { label: 'Overview', to: '/dashboard/ads-overview' },
    { label: 'Campaigns', to: '/dashboard/ads-campaigns' },
  ] },
  { label: 'Automations', to: '/dashboard/automations', icon: I.automations },
  { label: 'Creators', to: '/dashboard/creator-campaigns', icon: I.creators },
  { label: 'Commerce', to: '/dashboard/commerce-products', icon: I.commerce },
  { label: 'Communications', icon: I.whatsapp, children: [
    { label: 'WhatsApp', to: '/dashboard/whatsapp-overview' },
    { label: 'iMessage', to: '/dashboard/imessage-overview' },
    { label: 'Phone numbers', to: '/dashboard/phone-numbers-overview' },
  ] },
  { label: 'Developers', icon: I.apikeys, children: [
    { label: 'API Keys', to: '/dashboard/api-keys' },
    { label: 'Webhooks', to: '/dashboard/webhooks' },
    { label: 'Logs', to: '/dashboard/logs' },
  ] },
  { label: 'Settings', to: '/dashboard/settings', icon: I.settings },
  { label: 'Users', to: '/dashboard/users', icon: I.users },
]

function NavItem({ item }) {
  const loc = useLocation()
  const [open, setOpen] = useState(() => item.children?.some(c => loc.pathname.includes(c.to)))
  const active = loc.pathname.includes(item.to || '')
  const label = (
    <span className="relative z-10 flex-1 truncate">{item.label}</span>
  )
  if (item.children) {
    return (
      <li data-sidebar="menu-item" className="group/menu-item relative">
        <button
          data-sidebar="menu-button" data-size="default" data-state={open ? 'open' : 'closed'}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent [&>svg]:size-4 [&>svg]:shrink-0">
          <Icon d={item.icon} />
          {label}
          <Chevron open={open} />
        </button>
        {open && (
          <ul data-sidebar="menu-sub" className="mx-3.5 flex min-w-0 flex-col gap-0.5 border-l border-sidebar-border px-2.5 py-0.5">
            {item.children.map(c => (
              <li key={c.to} data-sidebar="menu-sub-item">
                <NavLink to={c.to} data-sidebar="menu-sub-button" data-size="md" data-active={loc.pathname.includes(c.to)}
                  className="flex h-7 min-w-0 items-center gap-2 rounded-md px-2 text-sidebar-foreground outline-hidden hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium text-sm truncate">
                  {c.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }
  return (
    <li data-sidebar="menu-item" className="group/menu-item relative">
      <NavLink to={item.to} end={false}
        data-sidebar="menu-button" data-size="default" data-active={active}
        className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground">
        <Icon d={item.icon} />
        {label}
      </NavLink>
    </li>
  )
}

export default function Sidebar({ mobile = false }) {
  return (
    <div className={`group peer ${mobile ? 'block' : 'hidden'} text-sidebar-foreground lg:block`} data-state="expanded" data-variant="sidebar" data-side="left">
      <div className={`${mobile ? 'relative' : 'fixed inset-y-0'} z-10 w-(--sidebar-width) ${mobile ? 'flex' : 'hidden lg:flex'} left-0 top-0 h-full border-r border-sidebar-border`}>
        <div data-sidebar="sidebar" className="flex h-full w-full flex-col bg-sidebar">
          <div data-sidebar="header" className="flex h-(--size-shell-bar) shrink-0 items-center gap-2 px-3 border-b border-sidebar-border">
            <span className="size-4 shrink-0 rounded-full inline-block" style={{ background: 'var(--primary)' }} />
            <span className="text-sm font-semibold tracking-wide">STUDIO</span>
            <button className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">Switch
              <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            </button>
          </div>
          <div data-sidebar="content" className="flex min-h-0 flex-1 flex-col gap-1 overflow-auto p-2 [scrollbar-width:none]">
            <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-0.5">
              {NAV.map(item => <NavItem key={item.label} item={item} />)}
            </ul>
          </div>
          <div data-sidebar="footer" className="flex h-12 shrink-0 items-center gap-2 border-t border-sidebar-border px-3">
            <span className="size-6 rounded-full bg-muted inline-flex items-center justify-center text-[10px] font-medium">M</span>
            <span className="text-xs text-muted-foreground truncate">Account</span>
          </div>
        </div>
      </div>
    </div>
  )
}
