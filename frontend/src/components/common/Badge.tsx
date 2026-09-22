import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'coral' | 'sage' | 'cobalt' | 'mustard' | 'lavender' | 'paper' | 'muted';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'paper',
  className = '',
}) => {
  const variantStyles = {
    coral: 'border-coral-border bg-coral-light text-coral font-semibold',
    sage: 'border-sage-border bg-sage-light text-sage font-medium',
    cobalt: 'border-cobalt-border bg-cobalt-light text-cobalt font-medium',
    mustard: 'border-mustard-border bg-mustard-light text-mustard font-medium',
    lavender: 'border-lavender-border bg-lavender-light text-lavender-dark font-medium',
    paper: 'border-rule bg-paper-sheet text-ink-soft',
    muted: 'border-rule/60 bg-paper text-ink-muted',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 border font-mono text-[10px] tracking-wider uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
