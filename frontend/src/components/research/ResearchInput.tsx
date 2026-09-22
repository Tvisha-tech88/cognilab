import React, { useState } from 'react';
import { ArrowRight, CornerDownLeft } from 'lucide-react';

interface ResearchInputProps {
  initialQuestion?: string;
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const SAMPLE_QUESTIONS = [
  "Does increasing the embedding dimension of a text embedding model improve semantic retrieval performance?",
  "How does low-rank adaptation (LoRA) rank constraint influence catastrophic forgetting in continuous fine-tuning of vision-language models?",
  "Does temperature-scaled self-consistency sampling improve mathematical reasoning in 8B-parameter decoder architectures?"
];

export const ResearchInput: React.FC<ResearchInputProps> = ({
  initialQuestion = '',
  onSubmit,
  isLoading,
}) => {
  const [question, setQuestion] = useState(
    initialQuestion ||
      "Does increasing the embedding dimension of a text embedding model improve semantic retrieval performance?"
  );

  const charCount = question.length;
  const isValidQuestion = question.trim().length >= 5;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValidQuestion || isLoading) return;
    onSubmit(question.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      {/* Top Editorial Index */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral">
          RESEARCH / 01
        </span>
        <div className="h-[1px] w-12 bg-rule" aria-hidden="true" />
        <span className="font-mono text-xs tracking-wider uppercase text-ink-muted">
          INVESTIGATION PROMPT
        </span>
      </div>

      {/* Main Display Headline */}
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink-deep font-normal tracking-tight leading-[0.96] mb-4">
        START WITH A
        <br />
        <span className="italic text-coral">question.</span>
      </h1>

      {/* Editorial Subtext */}
      <p className="font-serif italic text-xl sm:text-2xl text-ink-soft max-w-2xl leading-relaxed mb-10 border-l-4 border-coral pl-5">
        &ldquo;Turn an open research question into evidence, a testable hypothesis, and a structured experiment.&rdquo;
      </p>

      {/* Investigation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-paper-sheet border border-rule shadow-paper p-6 sm:p-8 relative"
      >
        {/* Decorative corner registry marks */}
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-coral" aria-hidden="true" />
        <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-coral" aria-hidden="true" />

        {/* Label & Character Counter */}
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="research_question_input"
            className="block font-mono text-xs tracking-widest uppercase font-semibold text-ink-deep"
          >
            WHAT DO YOU WANT TO INVESTIGATE?
          </label>
          <div className="flex items-center gap-3 font-mono text-[11px] text-ink-muted">
            <span className={charCount > 0 && !isValidQuestion ? 'text-coral font-medium' : ''}>
              {charCount} chars
            </span>
            <span className="hidden sm:inline text-ink-faint">•</span>
            <span className="hidden sm:inline text-ink-faint">Ctrl+Enter to submit</span>
          </div>
        </div>

        {/* Large Textarea */}
        <div className="relative">
          <textarea
            id="research_question_input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={5}
            disabled={isLoading}
            placeholder="Does increasing the embedding dimension of a text embedding model improve semantic retrieval performance?"
            className="w-full bg-paper border border-rule p-4 sm:p-5 font-sans text-base sm:text-lg text-ink-deep placeholder:text-ink-faint focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition-colors leading-relaxed resize-y min-h-[140px] disabled:opacity-60 disabled:cursor-not-allowed"
            required
            aria-describedby="char-count-hint"
          />
        </div>

        {/* Sample Inquiries */}
        <div className="mt-5 pt-4 border-t border-rule/60">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-3">
            Sample inquiries — click to prefill:
          </span>
          <div className="flex flex-col gap-2">
            {SAMPLE_QUESTIONS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => setQuestion(sample)}
                className="text-left font-serif text-sm text-ink-soft hover:text-ink-deep bg-paper hover:bg-paper-subtle border border-rule/60 hover:border-coral px-3 py-2 transition-colors disabled:opacity-50 cursor-pointer leading-snug"
              >
                &ldquo;{sample.slice(0, 72)}...&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-rule">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
            <CornerDownLeft className="w-3.5 h-3.5 text-ink-faint" />
            <span>Live backend · 127.0.0.1:8000</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isValidQuestion}
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-ink hover:bg-coral active:bg-coral-dark text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer border border-ink hover:border-coral"
          >
            <span>{isLoading ? 'SUBMITTING...' : 'BEGIN INVESTIGATION'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
          </button>
        </div>
      </form>

      {/* Progression Breadcrumb */}
      <div className="mt-8 border-t border-rule pt-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider uppercase">
          <span className="text-coral font-bold">QUESTION</span>
          <span className="text-rule">—</span>
          <span className="text-cobalt font-semibold">EVIDENCE</span>
          <span className="text-rule">—</span>
          <span className="text-coral font-semibold">HYPOTHESIS</span>
          <span className="text-rule">—</span>
          <span className="text-sage font-semibold">EXPERIMENT</span>
        </div>
      </div>
    </div>
  );
};
