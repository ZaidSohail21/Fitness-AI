import type { LucideIcon } from 'lucide-react';

type Props = { label: string; icon: LucideIcon; onClick: () => void; variant?: 'primary' | 'secondary' | 'danger' };

export function ActionButton({ label, icon: Icon, onClick, variant = 'secondary' }: Props) {
  return <button className={`action-button ${variant}`} onClick={onClick}><Icon size={17} />{label}</button>;
}
