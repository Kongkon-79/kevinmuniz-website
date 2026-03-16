'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, Paperclip } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { produceProjectSchema, type ProduceProjectForm } from '../schema'

interface ProduceProjectModalProps {
  isOpen: boolean
  onClose: () => void
  campaignId: string
  isSubmitting: boolean
  onSubmit: (values: ProduceProjectForm, campaignId: string) => void
}

export default function ProduceProjectModal({
  isOpen,
  onClose,
  campaignId,
  isSubmitting,
  onSubmit,
}: ProduceProjectModalProps) {
  const form = useForm<ProduceProjectForm>({
    resolver: zodResolver(produceProjectSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      productionCompany: '',
      imdbPageLink: '',
      cv: undefined,
    },
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [form, isOpen])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[540px] rounded-[20px] border-none bg-white p-0 shadow-xl">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6 space-y-0 text-left">
            <DialogTitle className="text-[24px] font-semibold text-[#2D2D2D]">
              Fill this form to produce the film
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(values => onSubmit(values, campaignId))}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name="producer-first-name"
                          autoComplete="given-name"
                          placeholder="Enter First Name..."
                          className="h-[46px] rounded-[12px] border-[#E8EDF3] bg-[#FBFBFB]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name="producer-last-name"
                          autoComplete="family-name"
                          placeholder="Enter Last Name..."
                          className="h-[46px] rounded-[12px] border-[#E8EDF3] bg-[#FBFBFB]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="productionCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                      Production Company
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        name="producer-company"
                        autoComplete="organization"
                        placeholder="Enter Company Name..."
                        className="h-[46px] rounded-[12px] border-[#E8EDF3] bg-[#FBFBFB]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imdbPageLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                      Imdb Page Link
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          name="producer-imdb-link"
                          autoComplete="off"
                          placeholder="Link..."
                          className="h-[46px] rounded-[12px] border-[#E8EDF3] bg-[#FBFBFB] pr-11"
                        />
                        <Link2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#2D2D2D]">
                      CV
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <label className="flex h-[46px] cursor-pointer items-center justify-between rounded-[12px] border border-[#E8EDF3] bg-[#FBFBFB] px-4 text-sm text-[#6B7280] transition-colors hover:border-[#2EABFC]">
                          <span className="truncate">
                            {field.value instanceof File
                              ? field.value.name
                              : 'Upload CV file...'}
                          </span>
                          <Paperclip className="h-4 w-4 shrink-0 text-[#8A94A6]" />
                          <Input
                            name="producer-cv-file"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={event => {
                              const file = event.target.files?.[0]
                              field.onChange(file)
                            }}
                          />
                        </label>
                        <p className="text-xs text-[#8A94A6]">
                          Accepted formats: PDF, DOC, DOCX
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-[46px] w-full rounded-full bg-[#2EABFC] text-white hover:bg-[#2396DF]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
