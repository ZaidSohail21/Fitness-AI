import type { LucideIcon } from 'lucide-react';

type Props = { label: string; value: number; unit: string; icon: LucideIcon; tone: string };

export function StatCard({ label, value, unit, icon: Icon, tone }: Props) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={18} /></div>
      <p>{label}</p>
      <strong>{value.toLocaleString()}<small>{unit}</small></strong>
    </article>
  );
}
