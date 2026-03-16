'use client'

import { CalendarDays, Download, Eye, IdCard, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { downloadReceipt } from '@/utils/downloadReceipt'
import RequestRefundModal from './RequestRefundModal'
import RefundStatusTimeline from './RefundStatusTimeline'
import type { Donation } from '../types'

interface DonationCardProps {
  donation: Donation
  isRefundSubmitting: boolean
  onRequestRefund: (donationId: string, reason: string) => Promise<void>
}

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

const truncateSessionId = (value: string) => {
  if (value.length <= 22) return value
  return `${value.slice(0, 10)}...${value.slice(-8)}`
}

const getStatusConfig = (donation: Donation) => {
  if (donation.refundStatus === 'pending' || donation.refundStatus === 'review') {
    return {
      label: 'Under Review',
      className: 'border-[#93C5FD] bg-[#EFF6FF] text-[#2563EB]',
    }
  }

  if (
    donation.paymentStatus === 'paid' &&
    (donation.refundStatus === null || donation.refundStatus === 'refunded')
  ) {
    return {
      label: 'Completed',
      className: 'border-[#79D89B] bg-[#E9FFF3] text-[#0E9F6E]',
    }
  }

  return {
    label: 'Pending',
    className: 'border-[#FCD34D] bg-[#FFFBEB] text-[#D97706]',
  }
}

export default function DonationCard({
  donation,
  isRefundSubmitting,
  onRequestRefund,
}: DonationCardProps) {
  const router = useRouter()
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)
  const statusConfig = getStatusConfig(donation)
  const canRequestRefund =
    donation.refundStatus === null && donation.paymentStatus === 'paid'

  return (
    <>
      <div className="rounded-[16px] border border-[#D7E8FF] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-[24px] font-medium text-[#2D2D2D]">
              {donation.campaignId.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#777777]">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDateTime(donation.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <IdCard className="h-3.5 w-3.5" />
                {truncateSessionId(donation.stripeSessionId)}
              </span>
            </div>
          </div>
          <p className="text-right text-[28px] font-medium text-[#2D2D2D]">
            ${donation.amount.toFixed(2)}
          </p>
        </div>

        <div className="my-5 h-px bg-[#EDF2F7]" />

        <div>
          <p className="text-[20px] font-medium text-[#2D2D2D]">Payment Method</p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#666666]">
            <ShieldCheck className="h-4 w-4" />
            Stripe - Visa ****4242
          </p>
        </div>

        <div className="my-5 h-px bg-[#EDF2F7]" />

        <div>
          <p className="text-[20px] font-medium text-[#2D2D2D]">
            Transaction Date
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#666666]">
            <CalendarDays className="h-4 w-4" />
            {formatDateTime(donation.createdAt)}
          </p>
        </div>

        {donation.refundStatus !== null && (
          <>
            <div className="my-5 h-px bg-[#EDF2F7]" />

            <div>
              <p className="text-[20px] font-medium text-[#2D2D2D]">
                Refund Status
              </p>
              <div className="mt-4">
                <RefundStatusTimeline
                  refundStatus={donation.refundStatus}
                  refundRequestedAt={donation.refundRequestedAt}
                />
              </div>
              <div className="mt-2 rounded-[12px] bg-[#F3F4F6] p-4 text-sm text-[#666666]">
                <span className="font-medium text-[#2D2D2D]">Refund Reason:</span>{' '}
                {donation.refundReason || 'Not provided'}
              </div>
            </div>
          </>
        )}

        <div className="my-5 h-px bg-[#EDF2F7]" />

        <div className="flex flex-wrap gap-3">
          {canRequestRefund && (
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadReceipt(donation)}
              className="h-[44px] rounded-full border-[#D7DDE5] px-5 text-[#666666] hover:bg-[#F5F7FA]"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/discover/${donation.campaignId._id}`)}
            className="h-[44px] rounded-full border-[#D7DDE5] px-5 text-[#666666] hover:bg-[#F5F7FA]"
          >
            <Eye className="h-4 w-4" />
            View Campaign Details
          </Button>

          {!canRequestRefund && (
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadReceipt(donation)}
              className="h-[44px] rounded-full border-[#D7DDE5] px-5 text-[#666666] hover:bg-[#F5F7FA]"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
          )}

          {canRequestRefund && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRefundModalOpen(true)}
              className="h-[44px] rounded-full border-[#FDBA74] px-5 text-[#F97316] hover:bg-[#FFF7ED] hover:text-[#EA580C]"
            >
              Request Refund
            </Button>
          )}
        </div>
      </div>

      <RequestRefundModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        donation={donation}
        isSubmitting={isRefundSubmitting}
        onSubmit={onRequestRefund}
      />
    </>
  )
}
