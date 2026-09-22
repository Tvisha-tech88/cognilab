import React from 'react';
import { RotateCcw, ArrowLeft, Terminal } from 'lucide-react';
import type { HumanReadableError } from '../../utils/errors';

interface ErrorStateProps {
  error: HumanReadableError;
  onRetry: () => void;
  onBackToQuestion: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  onBackToQuestion,
}) => {
  const isConnectionIssue = error.statusCode === 502 || error.statusCode === 503;

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="bg-paper-sheet border-2 border-coral shadow-paper p-6 sm:p-10 relative">
        {/* Editorial Diagnostic Tag */}
        <div className="absolute top-0 right-0 bg-coral text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
          {error.statusCode ? `DIAGNOSTIC // HTTP ${error.statusCode}` : 'DIAGNOSTIC NOTICE'}
        </div>

        <div className="flex items-start gap-4 pb-5 mb-6 border-b border-rule">
          <div className="w-8 h-8 bg-coral text-white flex items-center justify-center font-mono font-bold text-sm shrink-0 mt-1">
            !
          </div>
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-coral font-bold block mb-1">
              INVESTIGATION HALTED
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink-deep font-normal leading-tight">
              {error.title}
            </h2>
          </div>
        </div>

        <p className="font-sans text-sm sm:text-base text-ink-soft leading-relaxed mb-6">
          {error.subtitle}
        </p>

        {isConnectionIssue && (
          <div className="mb-8 p-4 bg-paper border border-rule font-mono text-xs">
            <div className="flex items-center gap-2 text-ink-deep font-semibold mb-2">
              <Terminal className="w-4 h-4 text-coral" />
              <span>FastAPI Backend Verification:</span>
            </div>
            <p className="text-ink-muted mb-2 font-sans text-xs">
              Confirm that your local Uvicorn development server is active at port 8000:
            </p>
            <div className="p-3 bg-ink text-paper select-all overflow-x-auto">
              <code>uvicorn backend.main:app --reload --port 8000</code>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-rule">
          <button
            onClick={onBackToQuestion}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-rule hover:border-ink bg-paper text-ink font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← BACK TO QUESTION</span>
          </button>

          {error.canRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-coral hover:bg-coral-hover text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-paper cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>TRY AGAIN</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
