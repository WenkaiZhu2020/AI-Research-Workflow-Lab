import { SectionCard } from '../components/section-card'

export function SettingsPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard
        title="Model Provider"
        description="This page can later hold API base URL, provider choice, and default model settings."
      >
        <div className="space-y-3">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            Provider
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            Default model
          </div>
        </div>
      </SectionCard>
      <SectionCard
        title="Project Preferences"
        description="Reserved for prompt template versions and local app preferences."
      >
        <div className="space-y-3">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            Template version
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            Output defaults
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
