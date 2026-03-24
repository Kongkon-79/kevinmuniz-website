import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 10 * 1024 * 1024

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim()

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`)

const optionalFunding = z
  .number()
  .finite('Proposed funding must be a valid number')
  .positive('Proposed funding must be greater than 0')
  .optional()

const imageField = z
  .instanceof(File, { message: 'Cover image is required' })
  .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Upload a JPG, PNG, or WEBP image',
  })
  .refine(file => file.size <= MAX_IMAGE_SIZE, {
    message: 'Image must be 10 MB or smaller',
  })

const campaignFields = {
  title: requiredText('Campaign title'),
  shortDescription: requiredText('Short description'),
  category: requiredText('Category'),
  location: requiredText('Location'),
  proposedFunding: optionalFunding,
  creatingDate: z.date({ error: 'Start date is required' }),
  endDate: z.date({ error: 'End date is required' }),
  campaignDetails: z.string().refine(value => stripHtml(value).length > 0, {
    message: 'Campaign details are required',
  }),
}

export const createCampaignSchema = z
  .object({
  ...campaignFields,
  image: imageField,
  })
  .refine(values => values.endDate >= values.creatingDate, {
    path: ['endDate'],
    message: 'End date must be the same as or after the start date',
  })

export type CreateCampaignForm = z.infer<typeof createCampaignSchema>

export const updateCampaignSchema = z
  .object({
    ...campaignFields,
    image: imageField.optional(),
  })
  .refine(values => values.endDate >= values.creatingDate, {
    path: ['endDate'],
    message: 'End date must be the same as or after the start date',
  })

export type UpdateCampaignForm = z.infer<typeof updateCampaignSchema>
