'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Clock, MapPin, Target, Users } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CampaignStatusModal from '../_components/CampaignStatusModal'
import { closeCampaign, fetchCampaignById, openCampaign } from '../api'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  let hh = date.getHours()
  const min = String(date.getMinutes()).padStart(2, '0')
  const ampm = hh >= 12 ? 'pm' : 'am'
  hh = hh % 12 || 12
  const hhStr = String(hh).padStart(2, '0')
  return `${mm}/${dd}/${yyyy} ${hhStr}:${min}${ampm}`
}

const getDaysLeft = (endDate: string) => {
  const remaining = new Date(endDate).getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(remaining / (1000 * 60 * 60 * 24)))
}

export default function CreatorCampaignDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const queryClient = useQueryClient()
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-campaign', params.id],
    queryFn: () => fetchCampaignById(token, params.id),
    enabled: !!token && !!params.id,
  })

  const campaignStatusMutation = useMutation({
    mutationFn: async (action: 'open' | 'close') => {
      if (action === 'close') {
        return closeCampaign(token, params.id)
      }

      return openCampaign(token, params.id)
    },
    onSuccess: (_, action) => {
      toast.success(
        action === 'close'
          ? 'Campaign closed successfully.'
          : 'Campaign opened successfully.',
      )
      setIsStatusModalOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['creator-campaign', params.id],
      })
      queryClient.invalidateQueries({ queryKey: ['my-campaigns'] })
    },
    onError: error => {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to update campaign status.'
      toast.error(message)
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load campaign details.')
    }
  }, [isError])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-full space-y-8 p-4 md:p-8">
        <Skeleton className="h-5 w-16" />
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Skeleton className="aspect-[16/9] w-full rounded-[24px]" />
            <Skeleton className="h-[320px] w-full rounded-[24px]" />
          </div>
          <Skeleton className="h-[560px] w-full rounded-[28px] lg:col-span-4" />
        </div>
        <Skeleton className="h-[280px] w-full rounded-[24px]" />
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { campaign, totalRaised, totalDonations, donors } = data
  const isClosed = campaign.closedStatus === 'closed'
  const creatorName = [
    campaign.createdBy?.firstName,
    campaign.createdBy?.lastName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="mx-auto max-w-full space-y-8 p-4 md:p-8">
      <button
        type="button"
        onClick={() => router.push('/dashboard/my-campaigns')}
        className="flex items-center gap-2 text-sm font-semibold text-[#111827] transition-colors hover:text-[#33BAFF]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="space-y-6">
            <div className="flex min-h-[350px] max-h-[500px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
              <Image
                src={campaign.image || '/assets/images/autoLogo.png'}
                alt={campaign.title}
                width={800}
                height={600}
                className="max-h-[480px] w-auto max-w-full object-contain rounded-[12px]"
                priority
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-[32px] font-bold text-[#111827]">
                  {campaign.title}
                </h1>
                <Badge
                  className={
                    campaign.activeStatus === 'active'
                      ? 'rounded-full bg-[#E6F6F0] px-4 py-1 text-xs font-medium text-[#0BB05F] hover:bg-[#E6F6F0]'
                      : 'rounded-full bg-gray-100 px-4 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100'
                  }
                >
                  {campaign.activeStatus.charAt(0).toUpperCase() +
                    campaign.activeStatus.slice(1)}
                </Badge>
              </div>

              <p className="text-lg leading-relaxed text-[#5C5C5C]">
                {campaign.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#111827]">
                    ${totalRaised.toLocaleString()} raised
                  </p>
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#E5E7EB] px-4 font-normal text-[#5C5C5C]"
                  >
                    {campaign.category.name}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[#F0F0F0] pt-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#EAF6FF] text-sm font-bold text-[#2EABFC]">
                  {campaign.createdBy?.profileImage ? (
                    <Image
                      src={campaign.createdBy.profileImage}
                      alt={creatorName || 'Campaign Creator'}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    creatorName?.charAt(0).toUpperCase() || 'C'
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">
                    {creatorName || 'Campaign Creator'}
                  </p>
                  <p className="text-xs text-[#909090]">Campaign Creator</p>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[24px] border border-[#D7E8FF] bg-white">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC]" />
            <div className="space-y-4 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#111827]">
                Campaign Details
              </h2>
              <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: campaign.campaignDetails }}
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-20">
            <div className="overflow-hidden rounded-[28px] border border-[#D9CCFF] bg-white shadow-[0_18px_45px_rgba(46,171,252,0.14)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC]" />
              <div className="space-y-6 bg-[linear-gradient(180deg,rgba(140,92,255,0.08)_0%,rgba(46,171,252,0.03)_38%,#FFFFFF_100%)] p-6 md:p-8">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8C5CFF]">
                    Campaign Snapshot
                  </p>
                  <h2 className="text-[30px] font-bold text-[#0BB05F]">
                    ${totalRaised.toLocaleString()} Raised
                  </h2>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4 rounded-[20px] border border-[#EFEAFE] bg-white/80 p-4">
                    <div className="mt-1 rounded-full bg-[#F3EEFF] p-2 text-[#8C5CFF]">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#111827]">
                        {totalDonations}
                      </p>
                      <p className="text-sm text-[#909090]">Backers</p>
                    </div>
                  </div>

                  {campaign.proposedFunding != null && campaign.proposedFunding > 0 && (
                    <div className="flex items-start gap-4 rounded-[20px] border border-[#EFEAFE] bg-white/80 p-4">
                      <div className="mt-1 rounded-full bg-[#F3EEFF] p-2 text-[#8C5CFF]">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#111827]">
                          ${campaign.proposedFunding.toLocaleString()}
                        </p>
                        <p className="text-sm text-[#909090]">Funding Goal</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 rounded-[20px] border border-[#DBEEFF] bg-white/80 p-4">
                    <div className="mt-1 rounded-full bg-[#EAF6FF] p-2 text-[#2EABFC]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#111827]">
                        {getDaysLeft(campaign.endDate)} Days
                      </p>
                      <p className="text-sm text-[#909090]">
                        Left to this project
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[20px] border border-[#DBEEFF] bg-white/80 p-4">
                    <div className="mt-1 rounded-full bg-[#EAF6FF] p-2 text-[#2EABFC]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#111827]">
                        {campaign.location}
                      </p>
                      <p className="text-sm text-[#909090]">Location</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[20px] border border-[#EFEAFE] bg-white/80 p-4">
                    <div className="mt-1 rounded-full bg-[#F3EEFF] p-2 text-[#8C5CFF]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#111827]">
                        {formatDate(campaign.endDate)}
                      </p>
                      <p className="text-sm text-[#909090]">End Date</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E9EEF5] pt-6">
                  <Button
                    type="button"
                    onClick={() => setIsStatusModalOpen(true)}
                    disabled={campaignStatusMutation.isPending}
                    className={
                      isClosed
                        ? 'h-14 w-full rounded-full bg-[#0E9F6E] font-semibold text-white hover:bg-[#0C8A61] disabled:opacity-70'
                        : 'h-14 w-full rounded-full bg-[#EF4444] font-semibold text-white hover:bg-[#DC2626] disabled:opacity-70'
                    }
                  >
                    {isClosed ? 'Open Campaign' : 'Close Campaign'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/dashboard/my-campaigns/${campaign._id}/edit`,
                      )
                    }
                    className="h-14 w-full rounded-full border-[#8C5CFF] font-semibold text-[#8C5CFF] hover:bg-[#F6F0FF]"
                  >
                    Update Campaign
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-[#111827]">Donation list</h2>
        <div className="overflow-hidden rounded-[20px] bg-transparent">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#F0F0F0] hover:bg-transparent">
                <TableHead className="h-12 text-center font-semibold text-[#5C5C5C]">
                  Name
                </TableHead>
                <TableHead className="h-12 text-center font-semibold text-[#5C5C5C]">
                  Mail
                </TableHead>
                <TableHead className="h-12 text-center font-semibold text-[#5C5C5C]">
                  Amount
                </TableHead>
                <TableHead className="h-12 text-center font-semibold text-[#5C5C5C]">
                  Campaign Title
                </TableHead>
                <TableHead className="h-12 text-center font-semibold text-[#5C5C5C]">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor, idx) => (
                <TableRow
                  key={`${donor.donorId}-${idx}`}
                  className="border-b border-[#F0F0F0] hover:bg-slate-50/50"
                >
                  <TableCell className="text-center text-[#5C5C5C]">
                    {donor.firstName} {donor.lastName}
                  </TableCell>
                  <TableCell className="text-center text-[#5C5C5C]">
                    {donor.email}
                  </TableCell>
                  <TableCell className="text-center font-medium text-[#1E1E1E]">
                    {donor.totalDonated}$
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-center font-medium text-[#1E1E1E]">
                    {campaign.title}
                  </TableCell>
                  <TableCell className="text-center text-[#5C5C5C]">
                    {formatDate(donor.lastDonatedAt)}
                  </TableCell>
                </TableRow>
              ))}
              {donors.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-[#5C5C5C]"
                  >
                    No donations yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CampaignStatusModal
        isOpen={isStatusModalOpen}
        isClosing={!isClosed}
        isPending={campaignStatusMutation.isPending}
        campaignTitle={campaign.title}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={() =>
          campaignStatusMutation.mutate(isClosed ? 'open' : 'close')
        }
      />
    </div>
  )
}
