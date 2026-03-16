'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchDiscoverCampaignById, getErrorMessage } from '../api'
import DonateToCampaignModal from '../_components/DonateToCampaignModal'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getDaysLeft = (endDate: string) => {
  const remaining = new Date(endDate).getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(remaining / (1000 * 60 * 60 * 24)))
}

export default function DiscoverCampaignDetailsPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
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

  if (isLoading) {
    return (
      <div className="mx-auto max-w-full space-y-4 rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
        <Skeleton className="h-5 w-16" />
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Skeleton className="h-[320px] w-full rounded-[12px]" />
          <Skeleton className="h-[320px] w-full rounded-[12px]" />
        </div>
        <Skeleton className="h-[260px] w-full rounded-[12px]" />
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { campaign, totalRaised, totalDonations } = data
  const activeStatusLabel =
    campaign.activeStatus.charAt(0).toUpperCase() + campaign.activeStatus.slice(1)

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <button
        type="button"
        onClick={() => router.push('/dashboard/discover')}
        className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#2D2D2D] transition-colors hover:bg-[#EAF6FF] hover:text-[#2EABFC] active:bg-[#D9EEFF]"
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
          </div>
        </section>

        <section className="rounded-[12px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
          <h2 className="text-[18px] font-medium text-[#0E9F6E]">
            Raised Amount ${totalRaised.toLocaleString()}
          </h2>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-3">
              <Users className="mt-1 h-5 w-5 text-[#4B5563]" />
              <div>
                <p className="text-[28px] leading-none text-[#2D2D2D]">
                  {totalDonations}
                </p>
                <p className="text-sm text-[#777777]">Backers</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-[#4B5563]" />
              <div>
                <p className="text-[28px] leading-none text-[#2D2D2D]">
                  {getDaysLeft(campaign.endDate)} Days
                </p>
                <p className="text-sm text-[#777777]">Left to this project</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[#4B5563]" />
              <div>
                <p className="text-[28px] leading-none text-[#2D2D2D]">
                  {campaign.location}
                </p>
                <p className="text-sm text-[#777777]">Location</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 text-[#4B5563]" />
              <div>
                <p className="text-[28px] leading-none text-[#2D2D2D]">
                  {formatDate(campaign.endDate)}
                </p>
                <p className="text-sm text-[#777777]">End Date</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[#E5E7EB] pt-6">
            <Button
              type="button"
              onClick={() => setIsDonateModalOpen(true)}
              className="h-[46px] w-full rounded-full bg-gradient-to-r from-[#8C5CFF] to-[#7C5CFF] text-white hover:from-[#7F51F5] hover:to-[#744CF2]"
            >
              Donate to this Campaign
            </Button>
            <p className="mt-3 text-center text-xs text-[#999999]">
              Secure payment via Stripe. All contributions are final.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-[12px] border border-[#B9CEFF] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <h2 className="text-[18px] font-medium text-[#2D2D2D]">
          Campaign Details
        </h2>
        <div
          className="prose prose-sm mt-4 max-w-none text-[#777777]"
          dangerouslySetInnerHTML={{ __html: campaign.campaignDetails }}
        />
      </section>

      <DonateToCampaignModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        campaign={{
          _id: campaign._id,
          title: campaign.title,
          shortDescription: campaign.shortDescription,
        }}
      />
    </div>
  )
}
