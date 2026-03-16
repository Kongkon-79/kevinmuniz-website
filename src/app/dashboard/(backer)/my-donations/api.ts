import axios from 'axios'
import type { DonationsResponse } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || error.message
  }

  return error instanceof Error ? error.message : 'Something went wrong'
}

export const fetchMyDonations = async (
  token: string,
  page: number,
  limit: number,
): Promise<DonationsResponse> => {
  const response = await axios.get<{ data: DonationsResponse }>(
    `${API_URL}/donation/my-donations`,
    {
      params: { page, limit },
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const requestRefund = async (
  token: string,
  donationId: string,
  reason: string,
): Promise<void> => {
  await axios.post(
    `${API_URL}/donation/${donationId}/request-refund`,
    { reason },
    {
      headers: getAuthHeaders(token),
    },
  )
}
