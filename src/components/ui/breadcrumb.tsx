import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="h-3 w-3 text-slate-600" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-slate-200 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-slate-200 font-medium' : ''}>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
