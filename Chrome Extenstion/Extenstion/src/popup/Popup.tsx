import { useMemo, useState } from 'react';
import { Activity, Bike, CheckCircle2, Droplets, Footprints, Goal, Home, RotateCcw, Settings, SlidersHorizontal, Trophy, Zap } from 'lucide-react';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { ActionButton } from '../components/ActionButton';
import { QuoteCard } from '../components/QuoteCard';
import { quotes } from '../data/quotes';
import { type ActivityItem, useStorage } from '../hooks/useStorage';

type Page = 'home' | 'goals' | 'activity' | 'settings';

const addActivity = (items: ActivityItem[], item: Omit<ActivityItem, 'id' | 'time'>) => [{ ...item, id: Date.now(), time: 'Just now' }, ...items].slice(0, 8);

export function Popup() {
  const { data, update, reset } = useStorage();
  const [page, setPage] = useState<Page>('home');
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);
  const addWater = () => update(d => ({ ...d, stats: { ...d.stats, water: d.stats.water + 250 }, activities: addActivity(d.activities, { title: 'Water logged', detail: '250 ml', icon: 'water' }) }));
  const addSteps = () => update(d => ({ ...d, stats: { ...d.stats, steps: d.stats.steps + 500, calories: d.stats.calories + 25 }, activities: addActivity(d.activities, { title: 'Steps added', detail: '500 steps · 25 kcal', icon: 'steps' }) }));
  const addWorkout = () => update(d => ({ ...d, stats: { ...d.stats, workouts: d.stats.workouts + 1, calories: d.stats.calories + 180 }, activities: addActivity(d.activities, { title: 'Workout complete', detail: '30 min · 180 kcal', icon: 'workout' }) }));

  return <main className="popup">
    <Header />
    {page === 'home' && <>
      <section className="hero"><div><span>YOUR STREAK</span><strong>{data.stats.streak} days</strong><p>You're building a great habit.</p></div><Trophy size={35} /></section>
      <section className="stats-grid"><StatCard label="Calories" value={data.stats.calories} unit=" kcal" icon={Zap} tone="orange" /><StatCard label="Water" value={data.stats.water} unit=" ml" icon={Droplets} tone="blue" /><StatCard label="Steps" value={data.stats.steps} unit="" icon={Footprints} tone="green" /><StatCard label="Workouts" value={data.stats.workouts} unit=" done" icon={Trophy} tone="purple" /></section>
      <section className="panel"><div className="section-heading"><h2>Quick Actions</h2><span>Keep going!</span></div><div className="actions-grid"><ActionButton label="Add Water" icon={Droplets} variant="primary" onClick={addWater} /><ActionButton label="Add 500 Steps" icon={Footprints} onClick={addSteps} /><ActionButton label="Complete Workout" icon={Bike} onClick={addWorkout} /><ActionButton label="Reset Progress" icon={RotateCcw} variant="danger" onClick={reset} /></div></section>
      <section className="panel goals-panel"><div className="section-heading"><h2>Daily Goals</h2><button className="text-button" onClick={() => setPage('goals')}>View all</button></div><ProgressBar label="Water" current={data.stats.water} goal={data.goals.water} unit="ml" color="water-fill" /><ProgressBar label="Steps" current={data.stats.steps} goal={data.goals.steps} unit="steps" color="steps-fill" /><ProgressBar label="Calories" current={data.stats.calories} goal={data.goals.calories} unit="kcal" color="calories-fill" /></section><QuoteCard quote={quote} />
    </>}
    {page === 'goals' && <Goals data={data} update={update} />}
    {page === 'activity' && <ActivityPage items={data.activities} />}
    {page === 'settings' && <SettingsPage reset={reset} />}
    <nav className="bottom-nav"><NavButton page="home" active={page} set={setPage} icon={Home} label="Home" /><NavButton page="goals" active={page} set={setPage} icon={Goal} label="Goals" /><NavButton page="activity" active={page} set={setPage} icon={Activity} label="Activity" /><NavButton page="settings" active={page} set={setPage} icon={Settings} label="Settings" /></nav>
  </main>;
}

function NavButton({ page, active, set, icon: Icon, label }: { page: Page; active: Page; set: (page: Page) => void; icon: typeof Home; label: string }) { return <button className={active === page ? 'nav-item active' : 'nav-item'} onClick={() => set(page)}><Icon size={18} /><span>{label}</span></button>; }
function Goals({ data, update }: { data: ReturnType<typeof useStorage>['data']; update: ReturnType<typeof useStorage>['update'] }) { const changeGoal = (key: keyof typeof data.goals, amount: number) => update(d => ({ ...d, goals: { ...d.goals, [key]: Math.max(1, d.goals[key] + amount) } })); return <section className="page"><div className="page-title"><Goal /><div><h2>Your daily goals</h2><p>Tailor FitSync to your routine.</p></div></div>{(['water', 'steps', 'calories'] as const).map(key => <div className="goal-editor" key={key}><div><strong>{key[0].toUpperCase() + key.slice(1)}</strong><span>{data.goals[key].toLocaleString()} {key === 'water' ? 'ml' : key === 'steps' ? 'steps' : 'kcal'}</span></div><div><button onClick={() => changeGoal(key, key === 'steps' ? -500 : -100)}>−</button><button onClick={() => changeGoal(key, key === 'steps' ? 500 : 100)}>+</button></div></div>)}<div className="tip"><CheckCircle2 size={18} /> Your goals are saved automatically.</div></section>; }
function ActivityPage({ items }: { items: ActivityItem[] }) { const icons = { water: Droplets, steps: Footprints, workout: Bike }; return <section className="page"><div className="page-title"><Activity /><div><h2>Activity history</h2><p>Your latest wins, all in one place.</p></div></div><div className="activity-list">{items.map(item => { const Icon = icons[item.icon]; return <article className="activity-row" key={item.id}><div className={`activity-icon ${item.icon}`}><Icon size={18} /></div><div><strong>{item.title}</strong><p>{item.detail}</p></div><time>{item.time}</time></article>})}</div></section>; }
function SettingsPage({ reset }: { reset: () => void }) { const [reminders, setReminders] = useState(true); return <section className="page"><div className="page-title"><SlidersHorizontal /><div><h2>Settings</h2><p>Keep your plan working for you.</p></div></div><div className="settings-card"><div><strong>Daily reminders</strong><p>A gentle prompt to log your progress.</p></div><button className={reminders ? 'switch on' : 'switch'} onClick={() => setReminders(!reminders)} aria-label="Toggle daily reminders"><i /></button></div><div className="settings-card"><div><strong>Data & privacy</strong><p>Your fitness data is stored only in this browser.</p></div></div><button className="reset-link" onClick={reset}>Reset all demo data</button></section>; }
