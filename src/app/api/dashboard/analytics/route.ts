// // src/app/api/dashboard/analytics/route.ts

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getCurrentUser } from "@/lib/auth";


// export async function GET() {

//   const user = await getCurrentUser();


//   if(!user){

//     return NextResponse.json(
//       {
//         error:"Unauthorized"
//       },
//       {
//         status:401
//       }
//     );

//   }



//   // Get all completed workouts
//   const completedWorkouts = await prisma.workout.findMany({

//     where:{
//       userId:user.id,
//       status:"Completed"
//     },

//     orderBy:{
//       date:"desc"
//     }

//   });



//   // Calculate current streak
//   let currentStreak = 0;


//   let today = new Date();

//   today.setHours(0,0,0,0);



//   for(const workout of completedWorkouts){


//     const workoutDate = new Date(workout.date);

//     workoutDate.setHours(0,0,0,0);



//     const difference =
//       Math.floor(
//         (today.getTime() - workoutDate.getTime())
//         /
//         (1000 * 60 * 60 * 24)
//       );



//     if(difference === currentStreak){

//       continue;

//     }



//     if(difference === currentStreak + 1 || currentStreak === 0){

//       currentStreak++;

//     }

//     else{

//       break;

//     }


//   }



//   // Other dashboard calculations
//   const totalWorkouts = await prisma.workout.count({

//     where:{
//       userId:user.id
//     }

//   });



//   const calories = await prisma.workout.aggregate({

//     where:{
//       userId:user.id
//     },

//     _sum:{
//       caloriesBurned:true
//     }

//   });



//   const totalMinutes = await prisma.workout.aggregate({

//     where:{
//       userId:user.id
//     },

//     _sum:{
//       durationMinutes:true
//     }

//   });




//   return NextResponse.json({

//     stats:{

//       totalWorkouts,

//       caloriesBurned:
//         calories._sum.caloriesBurned ?? 0,

//       totalMinutes:
//         totalMinutes._sum.durationMinutes ?? 0,

//       currentStreak

//     }

//   });


// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { subDays, startOfDay } from "date-fns";
// import { createGoodMorningNotification } from "@/lib/notifications";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    // await createGoodMorningNotification(user.id);
    // ===========================
    // Dashboard Statistics
    // ===========================

    const totalWorkoutsPromise = prisma.workout.count({
      where: {
        userId: user.id,
      },
    });

    const completedWorkoutsPromise = prisma.workout.count({
      where: {
        userId: user.id,
        status: "Completed",
      },
    });

    const weeklyWorkoutsPromise = prisma.workout.count({
      where: {
        userId: user.id,
        date: {
          gte: startOfDay(subDays(new Date(), 6)),
        },
      },
    });

    const caloriesPromise = prisma.workout.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        caloriesBurned: true,
      },
    });

    const durationPromise = prisma.workout.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        durationMinutes: true,
      },
    });

    // ===========================
    // Recent Workouts
    // ===========================

    const recentWorkoutsPromise = prisma.workout.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,

      include: {
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    // ===========================
    // Today's Workout
    // ===========================

    const todaysWorkoutPromise = prisma.workout.findFirst({
      where: {
        userId: user.id,

        status: {
          in: ["Planned", "InProgress"],
        },
      },

      orderBy: {
        date: "asc",
      },

      include: {
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    // ===========================
    // Goals
    // ===========================

    const goalsPromise = prisma.goal.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // ===========================
    // Notifications
    // ===========================

    const notificationsPromise = prisma.notification.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    });

    // ===========================
    // Execute Queries
    // ===========================

    const [
      totalWorkouts,
      completedWorkouts,
      weeklyWorkouts,
      calories,
      duration,
      recentWorkouts,
      todaysWorkout,
      goals,
      notifications,
    ] = await Promise.all([
      totalWorkoutsPromise,
      completedWorkoutsPromise,
      weeklyWorkoutsPromise,
      caloriesPromise,
      durationPromise,
      recentWorkoutsPromise,
      todaysWorkoutPromise,
      goalsPromise,
      notificationsPromise,
    ]);

    // ===========================
    // Current Streak
    // ===========================

    const workoutDates = await prisma.workout.findMany({
      where: {
        userId: user.id,
        status: "Completed",
      },

      orderBy: {
        date: "desc",
      },

      select: {
        date: true,
      },
    });

    let streak = 0;

    let current = startOfDay(new Date());

    const completedDays = new Set(
      workoutDates.map((w) => startOfDay(w.date).getTime())
    );

    while (completedDays.has(current.getTime())) {
      streak++;

      current = subDays(current, 1);
    }

    // ===========================
    // Goal Progress
    // ===========================

    const goalProgress = goals.map((goal) => {

      const currentValue = goal.currentValue ?? 0;

      const percentage =
        goal.targetValue === 0
          ? 0
          : Math.min(
              Math.round((currentValue / goal.targetValue) * 100),
              100
            );

      return {
        ...goal,
        percentage,
      };
    });

    // ===========================
    // Response
    // ===========================

    return NextResponse.json({
      success: true,

      stats: {
        totalWorkouts,

        completedWorkouts,

        weeklyWorkouts,

        caloriesBurned:
          calories._sum.caloriesBurned ?? 0,

        totalMinutes:
          duration._sum.durationMinutes ?? 0,

        currentStreak: streak,
      },

      todaysWorkout,

      recentWorkouts,

      goals: goalProgress,

      notifications,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}