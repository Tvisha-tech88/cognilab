import React from 'react';

interface LimitationsSectionProps {
  contradictory?: (string | Record<string, unknown>)[];
  uncertainties?: (string | Record<string, unknown>)[];
}

export const LimitationsSection: React.FC<LimitationsSectionProps> = ({
  contradictory = [],
  uncertainties = [],
}) => {
  const hasContradictory = contradictory && contradictory.length > 0;
  const hasUncertainties = uncertainties && uncertainties.length > 0;

  if (!hasContradictory && !hasUncertainties) {
    return (
      <section className="border-b border-rule pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            03 / LIMITATIONS
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted italic">
          No contradictory evidence or experimental uncertainties reported.
        </p>
      </section>
    );
  }

  const renderText = (item: string | Record<string, unknown>): string => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object') {
      return (
        (item.claim as string) ||
        (item.point as string) ||
        (item.description as string) ||
        (item.uncertainty as string) ||
        (item.text as string) ||
        JSON.stringify(item)
      );
    }
    return '';
  };

  return (
    <section className="border-b border-rule pb-12">
      {/* Mustard / cream treatment for limitations */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-mustard leading-none">03</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              LIMITATIONS &amp; UNCERTAINTIES
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Boundary Conditions
            </span>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 border border-mustard-border bg-mustard-light text-mustard-dark font-medium">
          {(contradictory?.length || 0) + (uncertainties?.length || 0)} FACTORS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contradictory Evidence with mustard/cream tone */}
        <div className="bg-paper-warm border border-mustard/30 p-6 shadow-paper-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-mustard/20">
            <span className="w-2 h-2 bg-mustard inline-block" aria-hidden="true" />
            <h3 className="font-mono text-xs tracking-wider uppercase font-bold text-mustard-dark">
              Contradictory Evidence
            </h3>
          </div>

          {hasContradictory ? (
            <ul className="space-y-3 font-sans text-sm text-ink leading-relaxed">
              {contradictory.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-mustard font-bold shrink-0 mt-0.5">
                    —
                  </span>
                  <span>{renderText(item)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-sans text-xs text-ink-muted italic">
              No contradictory evidence detected in current literature.
            </p>
          )}
        </div>

        {/* Methodological Uncertainties */}
        <div className="bg-paper-warm border border-mustard/30 p-6 shadow-paper-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-mustard/20">
            <span className="w-2 h-2 bg-mustard-dark inline-block" aria-hidden="true" />
            <h3 className="font-mono text-xs tracking-wider uppercase font-bold text-ink-deep">
              Methodological Uncertainties
            </h3>
          </div>

          {hasUncertainties ? (
            <ul className="space-y-3 font-sans text-sm text-ink leading-relaxed">
              {uncertainties.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-mustard font-bold shrink-0 mt-0.5">
                    ?
                  </span>
                  <span>{renderText(item)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-sans text-xs text-ink-muted italic">
              No explicit uncertainties noted.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
