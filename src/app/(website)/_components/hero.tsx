"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/hero_bg.jpg"
        alt="Cinema campaign hero background"
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
              Where Great Stories
              <span className="block ">Find Their Stage</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg md:text-xl">
              Launch your movie campaign and showcase your vision. Discover
              original film projects and become the force behind the next big
              production.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold shadow-lg"
              >
                <Link href="/sign-up">Create Your Campaign</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white bg-white text-primary px-8 text-base font-semibold hover:bg-white/90"
              >
                <Link href="/sign-up">Become a Backer</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


















// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// const HeroSection = () => {
//   return (
//     <div className="relative min-h-screen flex items-center justify-start overflow-hidden">
//       {/* Background Image */}
//       <Image
//         src="/assets/images/hero_bg.jpg"
//         alt="hero background"
//         fill
//         priority
//         className="object-cover -z-10"
//       />

//       <div className="container">
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-normal">
//           Where Great Stories <br /> Find Their Stage
//         </h1>
//         <p className="text-lg md:text-xl  text-white leading-none font-normal pt-4">
//           Launch your movie campaign and showcase your vision. <br />
//           Discover original film projects and become the force behind <br />
//           the next big production.
//         </p>
//         {/* Button */}
//         <div className="flex flex-col md:flex-row items-center gap-6 pt-10">
//           <Link href="/sign-up">
//             <button className="bg-primary text-white rounded-full h-[48px] px-8 text-lg md:text-xl  font-bold leading-normal">
//               Create Your Campaign
//             </button>
//           </Link>
//           <Link href="/sign-up">
//             <button className="bg-white text-primary border border-primary rounded-full h-[48px] px-8 text-lg md:text-xl  font-bold leading-normal">
//               Become a Backer
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
