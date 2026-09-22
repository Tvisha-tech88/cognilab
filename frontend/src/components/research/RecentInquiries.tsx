import React, { useState, useEffect } from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';
import type { StoredInvestigation } from '../../types/navigation';
import { getStoredInvestigations, clearStoredInvestigations } from '../../utils/storage';
import { formatInvestigationDate } from '../../utils/formatting';

interface RecentInquiriesProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

export const RecentInquiries: React.FC<RecentInquiriesProps> = ({
  onSelectQuestion,
  disabled = false,
}) => {
  const [inquiries, setInquiries] = useState<StoredInvestigation[]>([]);

  const reloadHistory = () => {
    setInquiries(getStoredInvestigations());
  };

  useEffect(() => {
    reloadHistory();
  }, []);

  const handleClear = () => {
    clearStoredInvestigations();
    setInquiries([]);
  };

  if (inquiries.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-rule">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase font-semibold text-ink-deep">
          <History className="w-3.5 h-3.5 text-coral" />
          <span>RECENT LOCAL INQUIRIES ({inquiries.length})</span>
        </div>

        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-muted hover:text-coral transition-colors uppercase cursor-pointer disabled:opacity-50"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="divide-y divide-rule border border-rule bg-paper-sheet overflow-hidden shadow-paper-sm">
        {inquiries.map((item) => (
          <div
            key={item.id}
            onClick={() => !disabled && onSelectQuestion(item.question)}
            className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-paper-warm transition-colors cursor-pointer group"
          >
            <div className="min-w-0 flex-1">
              <p className="font-serif text-base text-ink-deep group-hover:text-coral transition-colors truncate">
                {item.question}
              </p>
              <div className="flex items-center gap-3 font-mono text-[10px] text-ink-muted mt-0.5">
                <span>{formatInvestigationDate(item.timestamp)}</span>
                {item.runId && (
                  <>
                    <span>•</span>
                    <span>RUN: {item.runId.slice(0, 8)}...</span>
                  </>
                )}
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-coral transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
