'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchMyCampaigns } from './api'
import CampaignCard from './_components/CampaignCard'
import CampaignCardSkeleton from './_components/CampaignCardSkeleton'

type StatusFilter =
  | 'all'
  | 'active'
  | 'inactive'
  | 'pending'
  | 'accepted'
  | 'rejected'

export default function MyCampaignsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filters = useMemo(() => {
    if (statusFilter === 'active' || statusFilter === 'inactive') {
      return { activeStatus: statusFilter, search }
    }

    if (
      statusFilter === 'pending' ||
      statusFilter === 'accepted' ||
      statusFilter === 'rejected'
    ) {
      return { approvalStatus: statusFilter, search }
    }

    return { search }
  }, [search, statusFilter])

  const {
    data: campaignsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      'my-campaigns',
      page,
      search,
      filters.approvalStatus,
      filters.activeStatus,
    ],
    queryFn: () => fetchMyCampaigns(token, page, filters),
    enabled: !!token,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load campaigns.')
    }
  }, [isError])

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#2D2D2D]">
            My Campaigns
          </h1>
          <p className="mt-1 text-sm text-[#9AA0A6]">
            Manage all your fundraising campaigns
          </p>
        </div>

        <Button
          type="button"
          onClick={() => router.push('/dashboard/my-campaigns/create')}
          className="h-[42px] rounded-full bg-[#8C5CFF] px-5 text-sm font-medium text-white hover:bg-[#7A4EF2]"
        >
          Create New Campaign
        </Button>
      </div>

      <div className="mt-5 rounded-[12px] bg-white p-3 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA0A6]" />
            <Input
              value={search}
              onChange={event => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search Campaigns..."
              className="h-[42px] rounded-[10px] border-[#EEF1F5] bg-[#FBFBFB] pl-10 text-sm"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={value => {
              setStatusFilter(value as StatusFilter)
              setPage(1)
            }}
          >
            <SelectTrigger className="h-[42px] w-full rounded-[10px] border-[#EEF1F5] bg-[#FBFBFB] text-sm lg:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CampaignCardSkeleton key={index} />
            ))
          : campaignsResponse?.data.map(campaign => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
      </div>

      {!isLoading && !campaignsResponse?.data.length && (
        <div className="mt-4 rounded-[12px] bg-white p-10 text-center text-sm text-[#777777] shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
          No campaigns found.
        </div>
      )}
    </div>
  )
}
