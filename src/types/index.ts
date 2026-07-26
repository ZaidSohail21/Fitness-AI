export interface WeeklyWorkout {
  day: string;
  duration: number;
}

export interface WorkoutHistoryItem {
  id: string;
  date: string;
  name: string;
  duration: number;
}

export interface GoalProgress {
  completed: number;
  total: number;
}

export interface Streak {
  days: number;
}

export interface PersonalRecords {
  total: number;
}

export interface ProgressAnalyticsData {
  weeklyWorkouts: WeeklyWorkout[];
  workoutHistory: WorkoutHistoryItem[];
  goalProgress: GoalProgress;
  currentStreak: Streak;
  personalRecords: PersonalRecords;
}
