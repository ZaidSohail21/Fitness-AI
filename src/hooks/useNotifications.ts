"use client";

import { useEffect, useState } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNotifications() {
    try {
      const res = await fetch("/api/notifications");

      if (!res.ok) return;

      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );

    try {
      await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function markAllAsRead() {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );

    try {
      await fetch("/api/notifications/read-all", {
        method: "PATCH",
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refresh: loadNotifications,
  };
}