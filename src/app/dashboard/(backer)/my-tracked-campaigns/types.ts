import type {
  DiscoverCampaign,
  DiscoverCampaignCreator,
  DiscoverCampaignPagination,
} from '../discover/types'

export interface TrackedCampaign extends DiscoverCampaign {
  createdBy: DiscoverCampaignCreator
  trackedAt: string
  isTracked: true
}

export interface TrackedCampaignsResponse {
  campaigns: TrackedCampaign[]
  pagination: DiscoverCampaignPagination
}
