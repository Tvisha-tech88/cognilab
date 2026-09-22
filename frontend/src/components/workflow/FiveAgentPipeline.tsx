import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface FiveAgentPipelineProps {
  currentStage?: 'idle' | 'researching' | 'results';
  className?: string;
}

interface PipelineStep {
  number: string;
  name: string;
  subtext: string;
  status: 'active' | 'upcoming';
  color: string;
  isCurrentlyExecuting?: boolean;
  isComplete?: boolean;
}

export const FiveAgentPipeline: React.FC<FiveAgentPipelineProps> = ({
  currentStage = 'idle',
  className = '',
}) => {
  const steps: PipelineStep[] = [
    {
      number: '01',
      name: 'Research Agent',
      subtext: 'Literature & Evidence Synthesis',
      status: 'active',
      color: 'cobalt',
      isCurrentlyExecuting: currentStage === 'researching',
      isComplete: currentStage === 'results',
    },
    {
      number: '02',
      name: 'Hypothesis + Exp Design',
      subtext: 'Testable H₁ & 10-Param Spec',
      status: 'active',
      color: 'coral',
      isCurrentlyExecuting: currentStage === 'researching',
      isComplete: currentStage === 'results',
    },
    {
      number: '03',
      name: 'Experiment Agent',
      subtext: 'Controlled ML Trial Execution',
      status: 'upcoming',
      color: 'mustard',
    },
    {
      number: '04',
      name: 'Analysis + Critic Agent',
      subtext: 'Result Evaluation & AI Critique',
      status: 'upcoming',
      color: 'sage',
    },
    {
      number: '05',
      name: 'Report / App Agent',
      subtext: 'Unified Report & Visual UI',
      status: 'upcoming',
      color: 'lavender',
    },
  ];

  return (
    <aside
      className={`border border-rule bg-paper p-5 sm:p-6 select-none ${className}`}
      aria-label="Cognilab Five-Agent Workflow Architecture"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-rule">
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-coral font-bold block">
            ARCHITECTURE
          </span>
          <h2 className="font-serif text-lg tracking-tight text-ink-deep font-normal mt-0.5">
            Five-Agent Pipeline
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 border border-rule text-ink-muted bg-paper-sheet font-bold">
          SYS.01
        </span>
      </div>

      <ol className="space-y-0 relative">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;

          return (
            <li key={step.number} className="relative">
              {/* Vertical connector rule */}
              {!isLast && (
                <div
                  className={`absolute left-[13px] top-[24px] bottom-[-8px] w-[1px] ${
                    step.isComplete
                      ? 'bg-ink'
                      : step.isCurrentlyExecuting
                      ? 'bg-coral'
                      : 'bg-rule'
                  }`}
                  aria-hidden="true"
                />
              )}

              <div className="flex items-start gap-3 py-2.5 group">
                {/* Node number badge */}
                <div
                  className={`relative z-10 w-7 h-7 flex items-center justify-center font-mono text-xs border transition-colors shrink-0 ${
                    step.isCurrentlyExecuting
                      ? 'border-coral bg-coral text-white font-semibold shadow-warm animate-pulse'
                      : step.isComplete
                      ? 'border-ink bg-ink text-white font-medium'
                      : step.status === 'active'
                      ? 'border-rule bg-paper-sheet text-ink-soft'
                      : 'border-rule/70 bg-paper-subtle text-ink-faint'
                  }`}
                >
                  {step.number}
                </div>

                {/* Descriptor */}
                <div className="pt-0.5 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-mono text-xs tracking-wider uppercase ${
                        step.isCurrentlyExecuting
                          ? 'text-coral font-bold'
                          : step.isComplete
                          ? 'text-ink-deep font-semibold'
                          : step.status === 'active'
                          ? 'text-ink-deep font-medium'
                          : 'text-ink-faint'
                      }`}
                    >
                      {step.name}
                    </span>

                    {step.status === 'active' ? (
                      step.isCurrentlyExecuting ? (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-coral bg-coral-light px-1.5 py-0.2 border border-coral-border font-bold">
                          RUNNING
                        </span>
                      ) : step.isComplete ? (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-sage font-bold">
                          ✓ DONE
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-sage flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>ACTIVE</span>
                        </span>
                      )
                    ) : (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint border border-rule/60 px-1 py-0.2 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>UPCOMING</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ink-muted leading-relaxed font-sans truncate">
                    {step.subtext}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 pt-3 border-t border-rule">
        <p className="text-[11px] font-mono text-ink-faint leading-normal">
          Agents 01 &amp; 02 run via Azure AI Foundry backend. Agents 03–05 represent upcoming downstream stages.
        </p>
      </div>
    </aside>
  );
};
