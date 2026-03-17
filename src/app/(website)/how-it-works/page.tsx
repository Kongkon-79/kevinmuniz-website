import React from "react";
import HowItWorksHero from "./_components/how-it-works-hero";
import HowOurCommunity from "./_components/how-our-community";
import StepsForAuthors from "./_components/setps-for-authors";
import StepsForFilmIndustryProfessionals from "./_components/steps-for-film-industry";
import HowToSuccessfully from "./_components/how-to-successfully";
import { StepsForFilm } from "./_components/steps-for-film";
import BudgetSystemWorksSection from "./_components/how-our-budget";

const HowItWorks = () => {
  return (
    <div >
      <HowItWorksHero />
      <StepsForAuthors />
      <HowToSuccessfully />
      <StepsForFilmIndustryProfessionals />
      <StepsForFilm />
      <BudgetSystemWorksSection/>
      <HowOurCommunity />
    </div>
  );
};

export default HowItWorks;
