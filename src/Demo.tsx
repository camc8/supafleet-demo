import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_INSTANCES, MOCK_LOGS } from './mockData'
import type { MockInstance } from './mockData'

type Tab = 'services' | 'logs' | 'metrics'

function statusDot(status: string) {
  if (status === 'healthy' || status === 'running') return <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
  if (status === 'degraded') return <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
  if (status === 'unhealthy') return <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
  return <span className="inline-block w-2 h-2 rounded-full bg-gray-600" />
}

function healthBadge(health: string, status: string) {
  if (status === 'stopped') return <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">stopped</span>
  if (health === 'healthy') return <span className="text-xs text-gray-300 bg-gray-800 px-2 py-0.5 rounded">healthy</span>
  if (health === 'unhealthy') return <span className="text-xs text-red-300 bg-red-900/40 px-2 py-0.5 rounded">unhealthy</span>
  if (health === 'none') return <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">running</span>
  return <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{health}</span>
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full bg-gray-400 rounded-full" style={{ width: `${pct}%` }} />
    </div>
  )
}

function InstanceCard({ instance, onClick }: { instance: MockInstance; onClick: () => void }) {
  const runningCount = instance.services.filter(s => s.status === 'running').length
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors bg-gray-900"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {statusDot(instance.status)}
          <span className="text-sm font-medium text-gray-100 font-mono">{instance.name}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${
          instance.status === 'healthy' ? 'text-green-300 bg-green-900/30' :
          instance.status === 'degraded' ? 'text-yellow-300 bg-yellow-900/30' :
          'text-gray-400 bg-gray-800'
        }`}>{instance.status}</span>
      </div>
      {instance.status !== 'stopped' ? (
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>CPU</span><span className="text-gray-300">{instance.cpu.toFixed(1)}%</span>
            </div>
            <MiniBar value={instance.cpu} max={100} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Memory</span><span className="text-gray-300">{(instance.memoryMB / 1024).toFixed(1)} GB</span>
            </div>
            <MiniBar value={instance.memoryMB} max={instance.memoryTotalMB} />
          </div>
          <div className="text-xs text-gray-500 pt-1">{runningCount} services running</div>
        </div>
      ) : (
        <div className="text-xs text-gray-600 mt-2">All services stopped</div>
      )}
    </button>
  )
}

function InstanceDetail({ instance, onBack }: { instance: MockInstance; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('services')
  const logs = MOCK_LOGS[instance.name] || ['No logs available for this instance.']

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">← Back</button>
        <div className="flex items-center gap-2">
          {statusDot(instance.status)}
          <span className="text-base font-medium text-gray-100 font-mono">{instance.name}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ml-1 ${
          instance.status === 'healthy' ? 'text-green-300 bg-green-900/30' :
          instance.status === 'degraded' ? 'text-yellow-300 bg-yellow-900/30' :
          'text-gray-400 bg-gray-800'
        }`}>{instance.status}</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="text-xs border border-gray-700 text-gray-400 px-2.5 py-1 rounded hover:bg-gray-800 transition-colors" onClick={() => alert('Demo only — no real instance to stop')}>Stop</button>
          <a
            href="#"
            onClick={e => { e.preventDefault(); alert('Demo only — Studio is at {name}.db.yourdomain.com/studio on a real deployment') }}
            className="text-xs border border-gray-700 text-gray-400 px-2.5 py-1 rounded hover:bg-gray-800 transition-colors"
          >
            Open Studio ↗
          </a>
        </div>
      </div>

      {/* Metrics strip */}
      {instance.status !== 'stopped' && (
        <div className="border-b border-gray-800 px-6 py-3 flex gap-8">
          {[
            { label: 'CPU', value: `${instance.cpu.toFixed(1)}%` },
            { label: 'Memory', value: `${(instance.memoryMB / 1024).toFixed(1)} / ${(instance.memoryTotalMB / 1024).toFixed(0)} GB` },
            { label: 'Network ↓', value: `${instance.network.rx.toFixed(1)} MB/s` },
            { label: 'Network ↑', value: `${instance.network.tx.toFixed(1)} MB/s` },
          ].map(m => (
            <div key={m.label}>
              <div className="text-xs text-gray-500 mb-0.5">{m.label}</div>
              <div className="text-sm text-gray-200 font-mono">{m.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-800 px-6 flex gap-1">
        {(['services', 'logs', 'metrics'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm px-3 py-2.5 border-b-2 transition-colors capitalize ${
              tab === t ? 'border-gray-300 text-gray-200' : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-6">
        {tab === 'services' && (
          <div className="space-y-1">
            {instance.services.map(svc => (
              <div key={svc.name} className="flex items-center justify-between py-2.5 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-300 w-24">{svc.name}</span>
                  {healthBadge(svc.health, svc.status)}
                  {svc.disabled && <span className="text-xs text-gray-600">disabled</span>}
                </div>
                <div className="flex items-center gap-2">
                  {!svc.disabled && (
                    <button
                      className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                      onClick={() => alert('Demo only')}
                    >
                      {svc.status === 'running' ? 'Stop' : 'Start'}
                    </button>
                  )}
                  <button
                    className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    onClick={() => alert('Demo only')}
                  >
                    Logs
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'logs' && (
          <div className="font-mono text-xs text-gray-400 space-y-1 leading-relaxed">
            {logs.map((line, i) => (
              <div key={i} className="hover:text-gray-200 transition-colors">
                {line}
              </div>
            ))}
          </div>
        )}

        {tab === 'metrics' && (
          <div className="text-sm text-gray-500 space-y-6">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">Per-service usage</div>
              <div className="space-y-2">
                {instance.services.filter(s => s.status === 'running').map(svc => (
                  <div key={svc.name} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400 w-20 shrink-0">{svc.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: `${Math.random() * 30 + 2}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">{(Math.random() * 150 + 50).toFixed(0)} MB</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-600 italic">
              In a real deployment, charts show CPU and memory history with live polling every 5 seconds.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Demo() {
  const [selected, setSelected] = useState<MockInstance | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center h-12 px-4 gap-3">
          <Link to="/" className="flex items-center gap-2 mr-2">
            <img src="/supafleet-icon.png" className="h-8 w-8 rounded-lg" alt="" />
            <span className="font-serif text-base tracking-tight">Supafleet</span>
          </Link>
          <span className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded">Demo</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-600">manage.db.yourdomain.com</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 flex flex-col flex-shrink-0">
          <div className="p-4 flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Instances</span>
            <button
              onClick={() => setShowCreate(true)}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded transition-colors"
            >
              + New
            </button>
          </div>
          <div className="flex-1 overflow-auto px-3 space-y-2 pb-4">
            {MOCK_INSTANCES.map(inst => (
              <button
                key={inst.name}
                onClick={() => setSelected(inst)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  selected?.name === inst.name
                    ? 'bg-gray-800 text-gray-100'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                }`}
              >
                {statusDot(inst.status)}
                <span className="font-mono text-xs truncate">{inst.name}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-800 p-4">
            <div className="text-xs text-gray-600">Host metrics</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">CPU</span>
                <span className="text-gray-400">27%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Memory</span>
                <span className="text-gray-400">5.5 / 8 GB</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {selected ? (
            <InstanceDetail instance={selected} onBack={() => setSelected(null)} />
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-base font-medium text-gray-200">All instances</h1>
                <button
                  onClick={() => setShowCreate(true)}
                  className="text-sm bg-white text-gray-900 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors font-medium"
                >
                  + New instance
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MOCK_INSTANCES.map(inst => (
                  <InstanceCard key={inst.name} instance={inst} onClick={() => setSelected(inst)} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-gray-100">New instance</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-gray-300 text-lg">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="my-project"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-gray-200 outline-none focus:border-gray-500 transition-colors"
                />
                <p className="mt-1.5 text-xs text-gray-600 font-mono">my-project.db.yourdomain.com</p>
              </div>
              <div className="text-xs text-gray-600 font-mono space-y-0.5 bg-gray-800/50 rounded-md p-3">
                <p>my-project.db.yourdomain.com/rest/v1/</p>
                <p>my-project.db.yourdomain.com/studio</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 px-3 py-2 border border-gray-700 text-gray-400 rounded-md text-sm hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowCreate(false); alert('Demo only — no real instance will be created') }}
                  className="flex-1 px-3 py-2 bg-white text-gray-900 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
