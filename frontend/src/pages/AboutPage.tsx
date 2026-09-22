import React from 'react';
import { ArrowRight, BookOpen, Layers, Target, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onBeginInvestigation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBeginInvestigation,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral">
            MANIFESTO &amp; IDENTITY
          </span>
          <div className="h-3 w-[1px] bg-rule" aria-hidden="true" />
          <span className="font-mono text-xs tracking-wider uppercase text-ink-muted">
            ABOUT COGNILAB
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink-deep font-normal tracking-tight mb-8 leading-[0.96]">
          A Scientific Notebook
          <br />
          <span className="italic text-coral font-normal">for the Autonomous Era.</span>
        </h1>

        <p className="font-serif italic text-2xl sm:text-3xl text-ink-soft leading-relaxed border-l-4 border-coral pl-5">
          &ldquo;Cognilab was created out of frustration with conversational chatbots that produce generic text instead of rigorous, testable empirical science.&rdquo;
        </p>
      </div>

      {/* Manifesto Narrative */}
      <article className="space-y-10 font-sans text-base text-ink-soft leading-relaxed border-t border-rule pt-10 mb-14">
        <div className="p-6 bg-paper-sheet border border-rule shadow-paper-sm">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-cobalt" />
            <h2 className="font-serif text-2xl text-ink-deep font-normal">
              01 / What Cognilab Is
            </h2>
          </div>
          <p className="leading-relaxed">
            Cognilab is an autonomous AI research platform engineered specifically for machine learning and computational scientists. Instead of open-ended conversational banter, it treats scientific inquiry as an immutable state machine: transforming unstructured research questions into structured empirical claims, formal testable hypotheses (H₁), and 10-parameter experiment designs.
          </p>
        </div>

        <div className="p-6 bg-paper-sheet border border-rule shadow-paper-sm">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-coral" />
            <h2 className="font-serif text-2xl text-ink-deep font-normal">
              02 / Why It Exists: Stopping Cumulative Hallucination
            </h2>
          </div>
          <p className="leading-relaxed">
            Conventional LLMs lack methodological rigor. When asked to formulate an experiment, they often conflate independent variables with control conditions or propose untestable metrics. Cognilab solves this by inserting deterministic validation critics between stages: verifying that treatment configurations are mathematically distinct from baselines before anything moves forward.
          </p>
        </div>

        <div className="p-6 bg-paper-sheet border border-rule shadow-paper-sm">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-5 h-5 text-mustard" />
            <h2 className="font-serif text-2xl text-ink-deep font-normal">
              03 / The Five-Agent Pipeline Architecture
            </h2>
          </div>
          <p className="leading-relaxed mb-4">
            The platform architecture is designed across five specialized agent stages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-cobalt-light border border-cobalt-border text-cobalt">
              <span className="font-bold block">01 RESEARCH AGENT</span>
              <p className="font-serif italic text-xs text-ink-deep mt-0.5 mb-1">&ldquo;What does existing research tell us?&rdquo;</p>
              <span className="font-sans text-xs text-ink-soft">Finds relevant papers via RAG + Azure AI Search, extracting evidence claims and citations (ACTIVE).</span>
            </div>
            <div className="p-3.5 bg-coral-light border border-coral-border text-coral">
              <span className="font-bold block">02 HYPOTHESIS + EXPERIMENT DESIGN</span>
              <p className="font-serif italic text-xs text-ink-deep mt-0.5 mb-1">&ldquo;What should we test, and how should we test it?&rdquo;</p>
              <span className="font-sans text-xs text-ink-soft">H₁ formulation, 10-parameter specification &amp; deterministic critic validation (ACTIVE).</span>
            </div>
            <div className="p-3.5 bg-mustard-light border border-mustard-border text-mustard-dark">
              <span className="font-bold block">03 EXPERIMENT AGENT</span>
              <p className="font-serif italic text-xs text-ink-deep mt-0.5 mb-1">&ldquo;How do we actually test it?&rdquo;</p>
              <span className="font-sans text-xs text-ink-soft">Controlled Python/PyTorch execution tools, logging accuracy, loss curves &amp; latency (UPCOMING).</span>
            </div>
            <div className="p-3.5 bg-sage-light border border-sage-border text-sage-dark">
              <span className="font-bold block">04 ANALYSIS + CRITIC AGENT</span>
              <p className="font-serif italic text-xs text-ink-deep mt-0.5 mb-1">&ldquo;Can we trust this result?&rdquo;</p>
              <span className="font-sans text-xs text-ink-soft">Evaluates conclusion justification, identifies limitations &amp; recommends next iteration (UPCOMING).</span>
            </div>
            <div className="p-3.5 bg-lavender-light border border-lavender-border text-lavender-dark sm:col-span-2">
              <span className="font-bold block">05 REPORT / APPLICATION AGENT</span>
              <p className="font-serif italic text-xs text-ink-deep mt-0.5 mb-1">&ldquo;How do we communicate the complete research process?&rdquo;</p>
              <span className="font-sans text-xs text-ink-soft">Combines the complete research process into the final publishable report &amp; interactive dashboard application (UPCOMING).</span>
            </div>
          </div>
        </div>
      </article>

      {/* Technical Spec Box */}
      <div className="border-2 border-ink bg-paper-sheet p-6 sm:p-8 font-mono text-xs mb-14 shadow-paper">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-sage" />
          <span className="text-coral uppercase font-bold tracking-wider">
            PRODUCTION SYSTEM STACK:
          </span>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-ink-deep">
          <div className="p-3 bg-paper border border-rule">
            <dt className="text-ink-muted text-[10px] uppercase">Backend Engine:</dt>
            <dd className="font-semibold mt-0.5">FastAPI + Pydantic v2 (port 8000)</dd>
          </div>
          <div className="p-3 bg-paper border border-rule">
            <dt className="text-ink-muted text-[10px] uppercase">Agent Orchestrator:</dt>
            <dd className="font-semibold mt-0.5">Azure AI Foundry Reasoning Projects</dd>
          </div>
          <div className="p-3 bg-paper border border-rule">
            <dt className="text-ink-muted text-[10px] uppercase">Frontend Application:</dt>
            <dd className="font-semibold mt-0.5">React 18 + Vite + TypeScript</dd>
          </div>
          <div className="p-3 bg-paper border border-rule">
            <dt className="text-ink-muted text-[10px] uppercase">Design Language:</dt>
            <dd className="font-semibold mt-0.5">Warm Editorial Scientific Studio</dd>
          </div>
        </dl>
      </div>

      {/* Action CTA */}
      <div className="border-t border-rule pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-1">
            EXPERIENCE COGNILAB
          </span>
          <p className="font-serif text-2xl text-ink-deep">
            Start with your first research inquiry.
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
