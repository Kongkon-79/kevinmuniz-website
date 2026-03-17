'use client'

import { useQuery } from '@tanstack/react-query'
import {
  ChartNoAxesColumn,
  DollarSign,
  FolderKanban,
  Users,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchCreatorOverview, fetchCreatorStats } from '../api'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const formatAmount = (amount: number) => `$${amount.toLocaleString()}`

const getStatusClasses = (status: string) => {
  return status === 'active'
    ? 'bg-[#E9FFF3] text-[#0E9F6E]'
    : 'bg-[#F3F4F6] text-[#6B7280]'
}

function StatsSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-8 w-24" />
        </div>
      ))}
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <Skeleton className="h-6 w-36" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-xl border p-5">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <Skeleton className="h-6 w-36" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CreatorOverview() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useQuery({
    queryKey: ['creator-stats'],
    queryFn: () => fetchCreatorStats(token),
    enabled: !!token,
  })

  const {
    data: overview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
  } = useQuery({
    queryKey: ['creator-overview'],
    queryFn: () => fetchCreatorOverview(token),
    enabled: !!token,
  })

  const isLoading = isStatsLoading || isOverviewLoading

  useEffect(() => {
    if (isStatsError) {
      toast.error('Failed to load creator stats.')
    }
  }, [isStatsError])

  useEffect(() => {
    if (isOverviewError) {
      toast.error('Failed to load creator overview.')
    }
  }, [isOverviewError])

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <h1 className="text-[24px] font-semibold text-[#2D2D2D]">
        Dashboard Overview
      </h1>
      <p className="mt-1 text-sm text-[#9AA0A6]">
        Welcome back! Here&apos;s your campaign overview
      </p>

      {isLoading ? (
        <>
          <StatsSkeleton />
          <OverviewSkeleton />
        </>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[10px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_12px_rgba(46,171,252,0.05)]">
              <div className="mb-3 inline-flex rounded-md bg-[#786BFF] p-1.5 text-white">
                <DollarSign className="h-4 w-4" />
              </div>
              <h3 className="text-[12px] font-medium text-[#4B5563]">
                Total Funds Raised
              </h3>
              <p className="mt-1 text-[16px] font-bold text-[#111827] md:text-[18px]">
                {formatAmount(stats?.totalRaised || 0)}
              </p>
            </div>
            <div className="rounded-[10px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_12px_rgba(46,171,252,0.05)]">
              <div className="mb-3 inline-flex rounded-md bg-[#697CFF] p-1.5 text-white">
                <FolderKanban className="h-4 w-4" />
              </div>
              <h3 className="text-[12px] font-medium text-[#4B5563]">
                Active Campaigns
              </h3>
              <p className="mt-1 text-[16px] font-bold text-[#111827] md:text-[18px]">
                {stats?.activeCampaigns || 0}
              </p>
            </div>
            <div className="rounded-[10px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_12px_rgba(46,171,252,0.05)]">
              <div className="mb-3 inline-flex rounded-md bg-[#667DFF] p-1.5 text-white">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="text-[12px] font-medium text-[#4B5563]">
                Total Donors
              </h3>
              <p className="mt-1 text-[16px] font-bold text-[#111827] md:text-[18px]">
                {stats?.totalDonors || 0}
              </p>
            </div>
            <div className="rounded-[10px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_12px_rgba(46,171,252,0.05)]">
              <div className="mb-3 inline-flex rounded-md bg-[#5C7CFF] p-1.5 text-white">
                <ChartNoAxesColumn className="h-4 w-4" />
              </div>
              <h3 className="text-[12px] font-medium text-[#4B5563]">
                Avg Donation
              </h3>
              <p className="mt-1 text-[16px] font-bold text-[#111827] md:text-[18px]">
                {formatAmount(stats?.avgDonation || 0)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.25fr_1fr]">
            <section className="rounded-[12px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[18px] font-medium text-[#2D2D2D]">
                  My Campaigns
                </h2>
                <Link
                  href="/dashboard/my-campaigns"
                  className="text-sm font-semibold text-[#2EABFC] transition-opacity hover:opacity-80"
                >
                  See All
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {overview?.myCampaigns.length ? (
                  overview.myCampaigns.map(campaign => (
                    <article
                      key={campaign._id}
                      className="rounded-[10px] border border-[#B9CEFF] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-[16px] font-medium text-[#2D2D2D]">
                            {campaign.title}
                          </h3>
                          <p className="max-w-2xl text-xs leading-5 text-[#777777]">
                            {campaign.shortDescription}
                          </p>
                        </div>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium capitalize ${getStatusClasses(
                            campaign.activeStatus,
                          )}`}
                        >
                          {campaign.activeStatus}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#777777]">
                        <span className="font-semibold text-[#2D2D2D]">
                          {formatAmount(campaign.totalRaised)} raised
                        </span>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[10px] border border-dashed border-[#B9CEFF] p-8 text-center text-sm text-[#777777]">
                    No campaigns found yet.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[12px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[18px] font-medium text-[#2D2D2D]">
                  Recent Donors
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {overview?.recentDonors.length ? (
                  overview.recentDonors.map(donor => (
                    <div
                      key={`${donor.donorId}-${donor.donatedAt}`}
                      className="flex items-start justify-between gap-4 rounded-[10px] border border-[#B9CEFF] px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-[#2D2D2D]">
                          {donor.firstName} {donor.lastName}
                        </p>
                        <p className="mt-1 text-xs text-[#777777]">
                          {donor.campaignTitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="whitespace-nowrap text-xs font-semibold text-[#0E9F6E]">
                          ${donor.amount}
                        </p>
                        <p className="mt-1 text-xs text-[#777777]">
                          {formatDate(donor.donatedAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[10px] border border-dashed border-[#B9CEFF] p-8 text-center text-sm text-[#777777]">
                    No recent donors found.
                  </div>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  )
}
