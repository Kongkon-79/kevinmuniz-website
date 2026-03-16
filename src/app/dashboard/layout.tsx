import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { authOptions } from "@/lib/auth"
import DashboardHeader from '@/components/dashboard/Header'
import NotificationProvider from '@/components/providers/NotificationProvider'

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-[#FFFFFF] md:overflow-hidden">
            <NotificationProvider>
                <DashboardSidebar />
                <div className="bg-[linear-gradient(180deg,#F4FBFF_0%,#EEF9FF_100%)] md:ml-[320px]">
                    <div className="sticky top-0 z-20 bg-white md:fixed md:left-[320px] md:right-0 md:top-0">
                        <DashboardHeader />
                    </div>
                    <main className="px-4 pb-6 md:h-screen md:overflow-y-auto md:px-6 md:pt-[92px]">
                        {children}
                    </main>
                </div>
            </NotificationProvider>
        </div>
    )
}

export default DashboardLayout
