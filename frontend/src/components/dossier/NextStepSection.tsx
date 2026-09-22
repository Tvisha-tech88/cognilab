import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NextStepSectionProps {
  experimentNextStep?: string;
  researchNextStep?: string;
}

export const NextStepSection: React.FC<NextStepSectionProps> = ({
  experimentNextStep,
  researchNextStep,
}) => {
  const primaryStep = experimentNextStep || researchNextStep;

  if (!primaryStep) {
    return null;
  }

  return (
    <section className="pb-8">
      {/* Cobalt styling for Next Step */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-cobalt leading-none">09</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              NEXT STEP
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Pipeline Transition
            </span>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 border border-cobalt-border bg-cobalt-light text-cobalt font-medium uppercase">
          STAGE 03 READY
        </span>
      </div>

      <div className="bg-paper-sheet border-2 border-cobalt p-6 sm:p-8 relative shadow-cobalt">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 bg-cobalt text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="font-mono text-[10px] tracking-widest uppercase text-cobalt font-bold block mb-2">
              RECOMMENDED DOWNSTREAM ACTION:
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-ink-deep font-normal leading-relaxed">
              {primaryStep}
            </p>

            {researchNextStep && researchNextStep !== experimentNextStep && (
              <div className="mt-5 pt-3 border-t border-rule/60 text-xs font-mono text-ink-muted">
                <span className="text-cobalt uppercase font-bold mr-2">
                  Research Note:
                </span>
                <span>{researchNextStep}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-rule/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-ink-muted">
          <span className="text-cobalt font-semibold">Agent 03 (Experiment Agent) Stage Ready</span>
          <span className="text-ink-faint">Specification Stored in Run Store</span>
        </div>
      </div>
    </section>
  );
};
