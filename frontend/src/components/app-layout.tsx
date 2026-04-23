import { NavLink, Outlet } from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/paper-summarizer', label: 'Paper Summarizer' },
  { to: '/repo-explainer', label: 'Repo Explainer' },
  { to: '/prompt-lab', label: 'Prompt Lab' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="border-b border-slate-200 pb-5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">AI workflow sandbox</p>
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950">
                AI Research Workflow Lab
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                A lightweight environment for prompt experiments, paper summaries,
                and repository understanding.
              </p>
            </div>
            <nav
              aria-label="Primary"
              className="flex flex-wrap gap-2"
            >
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
