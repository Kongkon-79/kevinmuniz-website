import axios from "axios";

// Reuse the base configured types if needed, or define locally
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
});

export interface CommunityUser {
    _id: string;
    firstName: string;
    lastName: string;
    country: string;
    jobRole: string;
    imdbLink: string;
    cv: string;
    profileImage: string;
    bio?: string;
}

export interface CommunityResponse {
    status: boolean;
    message: string;
    data: {
        users: CommunityUser[];
        paginationInfo: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    };
}

export const fetchCommunityUsers = async (token: string, search: string = "", page: number = 1) => {
    const response = await axios.get<CommunityResponse>(`${API_URL}/user/community`, {
        headers: getAuthHeaders(token),
        params: {
            search,
            page,
            limit: 12,
        },
    });

    return response.data.data;
};
