"use client";

import Image from "next/image";

type BudgetCard = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const budgets: BudgetCard[] = [
  {
    id: 1,
    title: "Micro Budget",
    description:
      "If you have a short film you'd like to adapt, a micro-budget approach can help you raise the necessary funds to bring your project to life.",
    icon: "/assets/images/hob1.png",
  },
  {
    id: 2,
    title: "Low Budget",
    description:
      "This budget category supports the financing of longer short films and feature films produced with limited resources.",
    icon: "/assets/images/hob2.png",
  },
  {
    id: 3,
    title: "Medium Budget",
    description:
      "We now move into the preferred budget range for independent filmmakers seeking to finance their feature film.",
    icon: "/assets/images/hob3.png",
  },
  {
    id: 4,
    title: "High Budget",
    description:
      "Aiming to make your film the next breakout indie success? This budget plan is designed to support that ambition.",
    icon: "/assets/images/hob4.png",
  },
];

function BudgetSystemCard({ title, description, icon }: BudgetCard) {
  return (
    <div className="rounded-xl border border-[#4db7ff] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(77,183,255,0.14)] sm:p-6">
      <div className="mb-4 flex h-[56px] w-[56px] items-center justify-center sm:h-[64px] sm:w-[64px]">
        <Image
          src={icon}
          alt={title}
          width={64}
          height={64}
          className="h-auto w-auto object-contain"
        />
      </div>

      <h3 className="text-xl font-semibold leading-snug text-[#2f2f2f] sm:text-2xl">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#6b7280] sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default function BudgetSystemWorksSection() {
  return (
    <section className="w-full bg-[#f3f4f6] py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-semibold leading-tight text-[#2f2f2f] sm:text-[34px] lg:text-[42px]">
            How Our Budget System Works
          </h2>
          <p className="mt-3 text-sm text-[#8b9199] sm:text-base">
            Learn how to get your book adapted in a few easy steps
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {budgets.map((budget) => (
            <BudgetSystemCard key={budget.id} {...budget} />
          ))}
        </div>
      </div>
    </section>
  );
}