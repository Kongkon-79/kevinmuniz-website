import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import CreatorOverview from '../../(creator)/dashboard-overview/_components/CreatorOverview'

export default async function DashboardOverview() {
    const session = await getServerSession(authOptions)
    const role = session?.user?.role

    if (role !== 'CREATOR') {
        redirect('/dashboard/discover')
    }

    return (
        <div className="min-h-full bg-gray-50">
            <CreatorOverview />
        </div>
    )
}
