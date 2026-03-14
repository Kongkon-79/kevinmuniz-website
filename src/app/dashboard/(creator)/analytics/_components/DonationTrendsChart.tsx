'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import type { DonationTrends } from '../types'

interface DonationTrendsChartProps {
  trends: DonationTrends | undefined
  isLoading: boolean
}

const monthOrder: Array<keyof DonationTrends> = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function DonationTrendsChart({
  trends,
  isLoading,
}: DonationTrendsChartProps) {
  if (isLoading) {
    return (
      <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="mt-6 h-[250px] w-full rounded-[12px]" />
      </div>
    )
  }

  const chartData = monthOrder.map(month => ({
    month,
    amount: trends?.[month] ?? 0,
  }))

  return (
    <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <h2 className="text-[18px] font-medium text-[#2D2D2D]">
        Donation Trends
      </h2>

      <div className="mt-5 h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#D9E2F0" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
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
              contentStyle={{
                border: 'none',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{
                r: 3,
                strokeWidth: 1,
                stroke: '#3B82F6',
                fill: '#FFFFFF',
              }}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: '#3B82F6',
                fill: '#FFFFFF',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
