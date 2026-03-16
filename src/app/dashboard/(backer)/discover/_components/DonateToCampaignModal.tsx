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

interface DonateToCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  campaign: {
    _id: string
    title: string
    shortDescription: string
  } | null
}

export default function DonateToCampaignModal({
  isOpen,
  onClose,
  campaign,
}: DonateToCampaignModalProps) {
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''

  const form = useForm<DonationFormInput, unknown, DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1,
    },
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset({ amount: 1 })
    }
  }, [form, isOpen])

  const createDonationMutation = useMutation({
    mutationFn: (values: DonationForm) => {
      if (!campaign) {
        throw new Error('Campaign not found')
      }

      return createDonationSession(token, campaign._id, values.amount)
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
