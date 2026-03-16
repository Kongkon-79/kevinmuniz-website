'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { AppPagination } from '@/components/share/AppPagination'
import DonationCard from './_components/DonationCard'
import DonationCardSkeleton from './_components/DonationCardSkeleton'
import { fetchMyDonations, getErrorMessage, requestRefund } from './api'

export default function MyDonationsPage() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['my-donations', page],
    queryFn: () => fetchMyDonations(token, page, 10),
    enabled: !!token,
  })

  const requestRefundMutation = useMutation({
    mutationFn: ({
      donationId,
      reason,
    }: {
      donationId: string
      reason: string
    }) => requestRefund(token, donationId, reason),
    onSuccess: () => {
      toast.success('Refund request submitted')
      queryClient.invalidateQueries({ queryKey: ['my-donations'] })
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error))
    },
  })

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <div>
        <h1 className="text-[24px] font-semibold text-[#2D2D2D]">
          Donation History
        </h1>
        <p className="mt-1 text-sm text-[#9AA0A6]">
          View and manage all your campaign contributions
        </p>
      </div>

      <div className="mt-5 space-y-4 rounded-[16px] border border-[#B9CEFF] bg-white/50 p-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <DonationCardSkeleton key={index} />
            ))
          : data?.donations.map(donation => (
              <DonationCard
                key={donation._id}
                donation={donation}
                isRefundSubmitting={requestRefundMutation.isPending}
                onRequestRefund={(donationId, reason) =>
                  requestRefundMutation.mutateAsync({ donationId, reason })
                }
              />
            ))}

        {!isLoading && !data?.donations.length && (
          <div className="rounded-[16px] border border-[#D7E8FF] bg-white p-10 text-center text-sm text-[#777777]">
            No donations found.
          </div>
        )}
      </div>

      {data?.pagination && (
        <div className="mt-4">
          <AppPagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            totalData={data.pagination.totalData}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
