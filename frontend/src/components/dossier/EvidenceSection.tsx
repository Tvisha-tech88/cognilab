import React from 'react';
import type { SupportingEvidenceItem } from '../../types/research';

interface EvidenceSectionProps {
  evidence?: (string | SupportingEvidenceItem)[];
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({ evidence = [] }) => {
  if (!evidence || evidence.length === 0) {
    return (
      <section className="border-b border-rule pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            02 / EVIDENCE
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted italic">
          No supporting empirical evidence items extracted.
        </p>
      </section>
    );
  }

  return (
    <section className="border-b border-rule pb-12">
      {/* Powder blue / lavender styling for Evidence */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-powder-dark leading-none">02</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              SUPPORTING EVIDENCE
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Empirical Claims &amp; Data
            </span>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 border border-lavender-border bg-lavender-light text-lavender-dark font-medium">
          {evidence.length} CITATIONS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidence.map((item, idx) => {
          let claim = '';
          let source = '';

          if (typeof item === 'string') {
            claim = item;
          } else if (item && typeof item === 'object') {
            claim =
              item.claim ||
              item.evidence ||
              item.description ||
              (item.text as string) ||
              JSON.stringify(item);
            source = item.source || (item.reference as string) || '';
          }

          return (
            <div
              key={idx}
              className="bg-paper-sheet border border-powder-dark/30 p-5 flex flex-col justify-between hover:border-lavender-dark transition-colors shadow-paper-sm"
            >
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-powder-dark block mb-2 font-semibold">
                  EMPIRICAL CLAIM // #{String(idx + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-sm sm:text-base text-ink leading-relaxed font-normal">
                  &ldquo;{claim}&rdquo;
                </p>
              </div>

              {source && (
                <div className="mt-4 pt-3 border-t border-rule/60 flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-lavender-dark font-medium">
                    SOURCE:
                  </span>
                  <span className="font-mono text-xs text-ink-muted truncate">
                    {source}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
