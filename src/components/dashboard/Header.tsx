"use client";

import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { fetchProfile, getFullName } from "@/app/dashboard/(shared)/settings/api";
import { useNotification } from "@/components/providers/NotificationProvider";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const { unreadCount } = useNotification();
  const user = session?.user;
  const token = user?.accessToken;

  const { data: profile } = useQuery({
    queryKey: ["dashboard-header-profile"],
    queryFn: () => fetchProfile(token as string),
    enabled: !!token,
  });

  const userName =
    getFullName(profile) ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.name ||
    "User";
  const userImage =
    profile?.profileImage || user?.profileImage || "/assets/images/autoLogo.png";

  return (
    <div className="flex h-[92px] items-center justify-end gap-4 px-6 py-6 md:px-10">
      <Link
        href="/dashboard/notifications"
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E4EAF2] bg-white text-[#1F2937] shadow-sm transition-colors hover:bg-[#F8FBFF]"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 min-w-[18px] rounded-full bg-[#FF3B30] px-1.5 py-0.5 text-center text-[10px] font-semibold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Link>

      <Link
        href="/dashboard/settings"
        className="relative block h-11 w-11 overflow-hidden rounded-full border border-[#E4EAF2] bg-white shadow-sm transition-transform hover:scale-[1.02]"
        title={userName}
      >
        <Image
          src={userImage}
          alt={userName}
          fill
          sizes="44px"
          className="object-cover"
        />
      </Link>
    </div>
  );
}
