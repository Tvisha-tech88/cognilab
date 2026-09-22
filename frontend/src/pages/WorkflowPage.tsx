import React from 'react';
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import type { AgentArchitectureInfo } from '../types/research';
import { AgentStageCard } from '../components/workflow/AgentStageCard';

interface WorkflowPageProps {
  onBeginInvestigation: () => void;
}

const AGENTS: AgentArchitectureInfo[] = [
  {
    number: '01',
    name: 'Research Agent',
    title: 'Evidence Retrieval & Literature Synthesis',
    description:
      'Finds relevant papers and empirical evidence for the research question using RAG + Azure AI Search / Foundry IQ. Outputs grounded claims and citations answering: "What does existing research tell us?"',
    status: 'active',
    role: 'Literature Grounding & Retrieval',
    inputs: 'Open AI/ML scientific question',
    outputs: 'Key findings, supporting citations, contradictory claims, uncertainties, gaps',
  },
  {
    number: '02',
    name: 'Hypothesis + Experiment Design Agent',
    title: 'Hypothesis Formulation & Deterministic Design',
    description:
      'Takes research evidence and turns it into a testable hypothesis (H₁) and structured experiment. Designs dataset, model, baseline, treatment, metrics, and validates whether the experiment is fair and reproducible using agentic reasoning and structured outputs. Answering: "What should we test, and how should we test it?"',
    status: 'active',
    role: 'Hypothesis Formulation & Experiment Architecture',
    inputs: 'Synthesized research evidence from Agent 01',
    outputs: 'Formal hypothesis, 10-parameter experiment plan, deterministic validation status',
  },
  {
    number: '03',
    name: 'Experiment Agent',
    title: 'Controlled ML Experiment Execution',
    description:
      'Downstream agent that takes the experiment plan and actually executes the ML experiment using controlled tools and Python/PyTorch. Returns accuracy, loss curves, training time, and compute telemetry. Answering: "How do we actually test it?"',
    status: 'upcoming',
    role: 'Trial Runner & Telemetry Capture',
    inputs: 'Validated experiment specification from Agent 02',
    outputs: 'Execution loss logs, validation scores, compute metrics',
  },
  {
    number: '04',
    name: 'Analysis + Critic Agent',
    title: 'Result Evaluation & AI Critique',
    description:
      'Downstream agent that analyzes experiment results and checks whether the conclusion is justified. Identifies experimental limitations, suggests the next iteration, and applies AI evaluation. Answering: "Can we trust this result?"',
    status: 'upcoming',
    role: 'Scientific Critique & Evaluation',
    inputs: 'Comparative baseline vs. treatment telemetry from Agent 03',
    outputs: 'Statistical verdict, limitation flags, subsequent trial recommendations',
  },
  {
    number: '05',
    name: 'Report / Application Agent',
    title: 'Unified Synthesis & Research Dossier',
    description:
      'Downstream agent that combines the complete research process—research, hypothesis, experiment, results, and critique—into the final research report and builds the interactive dashboard application. Answering: "How do we communicate the complete research process?"',
    status: 'upcoming',
    role: 'Publication & Presentation',
    inputs: 'Complete five-agent research lifecycle outputs',
    outputs: 'Final camera-ready research report, interactive dashboard, reproducible bundle',
  },
];

export const WorkflowPage: React.FC<WorkflowPageProps> = ({
  onBeginInvestigation,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Masthead */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral">
            PIPELINE SPECIFICATION
          </span>
          <div className="h-3 w-[1px] bg-rule" aria-hidden="true" />
          <span className="font-mono text-xs tracking-wider uppercase text-ink-muted">
            SYSTEMS ARCHITECTURE
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink-deep font-normal tracking-tight mb-6 leading-[1.05]">
          The Five-Agent Scientific Pipeline
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl text-ink-soft leading-relaxed border-l-3 border-coral pl-4">
          Cognilab organizes autonomous research as a verifiable five-stage scientific pipeline: Research → Hypothesis + Experiment Design → Experiment → Analysis + Critic → Report / Application.
        </p>
      </div>

      {/* Systems Topology Bar */}
      <div className="bg-paper-sheet border border-ink p-6 sm:p-8 mb-14 shadow-paper">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-rule">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-coral" />
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              SYSTEMS TOPOLOGY
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-muted uppercase">
            01–02 Active in Engine · 03–05 Upcoming Stages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { num: '01', name: 'RESEARCH', color: 'border-cobalt text-cobalt bg-cobalt/5', active: true, tag: 'ACTIVE' },
            { num: '02', name: 'HYPOTHESIS + DESIGN', color: 'border-coral text-coral bg-coral/5', active: true, tag: 'ACTIVE' },
            { num: '03', name: 'EXPERIMENT', color: 'border-mustard/50 text-mustard-dark bg-mustard/5', active: false, tag: 'UPCOMING' },
            { num: '04', name: 'ANALYSIS + CRITIC', color: 'border-sage/50 text-sage-dark bg-sage/5', active: false, tag: 'UPCOMING' },
            { num: '05', name: 'REPORT / APP', color: 'border-lavender text-lavender-dark bg-lavender/5', active: false, tag: 'UPCOMING' },
          ].map((node, i) => (
            <div
              key={node.num}
              className={`p-4 border ${node.color} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xl font-bold leading-none">{node.num}</span>
                <span className={`font-mono text-[9px] uppercase px-1.5 py-0.2 border ${node.active ? 'bg-sage-light text-sage border-sage-border font-bold' : 'bg-paper text-ink-faint border-rule'}`}>
                  {node.tag}
                </span>
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-deep">
                {node.name}
              </span>
              {i < 4 && (
                <div className="hidden sm:block text-right mt-2 text-ink-faint font-mono text-[10px]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agents Detailed Specifications */}
      <div className="space-y-6 mb-16">
        {AGENTS.map((agent) => (
          <AgentStageCard key={agent.number} agent={agent} />
        ))}
      </div>

      {/* Deterministic Architecture Highlight */}
      <div className="bg-paper-sheet border-2 border-coral p-8 sm:p-10 mb-16 shadow-warm">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-coral" />
          <h2 className="font-serif text-2xl sm:text-3xl text-ink-deep font-normal">
            Why Deterministic Validation Matters
          </h2>
        </div>

        <p className="font-sans text-sm sm:text-base text-ink-soft leading-relaxed max-w-3xl mb-6">
          Standard AI workflows suffer from cumulative hallucination: an error in step 1 cascades into invalid experiments in step 2. Cognilab interrupts this by executing deterministic Python validators between Agent 01 (Research) and Agent 02 (Hypothesis + Experiment Design) to guarantee:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-4 bg-paper border border-coral-border/60">
            <span className="text-coral font-bold block mb-1">01. INDEPENDENCE</span>
            <p className="text-ink-soft leading-normal font-sans">
              Independent variables cannot overlap with dependent variables or fixed control variables.
            </p>
          </div>
          <div className="p-4 bg-paper border border-mustard-border">
            <span className="text-mustard-dark font-bold block mb-1">02. CONTROLS</span>
            <p className="text-ink-soft leading-normal font-sans">
              Baseline and treatment configurations must be non-identical while holding environment fixed.
            </p>
          </div>
          <div className="p-4 bg-paper border border-sage-border">
            <span className="text-sage-dark font-bold block mb-1">03. REPRODUCIBILITY</span>
            <p className="text-ink-soft leading-normal font-sans">
              Evaluation metrics and sample thresholds must satisfy minimum statistical criteria.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-rule pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-1">
            READY TO INVESTIGATE?
          </span>
          <p className="font-serif text-2xl text-ink-deep">
            Run Agent 01 and Agent 02 on your research question.
          </p>
        </div>

        <button
          onClick={onBeginInvestigation}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink hover:bg-coral text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg border-2 border-ink hover:border-coral cursor-pointer"
        >
          <span>START AN INVESTIGATION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
