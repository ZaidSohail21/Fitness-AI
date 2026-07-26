import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from './card';

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  badgeText?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtext,
  badgeText,
  icon,
  iconBgColor = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('flex items-center space-x-4 p-4 md:p-5 relative overflow-hidden', className)}>
      {icon && (
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border',
            iconBgColor
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-400 truncate">{title}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</span>
          {badgeText && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              {badgeText}
            </span>
          )}
        </div>
        {(subtext || trendValue) && (
          <div className="flex items-center text-xs mt-1 space-x-1.5">
            {trendValue && (
              <span
                className={cn(
                  'font-medium flex items-center',
                  trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'
                )}
              >
                {trend === 'up' && '↗ '}
                {trend === 'down' && '↘ '}
                {trendValue}
              </span>
            )}
            {subtext && <span className="text-slate-500 truncate">{subtext}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
