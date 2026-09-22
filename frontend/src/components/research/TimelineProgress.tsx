import React, { useState, useEffect } from 'react';
import { Loader2, Check, X, Hourglass } from 'lucide-react';

interface TimelineProgressProps {
  question: string;
  secondsElapsed: number;
  isLongRunning: boolean;
  onCancel: () => void;
  onContinueWaiting: () => void;
}

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  transitionAfterSeconds: number;
  activeBg: string;
  activeText: string;
  completedBg: string;
}

const ACTIVE_PIPELINE_STEPS: Step[] = [
  {
    id: 'research_agent',
    number: '01',
    title: 'RESEARCH AGENT',
    description: 'Literature retrieval, RAG extraction & empirical claim grounding',
    transitionAfterSeconds: 8,
    activeBg: 'bg-cobalt',
    activeText: 'text-cobalt',
    completedBg: 'bg-cobalt',
  },
  {
    id: 'hypothesis_experiment_agent',
    number: '02',
    title: 'HYPOTHESIS + EXPERIMENT DESIGN AGENT',
    description: 'Formulating testable H₁, 10-parameter design & deterministic critic validation',
    transitionAfterSeconds: 16,
    activeBg: 'bg-coral',
    activeText: 'text-coral',
    completedBg: 'bg-cobalt',
  },
];

export const TimelineProgress: React.FC<TimelineProgressProps> = ({
  question,
  secondsElapsed,
  isLongRunning,
  onCancel,
  onContinueWaiting,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (secondsElapsed < 10) {
      setActiveStepIndex(0);
    } else {
      setActiveStepIndex(1);
    }
  }, [secondsElapsed]);

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {/* Top Status Card */}
      <div className="bg-paper-sheet border border-rule shadow-paper mb-6 overflow-hidden">
        {/* Active gradient pulse line */}
        <div className="h-1 bg-gradient-coral-peach" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-rule">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-coral font-bold block mb-1">
                INVESTIGATION IN PROGRESS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink-deep font-normal">
                Autonomous Laboratory Workflow
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-ink-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse inline-block" />
                <span>PROCESSING REQUEST</span>
              </div>
              <div className="h-3 w-[1px] bg-rule" aria-hidden="true" />
              <span className="font-bold text-ink-deep font-mono">T+{secondsElapsed}s</span>
            </div>
          </div>

          {/* Inquiry text */}
          <div className="mt-5">
            <span className="font-mono text-[10px] tracking-wider uppercase text-ink-muted block mb-1 font-semibold">
              RESEARCH INQUIRY:
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-ink leading-relaxed">
              &ldquo;{question}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Long-Running Advisory Notice — Appears ONLY when active request exceeds threshold */}
      {isLongRunning && (
        <div
          role="alert"
          className="mb-6 bg-cobalt-light border-2 border-cobalt shadow-cobalt p-6 transition-all animate-in fade-in duration-300"
        >
          <div className="flex items-start gap-3">
            <Hourglass className="w-5 h-5 text-cobalt shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-xs tracking-widest uppercase font-bold text-cobalt mb-1">
                RESEARCH ENGINE STILL WORKING
              </h3>
              <p className="font-sans text-sm text-ink leading-relaxed mb-4">
                Cognilab is processing the investigation. This may take a little longer depending on research literature volume and Azure model execution time.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onContinueWaiting}
                  className="px-5 py-2.5 bg-cobalt hover:bg-cobalt-dark text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  CONTINUE WAITING
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-2.5 border-2 border-ink bg-paper-sheet hover:bg-ink text-ink hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investigation Timeline */}
      <div className="bg-paper-sheet border border-rule shadow-paper overflow-hidden">
        <div className="px-6 sm:px-8 py-4 border-b border-rule flex items-center justify-between bg-paper">
          <h3 className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            ACTIVE AGENT STAGES IN BACKEND
          </h3>
          <span className="font-mono text-[10px] text-ink-faint uppercase">
            FastAPI Live Orchestrator
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-6 relative">
          {ACTIVE_PIPELINE_STEPS.map((step, index) => {
            const isCompleted = index < activeStepIndex;
            const isCurrent = index === activeStepIndex;
            const isLast = index === ACTIVE_PIPELINE_STEPS.length - 1;

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={`absolute left-[15px] top-[32px] bottom-[-24px] w-[1px] transition-colors duration-500 ${
                      isCompleted
                        ? 'bg-cobalt'
                        : isCurrent
                        ? step.activeBg
                        : 'bg-rule'
                    }`}
                    aria-hidden="true"
                  />
                )}

                {/* Node indicator */}
                <div
                  className={`relative z-10 w-8 h-8 flex items-center justify-center font-mono text-xs transition-all duration-300 shrink-0 ${
                    isCompleted
                      ? 'bg-cobalt text-white'
                      : isCurrent
                      ? `${step.activeBg} text-white shadow-paper-sm animate-pulse-ring`
                      : 'border border-rule bg-paper text-ink-faint'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Step labels */}
                <div className="pt-0.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span
                      className={`font-mono text-sm tracking-wider uppercase font-bold ${
                        isCurrent
                          ? step.activeText
                          : isCompleted
                          ? 'text-cobalt'
                          : 'text-ink-faint'
                      }`}
                    >
                      {step.title}
                    </span>
                    {isCurrent && (
                      <span className={`font-mono text-[10px] uppercase ${step.activeText} bg-paper border border-rule px-2 py-0.5 animate-pulse`}>
                        PROCESSING
                      </span>
                    )}
                    {isCompleted && (
                      <span className="font-mono text-[10px] uppercase text-cobalt font-medium">
                        ✓ DONE
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm mt-1 leading-relaxed font-sans ${
                      isCurrent
                        ? 'text-ink-soft font-medium'
                        : isCompleted
                        ? 'text-ink-muted'
                        : 'text-ink-faint'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Downstream Stage Notice */}
        <div className="px-6 sm:px-8 py-3 bg-paper-subtle/50 border-t border-rule font-mono text-[10px] text-ink-muted flex flex-wrap items-center gap-3">
          <span className="font-semibold text-ink-deep">DOWNSTREAM PIPELINE:</span>
          <span>03 Experiment (Upcoming)</span>
          <span>•</span>
          <span>04 Analysis + Critic (Upcoming)</span>
          <span>•</span>
          <span>05 Report / Application (Upcoming)</span>
        </div>

        {/* Footer controls */}
        <div className="px-6 sm:px-8 py-4 border-t border-rule bg-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-muted">
          <p className="text-[11px] leading-relaxed max-w-md italic">
            * Executing live against local FastAPI research backend at 127.0.0.1:8000.
          </p>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-ink hover:border-coral text-ink-deep hover:text-coral font-mono text-xs uppercase tracking-wider font-bold transition-colors self-start sm:self-auto cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
