import { useEffect, useState } from 'react'

import { getHistoryDetail, getHistoryList } from '../services/api'
import type { RunRecord } from '../types/workflow'

export function History() {
  const [records, setRecords] = useState<RunRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<RunRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadHistory() {
      try {
        setIsLoading(true)
        setErrorMessage(null)
        const response = await getHistoryList()
        setRecords(response)
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load history records.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadHistory()
  }, [])

  async function handleOpenDetail(id: number) {
    try {
      setIsDetailLoading(true)
      const response = await getHistoryDetail(id)
      setSelectedRecord(response)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load history detail.',
      )
    } finally {
      setIsDetailLoading(false)
    }
  }

  return (
    <>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">History</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Browse stored workflow runs and open a detailed view of each record.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            {records.length} record{records.length === 1 ? '' : 's'}
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Loading history records...
          </div>
        ) : records.length === 0 ? (
          <div className="mt-6 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            No workflow runs have been saved yet.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
            <div className="hidden grid-cols-[80px_140px_140px_180px_minmax(0,1fr)_minmax(0,1fr)_120px] gap-4 bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 lg:grid">
              <span>ID</span>
              <span>Task</span>
              <span>Model</span>
              <span>Created</span>
              <span>Input</span>
              <span>Output</span>
              <span>Action</span>
            </div>

            <div className="divide-y divide-slate-200">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="grid gap-3 px-4 py-4 lg:grid-cols-[80px_140px_140px_180px_minmax(0,1fr)_minmax(0,1fr)_120px] lg:items-center lg:gap-4"
                >
                  <HistoryCell label="ID" value={`#${record.id}`} />
                  <HistoryCell label="Task" value={record.task_type} />
                  <HistoryCell label="Model" value={record.model_name} />
                  <HistoryCell
                    label="Created"
                    value={formatDate(record.created_at)}
                  />
                  <HistoryCell
                    label="Input"
                    value={truncateText(record.input_text, 120)}
                  />
                  <HistoryCell
                    label="Output"
                    value={truncateText(record.output_text, 120)}
                  />
                  <div>
                    <button
                      type="button"
                      onClick={() => void handleOpenDetail(record.id)}
                      className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950"
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {selectedRecord ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Run Detail #{selectedRecord.id}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedRecord.task_type} · {selectedRecord.model_name} ·{' '}
                  {formatDate(selectedRecord.created_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
              >
                Close
              </button>
            </div>

            {isDetailLoading ? (
              <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Loading detail...
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <DetailBlock
                  title="Config Parameters"
                  content={JSON.stringify(selectedRecord.config_json, null, 2)}
                />
                <DetailBlock title="Complete Prompt" content={selectedRecord.prompt_text} />
                <DetailBlock title="Complete Input" content={selectedRecord.input_text} />
                <DetailBlock title="Raw Output" content={selectedRecord.output_text} />
                {selectedRecord.output_json ? (
                  <DetailBlock
                    title="Structured Output"
                    content={JSON.stringify(selectedRecord.output_json, null, 2)}
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}

function HistoryCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 lg:hidden">
        {label}
      </p>
      <p className="truncate text-sm text-slate-700">{value}</p>
    </div>
  )
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-slate-800">
        {content}
      </pre>
    </section>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

function truncateText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
}
