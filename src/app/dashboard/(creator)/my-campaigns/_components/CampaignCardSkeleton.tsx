import { Skeleton } from "@/components/ui/skeleton";

export default function CampaignCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white p-3 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <Skeleton className="h-[180px] w-full rounded-[12px]" />
      <div className="space-y-3 px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-[42px] w-full rounded-full" />
      </div>
    </div>
  );
}
