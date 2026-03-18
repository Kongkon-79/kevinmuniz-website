

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function StepsForFilm() {
const faqItems = [
    {
      question: "Who can create a campaign?",
      answer:
        "On this platform, campaign creators are primarily the intellectual property owners, who retain 100% of the rights to their story, whether it is a book, graphic novel, or other original work that has been published.",
    },
    {
      question: "Who can join as a backer?",
      answer:
        "Primarily individuals working in film or television who are interested in supporting the intellectual property they admire.",
    },
    {
      question: "What types of intellectual property do you accept on this platform?",
      answer:
        "Our platform accepts any story that has been published, and you can prove that you fully own the rights to your story.",
    },
    {
      question: "Can I submit an IP that has not yet been published?",
      answer:
        "Due to legal considerations, we refrain from engaging with unpublished works. However, we encourage you to join our community, where numerous self-published authors offer valuable guidance on transforming a screenplay into a successful and impactful intellectual property.",
    },
    {
      question: "Am I required to make an upfront payment for the projects I choose to finance on this platform?",
      answer:
        "Our platform operates on a pledge-based system, where you are only charged if the project successfully reaches its funding goals.",
    },
    {
      question: "I am the author of the story. How do I ensure my project gets developed into a film?",
      answer:
        "Before your project becomes an active campaign, it must be requested for production by a recognized industry producer. This ensures that your project will proceed to pre-production once the funding goal is achieved.",
    },
  ];

  return (
    <div>
      <section className="py-6 md:py-12 lg:py-20">
        <div className="container ">
          <div className="pb-6 md:pb-8 lg:pb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-[#2C2C2C] text-center">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium leading-normal text-[#8B8B8B] text-center">
            Find the answers you are looking for in the section below.
          </p>
        </div>
      
          <Accordion type="single" collapsible className="w-full">
            {faqItems?.map((item, index) => (
              <AccordionItem
                key={index+1}
               value={`item-${index}`}
                className=" mb-1"
              >
                <AccordionTrigger className="hover:no-underline py-[14px] px-6 text-left  border-b border-[#C3C3C3]">
                  <div className="flex items-center gap-6">
                    <span className="text-lg font-normal text-[#131313] leading-[120%]">
                      {/* {index+1}.  */}
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-3 px-6 text-base text-[#616161] leading-[150%] font-normal">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>

  );
}
