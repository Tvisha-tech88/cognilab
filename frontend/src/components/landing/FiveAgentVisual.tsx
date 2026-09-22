import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import type { AgentArchitectureInfo } from '../../types/research';

interface FiveAgentVisualProps {
  onSelectStage?: (stageNumber: string) => void;
}

const AGENTS: AgentArchitectureInfo[] = [
  {
    number: '01',
    name: 'Research Agent',
    title: 'Evidence Retrieval & Literature Synthesis',
    description:
      'Finds relevant research papers and empirical evidence using RAG + Azure AI Search / Foundry IQ. Isolates claims and extracts bibliographic citations.',
    status: 'active',
    role: 'Literature Grounding',
    inputs: 'Open research question ("What does existing research tell us?")',
    outputs: 'Key findings, supporting evidence, contradictory claims, citations',
  },
  {
    number: '02',
    name: 'Hypothesis + Experiment Design Agent',
    title: 'Hypothesis Formulation & Deterministic Design',
    description:
      'Takes research evidence, generates a testable primary hypothesis (H₁), and specifies dataset, model, baseline, treatment, and metrics verified by a deterministic critic.',
    status: 'active',
    role: 'Hypothesis & Experiment Architecture',
    inputs: 'Synthesized research evidence ("What should we test, and how?")',
    outputs: 'Formal hypothesis, 10-spec experiment plan, critic validation status',
  },
  {
    number: '03',
    name: 'Experiment Agent',
    title: 'Controlled ML Experiment Execution',
    description:
      'Downstream agent that takes the experiment plan and actually executes the ML experiment using controlled Python/PyTorch execution tools, logging accuracy, loss, and latency.',
    status: 'upcoming',
    role: 'Trial Execution & Harness',
    inputs: 'Experiment plan & specification ("How do we actually test it?")',
    outputs: 'Raw accuracy, training loss curves, latency, compute telemetry',
  },
  {
    number: '04',
    name: 'Analysis + Critic Agent',
    title: 'Result Evaluation & AI Critique',
    description:
      'Downstream agent analyzing experiment results, checking whether conclusions are justified, identifying limitations, and suggesting subsequent trials using responsible AI evaluation.',
    status: 'upcoming',
    role: 'Scientific Critique & Verification',
    inputs: 'Empirical experiment telemetry ("Can we trust this result?")',
    outputs: 'Statistical significance, limitation flags, next trial recommendations',
  },
  {
    number: '05',
    name: 'Report / Application Agent',
    title: 'Unified Synthesis & Research Dossier',
    description:
      'Downstream agent combining research evidence, hypothesis, experiment data, and critique into the final camera-ready report and interactive dashboard application.',
    status: 'upcoming',
    role: 'Dossier Publication & Presentation',
    inputs: 'Complete research lifecycle ("How do we communicate it?")',
    outputs: 'Archival research report, interactive dashboard, reproducible bundle',
  },
];

const AGENT_ACCENTS: Record<string, { ring: string; badge: string; num: string; hoverBorder: string; mainQuestion: string }> = {
  '01': {
    ring: 'bg-cobalt',
    badge: 'bg-cobalt-light border-cobalt-border text-cobalt',
    num: 'text-cobalt',
    hoverBorder: 'hover:border-cobalt',
    mainQuestion: 'What does existing research tell us?',
  },
  '02': {
    ring: 'bg-coral',
    badge: 'bg-coral-light border-coral-border text-coral',
    num: 'text-coral',
    hoverBorder: 'hover:border-coral',
    mainQuestion: 'What should we test, and how should we test it?',
  },
  '03': {
    ring: 'bg-mustard',
    badge: 'bg-mustard-light border-mustard-border text-mustard-dark',
    num: 'text-mustard-dark',
    hoverBorder: 'hover:border-mustard',
    mainQuestion: 'How do we actually test it?',
  },
  '04': {
    ring: 'bg-sage',
    badge: 'bg-sage-light border-sage-border text-sage-dark',
    num: 'text-sage-dark',
    hoverBorder: 'hover:border-sage',
    mainQuestion: 'Can we trust this result?',
  },
  '05': {
    ring: 'bg-lavender',
    badge: 'bg-lavender-light border-lavender-border text-lavender-dark',
    num: 'text-lavender-dark',
    hoverBorder: 'hover:border-lavender-dark',
    mainQuestion: 'How do we communicate the complete research process?',
  },
};

export const FiveAgentVisual: React.FC<FiveAgentVisualProps> = () => {
  return (
    <section id="workflow-section" className="py-20 md:py-28 border-b border-rule bg-paper relative overflow-hidden">
      {/* Soft atmospheric gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-30 mix-blend-multiply blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #F29A70 0%, #B8A8D8 50%, #9DBBD0 80%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial Transition Header: "FROM QUESTION TO EVIDENCE" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-rule">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral">
                SCIENTIFIC METHODOLOGY
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-ink-deep font-normal tracking-tight leading-[0.98]">
              FROM QUESTION
              <br />
              <span className="italic text-coral">to evidence.</span>
            </h2>
          </div>

          <p className="font-sans text-base text-ink-soft max-w-md leading-relaxed border-l-2 border-rule pl-4">
            Cognilab structures research inquiries as an autonomous sequence of five specialized agents with deterministic validation at key boundaries.
          </p>
        </div>

        {/* Five-Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent) => {
            const isActive = agent.status === 'active';
            const accents = AGENT_ACCENTS[agent.number] || AGENT_ACCENTS['01'];

            return (
              <div
                key={agent.number}
                className={`relative flex flex-col justify-between p-7 bg-paper-sheet/95 backdrop-blur-xs border transition-all duration-200 shadow-paper-sm hover:shadow-paper ${
                  isActive
                    ? `border-ink ${accents.hoverBorder}`
                    : 'border-rule/80 opacity-90'
                }`}
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-mono text-3xl font-bold leading-none ${accents.num}`}>
                        {agent.number}
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint uppercase">
                        // AGENT
                      </span>
                    </div>

                    {isActive ? (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border font-mono text-[10px] tracking-wider uppercase font-bold ${accents.badge}`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACTIVE / IMPLEMENTED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-rule bg-paper text-ink-faint font-mono text-[10px] tracking-wider uppercase">
                        <Clock className="w-3 h-3" />
                        <span>UPCOMING</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl text-ink-deep font-normal mb-1 leading-snug">
                    {agent.name}
                  </h3>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-4">
                    {agent.title}
                  </h4>

                  {/* Guiding Question */}
                  <div className="p-3 bg-paper border border-rule/70 mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted block mb-0.5">
                      Core Scientific Question:
                    </span>
                    <p className="font-serif italic text-sm text-ink-deep font-semibold">
                      &ldquo;{accents.mainQuestion}&rdquo;
                    </p>
                  </div>

                  <p className="font-sans text-sm text-ink-soft leading-relaxed mb-6">
                    {agent.description}
                  </p>
                </div>

                {/* Metadata Spec Footer */}
                <div className="pt-4 border-t border-rule space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-ink-faint block">Inputs:</span>
                    <span className="text-ink-soft truncate block">{agent.inputs}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ink-faint block">Outputs:</span>
                    <span className="text-ink-deep font-medium truncate block">{agent.outputs}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Sixth Card: Deterministic Critic Manifesto Box */}
          <div className="relative border-2 border-dashed border-ink/40 p-7 bg-paper-warm/80 flex flex-col justify-between shadow-paper-sm">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral block mb-3">
                METHODOLOGICAL INTEGRITY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ink-deep font-normal leading-snug mb-3">
                Deterministic Validation vs. Hallucination
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Cognilab injects deterministic code validation between Agent 01 (Research) and Agent 02 (Hypothesis &amp; Experiment Design) to ensure independent variables remain decoupled, control variables remain invariant, and metrics directly measure the stated hypothesis.
              </p>
            </div>

            <div className="pt-6 border-t border-rule mt-6">
              <span className="font-mono text-[10px] uppercase text-ink-muted tracking-wider block">
                Source of Truth: Python Backend API Contract
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
