"use client";

import * as React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CampaignCard, { CampaignItem } from "./campaign-card";

type FeaturedCampaignApiItem = {
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
  endDate: string;
  category?: {
    name?: string;
  } | null;
};

type FeaturedCampaignsResponse = {
  data: FeaturedCampaignApiItem[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getDaysLeftLabel = (endDate: string) => {
  const diff = new Date(endDate).getTime() - Date.now();
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

  if (daysLeft === 0) {
    return "Closing today";
  }

  if (daysLeft === 1) {
    return "1 day left";
  }

  return `${daysLeft} days left`;
};

const fetchFeaturedCampaigns = async (): Promise<CampaignItem[]> => {
  const response = await axios.get<{ data: FeaturedCampaignsResponse }>(
    `${API_URL}/campaign`,
    {
      params: {
        approvalStatus: "accepted",
        activeStatus: "active",
        page: 1,
        limit: 8,
      },
    }
  );

  return (response.data.data?.data || []).map((campaign) => ({
    id: campaign._id,
    title: campaign.title,
    category: campaign.category?.name || "Featured Project",
    description: campaign.shortDescription,
    image: campaign.image || "/assets/images/autoLogo.png",
    expiresIn: getDaysLeftLabel(campaign.endDate),
  }));
};

export default function FeaturedCampaignsSection() {
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["featured-campaigns"],
    queryFn: fetchFeaturedCampaigns,
  });

  const displayCampaigns = React.useMemo(() => {
    if (campaigns.length <= 1) {
      return campaigns;
    }

    if (campaigns.length <= 3) {
      return [...campaigns, ...campaigns];
    }

    return campaigns;
  }, [campaigns]);

  return (
    <section className="w-full overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="absolute inset-x-6 top-10 -z-10 h-56 rounded-full bg-[radial-gradient(circle,rgba(46,171,252,0.12),transparent_62%)] blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8ECFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#2EABFC] shadow-sm">
            <Sparkles className="h-4 w-4" />
            Spotlight Picks
          </div>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.15] text-slate-900 md:text-[36px]">
            Featured Campaigns
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-slate-500 md:text-lg">
            Discover original movie projects currently seeking cast,
            producers, and support partners.
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[520px] animate-pulse rounded-[26px] border border-[#DDEEFE] bg-white/70"
                />
              ))}
            </div>
          ) : displayCampaigns.length > 0 ? (
            <div className="relative py-2">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-6">
                  {displayCampaigns.map((campaign, index) => (
                    <CarouselItem
                      key={`${campaign.id}-${index}`}
                       className="pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <CampaignCard campaign={campaign} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="-left-4 top-1/2 z-20 h-12 w-12 border-[#CFE3F7] bg-white text-[#1D4ED8] shadow-[0_10px_24px_rgba(46,171,252,0.16)] hover:bg-[#F4FAFF] hover:text-[#0F8FE6] disabled:border-[#E8EEF5] disabled:bg-[#F8FBFE] disabled:text-[#9FB8CC] disabled:opacity-100 md:-left-6" />
                <CarouselNext className="-right-4 top-1/2 z-20 h-12 w-12 border-[#CFE3F7] bg-white text-[#1D4ED8] shadow-[0_10px_24px_rgba(46,171,252,0.16)] hover:bg-[#F4FAFF] hover:text-[#0F8FE6] disabled:border-[#E8EEF5] disabled:bg-[#F8FBFE] disabled:text-[#9FB8CC] disabled:opacity-100 md:-right-6" />
              </Carousel>
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-[#CFE4F9] bg-white/80 px-6 py-14 text-center shadow-sm">
              <p className="text-lg font-semibold text-[#111827]">
                Featured campaigns are coming soon.
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                New active campaigns will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
