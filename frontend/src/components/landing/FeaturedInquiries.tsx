import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeaturedInquiriesProps {
  onSelectInquiry: (question: string) => void;
}

const INQUIRIES = [
  {
    index: '01',
    topic: 'Information Retrieval & Embeddings',
    question:
      'Does increasing the embedding dimension of a text embedding model improve semantic retrieval performance?',
    tags: ['Dense Retrieval', 'Dimensionality', 'MTEB'],
    accentClass: 'bg-cobalt',
    hoverBorder: 'hover:border-cobalt',
    hoverText: 'group-hover:text-cobalt',
  },
  {
    index: '02',
    topic: 'Parameter-Efficient Fine-Tuning',
    question:
      'How does low-rank adaptation (LoRA) rank constraint influence catastrophic forgetting in continuous fine-tuning of vision-language models?',
    tags: ['PEFT', 'Vision-Language', 'Forgetting'],
    accentClass: 'bg-coral',
    hoverBorder: 'hover:border-coral',
    hoverText: 'group-hover:text-coral',
  },
  {
    index: '03',
    topic: 'Reasoning & Inference Scaling',
    question:
      'Does temperature-scaled self-consistency sampling improve mathematical reasoning in 8B-parameter decoder architectures?',
    tags: ['Chain of Thought', 'Decoder-Only', 'Self-Consistency'],
    accentClass: 'bg-mustard',
    hoverBorder: 'hover:border-mustard',
    hoverText: 'group-hover:text-mustard',
  },
];

export const FeaturedInquiries: React.FC<FeaturedInquiriesProps> = ({
  onSelectInquiry,
}) => {
  return (
    <section className="py-16 md:py-24 border-b border-rule bg-paper-sheet">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-coral block mb-3">
              CURATED STARTER INQUIRIES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-ink-deep font-normal leading-tight">
              Explore Active
              <br />
              <span className="italic">Scientific Inquiries</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-xs leading-relaxed">
            Click any inquiry to begin an immediate investigation with the Cognilab research engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-rule overflow-hidden shadow-paper">
          {INQUIRIES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectInquiry(item.question)}
              className={`group bg-paper-sheet flex flex-col justify-between transition-all cursor-pointer hover:bg-paper-warm ${
                idx < INQUIRIES.length - 1 ? 'md:border-r border-b md:border-b-0 border-rule' : ''
              } ${item.hoverBorder}`}
            >
              {/* Signature accent bar */}
              <div className={`h-1 w-full ${item.accentClass}`} />

              <div className="p-7 flex flex-col flex-1">
                {/* Index + topic */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className={`font-mono text-2xl font-bold leading-none ${item.accentClass.replace('bg-', 'text-')}`}>
                    {item.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                    {item.topic}
                  </span>
                </div>

                <p className={`font-serif text-xl sm:text-2xl text-ink-deep font-normal leading-snug transition-colors mb-6 flex-1 ${item.hoverText}`}>
                  &ldquo;{item.question}&rdquo;
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] px-2 py-0.5 border border-rule text-ink-soft bg-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-rule flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-ink-deep group-hover:tracking-widest transition-all">
                    INVESTIGATE
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-all ${item.accentClass.replace('bg-', 'text-')} opacity-0 group-hover:opacity-100 group-hover:translate-x-1`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
