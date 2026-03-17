"use client";

import Image from "next/image";

export default function HowOurCommunity() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Left Image */}
          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/assets/images/how_our_community.png"
                alt="Community revenue"
                width={700}
                height={500}
                className="h-[260px] w-full object-cover sm:h-[320px] md:h-[380px] lg:h-[360px]"
                priority
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="">
             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-[#2C2C2C] text-left">
            How Our Community
              <br className="hidden sm:block" />
              Generates Revenue
          </h2>
          <p className="mt-3 text-lg md:text-xl font-medium leading-normal text-[#2C2C2C] text-left">
            Committed to ensuring fair and inclusive opportunities for all
          </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              If you choose to invest in a story that interests you, you will
              receive a percentage of the profits proportional to your initial
              investment. IP owners will receive 10% upfront. Once the project
              enters development and begins generating profit, they will receive
              an additional 5% of the earnings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}