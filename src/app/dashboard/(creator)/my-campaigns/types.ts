export interface CreatorCampaignCategory {
  _id: string;
  name: string;
}

export interface CreatorCampaign {
  _id: string;
  title: string;
  shortDescription: string;
  category: CreatorCampaignCategory;
  location: string;
  creatingDate: string;
  endDate: string;
  campaignDetails: string;
  image: string;
  approvalStatus: "pending" | "accepted" | "rejected";
  activeStatus: "active" | "inactive";
  totalRaised?: number;
  totalDonations?: number;
  proposedFunding?: number;
  createdAt: string;
}

export interface CreatorCampaignPagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreatorCampaignsResponse {
  data: CreatorCampaign[];
  pagination: CreatorCampaignPagination;
}

export interface CampaignDonor {
  donorId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  totalDonated: number;
  donationCount: number;
  lastDonatedAt: string;
}

export interface CreatorCampaignDetailResponse {
  campaign: CreatorCampaign;
  totalRaised: number;
  totalDonations: number;
  donors: CampaignDonor[];
}

export interface CategoryOption {
  _id: string;
  name: string;
}

export interface CategoryListResponse {
  data: CategoryOption[];
}
