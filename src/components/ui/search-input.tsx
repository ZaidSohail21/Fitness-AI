import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, placeholder = 'Search workouts, exercises...', onSearch, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full max-w-md">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            'h-9 w-full rounded-xl border border-slate-800/80 bg-[#0E1422] pl-10 pr-4 text-xs text-slate-200 placeholder:text-slate-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-all',
            className
          )}
          onChange={(e) => onSearch?.(e.target.value)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
