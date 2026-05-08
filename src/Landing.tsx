import { Link } from 'react-router-dom'
import { LayoutDashboard, Globe, ShieldCheck, Sliders, ScrollText, BarChart2, Terminal, Code2 } from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const features = [
  { icon: LayoutDashboard, title: 'Multi-instance dashboard', desc: 'Create, monitor, and manage any number of Supabase instances from one place.' },
  { icon: Globe, title: 'Automatic subdomain routing', desc: 'Wildcard DNS + nginx. Each instance gets its own subdomain — no manual DNS.' },
  { icon: ShieldCheck, title: 'Auth-gated Studio', desc: 'Every Studio is protected by a JWT login wall. No direct exposure to the internet.' },
  { icon: Sliders, title: 'Service management', desc: 'Stop optional services to reclaim RAM. Disable makes it permanent across reboots.' },
  { icon: ScrollText, title: 'Real-time logs', desc: 'Stream live Docker logs per service with search and line-by-line download.' },
  { icon: BarChart2, title: 'Resource metrics', desc: 'CPU, memory, and network charts per instance. Live-polled every 5 seconds.' },
  { icon: Terminal, title: 'One-command setup', desc: 'setup.sh handles TLS, nginx, systemd, and builds in a single run.' },
  { icon: Code2, title: 'Open source · MIT', desc: 'Self-host on any VPS. No vendor lock-in, no usage fees, no SaaS dependency.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/supafleet-icon.png" className="h-8 w-8 rounded-lg" alt="" />
            <span className="text-lg font-semibold tracking-tight">Supafleet</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/camc8/supafleet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
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
        <img src="/supafleet-logo.png" className="h-28 w-28 mx-auto mb-8 rounded-2xl" alt="Supafleet" />
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-gray-900 mb-5">
          Self-hosted Supabase,<br className="hidden sm:block" /> at scale
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Manage multiple isolated Supabase instances from a single dashboard — on your own VPS, your own domain, your own rules.
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
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
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
            <Link to="/demo" className="flex flex-col items-center gap-4 group">
              <div className="grid grid-cols-3 gap-3">
                {['production', 'staging', 'dev-01'].map((name) => (
                  <div key={name} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left w-44">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-gray-300 font-mono">{name}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs text-gray-500">CPU <span className="text-gray-300">{name === 'production' ? '14%' : name === 'staging' ? '4%' : '1%'}</span></div>
                      <div className="text-xs text-gray-500">Memory <span className="text-gray-300">{name === 'production' ? '1.8 GB' : name === 'staging' ? '1.2 GB' : '0.9 GB'}</span></div>
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
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif text-gray-900 mb-3">Everything you need</h2>
          <p className="text-sm text-gray-500">Built for developers who want full control without the ops overhead.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="group border border-gray-100 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                  <Icon className="w-4.5 h-4.5 text-gray-700" strokeWidth={1.75} />
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1.5">{f.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Server rec */}
      <section className="bg-gray-50 border-t border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif text-gray-900 mb-3">Recommended server specs</h2>
            <p className="text-sm text-gray-500">Each Supabase instance runs ~10 Docker containers</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Hetzner CX22', specs: '2 vCPU · 4 GB RAM · €5/mo', instances: '1–2 instances' },
              { label: 'Hetzner CX32', specs: '4 vCPU · 8 GB RAM · €9/mo', instances: '3–5 instances', highlighted: true },
              { label: 'Hetzner CX42', specs: '8 vCPU · 16 GB RAM · €19/mo', instances: '6–10 instances' },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-xl p-5 border bg-white ${s.highlighted ? 'border-gray-900 shadow-sm' : 'border-gray-200'}`}
              >
                {s.highlighted && (
                  <div className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Recommended</div>
                )}
                <div className="text-sm font-semibold text-gray-900 mb-1">{s.label}</div>
                <div className="text-xs text-gray-500 mb-3">{s.specs}</div>
                <div className="text-xs font-medium text-gray-700">{s.instances}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-3">Get started in minutes</h2>
          <p className="text-gray-500 mb-8 text-sm">One command. Works on any Ubuntu/Debian VPS.</p>
          <div className="bg-gray-950 text-gray-100 rounded-xl p-4 font-mono text-sm max-w-xl mx-auto text-left mb-8 flex items-center gap-3">
            <span className="text-gray-600 select-none">$</span>
            <span className="text-gray-200">curl -fsSL https://raw.githubusercontent.com/camc8/supafleet/main/setup.sh | bash</span>
          </div>
          <a
            href="https://github.com/camc8/supafleet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/supafleet-icon.png" className="h-5 w-5 rounded" alt="" />
            <span>Supafleet — MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/camc8/supafleet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <Link to="/demo" className="hover:text-gray-900 transition-colors">Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
