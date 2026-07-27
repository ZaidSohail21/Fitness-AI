// export interface WeeklyWorkout {
//   day: string;
//   duration: number;
// }

// export interface WorkoutHistoryItem {
//   id: string;
//   date: string;
//   name: string;
//   duration: number;
// }

// export interface GoalProgress {
//   completed: number;
//   total: number;
// }

// export interface Streak {
//   days: number;
// }

// export interface PersonalRecords {
//   total: number;
// }

// export interface ProgressAnalyticsData {
//   weeklyWorkouts: WeeklyWorkout[];
//   workoutHistory: WorkoutHistoryItem[];
//   goalProgress: GoalProgress;
//   currentStreak: Streak;
//   personalRecords: PersonalRecords;
// }
export interface DashboardResponse {
  success: boolean;

  stats: {
    totalWorkouts: number;
    completedWorkouts: number;
    weeklyWorkouts: number;
    caloriesBurned: number;
    totalMinutes: number;
    currentStreak: number;
  };

  todaysWorkout: Workout | null;

  recentWorkouts: Workout[];

  goals: Goal[];

  notifications: Notification[];
}

export interface Workout {
  id: string;
  title: string;
  date: string;
  status: string;
  durationMinutes: number | null;
  caloriesBurned: number | null;
  workoutExercises: {
    id: string;
    exercise: {
      name: string;
    };
  }[];
}

export interface Goal {
  id: string;
  type: string;
  unit: string;
  targetValue: number;
  currentValue: number | null;
  percentage: number;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
}