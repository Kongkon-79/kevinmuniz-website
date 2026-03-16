import { Skeleton } from '@/components/ui/skeleton'

export default function DonationCardSkeleton() {
  return (
    <div className="rounded-[16px] border border-[#D7E8FF] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <Skeleton className="h-7 w-24 rounded-full" />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="mt-5 h-px w-full" />
      <div className="mt-5 space-y-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-44" />
      </div>
      <Skeleton className="mt-5 h-px w-full" />
      <div className="mt-5 space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="mt-5 h-px w-full" />
      <div className="mt-5 flex flex-wrap gap-3">
        <Skeleton className="h-11 w-40 rounded-full" />
        <Skeleton className="h-11 w-44 rounded-full" />
        <Skeleton className="h-11 w-40 rounded-full" />
      </div>
    </div>
  )
}
