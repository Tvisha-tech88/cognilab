import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SourceItem } from '../../types/research';
import { sanitizeExternalUrl } from '../../utils/formatting';

interface SourcesSectionProps {
  sources?: (string | SourceItem)[];
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({ sources = [] }) => {
  if (!sources || sources.length === 0) {
    return (
      <section className="border-b border-rule pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            05 / SOURCES
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted italic">
          No external references or literature sources documented.
        </p>
      </section>
    );
  }

  return (
    <section className="border-b border-rule pb-12">
      {/* Sage styling for Bibliographic Sources */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-sage leading-none">05</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              BIBLIOGRAPHIC SOURCES
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Academic Literature &amp; Citations
            </span>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 border border-sage-border bg-sage-light text-sage font-medium">
          {sources.length} REFERENCES
        </span>
      </div>

      {/* Sources Table */}
      <div className="bg-paper-sheet border border-sage-border/60 divide-y divide-rule shadow-paper-sm overflow-hidden">
        {sources.map((item, idx) => {
          let title = '';
          let sourceType = '';
          let relevance: string | number | undefined = undefined;
          let rawUrl = '';

          if (typeof item === 'string') {
            title = item;
          } else if (item && typeof item === 'object') {
            const rawObj = item as Record<string, unknown>;
            title =
              typeof item.title === 'string'
                ? item.title
                : typeof rawObj.name === 'string'
                ? rawObj.name
                : typeof rawObj.citation === 'string'
                ? rawObj.citation
                : 'Untitled Academic Reference';
            sourceType =
              typeof item.type === 'string'
                ? item.type
                : typeof item.source_type === 'string'
                ? item.source_type
                : 'Literature';
            // CONSTRAINT: Display ONLY the relevance value returned by the backend verbatim.
            relevance = item.relevance;
            rawUrl =
              typeof item.url === 'string'
                ? item.url
                : typeof rawObj.link === 'string'
                ? rawObj.link
                : '';
          }

          const safeUrl = sanitizeExternalUrl(rawUrl);

          return (
            <div
              key={idx}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-sage-light/30 transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-sage-dark">
                    [{String(idx + 1).padStart(2, '0')}]
                  </span>

                  {sourceType && (
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-rule bg-paper text-ink-soft">
                      {sourceType}
                    </span>
                  )}

                  {/* Display ONLY the backend-provided relevance value verbatim */}
                  {relevance !== undefined && relevance !== null && (
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-sage-border bg-sage-light text-sage font-medium">
                      Relevance: {String(relevance)}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg text-ink-deep font-normal leading-snug">
                  {title}
                </h3>
              </div>

              {safeUrl ? (
                <a
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-sage-border hover:border-sage bg-paper text-ink font-mono text-xs tracking-wider uppercase transition-colors shrink-0 self-start md:self-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-sage"
                >
                  <span>VIEW SOURCE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sage group-hover:text-sage-dark transition-colors" />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-ink-faint shrink-0 self-start md:self-center">
                  Internal Citation
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
