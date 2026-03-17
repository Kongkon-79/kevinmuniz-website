"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CampaignCard, { CampaignItem } from "./campaign-card";

const campaigns: CampaignItem[] = [
  {
    id: 1,
    title: "Shadows of Tomorrow",
    category: "Sci-Fi Drama",
    description:
      "A grieving scientist risks reality itself to rewrite the past — but altering time may cost him the very future he is trying to save. After losing his wife in a tragic accident, brilliant quantum physicist Dr. Elias Rowan becomes obsessed with a radical theory that time is not fixed, but flexible. Working in secret, he develops a machine capable of opening fractures in time, only to discover that every change creates deeper consequences.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    expiresIn: "7 days",
  },
  {
    id: 2,
    title: "The Last Rehearsal",
    category: "Drama / Mystery",
    description:
      "On the eve of a final stage production, a forgotten letter resurfaces and threatens to expose decades of buried secrets among a legendary theater group. As tensions rise backstage, each actor must confront the truth behind the performance that made them famous.",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop",
    expiresIn: "5 days",
  },
  {
    id: 3,
    title: "Red Room Archive",
    category: "Psychological Thriller",
    description:
      "A young archivist discovers a hidden room filled with forbidden recordings that reveal a pattern of disappearances connected to the city’s most powerful elite. The deeper she investigates, the more she realizes she may already be part of the story.",
    image:
      "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1200&auto=format&fit=crop",
    expiresIn: "5 days",
  },
  {
    id: 4,
    title: "Waves Between Us",
    category: "Romantic Drama",
    description:
      "Two strangers from different worlds meet on a remote coastal island and form an unexpected bond while rebuilding their lives after personal loss. But when reality calls them back, they must decide whether love is enough to bridge the distance between them.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    expiresIn: "7 days",
  },
  {
    id: 5,
    title: "Ashes of the Crown",
    category: "Historical Epic",
    description:
      "In a kingdom on the brink of collapse, an exiled heir returns under a false identity to expose the conspiracy that destroyed his family. Torn between vengeance and duty, he must choose whether to reclaim the throne or destroy it forever.",
    image:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1200&auto=format&fit=crop",
    expiresIn: "6 days",
  },
];

export default function FeaturedCampaignsSection() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="w-full py-10 md:py-14 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Featured Campaigns
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
            Discover original movie projects currently seeking cast,
            producers, and investment partners.
          </p>
        </div>

        <div className="relative mt-12">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {campaigns.map((campaign) => (
                <CarouselItem
                  key={campaign.id}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-[28%]"
                >
                  <CampaignCard campaign={campaign} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-3 hidden border-slate-200 bg-white text-slate-700 shadow-sm md:flex" />
            <CarouselNext className="-right-3 hidden border-slate-200 bg-white text-slate-700 shadow-sm md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}