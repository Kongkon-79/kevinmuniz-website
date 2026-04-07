"use client";

export default function StepsForAuthors() {
  const steps = [
    {
      id: "01",
      title: "Create an account to start a campaign.",
      description:
        "Sign up to begin your campaign and share the title and a short description of your story to get started.",
    },
    {
      id: "02",
      title: "Publish your story",
      description:
        "Showcase your story on our platform and connect with fellow authors and industry professionals who have the resources to help bring your film to life.",
    },
    {
      id: "03",
      title: "Promote and network",
      description:
        "Leverage our specialized services while presenting your story to a distinctive and engaged audience.",
    },
  ];

  return (
    <section className="w-full py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-[#2C2C2C] text-center">
                Steps For Authors
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium leading-normal text-[#8B8B8B] text-center">
            Learn how to get your book adapted in a few easy steps
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.12)] sm:p-7"
            >
              <span className="block text-[28px] font-medium leading-none text-[#3a3a3a]">
                {step.id}
              </span>

              <h3 className="mt-5 text-xl font-semibold leading-snug text-[#2d2d2d] sm:text-2xl">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6f7680] sm:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
