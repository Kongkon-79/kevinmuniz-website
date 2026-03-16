'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { DiscoverCampaign } from '../types'

interface CampaignCardProps {
  campaign: DiscoverCampaign
  onProduce: (campaignId: string) => void
}

const getActiveBadgeStyles = (status: string) =>
  status === 'active'
    ? 'border border-[#79D89B] bg-[#E9FFF3] text-[#0E9F6E]'
    : 'border border-[#D1D5DB] bg-[#F3F4F6] text-[#6B7280]'

export default function CampaignCard({
  campaign,
  onProduce,
}: CampaignCardProps) {
  const router = useRouter()
  const activeStatusLabel =
    campaign.activeStatus.charAt(0).toUpperCase() + campaign.activeStatus.slice(1)

  return (
    <div className="overflow-hidden rounded-[14px] bg-white p-3 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <div className="relative h-[180px] overflow-hidden rounded-[12px]">
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
          <h3 className="text-[16px] font-medium text-[#2D2D2D]">
            {campaign.title}
          </h3>
          <span
            className={`inline-flex shrink-0 rounded-full px-3 py-1 text-[10px] font-medium capitalize ${getActiveBadgeStyles(
              campaign.activeStatus,
            )}`}
          >
            {activeStatusLabel}
          </span>
        </div>

        <p className="line-clamp-2 text-xs leading-5 text-[#777777]">
          {campaign.shortDescription}
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#2D2D2D]">
            ${campaign.totalRaised?.toLocaleString() ?? 0} raised
          </p>
          <span className="inline-flex rounded-full border border-[#E5E7EB] px-3 py-1 text-[10px] text-[#666666]">
            {campaign.category.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/discover/${campaign._id}`)}
            className="h-[42px] rounded-full border-[#8C5CFF] text-sm font-medium text-[#8C5CFF] hover:bg-[#F6F0FF]"
          >
            View Details
          </Button>
          <Button
            type="button"
            disabled={campaign.activeStatus === 'active'}
            onClick={() => onProduce(campaign._id)}
            className="h-[42px] rounded-full bg-gradient-to-r from-[#8C5CFF] to-[#7C5CFF] text-sm font-medium text-white hover:from-[#7F51F5] hover:to-[#744CF2] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Produce this project
          </Button>
        </div>
      </div>
    </div>
  )
}
