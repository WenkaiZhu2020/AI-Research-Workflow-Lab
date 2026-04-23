import { SectionCard } from '../components/section-card'

export function PromptLabPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <SectionCard
        title="Prompt Experiment Panel"
        description="Set one input against prompt variants and parameter changes."
      >
        <div className="space-y-4">
          <textarea
            className="min-h-56 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Task input text"
            readOnly
          />
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              System prompt
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              User template
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Temperature
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Model
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard
        title="Comparison View"
        description="Reserve space for side-by-side output comparison and preferred result selection."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="min-h-72 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Result A
          </div>
          <div className="min-h-72 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Result B
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
