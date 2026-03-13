"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CommunityHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/community_hero.jpg"
        alt="Contact us hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50" />


      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl py-24 md:py-32">

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Connecting

              <span className="block ">Professionals From All</span>
              <span className="block ">All Around The world</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg md:text-xl">
              Our success comes from seeing our community collaborate and create their masterpiece.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-12 text-base font-semibold shadow-lg"
              >
                <Link href="/sign-up">Join Us</Link>
              </Button>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}










