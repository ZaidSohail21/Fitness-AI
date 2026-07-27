// import { prisma } from "@/lib/prisma";
// import { startOfDay } from "date-fns";

// export async function createGoodMorningNotification(userId: string) {
//   const today = startOfDay(new Date());

//   const exists = await prisma.notification.findFirst({
//     where: {
//       userId,
//       type: "GOOD_MORNING",
//       createdAt: {
//         gte: today,
//       },
//     },
//   });

//   if (exists) return;

//   await prisma.notification.create({
//     data: {
//       userId,
//       type: "GOOD_MORNING",
//       message: "🌞 Good morning! Ready to crush today's workout? 💪",
//     },
//   });
// }
"use client";

import { useEffect, useState } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNotifications() {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    refresh: fetchNotifications,
  };
}