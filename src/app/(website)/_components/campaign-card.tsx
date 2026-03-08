"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface CampaignItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  expiresIn: string;
}

interface CampaignCardProps {
  campaign: CampaignItem;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = campaign.description.length > 140;
  const shortDescription = shouldTruncate
    ? `${campaign.description.slice(0, 140)}...`
    : campaign.description;

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-[220px] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className="absolute left-3 top-3 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-medium text-white shadow-sm">
          Expired in {campaign.expiresIn}
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="line-clamp-2 text-[28px] font-semibold leading-tight text-slate-900 md:text-[30px]">
          {campaign.title}
        </h3>

        <p className="mt-3 text-sm font-medium text-slate-500">
          {campaign.category}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {expanded ? campaign.description : shortDescription}
        </p>

        {shouldTruncate && (
          <Button
            variant="link"
            className="mt-2 h-auto p-0 text-sm font-semibold text-sky-600 hover:text-sky-700"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Read less" : "Read more"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}