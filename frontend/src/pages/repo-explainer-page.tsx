import { SectionCard } from '../components/section-card'

export function RepoExplainerPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
      <SectionCard
        title="Repo Explainer"
        description="Collect repository context from pasted tree, README text, and source snippets."
      >
        <div className="space-y-4">
          <textarea
            className="min-h-72 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Paste repository tree, README content, or selected source files..."
            readOnly
          />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Explanation depth
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Focus mode
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Model settings
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard
        title="Output Sections"
        description="Expected result blocks for onboarding and architecture analysis."
      >
        <div className="space-y-3">
          {[
            'Project Overview',
            'Main Modules',
            'Module Responsibilities',
            'Likely Entry Points',
            'Files to Read First',
            'Suggested Reading Order',
            'Architecture Notes',
            'Technologies Used',
            'Risks or Messy Areas',
          ].map((field) => (
            <div
              key={field}
              className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600"
            >
              {field}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
