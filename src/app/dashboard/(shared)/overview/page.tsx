import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import CreatorOverview from '../../(creator)/dashboard-overview/_components/CreatorOverview'
import BackerOverview from '../../(backer)/dashboard-overview/_components/BackerOverview'

export default async function DashboardOverview() {
    const session = await getServerSession(authOptions)
    const role = session?.user?.role

    return (
        <div className="min-h-full bg-gray-50">
            {role === 'CREATOR' ? <CreatorOverview /> : <BackerOverview />}
        </div>
    )
}
