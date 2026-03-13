"use client";

import Image from "next/image";

export default function HowItWorksHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/how_it_work_hero.jpg"
        alt="how it works hero background"
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
              Learn About Our 

              <span className="block ">Platforms and How To</span>
              <span className="block ">Effectively Use It</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg md:text-xl">
              We will provide the necessary steps so you can succeed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}










