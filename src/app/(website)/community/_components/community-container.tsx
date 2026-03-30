"use client";

import Image from "next/image";

const leftCards = [
  {
    title: "Network",
    heading: "Forge relationships that grow your career",
    description:
      "Foster strategic partnerships and collaborate with driven, like-minded professionals who deliver results.",
  },
  {
    title: "Learn",
    heading: "Educate yourself",
    description:
      "Discover endless opportunities to explore various facets of the industry.",
  },
];

const rightCards = [
  {
    title: "Mentor",
    heading: "Guide fellow professionals",
    description:
      "Provide guidance to fellow members seeking assistance.",
  },
  {
    title: "Succeed",
    heading: "Achieve your goal",
    description:
      "Partner effectively to turn strategic objectives into measurable outcomes.",
  },
];

type CommunityCardProps = {
  title: string;
  heading: string;
  description: string;
};

function CommunityCard({ title, heading, description }: CommunityCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:p-6">
      <h3 className="text-[22px] font-semibold leading-none bg-gradient-to-r from-[#8860FF] to-[#17BEFB] bg-clip-text text-transparent sm:text-[26px]">
        {title}
      </h3>

      <h4 className="my-2 text-base font-medium leading-snug text-[#2C2C2C] sm:text-lg">
        {heading}
      </h4>

      <p className="text-sm leading-6 text-[#2C2C2C] sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default function CommunityContainer() {
  return (
    <section className="w-full bg-[#F6FBFF] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Gradient Banner */}
        <div className="rounded-xl bg-[linear-gradient(90deg,#12C1FB,#8C5DFF)] px-6 py-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold text-white sm:text-2xl lg:text-[28px]">
            Building A Network That Creates and Inspires
          </h2>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          {/* Left Cards */}
          <div className="grid gap-5">
            {leftCards.map((card) => (
              <CommunityCard
                key={card.title}
                title={card.title}
                heading={card.heading}
                description={card.description}
              />
            ))}
          </div>

          {/* Center Image + Vertical Text */}
          <div className="mx-auto flex items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            <div className="select-none text-center text-[34px] font-semibold uppercase leading-[0.9] tracking-[0.12em] text-transparent bg-[linear-gradient(180deg,#19b8f1_0%,#7a59f8_100%)] bg-clip-text [writing-mode:vertical-rl] [transform:rotate(180deg)] sm:text-[44px] lg:text-[52px]">
              Community
            </div>

            <div className="relative overflow-hidden rounded-none sm:rounded-md">
              <Image
                src="/assets/images/community.jpg"
                alt="Community visual"
                width={340}
                height={520}
                className="h-[280px] w-[160px] object-cover sm:h-[360px] sm:w-[200px] lg:h-[430px] lg:w-[240px]"
                priority
              />
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid gap-5">
            {rightCards.map((card) => (
              <CommunityCard
                key={card.title}
                title={card.title}
                heading={card.heading}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 rounded-xl bg-white px-6 py-6 text-center shadow-[0_18px_30px_0_#00000014] sm:mt-14 sm:px-8 sm:py-7">
          <h3 className="text-xl font-semibold leading-tight text-transparent bg-[linear-gradient(90deg,#8C5DFF,#12C1FB)] bg-clip-text sm:text-2xl lg:text-[26px]">
            Helping Our Community by providing Right Tools
          </h3>
        </div>
      </div>
    </section>
  );
}