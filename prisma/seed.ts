// prisma/seed.ts
import { PrismaClient, ExerciseCategory, MuscleGroup, Equipment, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
  // Strength – Chest
  {
    name: "Barbell Bench Press",
    description: "Flat barbell bench press focusing on chest, triceps, and shoulders.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Chest,
    equipment: Equipment.Barbell,
    difficulty: Difficulty.Intermediate,
  },
  {
    name: "Dumbbell Flyes",
    description: "Isolation chest movement using dumbbells.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Chest,
    equipment: Equipment.Dumbbell,
    difficulty: Difficulty.Beginner,
  },
  // Strength – Back
  {
    name: "Deadlift",
    description: "Compound movement targeting posterior chain.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Back,
    equipment: Equipment.Barbell,
    difficulty: Difficulty.Advanced,
  },
  {
    name: "Pull‑Up",
    description: "Bodyweight vertical pulling exercise.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Back,
    equipment: Equipment.Bodyweight,
    difficulty: Difficulty.Intermediate,
  },
  // Strength – Legs
  {
    name: "Barbell Back Squat",
    description: "Core lower‑body compound lift.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Legs,
    equipment: Equipment.Barbell,
    difficulty: Difficulty.Intermediate,
  },
  {
    name: "Leg Press",
    description: "Machine‑based leg exercise.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Legs,
    equipment: Equipment.Machine,
    difficulty: Difficulty.Beginner,
  },
  // Strength – Shoulders
  {
    name: "Overhead Press",
    description: "Barbell or dumbbell press targeting shoulders.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Shoulders,
    equipment: Equipment.Barbell,
    difficulty: Difficulty.Intermediate,
  },
  {
    name: "Lateral Raise",
    description: "Isolation shoulder movement.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Shoulders,
    equipment: Equipment.Dumbbell,
    difficulty: Difficulty.Beginner,
  },
  // Strength – Arms
  {
    name: "Barbell Bicep Curl",
    description: "Barbell curl targeting biceps.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Arms,
    equipment: Equipment.Barbell,
    difficulty: Difficulty.Beginner,
  },
  {
    name: "Triceps Dips",
    description: "Bodyweight dip focusing on triceps.",
    category: ExerciseCategory.Strength,
    muscleGroup: MuscleGroup.Arms,
    equipment: Equipment.Bodyweight,
    difficulty: Difficulty.Intermediate,
  },
  // Cardio
  {
    name: "Running",
    description: "Outdoor or treadmill running.",
    category: ExerciseCategory.Cardio,
    muscleGroup: MuscleGroup.Legs,
    equipment: Equipment.Bodyweight,
    difficulty: Difficulty.Beginner,
  },
  {
    name: "Cycling",
    description: "Stationary or road cycling.",
    category: ExerciseCategory.Cardio,
    muscleGroup: MuscleGroup.Legs,
    equipment: Equipment.Other,
    difficulty: Difficulty.Beginner,
  },
  // Flexibility
  {
    name: "Hamstring Stretch",
    description: "Static stretch for hamstrings.",
    category: ExerciseCategory.Flexibility,
    muscleGroup: MuscleGroup.Legs,
    equipment: Equipment.Bodyweight,
    difficulty: Difficulty.Beginner,
  },
  {
    name: "Chest Opener",
    description: "Stretch to open the chest and shoulders.",
    category: ExerciseCategory.Flexibility,
    muscleGroup: MuscleGroup.Chest,
    equipment: Equipment.Bodyweight,
    difficulty: Difficulty.Beginner,
  },
  // Mobility
  {
    name: "Hip Circles",
    description: "Dynamic mobility exercise for hips.",
    category: ExerciseCategory.Mobility,
    muscleGroup: MuscleGroup.Legs,
    equipment: Equipment.Bodyweight,
    difficulty: Difficulty.Beginner,
  },
  {
    name: "Shoulder Dislocates",
    description: "Mobility drill using a PVC pipe or band.",
    category: ExerciseCategory.Mobility,
    muscleGroup: MuscleGroup.Shoulders,
    equipment: Equipment.Other,
    difficulty: Difficulty.Beginner,
  },
  // Additional Strength exercises (total ~45)
  { name: "Incline Dumbbell Bench Press", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Chest, equipment: Equipment.Dumbbell, difficulty: Difficulty.Intermediate },
  { name: "Cable Row", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Back, equipment: Equipment.Cable, difficulty: Difficulty.Intermediate },
  { name: "Leg Extension", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Legs, equipment: Equipment.Machine, difficulty: Difficulty.Beginner },
  { name: "Leg Curl", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Legs, equipment: Equipment.Machine, difficulty: Difficulty.Beginner },
  { name: "Calf Raise", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Legs, equipment: Equipment.Bodyweight, difficulty: Difficulty.Beginner },
  { name: "Arnold Press", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Shoulders, equipment: Equipment.Dumbbell, difficulty: Difficulty.Intermediate },
  { name: "Face Pull", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Back, equipment: Equipment.Cable, difficulty: Difficulty.Beginner },
  { name: "Hammer Curl", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Arms, equipment: Equipment.Dumbbell, difficulty: Difficulty.Beginner },
  { name: "Skull Crushers", category: ExerciseCategory.Strength, muscleGroup: MuscleGroup.Arms, equipment: Equipment.Barbell, difficulty: Difficulty.Intermediate },
  { name: "Mountain Climbers", category: ExerciseCategory.Cardio, muscleGroup: MuscleGroup.Core, equipment: Equipment.Bodyweight, difficulty: Difficulty.Beginner },
  { name: "Burpees", category: ExerciseCategory.Cardio, muscleGroup: MuscleGroup.Core, equipment: Equipment.Bodyweight, difficulty: Difficulty.Intermediate },
];

async function main() {
  console.log("Seeding exercises…");
  for (const ex of exercises) {
    await prisma.exercise.upsert({
      where: { name: ex.name },
      update: {},
      create: {
        name: ex.name,
        description: ex.description ?? null,
        category: ex.category,
        muscleGroup: ex.muscleGroup,
        equipment: ex.equipment,
        difficulty: ex.difficulty,
      },
    });
  }
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
