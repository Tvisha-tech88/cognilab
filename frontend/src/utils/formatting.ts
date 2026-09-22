/**
 * Formatting and sanitization helpers for Cognilab
 */

export function formatInvestigationDate(timestamp?: number | string | Date): string {
  if (!timestamp) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    }).format(new Date());
  }

  const dateObj = new Date(timestamp);
  if (isNaN(dateObj.getTime())) {
    return String(timestamp);
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(dateObj);
}

/**
 * Validates external URLs to ensure safe http/https protocol.
 */
export function sanitizeExternalUrl(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
    return null;
  } catch {
    // Relative or invalid URL
    return null;
  }
}

/**
 * Ensures clean rendering of specs: replaces null/undefined/empty with 'Not specified'
 */
export function formatValueOrFallback(val: unknown, fallback = 'Not specified'): string {
  if (val === null || val === undefined || val === '') {
    return fallback;
  }
  if (Array.isArray(val) && val.length === 0) {
    return fallback;
  }
  return String(val);
}
