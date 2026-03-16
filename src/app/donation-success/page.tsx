import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { authOptions } from '@/lib/auth'
import DonationSuccessContent from '@/app/dashboard/(backer)/donation-success/_components/DonationSuccessContent'

export default async function DonationSuccessPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] md:overflow-hidden">
      <DashboardSidebar />
      <div className="bg-[linear-gradient(180deg,#F4FBFF_0%,#EEF9FF_100%)] md:ml-[320px]">
        <div className="sticky top-0 z-20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FDFF_100%)] md:fixed md:left-[320px] md:right-0 md:top-0">
          <DashboardHeader />
        </div>
        <main className="px-4 pb-6 md:h-screen md:overflow-y-auto md:px-6 md:pt-[92px]">
          <DonationSuccessContent />
        </main>
      </div>
    </div>
  )
}
