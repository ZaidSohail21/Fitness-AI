import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-600/10 text-brand-400 border border-brand-500/20',
        emerald: 'border-transparent bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        secondary: 'border-transparent bg-slate-800 text-slate-300 border border-slate-700',
        outline: 'border border-slate-700 text-slate-400',
        danger: 'border-transparent bg-red-500/10 text-red-400 border border-red-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
