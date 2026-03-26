'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AppPagination } from '@/components/share/AppPagination'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchTrackedCampaigns, getErrorMessage, untrackCampaign } from './api'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const getStatusStyles = (status: string) =>
  status === 'active'
    ? 'border-[#79D89B] bg-[#E9FFF3] text-[#0E9F6E]'
    : 'border-[#D1D5DB] bg-[#F3F4F6] text-[#6B7280]'

export default function MyTrackedCampaignsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tracked-campaigns', page],
    queryFn: () => fetchTrackedCampaigns(token, page, 10),
    enabled: !!token,
  })

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [error, isError])

  const untrackMutation = useMutation({
    mutationFn: (campaignId: string) => untrackCampaign(token, campaignId),
    onSuccess: () => {
      toast.success('Campaign removed from tracked list')
      queryClient.invalidateQueries({ queryKey: ['tracked-campaigns'] })
      queryClient.invalidateQueries({ queryKey: ['discover-campaigns'] })
      queryClient.invalidateQueries({ queryKey: ['discover-campaign'] })
    },
    onError: (mutationError: unknown) => {
      toast.error(getErrorMessage(mutationError))
    },
  })

  const campaigns = data?.campaigns ?? []

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#2D2D2D]">
            My Tracked Campaigns
          </h1>
          <p className="mt-1 text-sm text-[#9AA0A6]">
            Keep an eye on campaigns you want to revisit or support later.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-white px-4 py-2 text-sm font-medium text-[#2EABFC]">
          <Heart className="h-4 w-4 fill-current" />
          {data?.pagination.totalData ?? 0} tracked campaign
          {(data?.pagination.totalData ?? 0) === 1 ? '' : 's'}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[18px] border border-[#D7E8FF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]"
            >
              <Skeleton className="h-[180px] w-full rounded-[14px]" />
              <Skeleton className="mt-4 h-6 w-2/3" />
              <Skeleton className="mt-3 h-16 w-full" />
            </div>
          ))}

        {!isLoading &&
          campaigns.map(campaign => {
            const creatorName = [campaign.createdBy?.firstName, campaign.createdBy?.lastName]
              .filter(Boolean)
              .join(' ')

            return (
              <div
                key={campaign._id}
                className="overflow-hidden rounded-[18px] border border-[#D7E8FF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]"
              >
                <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
                  <div className="relative h-[190px] overflow-hidden rounded-[16px]">
                    <Image
                      src={campaign.image || '/assets/images/autoLogo.png'}
                      alt={campaign.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 260px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h2 className="text-[24px] font-semibold text-[#2D2D2D]">
                            {campaign.title}
                          </h2>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#777777]">
                            {campaign.shortDescription}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusStyles(
                            campaign.activeStatus,
                          )}`}
                        >
                          {campaign.activeStatus}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="inline-flex rounded-full border border-[#E5E7EB] px-3 py-1 text-[11px] font-medium text-[#666666]">
                          {campaign.category.name}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#F8FBFF] px-3 py-1 text-[11px] font-medium text-[#4B5563]">
                          <MapPin className="h-3.5 w-3.5 text-[#2EABFC]" />
                          {campaign.location}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#F8FBFF] px-3 py-1 text-[11px] font-medium text-[#4B5563]">
                          <CalendarDays className="h-3.5 w-3.5 text-[#8C5CFF]" />
                          Tracked on {formatDate(campaign.trackedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[16px] border border-[#EEF5FF] bg-[linear-gradient(180deg,#F9FCFF_0%,#FFFFFF_100%)] p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA0A6]">
                            Campaign Snapshot
                          </p>
                          <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#4B5563]">
                            <span className="inline-flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-[#0E9F6E]" />
                              {campaign.activeStatus === 'active'
                                ? `$${campaign.totalRaised?.toLocaleString() ?? 0} raised`
                                : `$${campaign.proposedFunding?.toLocaleString() ?? 0} proposed`}
                            </span>
                            <span>
                              Creator: {creatorName || 'Campaign Creator'}
                            </span>
                            <span>Ends: {formatDate(campaign.endDate)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => untrackMutation.mutate(campaign._id)}
                            disabled={untrackMutation.isPending}
                            className="h-[42px] rounded-full border-[#FDBA74] px-5 text-[#F97316] hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                          >
                            {untrackMutation.isPending ? 'Removing...' : 'Untrack'}
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              router.push(`/dashboard/discover/${campaign._id}`)
                            }
                            className="h-[42px] rounded-full bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC] px-5 font-semibold text-white hover:from-[#7F51F5] hover:to-[#1EA2F5]"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        {!isLoading && !campaigns.length && (
          <div className="rounded-[18px] border border-[#D7E8FF] bg-white px-6 py-12 text-center shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F3FAFF] text-[#2EABFC]">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-[#2D2D2D]">
              No tracked campaigns yet
            </h2>
            <p className="mt-2 text-sm text-[#777777]">
              Start tracking campaigns from the discover page to build your
              personal watchlist.
            </p>
            <Button
              type="button"
              onClick={() => router.push('/dashboard/discover')}
              className="mt-6 h-[44px] rounded-full bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC] px-5 font-semibold text-white hover:from-[#7F51F5] hover:to-[#1EA2F5]"
            >
              Explore Campaigns
            </Button>
          </div>
        )}
      </div>

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-4">
          <AppPagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            totalData={data.pagination.totalData}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
