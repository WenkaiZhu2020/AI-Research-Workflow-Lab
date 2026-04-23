import { Link } from 'react-router-dom'

import { SectionCard } from '../components/section-card'

const modules = [
  {
    title: 'Paper Summarizer',
    description:
      'Turn pasted paper text into structured research notes with configurable summary depth and output style.',
    to: '/paper-summarizer',
  },
  {
    title: 'Repo Explainer',
    description:
      'Clarify repository structure, module responsibilities, entry points, and likely architecture from pasted code context.',
    to: '/repo-explainer',
  },
  {
    title: 'Prompt Lab',
    description:
      'Compare prompt variants and model parameters side by side while preserving experiment history.',
    to: '/prompt-lab',
  },
]

export function HomePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Unified workflow</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
            Input, configure, run, compare.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            This frontend is set up around a shared backend workflow: input,
            task configuration, prompt template, model call, structured output,
            and run history.
          </p>
        </div>
        <SectionCard
          title="Next build targets"
          description="Recommended MVP path from the requirement document."
        >
          <ol className="space-y-3 text-sm text-slate-700">
            <li>1. Prompt Lab form and run panel</li>
            <li>2. Paper summary schema and results view</li>
            <li>3. Repo explanation schema and output sections</li>
          </ol>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {modules.map((module) => (
          <SectionCard
            key={module.title}
            title={module.title}
            description={module.description}
            aside={
              <Link
                to={module.to}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950"
              >
                Open
              </Link>
            }
          >
            <div className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Ready for page-specific forms, API wiring, and run results.
            </div>
          </SectionCard>
        ))}
      </section>
    </div>
  )
}
