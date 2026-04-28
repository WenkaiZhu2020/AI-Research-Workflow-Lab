import { useState } from 'react'

import { summarizePaper } from '../services/api'
import type {
  PaperSummarizePayload,
  PaperSummaryMode,
  WorkflowRunResult,
} from '../types/workflow'

const defaultPayload: PaperSummarizePayload = {
  paper_text: '',
  summary_mode: 'standard',
  model: 'llama3.2',
  temperature: 0.3,
}

export function PaperSummarizer() {
  const [payload, setPayload] = useState<PaperSummarizePayload>(defaultPayload)
  const [result, setResult] = useState<WorkflowRunResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await summarizePaper(payload)
      setResult(response)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to summarize paper.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Paper Summarizer</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Paste paper text or abstract sections, select summary depth, and request a structured
            research summary.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Paper Text</span>
          <textarea
            value={payload.paper_text}
            onChange={(event) =>
              setPayload((current) => ({ ...current, paper_text: event.target.value }))
            }
            className="min-h-80 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Paste the abstract, introduction, methodology, or selected sections..."
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-800">Summary Mode</span>
            <select
              value={payload.summary_mode}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  summary_mode: event.target.value as PaperSummaryMode,
                }))
              }
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="short">Short</option>
              <option value="standard">Standard</option>
              <option value="detailed">Detailed</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-800">Model</span>
            <select
              value={payload.model}
              onChange={(event) =>
                setPayload((current) => ({ ...current, model: event.target.value }))
              }
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="llama3.2">llama3.2</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="flex items-center justify-between text-sm font-medium text-slate-800">
              <span>Temperature</span>
              <span className="text-slate-500">{payload.temperature.toFixed(1)}</span>
            </span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={payload.temperature}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  temperature: Number(event.target.value),
                }))
              }
              className="w-full accent-slate-900"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Summarizing...' : 'Summarize Paper'}
        </button>
      </form>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Structured Summary</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Render the returned JSON as readable cards rather than one long raw text block.
          </p>
        </div>

        {errorMessage ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isSubmitting ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Generating paper summary...
          </div>
        ) : null}

        {result?.output_json ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <SummaryCard title="Run ID" value={String(result.run_id)} />
              <SummaryCard title="Model" value={result.model_name} />
              <SummaryCard title="Summary Mode" value={payload.summary_mode} />
              <SummaryCard title="Temperature" value={result.temperature.toFixed(1)} />
            </div>

            <div className="grid gap-3">
              {Object.entries(result.output_json).map(([key, value]) => (
                <SummaryCard key={key} title={humanizeKey(key)} value={formatStructuredValue(value)} />
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <SummaryCard title="Run ID" value={String(result.run_id)} />
            <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Raw Output
              </p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-slate-800">
                {result.output_text}
              </pre>
            </section>
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            Submit paper text to render the structured summary here.
          </div>
        )}
      </section>
    </div>
  )
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">{value}</pre>
    </section>
  )
}

function humanizeKey(value: string) {
  return value.replace(/_/g, ' ')
}

function formatStructuredValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length === 0 ? '-' : value.map((item) => `- ${String(item)}`).join('\n')
  }

  if (value === null || value === undefined || value === '') {
    return '-'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}
