export interface MockService {
  name: string
  status: 'running' | 'stopped'
  health: 'healthy' | 'unhealthy' | 'starting' | 'none'
  disabled?: boolean
}

export interface MockInstance {
  name: string
  status: 'healthy' | 'degraded' | 'stopped'
  services: MockService[]
  cpu: number
  memoryMB: number
  memoryTotalMB: number
  network: { rx: number; tx: number }
  createdAt: string
  kongPort: number
  studioPort: number
}

export const MOCK_INSTANCES: MockInstance[] = [
  {
    name: 'production',
    status: 'healthy',
    cpu: 14.2,
    memoryMB: 1842,
    memoryTotalMB: 4096,
    network: { rx: 2.4, tx: 0.8 },
    createdAt: '2025-12-01T10:00:00Z',
    kongPort: 8000,
    studioPort: 3001,
    services: [
      { name: 'kong', status: 'running', health: 'none' },
      { name: 'auth', status: 'running', health: 'healthy' },
      { name: 'rest', status: 'running', health: 'healthy' },
      { name: 'realtime', status: 'running', health: 'healthy' },
      { name: 'storage', status: 'running', health: 'healthy' },
      { name: 'studio', status: 'running', health: 'healthy' },
      { name: 'db', status: 'running', health: 'none' },
      { name: 'meta', status: 'running', health: 'healthy' },
      { name: 'analytics', status: 'stopped', health: 'none', disabled: true },
      { name: 'imgproxy', status: 'stopped', health: 'none', disabled: true },
    ],
  },
  {
    name: 'staging',
    status: 'healthy',
    cpu: 3.8,
    memoryMB: 1204,
    memoryTotalMB: 4096,
    network: { rx: 0.3, tx: 0.1 },
    createdAt: '2026-01-15T14:30:00Z',
    kongPort: 8100,
    studioPort: 3101,
    services: [
      { name: 'kong', status: 'running', health: 'none' },
      { name: 'auth', status: 'running', health: 'healthy' },
      { name: 'rest', status: 'running', health: 'healthy' },
      { name: 'realtime', status: 'running', health: 'healthy' },
      { name: 'storage', status: 'running', health: 'healthy' },
      { name: 'studio', status: 'running', health: 'healthy' },
      { name: 'db', status: 'running', health: 'none' },
      { name: 'meta', status: 'running', health: 'healthy' },
      { name: 'analytics', status: 'stopped', health: 'none', disabled: true },
      { name: 'imgproxy', status: 'stopped', health: 'none', disabled: true },
    ],
  },
  {
    name: 'dev-01',
    status: 'healthy',
    cpu: 1.1,
    memoryMB: 942,
    memoryTotalMB: 4096,
    network: { rx: 0.05, tx: 0.02 },
    createdAt: '2026-03-20T09:15:00Z',
    kongPort: 8200,
    studioPort: 3201,
    services: [
      { name: 'kong', status: 'running', health: 'none' },
      { name: 'auth', status: 'running', health: 'healthy' },
      { name: 'rest', status: 'running', health: 'healthy' },
      { name: 'realtime', status: 'stopped', health: 'none', disabled: true },
      { name: 'storage', status: 'running', health: 'healthy' },
      { name: 'studio', status: 'running', health: 'healthy' },
      { name: 'db', status: 'running', health: 'none' },
      { name: 'meta', status: 'running', health: 'healthy' },
      { name: 'analytics', status: 'stopped', health: 'none', disabled: true },
      { name: 'imgproxy', status: 'stopped', health: 'none', disabled: true },
    ],
  },
  {
    name: 'client-acme',
    status: 'degraded',
    cpu: 8.5,
    memoryMB: 1560,
    memoryTotalMB: 4096,
    network: { rx: 1.1, tx: 0.3 },
    createdAt: '2026-02-08T16:00:00Z',
    kongPort: 8300,
    studioPort: 3301,
    services: [
      { name: 'kong', status: 'running', health: 'none' },
      { name: 'auth', status: 'running', health: 'healthy' },
      { name: 'rest', status: 'running', health: 'healthy' },
      { name: 'realtime', status: 'running', health: 'unhealthy' },
      { name: 'storage', status: 'running', health: 'healthy' },
      { name: 'studio', status: 'running', health: 'healthy' },
      { name: 'db', status: 'running', health: 'none' },
      { name: 'meta', status: 'running', health: 'healthy' },
      { name: 'analytics', status: 'stopped', health: 'none', disabled: true },
      { name: 'imgproxy', status: 'running', health: 'healthy' },
    ],
  },
  {
    name: 'archive-2025',
    status: 'stopped',
    cpu: 0,
    memoryMB: 0,
    memoryTotalMB: 4096,
    network: { rx: 0, tx: 0 },
    createdAt: '2025-06-01T08:00:00Z',
    kongPort: 8400,
    studioPort: 3401,
    services: [
      { name: 'kong', status: 'stopped', health: 'none' },
      { name: 'auth', status: 'stopped', health: 'none' },
      { name: 'rest', status: 'stopped', health: 'none' },
      { name: 'realtime', status: 'stopped', health: 'none' },
      { name: 'storage', status: 'stopped', health: 'none' },
      { name: 'studio', status: 'stopped', health: 'none' },
      { name: 'db', status: 'stopped', health: 'none' },
      { name: 'meta', status: 'stopped', health: 'none' },
    ],
  },
]

export const MOCK_CPU_HISTORY = Array.from({ length: 20 }, (_, i) => ({
  t: i,
  production: Math.max(0, 14 + (Math.sin(i * 0.7) * 6) + (Math.random() - 0.5) * 3),
  staging: Math.max(0, 3.8 + (Math.sin(i * 0.4) * 2) + (Math.random() - 0.5) * 1),
  'dev-01': Math.max(0, 1.1 + (Math.random() - 0.5) * 0.5),
  'client-acme': Math.max(0, 8.5 + (Math.sin(i * 0.9) * 4) + (Math.random() - 0.5) * 2),
}))

export const MOCK_LOGS: Record<string, string[]> = {
  production: [
    '2026-05-07T10:23:44Z [kong] kong started',
    '2026-05-07T10:23:45Z [auth] GoTrue started',
    '2026-05-07T10:23:46Z [rest] PostgREST listening on :3000',
    '2026-05-07T10:24:01Z [realtime] Connected to DB',
    '2026-05-07T10:25:12Z [auth] User login: user@example.com',
    '2026-05-07T10:25:13Z [rest] GET /rest/v1/users 200 12ms',
    '2026-05-07T10:25:14Z [rest] POST /rest/v1/orders 201 34ms',
    '2026-05-07T10:26:00Z [storage] PUT /storage/v1/object/avatars/abc.png 200',
    '2026-05-07T10:27:33Z [realtime] Broadcast: channel=orders event=INSERT',
    '2026-05-07T10:28:01Z [rest] GET /rest/v1/orders?select=* 200 8ms',
  ],
  staging: [
    '2026-05-07T09:00:00Z [kong] kong started',
    '2026-05-07T09:00:01Z [auth] GoTrue started',
    '2026-05-07T09:00:02Z [rest] PostgREST listening on :3000',
    '2026-05-07T10:10:44Z [rest] GET /rest/v1/profiles 200 6ms',
    '2026-05-07T10:11:05Z [auth] User login: dev@example.com',
  ],
}
