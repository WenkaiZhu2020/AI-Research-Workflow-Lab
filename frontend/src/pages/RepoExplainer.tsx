import { useState } from 'react'

import { explainRepo } from '../services/api'
import type {
  RepoExplainPayload,
  RepoExplanationDepth,
  WorkflowRunResult,
} from '../types/workflow'

const defaultPayload: RepoExplainPayload = {
  repo_tree_text: '',
  readme_text: '',
  code_snippets: '',
  explanation_depth: 'normal',
  model: 'llama3.2',
  temperature: 0.2,
}

export function RepoExplainer() {
  const [payload, setPayload] = useState<RepoExplainPayload>(defaultPayload)
  const [result, setResult] = useState<WorkflowRunResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await explainRepo(payload)
      setResult(response)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to explain repository.')
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
          <h2 className="text-xl font-semibold text-slate-950">Repo Explainer</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Paste repository context and request a structured explanation from the shared workflow
            engine.
          </p>
        </div>

        <TextAreaField
          label="Repository Tree"
          value={payload.repo_tree_text}
          onChange={(value) => setPayload((current) => ({ ...current, repo_tree_text: value }))}
          placeholder="Paste the directory tree..."
        />

        <TextAreaField
          label="README Text"
          value={payload.readme_text}
          onChange={(value) => setPayload((current) => ({ ...current, readme_text: value }))}
          placeholder="Paste README content..."
        />

        <TextAreaField
          label="Code Snippets"
          value={payload.code_snippets}
          onChange={(value) => setPayload((current) => ({ ...current, code_snippets: value }))}
          placeholder="Paste core files or snippets..."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-800">Explanation Depth</span>
            <select
              value={payload.explanation_depth}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  explanation_depth: event.target.value as RepoExplanationDepth,
                }))
              }
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="beginner">Beginner</option>
              <option value="normal">Normal</option>
              <option value="technical">Technical</option>
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
          {isSubmitting ? 'Explaining...' : 'Explain Repository'}
        </button>
      </form>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Explanation Result</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Structured repository explanation returned by the backend API.
          </p>
        </div>

        {errorMessage ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isSubmitting ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Generating repository explanation...
          </div>
        ) : null}

        {result?.output_json ? (
          <div className="grid gap-3">
            {Object.entries(result.output_json).map(([key, value]) => (
              <section
                key={key}
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {key.replace(/_/g, ' ')}
                </p>
                <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                  {Array.isArray(value)
                    ? value.map((item) => `- ${String(item)}`).join('\n')
                    : String(value ?? '-')}
                </pre>
              </section>
            ))}
          </div>
        ) : result ? (
          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Raw Output
            </p>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">
              {result.output_text}
            </pre>
          </section>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            Submit repository context to render the explanation here.
          </div>
        )}
      </section>
    </div>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-32 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
        placeholder={placeholder}
      />
    </label>
  )
}
