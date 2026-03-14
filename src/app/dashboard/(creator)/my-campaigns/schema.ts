import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z.string().min(1, "Campaign title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  proposedFunding: z.coerce.number().optional(),
  creatingDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  campaignDetails: z.string().min(1, "Campaign details are required"),
  image: z.instanceof(File, { message: "Cover image is required" }),
});

export type CreateCampaignForm = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = createCampaignSchema.extend({
  image: z.instanceof(File).optional(),
});

export type UpdateCampaignForm = z.infer<typeof updateCampaignSchema>;
