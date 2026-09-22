import type { StoredInvestigation } from '../types/navigation';

const STORAGE_KEY = 'cognilab_recent_investigations_v1';
const MAX_HISTORY_ITEMS = 10;

/**
 * Safely retrieve past investigations from localStorage.
 * Resilient to missing or corrupted storage data.
 */
export function getStoredInvestigations(): StoredInvestigation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.question === 'string' &&
        typeof item.id === 'string'
    );
  } catch {
    // Corrupted storage: return clean fallback
    return [];
  }
}

/**
 * Safely save an investigation to localStorage without sensitive credentials.
 */
export function saveInvestigation(
  question: string,
  runId?: string,
  status: 'completed' | 'failed' = 'completed'
): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredInvestigations();
    const newItem: StoredInvestigation = {
      id: runId || `inv-${Date.now()}`,
      question: question.trim(),
      timestamp: Date.now(),
      runId,
      status,
    };

    // Deduplicate same question if it was just run
    const filtered = existing.filter(
      (item) => item.question.toLowerCase() !== newItem.question.toLowerCase()
    );

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silently continue if storage is restricted (e.g. private mode)
  }
}

/**
 * Clears all locally saved inquiries.
 */
export function clearStoredInvestigations(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
