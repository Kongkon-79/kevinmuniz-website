'use client'

import {
  CircleDollarSign,
  HandCoins,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { AnalyticsStats } from '../types'

interface AnalyticsStatsCardsProps {
  stats: AnalyticsStats | undefined
  isLoading: boolean
}

interface StatCardConfig {
  label: string
  value: string
  icon: typeof HandCoins
  iconClassName: string
}

function StatsCardSkeleton() {
  return (
    <div className="rounded-[12px] border border-[#D7E7FF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <Skeleton className="h-10 w-10 rounded-[10px]" />
      <Skeleton className="mt-5 h-8 w-28" />
      <Skeleton className="mt-2 h-4 w-20" />
    </div>
  )
}

export default function AnalyticsStatsCards({
  stats,
  isLoading,
}: AnalyticsStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  const cards: StatCardConfig[] = [
    {
      label: 'Total Raised',
      value: `$${(stats?.totalRaised || 0).toLocaleString()}`,
      icon: HandCoins,
      iconClassName: 'bg-[#EEF2FF] text-[#6D5EF9]',
    },
    {
      label: 'Total Donations',
      value: (stats?.totalDonations || 0).toLocaleString(),
      icon: TrendingUp,
      iconClassName: 'bg-[#E8F3FF] text-[#3B82F6]',
    },
    {
      label: 'Total Donors',
      value: (stats?.totalDonors || 0).toLocaleString(),
      icon: UsersRound,
      iconClassName: 'bg-[#F3E8FF] text-[#8B5CF6]',
    },
    {
      label: 'Avg. Donation',
      value: `$${(stats?.avgDonation || 0).toLocaleString()}`,
      icon: CircleDollarSign,
      iconClassName: 'bg-[#FCE7F3] text-[#D946EF]',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(card => (
        <div
          key={card.label}
          className="rounded-[12px] border border-[#D7E7FF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]"
        >
          <div
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] ${card.iconClassName}`}
          >
            <card.icon className="h-5 w-5" />
          </div>
          <h2 className="mt-5 text-[18px] font-semibold leading-[1.2] text-[#111827] md:text-[20px]">
            {card.value}
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">{card.label}</p>
        </div>
      ))}
    </div>
  )
}
