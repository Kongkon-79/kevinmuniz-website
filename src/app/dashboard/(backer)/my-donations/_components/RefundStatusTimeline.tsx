import { CalendarDays } from 'lucide-react'
import type { RefundStatus } from '../types'

interface RefundStatusTimelineProps {
  refundStatus: RefundStatus
  refundRequestedAt: string | null
}

const formatDate = (value: string | null) => {
  if (!value) return 'date unavailable'

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface StepConfig {
  title: string
  description: string
  isActive: boolean
  isCompleted: boolean
}

export default function RefundStatusTimeline({
  refundStatus,
  refundRequestedAt,
}: RefundStatusTimelineProps) {
  const steps: StepConfig[] = [
    {
      title: 'Pending',
      description: `Request submitted on ${formatDate(refundRequestedAt)}`,
      isActive: true,
      isCompleted: true,
    },
    {
      title: 'Under Review',
      description: 'Being reviewed by our team',
      isActive: refundStatus === 'review' || refundStatus === 'refunded',
      isCompleted: refundStatus === 'review' || refundStatus === 'refunded',
    },
    {
      title: 'Completed',
      description: 'Funds will be returned to your account',
      isActive: refundStatus === 'refunded',
      isCompleted: refundStatus === 'refunded',
    },
  ]

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const nextStep = steps[index + 1]
        const isFinalStep = index === steps.length - 1
        const dotClassName = step.isCompleted
          ? step.title === 'Completed'
            ? 'border-[#0E9F6E] bg-[#0E9F6E]'
            : 'border-[#8C5CFF] bg-[#8C5CFF]'
          : 'border-[#D1D5DB] bg-white'

        const lineClassName =
          nextStep && nextStep.isActive ? 'bg-[#8C5CFF]' : 'bg-[#E5E7EB]'

        return (
          <div key={step.title} className="flex gap-3">
            <div className="flex w-5 flex-col items-center">
              <span
                className={`mt-1 block h-4 w-4 rounded-full border-[3px] ${dotClassName}`}
              />
              {!isFinalStep && (
                <span className={`mt-1 block h-10 w-[2px] ${lineClassName}`} />
              )}
            </div>
            <div className="pb-4">
              <p className="text-sm font-medium text-[#2D2D2D]">{step.title}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#777777]">
                <CalendarDays className="h-3 w-3" />
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
