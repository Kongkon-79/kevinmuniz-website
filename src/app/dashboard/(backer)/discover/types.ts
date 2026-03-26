export interface DiscoverCampaignCategory {
  _id: string
  name: string
}

export interface DiscoverCategoryOption {
  _id: string
  name: string
}

export interface DiscoverCampaignCreator {
  _id: string
  email: string
  firstName?: string
  lastName?: string
  profileImage?: string
}

export interface DiscoverCampaignProducer {
  _id: string
  firstName: string
  lastName: string
  productionCompany: string
  imdbPageLink: string
  cv: string
  status: 'approved'
  profileImage?: string
  email?: string
}

export interface DiscoverCampaign {
  _id: string
  title: string
  shortDescription: string
  category: DiscoverCampaignCategory
  location: string
  image: string
  proposedFunding?: number
  approvalStatus: string
  activeStatus: string
  totalRaised?: number
  totalDonations?: number
  isTracked?: boolean
  creatingDate: string
  endDate: string
  createdAt: string
}

export interface DiscoverCampaignDetails extends DiscoverCampaign {
  campaignDetails: string
  createdBy: DiscoverCampaignCreator
}

export interface DiscoverCampaignPagination {
  currentPage: number
  totalPages: number
  totalData: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface DiscoverCampaignsResponse {
  data: DiscoverCampaign[]
  pagination: DiscoverCampaignPagination
}

export interface DiscoverCategoryListResponse {
  data: DiscoverCategoryOption[]
}

export interface DiscoverCampaignDonor {
  donorId: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
  totalDonated: number
  donationCount: number
  lastDonatedAt: string
}

export interface DiscoverCampaignDetailResponse {
  campaign: DiscoverCampaignDetails
  totalRaised: number
  totalDonations: number
  donors: DiscoverCampaignDonor[]
  donorPagination?: DiscoverCampaignPagination
  isTracked: boolean
  producer: DiscoverCampaignProducer | null
}

export interface CreateDonationSessionResponse {
  url: string
  donationId: string
}

export interface DonationConfirmation {
  donation: {
    id: string
    amount: number
    paymentStatus: string
    stripeSessionId: string
    stripePaymentIntentId: string
    createdAt: string
  }
  campaign: {
    id: string
    title: string
    shortDescription: string
    category: string
    creator: { name: string } | null
  }
  donor: {
    id: string
    name: string
    email: string
  }
}
