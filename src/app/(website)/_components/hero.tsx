"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-start overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/assets/images/hero_bg.jpg"
        alt="hero background"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-normal">Where Great Stories <br/> Find Their Stage</h1>
        <p className="text-lg md:text-xl  text-white leading-none font-normal pt-4">Launch your movie campaign and showcase your vision. <br />
Discover original film projects and become the force behind <br />
the next big production.</p>
          {/* Button */}
          <div className="flex flex-col md:flex-row items-center gap-6 pt-10">
            <Link href="/sign-up">
            <button className="bg-primary text-white rounded-full h-[48px] px-8 text-lg md:text-xl  font-bold leading-normal">Create Your Campaign</button>
            </Link>
               <Link href="/sign-up">
            <button className="bg-white text-primary border border-primary rounded-full h-[48px] px-8 text-lg md:text-xl  font-bold leading-normal">Become a Backer</button>
            </Link>
            
            
          </div>
      </div>

    

    </div>
  );
};

export default HeroSection;



