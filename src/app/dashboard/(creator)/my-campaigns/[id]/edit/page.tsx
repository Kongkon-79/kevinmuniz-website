'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, ImageUp } from 'lucide-react'
import Image from 'next/image'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { type Resolver, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import CampaignDetailsEditor from '../../_components/CampaignDetailsEditor'
import {
  fetchCampaignById,
  fetchCategories,
  updateCampaign,
} from '../../api'
import { updateCampaignSchema, type UpdateCampaignForm } from '../../schema'

const fieldClassName =
  'h-[48px] rounded-[10px] border-[#EEF1F5] bg-[#FBFBFB] text-sm text-[#2D2D2D] placeholder:text-[#B1B5BD]'

export default function EditCampaignPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()
  const token = session?.user?.accessToken || ''
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<UpdateCampaignForm, undefined, UpdateCampaignForm>({
    resolver: zodResolver(
      updateCampaignSchema,
    ) as Resolver<UpdateCampaignForm>,
    defaultValues: {
      title: '',
      shortDescription: '',
      category: '',
      location: '',
      campaignDetails: '',
      image: undefined,
    },
  })

  const { data: categoriesResponse } = useQuery({
    queryKey: ['campaign-categories'],
    queryFn: () => fetchCategories(token),
    enabled: !!token,
  })

  const { data: campaignDetail, isLoading } = useQuery({
    queryKey: ['creator-campaign-edit', params.id],
    queryFn: () => fetchCampaignById(token, params.id),
    enabled: !!token && !!params.id,
  })

  useEffect(() => {
    if (campaignDetail?.campaign) {
      const { campaign } = campaignDetail
      form.reset({
        title: campaign.title,
        shortDescription: campaign.shortDescription,
        category: campaign.category._id,
        location: campaign.location,
        proposedFunding: campaign.proposedFunding,
        creatingDate: new Date(campaign.creatingDate),
        endDate: new Date(campaign.endDate),
        campaignDetails: campaign.campaignDetails,
        image: undefined,
      })
      setImagePreview(campaign.image)
    }
  }, [campaignDetail, form])

  const updateCampaignMutation = useMutation({
    mutationFn: (values: UpdateCampaignForm) => {
      const formData = new FormData()
      formData.append('title', values.title || '')
      formData.append('shortDescription', values.shortDescription || '')
      formData.append('category', values.category || '')
      formData.append('location', values.location || '')
      formData.append('creatingDate', values.creatingDate?.toISOString() || '')
      formData.append('endDate', values.endDate?.toISOString() || '')
      formData.append('campaignDetails', values.campaignDetails || '')

      if (typeof values.proposedFunding === 'number') {
        formData.append('proposedFunding', String(values.proposedFunding))
      }

      if (values.image instanceof File) {
        formData.append('image', values.image)
      }

      return updateCampaign(token, params.id, formData)
    },
    onSuccess: () => {
      toast.success('Campaign updated successfully')
      router.push(`/dashboard/my-campaigns/${params.id}`)
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update campaign',
      )
    },
  })

  const handleImageSelect = (file: File) => {
    form.setValue('image', file, {
      shouldValidate: true,
    })
    setImagePreview(URL.createObjectURL(file))
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-full space-y-4 rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[500px] w-full rounded-[12px]" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-full rounded-[4px] bg-[linear-gradient(180deg,#F6FCFF_0%,#F1FAFF_100%)] px-4 py-4 md:px-5 md:py-5">
      <div>
        <h1 className="text-[24px] font-semibold text-[#2D2D2D]">
          Update Campaign
        </h1>
        <p className="mt-1 text-sm text-[#9AA0A6]">
          Update your campaign information
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(values =>
            updateCampaignMutation.mutate(values),
          )}
          className="mt-6 space-y-4"
        >
          <section className="rounded-[12px] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)] md:p-6">
            <h2 className="text-[20px] font-medium text-[#2D2D2D]">
              Basic Information
            </h2>

            <div className="mt-5 grid gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Campaign Title*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          fieldClassName,
                          fieldState.error &&
                            'border-[#EF4444] focus-visible:ring-[#EF4444]',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Short Description*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          fieldClassName,
                          fieldState.error &&
                            'border-[#EF4444] focus-visible:ring-[#EF4444]',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Genre/Category*</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={value => {
                        field.onChange(value)
                        void form.trigger('category')
                      }}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            fieldClassName,
                            fieldState.error &&
                              'border-[#EF4444] focus:ring-[#EF4444]',
                          )}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {categoriesResponse?.data.map(category => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Story Location*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          fieldClassName,
                          fieldState.error &&
                            'border-[#EF4444] focus-visible:ring-[#EF4444]',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proposedFunding"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Proposed Funding</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled
                        className={cn(
                          fieldClassName,
                          'cursor-not-allowed opacity-70',
                          fieldState.error &&
                            'border-[#EF4444] focus-visible:ring-[#EF4444]',
                        )}
                        value={field.value ?? ''}
                        onChange={event =>
                          field.onChange(
                            event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#2EABFC]">
                      Budget and campaign dates are now controlled from the admin panel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="creatingDate"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Campaign Length / Start Date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              disabled
                              className={cn(
                                fieldClassName,
                                'cursor-not-allowed opacity-70',
                                'justify-between px-4 font-normal',
                                !field.value && 'text-[#B1B5BD]',
                                fieldState.error &&
                                  'border-[#EF4444] text-[#EF4444] focus:ring-[#EF4444]',
                              )}
                            >
                              {field.value
                                ? format(field.value, 'dd/MM/yy')
                                : 'DD/MM/YY'}
                              <CalendarIcon className="h-4 w-4 text-[#8C5CFF]" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={date => {
                              field.onChange(date)
                              void form.trigger(['creatingDate', 'endDate'])
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Campaign Length / End Date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              disabled
                              className={cn(
                                fieldClassName,
                                'cursor-not-allowed opacity-70',
                                'justify-between px-4 font-normal',
                                !field.value && 'text-[#B1B5BD]',
                                fieldState.error &&
                                  'border-[#EF4444] text-[#EF4444] focus:ring-[#EF4444]',
                              )}
                            >
                              {field.value
                                ? format(field.value, 'dd/MM/yy')
                                : 'DD/MM/YY'}
                              <CalendarIcon className="h-4 w-4 text-[#8C5CFF]" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={date => {
                              field.onChange(date)
                              void form.trigger('endDate')
                            }}
                            disabled={date =>
                              !!form.getValues('creatingDate') &&
                              date < form.getValues('creatingDate')
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </section>

          <section className="rounded-[12px] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)] md:p-6">
            <h2 className="text-[20px] font-medium text-[#2D2D2D]">
              Campaign Details
            </h2>
            <div className="mt-5">
              <FormField
                control={form.control}
                name="campaignDetails"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <CampaignDetailsEditor
                        value={field.value}
                        onChange={value => {
                          field.onChange(value)
                          void form.trigger('campaignDetails')
                        }}
                        className={cn(fieldState.error && 'border-[#EF4444]')}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#2EABFC]">
                      Tip: Include specific details about your cause and how
                      donations will make a difference.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="rounded-[12px] bg-white p-4 shadow-[0_4px_14px_rgba(17,24,39,0.04)] md:p-6">
            <h2 className="text-[20px] font-medium text-[#2D2D2D]">
              Campaign Image
            </h2>

            <div className="mt-5">
              <FormField
                control={form.control}
                name="image"
                render={({ fieldState }) => (
                  <FormItem>
                    <FormLabel>Upload Cover Image</FormLabel>
                    <FormControl>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            fileInputRef.current?.click()
                          }
                        }}
                        className={cn(
                          'flex min-h-[300px] cursor-pointer items-center justify-center rounded-[12px] border border-dashed bg-[#FBFBFB] p-4',
                          fieldState.error
                            ? 'border-[#EF4444]'
                            : 'border-[#D5DAE1]',
                        )}
                      >
                        {imagePreview ? (
                          <div className="relative h-[260px] w-full overflow-hidden rounded-[12px]">
                            <Image
                              src={imagePreview}
                              alt="Campaign preview"
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center">
                            <ImageUp className="h-8 w-8 text-[#6B7280]" />
                            <p className="mt-3 text-sm font-medium text-[#2EABFC]">
                              Click to Upload photo
                            </p>
                            <p className="mt-1 text-xs text-[#9AA0A6]">
                              JPG, PNG, or WEBP up to 10 MB. Recommended size 1600 x 900 px.
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={event => {
                        const file = event.target.files?.[0]
                        if (file) {
                          handleImageSelect(file)
                        }
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/dashboard/my-campaigns/${params.id}`)}
                className="h-[40px] min-w-[104px] rounded-full border-[#D1D5DB] bg-[#F3F4F6] text-[#666666] hover:bg-[#E5E7EB]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateCampaignMutation.isPending}
                className="h-[40px] min-w-[170px] rounded-full bg-[#2EABFC] text-white hover:bg-[#1B9AEC]"
              >
                Update Campaign
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </div>
  )
}
