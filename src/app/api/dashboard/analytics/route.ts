// src/app/api/dashboard/analytics/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";


export async function GET() {

  const user = await getCurrentUser();


  if(!user){

    return NextResponse.json(
      {
        error:"Unauthorized"
      },
      {
        status:401
      }
    );

  }



  // Get all completed workouts
  const completedWorkouts = await prisma.workout.findMany({

    where:{
      userId:user.id,
      status:"Completed"
    },

    orderBy:{
      date:"desc"
    }

  });



  // Calculate current streak
  let currentStreak = 0;


  let today = new Date();

  today.setHours(0,0,0,0);



  for(const workout of completedWorkouts){


    const workoutDate = new Date(workout.date);

    workoutDate.setHours(0,0,0,0);



    const difference =
      Math.floor(
        (today.getTime() - workoutDate.getTime())
        /
        (1000 * 60 * 60 * 24)
      );



    if(difference === currentStreak){

      continue;

    }



    if(difference === currentStreak + 1 || currentStreak === 0){

      currentStreak++;

    }

    else{

      break;

    }


  }



  // Other dashboard calculations
  const totalWorkouts = await prisma.workout.count({

    where:{
      userId:user.id
    }

  });



  const calories = await prisma.workout.aggregate({

    where:{
      userId:user.id
    },

    _sum:{
      caloriesBurned:true
    }

  });



  const totalMinutes = await prisma.workout.aggregate({

    where:{
      userId:user.id
    },

    _sum:{
      durationMinutes:true
    }

  });




  return NextResponse.json({

    stats:{

      totalWorkouts,

      caloriesBurned:
        calories._sum.caloriesBurned ?? 0,

      totalMinutes:
        totalMinutes._sum.durationMinutes ?? 0,

      currentStreak

    }

  });


}