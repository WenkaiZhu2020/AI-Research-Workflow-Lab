import axios from 'axios'

import type {
  PaperSummarizePayload,
  PromptExperimentPayload,
  RepoExplainPayload,
  RunRecord,
  WorkflowRunResult,
} from '../types/workflow'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function runPromptExperiment(
  payload: PromptExperimentPayload,
): Promise<WorkflowRunResult> {
  const response = await apiClient.post<WorkflowRunResult>('/prompt/run', payload)
  return response.data
}

export async function getHistoryList(): Promise<RunRecord[]> {
  const response = await apiClient.get<RunRecord[]>('/history')
  return response.data
}

export async function getHistoryDetail(id: number): Promise<RunRecord> {
  const response = await apiClient.get<RunRecord>(`/history/${id}`)
  return response.data
}

export async function summarizePaper(
  payload: PaperSummarizePayload,
): Promise<WorkflowRunResult> {
  const response = await apiClient.post<WorkflowRunResult>('/paper/summarize', payload)
  return response.data
}

export async function explainRepo(
  payload: RepoExplainPayload,
): Promise<WorkflowRunResult> {
  const response = await apiClient.post<WorkflowRunResult>('/repo/explain', payload)
  return response.data
}

export { apiClient }
