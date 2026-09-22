import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import type { ResearchRunResponse } from '../../types/research';
import { formatInvestigationDate } from '../../utils/formatting';
import { KeyFindings } from './KeyFindings';
import { EvidenceSection } from './EvidenceSection';
import { LimitationsSection } from './LimitationsSection';
import { ResearchGapsSection } from './ResearchGapsSection';
import { SourcesSection } from './SourcesSection';
import { HypothesisSection } from './HypothesisSection';
import { ExperimentGrid } from './ExperimentGrid';
import { ValidationBanner } from './ValidationBanner';
import { NextStepSection } from './NextStepSection';

interface ResearchDossierProps {
  data: ResearchRunResponse;
  onNewInvestigation: () => void;
}

export const ResearchDossier: React.FC<ResearchDossierProps> = ({
  data,
  onNewInvestigation,
}) => {
  const [showRawOutput, setShowRawOutput] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const researchData = data.result?.research?.research_evidence;
  const experimentPlan = data.result?.experiment?.experiment_plan;
  const rawResearchText = data.result?.research?.response_text;
  const rawExperimentText = data.result?.experiment?.response_text;

  const copyRunId = () => {
    if (data.run_id) {
      navigator.clipboard.writeText(data.run_id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const formattedDate = formatInvestigationDate(data.timestamp);

  return (
    <div className="w-full print-page max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-rule">
        <button
          type="button"
          onClick={onNewInvestigation}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold text-ink-deep hover:text-coral transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>← NEW INVESTIGATION</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Copy Run ID */}
          <button
            type="button"
            onClick={copyRunId}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-rule hover:border-cobalt bg-paper text-ink font-mono text-xs tracking-wider transition-colors cursor-pointer"
            title="Copy Run ID"
          >
            {copiedId ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5 text-ink-muted" />}
            <span className="truncate max-w-[140px] sm:max-w-none">
              {data.run_id ? `RUN: ${data.run_id.slice(0, 8)}...` : 'RUN SPEC'}
            </span>
          </button>

          {/* Print Dossier */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-rule hover:border-ink bg-paper text-ink font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-ink-muted" />
            <span className="hidden sm:inline">PRINT DOSSIER</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Document */}
      <article className="bg-paper-sheet border border-rule shadow-paper-lg relative overflow-hidden">
        {/* Coral accent bar at document top */}
        <div className="h-2 bg-gradient-coral-peach" />

        <div className="p-6 sm:p-10 md:p-14">
          {/* Registry corner marks */}
          <div className="absolute top-2 left-0 w-4 h-4 border-t border-l border-ink/20" aria-hidden="true" />
          <div className="absolute top-2 right-0 w-4 h-4 border-t border-r border-ink/20" aria-hidden="true" />

          {/* Dossier Masthead */}
          <header className="border-b-2 border-ink pb-8 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-5">
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral">
                RESEARCH DOSSIER / 01
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted">
                <span>TIMESTAMP: {formattedDate}</span>
                <span>•</span>
                <span className="font-semibold text-sage">
                  STATUS: {data.status?.toUpperCase() || 'COMPLETED'}
                </span>
              </div>
            </div>

            {/* Agent status badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-cobalt text-white font-semibold">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
                01 RESEARCH AGENT — ACTIVE
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-coral text-white font-semibold">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
                02 HYPOTHESIS + EXP DESIGN — ACTIVE
              </span>
              {['03 EXPERIMENT', '04 ANALYSIS + CRITIC', '05 REPORT / APP'].map(label => (
                <span key={label} className="inline-flex items-center font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-rule text-ink-faint">
                  {label} — UPCOMING
                </span>
              ))}
            </div>

            {/* Prominent Research Question */}
            <div>
              <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted block mb-3 font-semibold">
                INVESTIGATION SUBJECT:
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-deep font-normal tracking-tight leading-[1.1]">
                {data.research_question}
              </h1>
            </div>
          </header>

          {/* 9 Structured Sections */}
          <div className="space-y-14">
            {/* 01 / KEY FINDINGS */}
            <KeyFindings findings={researchData?.key_findings} />

            {/* 02 / EVIDENCE */}
            <EvidenceSection evidence={researchData?.supporting_evidence} />

            {/* 03 / LIMITATIONS */}
            <LimitationsSection
              contradictory={researchData?.contradictory_evidence}
              uncertainties={researchData?.uncertainties}
            />

            {/* 04 / RESEARCH GAPS */}
            <ResearchGapsSection gaps={researchData?.research_gaps} />

            {/* 05 / SOURCES */}
            <SourcesSection sources={researchData?.sources} />

            {/* 06 / HYPOTHESIS */}
            <HypothesisSection
              hypothesis={experimentPlan?.hypothesis}
              evidenceUsed={experimentPlan?.evidence_used}
            />

            {/* 07 / EXPERIMENT DESIGN */}
            <ExperimentGrid experiment={experimentPlan?.experiment} />

            {/* 08 / VALIDATION */}
            <ValidationBanner validation={experimentPlan?.validation} />

            {/* 09 / NEXT STEP */}
            <NextStepSection
              experimentNextStep={experimentPlan?.next_step}
              researchNextStep={researchData?.next_step}
            />
          </div>

          {/* Bottom Action Section */}
          <div className="no-print mt-14 pt-8 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-1 font-semibold">
                INVESTIGATION ARCHIVED
              </span>
              <p className="font-serif text-xl text-ink-deep">
                Specification stored and verified deterministically.
              </p>
            </div>

            <button
              type="button"
              onClick={onNewInvestigation}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-ink hover:bg-coral active:bg-coral-dark text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer border border-ink hover:border-coral"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span>← NEW INVESTIGATION</span>
            </button>
          </div>

          {/* Raw Model Inspection (secondary, collapsed) */}
          {(rawResearchText || rawExperimentText) && (
            <div className="no-print mt-10 pt-6 border-t border-rule">
              <button
                type="button"
                onClick={() => setShowRawOutput(!showRawOutput)}
                className="flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                <span>{showRawOutput ? 'Hide' : 'Inspect'} Raw Agent Model Outputs</span>
                {showRawOutput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showRawOutput && (
                <div className="mt-4 space-y-4 font-mono text-xs">
                  {rawResearchText && (
                    <div className="bg-paper p-4 border border-rule">
                      <span className="font-bold text-ink-deep block mb-2 uppercase">
                        Raw Agent 01 (Research) Text:
                      </span>
                      <pre className="whitespace-pre-wrap text-ink-soft overflow-x-auto max-h-96">
                        {rawResearchText}
                      </pre>
                    </div>
                  )}
                  {rawExperimentText && (
                    <div className="bg-paper p-4 border border-rule">
                      <span className="font-bold text-ink-deep block mb-2 uppercase">
                        Raw Agent 02 (Hypothesis) Text:
                      </span>
                      <pre className="whitespace-pre-wrap text-ink-soft overflow-x-auto max-h-96">
                        {rawExperimentText}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
