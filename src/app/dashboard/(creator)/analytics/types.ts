export interface AnalyticsStats {
  totalRaised: number
  totalDonations: number
  totalDonors: number
  avgDonation: number
}

export interface DonationTrends {
  Jan: number
  Feb: number
  Mar: number
  Apr: number
  May: number
  Jun: number
  Jul: number
  Aug: number
  Sep: number
  Oct: number
  Nov: number
  Dec: number
}

export interface CategoryDonation {
  category: string
  totalRaised: number
  percentage: number
}

export interface TopCampaign {
  totalRaised: number
  campaignId: string
  title: string
  shortDescription: string
  image: string
  location: string
  activeStatus: string
  approvalStatus: string
  category: string
}

export interface AnalyticsDashboard {
  year: number
  stats: AnalyticsStats
  donationTrends: DonationTrends
  donationsByCategory: CategoryDonation[]
  topCampaigns: TopCampaign[]
}
