import { Link } from 'react-router-dom'

const features = [
  { title: 'Multi-instance dashboard', desc: 'Create, monitor, and manage any number of Supabase instances from one place.' },
  { title: 'Automatic subdomain routing', desc: 'Wildcard DNS + nginx. New instances get {name}.db.yourdomain.com automatically.' },
  { title: 'Auth-gated Studio', desc: 'Every Studio instance is protected by a JWT login wall — no direct exposure.' },
  { title: 'Service management', desc: 'Stop optional services (analytics, imgproxy) to reclaim RAM. Survives reboots.' },
  { title: 'Real-time logs', desc: 'Stream live Docker logs per service with search and download.' },
  { title: 'Resource metrics', desc: 'CPU, memory, and network charts per instance with live polling.' },
  { title: 'One-command setup', desc: 'setup.sh handles TLS, nginx config, systemd, and builds everything.' },
  { title: 'Open source', desc: 'MIT licensed. Self-host on any VPS. No vendor lock-in, no usage fees.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/supafleet-icon.png" className="h-6 w-6" alt="" />
            <span className="font-serif text-base tracking-tight">Supafleet</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/camc8/supafleet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <Link
              to="/demo"
              className="text-sm bg-gray-900 text-white px-3.5 py-1.5 rounded-md hover:bg-gray-700 transition-colors"
            >
              Live demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <img src="/supafleet-logo.png" className="h-20 w-20 mx-auto mb-8 rounded-2xl" alt="Supafleet" />
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-gray-900 mb-5">
          Self-hosted Supabase,<br className="hidden sm:block" /> at scale
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Supafleet lets you manage multiple isolated Supabase instances from a single dashboard — on your own VPS, with your own domain.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/demo"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Try the demo
          </Link>
          <a
            href="https://github.com/camc8/supafleet"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="ml-3 flex-1 bg-white border border-gray-200 rounded text-xs text-gray-400 px-3 py-1 text-center max-w-xs mx-auto">
              manage.db.yourdomain.com
            </div>
          </div>
          <div className="bg-gray-950 text-white p-6 min-h-56 flex items-center justify-center">
            <Link
              to="/demo"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="grid grid-cols-3 gap-3">
                {['xcorp', 'staging', 'dev-01'].map((name) => (
                  <div key={name} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left w-44">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-gray-300 font-mono">{name}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs text-gray-500">CPU <span className="text-gray-300">{name === 'xcorp' ? '12%' : name === 'staging' ? '4%' : '1%'}</span></div>
                      <div className="text-xs text-gray-500">Memory <span className="text-gray-300">{name === 'xcorp' ? '1.8 GB' : name === 'staging' ? '1.2 GB' : '0.9 GB'}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Open interactive demo →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-center text-2xl font-serif text-gray-900 mb-12">Everything you need</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="border border-gray-100 rounded-lg p-5">
              <div className="text-sm font-medium text-gray-900 mb-1.5">{f.title}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Server rec */}
      <section className="bg-gray-50 border-t border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-2xl font-serif text-gray-900 mb-3">Recommended server specs</h2>
          <p className="text-center text-sm text-gray-500 mb-10">Each Supabase instance runs ~10 Docker containers</p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Hetzner CX22', specs: '2 vCPU · 4 GB RAM · €5/mo', instances: '1–2 instances' },
              { label: 'Hetzner CX32', specs: '4 vCPU · 8 GB RAM · €9/mo', instances: '3–5 instances', highlighted: true },
              { label: 'Hetzner CX42', specs: '8 vCPU · 16 GB RAM · €19/mo', instances: '6–10 instances' },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-lg p-5 border ${s.highlighted ? 'border-gray-900 bg-white' : 'border-gray-200 bg-white'}`}
              >
                {s.highlighted && <div className="text-xs font-medium text-gray-900 mb-2 uppercase tracking-wide">Recommended</div>}
                <div className="text-sm font-medium text-gray-900 mb-1">{s.label}</div>
                <div className="text-xs text-gray-500 mb-3">{s.specs}</div>
                <div className="text-xs text-gray-700 font-medium">{s.instances}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Get started in minutes</h2>
          <p className="text-gray-500 mb-8">One command. Works on any Ubuntu/Debian VPS.</p>
          <div className="bg-gray-950 text-gray-100 rounded-lg p-4 font-mono text-sm max-w-xl mx-auto text-left mb-8">
            <span className="text-gray-500">$ </span>
            curl -fsSL https://raw.githubusercontent.com/camc8/supafleet/main/setup.sh | bash
          </div>
          <a
            href="https://github.com/camc8/supafleet"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors inline-block"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/supafleet-icon.png" className="h-4 w-4" alt="" />
            <span>Supafleet — MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/camc8/supafleet" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
            <Link to="/demo" className="hover:text-gray-900 transition-colors">Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
