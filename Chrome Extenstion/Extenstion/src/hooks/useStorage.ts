import { useCallback, useEffect, useState } from 'react';

export type FitnessStats = { water: number; steps: number; calories: number; workouts: number; streak: number };
export type ActivityItem = { id: number; title: string; detail: string; icon: 'water' | 'steps' | 'workout'; time: string };
export type FitnessData = { stats: FitnessStats; activities: ActivityItem[]; goals: { water: number; steps: number; calories: number } };

export const defaultData: FitnessData = {
  stats: { water: 750, steps: 4280, calories: 215, workouts: 1, streak: 4 },
  goals: { water: 2000, steps: 10000, calories: 500 },
  activities: [
    { id: 1, title: 'Morning walk', detail: '2,800 steps · 140 kcal', icon: 'steps', time: '8:30 AM' },
    { id: 2, title: 'Water logged', detail: '250 ml', icon: 'water', time: '10:15 AM' },
    { id: 3, title: 'Quick workout', detail: '15 min · 75 kcal', icon: 'workout', time: 'Yesterday' },
  ],
};
const storageKey = 'fitsync-ai-data';

function readStoredData(): FitnessData | undefined {
  try { const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : undefined; } catch { return undefined; }
}

function saveData(data: FitnessData) {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) chrome.storage.local.set({ [storageKey]: data });
  else localStorage.setItem(storageKey, JSON.stringify(data));
}

export function useStorage() {
  const [data, setData] = useState<FitnessData>(defaultData);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get(storageKey, (result) => setData({ ...defaultData, ...(result[storageKey] as Partial<FitnessData> | undefined), stats: { ...defaultData.stats, ...(result[storageKey] as Partial<FitnessData> | undefined)?.stats }, goals: { ...defaultData.goals, ...(result[storageKey] as Partial<FitnessData> | undefined)?.goals } }));
    } else setData({ ...defaultData, ...readStoredData() });
  }, []);

  const update = useCallback((change: (current: FitnessData) => FitnessData) => {
    setData((current) => { const next = change(current); saveData(next); return next; });
  }, []);

  const reset = useCallback(() => { setData(defaultData); saveData(defaultData); }, []);
  return { data, update, reset };
}
