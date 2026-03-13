"use client";

import Image from "next/image";

export default function ContactUsHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/contact_hero.jpg"
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
              Contact Us
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}










