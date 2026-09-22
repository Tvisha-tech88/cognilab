import { useState, useRef, useEffect, useCallback } from 'react';
import type { ResearchRunResponse } from '../types/research';
import type { ResearchWorkspaceState } from '../types/navigation';
import { submitResearch } from '../services/api';
import { formatErrorDiagnostic, HumanReadableError } from '../utils/errors';
import { saveInvestigation } from '../utils/storage';

const LONG_RUNNING_THRESHOLD_SECONDS = 20;

export function useResearch() {
  const [workspaceState, setWorkspaceState] = useState<ResearchWorkspaceState>('input');
  const [question, setQuestion] = useState<string>('');
  const [result, setResult] = useState<ResearchRunResponse | null>(null);
  const [error, setError] = useState<HumanReadableError | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isLongRunning, setIsLongRunning] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<number | null>(null);
  const hasDismissedLongRunningRef = useRef<boolean>(false);

  // Clear timers and ongoing requests on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  /**
   * CANCEL ACTION
   * Immediately aborts active network request, clears timers, removes popup,
   * and returns the UI directly to the idle ('input') state.
   */
  const cancelInvestigation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsLongRunning(false);
    hasDismissedLongRunningRef.current = false;
    setSecondsElapsed(0);
    setError(null);
    setWorkspaceState('input');
  }, []);

  /**
   * CONTINUE WAITING ACTION
   * User acknowledges that Azure AI Foundry is taking longer; dismisses the notice
   * and flags it as dismissed so it does NOT repeatedly re-popup during this request.
   */
  const continueWaiting = useCallback(() => {
    setIsLongRunning(false);
    hasDismissedLongRunningRef.current = true;
  }, []);

  /**
   * START INVESTIGATION ACTION
   * Transitions state machine:
   * IDLE ('input') -> PROCESSING ('researching') -> RESULTS ('results') or ERROR ('error')
   */
  const startInvestigation = useCallback(async (inquiryText: string) => {
    const trimmed = inquiryText.trim();
    if (!trimmed) return;

    // Abort any prior request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Reset state for new investigation
    setQuestion(trimmed);
    setError(null);
    setResult(null);
    setSecondsElapsed(0);
    setIsLongRunning(false);
    hasDismissedLongRunningRef.current = false;
    setWorkspaceState('researching');

    // Create abort controller for this specific request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Start elapsed counter
    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSecondsElapsed(elapsed);

      // Only trigger long-running notice if request exceeds threshold AND user hasn't dismissed it
      if (elapsed >= LONG_RUNNING_THRESHOLD_SECONDS && !hasDismissedLongRunningRef.current) {
        setIsLongRunning(true);
      }
    }, 1000);

    try {
      const data = await submitResearch(trimmed, controller.signal);

      // Stop timer immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      abortControllerRef.current = null;

      // Persist completed investigation
      saveInvestigation(trimmed, data.run_id, 'completed');

      // Update state: immediately remove processing/waiting and display results
      setIsLongRunning(false);
      hasDismissedLongRunningRef.current = false;
      setResult(data);
      setWorkspaceState('results');
    } catch (err: unknown) {
      // Stop timer immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      abortControllerRef.current = null;
      setIsLongRunning(false);
      hasDismissedLongRunningRef.current = false;

      const diagnostic = formatErrorDiagnostic(err);

      if (diagnostic.isAbort || controller.signal.aborted) {
        // User cancelled -> clean return to idle state
        setWorkspaceState('input');
        setError(null);
      } else {
        // Real API or network error -> transition to error state
        setError(diagnostic);
        setWorkspaceState('error');
        saveInvestigation(trimmed, undefined, 'failed');
      }
    }
  }, []);

  const retryInvestigation = useCallback(() => {
    if (question) {
      startInvestigation(question);
    } else {
      setWorkspaceState('input');
    }
  }, [question, startInvestigation]);

  const resetToInput = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setWorkspaceState('input');
    setError(null);
    setIsLongRunning(false);
    hasDismissedLongRunningRef.current = false;
    setSecondsElapsed(0);
  }, []);

  return {
    workspaceState,
    question,
    setQuestion,
    result,
    error,
    secondsElapsed,
    isLongRunning,
    startInvestigation,
    cancelInvestigation,
    continueWaiting,
    retryInvestigation,
    resetToInput,
  };
}
