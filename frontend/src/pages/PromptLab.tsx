import { useState } from 'react'

import { runPromptExperiment } from '../services/api'
import type { PromptExperimentPayload, WorkflowRunResult } from '../types/workflow'

const defaultPayload: PromptExperimentPayload = {
  task_input: {
    raw_input: '',
    task_type: 'prompt_lab',
  },
  task_config: {
    model: 'llama3.2',
    temperature: 0.7,
    provider_name: 'ollama',
    structured_output: false,
  },
  prompt_template: {
    system_instruction:
      'You are a careful assistant. Follow the instruction and keep the answer clear.',
    user_prompt_template: 'Please respond to the following input:\n\n{{input}}',
  },
}

export function PromptLab() {
  const [payload, setPayload] = useState<PromptExperimentPayload>(defaultPayload)
  const [result, setResult] = useState<WorkflowRunResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await runPromptExperiment(payload)
      setResult(response)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to run prompt experiment.'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Prompt Lab</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Compare prompt settings against the same input with a minimal experiment form.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">System Instruction</span>
          <textarea
            value={payload.prompt_template.system_instruction}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                prompt_template: {
                  ...current.prompt_template,
                  system_instruction: event.target.value,
                },
              }))
            }
            className="min-h-28 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">User Prompt Template</span>
          <textarea
            value={payload.prompt_template.user_prompt_template}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                prompt_template: {
                  ...current.prompt_template,
                  user_prompt_template: event.target.value,
                },
              }))
            }
            className="min-h-32 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          <p className="text-xs text-slate-500">
            Use <code>{'{{input}}'}</code> as the input placeholder.
          </p>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Task Input Text</span>
          <textarea
            value={payload.task_input.raw_input}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                task_input: {
                  ...current.task_input,
                  raw_input: event.target.value,
                },
              }))
            }
            className="min-h-40 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Paste the text you want to test..."
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-800">Model</span>
            <select
              value={payload.task_config.model}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  task_config: {
                    ...current.task_config,
                    model: event.target.value,
                  },
                }))
              }
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="llama3.2">llama3.2</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="flex items-center justify-between text-sm font-medium text-slate-800">
              <span>Temperature</span>
              <span className="text-slate-500">
                {payload.task_config.temperature.toFixed(1)}
              </span>
            </span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={payload.task_config.temperature}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  task_config: {
                    ...current.task_config,
                    temperature: Number(event.target.value),
                  },
                }))
              }
              className="w-full accent-slate-900"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={payload.task_config.structured_output ?? false}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  task_config: {
                    ...current.task_config,
                    structured_output: event.target.checked,
                  },
                }))
              }
              className="h-4 w-4 rounded border-slate-300"
            />
            Try structured JSON parsing
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? 'Running...' : 'Run Experiment'}
          </button>
        </div>
      </form>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Result</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review the rendered output, the final prompt, and the saved run id.
          </p>
        </div>

        {isSubmitting ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Running experiment and waiting for the model response...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {result ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetadataCard label="Run ID" value={String(result.run_id)} />
              <MetadataCard label="Model" value={result.model_name} />
              <MetadataCard
                label="Temperature"
                value={result.temperature.toFixed(1)}
              />
              <MetadataCard
                label="Latency"
                value={`${result.latency_ms.toFixed(2)} ms`}
              />
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Output Text
              </p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-slate-900">
                {result.output_text}
              </pre>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Provider
              </p>
              <p className="mt-2 text-sm text-slate-900">{result.provider_name}</p>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Final Prompt
              </p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {result.prompt_text}
              </pre>
            </div>

            {result.output_json ? (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Parsed JSON
                </p>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {JSON.stringify(result.output_json, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-500">
            Submit a prompt experiment to see the generated result here.
          </div>
        )}
      </section>
    </div>
  )
}

function MetadataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm text-slate-900">{value}</p>
    </div>
  )
}
