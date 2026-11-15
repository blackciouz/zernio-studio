// Données simulées — formes dérivées des schémas OpenAPI Zernio (v1.611.2)
export const profile = {
  _id: '6af8f110782e7eac06d383fa', name: 'Default', isDefault: true,
  color: '#ffeda0', timezone: null, externalId: null, contentRetention: 'standard',
  accountCount: 3, accountUsernames: ['@zernio.studio', '@studio.clips', '@daily.hooks'],
}

export const user = {
  id: '6af8f0f3782e7eac06d382e3', email: 'medodjai6@gmail.com', role: 'owner',
  planName: 'Usage', hasPaidPlan: false, billingSystem: 'metronome', billingPeriod: 'monthly',
  planLimits: { uploads: -1, profiles: -1, postsPerDayPerAccount: 1 },
  createdAt: '2026-11-14T23:38:27.543Z',
}

export const accounts = [
  { _id: 'acc_001', platform: 'instagram', username: 'zernio.studio', status: 'connected', connectedAt: '2026-11-15T09:12:00Z', health: 'healthy' },
  { _id: 'acc_002', platform: 'tiktok', username: 'studio.clips', status: 'connected', connectedAt: '2026-11-15T09:15:00Z', health: 'healthy' },
  { _id: 'acc_003', platform: 'youtube', username: 'Daily Hooks', status: 'connected', connectedAt: '2026-11-15T09:20:00Z', health: 'healthy' },
  { _id: 'acc_004', platform: 'twitter', username: 'zernio_studio', status: 'expired', connectedAt: '2026-11-10T18:00:00Z', health: 'needs_reauth' },
]

export const posts = [
  { _id: 'p_001', content: 'Lundi motivation — 3 hooks qui arrêtent le scroll 🧵', status: 'published', platforms: ['instagram', 'threads'], scheduledFor: '2026-11-15T09:00:00Z', publishedAt: '2026-11-15T09:00:12Z', analytics: { impressions: 12400, likes: 842, comments: 63, shares: 118 } },
  { _id: 'p_002', content: 'Teaser produit : la nouvelle interface (15s)', status: 'published', platforms: ['tiktok'], scheduledFor: '2026-11-14T18:30:00Z', publishedAt: '2026-11-14T18:30:05Z', analytics: { impressions: 8930, likes: 512, comments: 41, shares: 87 } },
  { _id: 'p_003', content: 'Thread X — 5 leçons d’automatisation de contenu', status: 'scheduled', platforms: ['twitter'], scheduledFor: '2026-11-16T08:00:00Z', analytics: null },
  { _id: 'p_004', content: 'Reel launch — coulisses du studio', status: 'scheduled', platforms: ['instagram'], scheduledFor: '2026-11-16T12:30:00Z', analytics: null },
  { _id: 'p_005', content: 'Citation du jour + CTA bio', status: 'draft', platforms: [], scheduledFor: null, analytics: null },
  { _id: 'p_006', content: 'Promo week-end -20% (stories + post)', status: 'failed', platforms: ['instagram', 'facebook'], scheduledFor: '2026-11-13T10:00:00Z', analytics: null, failureReason: 'Instagram rate limit — retry automatique programmé' },
]

export const automations = [
  { _id: 'a_001', name: 'Welcome DM — nouveaux followers', area: 'messages', trigger: 'Nouveau follower Instagram', action: 'Envoyer un DM de bienvenue', status: 'published', runs: 1284, updatedAt: '2026-11-14T20:11:00Z' },
  { _id: 'a_002', name: 'Comment auto-reply — prix', area: 'comments', trigger: 'Commentaire contenant "prix"', action: 'Répondre avec le lien tarif', status: 'published', runs: 642, updatedAt: '2026-11-14T19:02:00Z' },
  { _id: 'a_003', name: 'Recycle top posts (90j)', area: 'posts', trigger: 'Post > 10k impressions et > 90j', action: 'Reprogrammer en queue', status: 'paused', runs: 88, updatedAt: '2026-11-12T14:40:00Z' },
  { _id: 'a_004', name: 'Alerte post échoué → Slack', area: 'events', trigger: 'post.failed webhook', action: 'Notifier #studio-alerts', status: 'published', runs: 12, updatedAt: '2026-11-10T11:15:00Z' },
]

export const apiKeys = [
  { _id: 'k_001', name: 'Default Key', keyPreview: 'sk_d72ce...bb0b77c3', scope: 'full', permission: 'read-write', createdAt: '2026-11-14T23:38:56.200Z', isActive: true },
]

export const webhooks = [
  { _id: 'w_001', url: 'https://hooks.clonesxstudio.com/zernio', events: ['post.published', 'post.failed', 'message.received'], status: 'active', lastDelivery: '2026-11-15T09:00:14Z', successRate: '99.2%' },
]

export const conversations = [
  { _id: 'c_001', account: 'instagram/zernio.studio', contact: '@lea.creates', lastMessage: 'Merci pour le reply 🙏', direction: 'in', at: '2026-11-15T10:02:00Z', unread: true },
  { _id: 'c_002', account: 'tiktok/studio.clips', contact: '@hooksdaily', lastMessage: 'Vous utilisez quel preset ?', direction: 'in', at: '2026-11-15T09:41:00Z', unread: true },
  { _id: 'c_003', account: 'instagram/zernio.studio', contact: '@marc.vids', lastMessage: 'On collab sur le prochain ?', direction: 'out', at: '2026-11-14T17:20:00Z', unread: false },
]

export const platforms = [
  { name: 'Instagram', capabilities: ['Post', 'Stories', 'Analytics', 'Inbox'], icon: 'instagram' },
  { name: 'TikTok', capabilities: ['Post', 'Analytics', 'Comments'], icon: 'tiktok' },
  { name: 'X (Twitter)', capabilities: ['Post', 'Analytics', 'Inbox'], icon: 'x' },
  { name: 'LinkedIn', capabilities: ['Post', 'Partial Analytics'], icon: 'linkedin' },
  { name: 'Meta (Facebook)', capabilities: ['Post', 'Stories', 'Analytics', 'Inbox'], icon: 'meta' },
  { name: 'YouTube', capabilities: ['Post', 'Shorts', 'Analytics'], icon: null },
  { name: 'WhatsApp', capabilities: ['Post', 'Messages'], icon: 'whatsapp' },
  { name: 'Threads', capabilities: ['Post', 'Analytics', 'Inbox'], icon: null },
  { name: 'Pinterest', capabilities: ['Post', 'Analytics'], icon: null },
  { name: 'Bluesky', capabilities: ['Post', 'Partial Analytics', 'Inbox'], icon: null },
  { name: 'Google Business', capabilities: ['Post', 'Reviews'], icon: null },
  { name: 'Telegram', capabilities: ['Post'], icon: null },
  { name: 'Snapchat', capabilities: ['Post (beta fermée)'], icon: null },
  { name: 'Discord', capabilities: ['Post'], icon: null },
  { name: 'Slack', capabilities: ['Post'], icon: null },
]
