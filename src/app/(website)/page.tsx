import React from 'react'
import HeroSection from './_components/hero'
import { FaqSection } from './_components/faq-section'
import AboutOurPlatform from './_components/about-our-platform'
import WhyOurPlatformSection from './_components/why-our-platform'
import FeaturedCampaignsSection from './_components/featured-campaigns'
import HowItWorksSection from './_components/how-it-works'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <WhyOurPlatformSection/>
      <FeaturedCampaignsSection/>
      <HowItWorksSection/>
      <AboutOurPlatform/>
      <FaqSection/>
    </div>
  )
}

export default HomePage