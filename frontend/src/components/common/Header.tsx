import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import type { AppView, NavItem } from '../../types/navigation';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'research', label: 'Research' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'about', label: 'About' },
];

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-rule bg-paper-sheet sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Left: Masthead */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => onSelectView('landing')}
            className="text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-coral cursor-pointer"
            aria-label="Cognilab Home"
          >
            <div className="flex items-baseline gap-2.5">
              <span className="relative font-serif text-2xl md:text-3xl tracking-tight text-ink-deep font-normal group-hover:text-coral transition-colors">
                COGNILAB
                <span
                  className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-coral scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  aria-hidden="true"
                />
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted font-bold">
                SYS.01 // LAB
              </span>
            </div>
          </button>

          <div className="hidden lg:block h-4 w-[1px] bg-rule-dark" aria-hidden="true" />

          <p className="hidden lg:block text-[11px] font-mono text-ink-muted uppercase tracking-wider font-medium">
            AI RESEARCH EXPERIMENTATION PLATFORM
          </p>
        </div>

        {/* Right: Desktop Navigation — Clear, high contrast & clickable */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-mono tracking-wider uppercase">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`relative px-4 py-2 transition-all cursor-pointer font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                  isActive
                    ? 'text-coral font-bold border-b-2 border-coral'
                    : 'text-ink-deep hover:text-coral hover:bg-paper-warm'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Begin CTA — high-contrast dark button */}
          <button
            type="button"
            onClick={() => onSelectView('research')}
            className="ml-3 px-4 py-2 bg-ink hover:bg-coral text-white font-mono text-[11px] uppercase tracking-widest font-bold transition-all border border-ink hover:border-coral cursor-pointer shadow-sm"
          >
            BEGIN →
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectView('research')}
            className="px-3 py-1.5 bg-ink text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer"
          >
            BEGIN
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 border border-rule-dark bg-paper-sheet text-ink hover:border-coral transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeView={activeView}
        onSelectView={onSelectView}
        navItems={NAV_ITEMS}
      />
    </header>
  );
};
