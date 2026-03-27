'use client'

import { CalendarDays, Gift, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DiscoverCampaignReward } from '../types'

interface RewardsSectionProps {
  rewards: DiscoverCampaignReward[]
  onSelectReward: (reward: DiscoverCampaignReward | null) => void
}

const formatDeliveryDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

export default function RewardsSection({
  rewards,
  onSelectReward,
}: RewardsSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#111827]">Choose Your Reward</h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          Select a reward tier or continue with a direct contribution.
        </p>
      </div>

      <div className="rounded-[24px] border border-dashed border-[#A9D9FF] bg-[#F3FCFF] p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2EABFC]">
              <Sparkles className="h-3.5 w-3.5" />
              Flexible Support
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E]">
              Donate Without a Reward
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-[#6B7280]">
              Support this campaign directly without receiving a reward.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => onSelectReward(null)}
            className="h-11 rounded-full border-[#2EABFC] px-5 font-semibold text-[#2EABFC] hover:bg-[#EAF6FF]"
          >
            Continue Without Reward
          </Button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {rewards.map(reward => {
          const isSoldOut = !reward.isAvailable

          return (
            <article
              key={reward._id}
              className="rounded-[24px] border border-[#E0F2FE] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A2E]">
                    {reward.title}
                  </h3>
                  <div className="mt-3 inline-flex rounded-full bg-[#2EABFC] px-3 py-1 text-xs font-semibold text-white">
                    Donate ${reward.price.toFixed(0)} or more
                  </div>
                </div>

                {reward.quantityLeft !== null ? (
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      isSoldOut
                        ? 'bg-[#F3F4F6] text-[#6B7280]'
                        : 'bg-[#F3EEFF] text-[#8C5CFF]'
                    }`}
                  >
                    {isSoldOut ? 'Sold Out' : `${reward.quantityLeft} left`}
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-[#6B7280]">
                {reward.description}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#6B7280]">
                <CalendarDays className="h-4 w-4 text-[#8C5CFF]" />
                Estimated delivery: {formatDeliveryDate(reward.estimatedDeliveryDate)}
              </div>

              <Button
                type="button"
                disabled={isSoldOut}
                onClick={() => onSelectReward(reward)}
                className="mt-6 h-12 w-full rounded-full bg-[#2EABFC] font-semibold text-white hover:bg-[#2396DF] disabled:bg-[#D1D5DB] disabled:text-[#6B7280]"
              >
                <Gift className="h-4 w-4" />
                {isSoldOut ? 'Sold Out' : 'Select this Reward'}
              </Button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
