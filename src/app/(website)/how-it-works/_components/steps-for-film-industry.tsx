"use client";

export default function StepsForFilmIndustryProfessionals() {
  const steps = [
    {
      id: "01",
      title: "Create an Account",
      description:
        "Kindly share your background and your professional role in the industry.",
    },
    {
      id: "02",
      title: "Discover the Story You Like",
      description:
        "Explore a wide variety of IP genres and seize the opportunity to support the stories that resonate with you.",
    },
    {
      id: "03",
      title: "Donate to Your Preferred IP",
      description:
        "Contribute to the stories you believe have the potential to succeed.",
    },
  ];

  return (
    <section className="w-full py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-[#2C2C2C] text-center">
            Steps For Film Industry Professionals
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium leading-normal text-[#8B8B8B] text-center">
            Explore compelling stories and support their adaptation into film through your support.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:p-7"
            >
              <span className="block text-[26px] font-medium leading-none text-[#333333]">
                {step.id}
              </span>

              <h3 className="mt-5 text-xl font-semibold leading-snug text-[#2f2f2f] sm:text-2xl">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6f7780] sm:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
