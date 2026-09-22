/**
 * Cognilab API Configuration
 * Centralized environment configuration for backend endpoint.
 */

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') ||
  'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  research: `${API_BASE_URL}/api/research`,
  health: `${API_BASE_URL}/health`,
} as const;
