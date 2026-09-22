export interface HumanReadableError {
  title: string;
  subtitle: string;
  statusCode?: number;
  isAbort?: boolean;
  canRetry: boolean;
}

export class ApiClientError extends Error {
  statusCode?: number;
  details?: string;
  isAbort?: boolean;

  constructor(message: string, statusCode?: number, details?: string, isAbort = false) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.details = details;
    this.isAbort = isAbort;
  }
}

/**
 * Maps raw HTTP errors and network failures into editorial, human-readable diagnostics.
 * Never exposes raw Python stack traces or sensitive credentials.
 */
export function formatErrorDiagnostic(error: unknown): HumanReadableError {
  if (error instanceof ApiClientError && error.isAbort) {
    return {
      title: 'INVESTIGATION CANCELLED BY USER',
      subtitle: 'The research request was stopped before completion. You may modify your question and begin again.',
      canRetry: true,
      isAbort: true,
    };
  }

  const statusCode = error instanceof ApiClientError ? error.statusCode : undefined;
  const rawMessage = error instanceof Error ? error.message : String(error);

  // Network offline / connection refused
  if (
    rawMessage.includes('Failed to fetch') ||
    rawMessage.includes('NetworkError') ||
    rawMessage.includes('connection refused') ||
    rawMessage.includes('unable to reach')
  ) {
    return {
      title: 'COGNILAB IS CURRENTLY UNABLE TO REACH THE RESEARCH ENGINE.',
      subtitle: 'Check that the Cognilab backend is running on http://127.0.0.1:8000 and try again.',
      statusCode: 503,
      canRetry: true,
    };
  }

  // Request timeout
  if (rawMessage.toLowerCase().includes('timeout') || rawMessage.includes('took longer')) {
    return {
      title: 'THE INVESTIGATION TOOK LONGER THAN EXPECTED.',
      subtitle: 'The research engine may still be processing literature or Azure model execution. You can try submitting again.',
      statusCode: 504,
      canRetry: true,
    };
  }

  switch (statusCode) {
    case 400:
    case 422:
      return {
        title: 'PLEASE CHECK YOUR RESEARCH QUESTION.',
        subtitle: 'The inquiry could not be processed. Please ensure the question is clear and at least 5 characters long.',
        statusCode,
        canRetry: false,
      };

    case 401:
    case 403:
      return {
        title: 'AUTHENTICATION OR PERMISSION RESTRICTED.',
        subtitle: 'The backend engine rejected authorization for Azure AI Foundry services. Please check server credentials.',
        statusCode,
        canRetry: false,
      };

    case 404:
      return {
        title: 'RESEARCH ENGINE ENDPOINT NOT FOUND.',
        subtitle: 'The /api/research endpoint is unavailable on the target server. Verify backend routes.',
        statusCode: 404,
        canRetry: false,
      };

    case 429:
      return {
        title: 'TOO MANY INVESTIGATION REQUESTS.',
        subtitle: 'Rate limits reached on downstream language models. Please wait a brief moment before re-submitting.',
        statusCode: 429,
        canRetry: true,
      };

    case 500:
      return {
        title: 'RESEARCH ENGINE ENCOUNTERED AN EXECUTION ERROR.',
        subtitle: 'An issue occurred during literature extraction or hypothesis synthesis. Please retry your inquiry.',
        statusCode: 500,
        canRetry: true,
      };

    case 502:
    case 503:
      return {
        title: 'COGNILAB IS CURRENTLY UNABLE TO REACH THE RESEARCH ENGINE.',
        subtitle: 'Check that the Cognilab backend is running and try again.',
        statusCode,
        canRetry: true,
      };

    default:
      return {
        title: 'AN UNEXPECTED ISSUE OCCURRED DURING INVESTIGATION.',
        subtitle: 'The research workflow could not be completed at this time. Please verify backend status and try again.',
        statusCode,
        canRetry: true,
      };
  }
}
