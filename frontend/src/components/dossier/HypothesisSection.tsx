import React from 'react';

interface HypothesisSectionProps {
  hypothesis?: string;
  evidenceUsed?: (string | Record<string, unknown>)[];
}

export const HypothesisSection: React.FC<HypothesisSectionProps> = ({
  hypothesis,
  evidenceUsed = [],
}) => {
  if (!hypothesis) {
    return null;
  }

  return (
    <section className="border-b border-rule pb-14">
      {/* Coral / pink styling for Hypothesis */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-coral leading-none">06</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              FORMULATED HYPOTHESIS
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Empirical Formulation
            </span>
          </div>
        </div>
        <span className="font-mono text-[11px] px-2.5 py-0.5 border border-coral-border bg-blush-light text-coral font-semibold uppercase">
          TESTABLE SPECIFICATION (H₁)
        </span>
      </div>

      <div className="bg-paper-warm border-2 border-coral p-6 sm:p-10 relative shadow-warm">
        <div className="absolute top-0 right-0 bg-coral text-white px-3.5 py-1 font-mono text-[10px] tracking-widest uppercase font-bold">
          PRIMARY HYPOTHESIS
        </div>

        <span className="font-serif text-5xl sm:text-6xl text-coral leading-none block select-none -mb-4" aria-hidden="true">
          &ldquo;
        </span>

        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink-deep font-normal leading-snug tracking-tight mb-6">
          {hypothesis}
        </p>

        {evidenceUsed && evidenceUsed.length > 0 && (
          <div className="mt-8 pt-5 border-t border-rule/80 flex flex-col sm:flex-row sm:items-baseline gap-3 text-xs font-mono">
            <span className="text-coral uppercase font-bold tracking-wider shrink-0">
              GROUNDED IN EVIDENCE:
            </span>
            <div className="flex flex-wrap gap-2 text-ink-muted">
              {evidenceUsed.map((ev, i) => {
                const text =
                  typeof ev === 'string'
                    ? ev
                    : (ev.claim as string) || (ev.title as string) || JSON.stringify(ev);
                return (
                  <span
                    key={i}
                    className="bg-paper-sheet border border-coral-border/60 px-2.5 py-0.5 text-ink-soft text-[11px]"
                  >
                    #{i + 1} {text.slice(0, 48)}...
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
