// 'use client';

// import * as React from 'react';
// import { Menu, Bell, User, Settings, LogOut, Shield } from 'lucide-react';
// import { SearchInput } from '@/components/ui/search-input';
// import { Avatar } from '@/components/ui/avatar';
// import { Dropdown, NotificationDropdown } from '@/components/ui/dropdown';
// import { ThemeToggle } from '@/components/ui/theme-toggle';
// import { useUserStore } from '@/store/use-user-store';
// import { useRouter } from 'next/navigation';
// import { useNotifications } from "@/hooks/useNotifications";

// export interface NavbarProps {
//   onOpenMobileMenu?: () => void;
// }

// export function Navbar({ onOpenMobileMenu }: NavbarProps) {
//   const router = useRouter();
//   const { user, logout } = useUserStore();
//   const { unreadCount } = useNotifications();

//   const profileMenuItems = [
//     {
//       label: 'Account Settings',
//       icon: <Settings className="h-4 w-4 text-slate-400" />,
//       onClick: () => router.push('/dashboard/settings'),
//     },
//     {
//       label: 'Security & 2FA',
//       icon: <Shield className="h-4 w-4 text-slate-400" />,
//       onClick: () => router.push('/dashboard/settings?tab=security'),
//     },
//     {
//       label: 'Log Out',
//       icon: <LogOut className="h-4 w-4 text-red-400" />,
//       danger: true,
//       onClick: () => logout(),
//     },
//   ];

//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#080C14]/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
//       <div className="flex items-center space-x-3">
//         <button
//           onClick={onOpenMobileMenu}
//           className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <div className="hidden sm:block">
//           <h2 className="text-base font-bold text-white flex items-center">
//             Dashboard <span className="ml-1.5">👋</span>
//           </h2>
//           <p className="text-[11px] text-slate-400">
//             Welcome back, {user?.name || 'Zaid'}! Ready to crush your goals today?
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-3">
//         <SearchInput className="hidden md:flex" />
// {/* 
//         <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0E1422] text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
//           <Bell className="h-4 w-4" />

//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
//               {unreadCount}
//             </span>
//           )}
//         </div> */}
//         <NotificationDropdown />  
//         <ThemeToggle />

//         <Dropdown
//           trigger={
//             <Avatar
//               src={user?.avatarUrl}
//               fallback={user?.name || 'ZA'}
//               size="md"
//               className="cursor-pointer hover:ring-2 hover:ring-brand-500/50 transition-all"
//             />
//           }
//           items={profileMenuItems}
//         />
//       </div>
//     </header>
//   );
// }
'use client';

import * as React from 'react';
import { Menu, Settings, LogOut, Shield } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';
import { Avatar } from '@/components/ui/avatar';
import {
  Dropdown,
  NotificationDropdown,
} from '@/components/ui/dropdown';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useUserStore } from '@/store/use-user-store';
import { useRouter } from 'next/navigation';

export interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const profileMenuItems = [
    {
      label: 'Account Settings',
      icon: <Settings className="h-4 w-4 text-slate-400" />,
      onClick: () => router.push('/dashboard/settings'),
    },
    {
      label: 'Security & 2FA',
      icon: <Shield className="h-4 w-4 text-slate-400" />,
      onClick: () => router.push('/dashboard/settings?tab=security'),
    },
    {
      label: 'Log Out',
      icon: <LogOut className="h-4 w-4 text-red-400" />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#080C14]/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:block">
          <h2 className="flex items-center text-base font-bold text-white">
            Dashboard <span className="ml-1.5">👋</span>
          </h2>

          <p className="text-[11px] text-slate-400">
            Welcome back, {user?.name || 'Zaid'}! Ready to crush your goals today?
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3">
        <SearchInput className="hidden md:flex" />

        {/* Notification Bell */}
        <NotificationDropdown />

        {/* Theme */}
        <ThemeToggle />

        {/* Profile */}
        <Dropdown
          trigger={
            <Avatar
              src={user?.avatarUrl}
              fallback={user?.name || 'ZA'}
              size="md"
              className="cursor-pointer transition-all hover:ring-2 hover:ring-brand-500/50"
            />
          }
          items={profileMenuItems}
        />
      </div>
    </header>
  );
}