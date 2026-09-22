/**
 * Cognilab Research & Experimentation Schemas
 * Source of truth: FastAPI Backend API contract.
 */

export interface SourceItem {
  title?: string;
  type?: string;
  source_type?: string;
  relevance?: string | number;
  url?: string;
  [key: string]: unknown;
}

export interface SupportingEvidenceItem {
  claim?: string;
  source?: string;
  evidence?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ResearchEvidence {
  research_question?: string;
  key_findings?: (string | Record<string, unknown>)[];
  supporting_evidence?: (string | SupportingEvidenceItem)[];
  contradictory_evidence?: (string | Record<string, unknown>)[];
  research_gaps?: (string | Record<string, unknown>)[];
  methodologies_or_approaches?: (string | Record<string, unknown>)[];
  uncertainties?: (string | Record<string, unknown>)[];
  sources?: (string | SourceItem)[];
  next_step?: string;
}

export interface ResearchAgentResult {
  response_text?: string;
  research_evidence?: ResearchEvidence;
}

export interface DatasetRequirements {
  modality?: string;
  task_type?: string;
  minimum_samples?: number;
  requirements?: string[] | string;
  [key: string]: unknown;
}

export interface ModelRequirements {
  family?: string;
  input_modality?: string;
  requirements?: string[] | string;
  [key: string]: unknown;
}

export interface ExperimentControls {
  fixed_variables?: string[] | string;
  reproducibility?: string[] | string;
  [key: string]: unknown;
}

export interface ExperimentSpec {
  task?: string;
  independent_variable?: string;
  dependent_variables?: string[] | string;
  dataset_requirements?: DatasetRequirements | Record<string, unknown>;
  model_requirements?: ModelRequirements | Record<string, unknown>;
  baseline?: Record<string, unknown> | string;
  treatment?: Record<string, unknown> | string;
  metrics?: (string | Record<string, unknown>)[];
  controls?: ExperimentControls | Record<string, unknown>;
  execution_requirements?: (string | Record<string, unknown>)[] | string;
  [key: string]: unknown;
}

export interface ExperimentValidation {
  status: 'VALID' | 'INVALID' | string;
  issues?: string[];
}

export interface ExperimentPlan {
  hypothesis?: string;
  experiment?: ExperimentSpec;
  validation?: ExperimentValidation;
  evidence_used?: (string | Record<string, unknown>)[];
  next_step?: string;
}

export interface HypothesisAgentResult {
  response_text?: string;
  experiment_plan?: ExperimentPlan;
}

export interface WorkflowResult {
  research?: ResearchAgentResult;
  experiment?: HypothesisAgentResult;
}

export interface ResearchRunResponse {
  run_id: string;
  status: 'running' | 'completed' | 'failed' | string;
  research_question: string;
  result?: WorkflowResult;
  error?: string | null;
  timestamp?: number;
}

export interface ResearchRequestBody {
  research_question: string;
}

/**
 * Honest Agent Status Representation
 * 01 & 02 are active in current backend.
 * 03, 04, 05 are upcoming downstream stages.
 */
export type AgentPipelineStatus = 'active' | 'upcoming';

export interface AgentArchitectureInfo {
  number: string;
  name: string;
  title: string;
  description: string;
  status: AgentPipelineStatus;
  role: string;
  inputs: string;
  outputs: string;
}
