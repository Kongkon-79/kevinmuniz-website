import axios from 'axios'
import type { AnalyticsDashboard } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

export const fetchAnalyticsDashboard = async (
  token: string,
  year: number,
): Promise<AnalyticsDashboard> => {
  const response = await axios.get(`${API_URL}/campaign-analytics/dashboard`, {
    params: { year },
    headers: getAuthHeaders(token),
  })

  return response.data.data || response.data
}
