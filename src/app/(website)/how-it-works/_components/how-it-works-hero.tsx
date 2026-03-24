'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HowItWorksHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/assets/images/office_image.jpeg"
        alt="how it works hero background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl py-24 md:py-32">
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Learn How
              <span className="block ">Hierarchy of visionaries</span>
              <span className="block ">Works for You</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg md:text-xl">
              Explore the platform step by step and understand how creators,
              backers, and industry professionals move projects forward together.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold shadow-lg"
              >
                <Link href="/sign-up">Start Your Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
