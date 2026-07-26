import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
        <input
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-slate-700 bg-[#0A0E1A] text-brand-600 focus:ring-brand-500 focus:ring-offset-0 accent-brand-600',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && <span className="text-sm text-slate-300">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
