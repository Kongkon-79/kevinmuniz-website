import axios from 'axios'
import type { TrackedCampaignsResponse } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string; error?: string }>(error)) {
    return error.response?.data?.error || error.response?.data?.message || error.message
  }

  return error instanceof Error ? error.message : 'Something went wrong'
}

export const fetchTrackedCampaigns = async (
  token: string,
  page: number,
  limit: number,
): Promise<TrackedCampaignsResponse> => {
  const response = await axios.get<{ data: TrackedCampaignsResponse }>(
    `${API_URL}/campaign-tracking/my-tracked-campaigns`,
    {
      params: { page, limit },
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const untrackCampaign = async (
  token: string,
  campaignId: string,
): Promise<{ campaignId: string; isTracked: boolean }> => {
  const response = await axios.delete<{
    data: { campaignId: string; isTracked: boolean }
  }>(`${API_URL}/campaign-tracking/${campaignId}`, {
    headers: getAuthHeaders(token),
  })

  return response.data.data
}
