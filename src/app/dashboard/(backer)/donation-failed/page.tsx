'use client'

import { ArrowLeft, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DonationFailedPage() {
  const router = useRouter()

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <button
        type="button"
        onClick={() => router.push('/dashboard/discover')}
        className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#2D2D2D] transition-colors hover:bg-[#FDECEC] hover:text-[#DC2626]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="mx-auto max-w-[420px] rounded-[20px] border border-[#FCA5A5] bg-[#FEF2F2] px-6 py-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#FCA5A5] bg-white text-[#DC2626]">
          <XCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold text-[#DC2626]">
          Payment Failed
        </h1>
        <p className="mt-2 text-lg text-[#2D2D2D]">
          Your donation could not be processed.
        </p>
      </div>

      <div className="mt-5 rounded-[16px] border border-[#FECACA] bg-white p-6 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <h2 className="text-[24px] font-medium text-[#2D2D2D]">
          What went wrong?
        </h2>

        <ul className="mt-4 space-y-3 text-sm text-[#666666]">
          <li>Your payment was declined or cancelled</li>
          <li>No charges have been made to your account</li>
          <li>Your card information has been kept secure</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => router.push('/dashboard/discover')}
            className="h-[44px] rounded-full bg-[#2EABFC] px-6 text-white hover:bg-[#2396DF]"
          >
            Try Again
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/my-donations')}
            className="h-[44px] rounded-full border-[#D7DDE5] px-6 text-[#666666] hover:bg-[#F5F7FA]"
          >
            Go to My Donations
          </Button>
        </div>
      </div>
    </div>
  )
}
