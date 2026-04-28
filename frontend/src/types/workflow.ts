export type TaskInput = {
  raw_input: string
  task_type: string
  metadata?: Record<string, unknown>
}

export type TaskConfig = {
  model: string
  temperature: number
  top_p?: number | null
  provider_name?: string
  structured_output?: boolean
}

export type PromptTemplate = {
  system_instruction: string
  user_prompt_template: string
}

export type PromptExperimentPayload = {
  task_input: TaskInput
  task_config: TaskConfig
  prompt_template: PromptTemplate
}

export type WorkflowRunResult = {
  run_id: number
  output_text: string
  output_json: Record<string, unknown> | null
  prompt_text: string
}

export type RunRecord = {
  id: number
  task_type: string
  input_text: string
  config_json: Record<string, unknown>
  prompt_text: string
  model_name: string
  provider_name: string
  output_text: string
  output_json: Record<string, unknown> | null
  user_preference: string | null
  created_at: string
}
