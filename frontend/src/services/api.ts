import { API_ENDPOINTS } from '../config/api';
import type { ResearchRequestBody, ResearchRunResponse } from '../types/research';
import { ApiClientError } from '../utils/errors';

/**
 * Submit an empirical inquiry to Cognilab's FastAPI backend.
 * POST /api/research
 * 
 * Supports AbortSignal for user cancellation and custom timeouts.
 */
export async function submitResearch(
  question: string,
  signal?: AbortSignal
): Promise<ResearchRunResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new ApiClientError('Research question cannot be empty.', 400);
  }

  const payload: ResearchRequestBody = {
    research_question: trimmed,
  };

  let response: Response;

  try {
    response = await fetch(API_ENDPOINTS.research, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err: unknown) {
    if (signal?.aborted) {
      throw new ApiClientError('Investigation cancelled by user.', undefined, undefined, true);
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new ApiClientError(
      `Unable to reach backend at ${API_ENDPOINTS.research}: ${message}`,
      undefined,
      message
    );
  }

  if (!response.ok) {
    let errorDetail = `HTTP ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson && typeof errorJson.detail === 'string') {
        errorDetail = errorJson.detail;
      } else if (errorJson && typeof errorJson.error === 'string') {
        errorDetail = errorJson.error;
      }
    } catch {
      // Body is not JSON
    }
    throw new ApiClientError(errorDetail, response.status);
  }

  let data: ResearchRunResponse;
  try {
    data = await response.json();
  } catch {
    throw new ApiClientError('Malformed JSON received from research backend.', 502);
  }

  if (data.status === 'failed' || data.error) {
    throw new ApiClientError(
      data.error || 'The research investigation failed during execution.',
      500
    );
  }

  // Attach client timestamp if missing
  if (!data.timestamp) {
    data.timestamp = Date.now();
  }

  return data;
}

/**
 * Health check ping to FastAPI /health
 */
export async function checkBackendHealth(signal?: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(API_ENDPOINTS.health, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    });
    return res.ok;
  } catch {
    return false;
  }
}
