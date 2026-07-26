type Props = { label: string; current: number; goal: number; unit: string; color: string };

export function ProgressBar({ label, current, goal, unit, color }: Props) {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="progress-item">
      <div className="progress-label"><span>{label}</span><span>{current.toLocaleString()} / {goal.toLocaleString()} {unit}</span></div>
      <div className="progress-track"><div className={`progress-fill ${color}`} style={{ width: `${percentage}%` }} /></div>
    </div>
  );
}
