import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";


export async function getCurrentUser() {

  const cookieStore = await cookies();

  const userId = cookieStore.get("fitsync_session")?.value;


  if (!userId) {
    return null;
  }


  const user = await prisma.user.findUnique({

    where:{
      id:userId
    }

  });


  return user;

}