'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import type { TopCampaign } from '../types'

interface TopCampaignsChartProps {
  campaigns: TopCampaign[]
  isLoading: boolean
}

const truncateTitle = (title?: string) => {
  if (!title) return ''
  if (title.length <= 15) {
    return title
  }

  return `${title.slice(0, 15)}...`
}

export default function TopCampaignsChart({
  campaigns,
  isLoading,
}: TopCampaignsChartProps) {
  if (isLoading) {
    return (
      <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="mt-6 h-[300px] w-full rounded-[12px]" />
      </div>
    )
  }

  const chartData =
    campaigns.length > 0
      ? campaigns.map(campaign => ({
        title: truncateTitle(campaign.title),
        totalRaised: campaign.totalRaised,
        fullTitle: campaign.title,
      }))
      : [{ title: 'No Campaigns', totalRaised: 0, fullTitle: 'No Campaigns' }]

  return (
    <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <h2 className="text-[18px] font-medium text-[#2D2D2D]">
        Top Performing Campaigns
      </h2>

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#D9E2F0" strokeDasharray="3 3" />
            <XAxis
              dataKey="title"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B95A7', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B95A7', fontSize: 12 }}
              tickFormatter={value => value.toLocaleString()}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label, payload) => {
                const item = payload?.[0]?.payload as
                  | { fullTitle?: string }
                  | undefined
                return item?.fullTitle || label
              }}
              contentStyle={{
                border: 'none',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
              }}
            />
            <Bar dataKey="totalRaised" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
