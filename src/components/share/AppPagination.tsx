import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

interface AppPaginationProps {
  currentPage: number
  totalPages: number
  totalData: number
  onPageChange: (page: number) => void
}

export function AppPagination({
  currentPage,
  totalPages,
  totalData,
  onPageChange,
}: AppPaginationProps) {
  const getPageNumbers = () => {
    const pages: Array<number | string> = []
    const showMax = 5

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis-1')

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i += 1) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push('ellipsis-2')
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }

    return pages
  }

  const startIdx = (currentPage - 1) * 10 + 1
  const endIdx = Math.min(currentPage * 10, totalData)

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
      <p className="text-sm text-[#5C5C5C]">
        Showing {totalData === 0 ? 0 : startIdx} to {endIdx} of {totalData}{' '}
        results
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event: React.MouseEvent) => {
                event.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={cn(
                'h-10 w-10 border border-[#8C5CFF]/20 text-[#8C5CFF] hover:bg-[#8C5CFF]/10',
                currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer',
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === 'number' ? (
                <PaginationLink
                  href="#"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    onPageChange(page)
                  }}
                  isActive={currentPage === page}
                  className={cn(
                    'h-10 w-10 cursor-pointer border border-[#8C5CFF]/20 text-[#8C5CFF] transition-colors hover:bg-[#8C5CFF]/10',
                    currentPage === page &&
                      'border-[#8C5CFF] bg-[#8C5CFF] text-white hover:bg-[#8C5CFF]',
                  )}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis className="h-10 w-10 rounded-md border border-[#8C5CFF]/20 text-[#8C5CFF]" />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event: React.MouseEvent) => {
                event.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={cn(
                'h-10 w-10 border border-[#8C5CFF]/20 text-[#8C5CFF] hover:bg-[#8C5CFF]/10',
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer',
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
