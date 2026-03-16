'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Filter, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  fetchActiveCampaigns,
  fetchDiscoverCategories,
  getErrorMessage,
  submitRepresentation,
} from './api'
import CampaignCard from './_components/CampaignCard'
import CampaignCardSkeleton from './_components/CampaignCardSkeleton'
import CampaignFilterModal from './_components/CampaignFilterModal'
import ProduceProjectModal from './_components/ProduceProjectModal'
import type { ProduceProjectForm } from './schema'

export default function DiscoverPage() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const [search, setSearch] = useState('')
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  )
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSearchInteractive, setIsSearchInteractive] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['discover-campaigns', search, selectedCategoryIds],
    queryFn: () => fetchActiveCampaigns(token, 1, search, selectedCategoryIds),
    enabled: !!token,
  })

  const { data: categoriesResponse } = useQuery({
    queryKey: ['discover-categories'],
    queryFn: () => fetchDiscoverCategories(token),
    enabled: !!token,
  })

  const representationMutation = useMutation({
    mutationFn: ({
      campaignId,
      payload,
    }: {
      campaignId: string
      payload: ProduceProjectForm
    }) => submitRepresentation(token, campaignId, payload),
    onSuccess: () => {
      toast.success('Representation submitted successfully')
      setSelectedCampaignId(null)
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error))
    },
  })

  const handleProduceSubmit = (values: ProduceProjectForm, campaignId: string) => {
    representationMutation.mutate({
      campaignId,
      payload: values,
    })
  }

  const campaigns = data?.data ?? []

  return (
    <>
      <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
        <div>
          <h1 className="text-[24px] font-semibold text-[#2D2D2D]">
            Discover Campaigns
          </h1>
          <p className="mt-1 text-sm text-[#9AA0A6]">
            Discover fundraising campaigns
          </p>
        </div>

        <div className="mt-5 rounded-[12px] bg-white p-3 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                name="fake-search"
                autoComplete="username"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />
              <input
                type="password"
                name="fake-password"
                autoComplete="new-password"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA0A6]" />
              <Input
                value={search}
                onChange={event => setSearch(event.target.value)}
                onFocus={() => setIsSearchInteractive(true)}
                placeholder="Search Campaigns..."
                name="search_query"
                autoComplete="new-password"
                readOnly={!isSearchInteractive}
                data-form-type="other"
                className="h-[42px] rounded-[10px] border-[#EEF1F5] bg-[#FBFBFB] pl-10 text-sm"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFilterModalOpen(true)}
              className="h-[42px] rounded-[10px] border-[#D7DDE5] px-4 text-[#2D2D2D] hover:bg-[#F5F7FA]"
            >
              <Filter className="h-4 w-4" />
              Filter
              {!!selectedCategoryIds.length && (
                <span className="rounded-full bg-[#2EABFC] px-2 py-0.5 text-xs text-white">
                  {selectedCategoryIds.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CampaignCardSkeleton key={index} />
              ))
            : campaigns.map(campaign => (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign}
                  onProduce={setSelectedCampaignId}
                />
              ))}
        </div>

        {!isLoading && !campaigns.length && (
          <div className="mt-4 rounded-[12px] bg-white p-10 text-center text-sm text-[#777777] shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
            No active campaigns found.
          </div>
        )}
      </div>

      <ProduceProjectModal
        isOpen={!!selectedCampaignId}
        onClose={() => setSelectedCampaignId(null)}
        campaignId={selectedCampaignId || ''}
        isSubmitting={representationMutation.isPending}
        onSubmit={handleProduceSubmit}
      />

      <CampaignFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categories={categoriesResponse?.data ?? []}
        selectedCategoryIds={selectedCategoryIds}
        onApply={setSelectedCategoryIds}
      />
    </>
  )
}
