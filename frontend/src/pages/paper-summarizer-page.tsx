import { SectionCard } from '../components/section-card'

export function PaperSummarizerPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
      <SectionCard
        title="Paper Summarizer"
        description="Paste research text, pick summary settings, and render structured outputs."
      >
        <div className="space-y-4">
          <textarea
            className="min-h-72 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Paste abstract, introduction, or selected paper sections..."
            readOnly
          />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Summary mode
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Output style
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Model settings
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard
        title="Structured Result"
        description="Target schema aligned with the requirement document."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Title',
            'Short Summary',
            'Research Problem',
            'Methodology',
            'Dataset or Subject',
            'Metrics',
            'Main Contributions',
            'Limitations',
            'Research Gap',
            'Keywords',
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
