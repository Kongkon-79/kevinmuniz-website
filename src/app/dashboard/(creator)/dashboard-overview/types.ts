export interface CreatorCampaign {
  _id: string;
  title: string;
  shortDescription: string;
  category: { _id: string; name: string };
  location: string;
  image: string;
  approvalStatus: string;
  activeStatus: string;
  totalRaised: number;
  totalDonations: number;
  endDate: string;
}

export interface RecentDonor {
  donorId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  campaignTitle: string;
  amount: number;
  donatedAt: string;
}

export interface CreatorStats {
  totalRaised: number;
  activeCampaigns: number;
  totalDonors: number;
  avgDonation: number;
}

export interface CreatorOverviewPagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreatorOverviewResponse {
  myCampaigns: CreatorCampaign[];
  myCampaignsPagination: CreatorOverviewPagination;
  recentDonors: RecentDonor[];
  recentDonorsPagination: CreatorOverviewPagination;
}
