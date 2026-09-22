import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { AppView, NavItem } from '../../types/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  navItems: NavItem[];
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeView,
  onSelectView,
  navItems,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-deep/70 backdrop-blur-sm md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-paper shadow-paper-lg flex flex-col justify-between">
        {/* Coral accent strip at top */}
        <div className="h-1 bg-gradient-coral-peach" />

        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-rule">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl text-ink-deep font-normal">
                COGNILAB
              </span>
              <span className="font-mono text-[9px] text-ink-faint uppercase tracking-widest">
                SYS.01
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-ink-muted hover:text-coral transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider transition-all cursor-pointer border-l-2 ${
                    isActive
                      ? 'border-l-coral text-coral font-bold bg-coral/5'
                      : 'border-l-transparent text-ink-soft hover:text-ink-deep hover:bg-paper-subtle'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-coral' : 'text-ink-faint'}`} />
                </button>
              );
            })}
          </nav>

          {/* Begin CTA */}
          <div className="mt-6">
            <button
              onClick={() => { onSelectView('research'); onClose(); }}
              className="w-full px-6 py-4 bg-coral hover:bg-coral-hover text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer text-center"
            >
              BEGIN AN INVESTIGATION →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-rule font-mono text-[11px] text-ink-muted">
          <p className="uppercase tracking-widest text-[9px] text-coral font-semibold mb-1">
            RESEARCH EXPERIMENTATION PLATFORM
          </p>
          <p>Azure AI Foundry Orchestration</p>
        </div>
      </div>
    </div>
  );
};
