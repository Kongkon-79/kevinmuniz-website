'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface CampaignItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  expiresIn: string
}

interface CampaignCardProps {
  campaign: CampaignItem
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const shouldTruncate = campaign.description.length > 140
  const shortDescription = shouldTruncate
    ? `${campaign.description.slice(0, 140)}...`
    : campaign.description

  const handleReadMore = () => {
    const role = session?.user?.role

    if (status !== 'authenticated' || role !== 'USER') {
      toast.info('Please sign in as a backer to explore featured campaigns.')
      router.push('/login?callbackUrl=/dashboard/discover')
      return
    }

    router.push('/dashboard/discover')
  }

  return (
    <Card className="group h-full overflow-hidden rounded-[26px] border border-[#DDEEFE] bg-white/90 shadow-[0_18px_50px_rgba(46,171,252,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(140,92,255,0.18)]">
      <div className="relative h-[220px] w-full overflow-hidden rounded-t-[26px]">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-[#6F4BFF] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg">
          {campaign.expiresIn}
        </div>
      </div>

      <CardContent className="flex h-[300px] flex-col p-6 pb-8">
        <h3 className="line-clamp-2 text-[28px] font-semibold leading-tight text-slate-900 md:text-[30px]">
          {campaign.title}
        </h3>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#7C6CFF]">
          {campaign.category}
        </p>

        <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
          {shortDescription}
        </p>

        <Button
          type="button"
          variant="link"
          className="-mt-.5 h-auto w-fit p-0 text-sm font-semibold text-[#2EABFC] hover:text-[#1B8FE0]"
          onClick={handleReadMore}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  )
}
