'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import AnalyticsStatsCards from './_components/AnalyticsStatsCards'
import DonationTrendsChart from './_components/DonationTrendsChart'
import DonationsByCategoryChart from './_components/DonationsByCategoryChart'
import TopCampaignsChart from './_components/TopCampaignsChart'
import { fetchAnalyticsDashboard } from './api'

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const [selectedYear] = useState(new Date().getFullYear())

  const {
    data: analyticsDashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['analytics-dashboard', selectedYear],
    queryFn: () => fetchAnalyticsDashboard(token, selectedYear),
    enabled: !!token,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load analytics dashboard.')
    }
  }, [isError])

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <div>
        <h1 className="text-[24px] font-semibold text-[#2D2D2D]">Analytics</h1>
        <p className="mt-1 text-sm text-[#9AA0A6]">
          Track your campaign performance and donation insights
        </p>
      </div>

      <div className="mt-5">
        <AnalyticsStatsCards
          stats={analyticsDashboard?.stats}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-5">
        <DonationTrendsChart
          trends={analyticsDashboard?.donationTrends}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DonationsByCategoryChart
          data={analyticsDashboard?.donationsByCategory || []}
          isLoading={isLoading}
        />
        <TopCampaignsChart
          campaigns={analyticsDashboard?.topCampaigns || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
