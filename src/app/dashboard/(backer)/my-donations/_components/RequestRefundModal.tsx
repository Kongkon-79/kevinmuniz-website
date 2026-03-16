'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { requestRefundSchema, type RequestRefundForm } from '../schema'
import type { Donation } from '../types'

interface RequestRefundModalProps {
  isOpen: boolean
  onClose: () => void
  donation: Donation | null
  isSubmitting: boolean
  onSubmit: (donationId: string, reason: string) => Promise<void>
}

const truncateTransactionId = (value: string) => {
  if (value.length <= 18) return value
  return `${value.slice(0, 8)}...${value.slice(-6)}`
}

export default function RequestRefundModal({
  isOpen,
  onClose,
  donation,
  isSubmitting,
  onSubmit,
}: RequestRefundModalProps) {
  const form = useForm<RequestRefundForm>({
    resolver: zodResolver(requestRefundSchema),
    defaultValues: {
      reason: '',
    },
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [form, isOpen])

  if (!donation) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-[520px] rounded-[20px] border-none bg-white p-0 shadow-xl">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-5 space-y-1 text-left">
            <DialogTitle className="text-[24px] font-semibold text-[#2D2D2D]">
              Request Refund
            </DialogTitle>
            <p className="text-sm text-[#777777]">
              Submit a refund request for your donation to{' '}
              {donation.campaignId.title}
            </p>
          </DialogHeader>

          <div className="rounded-[14px] bg-[#F5F7FA] p-4">
            <div className="flex items-start justify-between gap-4 py-1 text-sm text-[#2D2D2D]">
              <span>Campaign Name :</span>
              <span className="max-w-[230px] text-right font-medium">
                {donation.campaignId.title}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 py-1 text-sm text-[#2D2D2D]">
              <span>Amount :</span>
              <span className="font-semibold text-[#0E9F6E]">
                ${donation.amount}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 py-1 text-sm text-[#2D2D2D]">
              <span>Transaction ID :</span>
              <span className="max-w-[230px] text-right text-xs text-[#666666]">
                {truncateTransactionId(donation.stripeSessionId)}
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async values => {
                await onSubmit(donation._id, values.reason)
                onClose()
              })}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                      Reason for Refund
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please write the refund reason..."
                        className="min-h-[110px] rounded-[12px] border-[#E8EDF3] bg-[#FBFBFB] p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-[14px] border border-[#FDBA74] bg-[#FFF7ED] p-4 text-sm text-[#EA580C]">
                <p>• You&apos;ll receive email notifications about your refund status</p>
                <p>• Not all refund requests may be approved</p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-[46px] rounded-full border-[#D7DDE5] px-8 text-[#666666] hover:bg-[#F5F7FA]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[46px] rounded-full bg-[#2EABFC] px-8 text-white hover:bg-[#2396DF]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
