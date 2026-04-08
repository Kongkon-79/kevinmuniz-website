'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  CheckCircle2,
  Clapperboard,
  CreditCard,
  Download,
  Eye,
  Receipt,
  CalendarDays,
  CircleDollarSign,
  BadgeCheck,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { downloadReceipt } from '@/utils/downloadReceipt'
import { fetchDonationConfirmation } from '@/app/dashboard/(backer)/discover/api'
import type { Donation } from '@/app/dashboard/(backer)/my-donations/types'

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

const formatDonationAmount = (amount: number) => {
  // Backend currently stores donation amount in dollars.
  return `$${amount}`
}

const truncateValue = (value: string | undefined, maxLength: number) => {
  if (!value) return ''
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 3)}...`
}

export function DonationSuccessSkeleton() {
  return (
    <div className="mx-auto max-w-full space-y-6 rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="mx-auto h-[180px] max-w-[420px] rounded-[20px]" />
      <Skeleton className="h-[520px] w-full rounded-[20px]" />
    </div>
  )
}

export default function DonationSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const querySessionId = searchParams.get('session_id') || ''
  const [sessionId, setSessionId] = useState(querySessionId)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (querySessionId) {
      setSessionId(querySessionId)
      window.sessionStorage.setItem('last_donation_session_id', querySessionId)
      return
    }

    const storedSessionId =
      window.sessionStorage.getItem('last_donation_session_id') || ''

    if (storedSessionId) {
      setSessionId(storedSessionId)
    }
  }, [querySessionId])

  const { data, isLoading } = useQuery({
    queryKey: ['donation-confirmation', sessionId],
    queryFn: () => fetchDonationConfirmation(token, sessionId),
    enabled: !!sessionId && !!token,
  })

  // Invalidate campaign-related caches so snapshot data refreshes after donation
  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['discover-campaign'] })
      queryClient.invalidateQueries({ queryKey: ['creator-campaign'] })
      queryClient.invalidateQueries({ queryKey: ['discover-campaigns'] })
      queryClient.invalidateQueries({ queryKey: ['tracked-campaigns'] })
      queryClient.invalidateQueries({ queryKey: ['my-campaigns'] })
    }
  }, [data, queryClient])

  if (isLoading) {
    return <DonationSuccessSkeleton />
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#EEF9FF_100%)] px-4 py-10 text-center text-sm text-[#666666]">
        Donation confirmation could not be loaded.
      </div>
    )
  }

  const paymentStatusLabel =
    data.donation.paymentStatus === 'paid'
      ? 'Completed'
      : data.donation.paymentStatus

  const donorDisplayName = data.donation.isAnonymous
    ? 'Anonymous'
    : data.donor.name
  const donorNames = donorDisplayName.split(' ')
  const receiptDonation: Donation = {
    _id: data.donation.id,
    campaignId: {
      _id: data.campaign.id,
      title: data.campaign.title,
      shortDescription: data.campaign.shortDescription,
      location: '',
      image: '',
    },
    donorId: {
      _id: data.donor.id,
      firstName: donorNames[0] || donorDisplayName,
      lastName: donorNames.slice(1).join(' '),
      email: data.donor.email,
      profileImage: '',
    },
    amount: data.donation.amount,
    stripePaymentIntentId: data.donation.stripePaymentIntentId,
    stripeSessionId: data.donation.stripeSessionId,
    paymentStatus: data.donation.paymentStatus as Donation['paymentStatus'],
    refundStatus: null,
    refundReason: null,
    refundRequestedAt: null,
    refundProcessedAt: null,
    reward: data.donation.reward,
    createdAt: data.donation.createdAt,
    updatedAt: data.donation.createdAt,
  }

  const detailRows = [
    {
      icon: Clapperboard,
      value: data.campaign.title,
      label: 'Campaign',
    },
    {
      icon: CircleDollarSign,
      value: formatDonationAmount(data.donation.amount),
      label: 'Amount',
    },
    {
      icon: Receipt,
      value: data.donation.stripeSessionId,
      label: 'Transaction ID',
      compact: true,
    },
    {
      icon: CalendarDays,
      value: formatDateTime(data.donation.createdAt),
      label: 'Date',
    },
    {
      icon: CreditCard,
      value: 'Stripe',
      label: 'Payment Method',
    },
    {
      icon: BadgeCheck,
      value: paymentStatusLabel,
      label: 'Status',
      valueClassName:
        data.donation.paymentStatus === 'paid' ? 'text-[#0E9F6E]' : '',
    },
    {
      icon: Receipt,
      value: data.donation.reward?.title || 'No Reward',
      label: 'Reward',
    },
  ]

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <button
        type="button"
        onClick={() => router.push('/dashboard/discover')}
        className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#2D2D2D] transition-colors hover:bg-[#EAF6FF] hover:text-[#2EABFC]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="mx-auto max-w-full rounded-[20px] border border-[#79D89B] bg-[#ECFDF3] px-6 py-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#79D89B] bg-white text-[#0E9F6E]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold text-[#0B8F4D] md:text-[30px]">
          Donation Confirmed!
        </h1>
        <p className="mt-2 text-lg text-[#2D2D2D]">
          Thankyou for your support!
        </p>
      </div>

      <div className="mt-5 rounded-[16px] border border-[#B9CEFF] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)] md:p-6">
        <h2 className="text-[20px] font-medium text-[#2EABFC] md:text-[22px]">
          Donation Details
        </h2>

        <div className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {detailRows.map(item => (
            <div key={item.label} className="flex min-w-0 items-start gap-3">
              <item.icon className="mt-1 h-5 w-5 text-[#4B5563]" />
              <div className="min-w-0">
                <p
                  className={`break-words text-[18px] font-medium leading-[1.3] text-[#2D2D2D] md:text-[22px] ${item.valueClassName || ''} ${item.compact ? 'text-[16px] md:text-[18px]' : ''
                    }`}
                  title={item.value}
                >
                  {item.compact ? truncateValue(item.value, 42) : item.value}
                </p>
                <p className="mt-1 text-sm text-[#777777]">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 h-px bg-[#E5E7EB]" />

        <div>
          <h3 className="text-[24px] font-medium text-[#2D2D2D]">
            What happens next?
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#666666]">
            <li>A confirmation email has been sent to your email address</li>
            <li>Your payment receipt is available for download</li>
            <li>You can track this donation in your donation history</li>
            <li>The campaign creator has been notified of your support</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => downloadReceipt(receiptDonation)}
            className="h-[44px] rounded-full border-[#D7DDE5] px-5 text-[#666666] hover:bg-[#F5F7FA]"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/dashboard/discover/${data.campaign.id}`)
            }
            className="h-[44px] rounded-full border-[#D7DDE5] px-5 text-[#666666] hover:bg-[#F5F7FA]"
          >
            <Eye className="h-4 w-4" />
            View Campaign Details
          </Button>
        </div>
      </div>
    </div>
  )
}
