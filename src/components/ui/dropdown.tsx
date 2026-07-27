// "use client";

// import { Bell } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useNotifications } from "@/hooks/useNotifications";

// export function NotificationDropdown() {
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//   } = useNotifications();

//   const [open, setOpen] = useState(false);

//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (
//         ref.current &&
//         !ref.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClick);

//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClick
//       );
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0E1422] text-slate-300 hover:bg-slate-800 transition-colors"
//       >
//         <Bell className="h-4 w-4" />

//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-800 bg-[#0E1422] shadow-xl z-50">

//           <div className="border-b border-slate-800 p-4">
//             <h3 className="font-semibold text-white">
//               Notifications
//             </h3>
//           </div>

//           <div className="max-h-96 overflow-y-auto">

//             {notifications.length === 0 ? (

//               <div className="p-6 text-center text-slate-400">
//                 No notifications
//               </div>

//             ) : (

//               notifications.map((notification) => (

//                 <button
//                   key={notification.id}
//                   onClick={() => markAsRead(notification.id)}
//                   className={`w-full border-b border-slate-800 p-4 text-left hover:bg-slate-800 transition
//                     ${
//                       !notification.read
//                         ? "bg-emerald-500/5"
//                         : ""
//                     }`}
//                 >
//                   <p className="text-sm text-white">
//                     {notification.message}
//                   </p>

//                   <p className="mt-1 text-xs text-slate-400">
//                     {new Date(
//                       notification.createdAt
//                     ).toLocaleString()}
//                   </p>
//                 </button>

//               ))

//             )}

//           </div>

//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import * as React from "react";
import { Bell, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";

/* ===========================================
   Generic Dropdown (Profile Menu)
=========================================== */

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
}

export function Dropdown({
  trigger,
  items,
  align = "right",
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-48 rounded-xl border border-slate-800 bg-[#0E1422] p-1.5 shadow-xl",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors",
                item.danger
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-slate-200 hover:bg-slate-800 hover:text-white"
              )}
            >
              {item.icon && (
                <span className="h-4 w-4 shrink-0">
                  {item.icon}
                </span>
              )}

              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===========================================
   Notification Dropdown
=========================================== */

export function NotificationDropdown() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [open, setOpen] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0E1422] text-slate-300 transition-colors hover:bg-slate-800"
      >
        <Bell className="h-4 w-4" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-800 bg-[#0E1422] shadow-xl">

          <div className="flex items-center justify-between border-b border-slate-800 p-4">
            <h3 className="font-semibold text-white">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                <CheckCheck className="h-4 w-4" />
                Mark all
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">

            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => {
                    markAsRead(notification.id);
                    setOpen(false);
                  }}
                  className={`w-full border-b border-slate-800 p-4 text-left transition hover:bg-slate-800 ${
                    !notification.read
                      ? "bg-emerald-500/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">
                        {notification.type.replaceAll("_", " ")}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>

                    {!notification.read && (
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                </button>
              ))
            )}

          </div>

          <div className="border-t border-slate-800 p-3">
            <button
              className="w-full rounded-lg py-2 text-sm text-emerald-400 transition hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
