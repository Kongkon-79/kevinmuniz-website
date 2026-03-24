'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  Settings,
  Megaphone,
  PlusCircle,
  BarChart,
  Heart,
  Bell,
  Search,
  LogOut,
  House,
} from 'lucide-react'
import LogoutModal from '@/components/modals/LogoutModal'
import { cn } from '@/lib/utils'

export default function DashboardSidebar() {
  const { data: session } = useSession()
  const role = session?.user?.role
  const dashboardHome =
    role === 'CREATOR' ? '/dashboard/overview' : '/dashboard/discover'
  const pathname = usePathname()
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  const commonLinks = useMemo(
    () => [
      { name: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
    ],
    [],
  )

  const creatorLinks = useMemo(
    () => [
      {
        name: 'My Campaigns',
        href: '/dashboard/my-campaigns',
        icon: Megaphone,
      },
      {
        name: 'Create Campaigns',
        href: '/dashboard/my-campaigns/create',
        icon: PlusCircle,
      },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
      { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    ],
    [],
  )

  const backerLinks = useMemo(
    () => [
      { name: 'Discover', href: '/dashboard/discover', icon: Search },
      { name: 'My Donations', href: '/dashboard/my-donations', icon: Heart },
      { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    ],
    [],
  )

  const links =
    role === 'CREATOR'
      ? [
          ...commonLinks,
          ...creatorLinks,
          { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        ]
      : [
          ...backerLinks,
          { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        ]

  const isLinkActive = (href: string) => {
    if (href === '/dashboard/my-campaigns/create') {
      return pathname === href
    }

    if (href === '/dashboard/my-campaigns') {
      return (
        pathname === href ||
        (pathname.startsWith('/dashboard/my-campaigns/') &&
          pathname !== '/dashboard/my-campaigns/create')
      )
    }

    if (href === '/dashboard/discover') {
      return pathname === href || pathname.startsWith('/dashboard/discover/')
    }

    if (href === '/dashboard/my-donations') {
      return (
        pathname === href ||
        pathname.startsWith('/dashboard/my-donations') ||
        pathname.startsWith('/dashboard/donation-success') ||
        pathname.startsWith('/dashboard/donation-failed') ||
        pathname === '/donation-success' ||
        pathname === '/donation-failed'
      )
    }

    return pathname === href
  }

  return (
    <>
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-[320px] md:flex-col md:overflow-y-auto md:bg-white">
        <div className="flex justify-center px-6 pb-5 pt-8">
          <Link href={dashboardHome} className="inline-flex">
            <Image
              src="/assets/images/logo.png"
              alt="Hierarchy of visionaries"
              width={110}
              height={110}
              className="h-[52px] w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="flex-1 space-y-3 px-5 py-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-[10px] px-4 py-3 text-[18px] font-medium leading-[120%] align-middle transition-all duration-200',
                isLinkActive(link.href)
                  ? 'bg-[#2EABFC] font-semibold text-white shadow-[0_10px_20px_rgba(46,171,252,0.28)]'
                  : 'text-[#666666] hover:bg-[#F4FAFF] hover:text-[#2EABFC]',
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="px-5 pb-8">
          <Link
            href="/"
            className="mb-2 flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-sm font-medium text-[#2EABFC] transition-colors hover:bg-[#F4FAFF]"
          >
            <House className="h-4 w-4 shrink-0" />
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-sm font-medium text-[#FF3B30] transition-colors hover:bg-[#FFF5F5]"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log Out
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => signOut({ callbackUrl: '/' })}
      />
    </>
  )
}
