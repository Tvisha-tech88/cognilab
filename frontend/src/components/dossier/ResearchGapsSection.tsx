import React from 'react';

interface ResearchGapsSectionProps {
  gaps?: (string | Record<string, unknown>)[];
}

export const ResearchGapsSection: React.FC<ResearchGapsSectionProps> = ({ gaps = [] }) => {
  if (!gaps || gaps.length === 0) {
    return (
      <section className="border-b border-rule pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            04 / RESEARCH GAPS
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted italic">
          No research gaps explicitly cataloged.
        </p>
      </section>
    );
  }

  const renderText = (item: string | Record<string, unknown>): string => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object') {
      return (
        (item.gap as string) ||
        (item.description as string) ||
        (item.title as string) ||
        (item.text as string) ||
        JSON.stringify(item)
      );
    }
    return '';
  };

  return (
    <section className="border-b border-rule pb-12">
      {/* Coral / peach treatment for Research Gaps */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-coral leading-none">04</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              RESEARCH GAPS
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Unaddressed Literature Vectors
            </span>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 border border-coral-border bg-peach-light text-coral font-medium">
          {gaps.length} UNEXPLORED DOMAINS
        </span>
      </div>

      <div className="space-y-3">
        {gaps.map((gap, idx) => (
          <div
            key={idx}
            className="p-5 bg-paper-sheet border-l-4 border-l-coral border-t border-r border-b border-rule flex items-start gap-4 shadow-paper-sm hover:border-l-peach transition-colors"
          >
            <span className="font-mono text-xs text-coral font-bold shrink-0 pt-0.5">
              GAP {String(idx + 1).padStart(2, '0')}
            </span>
            <p className="font-sans text-base text-ink-deep leading-relaxed flex-1">
              {renderText(gap)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
