import React from 'react';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onBegin: () => void;
  onExploreWorkflow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBegin,
  onExploreWorkflow,
}) => {
  return (
    <section className="relative overflow-hidden bg-paper pt-12 pb-20 md:pt-20 md:pb-28 border-b border-rule">
      {/* Soft atmospheric organic gradient artwork */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Coral → Peach → Soft Pink organic gradient blob */}
        <div
          className="absolute -top-12 -left-20 w-[550px] sm:w-[700px] h-[500px] sm:h-[600px] rounded-full opacity-45 mix-blend-multiply blur-[90px]"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #E65332 0%, #F29A70 45%, #E9B8B8 75%, transparent 100%)',
          }}
        />

        {/* Lavender → Powder Blue atmospheric field */}
        <div
          className="absolute top-10 right-[-100px] w-[500px] sm:w-[750px] h-[450px] sm:h-[650px] rounded-full opacity-40 mix-blend-multiply blur-[110px]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #B8A8D8 0%, #9DBBD0 50%, #EEF5FA 80%, transparent 100%)',
          }}
        />

        {/* Warm Mustard → Peach accent field */}
        <div
          className="absolute bottom-10 right-[15%] w-[420px] sm:w-[540px] h-[360px] sm:h-[460px] rounded-full opacity-35 mix-blend-multiply blur-[95px]"
          style={{
            background: 'radial-gradient(circle at 45% 45%, #C59A3A 0%, #F29A70 55%, transparent 90%)',
          }}
        />

        {/* Sage → Cream soft grounding glow */}
        <div
          className="absolute -bottom-24 left-[15%] w-[450px] h-[350px] rounded-full opacity-30 mix-blend-multiply blur-[80px]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #789681 0%, #F7F0E5 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Hero Editorial Header */}
        <div className="max-w-4xl">
          {/* Classification Metadata Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              SYS.01 // AUTONOMOUS LABORATORY
            </span>
            <div className="h-3 w-[1px] bg-rule-dark" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-ink-muted">
              AI RESEARCH EXPERIMENTATION PLATFORM
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl text-ink-deep font-normal tracking-tight leading-[0.92] mb-8">
            RESEARCH
            <br />
            STARTS WITH
            <br />
            <span className="italic text-coral font-normal">A QUESTION.</span>
          </h1>

          {/* Supporting Description */}
          <p className="font-sans text-xl sm:text-2xl text-ink-soft leading-relaxed max-w-2xl mb-10 border-l-3 border-coral pl-5">
            Cognilab turns research questions into evidence-backed experiments.
          </p>

          {/* CTA Buttons — High Contrast & Always Visible */}
          <div className="relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <button
              type="button"
              onClick={onBegin}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink hover:bg-coral text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 shadow-md hover:shadow-lg border-2 border-ink hover:border-coral cursor-pointer group"
              aria-label="Start an investigation"
            >
              <span>START AN INVESTIGATION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-white" />
            </button>

            <button
              type="button"
              onClick={onExploreWorkflow}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-paper-sheet/95 hover:bg-ink text-ink-deep hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 border-2 border-ink shadow-sm cursor-pointer group"
              aria-label="Explore the workflow"
            >
              <span>EXPLORE WORKFLOW</span>
              <ArrowDown className="w-4 h-4 text-ink-muted group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Abstract Five-Agent Research Constellation */}
        <div className="relative mt-6 pt-10 border-t border-rule/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase font-bold text-ink-deep">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
              <span>FIVE-AGENT RESEARCH PIPELINE</span>
            </div>
            <span className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">
              01–02 Active / Implemented · 03–05 Upcoming Stages
            </span>
          </div>

          <div className="relative bg-paper-sheet/85 backdrop-blur-xs border border-rule p-6 sm:p-10 shadow-paper-lg overflow-hidden">
            {/* Soft internal gradient wash */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  'radial-gradient(circle at 20% 30%, rgba(41,75,120,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(230,83,50,0.08) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />

            {/* Connecting SVG Circuit Network */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#294B78" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E65332" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="upcomingLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E65332" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#C59A3A" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="#789681" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#B8A8D8" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 140 100 Q 240 70 360 100"
                fill="none"
                stroke="url(#activeLineGrad)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <path
                d="M 440 100 Q 560 130 680 100 T 920 100"
                fill="none"
                stroke="url(#upcomingLineGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            {/* 5 Agent Nodes Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">

              {/* 01: RESEARCH AGENT (Cobalt) */}
              <div className="p-4 sm:p-5 bg-paper border-2 border-cobalt/60 hover:border-cobalt transition-all group flex flex-col justify-between shadow-paper-sm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-cobalt text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm ring-4 ring-cobalt/15">
                      01
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-cobalt-light text-cobalt border border-cobalt-border font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cobalt mb-1">
                    RESEARCH
                  </h3>
                  <p className="font-serif italic text-xs text-ink-deep font-semibold mb-2">
                    &ldquo;What does existing research tell us?&rdquo;
                  </p>
                  <p className="font-sans text-xs text-ink-soft leading-relaxed">
                    Finds relevant papers via RAG + Azure AI Search, extracting empirical claims &amp; citations.
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-rule font-mono text-[10px] text-ink-muted">
                  <span>OUT: Evidence &amp; Citations</span>
                </div>
              </div>

              {/* 02: HYPOTHESIS + EXPERIMENT DESIGN AGENT (Coral) */}
              <div className="p-4 sm:p-5 bg-paper border-2 border-coral hover:border-coral-dark transition-all group flex flex-col justify-between shadow-warm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-coral text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm ring-4 ring-coral/20 animate-pulse">
                      02
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-coral-light text-coral border border-coral-border font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-coral mb-1">
                    HYPOTHESIS + DESIGN
                  </h3>
                  <p className="font-serif italic text-xs text-ink-deep font-semibold mb-2">
                    &ldquo;What should we test, and how?&rdquo;
                  </p>
                  <p className="font-sans text-xs text-ink-soft leading-relaxed">
                    Formulates testable hypothesis (H₁) and designs fair 10-param reproducible experiment specs.
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-rule font-mono text-[10px] text-coral font-semibold">
                  <span>OUT: 10-Spec Plan &amp; Critic</span>
                </div>
              </div>

              {/* 03: EXPERIMENT AGENT (Mustard) */}
              <div className="p-4 sm:p-5 bg-paper/70 border border-mustard/40 hover:border-mustard transition-all group flex flex-col justify-between opacity-85">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-mustard/20 text-mustard-dark border border-mustard/40 flex items-center justify-center font-mono text-xs font-bold">
                      03
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-paper border border-rule text-ink-faint">
                      UPCOMING
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted mb-1">
                    EXPERIMENT
                  </h3>
                  <p className="font-serif italic text-xs text-ink-muted font-semibold mb-2">
                    &ldquo;How do we actually test it?&rdquo;
                  </p>
                  <p className="font-sans text-xs text-ink-faint leading-relaxed">
                    Actually executes the ML experiment using controlled Python/PyTorch tools; logs metrics.
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-rule font-mono text-[10px] text-ink-faint">
                  <span>OUT: Accuracy, Loss &amp; Time</span>
                </div>
              </div>

              {/* 04: ANALYSIS + CRITIC AGENT (Sage) */}
              <div className="p-4 sm:p-5 bg-paper/70 border border-sage/40 hover:border-sage transition-all group flex flex-col justify-between opacity-85">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-sage/20 text-sage-dark border border-sage/40 flex items-center justify-center font-mono text-xs font-bold">
                      04
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-paper border border-rule text-ink-faint">
                      UPCOMING
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted mb-1">
                    ANALYSIS + CRITIC
                  </h3>
                  <p className="font-serif italic text-xs text-ink-muted font-semibold mb-2">
                    &ldquo;Can we trust this result?&rdquo;
                  </p>
                  <p className="font-sans text-xs text-ink-faint leading-relaxed">
                    Evaluates whether conclusion is justified, identifies limitations &amp; suggests next trial.
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-rule font-mono text-[10px] text-ink-faint">
                  <span>OUT: Critique &amp; Limitations</span>
                </div>
              </div>

              {/* 05: REPORT / APPLICATION AGENT (Lavender) */}
              <div className="p-4 sm:p-5 bg-paper/70 border border-lavender/60 hover:border-lavender-dark transition-all group flex flex-col justify-between opacity-85">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-lavender/30 text-lavender-dark border border-lavender/50 flex items-center justify-center font-mono text-xs font-bold">
                      05
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-paper border border-rule text-ink-faint">
                      UPCOMING
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted mb-1">
                    REPORT / APP
                  </h3>
                  <p className="font-serif italic text-xs text-ink-muted font-semibold mb-2">
                    &ldquo;How do we communicate it?&rdquo;
                  </p>
                  <p className="font-sans text-xs text-ink-faint leading-relaxed">
                    Combines research, experiment &amp; critique into the final report &amp; interactive dashboard.
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-rule font-mono text-[10px] text-ink-faint">
                  <span>OUT: Final Report &amp; UI</span>
                </div>
              </div>

            </div>

            {/* Subtext Footer */}
            <div className="mt-6 pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-ink-muted">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-ink-deep">PIPELINE VERIFICATION:</span>
                <span>Deterministic Code Validators prevent hallucination between 01 &amp; 02</span>
              </div>
              <span className="text-coral font-medium">FastAPI Engine · 127.0.0.1:8000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
