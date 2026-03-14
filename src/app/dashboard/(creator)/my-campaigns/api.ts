import axios from "axios";
import type {
  CategoryListResponse,
  CreatorCampaign,
  CreatorCampaignDetailResponse,
  CreatorCampaignsResponse,
} from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const fetchMyCampaigns = async (
  token: string,
  page: number,
  filters: { approvalStatus?: string; activeStatus?: string; search?: string }
): Promise<CreatorCampaignsResponse> => {
  const response = await axios.get(`${API_URL}/campaign`, {
    params: {
      page,
      limit: 100,
      approvalStatus: filters.approvalStatus,
      activeStatus: filters.activeStatus,
      search: filters.search,
    },
    headers: getAuthHeaders(token),
  });

  return response.data.data;
};

export const fetchCampaignById = async (
  token: string,
  id: string
): Promise<CreatorCampaignDetailResponse> => {
  const response = await axios.get(`${API_URL}/campaign/${id}`, {
    headers: getAuthHeaders(token),
  });

  return response.data.data;
};

export const createCampaign = async (
  token: string,
  formData: FormData
): Promise<CreatorCampaign> => {
  const response = await axios.post(`${API_URL}/campaign`, formData, {
    headers: {
      ...getAuthHeaders(token),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const updateCampaign = async (
  token: string,
  id: string,
  formData: FormData
): Promise<CreatorCampaign> => {
  const response = await axios.put(`${API_URL}/campaign/${id}`, formData, {
    headers: {
      ...getAuthHeaders(token),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const fetchCategories = async (
  token: string
): Promise<CategoryListResponse> => {
  const response = await axios.get(`${API_URL}/category/get-all-categories`, {
    params: { page: 1, limit: 100 },
    headers: getAuthHeaders(token),
  });

  return response.data.data;
};
