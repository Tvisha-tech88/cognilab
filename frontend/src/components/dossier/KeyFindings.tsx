import React from 'react';

interface KeyFindingsProps {
  findings?: (string | Record<string, unknown>)[];
}

export const KeyFindings: React.FC<KeyFindingsProps> = ({ findings = [] }) => {
  if (!findings || findings.length === 0) {
    return (
      <section className="border-b border-rule pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            01 / KEY FINDINGS
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted italic">
          No key findings were reported in this literature run.
        </p>
      </section>
    );
  }

  return (
    <section className="border-b border-rule pb-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-cobalt leading-none">01</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              KEY FINDINGS
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              Literature Synthesis
            </span>
          </div>
        </div>
        <span className="font-mono text-xs text-ink-muted px-2 py-0.5 border border-cobalt-border bg-cobalt-light text-cobalt">
          {findings.length} DISCOVERIES
        </span>
      </div>

      <div className="space-y-3">
        {findings.map((finding, idx) => {
          let text = '';
          if (typeof finding === 'string') {
            text = finding;
          } else if (finding && typeof finding === 'object') {
            text =
              (finding.finding as string) ||
              (finding.claim as string) ||
              (finding.text as string) ||
              JSON.stringify(finding);
          }

          return (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 sm:p-6 bg-paper-sheet border border-rule hover:border-cobalt transition-colors group"
            >
              <span className="font-mono text-xl font-bold text-cobalt/40 group-hover:text-cobalt pt-0.5 shrink-0 transition-colors leading-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="font-serif text-lg sm:text-xl text-ink leading-relaxed flex-1">
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
