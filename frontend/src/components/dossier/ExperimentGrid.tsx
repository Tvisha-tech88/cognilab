import React from 'react';
import type { ExperimentSpec } from '../../types/research';

interface ExperimentGridProps {
  experiment?: ExperimentSpec;
}

export const ExperimentGrid: React.FC<ExperimentGridProps> = ({ experiment }) => {
  if (!experiment) {
    return (
      <section className="border-b border-rule pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-muted">
            07 / EXPERIMENT DESIGN
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted italic">
          No experiment specification generated.
        </p>
      </section>
    );
  }

  const renderValue = (val: unknown): React.ReactNode => {
    if (val === null || val === undefined || val === '') {
      return <span className="text-ink-faint italic font-sans text-xs">Not specified</span>;
    }
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
      return <span className="font-sans text-sm text-ink leading-relaxed">{String(val)}</span>;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="text-ink-faint italic font-sans text-xs">Not specified</span>;
      }
      return (
        <ul className="space-y-1.5 mt-1">
          {val.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs font-mono text-ink">
              <span className="text-peach font-bold shrink-0">•</span>
              <span className="leading-relaxed">
                {typeof item === 'object' ? JSON.stringify(item) : String(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    if (typeof val === 'object') {
      const entries = Object.entries(val as Record<string, unknown>);
      if (entries.length === 0) {
        return <span className="text-ink-faint italic font-sans text-xs">Not specified</span>;
      }
      return (
        <dl className="space-y-2 mt-1">
          {entries.map(([key, v]) => (
            <div key={key} className="text-xs">
              <dt className="font-mono text-[10px] uppercase text-ink-muted tracking-wider">
                {key.replace(/_/g, ' ')}:
              </dt>
              <dd className="font-sans text-ink-deep font-medium mt-0.5">
                {Array.isArray(v) ? (
                  <span className="font-mono text-xs">{v.join(', ')}</span>
                ) : typeof v === 'object' ? (
                  <span className="font-mono text-[11px] text-ink-soft">{JSON.stringify(v)}</span>
                ) : (
                  String(v ?? 'Not specified')
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
    }
    return String(val);
  };

  return (
    <section className="border-b border-rule pb-12">
      {/* Peach / mustard styling for Experiment Design */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-5xl font-bold text-peach-muted leading-none">07</span>
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              EXPERIMENT DESIGN
            </h2>
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              10-Parameter Formal Specification
            </span>
          </div>
        </div>
        <span className="font-mono text-[11px] text-mustard-dark px-2.5 py-0.5 border border-mustard-border bg-mustard-light font-medium uppercase">
          DETERMINISTIC VERIFIED
        </span>
      </div>

      {/* Structured Grid */}
      <div className="border border-rule bg-paper-sheet divide-y divide-rule shadow-paper-sm">
        {/* Row 1: Core Research Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule">
          {/* TASK */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-1.5 font-semibold">
              TASK
            </span>
            <div className="font-serif text-lg text-ink-deep font-normal leading-snug">
              {renderValue(experiment.task)}
            </div>
          </div>

          {/* INDEPENDENT VARIABLE (Peach highlight) */}
          <div className="p-5 bg-peach-light/40 border-l-0">
            <span className="font-mono text-[10px] tracking-widest uppercase text-coral block mb-1.5 font-bold">
              INDEPENDENT VARIABLE
            </span>
            <div className="font-sans text-sm font-semibold text-ink-deep">
              {renderValue(experiment.independent_variable)}
            </div>
          </div>

          {/* DEPENDENT VARIABLES */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-1.5 font-semibold">
              DEPENDENT VARIABLES
            </span>
            <div>{renderValue(experiment.dependent_variables)}</div>
          </div>
        </div>

        {/* Row 2: Baseline vs Treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule">
          {/* BASELINE (Mustard light) */}
          <div className="p-5 bg-mustard-light/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-mustard" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-mustard-dark font-bold">
                BASELINE (CONTROL CONDITION)
              </span>
            </div>
            <div>{renderValue(experiment.baseline)}</div>
          </div>

          {/* TREATMENT (Peach light) */}
          <div className="p-5 bg-peach-light/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-peach" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-coral font-bold">
                TREATMENT (EXPERIMENTAL CONDITION)
              </span>
            </div>
            <div>{renderValue(experiment.treatment)}</div>
          </div>
        </div>

        {/* Row 3: Technical Prerequisites */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule">
          {/* DATASET REQUIREMENTS */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-2 font-semibold">
              DATASET REQUIREMENTS
            </span>
            <div>{renderValue(experiment.dataset_requirements)}</div>
          </div>

          {/* MODEL REQUIREMENTS */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-2 font-semibold">
              MODEL REQUIREMENTS
            </span>
            <div>{renderValue(experiment.model_requirements)}</div>
          </div>
        </div>

        {/* Row 4: Verification & Execution */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule">
          {/* METRICS */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-1.5 font-semibold">
              METRICS
            </span>
            <div>{renderValue(experiment.metrics)}</div>
          </div>

          {/* CONTROLS */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-1.5 font-semibold">
              CONTROLS &amp; REPRODUCIBILITY
            </span>
            <div>{renderValue(experiment.controls)}</div>
          </div>

          {/* EXECUTION REQUIREMENTS */}
          <div className="p-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-1.5 font-semibold">
              EXECUTION REQUIREMENTS
            </span>
            <div>{renderValue(experiment.execution_requirements)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
