import { SectionCard } from '../components/section-card'

export function HistoryPage() {
  return (
    <SectionCard
      title="History"
      description="Run records will live here once the backend persistence layer is connected."
    >
      <div className="overflow-hidden rounded-md border border-slate-200">
        <div className="grid grid-cols-[1.1fr_0.8fr_0.6fr_0.8fr] bg-slate-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
          <span>Task</span>
          <span>Model</span>
          <span>Status</span>
          <span>Created</span>
        </div>
        <div className="grid grid-cols-[1.1fr_0.8fr_0.6fr_0.8fr] px-4 py-4 text-sm text-slate-600">
          <span>No runs yet</span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
        </div>
      </div>
    </SectionCard>
  )
}
