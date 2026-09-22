import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print border-t border-rule mt-auto bg-paper">
      {/* Thin gradient accent bar */}
      <div className="h-0.5 bg-gradient-coral-peach" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-rule">
          <div>
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="font-serif text-xl text-ink-deep font-normal">
                COGNILAB
              </span>
              <span className="font-mono text-[9px] text-ink-muted uppercase tracking-widest font-bold">
                EDITION // 2026
              </span>
            </div>
            <p className="font-sans text-xs text-ink-soft max-w-sm leading-relaxed">
              An autonomous research experimentation platform for turning hypothesis questions into structured, reproducible experiments.
            </p>
          </div>

          {/* Agent color legend */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
              <span className="w-2.5 h-2.5 bg-cobalt inline-block" />
              <span>01 Research</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
              <span className="w-2.5 h-2.5 bg-coral inline-block" />
              <span>02 Hypothesis + Design</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
              <span className="w-2.5 h-2.5 bg-mustard inline-block" />
              <span>03 Experiment</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
              <span className="w-2.5 h-2.5 bg-sage inline-block" />
              <span>04 Analysis + Critic</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
              <span className="w-2.5 h-2.5 bg-lavender inline-block" />
              <span>05 Report / App</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-ink-faint">
          <p>© Cognilab Research Systems. All specifications strictly reproducible.</p>
          <div className="flex items-center gap-4">
            <span>FastAPI + Pydantic v2</span>
            <span>•</span>
            <span>Azure AI Foundry</span>
            <span>•</span>
            <span>React 18 + TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
