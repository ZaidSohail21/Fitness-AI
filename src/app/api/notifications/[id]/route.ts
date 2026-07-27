import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const { id } = await params;

    const notification = await prisma.notification.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({
      success: true,
      notification,
    });

  } catch (error) {

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