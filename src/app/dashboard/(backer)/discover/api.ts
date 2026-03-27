import axios from 'axios'
import type {
  DiscoverCategoryListResponse,
  CreateDonationSessionResponse,
  DiscoverCampaignDetailResponse,
  DiscoverCampaignsResponse,
  DonationConfirmation,
} from './types'

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

export const fetchActiveCampaigns = async (
  token: string,
  page: number,
  search?: string,
  categoryIds?: string[],
): Promise<DiscoverCampaignsResponse> => {
  const response = await axios.get<{ data: DiscoverCampaignsResponse }>(
    `${API_URL}/campaign`,
    {
      params: {
        approvalStatus: 'accepted',
        page,
        limit: 10,
        search,
        categoryIds: categoryIds?.length ? categoryIds.join(',') : undefined,
      },
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const fetchDiscoverCategories = async (
  token: string,
): Promise<DiscoverCategoryListResponse> => {
  const response = await axios.get<{ data: DiscoverCategoryListResponse }>(
    `${API_URL}/category/get-all-categories`,
    {
      params: {
        page: 1,
        limit: 100,
      },
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const fetchDiscoverCampaignById = async (
  token: string,
  campaignId: string,
): Promise<DiscoverCampaignDetailResponse> => {
  const response = await axios.get<{ data: DiscoverCampaignDetailResponse }>(
    `${API_URL}/campaign/${campaignId}`,
    {
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const submitRepresentation = async (
  token: string,
  campaignId: string,
  payload: {
    firstName: string
    lastName: string
    productionCompany: string
    imdbPageLink: string
    cv: File
  },
): Promise<void> => {
  const formData = new FormData()
  formData.append('firstName', payload.firstName)
  formData.append('lastName', payload.lastName)
  formData.append('productionCompany', payload.productionCompany)
  formData.append('imdbPageLink', payload.imdbPageLink)
  formData.append('cv', payload.cv)

  await axios.post(`${API_URL}/representation/${campaignId}`, formData, {
    headers: {
      ...getAuthHeaders(token),
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const createDonationSession = async (
  token: string,
  campaignId: string,
  amount: number,
  rewardId?: string | null,
): Promise<CreateDonationSessionResponse> => {
  const response = await axios.post<{ data: CreateDonationSessionResponse }>(
    `${API_URL}/donation/create-donation-session`,
    {
      campaignId,
      amount,
      rewardId: rewardId || null,
    },
    {
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const fetchDonationConfirmation = async (
  token: string,
  sessionId: string,
): Promise<DonationConfirmation> => {
  const response = await axios.get<{ data: DonationConfirmation }>(
    `${API_URL}/donation/confirmation`,
    {
      params: {
        session_id: sessionId,
      },
      headers: getAuthHeaders(token),
    },
  )

  return response.data.data
}

export const createDonationReward = async (
  token: string,
  donationId: string,
  rewardId: string | null,
): Promise<void> => {
  await axios.post(
    `${API_URL}/donation-rewards`,
    {
      donationId,
      rewardId,
    },
    {
      headers: getAuthHeaders(token),
    },
  )
}

export const trackCampaign = async (
  token: string,
  campaignId: string,
): Promise<{ campaignId: string; isTracked: boolean }> => {
  const response = await axios.post<{
    data: { campaignId: string; isTracked: boolean }
  }>(`${API_URL}/campaign-tracking/${campaignId}`, null, {
    headers: getAuthHeaders(token),
  })

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
