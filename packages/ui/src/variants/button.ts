import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-medium',
    'transition-[color,background-color,box-shadow] duration-fast ease-standard',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cta-primary)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'no-underline',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-cta-primary)] text-white',
          'hover:bg-[var(--color-cta-primary-hover)]',
          'shadow-xs',
        ].join(' '),
        secondary: [
          'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]',
          'border border-[var(--color-border-default)]',
          'hover:bg-[var(--color-surface-tertiary)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-text-primary)]',
          'hover:bg-[var(--color-surface-secondary)]',
        ].join(' '),
        link: [
          'bg-transparent text-[var(--color-cta-primary)]',
          'hover:text-[var(--color-cta-primary-hover)]',
          'underline underline-offset-2',
        ].join(' '),
      },
      size: {
        sm: 'text-[var(--text-caption)] px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-sm)]',
        md: 'text-[var(--text-body)] px-[var(--space-6)] py-[var(--space-3)] rounded-[var(--radius-md)]',
        lg: 'text-[var(--text-body)] px-[var(--space-8)] py-[var(--space-4)] rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
