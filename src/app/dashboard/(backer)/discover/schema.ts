import { z } from 'zod'

export const produceProjectSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  productionCompany: z.string().min(1, 'Production company is required'),
  imdbPageLink: z.string().url('Must be a valid URL'),
  cv: z.custom<File>(
    value => value instanceof File && value.size > 0,
    'CV file is required',
  ),
})

export type ProduceProjectForm = z.infer<typeof produceProjectSchema>

export const donationSchema = z.object({
  amount: z.preprocess(
    value => {
      if (value === '' || value === null || value === undefined) {
        return undefined
      }

      return Number(value)
    },
    z.number().min(1, 'Minimum donation is $1'),
  ),
})

export type DonationForm = z.infer<typeof donationSchema>
export type DonationFormInput = z.input<typeof donationSchema>
