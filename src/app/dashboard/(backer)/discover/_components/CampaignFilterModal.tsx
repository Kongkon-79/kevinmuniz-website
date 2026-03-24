'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DiscoverCategoryOption } from '../types'

interface CampaignFilterModalProps {
  isOpen: boolean
  onClose: () => void
  categories: DiscoverCategoryOption[]
  selectedCategoryIds: string[]
  onApply: (categoryIds: string[]) => void
}

export default function CampaignFilterModal({
  isOpen,
  onClose,
  categories,
  selectedCategoryIds,
  onApply,
}: CampaignFilterModalProps) {
  const [draftCategoryIds, setDraftCategoryIds] = useState<string[]>(
    selectedCategoryIds,
  )

  useEffect(() => {
    if (isOpen) {
      setDraftCategoryIds(selectedCategoryIds)
    }
  }, [isOpen, selectedCategoryIds])

  const toggleCategory = (categoryId: string) => {
    setDraftCategoryIds(current =>
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId],
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-[520px] rounded-[20px] border-none bg-white p-0 shadow-xl">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6 space-y-1 text-left">
            <DialogTitle className="text-[24px] font-semibold text-[#2D2D2D]">
              Filter Campaigns
            </DialogTitle>
            <p className="text-sm text-[#777777]">
              Select one or more categories to narrow down discover results.
            </p>
          </DialogHeader>

          {!!draftCategoryIds.length && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#9AA0A6]">
                Selected
              </span>
              <span className="rounded-full bg-[#F3FAFF] px-3 py-1 text-xs font-medium text-[#2EABFC]">
                {draftCategoryIds.length} category
                {draftCategoryIds.length > 1 ? 'ies' : 'y'}
              </span>
            </div>
          )}

          <div className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
            {categories.map(category => (
              <label
                key={category._id}
                className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#E8EDF3] bg-[#FBFBFB] px-4 py-3 transition-colors hover:border-[#B9CEFF]"
              >
                <Checkbox
                  checked={draftCategoryIds.includes(category._id)}
                  onCheckedChange={() => toggleCategory(category._id)}
                />
                <span className="text-sm font-medium text-[#2D2D2D]">
                  {category.name}
                </span>
              </label>
            ))}

            {!categories.length && (
              <div className="rounded-[12px] bg-[#F8FAFC] p-4 text-sm text-[#777777]">
                No categories found.
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDraftCategoryIds([])}
              className="h-[44px] rounded-full border-[#D7DDE5] px-6 text-[#666666] hover:bg-[#F5F7FA]"
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={() => {
                onApply(draftCategoryIds)
                onClose()
              }}
              className="h-[44px] rounded-full bg-[#2EABFC] px-6 text-white hover:bg-[#2396DF]"
            >
              Search
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
