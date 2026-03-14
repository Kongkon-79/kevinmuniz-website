import axios from "axios";
import type {
  CreatorOverviewResponse,
  CreatorStats,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || API_URL;

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const fetchCreatorStats = async (
  token: string
): Promise<CreatorStats> => {
  const response = await axios.get(
    `${BASE_URL}/campaign-analytics/creator-dashboard/stats`,
    {
      headers: getAuthHeaders(token),
    }
  );

  return response.data.data || response.data;
};

export const fetchCreatorOverview = async (
  token: string
): Promise<CreatorOverviewResponse> => {
  const response = await axios.get(
    `${BASE_URL}/campaign-analytics/creator-dashboard/overview`,
    {
      headers: getAuthHeaders(token),
    }
  );

  return response.data.data || response.data;
};
