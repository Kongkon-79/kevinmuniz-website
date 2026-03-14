'use client'

import { useEffect } from 'react'
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
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
import { fetchCampaignById } from '../api'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const getApprovalBadgeClassName = (status: string) => {
  if (status === 'accepted') {
    return 'bg-[#E9FFF3] text-[#0E9F6E] border-[#79D89B]'
  }

  if (status === 'rejected') {
    return 'bg-[#FFF1F2] text-[#DC2626] border-[#FECACA]'
  }

  return 'bg-[#FDF6E8] text-[#D97706] border-[#FCD34D]'
}

export default function CreatorCampaignDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-campaign', params.id],
    queryFn: () => fetchCampaignById(token, params.id),
    enabled: !!token && !!params.id,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load campaign details.')
    }
  }, [isError])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1120px] space-y-4 rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
        <Skeleton className="h-5 w-16" />
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Skeleton className="h-[320px] w-full rounded-[12px]" />
          <Skeleton className="h-[320px] w-full rounded-[12px]" />
        </div>
        <Skeleton className="h-[240px] w-full rounded-[12px]" />
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { campaign, totalRaised, donors } = data
  const activeStatusLabel =
    campaign.activeStatus.charAt(0).toUpperCase() +
    campaign.activeStatus.slice(1)

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <button
        type="button"
        onClick={() => router.push('/dashboard/my-campaigns')}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#2D2D2D]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-[12px] bg-white p-3 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
          <div className="relative h-[240px] overflow-hidden rounded-[10px]">
            <Image
              src={campaign.image || '/assets/images/autoLogo.png'}
              alt={campaign.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span
              className={`absolute right-4 top-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-medium capitalize ${getApprovalBadgeClassName(
                campaign.approvalStatus,
              )}`}
            >
              {campaign.approvalStatus}
            </span>
          </div>

          <div className="space-y-3 px-1 pb-1 pt-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-[18px] font-medium text-[#2D2D2D]">
                {campaign.title}
              </h1>
              <span className="inline-flex rounded-full border border-[#79D89B] bg-[#E9FFF3] px-3 py-1 text-[10px] font-medium capitalize text-[#0E9F6E]">
                {activeStatusLabel}
              </span>
            </div>

            <p className="text-xs leading-5 text-[#777777]">
              {campaign.shortDescription}
            </p>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#2D2D2D]">
                ${totalRaised.toLocaleString()} raised
              </p>
              <span className="inline-flex rounded-full border border-[#E5E7EB] px-3 py-1 text-[10px] text-[#666666]">
                {campaign.category.name}
              </span>
            </div>

            <Button
              type="button"
              onClick={() =>
                toast.info(
                  campaign.activeStatus === 'active'
                    ? 'Coming soon'
                    : 'Coming soon',
                )
              }
              className={
                campaign.activeStatus === 'active'
                  ? 'h-[42px] w-full rounded-full bg-[#EF4444] text-white hover:bg-[#DC2626]'
                  : 'h-[42px] w-full rounded-full bg-[#0E9F6E] text-white hover:bg-[#0C8A61]'
              }
            >
              {campaign.activeStatus === 'active'
                ? 'Close Campaign'
                : 'Open Campaign'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push(`/dashboard/my-campaigns/${campaign._id}/edit`)
              }
              className="h-[42px] w-full rounded-full border-[#8C5CFF] text-[#8C5CFF] hover:bg-[#F6F0FF]"
            >
              Update Campaign
            </Button>
          </div>
        </section>

        <section className="rounded-[12px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
          <h2 className="text-[18px] font-medium text-[#2D2D2D]">
            Campaign Details
          </h2>
          <div
            className="prose prose-sm mt-3 max-w-none text-[#777777]"
            dangerouslySetInnerHTML={{ __html: campaign.campaignDetails }}
          />

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-[10px] bg-[#F8FBFF] p-3">
              <div className="mb-2 inline-flex rounded-full bg-[#EEF6FF] p-2 text-[#2EABFC]">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-[#2D2D2D]">
                {data.totalDonations}
              </p>
              <p className="text-xs text-[#777777]">Donations</p>
            </div>
            <div className="rounded-[10px] bg-[#F8FBFF] p-3">
              <div className="mb-2 inline-flex rounded-full bg-[#EEF6FF] p-2 text-[#2EABFC]">
                <MapPin className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-[#2D2D2D]">
                {campaign.location}
              </p>
              <p className="text-xs text-[#777777]">Location</p>
            </div>
            <div className="rounded-[10px] bg-[#F8FBFF] p-3">
              <div className="mb-2 inline-flex rounded-full bg-[#EEF6FF] p-2 text-[#2EABFC]">
                <Calendar className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-[#2D2D2D]">
                {formatDate(campaign.endDate)}
              </p>
              <p className="text-xs text-[#777777]">End Date</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-[12px] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <h2 className="text-[18px] font-medium text-[#2D2D2D]">
          Donations ({donors.length})
        </h2>

        <div className="mt-4 overflow-hidden rounded-[12px]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#F0F0F0] hover:bg-transparent">
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Campaign Title</TableHead>
                <TableHead className="text-left">Amount</TableHead>
                <TableHead className="text-left">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map(donor => (
                <TableRow
                  key={`${donor.donorId}-${donor.lastDonatedAt}`}
                  className="border-b border-[#F0F0F0] hover:bg-transparent"
                >
                  <TableCell>
                    {donor.firstName} {donor.lastName}
                  </TableCell>
                  <TableCell>{campaign.title}</TableCell>
                  <TableCell className="font-semibold text-[#0E9F6E]">
                    ${donor.totalDonated}
                  </TableCell>
                  <TableCell>{formatDate(donor.lastDonatedAt)}</TableCell>
                </TableRow>
              ))}
              {!donors.length && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No donations yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
