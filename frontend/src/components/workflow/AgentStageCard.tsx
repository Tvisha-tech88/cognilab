import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import type { AgentArchitectureInfo } from '../../types/research';

interface AgentStageCardProps {
  agent: AgentArchitectureInfo;
}

const AGENT_THEMES: Record<string, { bar: string; badge: string; numBg: string; text: string }> = {
  '01': { bar: 'bg-cobalt', badge: 'border-cobalt-border bg-cobalt-light text-cobalt', numBg: 'bg-cobalt text-white', text: 'text-cobalt' },
  '02': { bar: 'bg-coral', badge: 'border-coral-border bg-coral-light text-coral', numBg: 'bg-coral text-white', text: 'text-coral' },
  '03': { bar: 'bg-mustard', badge: 'border-mustard-border bg-mustard-light text-mustard-dark', numBg: 'bg-mustard/30 text-mustard-dark border border-mustard/40', text: 'text-mustard-dark' },
  '04': { bar: 'bg-sage', badge: 'border-sage-border bg-sage-light text-sage-dark', numBg: 'bg-sage/30 text-sage-dark border border-sage/40', text: 'text-sage-dark' },
  '05': { bar: 'bg-lavender', badge: 'border-lavender-border bg-lavender-light text-lavender-dark', numBg: 'bg-lavender/30 text-lavender-dark border border-lavender/40', text: 'text-lavender-dark' },
};

export const AgentStageCard: React.FC<AgentStageCardProps> = ({ agent }) => {
  const isActive = agent.status === 'active';
  const theme = AGENT_THEMES[agent.number] || AGENT_THEMES['01'];

  return (
    <div
      className={`border p-6 sm:p-8 bg-paper-sheet relative shadow-paper-sm transition-all overflow-hidden ${
        isActive
          ? 'border-ink shadow-paper'
          : 'border-rule/80 bg-paper-subtle/30 opacity-90'
      }`}
    >
      {/* Signature top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.bar} ${!isActive ? 'opacity-40' : ''}`} />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 mb-5 border-b border-rule">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 flex items-center justify-center font-mono text-sm font-bold ${theme.numBg}`}>
            {agent.number}
          </span>
          <div>
            <h3 className="font-serif text-2xl text-ink-deep font-normal leading-tight">
              {agent.name}
            </h3>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              {agent.title}
            </span>
          </div>
        </div>

        <div>
          {isActive ? (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border font-mono text-xs tracking-wider uppercase font-semibold ${theme.badge}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACTIVE IN ENGINE</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-rule bg-paper text-ink-faint font-mono text-xs tracking-wider uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>UPCOMING STAGE</span>
            </span>
          )}
        </div>
      </div>

      <p className="font-sans text-base text-ink-soft leading-relaxed mb-6">
        {agent.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-rule font-mono text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-ink-faint block mb-1">
            METHODOLOGICAL ROLE:
          </span>
          <span className="text-ink-deep font-medium">{agent.role}</span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-ink-faint block mb-1">
            CONSUMED INPUTS:
          </span>
          <span className="text-ink-soft">{agent.inputs}</span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-ink-faint block mb-1">
            PRODUCED SPECIFICATIONS:
          </span>
          <span className="text-ink-deep font-medium">{agent.outputs}</span>
        </div>
      </div>
    </div>
  );
};
