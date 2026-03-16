import { z } from 'zod'

export const requestRefundSchema = z.object({
  reason: z.string().min(10, 'Please provide a reason (min 10 characters)'),
})

export type RequestRefundForm = z.infer<typeof requestRefundSchema>
