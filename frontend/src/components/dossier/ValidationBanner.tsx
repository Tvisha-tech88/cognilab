import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import type { ExperimentValidation } from '../../types/research';

interface ValidationBannerProps {
  validation?: ExperimentValidation;
}

export const ValidationBanner: React.FC<ValidationBannerProps> = ({ validation }) => {
  const isValid = validation?.status?.toUpperCase() === 'VALID';
  const issues = validation?.issues || [];

  return (
    <section className="border-b border-rule pb-12">
      {/* Sage / cream styling for Deterministic Validation */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-sage leading-none">08</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              DETERMINISTIC VALIDATION
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Agent 02 Critic Verification
            </span>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 border border-sage-border bg-sage-light text-sage font-medium uppercase">
          RULE-BASED CRITIC
        </span>
      </div>

      <div
        className={`p-6 sm:p-8 border transition-colors shadow-paper-sm ${
          isValid
            ? 'bg-sage-light/40 border-sage'
            : 'bg-coral-light/50 border-coral'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-8 h-8 flex items-center justify-center font-mono text-xs shrink-0 ${
              isValid
                ? 'bg-sage text-white'
                : 'bg-coral text-white font-bold'
            }`}
          >
            {isValid ? <Check className="w-4 h-4 stroke-[2.5]" /> : '!'}
          </div>

          <h3
            className={`font-mono text-sm tracking-widest uppercase font-bold ${
              isValid ? 'text-sage-dark' : 'text-coral-dark'
            }`}
          >
            {isValid
              ? '✓ EXPERIMENT SPECIFICATION VALID'
              : '! EXPERIMENT SPECIFICATION REQUIRES REVISION'}
          </h3>
        </div>

        {issues.length > 0 ? (
          <div className="mt-5 pt-4 border-t border-rule/60">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-deep font-semibold block mb-2">
              Detected Validation Issues ({issues.length}):
            </span>
            <ul className="space-y-2">
              {issues.map((issue, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 font-mono text-xs text-ink-soft"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : isValid ? (
          <p className="font-sans text-sm text-sage-dark mt-3 leading-relaxed">
            The experiment design passes all deterministic schemas, independence constraints, and control prerequisites without hallucination.
          </p>
        ) : null}
      </div>
    </section>
  );
};
