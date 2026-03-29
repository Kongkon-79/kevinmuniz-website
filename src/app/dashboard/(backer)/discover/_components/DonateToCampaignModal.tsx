'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  createDonationSession,
  getErrorMessage,
} from '../api'
import {
  donationSchema,
  type DonationForm,
  type DonationFormInput,
} from '../schema'
import type { DiscoverCampaignReward } from '../types'

interface DonateToCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onChangeReward: () => void
  selectedReward: DiscoverCampaignReward | null
  campaign: {
    _id: string
    title: string
    shortDescription: string
  } | null
}

export default function DonateToCampaignModal({
  isOpen,
  onClose,
  onChangeReward,
  selectedReward,
  campaign,
}: DonateToCampaignModalProps) {
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''

  const form = useForm<DonationFormInput, unknown, DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1,
      isAnonymous: false,
    },
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset({ amount: 1, isAnonymous: false })
      return
    }

    form.reset({
      amount: selectedReward ? selectedReward.price : ('' as never),
      isAnonymous: false,
    })
  }, [form, isOpen, selectedReward])

  const createDonationMutation = useMutation({
    mutationFn: (values: DonationForm) => {
      if (!campaign) {
        throw new Error('Campaign not found')
      }

      return createDonationSession(
        token,
        campaign._id,
        values.amount,
        selectedReward?._id || null,
        values.isAnonymous,
      )
    },
    onSuccess: data => {
      window.location.href = data.url
    },
    onError: error => {
      toast.error(getErrorMessage(error) || 'Failed to initiate payment')
    },
  })

  if (!campaign) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-[480px] rounded-[20px] border-none bg-white p-0 shadow-xl">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-5 space-y-1 text-left">
            <DialogTitle className="text-[24px] font-semibold text-[#2D2D2D]">
              Donate to Campaign
            </DialogTitle>
            <div>
              <p className="text-sm font-medium text-[#2D2D2D]">
                {campaign.title}
              </p>
              <p className="line-clamp-1 text-sm text-[#777777]">
                {campaign.shortDescription}
              </p>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(values =>
                createDonationMutation.mutate(values),
              )}
              className="space-y-5"
            >
              <div className="rounded-[16px] border border-[#D7E8FF] bg-[#F8FBFF] p-4">
                {selectedReward ? (
                  <>
                    <p className="text-sm font-semibold text-[#1A1A2E]">
                      Selected reward
                    </p>
                    <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#2D2D2D]">
                          {selectedReward.title}
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          Minimum pledge ${selectedReward.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose()
                          onChangeReward()
                        }}
                        className="w-fit text-sm font-medium text-[#2EABFC] underline underline-offset-4"
                      >
                        Change reward
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-[#6B7280]">
                      Donating without reward
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onChangeReward()
                      }}
                      className="text-sm font-medium text-[#2EABFC] underline underline-offset-4"
                    >
                      Change reward
                    </button>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem className="rounded-[16px] border border-[#E8EDF3] bg-[#FBFBFB] p-4">
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={checked =>
                            field.onChange(Boolean(checked))
                          }
                          className="mt-0.5 border-[#B9CEFF] data-[state=checked]:border-[#2EABFC] data-[state=checked]:bg-[#2EABFC]"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                          Donate anonymously
                        </FormLabel>
                        <p className="text-xs text-[#6B7280]">
                          Your details stay hidden from campaign-facing donor lists.
                        </p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                      Donation Amount
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#666666]">
                          $
                        </span>
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          inputMode="decimal"
                          value={
                            typeof field.value === 'string' ||
                            typeof field.value === 'number'
                              ? field.value
                              : ''
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          onChange={event => {
                            const nextValue = event.target.value
                            field.onChange(nextValue === '' ? '' : nextValue)
                          }}
                          placeholder="Enter amount"
                          className="h-[48px] rounded-[12px] border-[#E8EDF3] bg-[#FBFBFB] pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={createDonationMutation.isPending}
                className="h-[48px] w-full rounded-full bg-[#2EABFC] text-white hover:bg-[#2396DF]"
              >
                {createDonationMutation.isPending
                  ? 'Processing...'
                  : 'Complete Donation'}
              </Button>

              <p className="text-center text-xs text-[#999999]">
                Secure payment powered by Stripe. Your payment information is
                encrypted.
              </p>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
