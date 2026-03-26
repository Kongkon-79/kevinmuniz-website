'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Users,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import {
  fetchDiscoverCampaignById,
  getErrorMessage,
  trackCampaign,
  untrackCampaign,
} from '../api'
import DonateToCampaignModal from '../_components/DonateToCampaignModal'

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

const formatDateOnly = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export default function DiscoverCampaignDetailsPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const queryClient = useQueryClient()
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['discover-campaign', params.id],
    queryFn: () => fetchDiscoverCampaignById(token, params.id),
    enabled: !!token && !!params.id,
  })

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [error, isError])

  const trackingMutation = useMutation({
    mutationFn: async () => {
      if (!data) {
        throw new Error('Campaign data is not available')
      }

      return data.isTracked
        ? untrackCampaign(token, params.id)
        : trackCampaign(token, params.id)
    },
    onSuccess: nextState => {
      toast.success(
        nextState.isTracked
          ? 'Campaign added to your tracked list'
          : 'Campaign removed from your tracked list',
      )
      queryClient.invalidateQueries({ queryKey: ['discover-campaign', params.id] })
      queryClient.invalidateQueries({ queryKey: ['tracked-campaigns'] })
      queryClient.invalidateQueries({ queryKey: ['discover-campaigns'] })
    },
    onError: (mutationError: unknown) => {
      toast.error(getErrorMessage(mutationError))
    },
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-full space-y-8 p-4 md:p-8">
        <Skeleton className="h-5 w-16" />
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Skeleton className="aspect-[16/9] w-full rounded-[24px]" />
            <Skeleton className="h-[320px] w-full rounded-[24px]" />
          </div>
          <Skeleton className="h-[520px] w-full rounded-[28px] lg:col-span-4" />
        </div>
        <Skeleton className="h-[280px] w-full rounded-[24px]" />
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { campaign, totalRaised, totalDonations, donors, producer, isTracked } = data
  const isInactive = campaign.activeStatus === 'inactive'
  const creatorName = [campaign.createdBy.firstName, campaign.createdBy.lastName]
    .filter(Boolean)
    .join(' ')
  const producerName = producer
    ? [producer.firstName, producer.lastName].filter(Boolean).join(' ')
    : ''
  const trackButtonLabel = isTracked ? 'Tracked' : 'Track Campaign'

  return (
    <div className="mx-auto max-w-full space-y-8 p-4 md:p-8">
      <button
        type="button"
        onClick={() => router.push('/dashboard/discover')}
        className="flex items-center gap-2 text-sm font-semibold text-[#111827] transition-colors hover:text-[#33BAFF]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="space-y-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px]">
              <Image
                src={campaign.image || '/assets/images/autoLogo.png'}
                alt={campaign.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
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
                  {!isInactive && (
                    <p className="text-sm font-bold text-[#111827]">
                      ${totalRaised.toLocaleString()} raised
                    </p>
                  )}
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
                  {campaign.createdBy.profileImage ? (
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

          {!isInactive && producer && (
            <section className="overflow-hidden rounded-[24px] border border-[#D7E8FF] bg-white">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#2EABFC] to-[#8C5CFF]" />
              <div className="space-y-6 p-6 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2EABFC]">
                      Approved Producer
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">
                      Producer Information
                    </h2>
                    <p className="mt-2 text-sm text-[#6B7280]">
                      This active campaign is currently backed by an approved
                      producing representative.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F6F0] px-4 py-2 text-sm font-semibold text-[#0BB05F]">
                    <BadgeCheck className="h-4 w-4" />
                    Approved
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#E7EEF7] bg-[linear-gradient(180deg,#F9FCFF_0%,#FFFFFF_100%)] p-5">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#EAF6FF] text-lg font-bold text-[#2EABFC]">
                        {producer.profileImage ? (
                          <Image
                            src={producer.profileImage}
                            alt={producerName || 'Approved Producer'}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          producerName?.charAt(0).toUpperCase() || 'P'
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#111827]">
                          {producerName || 'Approved Producer'}
                        </h3>
                        <p className="mt-1 text-sm text-[#6B7280]">
                          Producing Representative
                        </p>
                        {producer.email && (
                          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#4B5563]">
                            <Mail className="h-4 w-4 text-[#2EABFC]" />
                            {producer.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {producer.imdbPageLink && (
                      <a
                        href={producer.imdbPageLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E8FF] px-5 text-sm font-semibold text-[#2EABFC] transition-colors hover:bg-[#F3FAFF]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View IMDb Profile
                      </a>
                    )}
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-[#EEF2F7] pt-5 md:grid-cols-2">
                    <div className="rounded-[18px] border border-[#EEF5FF] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA0A6]">
                        Production Company
                      </p>
                      <p className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-[#111827]">
                        <Building2 className="h-4 w-4 text-[#8C5CFF]" />
                        {producer.productionCompany || 'Independent Producer'}
                      </p>
                    </div>

                    <div className="rounded-[18px] border border-[#EEF5FF] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA0A6]">
                        Producer Status
                      </p>
                      <p className="mt-3 text-base font-semibold text-[#111827]">
                        Approved to represent this campaign
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-16">
            <div className="overflow-hidden rounded-[28px] border border-[#D9CCFF] bg-white shadow-[0_18px_45px_rgba(46,171,252,0.14)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC]" />
              <div className="space-y-6 bg-[linear-gradient(180deg,rgba(140,92,255,0.08)_0%,rgba(46,171,252,0.03)_38%,#FFFFFF_100%)] p-6 md:p-8">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8C5CFF]">
                    {isInactive ? 'Project Snapshot' : 'Campaign Snapshot'}
                  </p>
                  {isInactive ? (
                    <>
                      <h2 className="text-[30px] font-bold text-[#111827]">
                        General Information
                      </h2>
                      <p className="text-sm text-[#777777]">
                        This project is currently inactive, so donation details
                        are hidden.
                      </p>
                    </>
                  ) : (
                    <h2 className="text-[30px] font-bold text-[#0BB05F]">
                      ${totalRaised.toLocaleString()} Raised
                    </h2>
                  )}
                </div>

                <div className="space-y-5 pt-2">
                  {!isInactive && (
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

                  {isInactive && (
                    <div className="flex items-start gap-4 rounded-[20px] border border-[#EFEAFE] bg-white/80 p-4">
                      <div className="mt-1 rounded-full bg-[#F3EEFF] p-2 text-[#8C5CFF]">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#111827]">
                          ${campaign.proposedFunding?.toLocaleString() ?? 0}
                        </p>
                        <p className="text-sm text-[#909090]">Proposed Funding</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 rounded-[20px] border border-[#EFEAFE] bg-white/80 p-4">
                    <div className="mt-1 rounded-full bg-[#F3EEFF] p-2 text-[#8C5CFF]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#111827]">
                        {isInactive
                          ? `${formatDateOnly(campaign.creatingDate)} - ${formatDateOnly(
                              campaign.endDate,
                            )}`
                          : formatDate(campaign.endDate)}
                      </p>
                      <p className="text-sm text-[#909090]">
                        {isInactive ? 'Possible Timeline' : 'End Date'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E9EEF5] pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => trackingMutation.mutate()}
                    disabled={trackingMutation.isPending}
                    className={`h-12 w-full rounded-full border font-semibold transition-colors ${
                      isTracked
                        ? 'border-[#79D89B] bg-[#ECFDF3] text-[#0E9F6E] hover:bg-[#E6F8EF]'
                        : 'border-[#D7E8FF] bg-white text-[#2EABFC] hover:bg-[#F3FAFF]'
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${isTracked ? 'fill-current' : ''}`}
                    />
                    {trackingMutation.isPending ? 'Updating...' : trackButtonLabel}
                  </Button>

                  {!isInactive && (
                    <>
                    <Button
                      type="button"
                      onClick={() => setIsDonateModalOpen(true)}
                      className="h-14 w-full rounded-full bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC] font-semibold text-white hover:from-[#7F51F5] hover:to-[#1EA2F5]"
                    >
                      Donate to this Campaign
                    </Button>
                    <p className="text-center text-xs text-[#909090]">
                      Secure payment via Stripe. All contributions are final.
                    </p>
                    </>
                  )}

                  {isInactive && (
                    <p className="text-center text-xs text-[#909090]">
                      Track this project to keep it in your saved campaign list.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isInactive && (
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
      )}

      {!isInactive && (
        <DonateToCampaignModal
          isOpen={isDonateModalOpen}
          onClose={() => setIsDonateModalOpen(false)}
          campaign={{
            _id: campaign._id,
            title: campaign.title,
            shortDescription: campaign.shortDescription,
          }}
        />
      )}
    </div>
  )
}
