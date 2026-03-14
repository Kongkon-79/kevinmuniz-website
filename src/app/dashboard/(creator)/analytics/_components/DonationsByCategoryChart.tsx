'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { PieLabelRenderProps } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import type { CategoryDonation } from '../types'

interface DonationsByCategoryChartProps {
  data: CategoryDonation[]
  isLoading: boolean
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444']

type CategoryPieLabelProps = PieLabelRenderProps & {
  category?: string
  percentage?: number
}

const renderLabel = ({ category, percentage, x, y }: CategoryPieLabelProps) => {
  if (typeof x !== 'number' || typeof y !== 'number' || !category) {
    return null
  }

  return (
    <text x={x} y={y} fill="#6B7280" fontSize={12} textAnchor="middle">
      {`${category} ${percentage ?? 0}%`}
    </text>
  )
}

export default function DonationsByCategoryChart({
  data,
  isLoading,
}: DonationsByCategoryChartProps) {
  if (isLoading) {
    return (
      <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="mt-6 h-[300px] w-full rounded-[12px]" />
      </div>
    )
  }

  const chartData =
    data.length > 0
      ? data
      : [{ category: 'No Data', totalRaised: 1, percentage: 0 }]

  return (
    <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_14px_rgba(17,24,39,0.04)]">
      <h2 className="text-[18px] font-medium text-[#2D2D2D]">
        Donations by Category
      </h2>

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="totalRaised"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={86}
              labelLine
              label={renderLabel}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`${entry.category}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{
                border: 'none',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
